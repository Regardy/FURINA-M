import fs from 'fs'
const {

    proto,

    generateWAMessage,
prepareWAMessageMedia,
    areJidsSameUser,
    generateWAMessageFromContent,

} = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn }) => {
	let pfft = `
 Halooo.... Aku © 𝙵𝚄𝚁𝙸𝙽𝙰, Bot kesayangannya Rega. Sehat sehat ya guys.

 • sᴛᴀᴛᴜs : ᴘᴜʙʟɪᴄ
 • Owner   : Rega
 • "Dont even care with anyone

ᴋᴇᴛɪᴋ *.ᴀʟʟᴍᴇɴᴜ*
ᴜɴᴛᴜᴋ ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴍᴇɴᴜ
`;
 let loadd = [
 '◆◇',
 '◇◆',
 '◆◇',
 '◇◆',
 '◆◇',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '◇◆'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}

    let hghg = 'https://telegra.ph/file/e1b2d7c0ac4838ebd20d1.jpg'
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        
                           
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: pfft
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "Furina-MD"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: true, ...(await prepareWAMessageMedia({ video: await fetch('https://telegra.ph/file/9c205f5e68a6a2bfcf30c.mp4')}, { upload: conn.waUploadToServer }))
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"AllMenu\",\"id\":\".allmenu\"}"
              },
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id,
              message:{                                          extendedTextMessage: {

        contextInfo: {

thumbnail: hghg,

  forwardingScore: 1000,

  isForwarded: true,
  
}}}})
/*await conn.sendMessage(m.chat, {
    video: fs.readFileSync('./media/thumb2.mp4'),
    mimetype: 'video/mp4',
    fileLength: 100000000000,
    caption: pfft,
    gifPlayback: true,
    gifAttribution: 5,
    contextInfo: {
      forwardingScore: 2023, 
      isForwarded: false,
      mentionedJid: [m.sender]
    }
  },
  )
  conn.sendMessage(m.chat, { audio: fs.readFileSync('./media/menu.mp3'), quoted: m });
/*
conn.sendMessage(m.chat, {
      text: pfft,
      contextInfo: {
      externalAdReply: {
      title: `𝓘𝓽𝓼𝓝𝓮𝓴𝓾`,
      body: global.author,
      thumbnailUrl: `https://telegra.ph/file/7eccaf6b9d12330543e36.jpg`,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}})*/
}
handler.command = /^(menu|help)$/i;

export default handler;