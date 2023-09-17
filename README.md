# Setup a new Site

1. use this template to create a new repo
2. Set the secrets:
   2.1. CYON_KEY: create new ssh-key, add public key in cyon
   2.2. SSH_HOST: is the cyon server to connect to.
   2.3. SSH_USER: is the cyon admin user
   2.4. SSH_PATH: is the path on the folder: ~/public_html/\_domain-name
3. Set the Variables:
   This is just the PUBLIC_MAPTILER_TOKEN - found here: https://cloud.maptiler.com/account/keys/
4. Go live in setting the ENV-Variable PUBLIC_DEVMODE to false in this file: /.github/workflows/main.yml

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
