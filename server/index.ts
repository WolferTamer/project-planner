import express from 'express';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const port = 3000;


//Requires CORS headers to run on localhost with react app
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
)

global.client = oAuth2Client

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

fs.readdir('routes', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  let filteredfiles = files.filter((file) => file.endsWith('.ts'))
  for (let file of filteredfiles) {
    const methods = require(`./routes/${file}`);

    //We have to manually seperate each method since Express uses different functions for each one.
    if (methods["get"]) {
      app.get(methods["get"].route, methods["get"].execute)
      console.log(`Initialized GET Method at ${methods["get"].route}`)
    } if (methods["post"]) {
      app.post(methods["post"].route, methods["post"].execute)
      console.log(`Initialized POST Method at ${methods["post"].route}`)
    } if (methods["put"]) {
      app.put(methods["put"].route, methods["put"].execute)
      console.log(`Initialized PUT Method at ${methods["put"].route}`)
    } if (methods["delete"]) {
      app.delete(methods["delete"].route, methods["delete"].execute)
      console.log(`Initialized delete Method at ${methods["delete"].route}`)
    }
  }
});