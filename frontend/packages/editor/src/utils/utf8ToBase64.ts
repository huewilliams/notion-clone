export function utf8ToBase64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
