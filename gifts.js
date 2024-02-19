const { WebcastPushConnection } = require('tiktok-live-connector');
const fs = require('fs');

let tiktokUsername = "13nezish";
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Create a write stream to the log file
const logStream = fs.createWriteStream('console_logz.txt', { flags: 'a' });

// Redirect console output to the log stream
console.log = (...args) => logStream.write(args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ') + '\n');
console.error = (...args) => logStream.write(args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ') + '\n');

tiktokLiveConnection.getAvailableGifts().then(giftList => {
    console.log(giftList);
    giftList.forEach(gift => {
        console.log(`id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`);
    });
}).catch(err => {
    console.error(err);
});
