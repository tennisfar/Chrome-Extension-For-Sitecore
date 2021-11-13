const fooBars = [
  {
    foo: 'bar1',
    bar: 'baz1',
  },
  {
    foo: 'bar2',
    bar: 'baz2',
  },
];

let selectedFooBar = fooBars[0];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ fooBars });
  chrome.storage.sync.set({ selectedFooBar });
});