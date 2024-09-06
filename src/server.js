import express from 'express';
const app = express();
import http from "http";
import {routes} from "./routes";

export const create_server = async () => {
    const {host, port, ssl} = config

    const httpServer = http.createServer({}, app)

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    // Check IP
    app.use(function(req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        if (globalThis.whiteList.length && globalThis.whiteList.indexOf(ip) === -1) {
            res.status(403).send('Forbidden')
            return
        }
        next();
    });
    // CORS
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.locals.pretty = true

    routes(app)

    httpServer.listen(port, host, () => {
        console.log(`SMS Server is running on http${ssl ? 's' : ''}://${host}:${port}`)
    })
}