export function enableDebug(){
  if (import.meta.env.SSR) throw new Error('this method must not be called from ServerSide')
  if (!import.meta.env.PROD) {
    localStorage.setItem("debug", "*");
  }
}
