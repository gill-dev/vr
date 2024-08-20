(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[928],{171:function(e,t,n){Promise.resolve().then(n.bind(n,4386)),Promise.resolve().then(n.bind(n,912)),Promise.resolve().then(n.bind(n,1481))},4386:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(7437),l=n(2265),o=n(4080),i=n.n(o);let a=l.forwardRef((e,t)=>(0,r.jsx)("model-viewer",{...e,ref:t}));a.displayName="ModelViewer";var u=()=>{let[e]=(0,l.useState)([{name:"Painting",src:"/models/artwork_173307_1_full.gltf",iosSrc:"/models/artwork_173307_1_fullusdz"}]),[t,n]=(0,l.useState)(null),o=(0,l.useRef)(null);(0,l.useEffect)(()=>{t&&o.current&&(o.current.src=t.src,o.current.iosSrc=t.iosSrc)},[t]);let u=e=>{n(e)};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i(),{src:"https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",type:"module"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{id:"item-buttons",children:e.map((e,t)=>(0,r.jsx)("button",{onClick:()=>u(e),children:e.name},t))}),t&&(0,r.jsx)(a,{ref:o,src:t.src,"ios-src":t.iosSrc,ar:!0,"ar-scale":"fixed","camera-controls":!0,"touch-action":"pan-y",alt:"A 3D model of ".concat(t.name),"shadow-intensity":"2","skybox-height":"2m","max-camera-orbit":"auto 90deg auto","xr-environment":!0,children:(0,r.jsx)("button",{slot:"ar-button",style:{backgroundColor:"white",borderRadius:"4px",border:"none",position:"absolute",top:"16px",right:"16px",height:"40px",width:"40px"},children:"\uD83D\uDC4B Activate AR"})})]})]})}},905:function(e,t){"use strict";let n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DOMAttributeNames:function(){return r},default:function(){return i},isEqualNode:function(){return o}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"};function l(e){let{type:t,props:n}=e,l=document.createElement(t);for(let e in n){if(!n.hasOwnProperty(e)||"children"===e||"dangerouslySetInnerHTML"===e||void 0===n[e])continue;let o=r[e]||e.toLowerCase();"script"===t&&("async"===o||"defer"===o||"noModule"===o)?l[o]=!!n[e]:l.setAttribute(o,n[e])}let{children:o,dangerouslySetInnerHTML:i}=n;return i?l.innerHTML=i.__html||"":o&&(l.textContent="string"==typeof o?o:Array.isArray(o)?o.join(""):""),l}function o(e,t){if(e instanceof HTMLElement&&t instanceof HTMLElement){let n=t.getAttribute("nonce");if(n&&!e.getAttribute("nonce")){let r=t.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===e.nonce&&e.isEqualNode(r)}}return e.isEqualNode(t)}function i(){return{mountedInstances:new Set,updateHead:e=>{let t={};e.forEach(e=>{if("link"===e.type&&e.props["data-optimized-fonts"]){if(document.querySelector('style[data-href="'+e.props["data-href"]+'"]'))return;e.props.href=e.props["data-href"],e.props["data-href"]=void 0}let n=t[e.type]||[];n.push(e),t[e.type]=n});let r=t.title?t.title[0]:null,l="";if(r){let{children:e}=r.props;l="string"==typeof e?e:Array.isArray(e)?e.join(""):""}l!==document.title&&(document.title=l),["meta","base","link","style","script"].forEach(e=>{n(e,t[e]||[])})}}}n=(e,t)=>{let n=document.getElementsByTagName("head")[0],r=n.querySelector("meta[name=next-head-count]"),i=Number(r.content),a=[];for(let t=0,n=r.previousElementSibling;t<i;t++,n=(null==n?void 0:n.previousElementSibling)||null){var u;(null==n?void 0:null==(u=n.tagName)?void 0:u.toLowerCase())===e&&a.push(n)}let s=t.map(l).filter(e=>{for(let t=0,n=a.length;t<n;t++)if(o(a[t],e))return a.splice(t,1),!1;return!0});a.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),s.forEach(e=>n.insertBefore(e,r)),r.content=(i-a.length+s.length).toString()},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9189:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{cancelIdleCallback:function(){return r},requestIdleCallback:function(){return n}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4080:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return g},handleClientScriptLoad:function(){return m},initScriptLoader:function(){return b}});let r=n(9920),l=n(1452),o=n(7437),i=r._(n(4887)),a=l._(n(2265)),u=n(6590),s=n(905),c=n(9189),d=new Map,f=new Set,p=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"],y=e=>{if(i.default.preinit){e.forEach(e=>{i.default.preinit(e,{as:"style"})});return}if("undefined"!=typeof window){let t=document.head;e.forEach(e=>{let n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e,t.appendChild(n)})}},h=e=>{let{src:t,id:n,onLoad:r=()=>{},onReady:l=null,dangerouslySetInnerHTML:o,children:i="",strategy:a="afterInteractive",onError:u,stylesheets:c}=e,h=n||t;if(h&&f.has(h))return;if(d.has(t)){f.add(h),d.get(t).then(r,u);return}let m=()=>{l&&l(),f.add(h)},b=document.createElement("script"),_=new Promise((e,t)=>{b.addEventListener("load",function(t){e(),r&&r.call(this,t),m()}),b.addEventListener("error",function(e){t(e)})}).catch(function(e){u&&u(e)});for(let[n,r]of(o?(b.innerHTML=o.__html||"",m()):i?(b.textContent="string"==typeof i?i:Array.isArray(i)?i.join(""):"",m()):t&&(b.src=t,d.set(t,_)),Object.entries(e))){if(void 0===r||p.includes(n))continue;let e=s.DOMAttributeNames[n]||n.toLowerCase();b.setAttribute(e,r)}"worker"===a&&b.setAttribute("type","text/partytown"),b.setAttribute("data-nscript",a),c&&y(c),document.body.appendChild(b)};function m(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>h(e))}):h(e)}function b(e){e.forEach(m),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");f.add(t)})}function _(e){let{id:t,src:n="",onLoad:r=()=>{},onReady:l=null,strategy:s="afterInteractive",onError:d,stylesheets:p,...y}=e,{updateScripts:m,scripts:b,getIsSsr:_,appDir:g,nonce:v}=(0,a.useContext)(u.HeadManagerContext),w=(0,a.useRef)(!1);(0,a.useEffect)(()=>{let e=t||n;w.current||(l&&e&&f.has(e)&&l(),w.current=!0)},[l,t,n]);let x=(0,a.useRef)(!1);if((0,a.useEffect)(()=>{!x.current&&("afterInteractive"===s?h(e):"lazyOnload"===s&&("complete"===document.readyState?(0,c.requestIdleCallback)(()=>h(e)):window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>h(e))})),x.current=!0)},[e,s]),("beforeInteractive"===s||"worker"===s)&&(m?(b[s]=(b[s]||[]).concat([{id:t,src:n,onLoad:r,onReady:l,onError:d,...y}]),m(b)):_&&_()?f.add(t||n):_&&!_()&&h(e)),g){if(p&&p.forEach(e=>{i.default.preinit(e,{as:"style"})}),"beforeInteractive"===s)return n?(i.default.preload(n,y.integrity?{as:"script",integrity:y.integrity,nonce:v}:{as:"script",nonce:v}),(0,o.jsx)("script",{nonce:v,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([n,{...y,id:t}])+")"}})):(y.dangerouslySetInnerHTML&&(y.children=y.dangerouslySetInnerHTML.__html,delete y.dangerouslySetInnerHTML),(0,o.jsx)("script",{nonce:v,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...y,id:t}])+")"}}));"afterInteractive"===s&&n&&i.default.preload(n,y.integrity?{as:"script",integrity:y.integrity,nonce:v}:{as:"script",nonce:v})}return null}Object.defineProperty(_,"__nextScript",{value:!0});let g=_;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},912:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return l}});let r=n(5592);function l(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new r.BailoutToCSRError(t);return n}},1481:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return o}});let r=n(7437),l=n(8512);function o(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,l.getExpectedRequestStore)("next/dynamic css"),o=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));o.push(...t)}}return 0===o.length?null:(0,r.jsx)(r.Fragment,{children:o.map(e=>(0,r.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}}},function(e){e.O(0,[971,23,744],function(){return e(e.s=171)}),_N_E=e.O()}]);