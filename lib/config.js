import {randomString} from "./utils.js";

export const jwtCookieField = 'auth.jwt';
export const jwtSecret = process.env.JWT_SECRET || randomString(10);

