const mongoose = require('mongoose');

async function connectToDb(url) {
    const candidates = [];

    if (url) candidates.push(url);
    candidates.push('mongodb://127.0.0.1:27017/short-url2');
    candidates.push('mongodb://localhost:27017/short-url2');

    let lastError = null;

    for (const candidate of candidates) {
        try {
            await mongoose.connect(candidate, {
                serverSelectionTimeoutMS: 3000,
            });
            console.log(`✅ MongoDB Connected using: ${candidate}`);
            return;
        } catch (error) {
            lastError = error;
            console.warn(`⚠️ Failed to connect to ${candidate}: ${error.message}`);
        }
    }

    throw lastError;
}

module.exports = connectToDb;