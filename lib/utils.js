import debug from "debug";

export function getDebug(name) {
  let namespace = `app:${name}`;
  return debug(namespace);
}

export function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random()
      * charactersLength));
  }
  return result;
}
