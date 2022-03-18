import Express from "express";
import {AuthRouter} from "./auth/auth.router.js";
import {authenticateRequest} from "./auth/auth.middleware.js";

const app = Express.Router();

// simulate slow network on dev mode
if (process.env.SIMULATE_SLOW_NETWORK) {
  app.use((req, res, next) => {
    setTimeout(next, 1500);
  });
}

app.use(`/auth`, authenticateRequest, AuthRouter);

export const ApiRouter = app;
