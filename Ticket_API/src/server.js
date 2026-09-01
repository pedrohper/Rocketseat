import http from "node:http"
import { jsonHandler } from "./middleware/jsonHandler.js";
import { routeHandler } from "./middleware/routeHandler.js";

async function listener(req, res) { 
    await jsonHandler(req, res)
    routeHandler(req, res)
}

http.createServer(listener).listen(3333)