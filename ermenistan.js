const fs = require('fs');
const axios = require('axios');

// Read the content of the text file
fs.readFile('gift_data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const giftData = JSON.parse(data);

        // Download each image
        giftData.forEach(item => {
            const { diamond_count, name, id, url } = item;
            const filename = `${diamond_count}-${id}-${name}.webp`;

            // Download the image
            axios({
                url: url,
                method: 'GET',
                responseType: 'stream'
            }).then(response => {
                // Save the image
                const writer = fs.createWriteStream(filename);
                response.data.pipe(writer);
                writer.on('finish', () => {
                    console.log(`Downloaded ${filename}`);
                });
                writer.on('error', (err) => {
                    console.error(`Error writing ${filename}:`, err);
                });
            }).catch(error => {
                console.error(`Error downloading ${filename}:`, error);
            });
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
