import { createApp } from "./app.js";
import {commonPassToClient} from "../../ssr-config.js";
import {handleRender} from "./renderer.js";

export { render };
export const passToClient = [
  ...commonPassToClient,
];




async function render(pageContext) {
  const app = createApp(pageContext);
  return await handleRender({pageContext,app})
}
