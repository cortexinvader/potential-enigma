const fs = require('fs');
const path = require('path');
const settings = require('../settings');
const isOwnerOrSudo = require('../lib/isOwner');

async function cmdCommand(sock, chatId, message) {
    // Only allow owner for security!
    const senderJid = message.key.participant || message.key.remoteJid;
    const isOwner = await isOwnerOrSudo(senderJid);

    if (!isOwner) {
        await sock.sendMessage(chatId, { text: '❌ Only owner can use .cmd!' }, { quoted: message });
        return;
    }

    const fullText = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
    const args = fullText.trim().split(' ').slice(1); // Remove ".cmd"
    const subCmd = args[0];

    if (subCmd === '-i' && args.length >= 3) {
        const fileName = args[1];
        // Extract code: everything after filename
        const codeStartIdx = fullText.indexOf(fileName) + fileName.length;
        const code = fullText.slice(codeStartIdx).trim();

        if (!/^[a-zA-Z0-9_\-\.]+\.js$/.test(fileName)) {
            await sock.sendMessage(chatId, { text: '❌ Invalid JS filename.' }, { quoted: message });
            return;
        }
        if (!code || code.length < 10) {
            await sock.sendMessage(chatId, { text: '❌ Code is too short or missing.' }, { quoted: message });
            return;
        }

        const cmdPath = path.join(__dirname, fileName);
        try {
            fs.writeFileSync(cmdPath, code, 'utf8');
            await sock.sendMessage(chatId, { text: `✅ Command ${fileName} added/updated!` }, { quoted: message });
        } catch (err) {
            await sock.sendMessage(chatId, { text: `❌ Failed to write file: ${err.message}` }, { quoted: message });
        }
        return;
    }

    if (subCmd === 'rm' && args.length >= 2) {
        const fileName = args[1];
        if (!/^[a-zA-Z0-9_\-\.]+\.js$/.test(fileName)) {
            await sock.sendMessage(chatId, { text: '❌ Invalid JS filename.' }, { quoted: message });
            return;
        }
        const cmdPath = path.join(__dirname, fileName);
        try {
            if (fs.existsSync(cmdPath)) {
                fs.unlinkSync(cmdPath);
                await sock.sendMessage(chatId, { text: `✅ Command ${fileName} deleted!` }, { quoted: message });
            } else {
                await sock.sendMessage(chatId, { text: `❌ File not found.` }, { quoted: message });
            }
        } catch (err) {
            await sock.sendMessage(chatId, { text: `❌ Failed to delete file: ${err.message}` }, { quoted: message });
        }
        return;
    }

    await sock.sendMessage(chatId, {
        text: `❓ Usage:
.cmd -i <filename.js> <code>   (Add/update command)
.cmd rm <filename.js>          (Delete command)
Example:
.cmd -i test.js module.exports = async (sock, chatId, message) => { await sock.sendMessage(chatId, {text: "Test!"}); }
.cmd rm test.js
`,
        quoted: message
    });
}

module.exports = cmdCommand;
