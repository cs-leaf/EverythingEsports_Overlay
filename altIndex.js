import express from 'express' //imports
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// express looks for html and css stuff
app.use(express.static(`${__dirname}/static/`));
app.use(cors());

const server = createServer(app); // express serv
const io = new Server(server);// socket.io thing

const PORT = 5500; // establishes the port being used

app.get('/', (req, res) => { // gets the control.html
    res.sendFile(`${__dirname}/static/control.html`);
})

// sends a message in console what port is being listened to
console.log("Listening to Port " + PORT);

// listen for connects and disconnects
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
})

