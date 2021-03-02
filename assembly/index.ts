import { Request, Response, Fastly, Headers } from "@fastly/as-compute";
import "wasi";
import { Console, Environ, FileSystem } from "as-wasi";

import {Page} from "./static/index.html";

function main(req: Request): Response {

    let method = req.method();
    let urlParts = req.url().split("//").pop().split("/");
    let host = urlParts.shift();
    let path = "/" + urlParts.join("/");


    // return new Response(String.UTF8.encode("Welcome to Fastly Compute@Edge!"), {
    //   status: 200,
    // });

    let headers = new Headers();
    headers.set("Content-type", "text/html");

    return new Response(String.UTF8.encode(Page(path)), {
        status: 200,
        headers: headers
    });
}

// Get the request from the client.
let req = Fastly.getClientRequest();

// Pass the request to the main request handler function.
let resp = main(req);

// Send the response back to the client.
Fastly.respondWith(resp);
