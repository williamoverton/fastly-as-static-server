import "wasi";
import { encode, decode } from "as-base64";
import { PageContent } from "./PageContent";
import { pages } from "../generated/pages";

export const Page = (path: string): string => {
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].paths.includes(path)) {
            const data = decode(pages[i].content)

            return String.UTF8.decode(data.buffer)
        }
    }

    return "404 NOT FOUND"
}