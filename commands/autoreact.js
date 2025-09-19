
const fs = require('fs');
const path = require('path');

async function autoreactCommand(sock, chatId, message) {
    try {
        // Check if sender is the owner or sudo
        const senderJid = message.key.participant || message.key.remoteJid;
        const isOwnerOrSudo = require('../lib/isOwner');
        const hasPermission = await isOwnerOrSudo(senderJid);

        if (!hasPermission) {
            await sock.sendMessage(chatId, {
                text: '❌ This command is only available for the owner or sudo users!',
            });
            return;
        }

        // Get command arguments
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        const args = text.trim().split(' ').slice(1);
        const action = args[0]?.toLowerCase();

        // Path to user group data
        const dataPath = path.join(__dirname, '../data/userGroupData.json');
        
        // Load current data
        let data = {};
        if (fs.existsSync(dataPath)) {
            try {
                data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            } catch (err) {
                console.error('Error reading userGroupData:', err);
            }
        }

        if (!action || (action !== 'on' && action !== 'off')) {
            const currentStatus = data.autoReaction ? 'ON' : 'OFF';
            await sock.sendMessage(chatId, {
                text: `🔄 *Auto Reaction Settings*\n\nCurrent Status: ${currentStatus}\n\n*Commands:*\n.autoreact on - Enable auto reactions\n.autoreact off - Disable auto reactions`,
            });
            return;
        }

        // Update setting
        data.autoReaction = action === 'on';

        // Save data
        try {
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
            await sock.sendMessage(chatId, {
                text: `✅ Auto reactions have been ${action === 'on' ? 'enabled' : 'disabled'}!`,
            });
        } catch (err) {
            console.error('Error saving autoreact config:', err);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to update auto reaction settings!',
            });
        }

    } catch (error) {
        console.error('Error in autoreact command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error processing autoreact command!',
        });
    }
}

module.exports = autoreactCommand;
