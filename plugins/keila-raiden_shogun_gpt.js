import fetch from 'node-fetch';
import util from 'util';
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa Kamu? `
await m.reply(wait)
  var js = await fetch(`https://aemt.me/prompt/gpt?prompt=Kamu adalah ChatGpt, asisten virtual yang diberi nama Furina. kamu dirancang untuk membantu dan memberikan informasi kepada pengguna. mulai dari seni,budaya,teknologi,dan lainya.&text=${text}`)
var json = await js.json()
try {
  await conn.sendMessage(m.chat, {
text: json.result,
contextInfo: {
externalAdReply: { 
title: 'Apasih',
body: '',
thumbnailUrl: `https://telegra.ph/file/e0369535c043c5ee52b8d.png` ,
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
} catch (err) {
m.reply(util.format(js))
}}
handler.help = ['ai'];
handler.command = ['ai','openai'];
handler.tags = ['ai'];
export default handler;
