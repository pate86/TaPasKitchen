// app.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware statics(C, js, img)
app.use(express.static(path.join(__dirname, '..', 'taPasKitchen')));


// routen
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/kitchen', (req, res) => {
    res.sendFile(path.join(__dirname, 'kitchen.html'));
});

// server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});




import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

// assistent config
//const assistant = await openai.beta.assistants.create({
//	name: "TaPa's Koch",
//	instructions: "Du bist ein koch der mit wenig zutaten gute gerichte zaubert",
//	tools: [
//		{
//			type: "code_interpreter",
//		},
//	],
//	model: "gpt-3.5-turbo-16k"
//});

const assistant = await openai.beta.assistants.retrieve(
	"asst_F6MmFkeweReqmTJFudGD4oLJ"
);
console.log(assistant);

//Threads
// Threads variable ertellen. (ID wird sichtbar im terminal) 
//const thread = await openai.beta.threads.create();

// Message variable erstellen um es an threads variable hinzuzufügen
//const message = await openai.beta.threads.messages.create(thread.id, {
//	role: "user",
//	content: "was macht 50 * 50"
//});

// RUN ASSISTANT 
//const run = await openai.beta.threads.runs.create(thread.id, {	
//	assistant_id: assistant.id,
//	instructions: "Address the user as hobby Koch"
//});

// RUN ASSISTANT um den neuen status anzuzeigen von zeile 37-41 (zeile 37-41 ausklammern)
//const run = await openai.beta.threads.runs.retrieve(
//	"thread_8i3wJ9A6k2UQ06ahZ9J3OZcp",
//	"run_Cax9AvMJDTIhQCCxlWqO1RLA"
//);

//console.log(run);

//const messages = await openai.beta.threads.messages.list(
//	"thread_8i3wJ9A6k2UQ06ahZ9J3OZcp"
//);

//console.log(messages);

//messages.body.data.forEach(message => {
//	console.log(message.content);
//});

const logs = await openai.beta.threads.runs.steps.list(
	"thread_8i3wJ9A6k2UQ06ahZ9J3OZcp",
	"run_L80GZJJQbV9oeHqh6XemR3sd"
);


// AB HIER MUSS DIE API ANFRAGEN BEARBEITEN KÖNNEN ## FREE KONTIGENT LEER!!!!!


logs.body.data.forEach((log) => {
	console.log(log.step_details);
});
console.log(logs);