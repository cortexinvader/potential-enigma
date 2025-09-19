const settings = {
  packname: process.env.PACK_NAME || 'Cortex Bot',
  author: process.env.AUTHOR || 'SULEIMAN',
  botName: process.env.BOT_NAME || "Cortex Bot",
  botOwner: process.env.BOT_OWNER || 'SULEIMAN', // Creator name
  ownerNumber: process.env.OWNER_NUMBERS || '2348088941798', //Set your number here without + symbol, just add country code & number without any space
  ownerNumbers: (process.env.OWNER_NUMBERS || '2348088941798').split(',').map(num => num.trim()), // Support multiple owners
  giphyApiKey: 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  commandMode: "public",
  maxStoreMessages: 20, 
  storeWriteInterval: 10000,
  description: "This is a bot for managing group commands and automating tasks.",
  version: "2.1.8",
  updateZipUrl: "https://github.com/cortexinvader/Cortexbot-MD/archive/refs/heads/main.zip",
};

module.exports = settings;
