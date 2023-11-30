This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# TL;DR
This is a simple toy project that let users create textures with traditional Chinese swallow kite concepts.
The textures can be used on the cheongsam model immediately.

The textures maker is driven by PIXI.js and the 3D scene is made by Babylon.js

# Todo List
[ ] Layer configuration

[ ] Localization storage of creation by indexDB

[ ] Asset presets

[ ] Make a cartoon shader material, it's a popular style these days.

[ ] Try some approaches to make the model more smooth (cloth simulation ?), any how, at least I should create a normal map

# Progress

## Project setup
![Project setup](./assets/ba5dfdac2a6ac06484a8c75193915996.png)

## Concept verfication

Generate a dynamic texture and update it to mesh
![](assets/dc9a3362f6e61b75e9eb8ff0ab94cf7f.png)

Verify how to generate texture and update the material of meshes.
![Layers info](./assets/a3a9543b578436e6e2ced9074af55b9b.png)

![Rendered](./assets/f079a5865f38ca1ec95dbf11fc213822.png)

## UI Enhancement
I'm pretend to make a sense of working hub
![](./assets/065CC0E05F927E6482EC4D5382552386.png)