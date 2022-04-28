import { createSSRApp, defineComponent, h } from "vue";
export { createApp };
import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import "../../assets/styles/tailwind.css";
import {setPageContext} from "../../plugins/usePageContext.js";
import {getRouteByName} from "../../routes.js";
import routes from './dashboard.routes.js';

const base = getRouteByName('dashboard').path + '/'

function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR
      ? createMemoryHistory(base)
      : createWebHistory(base),
    routes: routes,
  });
}

function createApp(pageContext) {
  const { Page, pageProps } = pageContext;
  const PageComponent = defineComponent({
    render() {
      return h(Page, pageProps || {});
    },
  });

  const app = createSSRApp(PageComponent);
  const router = createRouter();
  app.use(router);
  setPageContext(app, pageContext);
  return { app, router };
}
