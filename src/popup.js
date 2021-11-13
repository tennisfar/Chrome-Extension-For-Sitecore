chrome.storage.sync.get("fooBars", ({ fooBars }) => {

  const select = document.querySelector('select');
  let selected;

  chrome.storage.sync.get("selectedFooBar", ({ selectedFooBar }) => {
    selected = selectedFooBar.foo;

    fooBars.map(fooBar => {
      let option = document.createElement('option');
      option.innerText = fooBar.foo;
      option.value = fooBar.foo;

      if (selected === fooBar.foo) {
        option.setAttribute('selected', '');
      }

      option.addEventListener('click', () => {
        let selectedFooBar = fooBar;
        chrome.storage.sync.set({ selectedFooBar });
      });

      select.appendChild(option);
    });
  });
});
