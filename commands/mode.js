// Check if the user is the owner
    const senderJid = message.key.participant || message.key.remoteJid;
    const isOwnerOrSudoFunc = require('../lib/isOwner');
    const isOwner = await isOwnerOrSudoFunc(senderJid);

    if (!isOwner) {
        await sock.sendMessage(chatId, { 
            text: '❌ This command is only available for the owner or sudo users!' 
        }, { quoted: message });
        return;
    }
// Check if the user is the owner
    const senderJid = message.key.participant || message.key.remoteJid;
    const isOwnerOrSudoFunc = require('../lib/isOwner');
    const isOwner = await isOwnerOrSudoFunc(senderJid);

    if (!isOwner) {
        await sock.sendMessage(chatId, { 
            text: '❌ This command is only available for the owner or sudo users!' 
        }, { quoted: message });
        return;
    }