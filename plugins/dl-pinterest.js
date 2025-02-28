import axios from 'axios';
import cheerio from 'cheerio';

const headers = {
  'Cookie': 'csrftoken=a21b9b31aa8ba989de7b20ae1e7d4ddd; _routing_id=f3ef2fc3-339d-41e9-86ff-8d1e056db02d; g_state={"_I":0); b="AXfTkqH6ukZOTI2Baw/7zNvVGXRA7x8we46jQxIGHrX86SBisFU5VYxu2GsYIcSdeAE="; sessionFunnelEventLogged=1; _auth=0;',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
};

async function pinterest(query) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://id.pinterest.com/search/pins/?autologin=true&rs=rs&len=2&q=${query}`, {
          headers: headers,
        });

        const $ = cheerio.load(data);
        const result = [];
        const hasil = [];

        $('div a').get().map(b => {
          const link = $(b).find('img').attr('src');
          if (link) {
            result.push(link);
          }
        });

        result.forEach(v => {
          if (v === undefined) return;
          const replacedLink = v.replace(/236/g, '736');
          hasil.push(replacedLink);
        });

        const combinedArray = result.filter(Boolean).concat(hasil);

        if (combinedArray.length === 0) {
          // Jika array kosong
          if (retryCount < 10) {
            // Jika belum mencoba lebih dari 5 kali, jalankan fetchData kembali
            retryCount++;
            console.log('Array kosong, menjalankan ulang...');
            fetchData();
          } else {
            // Jika sudah mencoba lebih dari 5 kali, kirim pesan bahwa tidak dapat ditemukan
            console.log('Mencari hal lain...');
            resolve([`*${query}* Tidak Dapat Ditemukan. Coba Cari Hal Lain!`]);
          }
        } else {
          // Jika array tidak kosong, resolve dengan hasil
          combinedArray.shift();
          resolve(combinedArray);
        }
      } catch (error) {
        reject(error);
      }
    };

    // Panggil fetchData pertama kali
    fetchData();
  });
}

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `Apa?\nEx: ${usedPrefix + command} 1 Hutao`;
  const limit = parseInt(args[0]) || 1;

  m.react('🔍');
  if (limit > 5) {
    return m.reply('Maaf, permintaan melebihi jumlah maksimum (5 foto).');
  }

  let loadd = [
    '*_Tunggu Sebentar!_*',
    '*_Bot By KeiLaSenpai_*',
    '*Image Not Sent Means Not Found*',
    '*KeiLaSenpai - True Eternity*',
  ];

  let { key } = await conn.sendMessage(m.chat, { text: loadd[0] });

  for (let i = 1; i < loadd.length; i++) {
    await conn.sendMessage(m.chat, { text: loadd[i], edit: key });
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  try {
    const allImages = await pinterest(text);
    const validImages = await filterValidImages(allImages, limit > 5 ? 5 : limit);
    for (const image of validImages) {
      await conn.sendFile(m.chat, image, '', '', m, false);
      m.react('✅');
    }
  } catch (e) {
    m.reply(`Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Pinterest !`);
    m.react('❗');
  }
};

async function filterValidImages(images, limit) {
  const validImages = [];
  for (const image of images) {
    if (await isImageURL(image)) {
      validImages.push(image);
      if (validImages.length >= limit) {
        break;
      }
    }
  }
  return validImages;
}

async function isImageURL(url) {
  try {
    const res = await axios.head(url);
    const contentType = res.headers['content-type'];
    return contentType && contentType.startsWith('image');
  } catch (error) {
    return false;
  }
}

handler.help = ['pin'];
handler.tags = ['dl'];
handler.command = ['pin','pinterest'];
handler.premium = false;
handler.limit = true;

export default handler;