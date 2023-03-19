export const openUrl = (url: string, openInNewTab = false) =>
  window.open(url, openInNewTab ? '_blank' : '_self');
