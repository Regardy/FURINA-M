/*####################################
                 KAGUYA SAMA
             MADE BY LEXIC TEAM
       
✅ WhatsApp: wa.me/6281389103794
👥 Github: https://github.com/LEXIC-TEAM
#####################################*/
import gtts from 'node-gtts';
import ytdl from 'ytdl-core';
import axios from 'axios';
import yts from'yt-search';
import fs from'fs';
import { pipeline } from'stream';
import { promisify } from'util';
const streamPipeline = promisify(pipeline);
import os from 'os';
function trimYouTubeUrl(url) {
  const trimmedUrl = url.split('?')[0];
  return trimmedUrl;
}

const handler = async (m, { conn, command, text, usedPrefix }) => {
  conn.play = conn.play ? conn.play : {};
  if (!text) throw `*• Example:* ${usedPrefix + command} Kaguya love is war`;
  const key = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });

  try {
    // Validate URL
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    if (!search) throw 'Not Found, Try Another Title';
    let vid = search.videos[0];
    let { title, thumbnail, timestamp, views, ago, url } = vid;
    let caption = `*[ YOUTUBE PLAY ]*\n*• Caption:* ${title}\n*• Views:* ${views}\n*• Ago:* ${ago}\n*• Thumbnail:* ${thumbnail}\n*• Source Yt:* ${url}\n\n*do you want to download the video?*\nType *Y* or *N*\n*• Timeout:* 5 seconds` + "\n\n```Audio will be sent soon\nso please wait a moment```";

    const t = await conn.sendMessage(m.chat, { text: caption, edit: key }, { quoted: key });
conn.play[m.sender] = {

      url: url,

      reply: t

    }
         
         let Ytdl = await ytmp3(url)
      let dls = "Play audio succes"

            let ytthumb = await (await conn.getFile(Ytdl2.meta.image)).data
            

  let doc = {
    audio: Ytdl.mp3,

                

                fileName: Ytdl.title,
    
    mimetype: 'audio/mp4',
   
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: Ytdl.title,
        body: 'tahu',
        sourceUrl: url,
        thumbnail: ytthumb
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: t });
setTimeout(() => {
delete conn.play[m.sender]
}, 5000)
  // Delete the audio file
  
  
  } catch (error) {
    m.reply(error);
    throw error;
  }
};

handler.before = async (m, { conn }) => {
  conn.play = conn.play ? conn.play : {};
  if (!m.text) return;
  if (!conn.play[m.sender]) return;
  if (m.text == "Y") {
    m.reply(wait);
    let { url, reply } = conn.play[m.sender];
    let video = await ytPlayMp4(url);
    await conn.sendMessage(m.chat, { video: { url: video.url }, caption: `*✅ Succes Download videos*` }, { quoted: reply });
    delete conn.play[m.sender];
  } else if (m.text == "N") {
    m.reply("*✅ Succes canceled videos*");
    delete conn.play[m.sender];
  } else return;
};

handler.help = ['play'].map((v) => v + ' *[query]*');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

export default handler

function ytPlayMp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};

function tts(text, lang = 'id') {
    return new Promise((resolve, reject) => {
        try {
            let tts = gtts(lang)
            let filePath = join(__dirname, '../tmp', (1 * new Date) + '.wav')
            tts.save(filePath, text, () => {
                resolve(readFileSync(filePath))
                unlinkSync(filePath)
            })
        } catch (e) {
            reject(e)
        }
    })
}

async function y2mate(url) {
    

    const requestDataInfo = new URLSearchParams({
        k_query: url,
        k_page: 'home',
        hl: 'en',
        q_auto: 1,
    });

    const headersInfo = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36'
    };

    const { data: infoData } = await axios.post('https://www.y2mate.com/mates/analyzeV2/ajax', requestDataInfo.toString(), { headers: headersInfo });

    const requestDataMp4 = new URLSearchParams({
        vid: infoData.vid,
        k: infoData.links.mp4.auto.k,
    });

    const requestDataMp3 = new URLSearchParams({
        vid: infoData.vid,
        k: infoData.links.mp3.mp3128.k,
    });

    const headersConverter = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36'
    };

    const { data: mp4Data } = await axios.post("https://www.y2mate.com/mates/convertV2/index", requestDataMp4.toString(), { headers: headersConverter });
    const { data: mp3Data } = await axios.post("https://www.y2mate.com/mates/convertV2/index", requestDataMp3.toString(), { headers: headersConverter });

    return {
        title: infoData.title,
        mp4: mp4Data.dlink,
        mp3: mp3Data.dlink
    };
}

// Example usage


