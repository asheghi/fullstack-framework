import {renderToString} from "@vue/server-renderer";
import {dangerouslySkipEscape, escapeInject} from "vite-plugin-ssr";

export async function handleRender({pageContext,app,onBefore}) {
  if (onBefore) await onBefore();

  const appHtml = await renderToString(app);

  // See https://vite-plugin-ssr.com/head
  const {documentProps, locale, direction, brandName} = pageContext;
  const title = (documentProps && documentProps.title) || brandName;
  const desc = (documentProps && documentProps.description) || brandName;

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
