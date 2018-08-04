!function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function e(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(t,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&e(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",t?this.root=n?t.replace(/\/$/,"/"+this._hash):t.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(t){return t instanceof RegExp?t:t.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(t){return t.replace(/\/$/,"").split("/").length}function s(t,e){return i(e)-i(t)}function r(t){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(e){var i=function(t){var e=[];return{regexp:t instanceof RegExp?t:new RegExp(t.replace(n.PARAMETER_REGEXP,function(t,o,i){return e.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:e}}(o(e.route)),s=i.regexp,r=i.paramNames,a=t.replace(/^\/+/,"/").match(s),h=function(t,e){return 0===e.length?null:t?t.slice(1,t.length).reduce(function(t,n,o){return null===t&&(t={}),t[e[o]]=decodeURIComponent(n),t},null):null}(a,r);return!!a&&{match:a,route:e,params:h}}).filter(function(t){return t})}function a(t,e){return r(t,e)[0]||!1}function h(t,e){var n=e.map(function(e){return""===e.route||"*"===e.route?t:t.split(new RegExp(e.route+"($|/)"))[0]}),i=o(t);return n.length>1?n.reduce(function(t,e){return t.length>e.length&&(t=e),t},n[0]):1===n.length?n[0]:i}function u(t,n,o){var i,s=function(t){return t.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),e()&&!n?s(t).split(o)[0]:(i=t.split(o)).length>1?s(i[1]):s(i[0])}function c(e,n,o){if(n&&"object"===(void 0===n?"undefined":t(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(e(),n.after&&n.after(o))},o);if(n.after)return e(),void(n.after&&n.after(o))}e()}n.prototype={helpers:{match:a,root:h,clean:o,getOnlyURL:u},navigate:function(t,e){var n;return t=t||"",this._usePushState?(n=(n=(e?"":this._getRoot()+"/")+t.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(t=t.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+t),this},on:function(){for(var e=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===t(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else if("object"===t(o[0])){Object.keys(o[0]).sort(s).forEach(function(t){e.on(t,o[0][t])})}return this},off:function(t){return null!==this._defaultHandler&&t===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&t===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(e,n){return n.handler!==t&&e.push(n),e},[]),this},notFound:function(t,e){return this._notFoundHandler={handler:t,hooks:e},this},resolve:function(t){var n,o,i=this,s=(t||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var r=function(t){return t.split(/\?(.*)?$/).slice(1).join("")}(t||this._cLoc()),h=u(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&h===this._lastRouteResolved.url&&r===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=a(h,this._routes))?(this._callLeave(),this._lastRouteResolved={url:h,query:r,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,c(function(){c(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,r)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===h||"/"===h||h===this._hash||function(t,n,o){if(e()&&!n)return!1;if(!t.match(o))return!1;var i=t.split(o);return i.length<2||""===i[1]}(h,this._useHash,this._hash))?(c(function(){c(function(){i._callLeave(),i._lastRouteResolved={url:h,query:r,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(r)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&c(function(){c(function(){i._callLeave(),i._lastRouteResolved={url:h,query:r,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(r)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var t=this;"undefined"!=typeof document&&this._findLinks().forEach(function(e){e.hasListenerAttached||(e.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=t.getLinkPath(e);t._destroyed||(n.preventDefault(),t.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),e.hasListenerAttached=!0)})},generate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===t)for(i in n=o.route,e)n=n.toString().replace(":"+i,e[i]);return n},"");return this._useHash?this._hash+n:n},link:function(t){return this._getRoot()+t},pause:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=t,this._historyAPIUpdateMethod=t?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(t){return void 0===t?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=t,t)},disableIfAPINotAvailable:function(){e()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(t){return t.getAttribute("href")},hooks:function(t){this._genericHooks=t},_add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof e&&(e=encodeURI(e)),this._routes.push("object"===(void 0===n?"undefined":t(n))?{route:e,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:e,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=h(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var t=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var e=this._cLoc(),n=void 0,o=void 0;(o=function(){n=t._cLoc(),e!==n&&(e=n,t.resolve()),t._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var t=this._lastRouteResolved;t&&t.hooks&&t.hooks.leave&&t.hooks.leave(t.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="";var l=new n("http://localhost:5000",!0,"#!");function d(){}function _(t,e){for(var n in e)t[n]=e[n];return t}function f(t,e){e.appendChild(t)}function p(t,e,n){e.insertBefore(t,n)}function g(t){t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function v(t){return document.createTextNode(t)}function y(t,e,n){t.setAttribute(e,n)}function R(){return Object.create(null)}function E(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function L(t,e){return t!=t?e==e:t!==e}function P(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var o=0;o<n.length;o+=1){var i=n[o];if(!i.__calling)try{i.__calling=!0,i.call(this,e)}finally{i.__calling=!1}}}function w(){return this._state}function A(t,e){t._handlers=R(),t._bind=e._bind,t.options=e,t.root=e.root||t,t.store=e.store||t.root.store}function b(t,e){var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}}function k(t){for(;t&&t.length;)t.shift()()}function C(){this.store._remove(this)}var H={destroy:function(t){this.destroy=d,this.fire("destroy"),this.set=d,this._fragment.d(!1!==t),this._fragment=null,this._state={}},get:w,fire:P,on:b,set:function(t){this._set(_({},t)),this.root._lock||(this.root._lock=!0,k(this.root._beforecreate),k(this.root._oncreate),k(this.root._aftercreate),this.root._lock=!1)},_recompute:d,_set:function(t){var e=this._state,n={},o=!1;for(var i in t)this._differs(t[i],e[i])&&(n[i]=o=!0);o&&(this._state=_(_({},e),t),this._recompute(n,this._state),this._bind&&this._bind(n,this._state),this._fragment&&(this.fire("state",{changed:n,current:this._state,previous:e}),this._fragment.p(n,this._state),this.fire("update",{changed:n,current:this._state,previous:e})))},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:E};function I(t,e){var n,o,i,s=e.$Page;function r(e){return{root:t.root,store:t.store}}if(s)var a=new s(r());return{c:function(){(n=m("div")).innerHTML='<a href="/" data-navigo="">Home</a> | \n  <a href="/products" data-navigo="">Products</a> | \n  <a href="/jobs" data-navigo="">Jobs</a> | \n  <a href="/about" data-navigo="">About Us</a>',o=v("\n"),a&&a._fragment.c(),i=document.createComment("")},m:function(t,e){p(n,t,e),p(o,t,e),a&&a._mount(t,e),p(i,t,e)},p:function(t,e){s!==(s=e.$Page)&&(a&&a.destroy(),s?((a=new s(r()))._fragment.c(),a._mount(i.parentNode,i)):a=null)},d:function(t){t&&(g(n),g(o),g(i)),a&&a.destroy(t)}}}function N(t){var e=this;A(this,t),this._state=_(this.store._init(["Page"]),t.data),this.store._add(this,["Page"]),this._intro=!0,this._handlers.destroy=[C],t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=I(this,this._state),this.root._oncreate.push(function(){(function(){l.updatePageLinks()}).call(e),e.fire("update",{changed:function(t,e){for(var n in e)t[n]=1;return t}({},e._state),current:e._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),this._lock=!0,k(this._beforecreate),k(this._oncreate),k(this._aftercreate),this._lock=!1)}function S(t){var e;A(this,t),this._state=_({},t.data),this._intro=!0,this._fragment=(this._state,{c:function(){(e=m("h1")).textContent="Home"},m:function(t,n){p(e,t,n)},p:d,d:function(t){t&&g(e)}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function x(t){var e;A(this,t),this._state=_({},t.data),this._intro=!0,this._fragment=(this._state,{c:function(){(e=m("h1")).textContent="Products"},m:function(t,n){p(e,t,n)},p:d,d:function(t){t&&g(e)}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function $(t){var e;A(this,t),this._state=_({},t.data),this._intro=!0,this._fragment=(this._state,{c:function(){(e=m("h1")).textContent="Jobs"},m:function(t,n){p(e,t,n)},p:d,d:function(t){t&&g(e)}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function O(t,e){var n,o,i,s;return{c:function(){n=m("h3"),o=v("Your contact person is "),i=m("u"),s=v(e.contactPerson)},m:function(t,e){p(n,t,e),f(o,n),f(i,n),f(s,i)},p:function(t,e){t.contactPerson&&(s.data=e.contactPerson)},d:function(t){t&&g(n)}}}function F(t){var e,n,o,i,s,r,a,h,u,c,l,d,R,E,L,P,w,b,k,C,H,I,N,S,x,$;A(this,t),this._state=_({title:"Contact",clientName:"John Doe",clientEmail:"john.doe@test.com",clientAge:33},t.data),this._intro=!0,this._fragment=(e=this._state,$=!!e.contactPerson&&O(0,e),{c:function(){n=m("h2"),o=v(e.title),i=v("\n"),s=m("div"),$&&$.c(),r=v("\n  "),(a=m("label")).textContent="Name",h=v("\n  "),u=m("input"),c=v("\n  "),(l=m("label")).textContent="Email",d=v("\n  "),R=m("input"),E=v("\n  "),(L=m("label")).textContent="Age",P=v("\n  "),w=m("input"),b=v("\n  "),k=m("br"),C=v("\n  "),H=m("textarea"),I=v("\n  "),N=m("br"),S=v("\n  "),(x=m("button")).textContent="Send",a.htmlFor="clientName",u.id="clientName",y(u,"type","text"),u.value=e.clientName,l.htmlFor="clientEmail",R.id="clientEmail",y(R,"type","email"),R.value=e.clientEmail,L.htmlFor="clientAge",w.id="clientAge",y(w,"type","number"),w.value=e.clientAge,H.id="message",H.className="svelte-p673kc",x.name="send",x.id="send",s.className="contact svelte-p673kc"},m:function(t,e){p(n,t,e),f(o,n),p(i,t,e),p(s,t,e),$&&$.m(s,null),f(r,s),f(a,s),f(h,s),f(u,s),f(c,s),f(l,s),f(d,s),f(R,s),f(E,s),f(L,s),f(P,s),f(w,s),f(b,s),f(k,s),f(C,s),f(H,s),f(I,s),f(N,s),f(S,s),f(x,s)},p:function(t,e){t.title&&(o.data=e.title),e.contactPerson?$?$.p(t,e):(($=O(0,e)).c(),$.m(s,r)):$&&($.d(1),$=null),t.clientName&&(u.value=e.clientName),t.clientEmail&&(R.value=e.clientEmail),t.clientAge&&(w.value=e.clientAge)},d:function(t){t&&(g(n),g(i),g(s)),$&&$.d()}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor))}function D(t){var e,n,o,i;A(this,t),this._state=_({},t.data),this._intro=!0,t.root||(this._oncreate=[],this._beforecreate=[],this._aftercreate=[]),this._fragment=(e=this,this._state,i=new F({root:e.root,store:e.store,data:{contactPerson:"Jane Doe"}}),{c:function(){(n=m("h1")).textContent="About Us",o=v("\n"),i._fragment.c()},m:function(t,e){p(n,t,e),p(o,t,e),i._mount(t,e)},p:d,d:function(t){t&&(g(n),g(o)),i.destroy(t)}}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),this._lock=!0,k(this._beforecreate),k(this._oncreate),k(this._aftercreate),this._lock=!1)}function G(t,e){this._handlers={},this._dependents=[],this._computed=R(),this._sortedComputedProperties=[],this._state=_({},t),this._differs=e&&e.immutable?L:E}_(N.prototype,H),_(S.prototype,H),_(x.prototype,H),_($.prototype,H),_(F.prototype,H),_(D.prototype,H),_(G.prototype,{_add(t,e){this._dependents.push({component:t,props:e})},_init(t){const e={};for(let n=0;n<t.length;n+=1){const o=t[n];e["$"+o]=this._state[o]}return e},_remove(t){let e=this._dependents.length;for(;e--;)if(this._dependents[e].component===t)return void this._dependents.splice(e,1)},_set(t,e){const n=this._state;this._state=_(_({},n),t);for(let t=0;t<this._sortedComputedProperties.length;t+=1)this._sortedComputedProperties[t].update(this._state,e);this.fire("state",{changed:e,previous:n,current:this._state});const o=this._dependents.slice();for(let t=0;t<o.length;t+=1){const n=o[t],i={};let s=!1;for(let t=0;t<n.props.length;t+=1){const o=n.props[t];o in e&&(i["$"+o]=this._state[o],s=!0)}s&&n.component.set(i)}this.fire("update",{changed:e,previous:n,current:this._state})},_sortComputedProperties(){const t=this._computed,e=this._sortedComputedProperties=[],n=R();let o;function i(s){const r=t[s];r&&(r.deps.forEach(t=>{if(t===o)throw new Error(`Cyclical dependency detected between ${t} <-> ${s}`);i(t)}),n[s]||(n[s]=!0,e.push(r)))}for(const t in this._computed)i(o=t)},compute(t,e,n){let o;const i={deps:e,update:(i,s,r)=>{const a=e.map(t=>(t in s&&(r=!0),i[t]));if(r){const e=n.apply(null,a);this._differs(e,o)&&(o=e,s[t]=!0,i[t]=o)}}};this._computed[t]=i,this._sortComputedProperties();const s=_({},this._state),r={};i.update(s,r,!0),this._set(s,r)},fire:P,get:w,on:b,set(t){const e=this._state,n=this._changed={};let o=!1;for(const i in t){if(this._computed[i])throw new Error(`'${i}' is a read-only property`);this._differs(t[i],e[i])&&(n[i]=o=!0)}o&&this._set(t,n)}});var M=new G({Page:S});window.store=M;new N({target:document.querySelector("root"),store:M});var j=function(){console.log(JSON.stringify(l.lastRouteResolved(),null,2))};l.on({"/products":{as:"Products",uses:function(){j(),M.set({Page:x})}},"/jobs":{as:"Jobs",uses:function(){j(),M.set({Page:$})}},"/about":{as:"About",uses:function(){j(),M.set({Page:D})}},"/":{as:"Home",uses:function(){j(),M.set({Page:S})}}}).resolve()}();
//# sourceMappingURL=bundle.js.map
