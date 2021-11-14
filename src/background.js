let favorites = [];

// let sitecoreObj = {};

chrome.runtime.onInstalled.addListener((reason) => {

  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({ favorites });
    // chrome.storage.sync.set({ sitecoreObj });
  }

});