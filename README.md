# React SPA app in Fastly Compute@Edge

This repo contains a react app in the `app` folder and a static file server inside `assembly`

#### This is very messy and should not be used as best practices!

# Building

1. Replace the fastly.toml file with one for your service
2. Run `npm run fullbuild` from the root directory.

## How does it work?

- Inside the `app` directory there is a react app which is compiled with webpack into a `app/build` folder.
- All the files inside this directory are then wrapped into a ts file by the `build/generateRoutes.ts` file by calling the command `npm run build-routing`.
- This generates the file in `assembly/generated/pages.ts`
- When you now run `fastly compute build` that file including the contents of all the files from the built react app are built into the AssemblyScript app.
