import db from "../../../../lib/database";
import {getRouteByName} from "../../../routes.js";
import {getDebug} from "../../../../lib/utils.js";
const debug = getDebug('login:ss')
export const passToClient = ['shouldSetup','pageProps','dashboardUrl']

export async function onBeforeRender() {
  const hasSetup = db.users && db.users.length;
  const dashboardUrl = getRouteByName('dashboard').path
  return {
    pageContext:{
      shouldSetup: !hasSetup,
      dashboardUrl,
    }
  };
}
