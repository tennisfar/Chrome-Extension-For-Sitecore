let favorites = [];

chrome.runtime.onInstalled.addListener((reason) => {

  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({ favorites });
  }

});