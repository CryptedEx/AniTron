<p align="center">
  <div align="center">
    <a href="https://github.com/awe03/anitron">
      <img src="https://media.discordapp.net/attachments/766123423914917909/1056099806277283920/logo.png" alt="Logo">
    </a>
    <h3>AniTron - Your all in one source of entertainment</h3>
    <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">
      <img src="https://img.shields.io/github/license/awe03/anitron?logo=gnu&color=a32d2a&labelColor=333&logoColor=fff&style=flat-square">
    </a>
    <a href="https://github.com/awe03/anitron/stargazers">
      <img src="https://img.shields.io/github/stars/awe03/anitron?style=flat-square" alt="Github Stars">
    </a>
    <a href="https://github.com/chirag-droid/issues">
      <img src="https://img.shields.io/github/issues/awe03/anitron?style=flat-square">
    </a>
    <a href="https://github.com/chirag-droid/forks">
      <img src="https://img.shields.io/github/forks/awe03/anitron?style=flat-square">
    </a>
  </div>

  <hr />

  <p align="center">
    An anime/manga/drama streaming website than can be run locally or deployd on the cloud
  </p>
</p>

<p align="center">
  <a href="https://nextjs.org">
    <img src="https://img.shields.io/github/package-json/dependency-version/awe03/anitron/next?filename=package.json&color=fff&labelColor=000&logo=nextdotjs&style=flat-square">
  </a>
  <a href="https://18.reactjs.org/">
    <img src="https://img.shields.io/github/package-json/dependency-version/awe03/anitron/react?filename=package.json&color=5fd9fb&logo=react&labelColor=222435&style=flat-square">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/github/package-json/dependency-version/awe03/anitron/dev/tailwindcss?filename=package.json&color=37b8f1&logo=tailwindcss&labelColor=0b1120&style=flat-square&logoColor=38bdf8">
  </a>
</p>

<img src="https://user-images.githubusercontent.com/106132059/201474291-5daffcd0-85fc-4c24-a0fa-4451b0e18a9b.png">

<hr/>

## Hosting

I recommend hosting this on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)  as it is free and easy to setup. You can also host this on any other cloud provider or locally.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/awe03/anitron/tree/main&project-name=anitron&repo-name=anitron&build-command=cd%20../%20%26%26%20yarn%20build&install-command=cd%20../%20%26%26%20yarn%20install)

[![Deploy with netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/awe03/anitron)

## Local Deployment

These instructions will assume that you have [Node.js](https://nodejs.org/en/) and [Git](https://gitforwindows.org/) installed.

Download the repository
```bash
git clone https://github.com/awe03/anitron
```

If you haven't already, install [Yarn](https://yarnpkg.com) and run the following commands in the root directory of the project
```bash
npm i -g yarn
```
> This probably requires admin privileges

Download the dependencies
```bash
yarn install
```

Build and start the project
```bash
yarn build
yarn start
```

The app will start on http://localhost:3000
