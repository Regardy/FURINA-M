const { proto, generateWAMessage,  areJidsSameUser } = (await import('@adiwajshing/baileys')).default

async function before(m, chatUpdate) {
    if (m.isBaileys) return
    if (!m.message) return
    if(m.mtype == 'interactiveResponseMessage') ? appenTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate) : (m.mtype == 'templateButtonReplyMessage') ? appenTextMessage(m.msg.selectedId, chatUpdate) : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    
    async function appenTextMessage(text, chatUpdate) {
        let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
    }
              }
