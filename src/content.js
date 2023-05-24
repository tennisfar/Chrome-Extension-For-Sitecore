(async () => {

  const isTivoliCasino = () => location.host.includes('tivolicasino.dk');

  const addImageDirectUrl = () => {
    let item = document.getElementById('EditorFrames')?.querySelector('div');
    let isVisible = item?.style.display !== 'none';
    const table = item?.querySelector('table.scEditorQuickInfo tbody');

    if (item?.id && isVisible && table && !table.querySelector('#scToolMediaPath')) {
      const tr = document.createElement('tr');
      tr.id = 'scToolMediaPath';
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const style = document.createElement('style');
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('onclick', 'javascript:this.select();return false');
      input.value = '-/media/' + item.id.replace('FContent', '') + '.ashx';

      td1.innerText = 'Relativ sti:';
      td2.appendChild(input);
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }
  };

  const findTextInDictionaries = () => {
    const txt = window.getSelection().toString();

    if (txt?.length > 4) {
      let results = {};

      const output = ({ key, key2, key3, key4, key5, key6, key7, key8, res, dictionaryKey }) => {
        key = key ? key + '/' : '';
        key2 = key2 ? key2 + '/' : '';
        key3 = key3 ? key3 + '/' : '';
        key4 = key4 ? key4 + '/' : '';
        key5 = key5 ? key5 + '/' : '';
        key6 = key6 ? key6 + '/' : '';
        key7 = key7 ? key7 + '/' : '';
        key8 = key8 ? key8 + '/' : '';

        const isDlo = dictionaryKey.includes('-DLO-');

        if (isTivoliCasino()) {
          results[dictionaryKey] = {
            isDlo,
            res: res + ' (' + key + key2 + key3 + key4 + key5 + key6 + key7 + key8 + ')'
          };
        }

        if (!isTivoliCasino()) {
          const region = dictionaryKey.split('path=/')[1].split('&')[0] + '/';

          results[region + key2 + key3 + key4 + key5 + key6 + key7 + key8] = {
            isDlo,
            res
          };
        }
      };

      let indexKey = 0;
      const dictionaryKeys = [];

      while (localStorage.key(indexKey)) {
        const storageKey = localStorage.key(indexKey);

        if (!isTivoliCasino()) {
          if (storageKey.includes('/dlo/scapi/common/dictionary/dictionary')) {
            dictionaryKeys.push(storageKey);
          }
        }

        if (isTivoliCasino()) {
          if (storageKey.startsWith('{') && storageKey.endsWith('}')) {
            dictionaryKeys.push(storageKey);
          }
        }

        indexKey++;
      }

      dictionaryKeys.forEach((dictionaryKey) => {

        const s = JSON.parse(localStorage.getItem(dictionaryKey));

        if (typeof s !== 'object')
          return;

        Object.keys(s).forEach(key => {
          if (!s[key]) return;

          if (typeof s[key] === 'string')
            if (s[key].includes(txt))
              output({
                key,
                res: s[key],
                dictionaryKey
              });

          Object.keys(s[key]).forEach(key2 => {
            if (typeof s[key][key2] === 'string')
              if (s[key][key2].includes(txt))
                output({
                  key,
                  key2,
                  res: s[key][key2],
                  dictionaryKey
                });

            Object.keys(s[key][key2]).forEach(key3 => {
              if (typeof s[key][key2][key3] === 'string')
                if (s[key][key2][key3].includes(txt))
                  output({
                    key,
                    key2,
                    key3,
                    res: s[key][key2][key3],
                    dictionaryKey
                  });

              Object.keys(s[key][key2][key3]).forEach(key4 => {
                if (typeof s[key][key2][key3][key4] === 'string')
                  if (s[key][key2][key3][key4].includes(txt))
                    output({
                      key,
                      key2,
                      key3,
                      key4,
                      res: s[key][key2][key3][key4],
                      dictionaryKey
                    });

                Object.keys(s[key][key2][key3][key4]).forEach(key5 => {
                  if (typeof s[key][key2][key3][key4][key5] === 'string')
                    if (s[key][key2][key3][key4][key5].includes(txt))
                      output({
                        key,
                        key2,
                        key3,
                        key4,
                        key5,
                        res: s[key][key2][key3][key4][key5],
                        dictionaryKey
                      });

                  Object.keys(s[key][key2][key3][key4][key5]).forEach(key6 => {
                    if (typeof s[key][key2][key3][key4][key5][key6] === 'string')
                      if (s[key][key2][key3][key4][key5][key6].includes(txt))
                        output({
                          key,
                          key2,
                          key3,
                          key4,
                          key5,
                          key6,
                          res: s[key][key2][key3][key4][key5][key6],
                          dictionaryKey
                        });

                    Object.keys(s[key][key2][key3][key4][key5][key6]).forEach(key7 => {
                      if (typeof s[key][key2][key3][key4][key5][key6][key7] === 'string')
                        if (s[key][key2][key3][key4][key5][key6][key7].includes(txt))
                          output({
                            key,
                            key2,
                            key3,
                            key4,
                            key5,
                            key6,
                            key7,
                            res: s[key][key2][key3][key4][key5][key6][key7],
                            dictionaryKey
                          });

                      Object.keys(s[key][key2][key3][key4][key5][key6][key7]).forEach(key8 => {
                        if (typeof s[key][key2][key3][key4][key5][key6][key7][key8] === 'string')
                          if (s[key][key2][key3][key4][key5][key6][key7][key8].includes(txt))
                            output({
                              key,
                              key2,
                              key3,
                              key4,
                              key5,
                              key6,
                              key7,
                              key8,
                              res: s[key][key2][key3][key4][key5][key6][key7][key8],
                              dictionaryKey
                            });

                      });
                    });
                  });
                });
              });
            });
          });
        });
      });

      const content = [];
      if (Object.keys(results).length > 150) return;
      Object.keys(results).forEach(key => {
        const url = getDictionaryUrl(results[key].isDlo) + key;
        content.push({ txt: results[key].res, url, key });
      });

      fillDictionary(content);
    } else {
      clearFillDictionary();
    }
  };

  const getDictionaryUrl = (isDlo) => {
    let dictionaryUrl = location.protocol + '//';
    const isTownEnv = location.host.split('.')[0].includes('town');
    if (isTownEnv) dictionaryUrl += location.host.split('.')[0];

    if (isTivoliCasino()) {
      dictionaryUrl += 'edit.tivolicasino.dk/sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1&fo=';
      return dictionaryUrl;
    }

    if (!isTivoliCasino()) {
      const isDevEnv = location.host.split('.')[0].includes('web');
      if (isDevEnv) dictionaryUrl += `web.${location.host.split('.')[1]}`;
      if (!isDevEnv) dictionaryUrl += `edit${isDlo ? 'dlo' : 'dli'}`;
      dictionaryUrl += '.danskespil.dk/sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1&fo=/sitecore/content/DanskeSpil/Site%20settings/Dictionary/';
      return dictionaryUrl;
    }
  };

  const clearFillDictionary = () => {
    let el = document.getElementById('findTextInDictionaries');
    if (el) el.remove();
    let style = document.getElementById('findTextInDictionariesStyle');
    if (style) style.remove();
  };

  const fillDictionary = (content) => {
    let el = document.getElementById('findTextInDictionaries');
    if (!el) {
      el = document.createElement('div');
      el.id = 'findTextInDictionaries';
      document.body.appendChild(el);
    } else {
      el.innerText = '';
    }

    let style = document.getElementById('findTextInDictionariesStyle');
    if (!style) {
      style = document.createElement('style');
      style.id = 'findTextInDictionariesStyle';
      document.body.appendChild(style);
    }

    style.innerText = `
        #findTextInDictionaries {
          position: fixed;
          z-index: 1000000001;
          left: 0;
          top: 100vh;
          font-size: 12px;
          line-height: 1.2;
          background: #ededed;
          padding: 15px 20px;
          box-shadow: 0 1px 13px 1px #ccc;
          max-height: 95vh;
          max-width: 95vw;
        }
        
        #findTextInDictionaries::after {
          position: absolute;
          z-index: 1000000000;
          content: "${content.length}";
          top: -35px;
          left: 10px;
          width: 40px;
          height: 40px;
          background: #bdffe5;
          color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50% 50% 0 0;
        }
        
        #findTextInDictionaries:hover {
          top: auto;
          bottom: 0;
          overflow: auto;
        }
        
        #findTextInDictionaries a {
          text-decoration: none;
        }
        
        #findTextInDictionaries a:hover {
          text-decoration: underline;
        }
        
        #findTextInDictionaries p {
          background: white;
          padding: 10px;
          margin-bottom: 5px;
        }
        
        #findTextInDictionaries a {
          margin: 0 0 5px 10px;
          display: inline-block;
        }
        `;

    content.forEach((dictionary) => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      const a = document.createElement('a');
      p.innerText = dictionary.txt;
      a.href = dictionary.url;
      a.target = '_blank';
      a.text = dictionary.key;
      div.appendChild(p);
      div.appendChild(a);
      el.appendChild(div);
    });
  };

  window.onload = () => {
    if ((location.host.endsWith('danskespil.dk') || location.host.endsWith('tivolicasino.dk')) && location.pathname.split('/')[1] !== 'sitecore') {
      document.addEventListener('selectionchange', findTextInDictionaries);
    }

    if (location.pathname === '/sitecore/shell/Applications/Content%20Editor.aspx') {
      stretchColumn();
      scrollToItem();
      addBookmark();
      setInterval(addBookmark, 500);
      setInterval(enlargeTreelist, 500);

      document.addEventListener('click', () => {
        setTimeout(addFavorites, 500);
      });

      addFavorites();
    }

    if (location.pathname === '/sitecore/shell/Applications/Content%20Manager/Default.aspx') {
      setInterval(addImageDirectUrl, 500);
    }
  };

  const stretchColumn = () => {
    const columnWidth = 400;
    document.cookie = `scContentEditorFoldersWidth=${columnWidth}; expires=Thu, 31 Dec 2100 12:00:00 UTC; path=/`;
    document.querySelector("#ContentTreePanel").style.width = `${columnWidth}px`;
    document.querySelector(".splitter-bar-vertical").style.left = `${columnWidth}px`;
    const editor = document.querySelector("#ContentEditor");
    editor.style.width = parseInt(editor.style.width) - columnWidth + parseInt(editor.style.left) + "px";
    editor.style.left = `${columnWidth}px`;
  };

  const scrollToItem = () => {
    const selectedItem = document.querySelectorAll('.scContentTreeNodeActive')[0];
    const toggleArrow = selectedItem.parentElement.querySelector('img');
    toggleArrow && toggleArrow.click();
    selectedItem && selectedItem.parentElement && selectedItem.parentElement.scrollIntoView();
  };

  let previousSelectedSitecoreId = '';

  const getActiveTreeNodeText = () => {
    return document.querySelector(".scContentTreeNodeActive span").innerText;
  };

  const getActiveTreeNodePath = () => {
    return document.querySelector(".scEditorQuickInfo tr:nth-child(3) .scEditorHeaderQuickInfoInput").value;
  };

  const addBookmark = () => {
    const sitecoreText = getActiveTreeNodeText();
    if (sitecoreText === previousSelectedSitecoreId) return;
    previousSelectedSitecoreId = sitecoreText;

    let bookmarkLink = document.querySelector('#bookmarkLink');
    let bookmarkStyle = document.querySelector('#bookmarkStyle');

    if (!bookmarkLink) {
      bookmarkLink = document.createElement('a');
      bookmarkLink.id = "bookmarkLink";
      document.querySelector('body').appendChild(bookmarkLink);
      bookmarkStyle = document.createElement('style');
      bookmarkStyle.id = "bookmarkStyle";
      document.querySelector('body').appendChild(bookmarkStyle);
    }

    bookmarkLink.href = `javascript:window.location.href=window.location.origin+'/sitecore/shell/Applications/Content Editor.aspx?sc_bw=1&fo=${getActiveTreeNodePath()}'`;
    bookmarkLink.innerHTML = sitecoreText;

    bookmarkStyle.innerHTML = `
      #bookmarkLink {
          position: fixed;
          z-index: 1000000;
          top: 11px;
          left: 60px;
          cursor: pointer;
          height: 30px;
          display: flex;
          align-items: center;
          font-size: 10px;
          font-weight: 500;
          font-family: 'Montserrat', 'Open Sans', Helvetica, Arial, sans-serif;
          background: black;
          color: white;
          padding: 0 8px 0 7px;
          box-shadow: 0 0 0px 1px #585858;
          border-radius: 3px;
          text-decoration: none;
          line-height: 15px;
      }
    `;
  };

  const enlargeTreelist = () => {
    const dataSection = document.querySelector('[id*="Section_Data"]');
    if (!dataSection) return;
    let dataTreelist = document.querySelector('[id*="Section_Data"]').parentElement.querySelector('.scContentControlTreelist');
    if (!dataTreelist) return;
    dataTreelist.style = 'height: 500px;';
  };

  let showFavoritesPopup = false;

  const addFavorites = () => {
    let favoritesStyle = document.querySelector('#ChromeExtensionForSitecoreFavoritesStyle');

    if (!favoritesStyle) {
      favoritesStyle = document.createElement('style');
      favoritesStyle.id = "ChromeExtensionForSitecoreFavoritesStyle";
      document.querySelector('body').appendChild(favoritesStyle);
      favoritesStyle.innerHTML = `
      .sc-globalHeader {
        z-index: 101;
      }
      
      #ChromeExtensionForSitecoreFavorites {
        position: relative;
        cursor: pointer;
      }
      #ChromeExtensionForSitecoreFavoritesPopup {
        position: absolute;
        z-index: 100000;
        background: #2b2b2b;
        top: 50px;
        right: 10px;
        min-width: 200px;
        text-align: left;
        padding: 0 5px 6px;
      }
      
      .ChromeExtensionForSitecoreFavoritesPopupItem {
        position: relative;
        height: auto;
        padding: 6px 7px;
        line-height: 1.4;
        font-size: 12px;
        cursor: pointer;
        padding-right: 35px;
        white-space: nowrap;
      }
      .ChromeExtensionForSitecoreFavoritesPopupItem:hover {
        background: black;
        text-decoration: underline;
      }
      
      .ChromeExtensionForSitecoreFavoritesPopupItem span.ChromeExtensionForSitecoreFavoritesPopupItemRemove {
        position: absolute;
        z-index: 1;
        top: 5px;
        right: 5px;
        background: black;
        width: 18px;
        height: 18px;
        text-align: center;
      }
      
      .ChromeExtensionForSitecoreFavoritesPopupItem span.ChromeExtensionForSitecoreFavoritesPopupItemRemove:hover {
        background: red; 
      }
      
      .ChromeExtensionForSitecoreFavoritesPopupItem span.ChromeExtensionForSitecoreFavoritesPopupItemParent {
        color: #969696;
      }
    
      #ChromeExtensionForSitecoreFavoritesPopupAddFavorite {
        height: auto;
        padding: 6px 7px;
        line-height: 1.4;
        font-size: 12px;
        cursor: pointer;
        background: red;
        white-space: nowrap;
      }
      `;
    }

    chrome.storage.sync.get("favorites", ({ favorites }) => {
      favorites = favorites || [];
      favorites = favorites.sort((a, b) => (a.path > b.path) ? 1 : -1);

      const accInfo = document.querySelector('.sc-accountInformation');
      let fav = document.querySelector('#ChromeExtensionForSitecoreFavorites');
      let popup = document.querySelector('#ChromeExtensionForSitecoreFavoritesPopup');

      if (!fav) {
        fav = document.createElement('li');
        fav.id = 'ChromeExtensionForSitecoreFavorites';
        fav.innerText = 'Favorites';
        accInfo.insertBefore(fav, accInfo.firstChild);
        fav.addEventListener('click', () => {
          showFavoritesPopup = !showFavoritesPopup;
          addFavorites();
        });
      }

      if (!showFavoritesPopup && popup) {
        fav.removeChild(popup);
      }

      if (showFavoritesPopup) {

        if (!popup) {
          popup = document.createElement('div');
          popup.id = 'ChromeExtensionForSitecoreFavoritesPopup';
          fav.appendChild(popup);
        }

        favorites.forEach(favorite => {

          let f = document.querySelector(`[ChromeExtensionForSitecoreFavoritesPopupItem="${favorite.path}"]`);

          if (!f) {
            f = document.createElement('div');
            f.className = 'ChromeExtensionForSitecoreFavoritesPopupItem';
            f.setAttribute('ChromeExtensionForSitecoreFavoritesPopupItem', favorite.path);

            f.addEventListener('click', () => {
              window.location.href = `${location.origin}${location.pathname}?sc_bw=1&fo=${favorite.path}`;
            });

            f.appendChild(getFavoriteItemParentText(favorite));
            f.appendChild(getFavoriteItemLabel(favorite));

            let remove = document.createElement('span');
            remove.className = 'ChromeExtensionForSitecoreFavoritesPopupItemRemove';
            remove.innerText = 'x';
            remove.addEventListener('click', () => {
              favorites = favorites.filter(f => f !== favorite);
              chrome.storage.sync.set({ favorites });
              popup.removeChild(f);
              addFavorites();
            });

            f.appendChild(remove);
            popup.appendChild(f);
          }
        });

        let isItemInMenu = document.querySelector(`[ChromeExtensionForSitecoreFavoritesPopupItem = "${getActiveTreeNodePath()}"]`);
        let addButton = document.getElementById('ChromeExtensionForSitecoreFavoritesPopupAddFavorite');

        if (addButton) popup.removeChild(addButton);

        if (!isItemInMenu) {
          addButton = document.createElement('div');
          addButton.id = 'ChromeExtensionForSitecoreFavoritesPopupAddFavorite';
          addButton.innerText = `Add ${getActiveTreeNodeText()} ? `;
          addButton.addEventListener('click', ev => {
            favorites.push({
              label: getActiveTreeNodeText(),
              path: getActiveTreeNodePath(),
            });
            chrome.storage.sync.set({ favorites });
            addFavorites();
          });

          popup.appendChild(addButton);
        }
      }
    });
  };

  const getFavoriteItemLabel = favorite => {
    let span = document.createElement('span');
    span.innerText = favorite.label;
    return span;
  };

  const getFavoriteItemParentText = (favorite) => {
    let path = favorite.path.split('/');
    path.pop();
    path = path.join('/');
    path = `${path}/ `;
    let span = document.createElement('span');
    span.className = 'ChromeExtensionForSitecoreFavoritesPopupItemParent';
    span.innerText = path;
    return span;
  };

})();
