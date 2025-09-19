const settings = require('../settings');
const { isSudo } = require('./index');
const fs = require('fs');
const path = require('path');

async function isOwnerOrSudo(senderId) {
    // Check if sender is the main owner from settings
    if (settings.ownerNumber) {
        const ownerJid = settings.ownerNumber + "@s.whatsapp.net";
        if (senderId === ownerJid) return true;
    }

    // Check sudo users only if not owner
    try {
        return await isSudo(senderId);
    } catch (e) {
        return false;
    }
}

// Function to check if sender is the main owner only (not sudo)
function isMainOwner(senderId) {
    if (settings.ownerNumber) {
        const ownerJid = settings.ownerNumber + "@s.whatsapp.net";
        return senderId === ownerJid;
    }
    return false;
}

module.exports = isOwnerOrSudo;
module.exports.isMainOwner = isMainOwner;