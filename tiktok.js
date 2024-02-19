const { WebcastPushConnection } = require('tiktok-live-connector');
const { runRconCommand } = require('./rcon'); // Import the function from rcon.js


let tiktokUsername = "terlan071official";
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);


tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

tiktokLiveConnection.on('chat', data => {
    //console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    const username = data.uniqueId; // Assuming you want to use data.userId as username
    const user_text = `execute at zhmdff run summon zombie ~ ~ ~ {CustomName:'{"text":"${username}"}'}`;
    runRconCommand(user_text);
})

tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    console.log(data);
})


