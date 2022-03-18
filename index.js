import http from "http";
import Express from 'express';
import {getWebUserInterfaceRequestListener} from "./web-ui/index.js";
import {ApiRouter} from "./api/api.router.js";
import cookieParser from 'cookie-parser'
const app = Express();
const webUI = await getWebUserInterfaceRequestListener();

app.use(cookieParser())
app.use('/api', ApiRouter);
app.use(webUI);

const server = http.createServer(app);
const port = +(process.env.PORT || 8585);
const hostname = process.env.HOST || '0.0.0.0';

server.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
