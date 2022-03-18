import {comparePassword, getDebug, hashPassword} from "../../lib/utils.js";
import db from "../../lib/database.js";

const debug = getDebug('auth.service');

export const AuthService = {
  async login(email, password) {
    const user = db.users.find(it => it.email === email)
    if (user) {
      const result = comparePassword(user.password, password);
      return result ? user : null;
    }
    debug('user not found with email:', email);
    await new Promise((r) => {
      setTimeout(r, 500 + (Math.random() * 500));
    });
    return null;
  },
  async setupAdminUser(email, password) {
    const [hasSetup] = db.users;
    if (hasSetup) return false;
    return db.users.push({
      email,
      password: hashPassword(password),
    });
  }
}

