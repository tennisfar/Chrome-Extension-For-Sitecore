document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('dsSitecore').addEventListener('click', dsSitecore);
});

// const template = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: () => {
//       }
//     });
//   });
// };

const dsSitecore = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        let dsSC;
        let nextElShouldBeMarked;
        let foundName;
        let foundId;
        let found = [];
        let sitecoreUrl;
        let resizeTimeout;
        let dsSCExist;

        // toggle
        dsSCExist = document.querySelector('#dsSC');
        if (!!dsSCExist) {
          dsSCExist.remove();
          return;
        }

        const addStyle = () => {
          let style = document.querySelector('#dsSCStyle');
          if (!!style) style.remove();
          style = document.createElement('style');
          style.id = 'dsSCStyle';
          style.innerText = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=block');
        
        .dsSC__item {
          cursor: pointer;
          position: absolute;
          z-index: 10000000;
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
        
        .dsSC__item-close {
          position: relative;
          width: 30px;
          height: 30px;
          background: #222;
          margin: 0 -8px 0 10px;
        }
        
        .dsSC__item-close::before,
        .dsSC__item-close::after {
          position: absolute;
          top: 14px;
          left: 10px;
          content: "";
          width: 10px;
          height: 2px;
          background: white;
          transform: rotate(45deg);
        }
        
        .dsSC__item-close::after {
          transform: rotate(-45deg);
        }
        
        .dsSC__item-close:hover {
          background: red;
        }
        
        .dsSC__item img {
          height: 15px;
          width: 15px;
          margin-right: 5px;
        }
        
        .dsSC__target {
          filter: blur(2px) !important;
        }
        
        .dsSC__toggle {
          position: fixed;
          bottom: 5px;
          right: 5px;
          background: black;
          width: 25px;
          height: 25px;
          z-index: 1000000000;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          cursor: pointer;
          opacity: 0.3;
        }
        
        .dsSC__toggle:hover {
          opacity: 1;
        }
        
        .dsSC__toggle img {
          height: 15px;
          width: 15px;
        }
        
        .dsSC--hidden {
          display: none;
        }
        `.replace(/\n/g, '');
          document.body.appendChild(style);
        };

        const addToggle = () => {
          let dsSCToggle = document.querySelector('.dsSC__toggle');
          if (!!dsSCToggle) dsSCToggle.remove();
          dsSCToggle = document.createElement('div');
          dsSCToggle.classList.add('dsSC__toggle');
          dsSCToggle.innerHTML = `<img src='https://raw.githubusercontent.com/mikelothar/assets/master/ds-sitecore/icon.svg' alt>`;
          dsSCToggle.onclick = () => {
            const target = document.querySelector('#dsSC');
            target && target.classList.toggle('dsSC--hidden');
          };
          document.body.appendChild(dsSCToggle);
        };

        const reset = () => {
          dsSCExist = document.querySelector('#dsSC');
          if (!!dsSCExist) dsSCExist.remove();
          dsSC = document.createElement('div');
          dsSC.id = 'dsSC';
          previousTopPos = 0;
          previousLeftPos = 0;
        };

        const getSitecoreUrl = () => {
          const dlo = [
            'alt-eller-intet',
            'eurojackpot',
            'keno',
            'lotto',
            'vikinglotto',
            'plus-abonnement',
            'quick',
            'spil-sammen'
          ];
          const host = window.location.host
            .replace(/danskespil\.dk/, '')
            .toLowerCase()
            .replace(/\.$/, '');
          const region = window.location.pathname
            .replace(/^\//, '')
            .replace(/\/.*$/, '')
            .toLowerCase();
          let dliOrDlo = dlo.indexOf(region) > -1 ? 'editdlo' : 'editdli';
          dliOrDlo = (host === 'web.develop' || host === 'web.trunk') ? '' : dliOrDlo;
          sitecoreUrl = `https://${host}${dliOrDlo}.danskespil.dk/sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1&fo=`;
        };

        const checkForId = (child) => {
          const nodeValue = child.nodeValue;
          if (nodeValue.match(/^[^\/].*({.*})/)) {
            nextElShouldBeMarked = true;
            foundName = nodeValue.replace(/{.*}/, '').trim();
            foundId = nodeValue.match(/{.*}/)[0];
          }
        };

        const outputComments = (node) => {
          // initialise the child node
          let child = node.firstChild;
          const prevPositions = [];

          // loop while the child node exists
          while (child) {
            if (child === document.body.lastChild) {
              // found.map((item) => console.error(item.name, parseInt(item.top)))
              document.body.appendChild(dsSC);
            }

            // determine the type of the node
            switch (child.nodeType) {
              // if the node is an element node, recurse into it
            case Node.ELEMENT_NODE:
              if (nextElShouldBeMarked) {
                let childTopPos =
                  child.getBoundingClientRect().top + 10 + window.scrollY;
                let childLeftPos =
                  child.getBoundingClientRect().left + 10 + window.scrollX;

                if (childLeftPos < 10) childLeftPos = 10;

                let strippedId =
                  'dsSCId' +
                  foundId.replace('{', '').replace('}', '').toLowerCase();

                let el = document.createElement('a');
                el.href = `${sitecoreUrl}${foundId}`;
                el.target = 'dsSitecore';
                el.classList.add('dsSC__item');
                el.draggable = true;
                el.setAttribute('dsSCId', strippedId);
                child.classList.add(strippedId);

                if (prevPositions.includes(`${childTopPos},${childLeftPos}`)) {
                  childTopPos += 18;
                  childLeftPos += 18;
                }
                prevPositions.push(`${childTopPos},${childLeftPos}`);

                el.style.top = childTopPos + 'px';
                el.style.left = childLeftPos + 'px';
                el.innerHTML = `<img src='https://raw.githubusercontent.com/mikelothar/assets/master/ds-sitecore/icon.svg' alt> ${foundName
                  .replace(/View$/, '')
                  .split(/(?=[A-Z])/)
                  .join(' ')}`;

                let close = document.createElement('span');
                close.classList.add('dsSC__item-close');
                el.appendChild(close);
                close.addEventListener('click', (ev) => {
                  ev.preventDefault();
                  ev.target.parentElement.style.display = 'none';
                });

                el.onmouseover = (ev) => {
                  const target = document.querySelector(
                    `.${ev.target.getAttribute('dsSCId')}`
                  );
                  target && target.classList.add('dsSC__target');
                };
                el.onmouseout = (ev) => {
                  const target = document.querySelector(
                    `.${ev.target.getAttribute('dsSCId')}`
                  );
                  target && target.classList.remove('dsSC__target');
                };


                dsSC.appendChild(el);

                nextElShouldBeMarked = false;
                previousTopPos = childTopPos;
                found.push({ name: foundName, id: foundId, top: childTopPos });
              }
              outputComments(child);
              break;

              // if the node is a comment node, output its value
            case Node.COMMENT_NODE:
              checkForId(child);
              break;
            }

            // move to the next child node
            child = child.nextSibling;
          }
        };

        const init = () => {
          reset();
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => outputComments(document.body), 200);
        };

        addStyle();
        addToggle();
        getSitecoreUrl();

        init();
        window.onresize = () => init();
        window.onscroll = () => init();
      }
    });
  });
};

// const openInSitecore = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         function: () => {
//           console.error(window, window.location.origin);
//           let sitecoreId = window.dataLayer[0].page.id;
//           let lo = window.location.origin;
//           let cl = document.body.classList;
//           let isDlo = cl.contains("dlo");
//           let isDli = cl.contains("dli");
//           let reg = isDli ? "dli" : "dlo";
//
//           if (lo.includes("town")) lo = lo.replace(".dan", "edit" + reg + ".dan");
//           if (lo.includes("//da")) lo = lo.replace("//dan", "//edit" + reg + ".dan");
//
//           lo += "/sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1";
//           window.open(`${lo}&fo=${sitecoreId}`, "_blank");
//         },
//       },
//       ((res) => {
//         console.error('res', res);
//       })
//     );
//   });
// };
