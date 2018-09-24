!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("cdav",[],t):"object"==typeof exports?exports.cdav=t():e.cdav=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n={};function s(e){return(...t)=>{s.enabled&&console.log(e,t)}}r.r(n),r.d(n,"DAV",function(){return u}),r.d(n,"IETF_CALDAV",function(){return p}),r.d(n,"IETF_CARDDAV",function(){return d}),r.d(n,"OWNCLOUD",function(){return h}),r.d(n,"NEXTCLOUD",function(){return m}),r.d(n,"APPLE",function(){return f}),r.d(n,"CALENDARSERVER",function(){return y}),s.enabled=!1;s("request.js");class a{constructor(e,t=null){this.baseUrl=e,this._davClient=new dav.Client({baseUrl:e}),this._davClient.xhrProvider=t||this._davClient.xhrProvider}async basic(e,t,r,n){return t=this.absoluteUrl(t),this._davClient.request(e,t,r,n)}async get(e,t){return e=this.absoluteUrl(e),this._davClient.request("GET",e,t)}async patch(e,t,r){return e=this.absoluteUrl(e),this._davClient.request("PATCH",e,t,r)}async post(e,t,r){return e=this.absoluteUrl(e),this._davClient.request("POST",e,t,r)}async put(e,t,r){return e=this.absoluteUrl(e),this._davClient.request("PUT",e,t,r)}async delete(e,t={}){return e=this.absoluteUrl(e),this._davClient.request("DELETE",e,t)}async copy(e){e=this.absoluteUrl(e)}async move(e){e=this.absoluteUrl(e)}async propFind(e,t,r=0,n={}){const s=t.map(e=>`{${e[0]}}${e[1]}`);return e=this.absoluteUrl(e),this._davClient.propFind(e,s,r,n).then(e=>{if(!c(e.status))throw new Error("PropFind request was not successful");if(0===r)return l(o(e.body.propStat));{const t=i(e.body);return Object.entries(t).forEach(([e,r])=>{t[e]=l(o(r))}),t}})}async propPatch(e,t,r){return e=this.absoluteUrl(e),this._davClient.request("PROPPATCH",e,t,r)}async mkCol(e,t,r){return e=this.absoluteUrl(e),Object.assign(t,{"Content-Type":"application/xml; charset=utf-8"}),this._davClient.request("MKCOL",e,t,r)}async report(e,t,r){return e=this.absoluteUrl(e),this._davClient.request("REPORT",e,t,r).then(e=>{if(!c(e.status))throw new Error("PropFind request was not successful");const t=i(e.body);return Object.entries(t).forEach(([e,r])=>{t[e]=l(o(r))}),t})}filename(e){let t=this.pathname(e);"/"===t.substr(-1)&&(t=t.substr(0,t.length-1));const r=t.lastIndexOf("/");return t.substr(r)}pathname(e){return new URL(e,this.baseUrl).pathname}absoluteUrl(e){return new URL(e,this.baseUrl).href}}function i(e){const t={};return e.forEach(e=>{t[e.href]=e.propStat}),t}function o(e){return e.filter(e=>c(function(e){return parseInt(e.split(" ")[1])}(e.status)))}function c(e){return e>=200&&e<300}function l(e){const t=[{}];return e.forEach(e=>{t.push(e.properties)}),Object.assign.apply(null,t)}const u="DAV:",p="urn:ietf:params:xml:ns:caldav",d="urn:ietf:params:xml:ns:carddav",h="http://owncloud.org/ns",m="http://nextcloud.com/ns",f="http://apple.com/ns/ical/",y="http://calendarserver.org/ns/";function b(e,t){return e=e||"",t=t||"",""!==e&&(e+="-"),""!==t&&(t="."+t),e+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){const t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16).toUpperCase()})+t}const _=new XMLSerializer;let g={};function x(){if(0===arguments.length)return[{},null];const e={name:arguments[0],children:[]};let t=e.children;return Array.prototype.slice.call(arguments,1).forEach(function(e){const r={name:e,children:[]};t.push(r),t=r.children}),[e,t]}function v(e){if("object"!=typeof(e=e||{})||!e.hasOwnProperty("name"))return"";const t=document.implementation.createDocument("","",null);return function e(t,r,n){const[s,a]=n.name;const i=t.createElementNS(s,function(e,t){g.hasOwnProperty(e)||(g[e]="x"+Object.keys(g).length);return g[e]+":"+t}(s,a));n.attributes=n.attributes||[];n.attributes.forEach(e=>{if(2===e.length){const[t,r]=e;i.setAttribute(t,r)}else{const[t,r,n]=e;i.setAttributeNS(t,r,n)}});n.value?i.textContent=n.value:n.children&&n.children.forEach(r=>{e(t,i,r)});r.appendChild(i)}(t,t,e),_.serializeToString(t)}class P{constructor(){this._eventListeners={}}addEventListener(e,t,r={}){this._eventListeners[e]=this._eventListeners[e]||[],this._eventListeners[e].push({listener:t,options:r})}removeEventListener(e,t,r={}){if(!this._eventListeners[e])return;const n=this._eventListeners[e].findIndex(({sListener:e,sOptions:n})=>t===e&&r===n);-1!==n&&this._eventListeners[e].splice(n,1)}dispatchEvent(e,t){this._eventListeners[e]&&this._eventListeners[e].forEach(({listener:r,options:n})=>{n.once&&this.removeEventListener(e,r,n),r(t)})}}function C(e){const t={};return Object.entries(e).forEach(([e,r])=>{switch(e){case"{DAV:}acl":t[e]=function(e){const t=[];return e.forEach(e=>{const r=e.childNodes,n={};let s={principal:n,grant:[],deny:[],protect:[],inherit:[]};r.forEach(e=>{if("DAV:"===e.namespaceURI&&"principal"===e.localName){const t=e.children[0];return n.type=t.localName,"href"===t.localName&&(n.href=t.textContent),!0}return!1}),t.find(e=>e.principal.type===n.type&&e.principal.href===n.href&&(s=e,!0))||t.push(s),r.forEach(e=>{"DAV:"===e.namespaceURI&&"grant"===e.localName&&e.childNodes.forEach(e=>{"DAV:"===e.namespaceURI&&"privilege"===e.localName&&s.grant.push("{"+e.children[0].namespaceURI+"}"+e.children[0].localName)})})}),t}(r);break;case"{DAV:}displayname":case"{DAV:}sync-token":t[e]=function(e){return e}(r);break;case"{DAV:}owner":t[e]=function(e){return e[0].textContent}(r);break;case"{DAV:}resourcetype":t[e]=function(e){return e.map(e=>"{"+e.namespaceURI+"}"+e.localName)}(r)}}),t}function F(e){const t=[];return Object.entries(e).forEach(([e,r])=>{switch(e){case"{DAV:}displayname":t.push({name:[u,"displayname"],value:r})}}),t}const A=s("DavObject");class w extends P{constructor(e,t,r,n,s=!1){super(),Object.assign(this,{_parent:e,_request:t,_url:r,_props:n,_isPartial:s,_isDirty:!1}),this._exposeProperty("etag",u,"getetag"),this._exposeProperty("contenttype",u,"getcontenttype"),Object.defineProperty(this,"url",{get:()=>this._url})}async fetchCompleteData(){this._isPartial&&(this._props=await this._request.propFind(this._url,this.constructor.getPropFindList(),0),this._isDirty=!1,this._isPartial=!1)}async copy(e){A(`copying ${this.url} from ${this._parent.url} to ${e.url}`)}async move(e){A(`moving ${this.url} from ${this._parent.url} to ${e.url}`)}async update(){if(this._isPartial)return;if(!this._isDirty)return;const e={"If-Match":this.etag};return this._request.put(this.url,e,this.data).then(e=>(this._isDirty=!1,e))}async delete(){return this._request.delete(this.url)}isPartial(){return this._isPartial}_exposeProperty(e,t,r,n=!1){n?Object.defineProperty(this,e,{get:()=>this._props[`{${t}}${r}`],set:e=>{this._isDirty=!0,this._props[`{${t}}${r}`]=e}}):Object.defineProperty(this,e,{get:()=>this._props[`{${t}}${r}`]})}static getPropFindList(){return[[u,"getcontenttype"],[u,"getetag"],[u,"resourcetype"]]}}const O=s("DavCollection");class j extends P{constructor(e,t,r,n){super(),Object.assign(this,{_parent:e,_request:t,_url:r,_rawProps:n,_props:{},_collectionFactoryMapper:{},_objectFactoryMapper:{},_isDirty:!1,_updatedProperties:[],_childrenNames:[],_propFindList:[],_propSetFactory:[]}),this._registerPropFindParser(C),this._registerPropSetFactory(F),this._exposeProperty("displayname",u,"displayname",!0),this._exposeProperty("acl",u,"acl"),this._exposeProperty("owner",u,"owner"),this._exposeProperty("resourcetype",u,"resourcetype"),this._exposeProperty("syncToken",u,"sync-token"),Object.defineProperty(this,"url",{get:()=>this._url})}async findAll(){const e=await this._request.propFind(this._url,this._propFindList,1);return this._handleMultiStatusResponse(e,!1)}async findAllByFilter(e){return(await this.findAll()).filter(e)}async find(e){const t=await this._request.propFind(this._url+e,this._propFindList,0);return this._handleMultiStatusResponse({[this._url+e]:t},!1)[0]}async createCollection(e,t){O("creating a collection");const[r,n]=x([u,"mkcol"],[u,"set"],[u,"prop"]);t.forEach(e=>{n.push(e)});const s=this._getAvailableNameFromToken(e),a=v(r);return await this._request.mkCol(this.url+s,{},a),this.find(s)}async createObject(e,t,r){return O("creating an object"),await this._request.put(this.url+e,t,r),this.find(e)}async update(){if(0===this._updatedProperties.length)return;const e={};this._updatedProperties.forEach(t=>{e[t]=this._props[t]});const t=this._propSetFactory.reduce((t,r)=>[...t,...r(e)],[]),[r,n]=x([u,"propertyupdate"],[u,"set"],[u,"prop"]);n.push(...t);const s=v(r);return this._request.propPatch(this._url,{},s)}async delete(){return this._request.delete(this._url)}_registerCollectionFactory(e,t){this._collectionFactoryMapper[e]=t,"function"==typeof t.getPropFindList&&Array.prototype.push.apply(this._propFindList,t.getPropFindList())}_registerObjectFactory(e,t){this._objectFactoryMapper[e]=t,"function"==typeof t.getPropFindList&&Array.prototype.push.apply(this._propFindList,t.getPropFindList())}_registerPropFindParser(e){Object.assign(this._props,e(this._rawProps))}_registerPropSetFactory(e){this._propSetFactory.push(e)}_exposeProperty(e,t,r,n=!1){n?Object.defineProperty(this,e,{get:()=>this._props[`{${t}}${r}`],set:e=>{this._props[`{${t}}${r}`]=e,-1===this._updatedProperties.indexOf(`{${t}}${r}`)&&this._updatedProperties.push(`{${t}}${r}`)}}):Object.defineProperty(this,e,{get:()=>this._props[`{${t}}${r}`]})}_getAvailableNameFromToken(e){return function(e,t){let r=(e=e||"").toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"");if(""===r&&(r="-"),t(r))return r;if(-1===r.indexOf("-")&&t(r+="-1"))return r;do{const e=r.lastIndexOf("-"),t=r.substr(0,e);let n=r.substr(e+1);n.match(/^\d+$/)?(n=parseInt(n),r=t+"-"+ ++n):r+="-1"}while(!1===t(r));return r}(e,e=>-1===this._childrenNames.indexOf(this._url+e)&&-1===this._childrenNames.indexOf(this._url+e+"/"))}_handleMultiStatusResponse(e,t=!1){const r=[],n=[];return Object.entries(e).forEach(([e,s])=>{if(e===this._url)return;r.push(e);const a=this._request.pathname(e);if(""===s["{DAV:}resourcetype"]){O(`${e} was identified as a file`);const r=s["{DAV:}getcontenttype"].split(";")[0];if(!this._objectFactoryMapper[r])return O(`No constructor for content-type ${r} (${e}) registered, treating as generic object`),void n.push(new w(this,this._request,a,s));n.push(new this._objectFactoryMapper[r](this,this._request,a,s,t))}else{O(`${e} was identified as a collection`);const t=function(e){if(!e["{"+u+"}resourcetype"])return null;const t=e["{"+u+"}resourcetype"].find(e=>k(e)!=="{"+u+"}collection");if(!t)return null;return k(t)}(s);if(!t)return O(`Collection-type of ${e} was not specified, treating as generic collection`),void n.push(new j(this,this._request,a,s));if(!this._collectionFactoryMapper[t])return O(`No constructor for collection-type ${t} (${e}) registered, treating as generic collection`),void n.push(new j(this,this._request,a,s));n.push(new this._collectionFactoryMapper[t](this,this._request,a,s))}}),this._childrenNames.push(...r),n}static getPropFindList(){return[[u,"acl"],[u,"displayname"],[u,"owner"],[u,"resourcetype"],[u,"sync-token"],[u,"current-user-privilege-set"]]}}function k(e){return"{"+e.namespaceURI+"}"+e.localName}function L(e){const t={};return Object.entries(e).forEach(([e,r])=>{switch(e){case"{http://calendarserver.org/ns/}publish-url":t[e]=function(e){if(!Array.isArray(e))return;if(e.length<1)return;return e[0].textContent}(r)}}),t}const q=s("DavCollectionPublishable");function D(e){const t={};return Object.entries(e).forEach(([e,r])=>{switch(e){case"{http://owncloud.org/ns}invite":t[e]=function(e){if(!Array.isArray(e))return;const t=[];return e.forEach(e=>{let r=e.getElementsByTagNameNS(u,"href");if(0===r.length)return;r=r[0].textContent;let n=e.getElementsByTagNameNS(h,"common-name");n=0===n.length?null:n[0].textContent;let s=e.getElementsByTagNameNS(h,"access");if(0===s.length)return;const a=0!==(s=s[0]).getElementsByTagNameNS(h,"read-write").length;t.push({href:r,displayName:n,writable:a})}),t}(r);break;case"{http://calendarserver.org/ns/}allowed-sharing-modes":t[e]=function(e){if(!Array.isArray(e))return;return e.map(e=>`{${e.namespaceURI}}${e.localName}`)}(r)}}),t}const U=s("DavCollectionShareable");function E(e){return class extends e{constructor(...e){super(...e),super._registerPropFindParser(D)}async share(e,t,r){U(`Sharing ${super.url} with ${e}`);const[n,s]=x([h,"share"],[h,"set"]);s.push({name:[u,"href"],value:e}),t&&s.push({name:[h,"read-write"]}),r&&s.push({name:[h,"summary"],value:r});const a=v(n);return super._request.post(this._url,{"Content-Type":"application/xml; charset=utf-8"},a).then(e=>this)}async unshare(e){U(`Unsharing ${super.url} with ${e}`);const[t,r]=x([h,"share"],[h,"remove"]);r.push({name:[u,"href"],value:e});const n=v(t);return super._request.post(this._url,{"Content-Type":"application/xml; charset=utf-8"},n).then(e=>this)}isShareable(){}isPublishable(){}static getPropFindList(){return super.getPropFindList().concat([[h,"invite"],[y,"allowed-sharing-modes"]])}}}class T extends w{constructor(...e){super(...e),super._exposeProperty("data",p,"calendar-data",!0)}static getPropFindList(){return super.getPropFindList().concat([[p,"calendar-data"]])}}function S(e){const t={};return Object.entries(e).forEach(([e,r])=>{switch(e){case"{http://apple.com/ns/ical/}calendar-color":t[e]=function(e){if(9===e.length)return e.substr(0,7);return e}(r);break;case"{http://calendarserver.org/ns/}getctag":case"{http://nextcloud.com/ns}owner-displayname":case"{urn:ietf:params:xml:ns:caldav}calendar-description":case"{urn:ietf:params:xml:ns:caldav}calendar-timezone":t[e]=function(e){return e}(r);break;case"{http://apple.com/ns/ical/}calendar-order":case"{urn:ietf:params:xml:ns:caldav}max-resource-size":case"{urn:ietf:params:xml:ns:caldav}max-instances":case"{urn:ietf:params:xml:ns:caldav}max-attendees-per-instance":t[e]=function(e){return parseInt(e,10)}(r);break;case"{http://calendarserver.org/ns/}source":t[e]=void 0;break;case"{urn:ietf:params:xml:ns:caldav}supported-calendar-component-set":t[e]=function(e){const t={vevent:!1,vjournal:!1,vtodo:!1};return e.forEach(function(e){const r=e.attributes.getNamedItem("name").textContent.toLowerCase();t.hasOwnProperty(r)&&(t[r]=!0)}),t}(r);break;case"{urn:ietf:params:xml:ns:caldav}supported-calendar-data":t[e]=function(e){if(!Array.isArray(e))return;return e.map(e=>({"content-type":e.getAttribute("content-type"),version:e.getAttribute("version")}))}(r);break;case"{urn:ietf:params:xml:ns:caldav}min-date-time":case"{urn:ietf:params:xml:ns:caldav}max-date-time":t[e]=$(r);break;case"{urn:ietf:params:xml:ns:caldav}supported-collation-set":t[e]=function(e){if(!Array.isArray(e))return;return e.map(e=>e.textContent)}(r);break;case"{http://owncloud.org/ns}calendar-enabled":t[e]=function(e){return"1"===e}(r)}}),t}function $(e){const t=parseInt(e.substr(0,4),10),r=parseInt(e.substr(4,2),10)-1,n=parseInt(e.substr(6,2),10),s=parseInt(e.substr(9,2),10),a=parseInt(e.substr(11,2),10),i=parseInt(e.substr(13,2),10),o=new Date;return o.setUTCFullYear(t,r,n),o.setUTCHours(s,a,i,0),o}function N(e){const t=[];return Object.entries(e).forEach(([e,r])=>{switch(e){case"{http://apple.com/ns/ical/}calendar-order":t.push({name:[f,"calendar-order"],value:r});break;case"{http://apple.com/ns/ical/}calendar-color":t.push({name:[f,"calendar-color"],value:r});break;case"{http://calendarserver.org/ns/}source":t.push({name:[y,"source"],children:[{name:[u,"href"],value:r}]});break;case"{urn:ietf:params:xml:ns:caldav}calendar-description":t.push({name:[p,"calendar-description"],value:r});break;case"{urn:ietf:params:xml:ns:caldav}calendar-timezone":t.push({name:[p,"calendar-timezone"],value:r});break;case"{http://owncloud.org/ns}calendar-enabled":t.push({name:[h,"calendar-enabled"],value:r?"1":"0"})}}),t}const R=s("Calendar");class I extends(function(e){return class extends e{constructor(...e){super(...e),super._registerPropFindParser(L)}async publish(){q(`Publishing ${super.url}`);const[e]=x([y,"publish-calendar"]),t=v(e);return await super._request.post(this._url,{"Content-Type":"application/xml; charset=utf-8"},t),this}async unpublish(){q(`Unpublishing ${super.url}`);const[e]=x([y,"unpublish-calendar"]),t=v(e);return await super._request.post(this._url,{"Content-Type":"application/xml; charset=utf-8"},t),this}static getPropFindList(){return super.getPropFindList().concat([[y,"publish-url"]])}}}(E(j))){constructor(...e){super(...e),super._registerObjectFactory("text/calendar",T),super._registerPropFindParser(S),super._registerPropSetFactory(N),super._exposeProperty("color",f,"calendar-color",!0),super._exposeProperty("enabled",h,"calendar-enabled",!0),super._exposeProperty("order",f,"calendar-order",!0),super._exposeProperty("timezone",p,"calendar-timezone",!0),super._exposeProperty("components",p,"supported-calendar-component-set")}async findAllVObjects(){return super.findAllByFilter(e=>e instanceof T)}async findByType(e){return this.calendarQuery([{name:[p,"comp-filter"],attributes:[["name","VCALENDAR"]],children:[{name:[p,"comp-filter"],attributes:[["name",e]]}]}])}async findByTypeInTimeRange(e,t,r){return this.calendarQuery([{name:[p,"comp-filter"],attributes:[["name","VCALENDAR"]],children:[{name:[p,"comp-filter"],attributes:[["name",e]],children:[{name:[p,"time-range"],attributes:[["start",I._getICalendarDateTimeFromDateObject(t)],["end",I._getICalendarDateTimeFromDateObject(r)]]}]}]}])}async createVObject(e){const t=b("","ics");return super.createObject(t,{"Content-Type":"text/calendar; charset=utf-8"},e)}async calendarQuery(e,t=null,r=null){R("sending an calendar-query request");const[n]=x([p,"calendar-query"]);t?n.children.push({name:[u,"prop"],children:t}):n.children.push({name:[u,"prop"],children:super._propFindList}),e&&n.children.push(e),r&&n.children.push({name:[p,"timezone"],value:r});const s=v(n),a=await this._request.report(this.url,{Depth:"1"},s);return super._handleMultiStatusResponse(a,I._isRetrievalPartial(t))}async calendarMultiget(e=[],t){if(R("sending an calendar-multiget request"),0===e.length)return[];const[r]=x([p,"calendar-multiget"]);t?r.children.push({name:[u,"prop"],children:t}):r.children.push({name:[u,"prop"],children:super._propFindList}),e.forEach(e=>{r.children.push({name:[u,"href"],value:e})});const n=v(r),s=await this._request.report(this.url,{Depth:"1"},n);return super._handleMultiStatusResponse(s,I._isRetrievalPartial(t))}async freeBusyQuery(e,t){R("sending a free-busy-query request");const[r]=x([p,"free-busy-query"],[p,"time-range"]);r[0][0].attributes.push(["start",I._getICalendarDateTimeFromDateObject(e)]),r[0][0].attributes.push(["end",I._getICalendarDateTimeFromDateObject(t)]);const n=v(r);await this._request.report(this.url,{Depth:"1"},n)}static getPropFindList(){return super.getPropFindList().concat([[f,"calendar-order"],[f,"calendar-color"],[y,"getctag"],[y,"source"],[p,"calendar-description"],[p,"calendar-timezone"],[p,"supported-calendar-component-set"],[p,"supported-calendar-data"],[p,"max-resource-size"],[p,"min-date-time"],[p,"max-date-time"],[p,"max-instances"],[p,"max-attendees-per-instance"],[p,"supported-collation-set"],[p,"calendar-free-busy-set"],[p,"schedule-calendar-transp"],[p,"schedule-default-calendar-URL"],[h,"calendar-enabled"],[m,"owner-displayname"]])}static _isRetrievalPartial(e){if(!e)return!1;const t=e.find(e=>e.name[0]===p&&"calendar-data"===e.name[1]);return!!t&&!!t.children}static _getICalendarDateTimeFromDateObject(e){return[e.getUTCFullYear(),("0"+(e.getUTCMonth()+1)).slice(-2),("0"+e.getUTCDate()).slice(-2),"T",("0"+e.getUTCHours()).slice(-2),("0"+e.getUTCMinutes()).slice(-2),("0"+e.getUTCSeconds()).slice(-2),"Z"].join("")}}class V extends j{}class M extends j{}class B extends j{}const H=s("CalendarHome");class z extends j{constructor(...e){super(...e),super._registerCollectionFactory("{"+p+"}calendar",I),super._registerCollectionFactory("{"+y+"}subscribed",V),super._registerCollectionFactory("{"+p+"}schedule-inbox",M),super._registerCollectionFactory("{"+p+"}schedule-outbox",B)}async findAllCalDAVCollections(){return super.findAllByFilter(e=>e instanceof I||e instanceof V||e instanceof M||e instanceof B)}async findAllCalendars(){return super.findAllByFilter(e=>e instanceof I)}async findAllSubscriptions(){return super.findAllByFilter(e=>e instanceof V)}async findAllScheduleInboxes(){return super.findAllByFilter(e=>e instanceof M)}async findAllScheduleOutboxes(){return super.findAllByFilter(e=>e instanceof B)}async createCalendarCollection(e,t){H("creating a calendar collection");const r=[{name:[u,"resourcetype"],children:[{name:[u,"collection"]},{name:[p,"calendar"]}]},{name:[u,"displayname"],value:e},{name:[f,"calendar-color"],value:t},{name:[h,"calendar-enabled"],value:"1"}],n=super._getAvailableNameFromToken(e);return super.createCollection(n,r)}async createSubscribedCollection(e,t,r){H("creating a subscribed collection");const n=[{name:[u,"resourcetype"],children:[{name:[u,"collection"]},{name:[y,"subscribed"]}]},{name:[u,"displayname"],value:e},{name:[f,"calendar-color"],value:t},{name:[h,"calendar-enabled"],value:"1"},{name:[y,"source"],children:[{name:[u,"href"],value:r}]}],s=super._getAvailableNameFromToken(e);return super.createCollection(s,n)}async search(){}}function Q(e){const t={};return Object.entries(e).forEach(([e,r])=>{switch(e){case"{urn:ietf:params:xml:ns:carddav}addressbook-description":case"{http://calendarserver.org/ns/}getctag":t[e]=function(e){return e}(r);break;case"{urn:ietf:params:xml:ns:carddav}max-resource-size":t[e]=function(e){return parseInt(e,10)}(r);break;case"{http://owncloud.org/ns}enabled":case"{http://owncloud.org/ns}read-only":t[e]=function(e){return"1"===e}(r);break;case"{urn:ietf:params:xml:ns:carddav}supported-address-data":t[e]=function(e){if(!Array.isArray(e))return;return e.map(e=>({"content-type":e.getAttribute("content-type"),version:e.getAttribute("version")}))}(r)}}),t}function X(e){const t=[];return Object.entries(e).forEach(([e,r])=>{switch(e){case"{urn:ietf:params:xml:ns:carddav}addressbook-description":t.push({name:[d,"addressbook-description"],value:r});break;case"{http://owncloud.org/ns}enabled":t.push({name:[h,"enabled"],value:r?"1":"0"})}}),t}class Y extends w{constructor(...e){super(...e),super._exposeProperty("data",d,"address-data",!0)}static getPropFindList(){return super.getPropFindList().concat([[d,"address-data"]])}}const G=s("AddressBook");class K extends(E(j)){constructor(...e){super(...e),super._registerObjectFactory("text/vcard",Y),super._registerPropFindParser(Q),super._registerPropSetFactory(X),super._exposeProperty("description",d,"addressbook-description",!0),super._exposeProperty("enabled",h,"enabled",!0),super._exposeProperty("readOnly",h,"read-only")}findAllVCards(){return super.findAllByFilter(e=>e instanceof Y)}async findAllAndFilterBySimpleProperties(e){const t=[];return e.forEach(e=>{t.push({name:[d,"prop"],attributes:[["name",e]]})}),this.addressbookQuery(null,[{name:[u,"getetag"]},{name:[u,"getcontenttype"]},{name:[u,"resourcetype"]},{name:[d,"address-data"],children:t}])}async createVCard(e){G("creating VCard object");const t=b("","vcf");return super.createObject(t,{"Content-Type":"text/vcard; charset=utf-8"},e)}async addressbookQuery(e,t=null,r=null){G("sending an addressbook-query request");const[n]=x([d,"addressbook-query"]);t?n.children.push({name:[u,"prop"],children:t}):n.children.push({name:[u,"prop"],children:super._propFindList}),e&&n.children.push(e),r&&n.children.push({name:[d,"limit"],children:[{name:[d,"nresults"],value:r}]});const s=v(n),a=await this._request.report(this.url,{Depth:"1"},s);return super._handleMultiStatusResponse(a,K._isRetrievalPartial(t))}async addressbookMultiget(e=[],t){if(G("sending an addressbook-multiget request"),0===e.length)return[];const[r]=x([d,"addressbook-multiget"]);t?r.children.push({name:[u,"prop"],children:t}):r.children.push({name:[u,"prop"],children:super._propFindList}),e.forEach(e=>{r.children.push({name:[u,"href"],value:e})});const n=v(r),s=await this._request.report(this.url,{Depth:"1"},n);return super._handleMultiStatusResponse(s,K._isRetrievalPartial(t))}static getPropFindList(){return super.getPropFindList().concat([[d,"addressbook-description"],[d,"supported-address-data"],[d,"max-resource-size"],[y,"getctag"],[h,"enabled"],[h,"read-only"]])}static _isRetrievalPartial(e){if(!e)return!1;const t=e.find(e=>e.name[0]===d&&"address-data"===e.name[1]);return!!t&&!!t.children}}const W=s("AddressBookHome");class Z extends j{constructor(...e){super(...e),super._registerCollectionFactory("{"+d+"}addressbook",K)}async findAllAddressBooks(){return super.findAllByFilter(e=>e instanceof K)}async createAddressBookCollection(e){W("creating an addressbook collection");const t=[{name:[u,"resourcetype"],children:[{name:[u,"collection"]},{name:[d,"addressbook"]}]},{name:[u,"displayname"],value:e}],r=super._getAvailableNameFromToken(e);return super.createCollection(r,t)}}r.d(t,"default",function(){return ee}),r.d(t,"debug",function(){return s}),r.d(t,"namespaces",function(){return n});const J=s("index.js");class ee{constructor(e,t=null,r={}){Object.assign(this,{rootUrl:null},e),Object.assign(this,{advertisedFeatures:[],principalUrl:null,principalCollections:[],calendarHomes:[],addressBookHomes:[]}),this._request=new a(this.rootUrl,t)}async connect(e={enableCalDAV:!1,enableCardDAV:!1}){if(!this.rootUrl)throw new Error("No rootUrl configured");return await this._discoverPrincipalUri(),J(`PrincipalURL: ${this.principalUrl}`),e.enableCalDAV&&(J("loading calendar-homes"),await this._discoverCalendarHomes()),e.enableCardDAV&&(J("loading addressbook-homes"),await this._discoverAddressBookHomes()),this}async principalPropertySearch(){}async _discoverPrincipalUri(){const e=await this._request.propFind(this.rootUrl,[[u,"current-user-principal"]],0);this.principalUrl=this._request.pathname(e["{DAV:}current-user-principal"][0].textContent)}async _discoverCalendarHomes(){const e=await this._request.propFind(this.principalUrl,[[p,"calendar-home-set"],[u,"principal-collection-set"],[p,"calendar-user-address-set"],[p,"schedule-inbox-URL"],[p,"schedule-outbox-URL"],[u,"displayname"],[u,"principal-URL"],[u,"supported-report-set"]],0),t=e[`{${p}}calendar-home-set`];this.calendarHomes=t.map(t=>{const r=this._request.pathname(t.textContent);return new z(this,this._request,r,e)}),this._extractPrincipalCollectionSets(e)}async _discoverAddressBookHomes(){const e=await this._request.propFind(this.principalUrl,[[d,"addressbook-home-set"],[u,"principal-collection-set"]],0),t=e[`{${d}}addressbook-home-set`];this.addressBookHomes=t.map(t=>{const r=this._request.pathname(t.textContent);return new Z(this,this._request,r,e)}),this._extractPrincipalCollectionSets(e)}_extractPrincipalCollectionSets(e){const t=e[`{${u}}principal-collection-set`];this.principalCollections=t.map(e=>this._request.pathname(e.textContent))}}}])});
//# sourceMappingURL=dist.js.map