import { createSSRApp, defineComponent, h } from "vue";
export { createApp };

import '../../assets/styles/tailwind.css'
import {setPageContext} from "../../plugins/usePageContext.js";

function createApp(pageContext) {
  const { Page, pageProps } = pageContext;
  const PageComponent = defineComponent({
    render() {
      return h(Page, pageProps || {});
    },
  });

  const app = createSSRApp(PageComponent);
  setPageContext(app, pageContext);

  return app;
}
