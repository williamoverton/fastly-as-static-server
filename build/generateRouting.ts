import mime from "mime-types";
import path from "path";
import fs from "fs";

const start = `
import { PageContent } from "../fileServer/PageContent";

export const pages: Array<PageContent> = [`

const end = `]`

const pageItem = (path: string[], content: string, type: string): string => {
    return `new PageContent(
        [${path.map(p => "'" + p + "'")}],
        "${Buffer.from(content, "utf8").toString("base64")}",
        "${type}"
    ),`
}

let fileBody = "";

fileBody += start;

const builtPath = path.join(__dirname, "../app/build")

fs.readdirSync(builtPath).forEach(file => {
    fileBody += pageItem(file == "index.html" ? [`/${file}`, "/"] : [`/${file}`], fs.readFileSync(path.join(builtPath, file), "utf8"), mime.lookup(file) as string)
});

fileBody = fileBody.slice(0, -1); //  remove trailing comma

fileBody += end;

const savePath = path.join(__dirname, "../assembly/generated/pages.ts")

fs.writeFileSync(savePath, fileBody);