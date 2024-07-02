//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner) return dfail('owner', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    m.reply('✅ Bot dalam grup ini dinonaktifkan sayang ku')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['banchat', 'chatoff'] 

export default handler
 
