(function(e){e.ng??={},e.ng.common??={},e.ng.common.locales??={};let t=void 0;function c(r){let a=r,l=Math.floor(Math.abs(r)),E=r.toString().replace(/^[^.]*\.?/,"").length,d=parseInt(r.toString().replace(/^[^e]*(e([-+]?\d+))?/,"$2"))||0;return l===0||l===1?1:d===0&&l!==0&&l%1e6===0&&E===0||!(d>=0&&d<=5)?4:5;}e.ng.common.locales.fr=["fr",[["AM","PM"],t,t],t,[["D","L","M","M","J","V","S"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["di","lu","ma","me","je","ve","sa"]],t,[["J","F","M","A","M","J","J","A","S","O","N","D"],["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"]],t,[["av. J.-C.","ap. J.-C."],t,["avant J\xE9sus-Christ","apr\xE8s J\xE9sus-Christ"]],1,[6,0],["dd/MM/y","d MMM y","d MMMM y","EEEE d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1} {0}","{1}, {0}","{1} '\xE0' {0}",t],[",","\u202F",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"EUR","\u20AC","euro",{ARS:["$AR","$"],AUD:["$AU","$"],BEF:["FB"],BMD:["$BM","$"],BND:["$BN","$"],BYN:[t,"\u0440."],BZD:["$BZ","$"],CAD:["$CA","$"],CLP:["$CL","$"],CNY:[t,"\xA5"],COP:["$CO","$"],CYP:["\xA3CY"],EGP:[t,"\xA3E"],FJD:["$FJ","$"],FKP:["\xA3FK","\xA3"],FRF:["F"],GBP:["\xA3GB","\xA3"],GIP:["\xA3GI","\xA3"],HKD:[t,"$"],IEP:["\xA3IE"],ILP:["\xA3IL"],ITL:["\u20A4IT"],JPY:[t,"\xA5"],KMF:[t,"FC"],LBP:["\xA3LB","\xA3L"],MTP:["\xA3MT"],MXN:["$MX","$"],NAD:["$NA","$"],NIO:[t,"$C"],NZD:["$NZ","$"],PHP:[t,"\u20B1"],RHD:["$RH"],RON:[t,"L"],RWF:[t,"FR"],SBD:["$SB","$"],SGD:["$SG","$"],SRD:["$SR","$"],TOP:[t,"$T"],TTD:["$TT","$"],TWD:[t,"NT$"],USD:["$US","$"],UYU:["$UY","$"],WST:["$WS"],XCD:[t,"$"],XPF:["FCFP"],ZMW:[t,"Kw"]},"ltr",c,[[["minuit","midi","mat.","ap.m.","soir","nuit"],t,["minuit","midi","du matin","de l\u2019apr\xE8s-midi","du soir","du matin"]],[["minuit","midi","mat.","ap.m.","soir","nuit"],t,["minuit","midi","matin","apr\xE8s-midi","soir","nuit"]],["00:00","12:00",["04:00","12:00"],["12:00","18:00"],["18:00","24:00"],["00:00","04:00"]]]];})(globalThis);(function(e){let t=e.performance;function c(L){t&&t.mark&&t.mark(L);}function r(L,n){t&&t.measure&&t.measure(L,n);}c("Zone");let a=e.__Zone_symbol_prefix||"__zone_symbol__";function l(L){return a+L;}let E=e[l("forceDuplicateZoneCheck")]===!0;if(e.Zone){if(E||typeof e.Zone.__symbol__!="function")throw new Error("Zone already loaded.");return e.Zone;}let oe=class oe{static assertZonePatched(){if(e.Promise!==re.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");}static get root(){let n=oe.current;for(;n.parent;)n=n.parent;return n;}static get current(){return U.zone;}static get currentTask(){return te;}static __load_patch(n,s,o=!1){if(re.hasOwnProperty(n)){if(!o&&E)throw Error("Already loaded patch: "+n);}else if(!e["__Zone_disable_"+n]){let v="Zone:"+n;c(v),re[n]=s(e,oe,z),r(v,v);}}get parent(){return this._parent;}get name(){return this._name;}constructor(n,s){this._parent=n,this._name=s?s.name||"unnamed":"<root>",this._properties=s&&s.properties||{},this._zoneDelegate=new k(this,this._parent&&this._parent._zoneDelegate,s);}get(n){let s=this.getZoneWith(n);if(s)return s._properties[n];}getZoneWith(n){let s=this;for(;s;){if(s._properties.hasOwnProperty(n))return s;s=s._parent;}return null;}fork(n){if(!n)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,n);}wrap(n,s){if(typeof n!="function")throw new Error("Expecting function got: "+n);let o=this._zoneDelegate.intercept(this,n,s),v=this;return function(){return v.runGuarded(o,this,arguments,s);};}run(n,s,o,v){U={parent:U,zone:this};try{return this._zoneDelegate.invoke(this,n,s,o,v);}finally{U=U.parent;}}runGuarded(n,s=null,o,v){U={parent:U,zone:this};try{try{return this._zoneDelegate.invoke(this,n,s,o,v);}catch(G){if(this._zoneDelegate.handleError(this,G))throw G;}}finally{U=U.parent;}}runTask(n,s,o){if(n.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(n.zone||Y).name+"; Execution: "+this.name+")");if(n.state===H&&(n.type===K||n.type===b))return;let v=n.state!=m;v&&n._transitionTo(m,I),n.runCount++;let G=te;te=n,U={parent:U,zone:this};try{n.type==b&&n.data&&!n.data.isPeriodic&&(n.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,n,s,o);}catch(u){if(this._zoneDelegate.handleError(this,u))throw u;}}finally{n.state!==H&&n.state!==_&&(n.type==K||n.data&&n.data.isPeriodic?v&&n._transitionTo(I,m):(n.runCount=0,this._updateTaskCount(n,-1),v&&n._transitionTo(H,m,H))),U=U.parent,te=G;}}scheduleTask(n){if(n.zone&&n.zone!==this){let o=this;for(;o;){if(o===n.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${n.zone.name}`);o=o.parent;}}n._transitionTo(X,H);let s=[];n._zoneDelegates=s,n._zone=this;try{n=this._zoneDelegate.scheduleTask(this,n);}catch(o){throw n._transitionTo(_,X,H),this._zoneDelegate.handleError(this,o),o;}return n._zoneDelegates===s&&this._updateTaskCount(n,1),n.state==X&&n._transitionTo(I,X),n;}scheduleMicroTask(n,s,o,v){return this.scheduleTask(new y(Z,n,s,o,v,void 0));}scheduleMacroTask(n,s,o,v,G){return this.scheduleTask(new y(b,n,s,o,v,G));}scheduleEventTask(n,s,o,v,G){return this.scheduleTask(new y(K,n,s,o,v,G));}cancelTask(n){if(n.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(n.zone||Y).name+"; Execution: "+this.name+")");if(!(n.state!==I&&n.state!==m)){n._transitionTo($,I,m);try{this._zoneDelegate.cancelTask(this,n);}catch(s){throw n._transitionTo(_,$),this._zoneDelegate.handleError(this,s),s;}return this._updateTaskCount(n,-1),n._transitionTo(H,$),n.runCount=0,n;}}_updateTaskCount(n,s){let o=n._zoneDelegates;s==-1&&(n._zoneDelegates=null);for(let v=0;v<o.length;v++)o[v]._updateTaskCount(n.type,s);}};oe.__symbol__=l;let d=oe,P={name:"",onHasTask:(L,n,s,o)=>L.hasTask(s,o),onScheduleTask:(L,n,s,o)=>L.scheduleTask(s,o),onInvokeTask:(L,n,s,o,v,G)=>L.invokeTask(s,o,v,G),onCancelTask:(L,n,s,o)=>L.cancelTask(s,o)};class k{constructor(n,s,o){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=n,this._parentDelegate=s,this._forkZS=o&&(o&&o.onFork?o:s._forkZS),this._forkDlgt=o&&(o.onFork?s:s._forkDlgt),this._forkCurrZone=o&&(o.onFork?this.zone:s._forkCurrZone),this._interceptZS=o&&(o.onIntercept?o:s._interceptZS),this._interceptDlgt=o&&(o.onIntercept?s:s._interceptDlgt),this._interceptCurrZone=o&&(o.onIntercept?this.zone:s._interceptCurrZone),this._invokeZS=o&&(o.onInvoke?o:s._invokeZS),this._invokeDlgt=o&&(o.onInvoke?s:s._invokeDlgt),this._invokeCurrZone=o&&(o.onInvoke?this.zone:s._invokeCurrZone),this._handleErrorZS=o&&(o.onHandleError?o:s._handleErrorZS),this._handleErrorDlgt=o&&(o.onHandleError?s:s._handleErrorDlgt),this._handleErrorCurrZone=o&&(o.onHandleError?this.zone:s._handleErrorCurrZone),this._scheduleTaskZS=o&&(o.onScheduleTask?o:s._scheduleTaskZS),this._scheduleTaskDlgt=o&&(o.onScheduleTask?s:s._scheduleTaskDlgt),this._scheduleTaskCurrZone=o&&(o.onScheduleTask?this.zone:s._scheduleTaskCurrZone),this._invokeTaskZS=o&&(o.onInvokeTask?o:s._invokeTaskZS),this._invokeTaskDlgt=o&&(o.onInvokeTask?s:s._invokeTaskDlgt),this._invokeTaskCurrZone=o&&(o.onInvokeTask?this.zone:s._invokeTaskCurrZone),this._cancelTaskZS=o&&(o.onCancelTask?o:s._cancelTaskZS),this._cancelTaskDlgt=o&&(o.onCancelTask?s:s._cancelTaskDlgt),this._cancelTaskCurrZone=o&&(o.onCancelTask?this.zone:s._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let v=o&&o.onHasTask,G=s&&s._hasTaskZS;(v||G)&&(this._hasTaskZS=v?o:P,this._hasTaskDlgt=s,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=n,o.onScheduleTask||(this._scheduleTaskZS=P,this._scheduleTaskDlgt=s,this._scheduleTaskCurrZone=this.zone),o.onInvokeTask||(this._invokeTaskZS=P,this._invokeTaskDlgt=s,this._invokeTaskCurrZone=this.zone),o.onCancelTask||(this._cancelTaskZS=P,this._cancelTaskDlgt=s,this._cancelTaskCurrZone=this.zone));}fork(n,s){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,n,s):new d(n,s);}intercept(n,s,o){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,n,s,o):s;}invoke(n,s,o,v,G){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,n,s,o,v,G):s.apply(o,v);}handleError(n,s){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,n,s):!0;}scheduleTask(n,s){let o=s;if(this._scheduleTaskZS)this._hasTaskZS&&o._zoneDelegates.push(this._hasTaskDlgtOwner),o=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,n,s),o||(o=s);else if(s.scheduleFn)s.scheduleFn(s);else if(s.type==Z)R(s);else throw new Error("Task is missing scheduleFn.");return o;}invokeTask(n,s,o,v){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,n,s,o,v):s.callback.apply(o,v);}cancelTask(n,s){let o;if(this._cancelTaskZS)o=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,n,s);else{if(!s.cancelFn)throw Error("Task is not cancelable");o=s.cancelFn(s);}return o;}hasTask(n,s){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,n,s);}catch(o){this.handleError(n,o);}}_updateTaskCount(n,s){let o=this._taskCounts,v=o[n],G=o[n]=v+s;if(G<0)throw new Error("More tasks executed then were scheduled.");if(v==0||G==0){let u={microTask:o.microTask>0,macroTask:o.macroTask>0,eventTask:o.eventTask>0,change:n};this.hasTask(this.zone,u);}}}class y{constructor(n,s,o,v,G,u){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=n,this.source=s,this.data=v,this.scheduleFn=G,this.cancelFn=u,!o)throw new Error("callback is not defined");this.callback=o;let f=this;n===K&&v&&v.useG?this.invoke=y.invokeTask:this.invoke=function(){return y.invokeTask.call(e,f,this,arguments);};}static invokeTask(n,s,o){n||(n=this),Q++;try{return n.runCount++,n.zone.runTask(n,s,o);}finally{Q==1&&T(),Q--;}}get zone(){return this._zone;}get state(){return this._state;}cancelScheduleRequest(){this._transitionTo(H,X);}_transitionTo(n,s,o){if(this._state===s||this._state===o)this._state=n,n==H&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${n}', expecting state '${s}'${o?" or '"+o+"'":""}, was '${this._state}'.`);}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this);}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount};}}let M=l("setTimeout"),N=l("Promise"),O=l("then"),x=[],A=!1,J;function W(L){if(J||e[N]&&(J=e[N].resolve(0)),J){let n=J[O];n||(n=J.then),n.call(J,L);}else e[M](L,0);}function R(L){Q===0&&x.length===0&&W(T),L&&x.push(L);}function T(){if(!A){for(A=!0;x.length;){let L=x;x=[];for(let n=0;n<L.length;n++){let s=L[n];try{s.zone.runTask(s,null,null);}catch(o){z.onUnhandledError(o);}}}z.microtaskDrainDone(),A=!1;}}let Y={name:"NO ZONE"},H="notScheduled",X="scheduling",I="scheduled",m="running",$="canceling",_="unknown",Z="microTask",b="macroTask",K="eventTask",re={},z={symbol:l,currentZoneFrame:()=>U,onUnhandledError:V,microtaskDrainDone:V,scheduleMicroTask:R,showUncaughtError:()=>!d[l("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:V,patchMethod:()=>V,bindArguments:()=>[],patchThen:()=>V,patchMacroTask:()=>V,patchEventPrototype:()=>V,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>V,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>V,wrapWithCurrentZone:()=>V,filterProperties:()=>[],attachOriginToPatched:()=>V,_redefineProperty:()=>V,patchCallbacks:()=>V,nativeScheduleMicroTask:W},U={parent:null,zone:new d(null,null)},te=null,Q=0;function V(){}return r("Zone","Zone"),e.Zone=d;})(globalThis);var ye=Object.getOwnPropertyDescriptor,Ze=Object.defineProperty,Me=Object.getPrototypeOf,it=Object.create,ct=Array.prototype.slice,Ie="addEventListener",Le="removeEventListener",De=Zone.__symbol__(Ie),Se=Zone.__symbol__(Le),ie="true",ce="false",pe=Zone.__symbol__("");function Ae(e,t){return Zone.current.wrap(e,t);}function je(e,t,c,r,a){return Zone.current.scheduleMacroTask(e,t,c,r,a);}var j=Zone.__symbol__,be=typeof window<"u",Te=be?window:void 0,q=be&&Te||globalThis,at="removeAttribute";function He(e,t){for(let c=e.length-1;c>=0;c--)typeof e[c]=="function"&&(e[c]=Ae(e[c],t+"_"+c));return e;}function lt(e,t){let c=e.constructor.name;for(let r=0;r<t.length;r++){let a=t[r],l=e[a];if(l){let E=ye(e,a);if(!qe(E))continue;e[a]=(d=>{let P=function(){return d.apply(this,He(arguments,c+"."+a));};return ae(P,d),P;})(l);}}}function qe(e){return e?e.writable===!1?!1:!(typeof e.get=="function"&&typeof e.set>"u"):!0;}var Ye=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Ce=!("nw"in q)&&typeof q.process<"u"&&{}.toString.call(q.process)==="[object process]",$e=!Ce&&!Ye&&!!(be&&Te.HTMLElement),Je=typeof q.process<"u"&&{}.toString.call(q.process)==="[object process]"&&!Ye&&!!(be&&Te.HTMLElement),Pe={},Ve=function(e){if(e=e||q.event,!e)return;let t=Pe[e.type];t||(t=Pe[e.type]=j("ON_PROPERTY"+e.type));let c=this||e.target||q,r=c[t],a;if($e&&c===Te&&e.type==="error"){let l=e;a=r&&r.call(this,l.message,l.filename,l.lineno,l.colno,l.error),a===!0&&e.preventDefault();}else a=r&&r.apply(this,arguments),a!=null&&!a&&e.preventDefault();return a;};function We(e,t,c){let r=ye(e,t);if(!r&&c&&ye(c,t)&&(r={enumerable:!0,configurable:!0}),!r||!r.configurable)return;let a=j("on"+t+"patched");if(e.hasOwnProperty(a)&&e[a])return;delete r.writable,delete r.value;let l=r.get,E=r.set,d=t.slice(2),P=Pe[d];P||(P=Pe[d]=j("ON_PROPERTY"+d)),r.set=function(k){let y=this;if(!y&&e===q&&(y=q),!y)return;typeof y[P]=="function"&&y.removeEventListener(d,Ve),E&&E.call(y,null),y[P]=k,typeof k=="function"&&y.addEventListener(d,Ve,!1);},r.get=function(){let k=this;if(!k&&e===q&&(k=q),!k)return null;let y=k[P];if(y)return y;if(l){let M=l.call(this);if(M)return r.set.call(this,M),typeof k[at]=="function"&&k.removeAttribute(t),M;}return null;},Ze(e,t,r),e[a]=!0;}function Ke(e,t,c){if(t)for(let r=0;r<t.length;r++)We(e,"on"+t[r],c);else{let r=[];for(let a in e)a.slice(0,2)=="on"&&r.push(a);for(let a=0;a<r.length;a++)We(e,r[a],c);}}var ne=j("originalInstance");function ge(e){let t=q[e];if(!t)return;q[j(e)]=t,q[e]=function(){let a=He(arguments,e);switch(a.length){case 0:this[ne]=new t();break;case 1:this[ne]=new t(a[0]);break;case 2:this[ne]=new t(a[0],a[1]);break;case 3:this[ne]=new t(a[0],a[1],a[2]);break;case 4:this[ne]=new t(a[0],a[1],a[2],a[3]);break;default:throw new Error("Arg list too long.");}},ae(q[e],t);let c=new t(function(){}),r;for(r in c)e==="XMLHttpRequest"&&r==="responseBlob"||function(a){typeof c[a]=="function"?q[e].prototype[a]=function(){return this[ne][a].apply(this[ne],arguments);}:Ze(q[e].prototype,a,{set:function(l){typeof l=="function"?(this[ne][a]=Ae(l,e+"."+a),ae(this[ne][a],l)):this[ne][a]=l;},get:function(){return this[ne][a];}});}(r);for(r in t)r!=="prototype"&&t.hasOwnProperty(r)&&(q[e][r]=t[r]);}function le(e,t,c){let r=e;for(;r&&!r.hasOwnProperty(t);)r=Me(r);!r&&e[t]&&(r=e);let a=j(t),l=null;if(r&&(!(l=r[a])||!r.hasOwnProperty(a))){l=r[a]=r[t];let E=r&&ye(r,t);if(qe(E)){let d=c(l,a,t);r[t]=function(){return d(this,arguments);},ae(r[t],l);}}return l;}function ut(e,t,c){let r=null;function a(l){let E=l.data;return E.args[E.cbIdx]=function(){l.invoke.apply(this,arguments);},r.apply(E.target,E.args),l;}r=le(e,t,l=>function(E,d){let P=c(E,d);return P.cbIdx>=0&&typeof d[P.cbIdx]=="function"?je(P.name,d[P.cbIdx],P,a):l.apply(E,d);});}function ae(e,t){e[j("OriginalDelegate")]=t;}var Xe=!1,Ne=!1;function ft(){try{let e=Te.navigator.userAgent;if(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1)return!0;}catch{}return!1;}function ht(){if(Xe)return Ne;Xe=!0;try{let e=Te.navigator.userAgent;(e.indexOf("MSIE ")!==-1||e.indexOf("Trident/")!==-1||e.indexOf("Edge/")!==-1)&&(Ne=!0);}catch{}return Ne;}Zone.__load_patch("ZoneAwarePromise",(e,t,c)=>{let r=Object.getOwnPropertyDescriptor,a=Object.defineProperty;function l(u){if(u&&u.toString===Object.prototype.toString){let f=u.constructor&&u.constructor.name;return(f||"")+": "+JSON.stringify(u);}return u?u.toString():Object.prototype.toString.call(u);}let E=c.symbol,d=[],P=e[E("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,k=E("Promise"),y=E("then"),M="__creationTrace__";c.onUnhandledError=u=>{if(c.showUncaughtError()){let f=u&&u.rejection;f?console.error("Unhandled Promise rejection:",f instanceof Error?f.message:f,"; Zone:",u.zone.name,"; Task:",u.task&&u.task.source,"; Value:",f,f instanceof Error?f.stack:void 0):console.error(u);}},c.microtaskDrainDone=()=>{for(;d.length;){let u=d.shift();try{u.zone.runGuarded(()=>{throw u.throwOriginal?u.rejection:u;});}catch(f){O(f);}}};let N=E("unhandledPromiseRejectionHandler");function O(u){c.onUnhandledError(u);try{let f=t[N];typeof f=="function"&&f.call(this,u);}catch{}}function x(u){return u&&u.then;}function A(u){return u;}function J(u){return n.reject(u);}let W=E("state"),R=E("value"),T=E("finally"),Y=E("parentPromiseValue"),H=E("parentPromiseState"),X="Promise.then",I=null,m=!0,$=!1,_=0;function Z(u,f){return i=>{try{z(u,f,i);}catch(h){z(u,!1,h);}};}let b=function(){let u=!1;return function(i){return function(){u||(u=!0,i.apply(null,arguments));};};},K="Promise resolved with itself",re=E("currentTaskTrace");function z(u,f,i){let h=b();if(u===i)throw new TypeError(K);if(u[W]===I){let g=null;try{(typeof i=="object"||typeof i=="function")&&(g=i&&i.then);}catch(C){return h(()=>{z(u,!1,C);})(),u;}if(f!==$&&i instanceof n&&i.hasOwnProperty(W)&&i.hasOwnProperty(R)&&i[W]!==I)te(i),z(u,i[W],i[R]);else if(f!==$&&typeof g=="function")try{g.call(i,h(Z(u,f)),h(Z(u,!1)));}catch(C){h(()=>{z(u,!1,C);})();}else{u[W]=f;let C=u[R];if(u[R]=i,u[T]===T&&f===m&&(u[W]=u[H],u[R]=u[Y]),f===$&&i instanceof Error){let p=t.currentTask&&t.currentTask.data&&t.currentTask.data[M];p&&a(i,re,{configurable:!0,enumerable:!1,writable:!0,value:p});}for(let p=0;p<C.length;)Q(u,C[p++],C[p++],C[p++],C[p++]);if(C.length==0&&f==$){u[W]=_;let p=i;try{throw new Error("Uncaught (in promise): "+l(i)+(i&&i.stack?`
`+i.stack:""));}catch(w){p=w;}P&&(p.throwOriginal=!0),p.rejection=i,p.promise=u,p.zone=t.current,p.task=t.currentTask,d.push(p),c.scheduleMicroTask();}}}return u;}let U=E("rejectionHandledHandler");function te(u){if(u[W]===_){try{let f=t[U];f&&typeof f=="function"&&f.call(this,{rejection:u[R],promise:u});}catch{}u[W]=$;for(let f=0;f<d.length;f++)u===d[f].promise&&d.splice(f,1);}}function Q(u,f,i,h,g){te(u);let C=u[W],p=C?typeof h=="function"?h:A:typeof g=="function"?g:J;f.scheduleMicroTask(X,()=>{try{let w=u[R],D=!!i&&T===i[T];D&&(i[Y]=w,i[H]=C);let S=f.run(p,void 0,D&&p!==J&&p!==A?[]:[w]);z(i,!0,S);}catch(w){z(i,!1,w);}},i);}let V="function ZoneAwarePromise() { [native code] }",oe=function(){},L=e.AggregateError;class n{static toString(){return V;}static resolve(f){return z(new this(null),m,f);}static reject(f){return z(new this(null),$,f);}static any(f){if(!f||typeof f[Symbol.iterator]!="function")return Promise.reject(new L([],"All promises were rejected"));let i=[],h=0;try{for(let p of f)h++,i.push(n.resolve(p));}catch{return Promise.reject(new L([],"All promises were rejected"));}if(h===0)return Promise.reject(new L([],"All promises were rejected"));let g=!1,C=[];return new n((p,w)=>{for(let D=0;D<i.length;D++)i[D].then(S=>{g||(g=!0,p(S));},S=>{C.push(S),h--,h===0&&(g=!0,w(new L(C,"All promises were rejected")));});});}static race(f){let i,h,g=new this((w,D)=>{i=w,h=D;});function C(w){i(w);}function p(w){h(w);}for(let w of f)x(w)||(w=this.resolve(w)),w.then(C,p);return g;}static all(f){return n.allWithCallback(f);}static allSettled(f){return(this&&this.prototype instanceof n?this:n).allWithCallback(f,{thenCallback:h=>({status:"fulfilled",value:h}),errorCallback:h=>({status:"rejected",reason:h})});}static allWithCallback(f,i){let h,g,C=new this((S,F)=>{h=S,g=F;}),p=2,w=0,D=[];for(let S of f){x(S)||(S=this.resolve(S));let F=w;try{S.then(B=>{D[F]=i?i.thenCallback(B):B,p--,p===0&&h(D);},B=>{i?(D[F]=i.errorCallback(B),p--,p===0&&h(D)):g(B);});}catch(B){g(B);}p++,w++;}return p-=2,p===0&&h(D),C;}constructor(f){let i=this;if(!(i instanceof n))throw new Error("Must be an instanceof Promise.");i[W]=I,i[R]=[];try{let h=b();f&&f(h(Z(i,m)),h(Z(i,$)));}catch(h){z(i,!1,h);}}get[Symbol.toStringTag](){return"Promise";}get[Symbol.species](){return n;}then(f,i){let h=this.constructor?.[Symbol.species];(!h||typeof h!="function")&&(h=this.constructor||n);let g=new h(oe),C=t.current;return this[W]==I?this[R].push(C,g,f,i):Q(this,C,g,f,i),g;}catch(f){return this.then(null,f);}finally(f){let i=this.constructor?.[Symbol.species];(!i||typeof i!="function")&&(i=n);let h=new i(oe);h[T]=T;let g=t.current;return this[W]==I?this[R].push(g,h,f,f):Q(this,g,h,f,f),h;}}n.resolve=n.resolve,n.reject=n.reject,n.race=n.race,n.all=n.all;let s=e[k]=e.Promise;e.Promise=n;let o=E("thenPatched");function v(u){let f=u.prototype,i=r(f,"then");if(i&&(i.writable===!1||!i.configurable))return;let h=f.then;f[y]=h,u.prototype.then=function(g,C){return new n((w,D)=>{h.call(this,w,D);}).then(g,C);},u[o]=!0;}c.patchThen=v;function G(u){return function(f,i){let h=u.apply(f,i);if(h instanceof n)return h;let g=h.constructor;return g[o]||v(g),h;};}return s&&(v(s),le(e,"fetch",u=>G(u))),Promise[t.__symbol__("uncaughtPromiseErrors")]=d,n;});Zone.__load_patch("toString",e=>{let t=Function.prototype.toString,c=j("OriginalDelegate"),r=j("Promise"),a=j("Error"),l=function(){if(typeof this=="function"){let k=this[c];if(k)return typeof k=="function"?t.call(k):Object.prototype.toString.call(k);if(this===Promise){let y=e[r];if(y)return t.call(y);}if(this===Error){let y=e[a];if(y)return t.call(y);}}return t.call(this);};l[c]=t,Function.prototype.toString=l;let E=Object.prototype.toString,d="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?d:E.call(this);};});var _e=!1;if(typeof window<"u")try{let e=Object.defineProperty({},"passive",{get:function(){_e=!0;}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e);}catch{_e=!1;}var dt={useG:!0},ee={},Qe={},et=new RegExp("^"+pe+"(\\w+)(true|false)$"),tt=j("propagationStopped");function nt(e,t){let c=(t?t(e):e)+ce,r=(t?t(e):e)+ie,a=pe+c,l=pe+r;ee[e]={},ee[e][ce]=a,ee[e][ie]=l;}function _t(e,t,c,r){let a=r&&r.add||Ie,l=r&&r.rm||Le,E=r&&r.listeners||"eventListeners",d=r&&r.rmAll||"removeAllListeners",P=j(a),k="."+a+":",y="prependListener",M="."+y+":",N=function(R,T,Y){if(R.isRemoved)return;let H=R.callback;typeof H=="object"&&H.handleEvent&&(R.callback=m=>H.handleEvent(m),R.originalDelegate=H);let X;try{R.invoke(R,T,[Y]);}catch(m){X=m;}let I=R.options;if(I&&typeof I=="object"&&I.once){let m=R.originalDelegate?R.originalDelegate:R.callback;T[l].call(T,Y.type,m,I);}return X;};function O(R,T,Y){if(T=T||e.event,!T)return;let H=R||T.target||e,X=H[ee[T.type][Y?ie:ce]];if(X){let I=[];if(X.length===1){let m=N(X[0],H,T);m&&I.push(m);}else{let m=X.slice();for(let $=0;$<m.length&&!(T&&T[tt]===!0);$++){let _=N(m[$],H,T);_&&I.push(_);}}if(I.length===1)throw I[0];for(let m=0;m<I.length;m++){let $=I[m];t.nativeScheduleMicroTask(()=>{throw $;});}}}let x=function(R){return O(this,R,!1);},A=function(R){return O(this,R,!0);};function J(R,T){if(!R)return!1;let Y=!0;T&&T.useG!==void 0&&(Y=T.useG);let H=T&&T.vh,X=!0;T&&T.chkDup!==void 0&&(X=T.chkDup);let I=!1;T&&T.rt!==void 0&&(I=T.rt);let m=R;for(;m&&!m.hasOwnProperty(a);)m=Me(m);if(!m&&R[a]&&(m=R),!m||m[P])return!1;let $=T&&T.eventNameToString,_={},Z=m[P]=m[a],b=m[j(l)]=m[l],K=m[j(E)]=m[E],re=m[j(d)]=m[d],z;T&&T.prepend&&(z=m[j(T.prepend)]=m[T.prepend]);function U(i,h){return!_e&&typeof i=="object"&&i?!!i.capture:!_e||!h?i:typeof i=="boolean"?{capture:i,passive:!0}:i?typeof i=="object"&&i.passive!==!1?{...i,passive:!0}:i:{passive:!0};}let te=function(i){if(!_.isExisting)return Z.call(_.target,_.eventName,_.capture?A:x,_.options);},Q=function(i){if(!i.isRemoved){let h=ee[i.eventName],g;h&&(g=h[i.capture?ie:ce]);let C=g&&i.target[g];if(C){for(let p=0;p<C.length;p++)if(C[p]===i){C.splice(p,1),i.isRemoved=!0,C.length===0&&(i.allRemoved=!0,i.target[g]=null);break;}}}if(i.allRemoved)return b.call(i.target,i.eventName,i.capture?A:x,i.options);},V=function(i){return Z.call(_.target,_.eventName,i.invoke,_.options);},oe=function(i){return z.call(_.target,_.eventName,i.invoke,_.options);},L=function(i){return b.call(i.target,i.eventName,i.invoke,i.options);},n=Y?te:V,s=Y?Q:L,o=function(i,h){let g=typeof h;return g==="function"&&i.callback===h||g==="object"&&i.originalDelegate===h;},v=T&&T.diff?T.diff:o,G=Zone[j("UNPATCHED_EVENTS")],u=e[j("PASSIVE_EVENTS")],f=function(i,h,g,C,p=!1,w=!1){return function(){let D=this||e,S=arguments[0];T&&T.transferEventName&&(S=T.transferEventName(S));let F=arguments[1];if(!F)return i.apply(this,arguments);if(Ce&&S==="uncaughtException")return i.apply(this,arguments);let B=!1;if(typeof F!="function"){if(!F.handleEvent)return i.apply(this,arguments);B=!0;}if(H&&!H(i,F,D,arguments))return;let ue=_e&&!!u&&u.indexOf(S)!==-1,se=U(arguments[2],ue);if(G){for(let he=0;he<G.length;he++)if(S===G[he])return ue?i.call(D,S,F,se):i.apply(this,arguments);}let Re=se?typeof se=="boolean"?!0:se.capture:!1,Fe=se&&typeof se=="object"?se.once:!1,st=Zone.current,we=ee[S];we||(nt(S,$),we=ee[S]);let Be=we[Re?ie:ce],de=D[Be],Ge=!1;if(de){if(Ge=!0,X){for(let he=0;he<de.length;he++)if(v(de[he],F))return;}}else de=D[Be]=[];let ke,xe=D.constructor.name,Ue=Qe[xe];Ue&&(ke=Ue[S]),ke||(ke=xe+h+($?$(S):S)),_.options=se,Fe&&(_.options.once=!1),_.target=D,_.capture=Re,_.eventName=S,_.isExisting=Ge;let me=Y?dt:void 0;me&&(me.taskData=_);let fe=st.scheduleEventTask(ke,F,me,g,C);if(_.target=null,me&&(me.taskData=null),Fe&&(se.once=!0),!_e&&typeof fe.options=="boolean"||(fe.options=se),fe.target=D,fe.capture=Re,fe.eventName=S,B&&(fe.originalDelegate=F),w?de.unshift(fe):de.push(fe),p)return D;};};return m[a]=f(Z,k,n,s,I),z&&(m[y]=f(z,M,oe,s,I,!0)),m[l]=function(){let i=this||e,h=arguments[0];T&&T.transferEventName&&(h=T.transferEventName(h));let g=arguments[2],C=g?typeof g=="boolean"?!0:g.capture:!1,p=arguments[1];if(!p)return b.apply(this,arguments);if(H&&!H(b,p,i,arguments))return;let w=ee[h],D;w&&(D=w[C?ie:ce]);let S=D&&i[D];if(S)for(let F=0;F<S.length;F++){let B=S[F];if(v(B,p)){if(S.splice(F,1),B.isRemoved=!0,S.length===0&&(B.allRemoved=!0,i[D]=null,typeof h=="string")){let ue=pe+"ON_PROPERTY"+h;i[ue]=null;}return B.zone.cancelTask(B),I?i:void 0;}}return b.apply(this,arguments);},m[E]=function(){let i=this||e,h=arguments[0];T&&T.transferEventName&&(h=T.transferEventName(h));let g=[],C=rt(i,$?$(h):h);for(let p=0;p<C.length;p++){let w=C[p],D=w.originalDelegate?w.originalDelegate:w.callback;g.push(D);}return g;},m[d]=function(){let i=this||e,h=arguments[0];if(h){T&&T.transferEventName&&(h=T.transferEventName(h));let g=ee[h];if(g){let C=g[ce],p=g[ie],w=i[C],D=i[p];if(w){let S=w.slice();for(let F=0;F<S.length;F++){let B=S[F],ue=B.originalDelegate?B.originalDelegate:B.callback;this[l].call(this,h,ue,B.options);}}if(D){let S=D.slice();for(let F=0;F<S.length;F++){let B=S[F],ue=B.originalDelegate?B.originalDelegate:B.callback;this[l].call(this,h,ue,B.options);}}}}else{let g=Object.keys(i);for(let C=0;C<g.length;C++){let p=g[C],w=et.exec(p),D=w&&w[1];D&&D!=="removeListener"&&this[d].call(this,D);}this[d].call(this,"removeListener");}if(I)return this;},ae(m[a],Z),ae(m[l],b),re&&ae(m[d],re),K&&ae(m[E],K),!0;}let W=[];for(let R=0;R<c.length;R++)W[R]=J(c[R],r);return W;}function rt(e,t){if(!t){let l=[];for(let E in e){let d=et.exec(E),P=d&&d[1];if(P&&(!t||P===t)){let k=e[E];if(k)for(let y=0;y<k.length;y++)l.push(k[y]);}}return l;}let c=ee[t];c||(nt(t),c=ee[t]);let r=e[c[ce]],a=e[c[ie]];return r?a?r.concat(a):r.slice():a?a.slice():[];}function Et(e,t){let c=e.Event;c&&c.prototype&&t.patchMethod(c.prototype,"stopImmediatePropagation",r=>function(a,l){a[tt]=!0,r&&r.apply(a,l);});}function Tt(e,t,c,r,a){let l=Zone.__symbol__(r);if(t[l])return;let E=t[l]=t[r];t[r]=function(d,P,k){return P&&P.prototype&&a.forEach(function(y){let M=`${c}.${r}::`+y,N=P.prototype;try{if(N.hasOwnProperty(y)){let O=e.ObjectGetOwnPropertyDescriptor(N,y);O&&O.value?(O.value=e.wrapWithCurrentZone(O.value,M),e._redefineProperty(P.prototype,y,O)):N[y]&&(N[y]=e.wrapWithCurrentZone(N[y],M));}else N[y]&&(N[y]=e.wrapWithCurrentZone(N[y],M));}catch{}}),E.call(t,d,P,k);},e.attachOriginToPatched(t[r],E);}function ot(e,t,c){if(!c||c.length===0)return t;let r=c.filter(l=>l.target===e);if(!r||r.length===0)return t;let a=r[0].ignoreProperties;return t.filter(l=>a.indexOf(l)===-1);}function ze(e,t,c,r){if(!e)return;let a=ot(e,t,c);Ke(e,a,r);}function Oe(e){return Object.getOwnPropertyNames(e).filter(t=>t.startsWith("on")&&t.length>2).map(t=>t.substring(2));}function mt(e,t){if(Ce&&!Je||Zone[e.symbol("patchEvents")])return;let c=t.__Zone_ignore_on_properties,r=[];if($e){let a=window;r=r.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let l=ft()?[{target:a,ignoreProperties:["error"]}]:[];ze(a,Oe(a),c&&c.concat(l),Me(a));}r=r.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let a=0;a<r.length;a++){let l=t[r[a]];l&&l.prototype&&ze(l.prototype,Oe(l.prototype),c);}}Zone.__load_patch("util",(e,t,c)=>{let r=Oe(e);c.patchOnProperties=Ke,c.patchMethod=le,c.bindArguments=He,c.patchMacroTask=ut;let a=t.__symbol__("BLACK_LISTED_EVENTS"),l=t.__symbol__("UNPATCHED_EVENTS");e[l]&&(e[a]=e[l]),e[a]&&(t[a]=t[l]=e[a]),c.patchEventPrototype=Et,c.patchEventTarget=_t,c.isIEOrEdge=ht,c.ObjectDefineProperty=Ze,c.ObjectGetOwnPropertyDescriptor=ye,c.ObjectCreate=it,c.ArraySlice=ct,c.patchClass=ge,c.wrapWithCurrentZone=Ae,c.filterProperties=ot,c.attachOriginToPatched=ae,c._redefineProperty=Object.defineProperty,c.patchCallbacks=Tt,c.getGlobalObjects=()=>({globalSources:Qe,zoneSymbolEventNames:ee,eventNames:r,isBrowser:$e,isMix:Je,isNode:Ce,TRUE_STR:ie,FALSE_STR:ce,ZONE_SYMBOL_PREFIX:pe,ADD_EVENT_LISTENER_STR:Ie,REMOVE_EVENT_LISTENER_STR:Le});});function yt(e,t){t.patchMethod(e,"queueMicrotask",c=>function(r,a){Zone.current.scheduleMicroTask("queueMicrotask",a[0]);});}var ve=j("zoneTask");function Ee(e,t,c,r){let a=null,l=null;t+=r,c+=r;let E={};function d(k){let y=k.data;return y.args[0]=function(){return k.invoke.apply(this,arguments);},y.handleId=a.apply(e,y.args),k;}function P(k){return l.call(e,k.data.handleId);}a=le(e,t,k=>function(y,M){if(typeof M[0]=="function"){let N={isPeriodic:r==="Interval",delay:r==="Timeout"||r==="Interval"?M[1]||0:void 0,args:M},O=M[0];M[0]=function(){try{return O.apply(this,arguments);}finally{N.isPeriodic||(typeof N.handleId=="number"?delete E[N.handleId]:N.handleId&&(N.handleId[ve]=null));}};let x=je(t,M[0],N,d,P);if(!x)return x;let A=x.data.handleId;return typeof A=="number"?E[A]=x:A&&(A[ve]=x),A&&A.ref&&A.unref&&typeof A.ref=="function"&&typeof A.unref=="function"&&(x.ref=A.ref.bind(A),x.unref=A.unref.bind(A)),typeof A=="number"||A?A:x;}else return k.apply(e,M);}),l=le(e,c,k=>function(y,M){let N=M[0],O;typeof N=="number"?O=E[N]:(O=N&&N[ve],O||(O=N)),O&&typeof O.type=="string"?O.state!=="notScheduled"&&(O.cancelFn&&O.data.isPeriodic||O.runCount===0)&&(typeof N=="number"?delete E[N]:N&&(N[ve]=null),O.zone.cancelTask(O)):k.apply(e,M);});}function pt(e,t){let{isBrowser:c,isMix:r}=t.getGlobalObjects();if(!c&&!r||!e.customElements||!("customElements"in e))return;let a=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"];t.patchCallbacks(t,e.customElements,"customElements","define",a);}function gt(e,t){if(Zone[t.symbol("patchEventTarget")])return;let{eventNames:c,zoneSymbolEventNames:r,TRUE_STR:a,FALSE_STR:l,ZONE_SYMBOL_PREFIX:E}=t.getGlobalObjects();for(let P=0;P<c.length;P++){let k=c[P],y=k+l,M=k+a,N=E+y,O=E+M;r[k]={},r[k][l]=N,r[k][a]=O;}let d=e.EventTarget;if(!(!d||!d.prototype))return t.patchEventTarget(e,t,[d&&d.prototype]),!0;}function kt(e,t){t.patchEventPrototype(e,t);}Zone.__load_patch("legacy",e=>{let t=e[Zone.__symbol__("legacyPatch")];t&&t();});Zone.__load_patch("timers",e=>{let t="set",c="clear";Ee(e,t,c,"Timeout"),Ee(e,t,c,"Interval"),Ee(e,t,c,"Immediate");});Zone.__load_patch("requestAnimationFrame",e=>{Ee(e,"request","cancel","AnimationFrame"),Ee(e,"mozRequest","mozCancel","AnimationFrame"),Ee(e,"webkitRequest","webkitCancel","AnimationFrame");});Zone.__load_patch("blocking",(e,t)=>{let c=["alert","prompt","confirm"];for(let r=0;r<c.length;r++){let a=c[r];le(e,a,(l,E,d)=>function(P,k){return t.current.run(l,e,k,d);});}});Zone.__load_patch("EventTarget",(e,t,c)=>{kt(e,c),gt(e,c);let r=e.XMLHttpRequestEventTarget;r&&r.prototype&&c.patchEventTarget(e,c,[r.prototype]);});Zone.__load_patch("MutationObserver",(e,t,c)=>{ge("MutationObserver"),ge("WebKitMutationObserver");});Zone.__load_patch("IntersectionObserver",(e,t,c)=>{ge("IntersectionObserver");});Zone.__load_patch("FileReader",(e,t,c)=>{ge("FileReader");});Zone.__load_patch("on_property",(e,t,c)=>{mt(c,e);});Zone.__load_patch("customElements",(e,t,c)=>{pt(e,c);});Zone.__load_patch("XHR",(e,t)=>{P(e);let c=j("xhrTask"),r=j("xhrSync"),a=j("xhrListener"),l=j("xhrScheduled"),E=j("xhrURL"),d=j("xhrErrorBeforeScheduled");function P(k){let y=k.XMLHttpRequest;if(!y)return;let M=y.prototype;function N(_){return _[c];}let O=M[De],x=M[Se];if(!O){let _=k.XMLHttpRequestEventTarget;if(_){let Z=_.prototype;O=Z[De],x=Z[Se];}}let A="readystatechange",J="scheduled";function W(_){let Z=_.data,b=Z.target;b[l]=!1,b[d]=!1;let K=b[a];O||(O=b[De],x=b[Se]),K&&x.call(b,A,K);let re=b[a]=()=>{if(b.readyState===b.DONE)if(!Z.aborted&&b[l]&&_.state===J){let U=b[t.__symbol__("loadfalse")];if(b.status!==0&&U&&U.length>0){let te=_.invoke;_.invoke=function(){let Q=b[t.__symbol__("loadfalse")];for(let V=0;V<Q.length;V++)Q[V]===_&&Q.splice(V,1);!Z.aborted&&_.state===J&&te.call(_);},U.push(_);}else _.invoke();}else!Z.aborted&&b[l]===!1&&(b[d]=!0);};return O.call(b,A,re),b[c]||(b[c]=_),m.apply(b,Z.args),b[l]=!0,_;}function R(){}function T(_){let Z=_.data;return Z.aborted=!0,$.apply(Z.target,Z.args);}let Y=le(M,"open",()=>function(_,Z){return _[r]=Z[2]==!1,_[E]=Z[1],Y.apply(_,Z);}),H="XMLHttpRequest.send",X=j("fetchTaskAborting"),I=j("fetchTaskScheduling"),m=le(M,"send",()=>function(_,Z){if(t.current[I]===!0||_[r])return m.apply(_,Z);{let b={target:_,url:_[E],isPeriodic:!1,args:Z,aborted:!1},K=je(H,R,b,W,T);_&&_[d]===!0&&!b.aborted&&K.state===J&&K.invoke();}}),$=le(M,"abort",()=>function(_,Z){let b=N(_);if(b&&typeof b.type=="string"){if(b.cancelFn==null||b.data&&b.data.aborted)return;b.zone.cancelTask(b);}else if(t.current[X]===!0)return $.apply(_,Z);});}});Zone.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&lt(e.navigator.geolocation,["getCurrentPosition","watchPosition"]);});Zone.__load_patch("PromiseRejectionEvent",(e,t)=>{function c(r){return function(a){rt(e,r).forEach(E=>{let d=e.PromiseRejectionEvent;if(d){let P=new d(r,{promise:a.promise,reason:a.rejection});E.invoke(P);}});};}e.PromiseRejectionEvent&&(t[j("unhandledPromiseRejectionHandler")]=c("unhandledrejection"),t[j("rejectionHandledHandler")]=c("rejectionhandled"));});Zone.__load_patch("queueMicrotask",(e,t,c)=>{yt(e,c);});(globalThis.$localize??={}).locale="fr-FR";/**i18n:6959f0805aed36e89e3ca3a5174470a77779077d2bd28bf367e9aae9161831e1*/