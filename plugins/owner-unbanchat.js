//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isROwner} ) => {
    if (!isOwner) return dfail('owner', m, conn)
    global.db.data.chats[m.chat].isBanned = false
    m.reply('✅ Bot aktif dalam grup ini')   
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = ['chaton', 'unbanchat'] 

export default handler
