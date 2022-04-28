import { createApp } from "./dashboard.app";
export { render };
import {getDebug} from "../../../lib/utils.js";
import {commonPassToClient} from "../../ssr-config.js";
import {getRouteByName} from "../../routes.js";
import {handleRender} from "../renderer/renderer.js";
const debug = getDebug("dashboard", "server");
const dashboardBaseUrl =  getRouteByName('dashboard').path

export const passToClient = [
  ...commonPassToClient,
];


async function render(pageContext) {
  const {app, router} = createApp(pageContext);
  return await handleRender({
    pageContext,
    app,
    onBefore:async () => {
      const routeUrl = pageContext.url.substring(dashboardBaseUrl.length);
      router.push(routeUrl);
      await router.isReady();
    }
  });
}
