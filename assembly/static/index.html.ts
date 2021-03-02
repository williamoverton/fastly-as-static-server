import "wasi";
import { encode, decode } from "as-base64";

class PageContent {
    constructor(public paths: string[], public content: string, public type: string) { }
}

const pages: Array<PageContent> = [
    new PageContent(
        ["/", "/index.html"],
        "PGgxPkF5eXl5PC9oMT5cbjxiPkkgYW0gaHRtbDwvYj4K",
        "text/html"
    ),
    new PageContent(
        ["/test"],
        "QmVhbnMK",
        "text/html"
    )
]

export const Page = (path: string): string => {
    // return "cake";

    // const data = decode("PGgxPkF5eXl5PC9oMT5cbjxiPkkgYW0gaHRtbDwvYj4K");

    // const content = pages.find((page) => {
    //     return page.paths.includes(path)
    // })

    for (let i = 0 ; i < pages.length; i++) {
        if (pages[i].paths.includes(path)) {
            const data = decode(pages[i].content)

            return String.UTF8.decode(data.buffer)
        }
    }

    return "404 NOT FOUND"
}