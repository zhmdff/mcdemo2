const { Rcon } = require("rcon-client");

async function listenForPlayerDeaths() {
    const rcon = await Rcon.connect({
        host: "localhost",
        port: 25575,
        password: "zhmdff123"
    });

    // Listening for console logs
    rcon.on("output", (output) => {
        console.log("Received output:", output); // Debug log
        // Check if the output contains information about a player's death
        if (output.includes("was slain by")) {
            // Extract relevant information
            console.log("Death message found:", output); // Debug log
            const [_, player, action, byWhom] = output.match(/(.+) was (.+) by (.+)/);
            console.log(`${player} ${action} by ${byWhom}`);
        }
    });

    // Send a command to enable console output
    await rcon.send("gamerule sendCommandFeedback true");

    // Keep the connection open indefinitely to continue listening
}

// Call the function to start listening for player deaths
listenForPlayerDeaths();
