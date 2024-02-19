const { Rcon } = require("rcon-client");

async function runRconCommand(user_text) {
    const rcon = await Rcon.connect({
        host: "localhost", port: 25575, password: "zhmdff123"
    });

    const response = await rcon.send(user_text);
    //console.log(response);
    rcon.end();
}

// Export the function to make it accessible from other files
module.exports = { runRconCommand };