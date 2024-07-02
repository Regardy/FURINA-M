import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Linknya Mana?\nExample: *.twitterdl https://twitter.com/faqeeyaaz/status/1242789155173617664?s=20&t=DRgdl9U8MwTwpY0o1o-96g*`
m.react('⏱️')
try {
  let res = await fetch(`https://api.koi.pics/api/downloader/twitter?url=${text}&apikey=Zs9sofBX7j`)
  let json = await res.json()
 
  for (const item of json.data) {
  conn.sendFile(m.chat, item.video, '', ``, m);
            m.react('✅');
        }
  } catch (e) {
  m.reply(`kontol`)
  }
  }
handler.help = ['twitter']
handler.tags = ['downloader']
handler.command = /^twitter|twitterdl$/i
handler.limit = true

export default handler