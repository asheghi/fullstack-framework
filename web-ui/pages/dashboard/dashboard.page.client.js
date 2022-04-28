import { getPage } from "vite-plugin-ssr/client";
import { createApp } from "./dashboard.app";
import {enableDebug} from "../../plugins/debug.js";

hydrate();

async function hydrate() {
  const pageContext = await getPage();
  const { Page,pageProps} = pageContext;
  const { app, router } = createApp({Page,pageProps});
  await router.isReady();

  app.mount("#app");
}

enableDebug();
