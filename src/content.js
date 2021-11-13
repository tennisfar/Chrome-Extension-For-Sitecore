(async () => {

  window.onload = () => {
    if (location.host === 'sixth.dk') {
      init();
    }
  };

  function init() {
    chrome.storage.sync.get("selectedFooBar", ({ selectedFooBar }) => {
      
      alert(`Chrome Plugin works, selected fooBar is ${selectedFooBar.foo}.`);

    });
  }

})();
