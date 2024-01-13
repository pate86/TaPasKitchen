// app.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware statics(C, js, img)
app.use(express.static(path.join(__dirname, '..', 'taPasKitchen')));

// Routen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/kitchen', (req, res) => {
    res.sendFile(path.join(__dirname, 'kitchen.html'));
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware für JSON-Requests hinzufügen
app.use(bodyParser.json());

// OpenAI-Objekt erstellen
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

// Neue Route für die OpenAI API-Anfrage
app.post('/openai', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // OpenAI-Anfrage durchführen
        const response = await chatbotFunction(userMessage);
        res.json({ response });
    } catch (error) {
        console.error('Fehler beim Anfordern der Chat-Antwort:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Chatbot-Funktion für OpenAI-Anfrage
const chatbotFunction = async (userMessage) => {
    try {
        // Beispiel: Chatbot-Anfrage an OpenAI
        const response = await openai.chat.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: userMessage },
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Fehler beim Anfordern der Chat-Antwort:', error);
        return 'Es gab leider ein Problem beim Laden der Antwort.';
    }
};

// Weitere OpenAI-Konfiguration und Funktionalitäten können hier ergänzt werden
