import * as express from 'express';
const LOCAL_HOST_PORT = 3000;

const app = express();
app.use(express.static("wwroot"));

app.listen()