/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssgradients-geolocation-input-inputtypes-prefixes-setclasses-teststyles !*/
!function(e,t,n){function a(e,t){return typeof e===t}function i(){var e,t,n,i,o,s,l;for(var r in f)if(f.hasOwnProperty(r)){if(e=[],t=f[r],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=a(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)s=e[o],l=s.split("."),1===l.length?Modernizr[l[0]]=i:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=i),d.push((i?"":"no-")+l.join("-"))}}function o(e){var t=u.className,n=Modernizr._config.classPrefix||"";if(m&&(t=t.baseVal),Modernizr._config.enableJSClass){var a=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(a,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),m?u.className.baseVal=t:u.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):m?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=s(m?"svg":"body"),e.fake=!0),e}function r(e,n,a,i){var o,r,d,f,c="modernizr",p=s("div"),m=l();if(parseInt(a,10))for(;a--;)d=s("div"),d.id=i?i[a]:c+(a+1),p.appendChild(d);return o=s("style"),o.type="text/css",o.id="s"+c,(m.fake?m:p).appendChild(o),m.appendChild(p),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),p.id=c,m.fake&&(m.style.background="",m.style.overflow="hidden",f=u.style.overflow,u.style.overflow="hidden",u.appendChild(m)),r=n(p,e),m.fake?(m.parentNode.removeChild(m),u.style.overflow=f,u.offsetHeight):p.parentNode.removeChild(p),!!r}var d=[],f=[],c={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){f.push({name:e,fn:t,options:n})},addAsyncTest:function(e){f.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr,Modernizr.addTest("geolocation","geolocation"in navigator);var p=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];c._prefixes=p;var u=t.documentElement,m="svg"===u.nodeName.toLowerCase();Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",a="",i=0,o=p.length-1;o>i;i++)e=0===i?"to ":"",a+=t+p[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(a+=t+"-webkit-"+n);var l=s("a"),r=l.style;return r.cssText=a,(""+r.backgroundImage).indexOf("gradient")>-1});var g=s("input"),h="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),v={};Modernizr.input=function(t){for(var n=0,a=t.length;a>n;n++)v[t[n]]=!!(t[n]in g);return v.list&&(v.list=!(!s("datalist")||!e.HTMLDataListElement)),v}(h);var y="search tel url email datetime date month week time datetime-local number range color".split(" "),w={};Modernizr.inputtypes=function(e){for(var a,i,o,s=e.length,l="1)",r=0;s>r;r++)g.setAttribute("type",a=e[r]),o="text"!==g.type&&"style"in g,o&&(g.value=l,g.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(a)&&g.style.WebkitAppearance!==n?(u.appendChild(g),i=t.defaultView,o=i.getComputedStyle&&"textfield"!==i.getComputedStyle(g,null).WebkitAppearance&&0!==g.offsetHeight,u.removeChild(g)):/^(search|tel)$/.test(a)||(o=/^(url|email)$/.test(a)?g.checkValidity&&g.checkValidity()===!1:g.value!=l)),w[e[r]]=!!o;return w}(y);c.testStyles=r;i(),o(d),delete c.addTest,delete c.addAsyncTest;for(var b=0;b<Modernizr._q.length;b++)Modernizr._q[b]();e.Modernizr=Modernizr}(window,document);/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return!0;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});
/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(e,i){var n,o,a,r=e.nodeName.toLowerCase();return"area"===r?(n=e.parentNode,o=n.name,e.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap=#"+o+"]")[0],!!a&&s(a)):!1):(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"===r?e.href||i:i)&&s(e)}function s(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var n=0,o=/^ui-id-\d+$/;t.ui=t.ui||{},t.extend(t.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({focus:function(e){return function(i,s){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),s&&s.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(i){if(i!==e)return this.css("zIndex",i);if(this.length)for(var s,n,o=t(this[0]);o.length&&o[0]!==document;){if(s=o.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(n=parseInt(o.css("zIndex"),10),!isNaN(n)&&0!==n))return n;o=o.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+(++n))})},removeUniqueId:function(){return this.each(function(){o.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])},focusable:function(e){return i(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var s=t.attr(e,"tabindex"),n=isNaN(s);return(n||s>=0)&&i(e,!n)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(i,s){function n(e,i,s,n){return t.each(o,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),n&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var o="Width"===s?["Left","Right"]:["Top","Bottom"],a=s.toLowerCase(),r={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+s]=function(i){return i===e?r["inner"+s].call(this):this.each(function(){t(this).css(a,n(this,i)+"px")})},t.fn["outer"+s]=function(e,i){return"number"!=typeof e?r["outer"+s].call(this,e):this.each(function(){t(this).css(a,n(this,e,!0,i)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.support.selectstart="onselectstart"in document.createElement("div"),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i){var s,n=t.plugins[e];if(n&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(s=0;n.length>s;s++)t.options[n[s][0]]&&n[s][1].apply(t.element,i)}},hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)}})})(jQuery),function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,a,r,h,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},a=t[c][i],r=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),h=new s,h.options=t.widget.extend({},h.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),r.prototype=t.widget.extend(h,{widgetEventPrefix:a?h.widgetEventPrefix||i:i},l,{constructor:r,namespace:c,widgetName:i,widgetFullName:o}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var n,o,a=s.call(arguments,1),r=0,h=a.length;h>r;r++)for(n in a[r])o=a[r][n],a[r].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,h=s.call(arguments,1),l=this;return a=!r&&h.length?t.widget.extend.apply(null,[a].concat(h)):a,r?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(s=n[a].apply(n,h),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new n(a,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},n=i.split("."),i=n.shift(),n.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;n.length-1>a;a++)o[n[a]]=o[n[a]]||{},o=o[n[a]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,a=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,r){function h(){return i||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(h.guid=r.guid=r.guid||h.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+a.eventNamespace,u=l[2];u?o.delegate(u,c,h):s.bind(c,h)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})}(jQuery),function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,o="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return n&&!o&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),function(t){t.widget("ui.draggable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(t(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(t(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offsetParent=this.helper.offsetParent(),this.offsetParentCssPosition=this.offsetParent.css("position"),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.offset.scroll=!1,t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_mouseDrag:function(e,i){if("fixed"===this.offsetParentCssPosition&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"original"!==this.options.helper||t.contains(this.element[0].ownerDocument,this.element[0])?("invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1):!1},_mouseUp:function(e){return t("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.element.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;return n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):"document"===n.containment?(this.containment=[0,0,t(document).width()-this.helperProportions.width-this.margins.left,(t(document).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],undefined):n.containment.constructor===Array?(this.containment=n.containment,undefined):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e="hidden"!==i.css("overflow"),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i),undefined):(this.containment=null,undefined)},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent;return this.offset.scroll||(this.offset.scroll={top:n.scrollTop(),left:n.scrollLeft()}),{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top)*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)*s}},_generatePosition:function(e){var i,s,n,o,a=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=e.pageX,l=e.pageY;return this.offset.scroll||(this.offset.scroll={top:r.scrollTop(),left:r.scrollLeft()}),this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,h=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s]),"drag"===e&&(this.positionAbs=this._convertPositionTo("absolute")),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i){var s=t(this).data("ui-draggable"),n=s.options,o=t.extend({},i,{item:s.element});s.sortables=[],t(n.connectToSortable).each(function(){var i=t.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",e,o))})},stop:function(e,i){var s=t(this).data("ui-draggable"),n=t.extend({},i,{item:s.element});t.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(e),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",e,n))})},drag:function(e,i){var s=t(this).data("ui-draggable"),n=this;t.each(s.sortables,function(){var o=!1,a=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(o=!0,t.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==a&&this.instance._intersectsWith(this.instance.containerCache)&&t.contains(a.instance.element[0],this.instance.element[0])&&(o=!1),o})),o?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=t(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},e.target=this.instance.currentItem[0],this.instance._mouseCapture(e,!0),this.instance._mouseStart(e,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",e),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(e)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",e,this.instance._uiHash(this.instance)),this.instance._mouseStop(e,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",e),s.dropped=!1)})}}),t.ui.plugin.add("draggable","cursor",{start:function(){var e=t("body"),i=t(this).data("ui-draggable").options;e.css("cursor")&&(i._cursor=e.css("cursor")),e.css("cursor",i.cursor)},stop:function(){var e=t(this).data("ui-draggable").options;e._cursor&&t("body").css("cursor",e._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(){var e=t(this).data("ui-draggable");e.scrollParent[0]!==document&&"HTML"!==e.scrollParent[0].tagName&&(e.overflowOffset=e.scrollParent.offset())},drag:function(e){var i=t(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-e.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:e.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-e.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:e.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(document).scrollTop()<s.scrollSensitivity?n=t(document).scrollTop(t(document).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<s.scrollSensitivity&&(n=t(document).scrollTop(t(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(document).scrollLeft()<s.scrollSensitivity?n=t(document).scrollLeft(t(document).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<s.scrollSensitivity&&(n=t(document).scrollLeft(t(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e)}}),t.ui.plugin.add("draggable","snap",{start:function(){var e=t(this).data("ui-draggable"),i=e.options;e.snapElements=[],t(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=t(this),s=i.offset();this!==e.element[0]&&e.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(e,i){var s,n,o,a,r,h,l,c,u,d,p=t(this).data("ui-draggable"),f=p.options,g=f.snapTolerance,m=i.offset.left,v=m+p.helperProportions.width,_=i.offset.top,b=_+p.helperProportions.height;for(u=p.snapElements.length-1;u>=0;u--)r=p.snapElements[u].left,h=r+p.snapElements[u].width,l=p.snapElements[u].top,c=l+p.snapElements[u].height,r-g>v||m>h+g||l-g>b||_>c+g||!t.contains(p.snapElements[u].item.ownerDocument,p.snapElements[u].item)?(p.snapElements[u].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=!1):("inner"!==f.snapMode&&(s=g>=Math.abs(l-b),n=g>=Math.abs(c-_),o=g>=Math.abs(r-v),a=g>=Math.abs(h-m),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c,left:0}).top-p.margins.top),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||o||a,"outer"!==f.snapMode&&(s=g>=Math.abs(l-_),n=g>=Math.abs(c-b),o=g>=Math.abs(r-m),a=g>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:c-p.helperProportions.height,left:0}).top-p.margins.top),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[u].snapping&&(s||n||o||a||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,e,t.extend(p._uiHash(),{snapItem:p.snapElements[u].item})),p.snapElements[u].snapping=s||n||o||a||d)}}),t.ui.plugin.add("draggable","stack",{start:function(){var e,i=this.data("ui-draggable").options,s=t.makeArray(t(i.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});s.length&&(e=parseInt(t(s[0]).css("zIndex"),10)||0,t(s).each(function(i){t(this).css("zIndex",e+i)}),this.css("zIndex",e+s.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i){var s=t(i.helper),n=t(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(e,i){var s=t(this).data("ui-draggable").options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}})}(jQuery),function(t){function e(t,e,i){return t>e&&e+i>t}t.widget("ui.droppable",{version:"1.10.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;
this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],undefined):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},t.ui.ddmanager.droppables[i.scope]=t.ui.ddmanager.droppables[i.scope]||[],t.ui.ddmanager.droppables[i.scope].push(this),i.addClasses&&this.element.addClass("ui-droppable")},_destroy:function(){for(var e=0,i=t.ui.ddmanager.droppables[this.options.scope];i.length>e;e++)i[e]===this&&i.splice(e,1);this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){"accept"===e&&(this.accept=t.isFunction(i)?i:function(t){return t.is(i)}),t.Widget.prototype._setOption.apply(this,arguments)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var e=t.data(this,"ui-droppable");return e.options.greedy&&!e.options.disabled&&e.options.scope===s.options.scope&&e.accept.call(e.element[0],s.currentItem||s.element)&&t.ui.intersect(s,t.extend(e,{offset:e.element.offset()}),e.options.tolerance)?(n=!0,!1):undefined}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(t,i,s){if(!i.offset)return!1;var n,o,a=(t.positionAbs||t.position.absolute).left,r=(t.positionAbs||t.position.absolute).top,h=a+t.helperProportions.width,l=r+t.helperProportions.height,c=i.offset.left,u=i.offset.top,d=c+i.proportions().width,p=u+i.proportions().height;switch(s){case"fit":return a>=c&&d>=h&&r>=u&&p>=l;case"intersect":return a+t.helperProportions.width/2>c&&d>h-t.helperProportions.width/2&&r+t.helperProportions.height/2>u&&p>l-t.helperProportions.height/2;case"pointer":return n=(t.positionAbs||t.position.absolute).left+(t.clickOffset||t.offset.click).left,o=(t.positionAbs||t.position.absolute).top+(t.clickOffset||t.offset.click).top,e(o,u,i.proportions().height)&&e(n,c,i.proportions().width);case"touch":return(r>=u&&p>=r||l>=u&&p>=l||u>r&&l>p)&&(a>=c&&d>=a||h>=c&&d>=h||c>a&&h>d);default:return!1}},t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=t.ui.intersect(e,this,this.options.tolerance),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t.data(this,"ui-droppable").options.scope===n}),o.length&&(s=t.data(o[0],"ui-droppable"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}}}(jQuery),function(t){function e(t){return parseInt(t,10)||0}function i(t){return!isNaN(parseInt(t,10))}t.widget("ui.resizable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var e,i,s,n,o,a=this,r=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;e.length>i;i++)s=t.trim(e[i]),o="ui-resizable-"+s,n=t("<div class='ui-resizable-handle "+o+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=t(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),t(this.handles[i]).length},this._renderAxis(this.element),this._handles=t(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){a.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(t(this).removeClass("ui-resizable-autohide"),a._handles.show())}).mouseleave(function(){r.disabled||a.resizing||(t(this).addClass("ui-resizable-autohide"),a._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,o,a=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=e(this.helper.css("left")),n=e(this.helper.css("top")),a.containment&&(s+=t(a.containment).scrollLeft()||0,n+=t(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,o=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===o?this.axis+"-resize":o),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(e){var i,s=this.helper,n={},o=this.originalMousePosition,a=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,c=this.size.height,u=e.pageX-o.left||0,d=e.pageY-o.top||0,p=this._change[a];return p?(i=p.apply(this,[e,u,d]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==c&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(n)||this._trigger("resize",e,this.ui()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,h,l=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&t.ui.hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null,h=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null,l.animate||this.element.css(t.extend(a,{top:h,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!l.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(t){var e,s,n,o,a,r=this.options;a={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||t)&&(e=a.minHeight*this.aspectRatio,n=a.minWidth/this.aspectRatio,s=a.maxHeight*this.aspectRatio,o=a.maxWidth/this.aspectRatio,e>a.minWidth&&(a.minWidth=e),n>a.minHeight&&(a.minHeight=n),a.maxWidth>s&&(a.maxWidth=s),a.maxHeight>o&&(a.maxHeight=o)),this._vBoundaries=a},_updateCache:function(t){this.offset=this.helper.offset(),i(t.left)&&(this.position.left=t.left),i(t.top)&&(this.position.top=t.top),i(t.height)&&(this.size.height=t.height),i(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,s=this.size,n=this.axis;return i(t.height)?t.width=t.height*this.aspectRatio:i(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===n&&(t.left=e.left+(s.width-t.width),t.top=null),"nw"===n&&(t.top=e.top+(s.height-t.height),t.left=e.left+(s.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,s=this.axis,n=i(t.width)&&e.maxWidth&&e.maxWidth<t.width,o=i(t.height)&&e.maxHeight&&e.maxHeight<t.height,a=i(t.width)&&e.minWidth&&e.minWidth>t.width,r=i(t.height)&&e.minHeight&&e.minHeight>t.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,c=/sw|nw|w/.test(s),u=/nw|ne|n/.test(s);return a&&(t.width=e.minWidth),r&&(t.height=e.minHeight),n&&(t.width=e.maxWidth),o&&(t.height=e.maxHeight),a&&c&&(t.left=h-e.minWidth),n&&c&&(t.left=h-e.maxWidth),r&&u&&(t.top=l-e.minHeight),o&&u&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var t,e,i,s,n,o=this.helper||this.element;for(t=0;this._proportionallyResizeElements.length>t;t++){if(n=this._proportionallyResizeElements[t],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],e=0;i.length>e;e++)this.borderDif[e]=(parseInt(i[e],10)||0)+(parseInt(s[e],10)||0);n.css({height:o.height()-this.borderDif[0]-this.borderDif[2]||0,width:o.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&t.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-a},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,c=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(h,c&&l?{top:c,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,o,a,r,h,l=t(this).data("ui-resizable"),c=l.options,u=l.element,d=c.containment,p=d instanceof t?d.get(0):/parent/.test(d)?u.parent().get(0):d;p&&(l.containerElement=t(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(i=t(p),s=[],t(["Top","Right","Left","Bottom"]).each(function(t,n){s[t]=e(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,o=l.containerSize.height,a=l.containerSize.width,r=t.ui.hasScroll(p,"left")?p.scrollWidth:a,h=t.ui.hasScroll(p)?p.scrollHeight:o,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(e){var i,s,n,o,a=t(this).data("ui-resizable"),r=a.options,h=a.containerOffset,l=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(u=h),l.left<(a._helper?h.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-h.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio),a.position.left=r.helper?h.left:0),l.top<(a._helper?h.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-h.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio),a.position.top=a._helper?h.top:0),a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top,i=Math.abs((a._helper?a.offset.left-u.left:a.offset.left-u.left)+a.sizeDiff.width),s=Math.abs((a._helper?a.offset.top-u.top:a.offset.top-h.top)+a.sizeDiff.height),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o&&(i-=Math.abs(a.parentData.left)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio))},stop:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),h=a.outerWidth()-e.sizeDiff.width,l=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=function(e){t(e).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):t.each(i.alsoResize,function(t){s(t)})},resize:function(e,i){var s=t(this).data("ui-resizable"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0},h=function(e,s){t(e).each(function(){var e=t(this),n=t(this).data("ui-resizable-alsoresize"),o={},a=s&&s.length?s:e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(a,function(t,e){var i=(n[e]||0)+(r[e]||0);i&&i>=0&&(o[e]=i||null)}),e.css(o)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):t.each(n.alsoResize,function(t,e){h(t,e)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).data("ui-resizable");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).data("ui-resizable");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e=t(this).data("ui-resizable"),i=e.options,s=e.size,n=e.originalSize,o=e.originalPosition,a=e.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,c=Math.round((s.width-n.width)/h)*h,u=Math.round((s.height-n.height)/l)*l,d=n.width+c,p=n.height+u,f=i.maxWidth&&d>i.maxWidth,g=i.maxHeight&&p>i.maxHeight,m=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,m&&(d+=h),v&&(p+=l),f&&(d-=h),g&&(p-=l),/^(se|s|e)$/.test(a)?(e.size.width=d,e.size.height=p):/^(ne)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.top=o.top-u):/^(sw)$/.test(a)?(e.size.width=d,e.size.height=p,e.position.left=o.left-c):(p-l>0?(e.size.height=p,e.position.top=o.top-u):(e.size.height=l,e.position.top=o.top+n.height-l),d-h>0?(e.size.width=d,e.position.left=o.left-c):(e.size.width=h,e.position.left=o.left+n.width-h))}})}(jQuery),function(t){t.widget("ui.selectable",t.ui.mouse,{version:"1.10.4",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e=t(i.options.filter,i.element[0]),e.addClass("ui-selectee"),e.each(function(){var e=t(this),i=e.offset();t.data(this,"selectable-item",{element:this,$element:e,left:i.left,top:i.top,right:i.left+e.outerWidth(),bottom:i.top+e.outerHeight(),startselected:!1,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=t("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):undefined}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,h=e.pageY;return o>r&&(i=r,r=o,o=i),a>h&&(i=h,h=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:h-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||o>i.right||i.top>h||a>i.bottom):"fit"===n.tolerance&&(l=i.left>o&&r>i.right&&i.top>a&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}})}(jQuery),function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):undefined}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-t(document).scrollTop()<a.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-a.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<a.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+a.scrollSpeed)),e.pageX-t(document).scrollLeft()<a.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-a.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<a.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;
this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>r&&h>s+l,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=i&&s,o=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return n?this.floating?a&&"right"===a||"down"===o?2:1:o&&("down"===o?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return this.floating&&o?"right"===o&&s||"left"===o&&!s:n&&("down"===n&&i||"up"===n&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],h=[],l=this._connectWith();if(l&&e)for(s=l.length-1;s>=0;s--)for(o=t(l[s]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&h.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(h.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",a),c.push({item:h,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?e.currentItem.children().each(function(){t("<td>&#160;</td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var n,o,a,r,h,l,c,u,d,p,f=null,g=null;for(n=this.containers.length-1;n>=0;n--)if(!t.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(f&&t.contains(this.containers[n].element[0],f.element[0]))continue;f=this.containers[n],g=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",s,this._uiHash(this)),this.containers[n].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[g].containerCache.over||(this.containers[g]._trigger("over",s,this._uiHash(this)),this.containers[g].containerCache.over=1);else{for(a=1e4,r=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",c=this.positionAbs[h]+this.offset.click[h],o=this.items.length-1;o>=0;o--)t.contains(this.containers[g].element[0],this.items[o].item[0])&&this.items[o].item[0]!==this.currentItem[0]&&(!p||e(this.positionAbs.top+this.offset.click.top,this.items[o].top,this.items[o].height))&&(u=this.items[o].item.offset()[h],d=!1,Math.abs(u-c)>Math.abs(u+this.items[o][l]-c)&&(d=!0,u+=this.items[o][l]),a>Math.abs(u-c)&&(a=Math.abs(u-c),r=this.items[o],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[g])return;r?this._rearrange(s,r,null,!0):this._rearrange(s,null,this.containers[g].element,!0),this._trigger("change",s,this._uiHash()),this.containers[g]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[g],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[g]._trigger("over",s,this._uiHash(this)),this.containers[g].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})}(jQuery),function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,o){var a,r=o.re.exec(i),h=r&&o.parse(r),l=o.space||"rgba";return h?(a=s[l](h),s[c[l].cache]=a[c[l].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,a,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,h],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),o=c[n],a=0===this.alpha()?l("transparent"):this,r=a[o.cache]||o.to(a._rgba),h=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],l=s[o],c=u[n.type]||{};null!==l&&(null===a?h[o]=l:(c.mod&&(l-a>c.mod/2?a+=c.mod:a-l>c.mod/2&&(a-=c.mod)),h[o]=i((l-a)*e+a,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),h=Math.min(s,n,o),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-o)/l+360:n===r?60*(o-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[a]&&(this[a]=h(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[a]=d,n):l(d)},f(o,function(e,i){l.fn[e]||(l.fn[e]=function(n){var o,a=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=l(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function s(e,i){var s,n,a={};for(s in i)n=i[s],e[s]!==n&&(o[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(a[s]=n));return a}var n=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,o,a,r){var h=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",l=h.children?a.find("*").addBack():a;l=l.map(function(){var e=t(this);return{el:e,start:i(this)}}),o=function(){t.each(n,function(t,i){e[i]&&a[i+"Class"](e[i])})},o(),l=l.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),a.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,o,a,r){return"boolean"==typeof n||n===e?o?t.effects.animateClass.call(this,n?{add:s}:{remove:s},o,a,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,o,a)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.4",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,o;for(o=0;s.length>o;o++)null!==s[o]&&(n=t.data(i+s[o]),n===e&&(n=""),t.css(s[o],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(o)&&o.call(n[0]),t.isFunction(e)&&e()}var n=t(this),o=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):a.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,o=i.queue,a=t.effects.effect[i.effect];return t.fx.off||!a?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):o===!1?this.each(e):this.queue(o||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()}(jQuery),function(t){var e=0,i={},s={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",s.height=s.paddingTop=s.paddingBottom=s.borderTopWidth=s.borderBottomWidth="show",t.widget("ui.accordion",{version:"1.10.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t(),content:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))
},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),undefined):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),"disabled"===t&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e),undefined)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:o=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[s-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),o.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,s=this.options,n=s.heightStyle,o=this.element.parent(),a=this.accordionId="ui-accordion-"+(this.element.attr("id")||++e);this.active=this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(e){var i=t(this),s=i.attr("id"),n=i.next(),o=n.attr("id");s||(s=a+"-header-"+e,i.attr("id",s)),o||(o=a+"-panel-"+e,n.attr("id",o)),i.attr("aria-controls",o),n.attr("aria-labelledby",s)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(s.event),"fill"===n?(i=o.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.headers.each(function(){i-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(i=0,this.headers.next().each(function(){i=Math.max(i,t(this).css("height","").height())}).height(i))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n[0]===s[0],a=o&&i.collapsible,r=a?t():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:a?t():n,newPanel:r};e.preventDefault(),o&&!i.collapsible||this._trigger("beforeActivate",e,l)===!1||(i.active=a?!1:this.headers.index(n),this.active=o?t():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),o||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(t,e,n){var o,a,r,h=this,l=0,c=t.length&&(!e.length||t.index()<e.index()),u=this.options.animate||{},d=c&&u.down||u,p=function(){h._toggleComplete(n)};return"number"==typeof d&&(r=d),"string"==typeof d&&(a=d),a=a||d.easing||u.easing,r=r||d.duration||u.duration,e.length?t.length?(o=t.show().outerHeight(),e.animate(i,{duration:r,easing:a,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(s,{duration:r,easing:a,complete:p,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(o-e.outerHeight()-l),l=0)}}),undefined):e.animate(i,r,a,p):t.animate(s,r,a,p)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})}(jQuery),function(t){t.widget("ui.autocomplete",{version:"1.10.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;this.isMultiLine=o?!0:a?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,undefined;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:case o.NUMPAD_ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),undefined;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),undefined):(this._searchTimeout(t),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(t),this._change(t),undefined)}}),this._initSource(),this.menu=t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];t(e.target).closest(".ui-menu-item").length||this._delay(function(){var e=this;this.document.one("mousedown",function(s){s.target===e.element[0]||s.target===i||t.contains(i,s.target)||e.close()})})},menufocus:function(e,i){if(this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",e,{item:s})?e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=t("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):undefined},_search:function(t){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({label:e.label||e.value,value:e.value||e.label},e)})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<a>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[t](e),undefined):(this.search(null,e),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var e;this._superApply(arguments),this.options.disabled||this.cancelSearch||(e=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.text(e))}})}(jQuery),function(t){var e,i="ui-button ui-widget ui-state-default ui-corner-all",s="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",n=function(){var e=t(this);setTimeout(function(){e.find(":ui-button").button("refresh")},1)},o=function(e){var i=e.name,s=e.form,n=t([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),n};t.widget("ui.button",{version:"1.10.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,n),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var s=this,a=this.options,r="checkbox"===this.type||"radio"===this.type,h=r?"":"ui-state-active";null===a.label&&(a.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(i).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){a.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){a.disabled||t(this).removeClass(h)}).bind("click"+this.eventNamespace,function(t){a.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),r&&this.element.bind("change"+this.eventNamespace,function(){s.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return a.disabled?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(a.disabled)return!1;t(this).addClass("ui-state-active"),s.buttonElement.attr("aria-pressed","true");var e=s.element[0];o(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return a.disabled?!1:(t(this).addClass("ui-state-active"),e=this,s.document.one("mouseup",function(){e=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return a.disabled?!1:(t(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(e){return a.disabled?!1:((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",a.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(i+" ui-state-active "+s).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(this.element.prop("disabled",!!e),e&&this.buttonElement.removeClass("ui-state-focus"),undefined):(this._resetButton(),undefined)},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?o(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var e=this.buttonElement.removeClass(s),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),n=this.options.icons,o=n.primary&&n.secondary,a=[];n.primary||n.secondary?(this.options.text&&a.push("ui-button-text-icon"+(o?"s":n.primary?"-primary":"-secondary")),n.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+n.primary+"'></span>"),n.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+n.secondary+"'></span>"),this.options.text||(a.push(o?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):a.push("ui-button-text-only"),e.addClass(a.join(" "))}}),t.widget("ui.buttonset",{version:"1.10.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery),function(t,e){function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.dpDiv=s(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(i,"mouseout",function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",function(){t.datepicker._isDisabledDatepicker(o.inline?e.parent()[0]:o.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))})}function n(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}t.extend(t.ui,{datepicker:{version:"1.10.4"}});var o,a="datepicker";t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return n(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var n=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),t.data(e,a,i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.click(function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,a,i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,o,r){var h,l,c,u,d,p=this._dialogInst;return p||(this.uuid+=1,h="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+h+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),t("body").append(this._dialogInput),p=this._dialogInst=this._newInst(this._dialogInput,!1),p.settings={},t.data(this._dialogInput[0],a,p)),n(p.settings,o||{}),i=i&&i.constructor===Date?this._formatDate(p,i):i,this._dialogInput.val(i),this._pos=r?r.length?r:[r.pageX,r.pageY]:null,this._pos||(l=document.documentElement.clientWidth,c=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+u,c/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),p.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],a,p),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,a);s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,a),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty())},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,a);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,a);n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,a)}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(i,s,o){var a,r,h,l,c=this._getInst(i);return 2===arguments.length&&"string"==typeof s?"defaults"===s?t.extend({},t.datepicker._defaults):c?"all"===s?t.extend({},c.settings):this._get(c,s):null:(a=s||{},"string"==typeof s&&(a={},a[s]=o),c&&(this._curInst===c&&this._hideDatepicker(),r=this._getDateDatepicker(i,!0),h=this._getMinMaxDate(c,"min"),l=this._getMinMaxDate(c,"max"),n(c.settings,a),null!==h&&a.dateFormat!==e&&a.minDate===e&&(c.settings.minDate=this._formatDate(c,h)),null!==l&&a.dateFormat!==e&&a.maxDate===e&&(c.settings.maxDate=this._formatDate(c,l)),"disabled"in a&&(a.disabled?this._disableDatepicker(i):this._enableDatepicker(i)),this._attachments(t(i),c),this._autoSize(c),this._setDate(c,r),this._updateAlternate(c),this._updateDatepicker(c)),e)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");
break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(i){var s,n,o=t.datepicker._getInst(i.target);return t.datepicker._get(o,"constrainInput")?(s=t.datepicker._possibleChars(t.datepicker._get(o,"dateFormat")),n=String.fromCharCode(null==i.charCode?i.keyCode:i.charCode),i.ctrlKey||i.metaKey||" ">n||!s||s.indexOf(n)>-1):e},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var i,s,o,a,r,h,l;i=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==i&&(t.datepicker._curInst.dpDiv.stop(!0,!0),i&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),s=t.datepicker._get(i,"beforeShow"),o=s?s.apply(e,[e,i]):{},o!==!1&&(n(i.settings,o),i.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(i),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),a=!1,t(e).parents().each(function(){return a|="fixed"===t(this).css("position"),!a}),r={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(i),r=t.datepicker._checkOffset(i,r,a),i.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":a?"fixed":"absolute",display:"none",left:r.left+"px",top:r.top+"px"}),i.inline||(h=t.datepicker._get(i,"showAnim"),l=t.datepicker._get(i,"duration"),i.dpDiv.zIndex(t(e).zIndex()+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?i.dpDiv.show(h,t.datepicker._get(i,"showOptions"),l):i.dpDiv[h||"show"](h?l:null),t.datepicker._shouldFocusInput(i)&&i.input.focus(),t.datepicker._curInst=i))}},_updateDatepicker:function(e){this.maxRows=4,o=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e),e.dpDiv.find("."+this._dayOverClass+" a").mouseover();var i,s=this._getNumberOfMonths(e),n=s[1],a=17;e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.focus(),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+o>l&&l>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,r=this._curInst;!r||e&&r!==t.data(e,a)||this._datepickerShowing&&(i=this._get(r,"showAnim"),s=this._get(r,"duration"),n=function(){t.datepicker._tidyDialog(r)},t.effects&&(t.effects.effect[i]||t.effects[i])?r.dpDiv.hide(i,t.datepicker._get(r,"showOptions"),s,n):r.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(r,"onClose"),o&&o.apply(r.input?r.input[0]:null,[r.input?r.input.val():"",r]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).each(function(){t(this).val(n)}))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(i,s,n){if(null==i||null==s)throw"Invalid arguments";if(s="object"==typeof s?""+s:s+"",""===s)return null;var o,a,r,h,l=0,c=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof c?c:(new Date).getFullYear()%100+parseInt(c,10),d=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,p=(n?n.dayNames:null)||this._defaults.dayNames,f=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,g=(n?n.monthNames:null)||this._defaults.monthNames,m=-1,v=-1,_=-1,b=-1,y=!1,w=function(t){var e=i.length>o+1&&i.charAt(o+1)===t;return e&&o++,e},x=function(t){var e=w(t),i="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n=RegExp("^\\d{1,"+i+"}"),o=s.substring(l).match(n);if(!o)throw"Missing number at position "+l;return l+=o[0].length,parseInt(o[0],10)},k=function(i,n,o){var a=-1,r=t.map(w(i)?o:n,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(r,function(t,i){var n=i[1];return s.substr(l,n.length).toLowerCase()===n.toLowerCase()?(a=i[0],l+=n.length,!1):e}),-1!==a)return a+1;throw"Unknown name at position "+l},D=function(){if(s.charAt(l)!==i.charAt(o))throw"Unexpected literal at position "+l;l++};for(o=0;i.length>o;o++)if(y)"'"!==i.charAt(o)||w("'")?D():y=!1;else switch(i.charAt(o)){case"d":_=x("d");break;case"D":k("D",d,p);break;case"o":b=x("o");break;case"m":v=x("m");break;case"M":v=k("M",f,g);break;case"y":m=x("y");break;case"@":h=new Date(x("@")),m=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"!":h=new Date((x("!")-this._ticksTo1970)/1e4),m=h.getFullYear(),v=h.getMonth()+1,_=h.getDate();break;case"'":w("'")?D():y=!0;break;default:D()}if(s.length>l&&(r=s.substr(l),!/^\s+/.test(r)))throw"Extra/unparsed characters found in date: "+r;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),b>-1)for(v=1,_=b;;){if(a=this._getDaysInMonth(m,v-1),a>=_)break;v++,_-=a}if(h=this._daylightSavingAdjust(new Date(m,v-1,_)),h.getFullYear()!==m||h.getMonth()+1!==v||h.getDate()!==_)throw"Invalid date";return h},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},l=function(t,e,i){var s=""+e;if(h(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return h(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||h("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=l("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=l("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=l("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=h("y")?e.getFullYear():(10>e.getYear()%100?"0":"")+e.getYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":h("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,i){return t.settings[i]!==e?t.settings[i]:this._defaults[i]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":a+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}l=h.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,h,l,c,u,d,p,f,g,m,v,_,b,y,w,x,k,D,C,I,P,T,M,S,z,A,E,H,N,W,O,F,R,L=new Date,j=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),Y=this._get(t,"isRTL"),B=this._get(t,"showButtonPanel"),V=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),q=this._getNumberOfMonths(t),U=this._get(t,"showCurrentAtPos"),Q=this._get(t,"stepMonths"),X=1!==q[0]||1!==q[1],$=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-U,te=t.drawYear;if(0>Z&&(Z+=12,te--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-q[0]*q[1]+1,J.getDate())),e=G&&G>e?G:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-Q,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":V?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+Q,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":V?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?$:j,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,h=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",l=B?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(Y?"":h)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),_=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",x=0;q[0]>x;x++){for(k="",this.maxRows=4,D=0;q[1]>D;D++){if(C=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),I=" ui-corner-all",P="",X){if(P+="<div class='ui-datepicker-group",q[1]>1)switch(D){case 0:P+=" ui-datepicker-group-first",I=" ui-corner-"+(Y?"right":"left");break;case q[1]-1:P+=" ui-datepicker-group-last",I=" ui-corner-"+(Y?"left":"right");break;default:P+=" ui-datepicker-group-middle",I=""}P+="'>"}for(P+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+I+"'>"+(/all|left/.test(I)&&0===x?Y?o:s:"")+(/all|right/.test(I)&&0===x?Y?s:o:"")+this._generateMonthYearHeader(t,Z,te,G,J,x>0||D>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",T=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)M=(w+c)%7,T+="<th"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[M]+"'>"+p[M]+"</span></th>";for(P+=T+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),z=(this._getFirstDayOfMonth(te,Z)-c+7)%7,A=Math.ceil((z+S)/7),E=X?this.maxRows>A?this.maxRows:A:A,this.maxRows=E,H=this._daylightSavingAdjust(new Date(te,Z,1-z)),N=0;E>N;N++){for(P+="<tr>",W=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(H)+"</td>":"",w=0;7>w;w++)O=m?m.apply(t.input?t.input[0]:null,[H]):[!0,""],F=H.getMonth()!==Z,R=F&&!_||!O[0]||G&&G>H||J&&H>J,W+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(H.getTime()===C.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===H.getTime()&&b.getTime()===C.getTime()?" "+this._dayOverClass:"")+(R?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!v?"":" "+O[1]+(H.getTime()===$.getTime()?" "+this._currentClass:"")+(H.getTime()===j.getTime()?" ui-datepicker-today":""))+"'"+(F&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(R?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(F&&!v?"&#xa0;":R?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===j.getTime()?" ui-state-highlight":"")+(H.getTime()===$.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);P+=W+"</tr>"}Z++,Z>11&&(Z=0,te++),P+="</tbody></table>"+(X?"</div>"+(q[0]>0&&D===q[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=P}y+=k}return y+=l,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var h,l,c,u,d,p,f,g,m=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),_=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!h||c>=s.getMonth())&&(!l||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(_||(b+=y+(!o&&m&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),_&&(b+=(!o&&m&&v?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.drawYear+("Y"===i?e:0),n=t.drawMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,h=this._get(t,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).mousedown(t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.10.4"}(jQuery),function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",e)!==!1){if(this._isOpen=!1,this._destroyOverlay(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&t(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",e)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),undefined;if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(n.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(t.each(i,function(i,s){var n,o;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(e.element[0],arguments)},o={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(o).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,o){s.position=[o.position.left-i.document.scrollLeft(),o.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,o=this.uiDialog.css("position"),a="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";
this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,n){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,o){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(o))}}).css("position",o)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var n=this,o=!1,a={};t.each(s,function(t,s){n._setOption(t,s),t in e&&(o=!0),t in i&&(a[t]=s)}),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",a)},_setOption:function(t,e){var i,s,n=this.uiDialog;"dialogClass"===t&&n.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=n.is(":data(ui-draggable)"),i&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(s=n.is(":data(ui-resizable)"),s&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(t.ui.dialog.overlayInstances--,t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],n=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(s=i.split?i.split(" "):[i[0],i[1]],1===s.length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(n[t]=s[t],s[t]=e)}),i={my:s[0]+(0>n[0]?n[0]:"+"+n[0])+" "+s[1]+(0>n[1]?n[1]:"+"+n[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})}(jQuery),function(t){var e=/up|down|vertical/,i=/up|left|vertical|horizontal/;t.effects.effect.blind=function(s,n){var o,a,r,h=t(this),l=["position","top","bottom","left","right","height","width"],c=t.effects.setMode(h,s.mode||"hide"),u=s.direction||"up",d=e.test(u),p=d?"height":"width",f=d?"top":"left",g=i.test(u),m={},v="show"===c;h.parent().is(".ui-effects-wrapper")?t.effects.save(h.parent(),l):t.effects.save(h,l),h.show(),o=t.effects.createWrapper(h).css({overflow:"hidden"}),a=o[p](),r=parseFloat(o.css(f))||0,m[p]=v?a:0,g||(h.css(d?"bottom":"right",0).css(d?"top":"left","auto").css({position:"absolute"}),m[f]=v?r:a+r),v&&(o.css(p,0),g||o.css(f,r+a)),o.animate(m,{duration:s.duration,easing:s.easing,queue:!1,complete:function(){"hide"===c&&h.hide(),t.effects.restore(h,l),t.effects.removeWrapper(h),n()}})}}(jQuery),function(t){t.effects.effect.bounce=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","height","width"],h=t.effects.setMode(a,e.mode||"effect"),l="hide"===h,c="show"===h,u=e.direction||"up",d=e.distance,p=e.times||5,f=2*p+(c||l?1:0),g=e.duration/f,m=e.easing,v="up"===u||"down"===u?"top":"left",_="up"===u||"left"===u,b=a.queue(),y=b.length;for((c||l)&&r.push("opacity"),t.effects.save(a,r),a.show(),t.effects.createWrapper(a),d||(d=a["top"===v?"outerHeight":"outerWidth"]()/3),c&&(o={opacity:1},o[v]=0,a.css("opacity",0).css(v,_?2*-d:2*d).animate(o,g,m)),l&&(d/=Math.pow(2,p-1)),o={},o[v]=0,s=0;p>s;s++)n={},n[v]=(_?"-=":"+=")+d,a.animate(n,g,m).animate(o,g,m),d=l?2*d:d/2;l&&(n={opacity:0},n[v]=(_?"-=":"+=")+d,a.animate(n,g,m)),a.queue(function(){l&&a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}),y>1&&b.splice.apply(b,[1,0].concat(b.splice(y,f+1))),a.dequeue()}}(jQuery),function(t){t.effects.effect.clip=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","height","width"],h=t.effects.setMode(a,e.mode||"hide"),l="show"===h,c=e.direction||"vertical",u="vertical"===c,d=u?"height":"width",p=u?"top":"left",f={};t.effects.save(a,r),a.show(),s=t.effects.createWrapper(a).css({overflow:"hidden"}),n="IMG"===a[0].tagName?s:a,o=n[d](),l&&(n.css(d,0),n.css(p,o/2)),f[d]=l?o:0,f[p]=l?0:o/2,n.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){l||a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}})}}(jQuery),function(t){t.effects.effect.drop=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","opacity","height","width"],a=t.effects.setMode(n,e.mode||"hide"),r="show"===a,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h?"pos":"neg",u={opacity:r?1:0};t.effects.save(n,o),n.show(),t.effects.createWrapper(n),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,r&&n.css("opacity",0).css(l,"pos"===c?-s:s),u[l]=(r?"pos"===c?"+=":"-=":"pos"===c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}})}}(jQuery),function(t){t.effects.effect.explode=function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),g||p.hide(),i()}var o,a,r,h,l,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=t.effects.setMode(p,e.mode||"hide"),g="show"===f,m=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),_=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(h=m.top+o*_,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*v,l=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*v,top:-o*_}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:_,left:r+(g?l*v:0),top:h+(g?c*_:0),opacity:g?0:1}).animate({left:r+(g?0:l*v),top:h+(g?0:c*_),opacity:g?1:0},e.duration||500,e.easing,s)}}(jQuery),function(t){t.effects.effect.fade=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"toggle");s.animate({opacity:n},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}}(jQuery),function(t){t.effects.effect.fold=function(e,i){var s,n,o=t(this),a=["position","top","bottom","left","right","height","width"],r=t.effects.setMode(o,e.mode||"hide"),h="show"===r,l="hide"===r,c=e.size||15,u=/([0-9]+)%/.exec(c),d=!!e.horizFirst,p=h!==d,f=p?["width","height"]:["height","width"],g=e.duration/2,m={},v={};t.effects.save(o,a),o.show(),s=t.effects.createWrapper(o).css({overflow:"hidden"}),n=p?[s.width(),s.height()]:[s.height(),s.width()],u&&(c=parseInt(u[1],10)/100*n[l?0:1]),h&&s.css(d?{height:0,width:c}:{height:c,width:0}),m[f[0]]=h?n[0]:c,v[f[1]]=h?n[1]:0,s.animate(m,g,e.easing).animate(v,g,e.easing,function(){l&&o.hide(),t.effects.restore(o,a),t.effects.removeWrapper(o),i()})}}(jQuery),function(t){t.effects.effect.highlight=function(e,i){var s=t(this),n=["backgroundImage","backgroundColor","opacity"],o=t.effects.setMode(s,e.mode||"show"),a={backgroundColor:s.css("backgroundColor")};"hide"===o&&(a.opacity=0),t.effects.save(s,n),s.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(a,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&s.hide(),t.effects.restore(s,n),i()}})}}(jQuery),function(t){t.effects.effect.pulsate=function(e,i){var s,n=t(this),o=t.effects.setMode(n,e.mode||"show"),a="show"===o,r="hide"===o,h=a||"hide"===o,l=2*(e.times||5)+(h?1:0),c=e.duration/l,u=0,d=n.queue(),p=d.length;for((a||!n.is(":visible"))&&(n.css("opacity",0).show(),u=1),s=1;l>s;s++)n.animate({opacity:u},c,e.easing),u=1-u;n.animate({opacity:u},c,e.easing),n.queue(function(){r&&n.hide(),i()}),p>1&&d.splice.apply(d,[1,0].concat(d.splice(p,l+1))),n.dequeue()}}(jQuery),function(t){t.effects.effect.puff=function(e,i){var s=t(this),n=t.effects.setMode(s,e.mode||"hide"),o="hide"===n,a=parseInt(e.percent,10)||150,r=a/100,h={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:n,complete:i,percent:o?a:100,from:o?h:{height:h.height*r,width:h.width*r,outerHeight:h.outerHeight*r,outerWidth:h.outerWidth*r}}),s.effect(e)},t.effects.effect.scale=function(e,i){var s=t(this),n=t.extend(!0,{},e),o=t.effects.setMode(s,e.mode||"effect"),a=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===o?0:100),r=e.direction||"both",h=e.origin,l={height:s.height(),width:s.width(),outerHeight:s.outerHeight(),outerWidth:s.outerWidth()},c={y:"horizontal"!==r?a/100:1,x:"vertical"!==r?a/100:1};n.effect="size",n.queue=!1,n.complete=i,"effect"!==o&&(n.origin=h||["middle","center"],n.restore=!0),n.from=e.from||("show"===o?{height:0,width:0,outerHeight:0,outerWidth:0}:l),n.to={height:l.height*c.y,width:l.width*c.x,outerHeight:l.outerHeight*c.y,outerWidth:l.outerWidth*c.x},n.fade&&("show"===o&&(n.from.opacity=0,n.to.opacity=1),"hide"===o&&(n.from.opacity=1,n.to.opacity=0)),s.effect(n)},t.effects.effect.size=function(e,i){var s,n,o,a=t(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],h=["position","top","bottom","left","right","overflow","opacity"],l=["width","height","overflow"],c=["fontSize"],u=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(a,e.mode||"effect"),f=e.restore||"effect"!==p,g=e.scale||"both",m=e.origin||["middle","center"],v=a.css("position"),_=f?r:h,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&a.show(),s={height:a.height(),width:a.width(),outerHeight:a.outerHeight(),outerWidth:a.outerWidth()},"toggle"===e.mode&&"show"===p?(a.from=e.to||b,a.to=e.from||s):(a.from=e.from||("show"===p?b:s),a.to=e.to||("hide"===p?b:s)),o={from:{y:a.from.height/s.height,x:a.from.width/s.width},to:{y:a.to.height/s.height,x:a.to.width/s.width}},("box"===g||"both"===g)&&(o.from.y!==o.to.y&&(_=_.concat(u),a.from=t.effects.setTransition(a,u,o.from.y,a.from),a.to=t.effects.setTransition(a,u,o.to.y,a.to)),o.from.x!==o.to.x&&(_=_.concat(d),a.from=t.effects.setTransition(a,d,o.from.x,a.from),a.to=t.effects.setTransition(a,d,o.to.x,a.to))),("content"===g||"both"===g)&&o.from.y!==o.to.y&&(_=_.concat(c).concat(l),a.from=t.effects.setTransition(a,c,o.from.y,a.from),a.to=t.effects.setTransition(a,c,o.to.y,a.to)),t.effects.save(a,_),a.show(),t.effects.createWrapper(a),a.css("overflow","hidden").css(a.from),m&&(n=t.effects.getBaseline(m,s),a.from.top=(s.outerHeight-a.outerHeight())*n.y,a.from.left=(s.outerWidth-a.outerWidth())*n.x,a.to.top=(s.outerHeight-a.to.outerHeight)*n.y,a.to.left=(s.outerWidth-a.to.outerWidth)*n.x),a.css(a.from),("content"===g||"both"===g)&&(u=u.concat(["marginTop","marginBottom"]).concat(c),d=d.concat(["marginLeft","marginRight"]),l=r.concat(u).concat(d),a.find("*[width]").each(function(){var i=t(this),s={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,l),i.from={height:s.height*o.from.y,width:s.width*o.from.x,outerHeight:s.outerHeight*o.from.y,outerWidth:s.outerWidth*o.from.x},i.to={height:s.height*o.to.y,width:s.width*o.to.x,outerHeight:s.height*o.to.y,outerWidth:s.width*o.to.x},o.from.y!==o.to.y&&(i.from=t.effects.setTransition(i,u,o.from.y,i.from),i.to=t.effects.setTransition(i,u,o.to.y,i.to)),o.from.x!==o.to.x&&(i.from=t.effects.setTransition(i,d,o.from.x,i.from),i.to=t.effects.setTransition(i,d,o.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,l)})})),a.animate(a.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===a.to.opacity&&a.css("opacity",a.from.opacity),"hide"===p&&a.hide(),t.effects.restore(a,_),f||("static"===v?a.css({position:"relative",top:a.to.top,left:a.to.left}):t.each(["top","left"],function(t,e){a.css(e,function(e,i){var s=parseInt(i,10),n=t?a.to.left:a.to.top;return"auto"===i?n+"px":s+n+"px"})})),t.effects.removeWrapper(a),i()}})}}(jQuery),function(t){t.effects.effect.shake=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","height","width"],a=t.effects.setMode(n,e.mode||"effect"),r=e.direction||"left",h=e.distance||20,l=e.times||3,c=2*l+1,u=Math.round(e.duration/c),d="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},g={},m={},v=n.queue(),_=v.length;for(t.effects.save(n,o),n.show(),t.effects.createWrapper(n),f[d]=(p?"-=":"+=")+h,g[d]=(p?"+=":"-=")+2*h,m[d]=(p?"-=":"+=")+2*h,n.animate(f,u,e.easing),s=1;l>s;s++)n.animate(g,u,e.easing).animate(m,u,e.easing);n.animate(g,u,e.easing).animate(f,u/2,e.easing).queue(function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}),_>1&&v.splice.apply(v,[1,0].concat(v.splice(_,c+1))),n.dequeue()}}(jQuery),function(t){t.effects.effect.slide=function(e,i){var s,n=t(this),o=["position","top","bottom","left","right","width","height"],a=t.effects.setMode(n,e.mode||"show"),r="show"===a,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h,u={};t.effects.save(n,o),n.show(),s=e.distance||n["top"===l?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(n).css({overflow:"hidden"}),r&&n.css(l,c?isNaN(s)?"-"+s:-s:s),u[l]=(r?c?"+=":"-=":c?"-=":"+=")+s,n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&n.hide(),t.effects.restore(n,o),t.effects.removeWrapper(n),i()}})}}(jQuery),function(t){t.effects.effect.transfer=function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,h=o?a.scrollLeft():0,l=n.offset(),c={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:u.top-r,left:u.left-h,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),i()})}}(jQuery),function(t){t.widget("ui.menu",{version:"1.10.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&t(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,o,a,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",o=String.fromCharCode(e.keyCode),a=!1,clearTimeout(this.filterTimer),o===n?a=!0:o=n+o,r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=a&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(o=String.fromCharCode(e.keyCode),r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=o,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})}(jQuery),function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var o,a=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(o!==e)return o;var i,s,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=n.children()[0];return t("body").append(n),i=a.offsetWidth,n.css("overflow","scroll"),s=a.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),o=i-s},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var o,p,g,m,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,g=_.height,m=_.offset,v=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=g:"center"===e.at[1]&&(v.top+=g/2),o=i(k.at,p,g),v.left+=o[0],v.top+=o[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,C=d+_+s(this,"marginBottom")+w.height,I=t.extend({},v),P=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?I.left-=u:"center"===e.my[0]&&(I.left-=u/2),"bottom"===e.my[1]?I.top-=d:"center"===e.my[1]&&(I.top-=d/2),I.left+=P[0],I.top+=P[1],t.support.offsetFractions||(I.left=h(I.left),I.top=h(I.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](I,{targetWidth:p,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:C,offset:[o[0]+P[0],o[1]+P[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=m.left-I.left,s=i+p-u,n=m.top-I.top,o=n+g-d,h={target:{element:b,left:m.left,top:m.top,width:p,height:g},element:{element:c,left:I.left,top:I.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>g&&g>r(n+o)&&(h.vertical="middle"),h.important=a(r(i),r(s))>a(r(n),r(o))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(I,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-o-n;e.collisionWidth>o?h>0&&0>=l?(i=t.left+h+e.collisionWidth-o-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+o-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=a(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-o-n;e.collisionHeight>o?h>0&&0>=l?(i=t.top+h+e.collisionHeight-o-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+o-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,a=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-a-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-a-o,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,a=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-a-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-a-o,t.top+p+f+g>c&&(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-h,t.top+p+f+g>u&&(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,o,a=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(a?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)e.style[o]=s[o];e.appendChild(r),i=a||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()}(jQuery),function(t,e){t.widget("ui.progressbar",{version:"1.10.4",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()
},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(t){return t===e?this.options.value:(this.options.value=this._constrainedValue(t),this._refreshValue(),e)},_constrainedValue:function(t){return t===e&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}})}(jQuery),function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,h,l,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,o.addClass("ui-state-active").focus(),h=o.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-o.width()/2,top:e.pageY-h.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,o;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,o=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),o!==!1&&this.values(e,i))):i!==this.value()&&(o=this._trigger("slide",t,{handle:this.handles[e],value:i}),o!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,c={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),c["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](c,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,o,a,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(a=this.options.step,n=o=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:o=this._valueMin();break;case t.ui.keyCode.END:o=this._valueMax();break;case t.ui.keyCode.PAGE_UP:o=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:o=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;o=this._trimAlignValue(n+a);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;o=this._trimAlignValue(n-a)}this._slide(i,r,o)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})}(jQuery),function(t){function e(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}t.widget("ui.spinner",{version:"1.10.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e={},i=this.element;return t.each(["min","max","step"],function(t,s){var n=i.attr(s);void 0!==n&&n.length&&(e[s]=n)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t),void 0)},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var t=this.element[0]===this.document[0].activeElement;t||(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:(this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var t=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=t.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*t.height())&&t.height()>0&&t.height(t.height()),this.options.disabled&&this.disable()},_keydown:function(e){var i=this.options,s=t.ui.keyCode;switch(e.keyCode){case s.UP:return this._repeat(null,1,e),!0;case s.DOWN:return this._repeat(null,-1,e),!0;case s.PAGE_UP:return this._repeat(null,i.page,e),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span>"+"</a>"+"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>"+"<span class='ui-icon "+this.options.icons.down+"'>&#9660;</span>"+"</a>"},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,s=this.options;return e=null!==s.min?s.min:0,i=t-e,i=Math.round(i/s.step)*s.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==s.max&&t>s.max?s.max:null!==s.min&&s.min>t?s.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){if("culture"===t||"numberFormat"===t){var i=this._parse(this.element.val());return this.options[t]=e,this.element.val(this._format(i)),void 0}("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),this._super(t,e),"disabled"===t&&(e?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:e(function(t){this._super(t),this._value(this.element.val())}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:e(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:e(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:e(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:e(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?(e(this._value).call(this,t),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})}(jQuery),function(t,e){function i(){return++n}function s(t){return t=t.cloneNode(!1),t.hash.length>1&&decodeURIComponent(t.href.replace(o,""))===decodeURIComponent(location.href.replace(o,""))}var n=0,o=/#.*$/;t.widget("ui.tabs",{version:"1.10.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var i=this.options.active,s=this.options.collapsible,n=location.hash.substring(1);return null===i&&(n&&this.tabs.each(function(s,o){return t(o).attr("aria-controls")===n?(i=s,!1):e}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===i||-1===i)&&(i=this.tabs.length?0:!1)),i!==!1&&(i=this.tabs.index(this.tabs.eq(i)),-1===i&&(i=s?!1:0)),!s&&i===!1&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(i){var s=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(s),o=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:o=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(n),e;case t.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(n===this.options.active?!1:n),e;default:return}i.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,o),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):e},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,i){return"active"===t?(this._activate(i),e):"disabled"===t?(this._setupDisabled(i),e):(this._super(t,i),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(i),"heightStyle"===t&&this._setupHeightStyle(i),e)},_tabId:function(t){return t.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var o,a,r,h=t(n).uniqueId().attr("id"),l=t(n).closest("li"),c=l.attr("aria-controls");s(n)?(o=n.hash,a=e.element.find(e._sanitizeSelector(o))):(r=e._tabId(l),o="#"+r,a=e.element.find(o),a.length||(a=e._createPanel(r),a.insertAfter(e.panels[i-1]||e.tablist)),a.attr("aria-live","polite")),a.length&&(e.panels=e.panels.add(a)),c&&l.data("ui-tabs-aria-controls",c),l.attr({"aria-controls":o.substring(1),"aria-labelledby":h}),a.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,s=0;i=this.tabs[s];s++)e===!0||-1!==t.inArray(s,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={click:function(t){t.preventDefault()}};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n.closest("li"),a=o[0]===s[0],r=a&&i.collapsible,h=r?t():this._getPanelForTab(o),l=s.length?this._getPanelForTab(s):t(),c={oldTab:s,oldPanel:l,newTab:r?t():o,newPanel:h};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function s(){o.running=!1,o._trigger("activate",e,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,s):(a.show(),s())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===e?s=!1:(i=this._getIndex(i),s=t.isArray(s)?t.map(s,function(t){return t!==i?t:null}):t.map(this.tabs,function(t,e){return e!==i?e:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===e)s=!0;else{if(i=this._getIndex(i),-1!==t.inArray(i,s))return;s=t.isArray(s)?t.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(e,i){e=this._getIndex(e);var n=this,o=this.tabs.eq(e),a=o.find(".ui-tabs-anchor"),r=this._getPanelForTab(o),h={tab:o,panel:r};s(a[0])||(this.xhr=t.ajax(this._ajaxSettings(a,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(o.addClass("ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.success(function(t){setTimeout(function(){r.html(t),n._trigger("load",i,h)},1)}).complete(function(t,e){setTimeout(function(){"abort"===e&&n.panels.stop(!1,!0),o.removeClass("ui-tabs-loading"),r.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href"),beforeSend:function(e,o){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})}(jQuery),function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.4",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;
return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=o),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function o(t){l.of=t,a.is(":hidden")||a.position(l)}var a,r,h,l=t.extend({},this.options.position);if(n){if(a=this._find(s),a.length)return a.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),a=this._tooltip(s),e(s,a.attr("id")),a.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:o}),o(i)):a.position(t.extend({of:s},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){a.is(":visible")&&(o(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:a}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(a)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),o.stop(!0),this._hide(o,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:o}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})}(jQuery);  $(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });  /*!
 * jQuery Migrate - v1.0.0 - 2013-01-14
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function( jQuery, window, undefined ) {
"use strict";


var warnedAbout = {};

// List of warnings already given; public read only
jQuery.migrateWarnings = [];

// Set to true to prevent console output; migrateWarnings still maintained
// jQuery.migrateMute = false;

// Forget any warnings we've already given; public
jQuery.migrateReset = function() {
	warnedAbout = {};
	jQuery.migrateWarnings.length = 0;
};

function migrateWarn( msg) {
	if ( !warnedAbout[ msg ] ) {
		warnedAbout[ msg ] = true;
		jQuery.migrateWarnings.push( msg );
		if ( window.console && console.warn && !jQuery.migrateMute ) {
			console.warn( "JQMIGRATE: " + msg );
		}
	}
}

function migrateWarnProp( obj, prop, value, msg ) {
	if ( Object.defineProperty ) {
		// On ES5 browsers (non-oldIE), warn if the code tries to get prop;
		// allow property to be overwritten in case some other plugin wants it
		try {
			Object.defineProperty( obj, prop, {
				configurable: true,
				enumerable: true,
				get: function() {
					migrateWarn( msg );
					return value;
				},
				set: function( newValue ) {
					migrateWarn( msg );
					value = newValue;
				}
			});
			return;
		} catch( err ) {
			// IE8 is a dope about Object.defineProperty, can't warn there
		}
	}

	// Non-ES5 (or broken) browser; just set the property
	jQuery._definePropertyBroken = true;
	obj[ prop ] = value;
}

if ( document.compatMode === "BackCompat" ) {
	// jQuery has never supported or tested Quirks Mode
	migrateWarn( "jQuery is not compatible with Quirks Mode" );
}


var attrFn = {},
	attr = jQuery.attr,
	valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||
		function() { return null; },
	valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||
		function() { return undefined; },
	rnoType = /^(?:input|button)$/i,
	rnoAttrNodeType = /^[238]$/,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	ruseDefault = /^(?:checked|selected)$/i;

// jQuery.attrFn
migrateWarnProp( jQuery, "attrFn", attrFn, "jQuery.attrFn is deprecated" );

jQuery.attr = function( elem, name, value, pass ) {
	var lowerName = name.toLowerCase(),
		nType = elem && elem.nodeType;

	if ( pass ) {
		migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");
		if ( elem && !rnoAttrNodeType.test( nType ) && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}
	}

	// Warn if user tries to set `type` since it breaks on IE 6/7/8
	if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) ) {
		migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
	}

	// Restore boolHook for boolean property/attribute synchronization
	if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {
		jQuery.attrHooks[ lowerName ] = {
			get: function( elem, name ) {
				// Align boolean attributes with corresponding properties
				// Fall back to attribute presence where some booleans are not supported
				var attrNode,
					property = jQuery.prop( elem, name );
				return property === true || typeof property !== "boolean" &&
					( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?

					name.toLowerCase() :
					undefined;
			},
			set: function( elem, value, name ) {
				var propName;
				if ( value === false ) {
					// Remove boolean attributes when set to false
					jQuery.removeAttr( elem, name );
				} else {
					// value is true since we know at this point it's type boolean and not false
					// Set boolean attributes to the same name and set the DOM property
					propName = jQuery.propFix[ name ] || name;
					if ( propName in elem ) {
						// Only set the IDL specifically if it already exists on the element
						elem[ propName ] = true;
					}

					elem.setAttribute( name, name.toLowerCase() );
				}
				return name;
			}
		};

		// Warn only for attributes that can remain distinct from their properties post-1.9
		if ( ruseDefault.test( lowerName ) ) {
			migrateWarn( "jQuery.fn.attr(" + lowerName + ") may use property instead of attribute" );
		}
	}

	return attr.call( jQuery, elem, name, value );
};

// attrHooks: value
jQuery.attrHooks.value = {
	get: function( elem, name ) {
		var nodeName = ( elem.nodeName || "" ).toLowerCase();
		if ( nodeName === "button" ) {
			return valueAttrGet.apply( this, arguments );
		}
		if ( nodeName !== "input" && nodeName !== "option" ) {
			migrateWarn("property-based jQuery.fn.attr('value') is deprecated");
		}
		return name in elem ?
			elem.value :
			null;
	},
	set: function( elem, value ) {
		var nodeName = ( elem.nodeName || "" ).toLowerCase();
		if ( nodeName === "button" ) {
			return valueAttrSet.apply( this, arguments );
		}
		if ( nodeName !== "input" && nodeName !== "option" ) {
			migrateWarn("property-based jQuery.fn.attr('value', val) is deprecated");
		}
		// Does not return so that setAttribute is also used
		elem.value = value;
	}
};


var matched, browser,
	oldInit = jQuery.fn.init,
	// Note this does NOT include the # XSS fix from 1.7!
	rquickExpr = /^(?:.*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;

// $(html) "looks like html" rule change
jQuery.fn.init = function( selector, context, rootjQuery ) {
	var match;

	if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&
			(match = rquickExpr.exec( selector )) && match[1] ) {
		// This is an HTML string according to the "old" rules; is it still?
		if ( selector.charAt( 0 ) !== "<" ) {
			migrateWarn("$(html) HTML strings must start with '<' character");
		}
		// Now process using loose rules; let pre-1.8 play too
		if ( context && context.context ) {
			// jQuery object as context; parseHTML expects a DOM object
			context = context.context;
		}
		if ( jQuery.parseHTML ) {
			return oldInit.call( this, jQuery.parseHTML( jQuery.trim(selector), context, true ),
					context, rootjQuery );
		}
	}
	return oldInit.apply( this, arguments );
};
jQuery.fn.init.prototype = jQuery.fn;

jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

// Warn if the code tries to get jQuery.browser
migrateWarnProp( jQuery, "browser", browser, "jQuery.browser is deprecated" );

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	migrateWarn( "jQuery.sub() is deprecated" );
	return jQuerySub;
};


var oldFnData = jQuery.fn.data;

jQuery.fn.data = function( name ) {
	var ret, evt,
		elem = this[0];

	// Handles 1.7 which has this behavior and 1.8 which doesn't
	if ( elem && name === "events" && arguments.length === 1 ) {
		ret = jQuery.data( elem, name );
		evt = jQuery._data( elem, name );
		if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {
			migrateWarn("Use of jQuery.fn.data('events') is deprecated");
			return evt;
		}
	}
	return oldFnData.apply( this, arguments );
};


var rscriptType = /\/(java|ecma)script/i,
	oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack,
	oldFragment = jQuery.buildFragment;

jQuery.fn.andSelf = function() {
	migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
	return oldSelf.apply( this, arguments );
};

// Since jQuery.clean is used internally on older versions, we only shim if it's missing
if ( !jQuery.clean ) {
	jQuery.clean = function( elems, context, fragment, scripts ) {
		// Set context per 1.8 logic
		context = context || document;
		context = !context.nodeType && context[0] || context;
		context = context.ownerDocument || context;

		migrateWarn("jQuery.clean() is deprecated");

		var i, elem, handleScript, jsTags,
			ret = [];

		jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );

		// Complex logic lifted directly from jQuery 1.8
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	};
}

jQuery.buildFragment = function( elems, context, scripts, selection ) {
	var ret,
		warning = "jQuery.buildFragment() is deprecated";

	// Set context per 1.8 logic
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	try {
		ret = oldFragment.call( jQuery, elems, context, scripts, selection );

	// jQuery < 1.8 required arrayish context; jQuery 1.9 fails on it
	} catch( x ) {
		ret = oldFragment.call( jQuery, elems, context.nodeType ? [ context ] : context[ 0 ], scripts, selection );

		// Success from tweaking context means buildFragment was called by the user
		migrateWarn( warning );
	}

	// jQuery < 1.9 returned an object instead of the fragment itself
	if ( !ret.fragment ) {
		migrateWarnProp( ret, "fragment", ret, warning );
		migrateWarnProp( ret, "cacheable", false, warning );
	}

	return ret;
};

var eventAdd = jQuery.event.add,
	eventRemove = jQuery.event.remove,
	eventTrigger = jQuery.event.trigger,
	oldToggle = jQuery.fn.toggle,
	oldLive = jQuery.fn.live,
	oldDie = jQuery.fn.die,
	ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
	rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	hoverHack = function( events ) {
		if ( typeof( events ) != "string" || jQuery.event.special.hover ) {
			return events;
		}
		if ( rhoverHack.test( events ) ) {
			migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");
		}
		return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

// Event props removed in 1.9, put them back if needed; no practical way to warn them
if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {
	jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );
}

// Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7
migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );

// Support for 'hover' pseudo-event and ajax event warnings
jQuery.event.add = function( elem, types, handler, data, selector ){
	if ( elem !== document && rajaxEvent.test( types ) ) {
		migrateWarn( "AJAX events should be attached to document: " + types );
	}
	eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );
};
jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){
	eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );
};

jQuery.fn.error = function() {
	var args = Array.prototype.slice.call( arguments, 0);
	migrateWarn("jQuery.fn.error() is deprecated");
	args.splice( 0, 0, "error" );
	if ( arguments.length ) {
		return this.bind.apply( this, args );
	}
	// error event should not bubble to window, although it does pre-1.7
	this.triggerHandler.apply( this, args );
	return this;
};

jQuery.fn.toggle = function( fn, fn2 ) {

	// Don't mess with animation or css toggles
	if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
		return oldToggle.apply( this, arguments );
	}
	migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");

	// Save reference to arguments for access in closure
	var args = arguments,
		guid = fn.guid || jQuery.guid++,
		i = 0,
		toggler = function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		};

	// link all the functions, so any of them can unbind this click handler
	toggler.guid = guid;
	while ( i < args.length ) {
		args[ i++ ].guid = guid;
	}

	return this.click( toggler );
};

jQuery.fn.live = function( types, data, fn ) {
	migrateWarn("jQuery.fn.live() is deprecated");
	if ( oldLive ) {
		return oldLive.apply( this, arguments );
	}
	jQuery( this.context ).on( types, this.selector, data, fn );
	return this;
};

jQuery.fn.die = function( types, fn ) {
	migrateWarn("jQuery.fn.die() is deprecated");
	if ( oldDie ) {
		return oldDie.apply( this, arguments );
	}
	jQuery( this.context ).off( types, this.selector || "**", fn );
	return this;
};

// Turn global events into document-triggered events
jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){
	if ( !elem & !rajaxEvent.test( event ) ) {
		migrateWarn( "Global events are undocumented and deprecated" );
	}
	return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );
};
jQuery.each( ajaxEvents.split("|"),
	function( _, name ) {
		jQuery.event.special[ name ] = {
			setup: function() {
				var elem = this;

				// The document needs no shimming; must be !== for oldIE
				if ( elem !== document ) {
					jQuery.event.add( document, name + "." + jQuery.guid, function() {
						jQuery.event.trigger( name, null, elem, true );
					});
					jQuery._data( this, name, jQuery.guid++ );
				}
				return false;
			},
			teardown: function() {
				if ( this !== document ) {
					jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );
				}
				return false;
			}
		};
	}
);


})( jQuery, window );
/*! jQuery Mobile vGit Build: SHA1: b49cc06499abf8f987cf90f35349cfac0918c939 <> Date: Tue Oct 2 11:22:34 2012 -0700 jquerymobile.com | jquery.org/license !*/
(function(a,b,c){typeof define=="function"&&define.amd?define(["jquery"],function(d){return c(d,a,b),d.mobile}):c(a.jQuery,a,b)})(this,document,function(a,b,c,d){(function(a,b,d){var e={};a.mobile=a.extend({},{version:"1.2.0",ns:"",subPageUrlKey:"ui-page",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:250,touchOverflowEnabled:!1,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"e",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,orientationChangeEnabled:!0,buttonMarkup:{hoverDelay:200},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},silentScroll:function(d){a.type(d)!=="number"&&(d=a.mobile.defaultHomeScroll),a.event.special.scrollstart.enabled=!1,setTimeout(function(){b.scrollTo(0,d),a(c).trigger("silentscroll",{x:0,y:d})},20),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},nsNormalizeDict:e,nsNormalize:function(b){if(!b)return;return e[b]||(e[b]=a.camelCase(a.mobile.ns+b))},getInheritedTheme:function(a,b){var c=a[0],d="",e=/ui-(bar|body|overlay)-([a-z])\b/,f,g;while(c){f=c.className||"";if(f&&(g=e.exec(f))&&(d=g[2]))break;c=c.parentNode}return d||b||"a"},closestPageData:function(a){return a.closest(':jqmData(role="page"), :jqmData(role="dialog")').data("page")},enhanceable:function(a){return this.haveParents(a,"enhance")},hijackable:function(a){return this.haveParents(a,"ajax")},haveParents:function(b,c){if(!a.mobile.ignoreContentEnabled)return b;var d=b.length,e=a(),f,g,h;for(var i=0;i<d;i++){g=b.eq(i),h=!1,f=b[i];while(f){var j=f.getAttribute?f.getAttribute("data-"+a.mobile.ns+c):"";if(j==="false"){h=!0;break}f=f.parentNode}h||(e=e.add(g))}return e},getScreenHeight:function(){return b.innerHeight||a(b).height()}},a.mobile),a.fn.jqmData=function(b,c){var e;return typeof b!="undefined"&&(b&&(b=a.mobile.nsNormalize(b)),arguments.length<2||c===d?e=this.data(b):e=this.data(b,c)),e},a.jqmData=function(b,c,d){var e;return typeof c!="undefined"&&(e=a.data(b,c?a.mobile.nsNormalize(c):c,d)),e},a.fn.jqmRemoveData=function(b){return this.removeData(a.mobile.nsNormalize(b))},a.jqmRemoveData=function(b,c){return a.removeData(b,a.mobile.nsNormalize(c))},a.fn.removeWithDependents=function(){a.removeWithDependents(this)},a.removeWithDependents=function(b){var c=a(b);(c.jqmData("dependents")||a()).remove(),c.remove()},a.fn.addDependents=function(b){a.addDependents(a(this),b)},a.addDependents=function(b,c){var d=a(b).jqmData("dependents")||a();a(b).jqmData("dependents",a.merge(d,c))},a.fn.getEncodedText=function(){return a("<div/>").text(a(this).text()).html()},a.fn.jqmEnhanceable=function(){return a.mobile.enhanceable(this)},a.fn.jqmHijackable=function(){return a.mobile.hijackable(this)};var f=a.find,g=/:jqmData\(([^)]*)\)/g;a.find=function(b,c,d,e){return b=b.replace(g,"[data-"+(a.mobile.ns||"")+"$1]"),f.call(this,b,c,d,e)},a.extend(a.find,f),a.find.matches=function(b,c){return a.find(b,null,null,c)},a.find.matchesSelector=function(b,c){return a.find(c,null,null,[b]).length>0}})(a,this),function(a,b){var c=0,d=Array.prototype.slice,e=a.cleanData;a.cleanData=function(b){for(var c=0,d;(d=b[c])!=null;c++)try{a(d).triggerHandler("remove")}catch(f){}e(b)},a.widget=function(b,c,d){var e,f,g,h,i=b.split(".")[0];b=b.split(".")[1],e=i+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e]=function(b){return!!a.data(b,e)},a[i]=a[i]||{},f=a[i][b],g=a[i][b]=function(a,b){if(!this._createWidget)return new g(a,b);arguments.length&&this._createWidget(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,e){a.isFunction(e)&&(d[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},d=function(a){return c.prototype[b].apply(this,a)};return function(){var b=this._super,c=this._superApply,f;return this._super=a,this._superApply=d,f=e.apply(this,arguments),this._super=b,this._superApply=c,f}}())}),g.prototype=a.widget.extend(h,{widgetEventPrefix:b},d,{constructor:g,namespace:i,widgetName:b,widgetBaseClass:e,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g)},a.widget.extend=function(c){var e=d.call(arguments,1),f=0,g=e.length,h,i;for(;f<g;f++)for(h in e[f])i=e[f][h],e[f].hasOwnProperty(h)&&i!==b&&(c[h]=a.isPlainObject(i)?a.widget.extend({},c[h],i):i);return c},a.widget.bridge=function(c,e){var f=e.prototype.widgetFullName;a.fn[c]=function(g){var h=typeof g=="string",i=d.call(arguments,1),j=this;return g=!h&&i.length?a.widget.extend.apply(null,[g].concat(i)):g,h?this.each(function(){var d,e=a.data(this,f);if(!e)return a.error("cannot call methods on "+c+" prior to initialization; "+"attempted to call method '"+g+"'");if(!a.isFunction(e[g])||g.charAt(0)==="_")return a.error("no such method '"+g+"' for "+c+" widget instance");d=e[g].apply(e,i);if(d!==e&&d!==b)return j=d&&d.jquery?j.pushStack(d.get()):d,!1}):this.each(function(){var b=a.data(this,f);b?b.option(g||{})._init():new e(g,this)}),j}},a.Widget=function(a,b){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(b,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=a.widget.extend({},this.options,this._getCreateOptions(),b),this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetName,this),a.data(d,this.widgetFullName,this),this._on({remove:"destroy"}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(c,d){var e=c,f,g,h;if(arguments.length===0)return a.widget.extend({},this.options);if(typeof c=="string"){e={},f=c.split("."),c=f.shift();if(f.length){g=e[c]=a.widget.extend({},this.options[c]);for(h=0;h<f.length-1;h++)g[f[h]]=g[f[h]]||{},g=g[f[h]];c=f.pop();if(d===b)return g[c]===b?null:g[c];g[c]=d}else{if(d===b)return this.options[c]===b?null:this.options[c];e[c]=d}}return this._setOptions(e),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(b,c){c?(b=a(b),this.bindings=this.bindings.add(b)):(c=b,b=this.element);var d=this;a.each(c,function(c,e){function f(){if(d.options.disabled===!0||a(this).hasClass("ui-state-disabled"))return;return(typeof e=="string"?d[e]:e).apply(d,arguments)}typeof e!="string"&&(f.guid=e.guid=e.guid||f.guid||a.guid++);var g=c.match(/^(\w+)\s*(.*)$/),h=g[1]+d.eventNamespace,i=g[2];i?d.widget().delegate(i,h,f):b.bind(h,f)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return(typeof a=="string"?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){typeof e=="string"&&(e={effect:e});var g,h=e?e===!0||typeof e=="number"?c:e.effect||c:b;e=e||{},typeof e=="number"&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&(a.effects.effect[h]||a.uiBackCompat!==!1&&a.effects[h])?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}}),a.uiBackCompat!==!1&&(a.Widget.prototype._getCreateOptions=function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]})}(a),function(a,b){a.widget("mobile.widget",{_createWidget:function(){a.Widget.prototype._createWidget.apply(this,arguments),this._trigger("init")},_getCreateOptions:function(){var c=this.element,d={};return a.each(this.options,function(a){var e=c.jqmData(a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}));e!==b&&(d[a]=e)}),d},enhanceWithin:function(b,c){this.enhance(a(this.options.initSelector,a(b)),c)},enhance:function(b,c){var d,e,f=a(b),g=this;f=a.mobile.enhanceable(f),c&&f.length&&(d=a.mobile.closestPageData(f),e=d&&d.keepNativeSelector()||"",f=f.not(e)),f[this.widgetName]()},raise:function(a){throw"Widget ["+this.widgetName+"]: "+a}})}(a),function(a,b){a.extend(a.mobile,{loadingMessageTextVisible:d,loadingMessageTheme:d,loadingMessage:d,showPageLoadingMsg:function(b,c,d){a.mobile.loading("show",b,c,d)},hidePageLoadingMsg:function(){a.mobile.loading("hide")},loading:function(){this.loaderWidget.loader.apply(this.loaderWidget,arguments)}});var c="ui-loader",e=a("html"),f=a(b);a.widget("mobile.loader",{options:{theme:"a",textVisible:!1,html:"",text:"loading"},defaultHtml:"<div class='"+c+"'>"+"<span class='ui-icon ui-icon-loading'></span>"+"<h1></h1>"+"</div>",fakeFixLoader:function(){var b=a("."+a.mobile.activeBtnClass).first();this.element.css({top:a.support.scrollTop&&f.scrollTop()+f.height()/2||b.length&&b.offset().top||100})},checkLoaderPosition:function(){var b=this.element.offset(),c=f.scrollTop(),d=a.mobile.getScreenHeight();if(b.top<c||b.top-c>d)this.element.addClass("ui-loader-fakefix"),this.fakeFixLoader(),f.unbind("scroll",this.checkLoaderPosition).bind("scroll",this.fakeFixLoader)},resetHtml:function(){this.element.html(a(this.defaultHtml).html())},show:function(b,g,h){var i,j,k,l;this.resetHtml(),a.type(b)==="object"?(l=a.extend({},this.options,b),b=l.theme||a.mobile.loadingMessageTheme):(l=this.options,b=b||a.mobile.loadingMessageTheme||l.theme),j=g||a.mobile.loadingMessage||l.text,e.addClass("ui-loading");if(a.mobile.loadingMessage!==!1||l.html)a.mobile.loadingMessageTextVisible!==d?i=a.mobile.loadingMessageTextVisible:i=l.textVisible,this.element.attr("class",c+" ui-corner-all ui-body-"+b+" ui-loader-"+(i||g||b.text?"verbose":"default")+(l.textonly||h?" ui-loader-textonly":"")),l.html?this.element.html(l.html):this.element.find("h1").text(j),this.element.appendTo(a.mobile.pageContainer),this.checkLoaderPosition(),f.bind("scroll",a.proxy(this.checkLoaderPosition,this))},hide:function(){e.removeClass("ui-loading"),a.mobile.loadingMessage&&this.element.removeClass("ui-loader-fakefix"),a(b).unbind("scroll",a.proxy(this.fakeFixLoader,this)),a(b).unbind("scroll",a.proxy(this.checkLoaderPosition,this))}}),f.bind("pagecontainercreate",function(){a.mobile.loaderWidget=a.mobile.loaderWidget||a(a.mobile.loader.prototype.defaultHtml).loader()})}(a,this),function(a,b,c,d){function x(a){while(a&&typeof a.originalEvent!="undefined")a=a.originalEvent;return a}function y(b,c){var e=b.type,f,g,i,k,l,m,n,o,p;b=a.Event(b),b.type=c,f=b.originalEvent,g=a.event.props,e.search(/^(mouse|click)/)>-1&&(g=j);if(f)for(n=g.length,k;n;)k=g[--n],b[k]=f[k];e.search(/mouse(down|up)|click/)>-1&&!b.which&&(b.which=1);if(e.search(/^touch/)!==-1){i=x(f),e=i.touches,l=i.changedTouches,m=e&&e.length?e[0]:l&&l.length?l[0]:d;if(m)for(o=0,p=h.length;o<p;o++)k=h[o],b[k]=m[k]}return b}function z(b){var c={},d,f;while(b){d=a.data(b,e);for(f in d)d[f]&&(c[f]=c.hasVirtualBinding=!0);b=b.parentNode}return c}function A(b,c){var d;while(b){d=a.data(b,e);if(d&&(!c||d[c]))return b;b=b.parentNode}return null}function B(){r=!1}function C(){r=!0}function D(){v=0,p.length=0,q=!1,C()}function E(){B()}function F(){G(),l=setTimeout(function(){l=0,D()},a.vmouse.resetTimerDuration)}function G(){l&&(clearTimeout(l),l=0)}function H(b,c,d){var e;if(d&&d[b]||!d&&A(c.target,b))e=y(c,b),a(c.target).trigger(e);return e}function I(b){var c=a.data(b.target,f);if(!q&&(!v||v!==c)){var d=H("v"+b.type,b);d&&(d.isDefaultPrevented()&&b.preventDefault(),d.isPropagationStopped()&&b.stopPropagation(),d.isImmediatePropagationStopped()&&b.stopImmediatePropagation())}}function J(b){var c=x(b).touches,d,e;if(c&&c.length===1){d=b.target,e=z(d);if(e.hasVirtualBinding){v=u++,a.data(d,f,v),G(),E(),o=!1;var g=x(b).touches[0];m=g.pageX,n=g.pageY,H("vmouseover",b,e),H("vmousedown",b,e)}}}function K(a){if(r)return;o||H("vmousecancel",a,z(a.target)),o=!0,F()}function L(b){if(r)return;var c=x(b).touches[0],d=o,e=a.vmouse.moveDistanceThreshold,f=z(b.target);o=o||Math.abs(c.pageX-m)>e||Math.abs(c.pageY-n)>e,o&&!d&&H("vmousecancel",b,f),H("vmousemove",b,f),F()}function M(a){if(r)return;C();var b=z(a.target),c;H("vmouseup",a,b);if(!o){var d=H("vclick",a,b);d&&d.isDefaultPrevented()&&(c=x(a).changedTouches[0],p.push({touchID:v,x:c.clientX,y:c.clientY}),q=!0)}H("vmouseout",a,b),o=!1,F()}function N(b){var c=a.data(b,e),d;if(c)for(d in c)if(c[d])return!0;return!1}function O(){}function P(b){var c=b.substr(1);return{setup:function(d,f){N(this)||a.data(this,e,{});var g=a.data(this,e);g[b]=!0,k[b]=(k[b]||0)+1,k[b]===1&&t.bind(c,I),a(this).bind(c,O),s&&(k.touchstart=(k.touchstart||0)+1,k.touchstart===1&&t.bind("touchstart",J).bind("touchend",M).bind("touchmove",L).bind("scroll",K))},teardown:function(d,f){--k[b],k[b]||t.unbind(c,I),s&&(--k.touchstart,k.touchstart||t.unbind("touchstart",J).unbind("touchmove",L).unbind("touchend",M).unbind("scroll",K));var g=a(this),h=a.data(this,e);h&&(h[b]=!1),g.unbind(c,O),N(this)||g.removeData(e)}}}var e="virtualMouseBindings",f="virtualTouchID",g="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),h="clientX clientY pageX pageY screenX screenY".split(" "),i=a.event.mouseHooks?a.event.mouseHooks.props:[],j=a.event.props.concat(i),k={},l=0,m=0,n=0,o=!1,p=[],q=!1,r=!1,s="addEventListener"in c,t=a(c),u=1,v=0,w;a.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var Q=0;Q<g.length;Q++)a.event.special[g[Q]]=P(g[Q]);s&&c.addEventListener("click",function(b){var c=p.length,d=b.target,e,g,h,i,j,k;if(c){e=b.clientX,g=b.clientY,w=a.vmouse.clickDistanceThreshold,h=d;while(h){for(i=0;i<c;i++){j=p[i],k=0;if(h===d&&Math.abs(j.x-e)<w&&Math.abs(j.y-g)<w||a.data(h,f)===j.touchID){b.preventDefault(),b.stopPropagation();return}}h=h.parentNode}}},!0)}(a,b,c),function(a,b){var d={touch:"ontouchend"in c};a.mobile=a.mobile||{},a.mobile.support=a.mobile.support||{},a.extend(a.support,d),a.extend(a.mobile.support,d)}(a),function(a,b,d){function j(b,c,d){var e=d.type;d.type=c,a.event.handle.call(b,d),d.type=e}a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(b,c){a.fn[c]=function(a){return a?this.bind(c,a):this.trigger(c)},a.attrFn&&(a.attrFn[c]=!0)});var e=a.mobile.support.touch,f="touchmove scroll",g=e?"touchstart":"mousedown",h=e?"touchend":"mouseup",i=e?"touchmove":"mousemove";a.event.special.scrollstart={enabled:!0,setup:function(){function g(a,c){d=c,j(b,d?"scrollstart":"scrollstop",a)}var b=this,c=a(b),d,e;c.bind(f,function(b){if(!a.event.special.scrollstart.enabled)return;d||g(b,!0),clearTimeout(e),e=setTimeout(function(){g(b,!1)},50)})}},a.event.special.tap={tapholdThreshold:750,setup:function(){var b=this,d=a(b);d.bind("vmousedown",function(e){function i(){clearTimeout(h)}function k(){i(),d.unbind("vclick",l).unbind("vmouseup",i),a(c).unbind("vmousecancel",k)}function l(a){k(),f===a.target&&j(b,"tap",a)}if(e.which&&e.which!==1)return!1;var f=e.target,g=e.originalEvent,h;d.bind("vmouseup",i).bind("vclick",l),a(c).bind("vmousecancel",k),h=setTimeout(function(){j(b,"taphold",a.Event("taphold",{target:f}))},a.event.special.tap.tapholdThreshold)})}},a.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var b=this,c=a(b);c.bind(g,function(b){function j(b){if(!f)return;var c=b.originalEvent.touches?b.originalEvent.touches[0]:b;g={time:(new Date).getTime(),coords:[c.pageX,c.pageY]},Math.abs(f.coords[0]-g.coords[0])>a.event.special.swipe.scrollSupressionThreshold&&b.preventDefault()}var e=b.originalEvent.touches?b.originalEvent.touches[0]:b,f={time:(new Date).getTime(),coords:[e.pageX,e.pageY],origin:a(b.target)},g;c.bind(i,j).one(h,function(b){c.unbind(i,j),f&&g&&g.time-f.time<a.event.special.swipe.durationThreshold&&Math.abs(f.coords[0]-g.coords[0])>a.event.special.swipe.horizontalDistanceThreshold&&Math.abs(f.coords[1]-g.coords[1])<a.event.special.swipe.verticalDistanceThreshold&&f.origin.trigger("swipe").trigger(f.coords[0]>g.coords[0]?"swipeleft":"swiperight"),f=g=d})})}},a.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(b,c){a.event.special[b]={setup:function(){a(this).bind(c,a.noop)}}})}(a,this),function(a,c){a.extend(a.support,{orientation:"orientation"in b&&"onorientationchange"in b})}(a),function(a){a.event.special.throttledresize={setup:function(){a(this).bind("resize",c)},teardown:function(){a(this).unbind("resize",c)}};var b=250,c=function(){f=(new Date).getTime(),g=f-d,g>=b?(d=f,a(this).trigger("throttledresize")):(e&&clearTimeout(e),e=setTimeout(c,b-g))},d=0,e,f,g}(a),function(a,b){function o(){var a=g();a!==h&&(h=a,d.trigger(e))}var d=a(b),e="orientationchange",f,g,h,i,j,k={0:!0,180:!0};if(a.support.orientation){var l=b.innerWidth||a(b).width(),m=b.innerHeight||a(b).height(),n=50;i=l>m&&l-m>n,j=k[b.orientation];if(i&&j||!i&&!j)k={"-90":!0,90:!0}}a.event.special.orientationchange=a.extend({},a.event.special.orientationchange,{setup:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;h=g(),d.bind("throttledresize",o)},teardown:function(){if(a.support.orientation&&!a.event.special.orientationchange.disabled)return!1;d.unbind("throttledresize",o)},add:function(a){var b=a.handler;a.handler=function(a){return a.orientation=g(),b.apply(this,arguments)}}}),a.event.special.orientationchange.orientation=g=function(){var d=!0,e=c.documentElement;return a.support.orientation?d=k[b.orientation]:d=e&&e.clientWidth/e.clientHeight<1.1,d?"portrait":"landscape"},a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)},a.attrFn&&(a.attrFn[e]=!0)}(a,this),function(a,d){var e=a(b),f=a("html");a.mobile.media=function(){var b={},d=a("<div id='jquery-mediatest'></div>"),e=a("<body>").append(d);return function(a){if(!(a in b)){var g=c.createElement("style"),h="@media "+a+" { #jquery-mediatest { position:absolute; } }";g.type="text/css",g.styleSheet?g.styleSheet.cssText=h:g.appendChild(c.createTextNode(h)),f.prepend(e).prepend(g),b[a]=d.css("position")==="absolute",e.add(g).remove()}return b[a]}}()}(a),function(a,d){function e(a){var b=a.charAt(0).toUpperCase()+a.substr(1),c=(a+" "+h.join(b+" ")+b).split(" ");for(var e in c)if(g[c[e]]!==d)return!0}function m(a,b,d){var e=c.createElement("div"),f=function(a){return a.charAt(0).toUpperCase()+a.substr(1)},g=function(a){return"-"+a.charAt(0).toLowerCase()+a.substr(1)+"-"},i=function(c){var d=g(c)+a+": "+b+";",h=f(c),i=h+f(a);e.setAttribute("style",d),!e.style[i]||(k=!0)},j=d?[d]:h,k;for(var l=0;l<j.length;l++)i(j[l]);return!!k}function n(){var b="transform-3d";return m("perspective","10px","moz")||a.mobile.media("(-"+h.join("-"+b+"),(-")+"-"+b+"),("+b+")")}function o(){var b=location.protocol+"//"+location.host+location.pathname+"ui-dir/",c=a("head base"),d=null,e="",g,h;return c.length?e=c.attr("href"):c=d=a("<base>",{href:b}).appendTo("head"),g=a("<a href='testurl' />").prependTo(f),h=g[0].href,c[0].href=e||location.pathname,d&&d.remove(),h.indexOf(b)===0}function p(){var a=c.createElement("x"),d=c.documentElement,e=b.getComputedStyle,f;return"pointerEvents"in a.style?(a.style.pointerEvents="auto",a.style.pointerEvents="x",d.appendChild(a),f=e&&e(a,"").pointerEvents==="auto",d.removeChild(a),!!f):!1}function q(){var a=c.createElement("div");return typeof a.getBoundingClientRect!="undefined"}var f=a("<body>").prependTo("html"),g=f[0].style,h=["Webkit","Moz","O"],i="palmGetResource"in b,j=b.opera,k=b.operamini&&{}.toString.call(b.operamini)==="[object OperaMini]",l=b.blackberry&&!e("-webkit-transform");a.extend(a.mobile,{browser:{}}),a.mobile.browser.ie=function(){var a=3,b=c.createElement("div"),d=b.all||[];do b.innerHTML="<!--[if gt IE "+ ++a+"]><br><![endif]-->";while(d[0]);return a>4?a:!a}(),a.extend(a.support,{cssTransitions:"WebKitTransitionEvent"in b||m("transition","height 100ms linear")&&!j,pushState:"pushState"in history&&"replaceState"in history,mediaquery:a.mobile.media("only all"),cssPseudoElement:!!e("content"),touchOverflow:!!e("overflowScrolling"),cssTransform3d:n(),boxShadow:!!e("boxShadow")&&!l,scrollTop:("pageXOffset"in b||"scrollTop"in c.documentElement||"scrollTop"in f[0])&&!i&&!k,dynamicBaseTag:o(),cssPointerEvents:p(),boundingRect:q()}),f.remove();var r=function(){var a=b.navigator.userAgent;return a.indexOf("Nokia")>-1&&(a.indexOf("Symbian/3")>-1||a.indexOf("Series60/5")>-1)&&a.indexOf("AppleWebKit")>-1&&a.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}();a.mobile.gradeA=function(){return(a.support.mediaquery||a.mobile.browser.ie&&a.mobile.browser.ie>=7)&&(a.support.boundingRect||a.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/)!==null)},a.mobile.ajaxBlacklist=b.blackberry&&!b.WebKitPoint||k||r,r&&a(function(){a("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),a.support.boxShadow||a("html").addClass("ui-mobile-nosupport-boxshadow")}(a),function(a,b){a.widget("mobile.page",a.mobile.widget,{options:{theme:"c",domCache:!1,keepNativeDefault:":jqmData(role='none'), :jqmData(role='nojs')"},_create:function(){var a=this;if(a._trigger("beforecreate")===!1)return!1;a.element.attr("tabindex","0").addClass("ui-page ui-body-"+a.options.theme).bind("pagebeforehide",function(){a.removeContainerBackground()}).bind("pagebeforeshow",function(){a.setContainerBackground()})},removeContainerBackground:function(){a.mobile.pageContainer.removeClass("ui-overlay-"+a.mobile.getInheritedTheme(this.element.parent()))},setContainerBackground:function(b){this.options.theme&&a.mobile.pageContainer.addClass("ui-overlay-"+(b||this.options.theme))},keepNativeSelector:function(){var b=this.options,c=b.keepNative&&a.trim(b.keepNative);return c&&b.keepNative!==b.keepNativeDefault?[b.keepNative,b.keepNativeDefault].join(", "):b.keepNativeDefault}})}(a),function(a,b,d){function k(a){return a=a||location.href,"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}var e="hashchange",f=c,g,h=a.event.special,i=f.documentMode,j="on"+e in b&&(i===d||i>7);a.fn[e]=function(a){return a?this.bind(e,a):this.trigger(e)},a.fn[e].delay=50,h[e]=a.extend(h[e],{setup:function(){if(j)return!1;a(g.start)},teardown:function(){if(j)return!1;a(g.stop)}}),g=function(){function n(){var c=k(),d=m(h);c!==h?(l(h=c,d),a(b).trigger(e)):d!==h&&(location.href=location.href.replace(/#.*/,"")+d),g=setTimeout(n,a.fn[e].delay)}var c={},g,h=k(),i=function(a){return a},l=i,m=i;return c.start=function(){g||n()},c.stop=function(){g&&clearTimeout(g),g=d},a.browser.msie&&!j&&function(){var b,d;c.start=function(){b||(d=a.fn[e].src,d=d&&d+k(),b=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){d||l(k()),n()}).attr("src",d||"javascript:0").insertAfter("body")[0].contentWindow,f.onpropertychange=function(){try{event.propertyName==="title"&&(b.document.title=f.title)}catch(a){}})},c.stop=i,m=function(){return k(b.location.href)},l=function(c,d){var g=b.document,h=a.fn[e].domain;c!==d&&(g.title=f.title,g.open(),h&&g.write('<script>document.domain="'+h+'"</script>'),g.close(),b.location.hash=c)}}(),c}()}(a,this),function(a,b,c){var d=function(d){return d===c&&(d=!0),function(c,e,f,g){var h=new a.Deferred,i=e?" reverse":"",j=a.mobile.urlHistory.getActive(),k=j.lastScroll||a.mobile.defaultHomeScroll,l=a.mobile.getScreenHeight(),m=a.mobile.maxTransitionWidth!==!1&&a(b).width()>a.mobile.maxTransitionWidth,n=!a.support.cssTransitions||m||!c||c==="none"||Math.max(a(b).scrollTop(),k)>a.mobile.getMaxScrollForTransition(),o=" ui-page-pre-in",p=function(){a.mobile.pageContainer.toggleClass("ui-mobile-viewport-transitioning viewport-"+c)},q=function(){a.event.special.scrollstart.enabled=!1,b.scrollTo(0,k),setTimeout(function(){a.event.special.scrollstart.enabled=!0},150)},r=function(){g.removeClass(a.mobile.activePageClass+" out in reverse "+c).height("")},s=function(){d?g.animationComplete(t):t(),g.height(l+a(b).scrollTop()).addClass(c+" out"+i)},t=function(){g&&d&&r(),u()},u=function(){f.css("z-index",-10),f.addClass(a.mobile.activePageClass+o),a.mobile.focusPage(f),f.height(l+k),q(),f.css("z-index",""),n||f.animationComplete(v),f.removeClass(o).addClass(c+" in"+i),n&&v()},v=function(){d||g&&r(),f.removeClass("out in reverse "+c).height(""),p(),a(b).scrollTop()!==k&&q(),h.resolve(c,e,f,g,!0)};return p(),g&&!n?s():t(),h.promise()}},e=d(),f=d(!1),g=function(){return a.mobile.getScreenHeight()*3};a.mobile.defaultTransitionHandler=e,a.mobile.transitionHandlers={"default":a.mobile.defaultTransitionHandler,sequential:e,simultaneous:f},a.mobile.transitionFallbacks={},a.mobile._maybeDegradeTransition=function(b){return b&&!a.support.cssTransform3d&&a.mobile.transitionFallbacks[b]&&(b=a.mobile.transitionFallbacks[b]),b},a.mobile.getMaxScrollForTransition=a.mobile.getMaxScrollForTransition||g}(a,this),function(a,d){function u(b){!!i&&(!i.closest("."+a.mobile.activePageClass).length||b)&&i.removeClass(a.mobile.activeBtnClass),i=null}function v(){m=!1,l.length>0&&a.mobile.changePage.apply(null,l.pop())}function z(b,c,d,e){c&&c.data("page")._trigger("beforehide",null,{nextPage:b}),b.data("page")._trigger("beforeshow",null,{prevPage:c||a("")}),a.mobile.hidePageLoadingMsg(),d=a.mobile._maybeDegradeTransition(d);var f=a.mobile.transitionHandlers[d||"default"]||a.mobile.defaultTransitionHandler,g=f(d,e,b,c);return g.done(function(){c&&c.data("page")._trigger("hide",null,{nextPage:b}),b.data("page")._trigger("show",null,{prevPage:c||a("")})}),g}function A(){var b=a("."+a.mobile.activePageClass),c=parseFloat(b.css("padding-top")),d=parseFloat(b.css("padding-bottom")),e=parseFloat(b.css("border-top-width")),f=parseFloat(b.css("border-bottom-width"));b.css("min-height",s()-c-d-e-f)}function B(b,c){c&&b.attr("data-"+a.mobile.ns+"role",c),b.page()}function C(a){while(a){if(typeof a.nodeName=="string"&&a.nodeName.toLowerCase()==="a")break;a=a.parentNode}return a}function D(b){var c=a(b).closest(".ui-page").jqmData("url"),d=q.hrefNoHash;if(!c||!h.isPath(c))c=d;return h.makeUrlAbsolute(c,d)}var e=a(b),f=a("html"),g=a("head"),h={urlParseRE:/^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,getLocation:function(a){var b=a?this.parseUrl(a):location,c=this.parseUrl(a||location.href).hash;return c=c==="#"?"":c,b.protocol+"//"+b.host+b.pathname+b.search+c},parseLocation:function(){return this.parseUrl(this.getLocation())},parseUrl:function(b){if(a.type(b)==="object")return b;var c=h.urlParseRE.exec(b||"")||[];return{href:c[0]||"",hrefNoHash:c[1]||"",hrefNoSearch:c[2]||"",domain:c[3]||"",protocol:c[4]||"",doubleSlash:c[5]||"",authority:c[6]||"",username:c[8]||"",password:c[9]||"",host:c[10]||"",hostname:c[11]||"",port:c[12]||"",pathname:c[13]||"",directory:c[14]||"",filename:c[15]||"",search:c[16]||"",hash:c[17]||""}},makePathAbsolute:function(a,b){if(a&&a.charAt(0)==="/")return a;a=a||"",b=b?b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g,""):"";var c=b?b.split("/"):[],d=a.split("/");for(var e=0;e<d.length;e++){var f=d[e];switch(f){case".":break;case"..":c.length&&c.pop();break;default:c.push(f)}}return"/"+c.join("/")},isSameDomain:function(a,b){return h.parseUrl(a).domain===h.parseUrl(b).domain},isRelativeUrl:function(a){return h.parseUrl(a).protocol===""},isAbsoluteUrl:function(a){return h.parseUrl(a).protocol!==""},makeUrlAbsolute:function(a,b){if(!h.isRelativeUrl(a))return a;b===d&&(b=q);var c=h.parseUrl(a),e=h.parseUrl(b),f=c.protocol||e.protocol,g=c.protocol?c.doubleSlash:c.doubleSlash||e.doubleSlash,i=c.authority||e.authority,j=c.pathname!=="",k=h.makePathAbsolute(c.pathname||e.filename,e.pathname),l=c.search||!j&&e.search||"",m=c.hash;return f+g+i+k+l+m},addSearchParams:function(b,c){var d=h.parseUrl(b),e=typeof c=="object"?a.param(c):c,f=d.search||"?";return d.hrefNoSearch+f+(f.charAt(f.length-1)!=="?"?"&":"")+e+(d.hash||"")},convertUrlToDataUrl:function(a){var c=h.parseUrl(a);return h.isEmbeddedPage(c)?c.hash.split(n)[0].replace(/^#/,""):h.isSameDomain(c,q)?c.hrefNoHash.replace(q.domain,"").split(n)[0]:b.decodeURIComponent(a)},get:function(a){return a===d&&(a=h.parseLocation().hash),h.stripHash(a).replace(/[^\/]*\.[^\/*]+$/,"")},getFilePath:function(b){var c="&"+a.mobile.subPageUrlKey;return b&&b.split(c)[0].split(n)[0]},set:function(a){location.hash=a},isPath:function(a){return/\//.test(a)},clean:function(a){return a.replace(q.domain,"")},stripHash:function(a){return a.replace(/^#/,"")},cleanHash:function(a){return h.stripHash(a.replace(/\?.*$/,"").replace(n,""))},isHashValid:function(a){return/^#[^#]+$/.test(a)},isExternal:function(a){var b=h.parseUrl(a);return b.protocol&&b.domain!==p.domain?!0:!1},hasProtocol:function(a){return/^(:?\w+:)/.test(a)},isFirstPageUrl:function(b){var c=h.parseUrl(h.makeUrlAbsolute(b,q)),e=c.hrefNoHash===p.hrefNoHash||r&&c.hrefNoHash===q.hrefNoHash,f=a.mobile.firstPage,g=f&&f[0]?f[0].id:d;return e&&(!c.hash||c.hash==="#"||g&&c.hash.replace(/^#/,"")===g)},isEmbeddedPage:function(a){var b=h.parseUrl(a);return b.protocol!==""?b.hash&&(b.hrefNoHash===p.hrefNoHash||r&&b.hrefNoHash===q.hrefNoHash):/^#/.test(b.href)},isPermittedCrossDomainRequest:function(b,c){return a.mobile.allowCrossDomainPages&&b.protocol==="file:"&&c.search(/^https?:/)!==-1}},i=null,j={stack:[],activeIndex:0,getActive:function(){return j.stack[j.activeIndex]},getPrev:function(){return j.stack[j.activeIndex-1]},getNext:function(){return j.stack[j.activeIndex+1]},addNew:function(a,b,c,d,e){j.getNext()&&j.clearForward(),j.stack.push({url:a,transition:b,title:c,pageUrl:d,role:e}),j.activeIndex=j.stack.length-1},clearForward:function(){j.stack=j.stack.slice(0,j.activeIndex+1)},directHashChange:function(b){var c,e,f,g=this.getActive();a.each(j.stack,function(a,d){decodeURIComponent(b.currentUrl)===decodeURIComponent(d.url)&&(c=a<j.activeIndex,e=!c,f=a)}),this.activeIndex=f!==d?f:this.activeIndex,c?(b.either||b.isBack)(!0):e&&(b.either||b.isForward)(!1)},ignoreNextHashChange:!1},k="[tabindex],a,button:visible,select:visible,input",l=[],m=!1,n="&ui-state=dialog",o=g.children("base"),p=h.parseLocation(),q=o.length?h.parseUrl(h.makeUrlAbsolute(o.attr("href"),p.href)):p,r=p.hrefNoHash!==q.hrefNoHash,s=a.mobile.getScreenHeight,t=a.support.dynamicBaseTag?{element:o.length?o:a("<base>",{href:q.hrefNoHash}).prependTo(g),set:function(a){t.element.attr("href",h.makeUrlAbsolute(a,q))},reset:function(){t.element.attr("href",q.hrefNoHash)}}:d;a.mobile.back=function(){var a=b.navigator;this.phonegapNavigationEnabled&&a&&a.app&&a.app.backHistory?a.app.backHistory():b.history.back()},a.mobile.focusPage=function(a){var b=a.find("[autofocus]"),c=a.find(".ui-title:eq(0)");if(b.length){b.focus();return}c.length?c.focus():a.focus()};var w=!0,x,y;x=function(){if(!w)return;var b=a.mobile.urlHistory.getActive();if(b){var c=e.scrollTop();b.lastScroll=c<a.mobile.minScrollBack?a.mobile.defaultHomeScroll:c}},y=function(){setTimeout(x,100)},e.bind(a.support.pushState?"popstate":"hashchange",function(){w=!1}),e.one(a.support.pushState?"popstate":"hashchange",function(){w=!0}),e.one("pagecontainercreate",function(){a.mobile.pageContainer.bind("pagechange",function(){w=!0,e.unbind("scrollstop",y),e.bind("scrollstop",y)})}),e.bind("scrollstop",y),a.mobile._maybeDegradeTransition=a.mobile._maybeDegradeTransition||function(a){return a},a.fn.animationComplete=function(b){return a.support.cssTransitions?a(this).one("webkitAnimationEnd animationend",b):(setTimeout(b,0),a(this))},a.mobile.path=h,a.mobile.base=t,a.mobile.urlHistory=j,a.mobile.dialogHashKey=n,a.mobile.allowCrossDomainPages=!1,a.mobile.getDocumentUrl=function(b){return b?a.extend({},p):p.href},a.mobile.getDocumentBase=function(b){return b?a.extend({},q):q.href},a.mobile._bindPageRemove=function(){var b=a(this);!b.data("page").options.domCache&&b.is(":jqmData(external-page='true')")&&b.bind("pagehide.remove",function(){var b=a(this),c=new a.Event("pageremove");b.trigger(c),c.isDefaultPrevented()||b.removeWithDependents()})},a.mobile.loadPage=function(b,c){var e=a.Deferred(),f=a.extend({},a.mobile.loadPage.defaults,c),g=null,i=null,j=function(){var b=a.mobile.activePage&&D(a.mobile.activePage);return b||q.hrefNoHash},k=h.makeUrlAbsolute(b,j());f.data&&f.type==="get"&&(k=h.addSearchParams(k,f.data),f.data=d),f.data&&f.type==="post"&&(f.reloadPage=!0);var l=h.getFilePath(k),m=h.convertUrlToDataUrl(k);f.pageContainer=f.pageContainer||a.mobile.pageContainer,g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+m+"']"),g.length===0&&m&&!h.isPath(m)&&(g=f.pageContainer.children("#"+m).attr("data-"+a.mobile.ns+"url",m).jqmData("url",m));if(g.length===0)if(a.mobile.firstPage&&h.isFirstPageUrl(l))a.mobile.firstPage.parent().length&&(g=a(a.mobile.firstPage));else if(h.isEmbeddedPage(l))return e.reject(k,c),e.promise();if(g.length){if(!f.reloadPage)return B(g,f.role),e.resolve(k,c,g),e.promise();i=g}var n=f.pageContainer,o=new a.Event("pagebeforeload"),r={url:b,absUrl:k,dataUrl:m,deferred:e,options:f};n.trigger(o,r);if(o.isDefaultPrevented())return e.promise();if(f.showLoadMsg)var s=setTimeout(function(){a.mobile.showPageLoadingMsg()},f.loadMsgDelay),u=function(){clearTimeout(s),a.mobile.hidePageLoadingMsg()};return t&&t.reset(),!a.mobile.allowCrossDomainPages&&!h.isSameDomain(p,k)?e.reject(k,c):a.ajax({url:l,type:f.type,data:f.data,dataType:"html",success:function(d,j,n){var o=a("<div></div>"),p=d.match(/<title[^>]*>([^<]*)/)&&RegExp.$1,q=new RegExp("(<[^>]+\\bdata-"+a.mobile.ns+"role=[\"']?page[\"']?[^>]*>)"),s=new RegExp("\\bdata-"+a.mobile.ns+"url=[\"']?([^\"'>]*)[\"']?");q.test(d)&&RegExp.$1&&s.test(RegExp.$1)&&RegExp.$1&&(b=l=h.getFilePath(a("<div>"+RegExp.$1+"</div>").text())),t&&t.set(l),o.get(0).innerHTML=d,g=o.find(":jqmData(role='page'), :jqmData(role='dialog')").first(),g.length||(g=a("<div data-"+a.mobile.ns+"role='page'>"+d.split(/<\/?body[^>]*>/gmi)[1]+"</div>")),p&&!g.jqmData("title")&&(~p.indexOf("&")&&(p=a("<div>"+p+"</div>").text()),g.jqmData("title",p));if(!a.support.dynamicBaseTag){var v=h.get(l);g.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function(){var b=a(this).is("[href]")?"href":a(this).is("[src]")?"src":"action",c=a(this).attr(b);c=c.replace(location.protocol+"//"+location.host+location.pathname,""),/^(\w+:|#|\/)/.test(c)||a(this).attr(b,v+c)})}g.attr("data-"+a.mobile.ns+"url",h.convertUrlToDataUrl(l)).attr("data-"+a.mobile.ns+"external-page",!0).appendTo(f.pageContainer),g.one("pagecreate",a.mobile._bindPageRemove),B(g,f.role),k.indexOf("&"+a.mobile.subPageUrlKey)>-1&&(g=f.pageContainer.children("[data-"+a.mobile.ns+"url='"+m+"']")),f.showLoadMsg&&u(),r.xhr=n,r.textStatus=j,r.page=g,f.pageContainer.trigger("pageload",r),e.resolve(k,c,g,i)},error:function(b,d,g){t&&t.set(h.get()),r.xhr=b,r.textStatus=d,r.errorThrown=g;var i=new a.Event("pageloadfailed");f.pageContainer.trigger(i,r);if(i.isDefaultPrevented())return;f.showLoadMsg&&(u(),a.mobile.showPageLoadingMsg(a.mobile.pageLoadErrorMessageTheme,a.mobile.pageLoadErrorMessage,!0),setTimeout(a.mobile.hidePageLoadingMsg,1500)),e.reject(k,c)}}),e.promise()},a.mobile.loadPage.defaults={type:"get",data:d,reloadPage:!1,role:d,showLoadMsg:!1,pageContainer:d,loadMsgDelay:50},a.mobile.changePage=function(b,e){if(m){l.unshift(arguments);return}var f=a.extend({},a.mobile.changePage.defaults,e);f.pageContainer=f.pageContainer||a.mobile.pageContainer,f.fromPage=f.fromPage||a.mobile.activePage;var g=f.pageContainer,i=new a.Event("pagebeforechange"),k={toPage:b,options:f};g.trigger(i,k);if(i.isDefaultPrevented())return;b=k.toPage,m=!0;if(typeof b=="string"){a.mobile.loadPage(b,f).done(function(b,c,d,e){m=!1,c.duplicateCachedPage=e,a.mobile.changePage(d,c)}).fail(function(a,b){m=!1,u(!0),v(),f.pageContainer.trigger("pagechangefailed",k)});return}b[0]===a.mobile.firstPage[0]&&!f.dataUrl&&(f.dataUrl=p.hrefNoHash);var o=f.fromPage,q=f.dataUrl&&h.convertUrlToDataUrl(f.dataUrl)||b.jqmData("url"),r=q,s=h.getFilePath(q),t=j.getActive(),w=j.activeIndex===0,x=0,y=c.title,A=f.role==="dialog"||b.jqmData("role")==="dialog";if(o&&o[0]===b[0]&&!f.allowSamePageTransition){m=!1,g.trigger("pagechange",k),f.fromHashChange&&j.directHashChange({currentUrl:q,isBack:function(){},isForward:function(){}});return}B(b,f.role),f.fromHashChange&&j.directHashChange({currentUrl:q,isBack:function(){x=-1},isForward:function(){x=1}});try{c.activeElement&&c.activeElement.nodeName.toLowerCase()!=="body"?a(c.activeElement).blur():a("input:focus, textarea:focus, select:focus").blur()}catch(C){}var D=!1;A&&t&&(t.url.indexOf(n)>-1&&!a.mobile.activePage.is(".ui-dialog")&&(f.changeHash=!1,D=!0),q=(t.url||"")+(D?"":n),j.activeIndex===0&&q===j.initialDst&&(q+=n)),f.changeHash!==!1&&q&&(j.ignoreNextHashChange=!0,h.set(q));var E=t?b.jqmData("title")||b.children(":jqmData(role='header')").find(".ui-title").getEncodedText():y;!!E&&y===c.title&&(y=E),b.jqmData("title")||b.jqmData("title",y),f.transition=f.transition||(x&&!w?t.transition:d)||(A?a.mobile.defaultDialogTransition:a.mobile.defaultPageTransition),x||(D&&(j.activeIndex=Math.max(0,j.activeIndex-1)),j.addNew(q,f.transition,y,r,f.role)),c.title=j.getActive().title,a.mobile.activePage=b,f.reverse=f.reverse||x<0,z(b,o,f.transition,f.reverse).done(function(c,d,e,h,i){u(),f.duplicateCachedPage&&f.duplicateCachedPage.remove(),i||a.mobile.focusPage(b),v(),g.trigger("pagechange",k)})},a.mobile.changePage.defaults={transition:d,reverse:!1,changeHash:!0,fromHashChange:!1,role:d,duplicateCachedPage:d,pageContainer:d,showLoadMsg:!0,dataUrl:d,fromPage:d,allowSamePageTransition:!1},a.mobile.navreadyDeferred=a.Deferred(),a.mobile.navreadyDeferred.done(function(){a(c).delegate("form","submit",function(b){var c=a(this);if(!a.mobile.ajaxEnabled||c.is(":jqmData(ajax='false')")||!c.jqmHijackable().length)return;var d=c.attr("method"),e=c.attr("target"),f=c.attr("action");f||(f=D(c),f===q.hrefNoHash&&(f=p.hrefNoSearch)),f=h.makeUrlAbsolute(f,D(c));if(h.isExternal(f)&&!h.isPermittedCrossDomainRequest(p,f)||e)return;a.mobile.changePage(f,{type:d&&d.length&&d.toLowerCase()||"get",data:c.serialize(),transition:c.jqmData("transition"),reverse:c.jqmData("direction")==="reverse",reloadPage:!0}),b.preventDefault()}),a(c).bind("vclick",function(b){if(b.which>1||!a.mobile.linkBindingEnabled)return;var c=C(b.target);if(!a(c).jqmHijackable().length)return;c&&h.parseUrl(c.getAttribute("href")||"#").hash!=="#"&&(u(!0),i=a(c).closest(".ui-btn").not(".ui-disabled"),i.addClass(a.mobile.activeBtnClass))}),a(c).bind("click",function(c){if(!a.mobile.linkBindingEnabled)return;var e=C(c.target),f=a(e),g;if(!e||c.which>1||!f.jqmHijackable().length)return;g=function(){b.setTimeout(function(){u(!0)},200)};if(f.is(":jqmData(rel='back')"))return a.mobile.back(),!1;var i=D(f),j=h.makeUrlAbsolute(f.attr("href")||"#",i);if(!a.mobile.ajaxEnabled&&!h.isEmbeddedPage(j)){g();return}if(j.search("#")!==-1){j=j.replace(/[^#]*#/,"");if(!j){c.preventDefault();return}h.isPath(j)?j=h.makeUrlAbsolute(j,i):j=h.makeUrlAbsolute("#"+j,p.hrefNoHash)}var k=f.is("[rel='external']")||f.is(":jqmData(ajax='false')")||f.is("[target]"),l=k||h.isExternal(j)&&!h.isPermittedCrossDomainRequest(p,j);if(l){g();return}var m=f.jqmData("transition"),n=f.jqmData("direction")==="reverse"||f.jqmData("back"),o=f.attr("data-"+a.mobile.ns+"rel")||d;a.mobile.changePage(j,{transition:m,reverse:n,role:o,link:f}),c.preventDefault()}),a(c).delegate(".ui-page","pageshow.prefetch",function(){var b=[];a(this).find("a:jqmData(prefetch)").each(function(){var c=a(this),d=c.attr("href");d&&a.inArray(d,b)===-1&&(b.push(d),a.mobile.loadPage(d,{role:c.attr("data-"+a.mobile.ns+"rel")}))})}),a.mobile._handleHashChange=function(c){var e=h.stripHash(c),f=a.mobile.urlHistory.stack.length===0?"none":d,g=new a.Event("navigate"),i={transition:f,changeHash:!1,fromHashChange:!0};0===j.stack.length&&(j.initialDst=e),a.mobile.pageContainer.trigger(g);if(g.isDefaultPrevented())return;if(!a.mobile.hashListeningEnabled||j.ignoreNextHashChange){j.ignoreNextHashChange=!1;return}if(j.stack.length>1&&e.indexOf(n)>-1&&j.initialDst!==e){if(!a.mobile.activePage.is(".ui-dialog")){j.directHashChange({currentUrl:e,isBack:function(){a.mobile.back()},isForward:function(){b.history.forward()}});return}j.directHashChange({currentUrl:e,either:function(b){var c=a.mobile.urlHistory.getActive();e=c.pageUrl,a.extend(i,{role:c.role,transition:c.transition,reverse:b})}})}e?(e=typeof e=="string"&&!h.isPath(e)?h.makeUrlAbsolute("#"+e,q):e,e===h.makeUrlAbsolute("#"+j.initialDst,q)&&j.stack.length&&j.stack[0].url!==j.initialDst.replace(n,"")&&(e=a.mobile.firstPage),a.mobile.changePage(e,i)):a.mobile.changePage(a.mobile.firstPage,i)},e.bind("hashchange",function(b,c){a.mobile._handleHashChange(h.parseLocation().hash)}),a(c).bind("pageshow",A),a(b).bind("throttledresize",A)})}(a),function(a,b){var e={},f=e,g=a(b),h=a.mobile.path.parseLocation(),i=a.Deferred(),j=a.Deferred();a(c).ready(a.proxy(j,"resolve")),a(c).one("mobileinit",a.proxy(i,"resolve")),a.extend(e,{initialFilePath:function(){return h.pathname+h.search}(),hashChangeTimeout:200,hashChangeEnableTimer:d,initialHref:h.hrefNoHash,state:function(){return{hash:a.mobile.path.parseLocation().hash||"#"+f.initialFilePath,title:c.title,initialHref:f.initialHref}},resetUIKeys:function(b){var c=a.mobile.dialogHashKey,d="&"+a.mobile.subPageUrlKey,e=b.indexOf(c);return e>-1?b=b.slice(0,e)+"#"+b.slice(e):b.indexOf(d)>-1&&(b=b.split(d).join("#"+d)),b},nextHashChangePrevented:function(b){a.mobile.urlHistory.ignoreNextHashChange=b,f.onHashChangeDisabled=b},onHashChange:function(b){if(f.onHashChangeDisabled)return;var d,e,g=a.mobile.path.parseLocation().hash,h=a.mobile.path.isPath(g),i=h?a.mobile.path.getLocation():a.mobile.getDocumentUrl();g=h?g.replace("#",""):g,e=f.state(),d=a.mobile.path.makeUrlAbsolute(g,i),h&&(d=f.resetUIKeys(d)),history.replaceState(e,c.title,d)},onPopState:function(b){var c=b.originalEvent.state,d,e,g;c&&(clearTimeout(f.hashChangeEnableTimer),f.nextHashChangePrevented(!1),a.mobile._handleHashChange(c.hash),f.nextHashChangePrevented(!0),f.hashChangeEnableTimer=setTimeout(function(){f.nextHashChangePrevented(!1)},f.hashChangeTimeout))},init:function(){g.bind("hashchange",f.onHashChange),g.bind("popstate",f.onPopState),location.hash===""&&history.replaceState(f.state(),c.title,a.mobile.path.getLocation())}}),a.when(j,i,a.mobile.navreadyDeferred).done(function(){a.mobile.pushStateEnabled&&a.support.pushState&&e.init()})}(a,this),function(a,b,c){a.mobile.transitionFallbacks.flip="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.flow="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.pop="fade"}(a,this),function(a,b,c){a.mobile.transitionHandlers.slide=a.mobile.transitionHandlers.simultaneous,a.mobile.transitionFallbacks.slide="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slidedown="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slidefade="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.slideup="fade"}(a,this),function(a,b,c){a.mobile.transitionFallbacks.turn="fade"}(a,this),function(a,b){a.mobile.page.prototype.options.degradeInputs={color:!1,date:!1,datetime:!1,"datetime-local":!1,email:!1,month:!1,number:!1,range:"number",search:"text",tel:!1,time:!1,url:!1,week:!1},a(c).bind("pagecreate create",function(b){var c=a.mobile.closestPageData(a(b.target)),d;if(!c)return;d=c.options,a(b.target).find("input").not(c.keepNativeSelector()).each(function(){var b=a(this),c=this.getAttribute("type"),e=d.degradeInputs[c]||"text";if(d.degradeInputs[c]){var f=a("<div>").html(b.clone()).html(),g=f.indexOf(" type=")>-1,h=g?/\s+type=["']?\w+['"]?/:/\/?>/,i=' type="'+e+'" data-'+a.mobile.ns+'type="'+c+'"'+(g?"":">");b.replaceWith(f.replace(h,i))}})})}(a),function(a,b,d){a.widget("mobile.dialog",a.mobile.widget,{options:{closeBtnText:"Close",overlayTheme:"a",initSelector:":jqmData(role='dialog')"},_create:function(){var b=this,c=this.element,d=a("<a href='#' data-"+a.mobile.ns+"icon='delete' data-"+a.mobile.ns+"iconpos='notext'>"+this.options.closeBtnText+"</a>"),e=a("<div/>",{role:"dialog","class":"ui-dialog-contain ui-corner-all ui-overlay-shadow"});c.addClass("ui-dialog ui-overlay-"+this.options.overlayTheme),c.wrapInner(e).children().find(":jqmData(role='header')").prepend(d).end().children(":first-child").addClass("ui-corner-top").end().children(":last-child").addClass("ui-corner-bottom"),d.bind("click",function(){b.close()}),c.bind("vclick submit",function(b){var c=a(b.target).closest(b.type==="vclick"?"a":"form"),d;c.length&&!c.jqmData("transition")&&(d=a.mobile.urlHistory.getActive()||{},c.attr("data-"+a.mobile.ns+"transition",d.transition||a.mobile.defaultDialogTransition).attr("data-"+a.mobile.ns+"direction","reverse"))}).bind("pagehide",function(b,c){a(this).find("."+a.mobile.activeBtnClass).not(".ui-slider-bg").removeClass(a.mobile.activeBtnClass)}).bind("pagebeforeshow",function(){b._isCloseable=!0,b.options.overlayTheme&&b.element.page("removeContainerBackground").page("setContainerBackground",b.options.overlayTheme)})},close:function(){var b;this._isCloseable&&(this._isCloseable=!1,a.mobile.hashListeningEnabled?a.mobile.back():(b=a.mobile.urlHistory.getPrev().url,a.mobile.path.isPath(b)||(b=a.mobile.path.makeUrlAbsolute("#"+b)),a.mobile.changePage(b,{changeHash:!1,fromHashChange:!0})))}}),a(c).delegate(a.mobile.dialog.prototype.options.initSelector,"pagecreate",function(){a.mobile.dialog.prototype.enhance(this)})}(a,this),function(a,b){a.mobile.page.prototype.options.backBtnText="Back",a.mobile.page.prototype.options.addBackBtn=!1,a.mobile.page.prototype.options.backBtnTheme=null,a.mobile.page.prototype.options.headerTheme="a",a.mobile.page.prototype.options.footerTheme="a",a.mobile.page.prototype.options.contentTheme=null,a(c).bind("pagecreate",function(b){var c=a(b.target),d=c.data("page").options,e=c.jqmData("role"),f=d.theme;a(":jqmData(role='header'), :jqmData(role='footer'), :jqmData(role='content')",c).jqmEnhanceable().each(function(){var b=a(this),g=b.jqmData("role"),h=b.jqmData("theme"),i=h||d.contentTheme||e==="dialog"&&f,j,k,l,m;b.addClass("ui-"+g);if(g==="header"||g==="footer"){var n=h||(g==="header"?d.headerTheme:d.footerTheme)||f;b.addClass("ui-bar-"+n).attr("role",g==="header"?"banner":"contentinfo"),g==="header"&&(j=b.children("a, button"),k=j.hasClass("ui-btn-left"),l=j.hasClass("ui-btn-right"),k=k||j.eq(0).not(".ui-btn-right").addClass("ui-btn-left").length,l=l||j.eq(1).addClass("ui-btn-right").length),d.addBackBtn&&g==="header"&&a(".ui-page").length>1&&c.jqmData("url")!==a.mobile.path.stripHash(location.hash)&&!k&&(m=a("<a href='javascript:void(0);' class='ui-btn-left' data-"+a.mobile.ns+"rel='back' data-"+a.mobile.ns+"icon='arrow-l'>"+d.backBtnText+"</a>").attr("data-"+a.mobile.ns+"theme",d.backBtnTheme||n).prependTo(b)),b.children("h1, h2, h3, h4, h5, h6").addClass("ui-title").attr({role:"heading","aria-level":"1"})}else g==="content"&&(i&&b.addClass("ui-body-"+i),b.attr("role","main"))})})}(a),function(a,b){a.fn.fieldcontain=function(a){return this.addClass("ui-field-contain ui-body ui-br").contents().filter(function(){return this.nodeType===3&&!/\S/.test(this.nodeValue)}).remove()},a(c).bind("pagecreate create",function(b){a(":jqmData(role='fieldcontain')",b.target).jqmEnhanceable().fieldcontain()})}(a),function(a,b){a.fn.grid=function(b){return this.each(function(){var c=a(this),d=a.extend({grid:null},b),e=c.children(),f={solo:1,a:2,b:3,c:4,d:5},g=d.grid,h;if(!g)if(e.length<=5)for(var i in f)f[i]===e.length&&(g=i);else g="a",c.addClass("ui-grid-duo");h=f[g],c.addClass("ui-grid-"+g),e.filter(":nth-child("+h+"n+1)").addClass("ui-block-a"),h>1&&e.filter(":nth-child("+h+"n+2)").addClass("ui-block-b"),h>2&&e.filter(":nth-child("+h+"n+3)").addClass("ui-block-c"),h>3&&e.filter(":nth-child("+h+"n+4)").addClass("ui-block-d"),h>4&&e.filter(":nth-child("+h+"n+5)").addClass("ui-block-e")})}}(a),function(a,b){a(c).bind("pagecreate create",function(b){a(":jqmData(role='nojs')",b.target).addClass("ui-nojs")})}(a),function(a,b){function d(a){var b;while(a){b=typeof a.className=="string"&&a.className+" ";if(b&&b.indexOf("ui-btn ")>-1&&b.indexOf("ui-disabled ")<0)break;a=a.parentNode}return a}a.fn.buttonMarkup=function(d){var f=this,g=function(b,c){j.setAttribute("data-"+a.mobile.ns+b,c),i.jqmData(b,c)};d=d&&a.type(d)==="object"?d:{};for(var h=0;h<f.length;h++){var i=f.eq(h),j=i[0],k=a.extend({},a.fn.buttonMarkup.defaults,{icon:d.icon!==b?d.icon:i.jqmData("icon"),iconpos:d.iconpos!==b?d.iconpos:i.jqmData("iconpos"),theme:d.theme!==b?d.theme:i.jqmData("theme")||a.mobile.getInheritedTheme(i,"c"),inline:d.inline!==b?d.inline:i.jqmData("inline"),shadow:d.shadow!==b?d.shadow:i.jqmData("shadow"),corners:d.corners!==b?d.corners:i.jqmData("corners"),iconshadow:d.iconshadow!==b?d.iconshadow:i.jqmData("iconshadow"),mini:d.mini!==b?d.mini:i.jqmData("mini")},d),l="ui-btn-inner",m="ui-btn-text",n,o,p,q,r,s;a.each(k,g),i.jqmData("rel")==="popup"&&i.attr("href")&&(j.setAttribute("aria-haspopup",!0),j.setAttribute("aria-owns",j.getAttribute("href"))),s=a.data(j.tagName==="INPUT"||j.tagName==="BUTTON"?j.parentNode:j,"buttonElements"),s?(j=s.outer,i=a(j),p=s.inner,q=s.text,a(s.icon).remove(),s.icon=null):(p=c.createElement(k.wrapperEls),q=c.createElement(k.wrapperEls)),r=k.icon?c.createElement("span"):null,e&&!s&&e(),k.theme||(k.theme=a.mobile.getInheritedTheme(i,"c")),n="ui-btn ui-btn-up-"+k.theme,n+=k.shadow?" ui-shadow":"",n+=k.corners?" ui-btn-corner-all":"",k.mini!==b&&(n+=k.mini===!0?" ui-mini":" ui-fullsize"),k.inline!==b&&(n+=k.inline===!0?" ui-btn-inline":" ui-btn-block"),k.icon&&(k.icon="ui-icon-"+k.icon,k.iconpos=k.iconpos||"left",o="ui-icon "+k.icon,k.iconshadow&&(o+=" ui-icon-shadow")),k.iconpos&&(n+=" ui-btn-icon-"+k.iconpos,k.iconpos==="notext"&&!i.attr("title")&&i.attr("title",i.getEncodedText())),l+=k.corners?" ui-btn-corner-all":"",k.iconpos&&k.iconpos==="notext"&&!i.attr("title")&&i.attr("title",i.getEncodedText()),s&&i.removeClass(s.bcls||""),i.removeClass("ui-link").addClass(n),p.className=l,q.className=m,s||p.appendChild(q);if(r){r.className=o;if(!s||!s.icon)r.innerHTML="&#160;",p.appendChild(r)}while(j.firstChild&&!s)q.appendChild(j.firstChild);s||j.appendChild(p),s={bcls:n,outer:j,inner:p,text:q,icon:r},a.data(j,"buttonElements",s),a.data(p,"buttonElements",s),a.data(q,"buttonElements",s),r&&a.data(r,"buttonElements",s)}return this},a.fn.buttonMarkup.defaults={corners:!0,shadow:!0,iconshadow:!0,wrapperEls:"span"};var e=function(){var b=a.mobile.buttonMarkup.hoverDelay,f,g;a(c).bind({"vmousedown vmousecancel vmouseup vmouseover vmouseout focus blur scrollstart":function(c){var e,h=a(d(c.target)),i=c.originalEvent&&/^touch/.test(c.originalEvent.type),j=c.type;if(h.length){e=h.attr("data-"+a.mobile.ns+"theme");if(j==="vmousedown")i?f=setTimeout(function(){h.removeClass("ui-btn-up-"+e).addClass("ui-btn-down-"+e)},b):h.removeClass("ui-btn-up-"+e).addClass("ui-btn-down-"+e);else if(j==="vmousecancel"||j==="vmouseup")h.removeClass("ui-btn-down-"+e).addClass("ui-btn-up-"+e);else if(j==="vmouseover"||j==="focus")i?g=setTimeout(function(){h.removeClass("ui-btn-up-"+e).addClass("ui-btn-hover-"+e)},b):h.removeClass("ui-btn-up-"+e).addClass("ui-btn-hover-"+e);else if(j==="vmouseout"||j==="blur"||j==="scrollstart")h.removeClass("ui-btn-hover-"+e+" ui-btn-down-"+e).addClass("ui-btn-up-"+e),f&&clearTimeout(f),g&&clearTimeout(g)}},"focusin focus":function(b){a(d(b.target)).addClass(a.mobile.focusClass)},"focusout blur":function(b){a(d(b.target)).removeClass(a.mobile.focusClass)}}),e=null};a(c).bind("pagecreate create",function(b){a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a",b.target).jqmEnhanceable().not("button, input, .ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()})}(a),function(a,b){a.widget("mobile.collapsible",a.mobile.widget,{options:{expandCueText:" click to expand contents",collapseCueText:" click to collapse contents",collapsed:!0,heading:"h1,h2,h3,h4,h5,h6,legend",theme:null,contentTheme:null,inset:!0,mini:!1,initSelector:":jqmData(role='collapsible')"},_create:function(){var c=this.element,d=this.options,e=c.addClass("ui-collapsible"),f=c.children(d.heading).first(),g=c.jqmData("collapsed-icon")||d.collapsedIcon,h=c.jqmData("expanded-icon")||d.expandedIcon,i=e.wrapInner("<div class='ui-collapsible-content'></div>").children(".ui-collapsible-content"),j=c.closest(":jqmData(role='collapsible-set')").addClass("ui-collapsible-set");f.is("legend")&&(f=a("<div role='heading'>"+f.html()+"</div>").insertBefore(f),f.next().remove()),j.length?(d.theme||(d.theme=j.jqmData("theme")||a.mobile.getInheritedTheme(j,"c")),d.contentTheme||(d.contentTheme=j.jqmData("content-theme")),d.collapsedIcon||(d.collapsedIcon=j.jqmData("collapsed-icon")),d.expandedIcon||(d.expandedIcon=j.jqmData("expanded-icon")),d.iconPos||(d.iconPos=j.jqmData("iconpos")),j.jqmData("inset")!==b?d.inset=j.jqmData("inset"):d.inset=!0,d.mini||(d.mini=j.jqmData("mini"))):d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),!d.inset||e.addClass("ui-collapsible-inset"),i.addClass(d.contentTheme?"ui-body-"+d.contentTheme:""),g=c.jqmData("collapsed-icon")||d.collapsedIcon||"plus",h=c.jqmData("expanded-icon")||d.expandedIcon||"minus",f.insertBefore(i).addClass("ui-collapsible-heading").append("<span class='ui-collapsible-heading-status'></span>").wrapInner("<a href='#' class='ui-collapsible-heading-toggle'></a>").find("a").first().buttonMarkup({shadow:!1,corners:!1,iconpos:c.jqmData("iconpos")||d.iconPos||"left",icon:g,mini:d.mini,theme:d.theme}),!d.inset||f.find("a").first().add(".ui-btn-inner",c).addClass("ui-corner-top ui-corner-bottom"),e.bind("expand collapse",function(b){if(!b.isDefaultPrevented()){var c=a(this),k=b.type==="collapse",l=d.contentTheme;b.preventDefault(),f.toggleClass("ui-collapsible-heading-collapsed",k).find(".ui-collapsible-heading-status").text(k?d.expandCueText:d.collapseCueText).end().find(".ui-icon").toggleClass("ui-icon-"+h,!k).toggleClass("ui-icon-"+g,k||h===g).end().find("a").first().removeClass(a.mobile.activeBtnClass),c.toggleClass("ui-collapsible-collapsed",k),i.toggleClass("ui-collapsible-content-collapsed",k).attr("aria-hidden",k),l&&!!d.inset&&(!j.length||e.jqmData("collapsible-last"))&&(f.find("a").first().add(f.find(".ui-btn-inner")).toggleClass("ui-corner-bottom",k),i.toggleClass("ui-corner-bottom",!k)),i.trigger("updatelayout")}}).trigger(d.collapsed?"collapse":"expand"),f.bind("tap",function(b){f.find("a").first().addClass(a.mobile.activeBtnClass)}).bind("click",function(a){var b=f.is(".ui-collapsible-heading-collapsed")?"expand":"collapse";e.trigger(b),a.preventDefault(),a.stopPropagation()})}}),a(c).bind("pagecreate create",function(b){a.mobile.collapsible.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.collapsibleset",a.mobile.widget,{options:{initSelector:":jqmData(role='collapsible-set')"},_create:function(){var c=this.element.addClass("ui-collapsible-set"),d=this.options;d.theme||(d.theme=a.mobile.getInheritedTheme(c,"c")),d.contentTheme||(d.contentTheme=c.jqmData("content-theme")),c.jqmData("inset")!==b&&(d.inset=c.jqmData("inset")),d.inset=d.inset!==b?d.inset:!0,c.jqmData("collapsiblebound")||c.jqmData("collapsiblebound",!0).bind("expand collapse",function(b){var c=b.type==="collapse",e=a(b.target).closest(".ui-collapsible"),f=e.data("collapsible");e.jqmData("collapsible-last")&&!!d.inset&&(e.find(".ui-collapsible-heading").first().find("a").first().toggleClass("ui-corner-bottom",c).find(".ui-btn-inner").toggleClass("ui-corner-bottom",c),e.find(".ui-collapsible-content").toggleClass("ui-corner-bottom",!c))}).bind("expand",function(b){var c=a(b.target).closest(".ui-collapsible");c.parent().is(":jqmData(role='collapsible-set')")&&c.siblings(".ui-collapsible").trigger("collapse")})},_init:function(){var a=this.element,b=a.children(":jqmData(role='collapsible')"),c=b.filter(":jqmData(collapsed='false')");this.refresh(),c.trigger("expand")},refresh:function(){var b=this.element,c=this.options,d=b.children(":jqmData(role='collapsible')");a.mobile.collapsible.prototype.enhance(d.not(".ui-collapsible")),!c.inset||(d.each(function(){a(this).jqmRemoveData("collapsible-last").find(".ui-collapsible-heading").find("a").first().removeClass("ui-corner-top ui-corner-bottom").find(".ui-btn-inner").removeClass("ui-corner-top ui-corner-bottom")}),d.first().find("a").first().addClass("ui-corner-top").find(".ui-btn-inner").addClass("ui-corner-top"),d.last().jqmData("collapsible-last",!0).find("a").first().addClass("ui-corner-bottom").find(".ui-btn-inner").addClass("ui-corner-bottom"))}}),a(c).bind("pagecreate create",function(b){a.mobile.collapsibleset.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.widget("mobile.navbar",a.mobile.widget,{options:{iconpos:"top",grid:null,initSelector:":jqmData(role='navbar')"},_create:function(){var c=this.element,d=c.find("a"),e=d.filter(":jqmData(icon)").length?this.options.iconpos:b;c.addClass("ui-navbar ui-mini").attr("role","navigation").find("ul").jqmEnhanceable().grid({grid:this.options.grid}),d.buttonMarkup({corners:!1,shadow:!1,inline:!0,iconpos:e}),c.delegate("a","vclick",function(b){a(b.target).hasClass("ui-disabled")||(d.removeClass(a.mobile.activeBtnClass),a(this).addClass(a.mobile.activeBtnClass))}),c.closest(".ui-page").bind("pagebeforeshow",function(){d.filter(".ui-state-persist").addClass(a.mobile.activeBtnClass)})}}),a(c).bind("pagecreate create",function(b){a.mobile.navbar.prototype.enhanceWithin(b.target)})}(a),function(a,b){var d={};a.widget("mobile.listview",a.mobile.widget,{options:{theme:null,countTheme:"c",headerTheme:"b",dividerTheme:"b",splitIcon:"arrow-r",splitTheme:"b",inset:!1,initSelector:":jqmData(role='listview')"},_create:function(){var a=this,b="";b+=a.options.inset?" ui-listview-inset ui-corner-all ui-shadow ":"",a.element.addClass(function(a,c){return c+" ui-listview "+b}),a.refresh(!0)},_removeCorners:function(a,b){var c="ui-corner-top ui-corner-tr ui-corner-tl",d="ui-corner-bottom ui-corner-br ui-corner-bl";a=a.add(a.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb")),b==="top"?a.removeClass(c):b==="bottom"?a.removeClass(d):a.removeClass(c+" "+d)},_refreshCorners:function(a){var b,c,d,e;b=this.element.children("li"),c=a||b.filter(":visible").length===0?b.not(".ui-screen-hidden"):b.filter(":visible"),b.filter(".ui-li-last").removeClass("ui-li-last"),this.options.inset?(this._removeCorners(b),d=c.first().addClass("ui-corner-top"),d.add(d.find(".ui-btn-inner").not(".ui-li-link-alt span:first-child")).addClass("ui-corner-top").end().find(".ui-li-link-alt, .ui-li-link-alt span:first-child").addClass("ui-corner-tr").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-tl"),e=c.last().addClass("ui-corner-bottom ui-li-last"),e.add(e.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-bl")):c.last().addClass("ui-li-last"),a||this.element.trigger("updatelayout")},_findFirstElementByTagName:function(a,b,c,d){var e={};e[c]=e[d]=!0;while(a){if(e[a.nodeName])return a;a=a[b]}return null},_getChildrenByTagName:function(b,c,d){var e=[],f={};f[c]=f[d]=!0,b=b.firstChild;while(b)f[b.nodeName]&&e.push(b),b=b.nextSibling;return a(e)},_addThumbClasses:function(b){var c,d,e=b.length;for(c=0;c<e;c++)d=a(this._findFirstElementByTagName(b[c].firstChild,"nextSibling","img","IMG")),d.length&&(d.addClass("ui-li-thumb"),a(this._findFirstElementByTagName(d[0].parentNode,"parentNode","li","LI")).addClass(d.is(".ui-li-icon")?"ui-li-has-icon":"ui-li-has-thumb"))},refresh:function(b){this.parentPage=this.element.closest(".ui-page"),this._createSubPages();var d=this.options,e=this.element,f=this,g=e.jqmData("dividertheme")||d.dividerTheme,h=e.jqmData("splittheme"),i=e.jqmData("spliticon"),j=this._getChildrenByTagName(e[0],"li","LI"),k=!!a.nodeName(e[0],"ol"),l=!a.support.cssPseudoElement,m=e.attr("start"),n={},o,p,q,r,s,t,u,v,w,x,y,z,A,B;k&&l&&e.find(".ui-li-dec").remove(),k&&(m||m===0?l?u=parseFloat(m):(v=parseFloat(m)-1,e.css("counter-reset","listnumbering "+v)):l&&(u=1)),d.theme||(d.theme=a.mobile.getInheritedTheme(this.element,"c"));for(var C=0,D=j.length;C<D;C++){o=j.eq(C),p="ui-li";if(b||!o.hasClass("ui-li")){q=o.jqmData("theme")||d.theme,r=this._getChildrenByTagName(o[0],"a","A");var E=o.jqmData("role")==="list-divider";r.length&&!E?(y=o.jqmData("icon"),o.buttonMarkup({wrapperEls:"div",shadow:!1,corners:!1,iconpos:"right",icon:r.length>1||y===!1?!1:y||"arrow-r",theme:q}),y!==!1&&r.length===1&&o.addClass("ui-li-has-arrow"),r.first().removeClass("ui-link").addClass("ui-link-inherit"),r.length>1&&(p+=" ui-li-has-alt",s=r.last(),t=h||s.jqmData("theme")||d.splitTheme,B=s.jqmData("icon"),s.appendTo(o).attr("title",s.getEncodedText()).addClass("ui-li-link-alt").empty().buttonMarkup({shadow:!1,corners:!1,theme:q,icon:!1,iconpos:"notext"}).find(".ui-btn-inner").append(a(c.createElement("span")).buttonMarkup({shadow:!0,corners:!0,theme:t,iconpos:"notext",icon:B||y||i||d.splitIcon})))):E?(p+=" ui-li-divider ui-bar-"+g,o.attr("role","heading"),k&&(m||m===0?l?u=parseFloat(m):(w=parseFloat(m)-1,o.css("counter-reset","listnumbering "+w)):l&&(u=1))):p+=" ui-li-static ui-btn-up-"+q}k&&l&&p.indexOf("ui-li-divider")<0&&(x=p.indexOf("ui-li-static")>0?o:o.find(".ui-link-inherit"),x.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>"+u++ +". </span>")),n[p]||(n[p]=[]),n[p].push(o[0])}for(p in n)a(n[p]).addClass(p).children(".ui-btn-inner").addClass(p);e.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function(){var b=a(this);b.prependTo(b.parent())}).end().find(".ui-li-count").each(function(){a(this).closest("li").addClass("ui-li-has-count")}).addClass("ui-btn-up-"+(e.jqmData("counttheme")||this.options.countTheme)+" ui-btn-corner-all"),this._addThumbClasses(j),this._addThumbClasses(e.find(".ui-link-inherit")),this._refreshCorners(b),this._trigger("afterrefresh")},_idStringEscape:function(a){return a.replace(/[^a-zA-Z0-9]/g,"-")},_createSubPages:function(){var b=this.element,c=b.closest(".ui-page"),e=c.jqmData("url"),f=e||c[0][a.expando],g=b.attr("id"),h=this.options,i="data-"+a.mobile.ns,j=this,k=c.find(":jqmData(role='footer')").jqmData("id"),l;typeof d[f]=="undefined"&&(d[f]=-1),g=g||++d[f],a(b.find("li>ul, li>ol").toArray().reverse()).each(function(c){var d=this,f=a(this),j=f.attr("id")||g+"-"+c,m=f.parent(),n=a(f.prevAll().toArray().reverse()),p=n.length?n:a("<span>"+a.trim(m.contents()[0].nodeValue)+"</span>"),q=p.first().getEncodedText(),r=(e||"")+"&"+a.mobile.subPageUrlKey+"="+j,s=f.jqmData("theme")||h.theme,t=f.jqmData("counttheme")||b.jqmData("counttheme")||h.countTheme,u,v;l=!0,u=f.detach().wrap("<div "+i+"role='page' "+i+"url='"+r+"' "+i+"theme='"+s+"' "+i+"count-theme='"+t+"'><div "+i+"role='content'></div></div>").parent().before("<div "+i+"role='header' "+i+"theme='"+h.headerTheme+"'><div class='ui-title'>"+q+"</div></div>").after(k?a("<div "+i+"role='footer' "+i+"id='"+k+"'>"):"").parent().appendTo(a.mobile.pageContainer),u.page(),v=m.find("a:first"),v.length||(v=a("<a/>").html(p||q).prependTo(m.empty())),v.attr("href","#"+r)}).listview();if(l&&c.is(":jqmData(external-page='true')")&&c.data("page").options.domCache===!1){var m=function(b,d){var f=d.nextPage,g,h=new a.Event("pageremove");d.nextPage&&(g=f.jqmData("url"),g.indexOf(e+"&"+a.mobile.subPageUrlKey)!==0&&(j.childPages().remove(),c.trigger(h),h.isDefaultPrevented()||c.removeWithDependents()))};c.unbind("pagehide.remove").bind("pagehide.remove",m)}},childPages:function(){var b=this.parentPage.jqmData("url");return a(":jqmData(url^='"+b+"&"+a.mobile.subPageUrlKey+"')")}}),a(c).bind("pagecreate create",function(b){a.mobile.listview.prototype.enhanceWithin(b.target)})}(a),function(a,b){a.mobile.listview.prototype.options.autodividers=!1,a.mobile.listview.prototype.options.autodividersSelector=function(a){var b=a.text()||null;return b?(b=b.slice(0,1).toUpperCase(),b):null},a(c).delegate("ul,ol","listviewcreate",function(){var b=a(this),d=b.data("listview");if(!d||!d.options.autodividers)return;var e=function(){b.find("li:jqmData(role='list-divider')").remove();var e=b.find("li"),f=null,g,h;for(var i=0;i<e.length;i++){g=e[i],h=d.options.autodividersSelector(a(g));if(h&&f!==h){var j=c.createElement("li");j.appendChild(c.createTextNode(h)),j.setAttribute("data-"+a.mobile.ns+"role","list-divider"),g.parentNode.insertBefore(j,g)}f=h}},f=function(){b.unbind("listviewafterrefresh",f),e(),d.refresh(),b.bind("listviewafterrefresh",f)};f()})}(a),function(a,b){a.widget("mobile.checkboxradio",a.mobile.widget,{options:{theme:null,initSelector:"input[type='checkbox'],input[type='radio']"},_create:function(){var d=this,e=this.element,f=function(a,b){return a.jqmData(b)||a.closest("form, fieldset").jqmData(b)},g=a(e).closest("label"),h=g.length?g:a(e).closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("label").filter("[for='"+e[0].id+"']").first(),i=e[0].type,j=f(e,"mini"),k=i+"-on",l=i+"-off",m=e.parents(":jqmData(type='horizontal')").length?b:l,n=f(e,"iconpos"),o=m?"":" "+a.mobile.activeBtnClass,p="ui-"+k+o,q="ui-"+l,r="ui-icon-"+k,s="ui-icon-"+l;if(i!=="checkbox"&&i!=="radio")return;a.extend(this,{label:h,inputtype:i,checkedClass:p,uncheckedClass:q,checkedicon:r,uncheckedicon:s}),this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.element,"c")),h.buttonMarkup({theme:this.options.theme,icon:m,shadow:!1,mini:j,iconpos:n});var t=c.createElement("div");t.className="ui-"+i,e.add(h).wrapAll(t),h.bind({vmouseover:function(b){a(this).parent().is(".ui-disabled")&&b.stopPropagation()},vclick:function(a){if(e.is(":disabled")){a.preventDefault();return}return d._cacheVals(),e.prop("checked",i==="radio"&&!0||!e.prop("checked")),e.triggerHandler("click"),d._getInputSet().not(e).prop("checked",!1),d._updateAll(),!1}}),e.bind({vmousedown:function(){d._cacheVals()},vclick:function(){var b=a(this);b.is(":checked")?(b.prop("checked",!0),d._getInputSet().not(b).prop("checked",!1)):b.prop("checked",!1),d._updateAll()},focus:function(){h.addClass(a.mobile.focusClass)},blur:function(){h.removeClass(a.mobile.focusClass)}}),this.refresh()},_cacheVals:function(){this._getInputSet().each(function(){a(this).jqmData("cacheVal",this.checked)})},_getInputSet:function(){return this.inputtype==="checkbox"?this.element:this.element.closest("form, fieldset, :jqmData(role='page'), :jqmData(role='dialog')").find("input[name='"+this.element[0].name+"'][type='"+this.inputtype+"']")},_updateAll:function(){var b=this;this._getInputSet().each(function(){var c=a(this);(this.checked||b.inputtype==="checkbox")&&c.trigger("change")}).checkboxradio("refresh")},refresh:function(){var a=this.element[0],b=this.label,c=b.find(".ui-icon");a.checked?(b.addClass(this.checkedClass).removeClass(this.uncheckedClass),c.addClass(this.checkedicon).removeClass(this.uncheckedicon)):(b.removeClass(this.checkedClass).addClass(this.uncheckedClass),c.removeClass(this.checkedicon).addClass(this.uncheckedicon)),a.disabled?this.disable():this.enable()},disable:function(){this.element.prop("disabled",!0).parent().addClass("ui-disabled")},enable:function(){this.element.prop("disabled",!1).parent().removeClass("ui-disabled")}}),a(c).bind("pagecreate create",function(b){a.mobile.checkboxradio.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.widget("mobile.button",a.mobile.widget,{options:{theme:null,icon:null,iconpos:null,corners:!0,shadow:!0,iconshadow:!0,initSelector:"button, [type='button'], [type='submit'], [type='reset']"},_create:function(){var d=this.element,e,f=this.options,g,h,i=f.inline||d.jqmData("inline"),j=f.mini||d.jqmData("mini"),k="",l;if(d[0].tagName==="A"){d.hasClass("ui-btn")||d.buttonMarkup();return}this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.element,"c")),!~d[0].className.indexOf("ui-btn-left")||(k="ui-btn-left"),!~d[0].className.indexOf("ui-btn-right")||(k="ui-btn-right");if(d.attr("type")==="submit"||d.attr("type")==="reset")k?k+=" ui-submit":k="ui-submit";a("label[for='"+d.attr("id")+"']").addClass("ui-submit"),this.button=a("<div></div>")[d.html()?"html":"text"](d.html()||d.val()).insertBefore(d).buttonMarkup({theme:f.theme,icon:f.icon,iconpos:f.iconpos,inline:i,corners:f.corners,shadow:f.shadow,iconshadow:f.iconshadow,mini:j}).addClass(k).append(d.addClass("ui-btn-hidden")),e=this.button,g=d.attr("type"),h=d.attr("name"),g!=="button"&&g!=="reset"&&h&&d.bind("vclick",function(){l===b&&(l=a("<input>",{type:"hidden",name:d.attr("name"),value:d.attr("value")}).insertBefore(d),a(c).one("submit",function(){l.remove(),l=b}))}),d.bind({focus:function(){e.addClass(a.mobile.focusClass)},blur:function(){e.removeClass(a.mobile.focusClass)}}),this.refresh()},enable:function(){return this.element.attr("disabled",!1),this.button.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.button.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)},refresh:function(){var b=this.element;b.prop("disabled")?this.disable():this.enable(),a(this.button.data("buttonElements").text)[b.html()?"html":"text"](b.html()||b.val())}}),a(c).bind("pagecreate create",function(b){a.mobile.button.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.fn.controlgroup=function(b){function c(a,b){a.removeClass("ui-btn-corner-all ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-controlgroup-last ui-shadow").eq(0).addClass(b[0]).end().last().addClass(b[1]).addClass("ui-controlgroup-last")}return this.each(function(){var d=a(this),e=a.extend({direction:d.jqmData("type")||"vertical",shadow:!1,excludeInvisible:!0,mini:d.jqmData("mini")},b),f=d.children("legend"),g=d.children(".ui-controlgroup-label"),h=d.children(".ui-controlgroup-controls"),i=e.direction==="horizontal"?["ui-corner-left","ui-corner-right"]:["ui-corner-top","ui-corner-bottom"],j=d.find("input").first().attr("type");h.length&&h.contents().unwrap(),d.wrapInner("<div class='ui-controlgroup-controls'></div>"),f.length?(a("<div role='heading' class='ui-controlgroup-label'>"+f.html()+"</div>").insertBefore(d.children(0)),f.remove()):g.length&&d.prepend(g),d.addClass("ui-corner-all ui-controlgroup ui-controlgroup-"+e.direction),c(d.find(".ui-btn"+(e.excludeInvisible?":visible":"")).not(".ui-slider-handle"),i),c(d.find(".ui-btn-inner"),i),e.shadow&&d.addClass("ui-shadow"),e.mini&&d.addClass("ui-mini")})}}(a),function(a,b){a(c).bind("pagecreate create",function(b){a(b.target).find("a").jqmEnhanceable().not(".ui-btn, .ui-link-inherit, :jqmData(role='none'), :jqmData(role='nojs')").addClass("ui-link")})}(a),function(a,d){function e(a,b,c,d){var e=d;return a<b?e=c+(a-b)/2:e=Math.min(Math.max(c,d-b/2),c+a-b),e}function f(){var c=a(b);return{x:c.scrollLeft(),y:c.scrollTop(),cx:b.innerWidth||c.width(),cy:b.innerHeight||c.height()}}a.widget("mobile.popup",a.mobile.widget,{options:{theme:null,overlayTheme:null,shadow:!0,corners:!0,transition:"none",positionTo:"origin",tolerance:null,initSelector:":jqmData(role='popup')",closeLinkSelector:"a:jqmData(rel='back')",closeLinkEvents:"click.popup",navigateEvents:"navigate.popup",closeEvents:"navigate.popup pagebeforechange.popup",history:!a.mobile.browser.ie},_eatEventAndClose:function(a){return a.preventDefault(),a.stopImmediatePropagation(),this.close(),!1},_resizeScreen:function(){var a=this._ui.container.outerHeight(!0);this._ui.screen.removeAttr("style"),a>this._ui.screen.height()&&this._ui.screen.height(a)},_handleWindowKeyUp:function(b){if(this._isOpen&&b.keyCode===a.mobile.keyCode.ESCAPE)return this._eatEventAndClose(b)},_maybeRefreshTimeout:function(){var b=f();if(this._resizeData){if(b.x===this._resizeData.winCoords.x&&b.y===this._resizeData.winCoords.y&&b.cx===this._resizeData.winCoords.cx&&b.cy===this._resizeData.winCoords.cy)return!1;clearTimeout(this._resizeData.timeoutId)}return this._resizeData={timeoutId:setTimeout(a.proxy(this,"_resizeTimeout"),200),winCoords:b},!0},_resizeTimeout:function(){this._maybeRefreshTimeout()||(this._trigger("beforeposition"),this._ui.container.removeClass("ui-selectmenu-hidden").offset(this._placementCoords(this._desiredCoords(d,d,"window"))),this._resizeScreen(),this._resizeData=null,this._orientationchangeInProgress=!1)},_handleWindowResize:function(a){this._isOpen&&this._maybeRefreshTimeout()},_handleWindowOrientationchange:function(a){this._orientationchangeInProgress||(this._ui.container.addClass("ui-selectmenu-hidden").removeAttr("style"),this._orientationchangeInProgress=!0)},_create:function(){var c={screen:a("<div class='ui-screen-hidden ui-popup-screen'></div>"),placeholder:a("<div style='display: none;'><!-- placeholder --></div>"),container:a("<div class='ui-popup-container ui-selectmenu-hidden'></div>")},e=this.element.closest(".ui-page"),f=this.element.attr("id"),g=this;this.options.history=this.options.history&&a.mobile.ajaxEnabled&&a.mobile.hashListeningEnabled,e.length===0&&(e=a("body")),this.options.container=this.options.container||a.mobile.pageContainer,e.append(c.screen),c.container.insertAfter(c.screen),c.placeholder.insertAfter(this.element),f&&(c.screen.attr("id",f+"-screen"),c.container.attr("id",f+"-popup"),c.placeholder.html("<!-- placeholder for "+f+" -->")),c.container.append(this.element),this.element.addClass("ui-popup"),a.extend(this,{_page:e,_ui:c,_fallbackTransition:"",_currentTransition:!1,_prereqs:null,_isOpen:!1,_tolerance:null,_resizeData:null,_orientationchangeInProgress:!1,_globalHandlers:[{src:a(b),handler:{orientationchange:a.proxy(this,"_handleWindowOrientationchange"),resize:a.proxy(this,"_handleWindowResize"),keyup:a.proxy(this,"_handleWindowKeyUp")}}]}),a.each(this.options,function(a,b){g.options[a]=d,g._setOption(a,b,!0)}),c.screen.bind("vclick",a.proxy(this,"_eatEventAndClose")),a.each(this._globalHandlers,function(a,b){b.src.bind(b.handler)})},_applyTheme:function(a,b,c){var d=(a.attr("class")||"").split(" "),e=!0,f=null,g,h=String(b);while(d.length>0){f=d.pop(),g=(new RegExp("^ui-"+c+"-([a-z])$")).exec(f);if(g&&g.length>1){f=g[1];break}f=null}b!==f&&(a.removeClass("ui-"+c+"-"+f),b!==null&&b!=="none"&&a.addClass("ui-"+c+"-"+h))},_setTheme:function(a){this._applyTheme(this.element,a,"body")},_setOverlayTheme:function(a){this._applyTheme(this._ui.screen,a,"overlay"),this._isOpen&&this._ui.screen.addClass("in")},_setShadow:function(a){this.element.toggleClass("ui-overlay-shadow",a)},_setCorners:function(a){this.element.toggleClass("ui-corner-all",a)},_applyTransition:function(b){this._ui.container.removeClass(this._fallbackTransition),b&&b!=="none"&&(this._fallbackTransition=a.mobile._maybeDegradeTransition(b),this._ui.container.addClass(this._fallbackTransition))},_setTransition:function(a){this._currentTransition||this._applyTransition(a)},_setTolerance:function(b){var c={t:30,r:15,b:30,l:15};if(b){var d=String(b).split(",");a.each(d,function(a,b){d[a]=parseInt(b,10)});switch(d.length){case 1:isNaN(d[0])||(c.t=c.r=c.b=c.l=d[0]);break;case 2:isNaN(d[0])||(c.t=c.b=d[0]),isNaN(d[1])||(c.l=c.r=d[1]);break;case 4:isNaN(d[0])||(c.t=d[0]),isNaN(d[1])||(c.r=d[1]),isNaN(d[2])||(c.b=d[2]),isNaN(d[3])||(c.l=d[3]);break;default:}}this._tolerance=c},_setOption:function(b,c){var e,f="_set"+b.charAt(0).toUpperCase()+b.slice(1);this[f]!==d&&this[f](c),e=["initSelector","closeLinkSelector","closeLinkEvents","navigateEvents","closeEvents","history","container"],a.mobile.widget.prototype._setOption.apply(this,arguments),a.inArray(b,e)===-1&&this.element.attr("data-"+(a.mobile.ns||"")+b.replace(/([A-Z])/,"-$1").toLowerCase(),c)},_placementCoords:function(a){var b=f(),d={x:this._tolerance.l,y:b.y+this._tolerance.t,cx:b.cx-this._tolerance.l-this._tolerance.r,cy:b.cy-this._tolerance.t-this._tolerance.b},g,h;this._ui.container.css("max-width",d.cx),g={cx:this._ui.container.outerWidth(!0),cy:this._ui.container.outerHeight(!0)},h={x:e(d.cx,g.cx,d.x,a.x),y:e(d.cy,g.cy,d.y,a.y)},h.y=Math.max(0,h.y);var i=c.documentElement,j=c.body,k=Math.max(i.clientHeight,j.scrollHeight,j.offsetHeight,i.scrollHeight,i.offsetHeight);return h.y-=Math.min(h.y,Math.max(0,h.y+g.cy-k)),{left:h.x,top:h.y}},_createPrereqs:function(b,c,d){var e=this,f;f={screen:a.Deferred(),container:a.Deferred()},f.screen.then(function(){f===e._prereqs&&b()}),f.container.then(function(){f===e._prereqs&&c()}),a.when(f.screen,f.container).done(function(){f===e._prereqs&&(e._prereqs=null,d())}),e._prereqs=f},_animate:function(b){this._ui.screen.removeClass(b.classToRemove).addClass(b.screenClassToAdd),b.prereqs.screen.resolve(),b.transition&&b.transition!=="none"?(b.applyTransition&&this._applyTransition(b.transition),this._ui.container.animationComplete(a.proxy(b.prereqs.container,"resolve")).addClass(b.containerClassToAdd).removeClass(b.classToRemove)):b.prereqs.container.resolve()},_desiredCoords:function(b,c,d){var e=null,g,h=f();if(d&&d!=="origin")if(d==="window")b=h.cx/2+h.x,c=h.cy/2+h.y;else{try{e=a(d)}catch(i){e=null}e&&(e.filter(":visible"),e.length===0&&(e=null))}e&&(g=e.offset(),b=g.left+e.outerWidth()/2,c=g.top+e.outerHeight()/2);if(a.type(b)!=="number"||isNaN(b))b=h.cx/2+h.x;if(a.type(c)!=="number"||isNaN(c))c=h.cy/2+h.y;return{x:b,y:c}},_openPrereqsComplete:function(){var a=this;a._ui.container.addClass("ui-popup-active"),a._isOpen=!0,a._resizeScreen(),setTimeout(function(){a._ui.container.attr("tabindex","0").focus(),a._trigger("afteropen")})},_open:function(c){var d,e,f=function(){var a=b,c=navigator.userAgent,d=c.match(/AppleWebKit\/([0-9\.]+)/),e=!!d&&d[1],f=c.match(/Android (\d+(?:\.\d+))/),g=!!f&&f[1],h=c.indexOf("Chrome")>-1;return f!==null&&g==="4.0"&&e&&e>534.13&&!h?!0:!1}();c=c||{},e=c.transition||this.options.transition,this._trigger("beforeposition"),d=this._placementCoords(this._desiredCoords(c.x,c.y,c.positionTo||this.options.positionTo||"origin")),this._createPrereqs(a.noop,a.noop,a.proxy(this,"_openPrereqsComplete")),e?(this._currentTransition=e,this._applyTransition(e)):e=this.options.transition,this.options.theme||this._setTheme(this._page.jqmData("theme")||a.mobile.getInheritedTheme(this._page,"c")),this._ui.screen.removeClass("ui-screen-hidden"),this._ui.container.removeClass("ui-selectmenu-hidden").offset(d),this.options.overlayTheme&&f&&this.element.closest(".ui-page").addClass("ui-popup-open"),this._animate({additionalCondition:!0,transition:e,classToRemove:"",screenClassToAdd:"in",containerClassToAdd:"in",applyTransition:!1,prereqs:this._prereqs})},_closePrereqScreen:function(){this._ui.screen.removeClass("out").addClass("ui-screen-hidden")},_closePrereqContainer:function(){this._ui.container.removeClass("reverse out").addClass("ui-selectmenu-hidden").removeAttr("style")},_closePrereqsDone:function(){var b=this,c=b.options;b._ui.container.removeAttr("tabindex"),c.container.unbind(c.closeEvents),b.element.undelegate(c.closeLinkSelector,c.closeLinkEvents),a.mobile.popup.active=d,b._trigger("afterclose")},_close:function(){this._ui.container.removeClass("ui-popup-active"),this._page.removeClass("ui-popup-open"),this._isOpen=!1,this._createPrereqs(a.proxy(this,"_closePrereqScreen"),a.proxy(this,"_closePrereqContainer"),a.proxy(this,"_closePrereqsDone")),this._animate({additionalCondition:this._ui.screen.hasClass("in"),transition:this._currentTransition||this.options.transition,classToRemove:"in",screenClassToAdd:"out",containerClassToAdd:"reverse out",applyTransition:!0,prereqs:this._prereqs})},_destroy:function(){var b=this;b._close(),b._setTheme("none"),b.element.insertAfter(b._ui.placeholder).removeClass("ui-popup ui-overlay-shadow ui-corner-all"),b._ui.screen.remove(),b._ui.container.remove(),b._ui.placeholder.remove(),a.each(b._globalHandlers,function(b,c){a.each(c.handler,function(a,b){c.src.unbind(a,b)})})},_bindContainerClose:function(){var b=this;b.options.container.one(b.options.closeEvents,a.proxy(b._close,b))},open:function(b){var c=this,e=this.options,f,g,h,i,j,k;if(a.mobile.popup.active)return;a.mobile.popup.active=this;if(!e.history){c._open(b),c._bindContainerClose(),c.element.delegate(e.closeLinkSelector,e.closeLinkEvents,function(a){return c._close(),!1});return}g=a.mobile.dialogHashKey,h=a.mobile.activePage,i=h.is(".ui-dialog"),f=a.mobile.urlHistory.getActive().url,j=f.indexOf(g)>-1&&!i,k=a.mobile.urlHistory;if(j){c._open(b),c._bindContainerClose();return}f.indexOf(g)===-1&&!i?f=f+g:f=a.mobile.path.parseLocation().hash+g,k.activeIndex===0&&f===k.initialDst&&(f+=g),e.container.one(e.navigateEvents,function(a){a.preventDefault(),c._open(b),c._bindContainerClose()}),k.ignoreNextHashChange=i,k.addNew(f,d,d,d,"dialog"),a.mobile.path.set(f)},close:function(){if(!a.mobile.popup.active)return;this.options.history?a.mobile.back():this._close()}}),a.mobile.popup.handleLink=function(b){var c=b.closest(":jqmData(role='page')"),d=c.length===0?a("body"):c,e=a(a.mobile.path.parseUrl(b.attr("href")).hash,d[0]),f;e.data("popup")&&(f=b.offset(),e.popup("open",{x:f.left+b.outerWidth()/2,y:f.top+b.outerHeight()/2,transition:b.jqmData("transition"),positionTo:b.jqmData("position-to"),link:b})),setTimeout(function(){b.removeClass(a.mobile.activeBtnClass)},300)},a(c).bind("pagebeforechange",function(b,c){c.options.role==="popup"&&(a.mobile.popup.handleLink(c.options.link),b.preventDefault())}),a(c).bind("pagecreate create",function(b){a.mobile.popup.prototype.enhanceWithin(b.target,!0)})}(a),function(a){var b=a("meta[name=viewport]"),c=b.attr("content"),d=c+",maximum-scale=1, user-scalable=no",e=c+",maximum-scale=10, user-scalable=yes",f=/(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);a.mobile.zoom=a.extend({},{enabled:!f,locked:!1,disable:function(c){!f&&!a.mobile.zoom.locked&&(b.attr("content",d),a.mobile.zoom.enabled=!1,a.mobile.zoom.locked=c||!1)},enable:function(c){!f&&(!a.mobile.zoom.locked||c===!0)&&(b.attr("content",e),a.mobile.zoom.enabled=!0,a.mobile.zoom.locked=!1)},restore:function(){f||(b.attr("content",c),a.mobile.zoom.enabled=!0)}})}(a),function(a,d){a.widget("mobile.textinput",a.mobile.widget,{options:{theme:null,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"input[type='text'], input[type='search'], :jqmData(type='search'), input[type='number'], :jqmData(type='number'), input[type='password'], input[type='email'], input[type='url'], input[type='tel'], textarea, input[type='time'], input[type='date'], input[type='month'], input[type='week'], input[type='datetime'], input[type='datetime-local'], input[type='color'], input:not([type])",clearSearchButtonText:"clear text",disabled:!1},_create:function(){function m(){setTimeout(function(){l.toggleClass("ui-input-clear-hidden",!e.val())},0)}var d=this,e=this.element,f=this.options,g=f.theme||a.mobile.getInheritedTheme(this.element,"c"),h=" ui-body-"+g,i=e.jqmData("mini")===!0,j=i?" ui-mini":"",k,l;a("label[for='"+e.attr("id")+"']").addClass("ui-input-text"),k=e.addClass("ui-input-text ui-body-"+g),typeof e[0].autocorrect!="undefined"&&!a.support.touchOverflow&&(e[0].setAttribute("autocorrect","off"),e[0].setAttribute("autocomplete","off")),e.is("[type='search'],:jqmData(type='search')")?(k=e.wrap("<div class='ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield"+h+j+"'></div>").parent(),l=a("<a href='#' class='ui-input-clear' title='"+f.clearSearchButtonText+"'>"+f.clearSearchButtonText+"</a>").bind("click",function(a){e.val("").focus().trigger("change"),l.addClass("ui-input-clear-hidden"),a.preventDefault()}).appendTo(k).buttonMarkup({icon:"delete",iconpos:"notext",corners:!0,shadow:!0,mini:i}),m(),e.bind("paste cut keyup focus change blur",m)):e.addClass("ui-corner-all ui-shadow-inset"+h+j),e.focus(function(){k.addClass(a.mobile.focusClass)}).blur(function(){k.removeClass(a.mobile.focusClass)}).bind("focus",function(){f.preventFocusZoom&&a.mobile.zoom.disable(!0)}).bind("blur",function(){f.preventFocusZoom&&a.mobile.zoom.enable(!0)});if(e.is("textarea")){var n=15,o=100,p;this._keyup=function(){var a=e[0].scrollHeight,b=e[0].clientHeight;b<a&&e.height(a+n)},e.keyup(function(){clearTimeout(p),p=setTimeout(d._keyup,o)}),this._on(a(c),{pagechange:"_keyup"}),a.trim(e.val())&&this._on(a(b),{load:"_keyup"})}e.attr("disabled")&&this.disable()},disable:function(){var a;return this.element.attr("disabled",!0).is("[type='search'], :jqmData(type='search')")?a=this.element.parent():a=this.element,a.addClass("ui-disabled"),this._setOption("disabled",!0)},enable:function(){var a;return this.element.attr("disabled",!1).is("[type='search'], :jqmData(type='search')")?a=this.element.parent():a=this.element,a.removeClass("ui-disabled"),this._setOption("disabled",!1)}}),a(c).bind("pagecreate create",function(b){a.mobile.textinput.prototype.enhanceWithin(b.target,!0)})}(a),function(a,b){a.mobile.listview.prototype.options.filter=!1,a.mobile.listview.prototype.options.filterPlaceholder="Filter items...",a.mobile.listview.prototype.options.filterTheme="c";var d=function(a,b,c){return a.toString().toLowerCase().indexOf(b)===-1};a.mobile.listview.prototype.options.filterCallback=d,a(c).delegate(":jqmData(role='listview')","listviewcreate",function(){var b=a(this),c=b.data("listview");if(!c.options.filter)return;var e=a("<form>",{"class":"ui-listview-filter ui-bar-"+c.options.filterTheme,role:"search"}),f=a("<input>",{placeholder:c.options.filterPlaceholder}).attr("data-"+a.mobile.ns+"type","search").jqmData("lastval","").bind("keyup change",function(){var e=a(this),f=this.value.toLowerCase(),g=null,h=e.jqmData("lastval")+"",i=!1,j="",k,l=c.options.filterCallback!==d;c._trigger("beforefilter","beforefilter",{input:this}),e.jqmData("lastval",f),l||f.length<h.length||f.indexOf(h)!==0?g=b.children():g=b.children(":not(.ui-screen-hidden)");if(f){for(var m=g.length-1;m>=0;m--)k=a(g[m]),j=k.jqmData("filtertext")||k.text(),k.is("li:jqmData(role=list-divider)")?(k.toggleClass("ui-filter-hidequeue",!i),i=!1):c.options.filterCallback(j,f,k)?k.toggleClass("ui-filter-hidequeue",!0):i=!0;g.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden",!1),g.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden",!0).toggleClass("ui-filter-hidequeue",!1)}else g.toggleClass("ui-screen-hidden",!1);c._refreshCorners()}).appendTo(e).textinput();c.options.inset&&e.addClass("ui-listview-filter-inset"),e.bind("submit",function(){return!1}).insertBefore(b)})}(a),function(a,d){a.widget("mobile.slider",a.mobile.widget,{widgetEventPrefix:"slide",options:{theme:null,trackTheme:null,disabled:!1,initSelector:"input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",mini:!1},_create:function(){var e=this,f=this.element,g=a.mobile.getInheritedTheme(f,"c"),h=this.options.theme||g,i=this.options.trackTheme||g,j=f[0].nodeName.toLowerCase(),k=j==="select"?"ui-slider-switch":"",l=f.attr("id"),m=a("[for='"+l+"']"),n=m.attr("id")||l+"-label",o=m.attr("id",n),p=function(){return j==="input"?parseFloat(f.val()):f[0].selectedIndex},q=j==="input"?parseFloat(f.attr("min")):0,r=j==="input"?parseFloat(f.attr("max")):f.find("option").length-1,s=b.parseFloat(f.attr("step")||1),t=this.options.inline||f.jqmData("inline")===!0?" ui-slider-inline":"",u=this.options.mini||f.jqmData("mini")?" ui-slider-mini":"",v=c.createElement("a"),w=a(v),x=c.createElement("div"),y=a(x),z=f.jqmData("highlight")&&j!=="select"?function(){var b=c.createElement("div");return b.className="ui-slider-bg "+a.mobile.activeBtnClass+" ui-btn-corner-all",a(b).prependTo(y)}():!1,A;this._type=j,v.setAttribute("href","#"),x.setAttribute("role","application"),x.className=["ui-slider ",k," ui-btn-down-",i," ui-btn-corner-all",t,u].join(""),v.className="ui-slider-handle",x.appendChild(v),w.buttonMarkup({corners:!0,theme:h,shadow:!0}).attr({role:"slider","aria-valuemin":q,"aria-valuemax":r,"aria-valuenow":p(),"aria-valuetext":p(),title:p(),"aria-labelledby":n}),a.extend(this,{slider:y,handle:w,valuebg:z,dragging:!1,beforeStart:null,userModified:!1,mouseMoved:!1});if(j==="select"){var B=c.createElement("div");B.className="ui-slider-inneroffset";for(var C=0,D=x.childNodes.length;C<D;C++)B.appendChild(x.childNodes[C]);x.appendChild(B),w.addClass("ui-slider-handle-snapping"),A=f.find("option");for(var E=0,F=A.length;E<F;E++){var G=E?"a":"b",H=E?" "+a.mobile.activeBtnClass:" ui-btn-down-"+i,I=c.createElement("div"),J=c.createElement("span");J.className=["ui-slider-label ui-slider-label-",G,H," ui-btn-corner-all"].join(""),J.setAttribute("role","img"),J.appendChild(c.createTextNode(A[E].innerHTML)),a(J).prependTo(y)}e._labels=a(".ui-slider-label",y)}o.addClass("ui-slider"),f.addClass(j==="input"?"ui-slider-input":"ui-slider-switch").change(function(){e.mouseMoved||e.refresh(p(),!0)}).keyup(function(){e.refresh(p(),!0,!0)}).blur(function(){e.refresh(p(),!0)}),this._preventDocumentDrag=function(a){if(e.dragging&&!e.options.disabled)return e.mouseMoved=!0,j==="select"&&w.removeClass("ui-slider-handle-snapping"),e.refresh(a),e.userModified=e.beforeStart!==f[0].selectedIndex,!1},this._on(a(c),{vmousemove:this._preventDocumentDrag}),f.bind("vmouseup",a.proxy(e._checkedRefresh,e)),y.bind("vmousedown",function(a){return e.options.disabled?!1:(e.dragging=!0,e.userModified=!1,e.mouseMoved=!1,j==="select"&&(e.beforeStart=f[0].selectedIndex),e.refresh(a),e._trigger("start"),!1)}).bind("vclick",!1),this._sliderMouseUp=function(){if(e.dragging)return e.dragging=!1,j==="select"&&(w.addClass("ui-slider-handle-snapping"),e.mouseMoved?e.userModified?e.refresh(e.beforeStart===0?1:0):e.refresh(e.beforeStart):e.refresh(e.beforeStart===0?1:0)),e.mouseMoved=!1,e._trigger("stop"),!1},this._on(y.add(c),{vmouseup:this._sliderMouseUp}),y.insertAfter(f),j==="select"&&this.handle.bind({focus:function(){y.addClass(a.mobile.focusClass)},blur:function(){y.removeClass(a.mobile.focusClass)}}),this.handle.bind({vmousedown:function(){a(this).focus()},vclick:!1,keydown:function(b){var c=p();if(e.options.disabled)return;switch(b.keyCode){case a.mobile.keyCode.HOME:case a.mobile.keyCode.END:case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:b.preventDefault(),e._keySliding||(e._keySliding=!0,a(this).addClass("ui-state-active"))}switch(b.keyCode){case a.mobile.keyCode.HOME:e.refresh(q);break;case a.mobile.keyCode.END:e.refresh(r);break;case a.mobile.keyCode.PAGE_UP:case a.mobile.keyCode.UP:case a.mobile.keyCode.RIGHT:e.refresh(c+s);break;case a.mobile.keyCode.PAGE_DOWN:case a.mobile.keyCode.DOWN:case a.mobile.keyCode.LEFT:e.refresh(c-s)}},keyup:function(b){e._keySliding&&(e._keySliding=!1,a(this).removeClass("ui-state-active"))}}),this.refresh(d,d,!0)},_checkedRefresh:function(){this.value!=this._value()&&this.refresh(this._value())},_value:function(){return this._type==="input"?parseFloat(this.element.val()):this.element[0].selectedIndex},refresh:function(b,c,d){(this.options.disabled||this.element.attr("disabled"))&&this.disable(),this.value=this._value();var e=this.element,f,g=e[0].nodeName.toLowerCase(),h=g==="input"?parseFloat(e.attr("min")):0,i=g==="input"?parseFloat(e.attr("max")):e.find("option").length-1,j=g==="input"&&parseFloat(e.attr("step"))>0?parseFloat(e.attr("step")):1;if(typeof b=="object"){var k=b,l=8;if(!this.dragging||k.pageX<this.slider.offset().left-l||k.pageX>this.slider.offset().left+this.slider.width()+l)return;f=Math.round((k.pageX-this.slider.offset().left)/this.slider.width()*100)}else b==null&&(b=g==="input"?parseFloat(e.val()||0):e[0].selectedIndex),f=(parseFloat(b)-h)/(i-h)*100;if(isNaN(f))return;f<0&&(f=0),f>100&&(f=100);var m=f/100*(i-h)+h,n=(m-h)%j,o=m-n;Math.abs(n)*2>=j&&(o+=n>0?j:-j),m=parseFloat(o.toFixed(5)),m<h&&(m=h),m>i&&(m=i),this.handle.css("left",f+"%"),this.handle.attr({"aria-valuenow":g==="input"?m:e.find("option").eq(m).attr("value"),"aria-valuetext":g==="input"?m:e.find("option").eq(m).getEncodedText(),title:g==="input"?m:e.find("option").eq(m).getEncodedText()}),this.valuebg&&this.valuebg.css("width",f+"%");if(this._labels){var p=this.handle.width()/this.slider.width()*100,q=f&&p+(100-p)*f/100,r=f===100?0:Math.min(p+100-q,100);this._labels.each(function(){var b=a(this).is(".ui-slider-label-a");a(this).width((b?q:r)+"%")})}if(!d){var s=!1;g==="input"?(s=e.val()!==m,e.val(m)):(s=e[0].selectedIndex!==m,e[0].selectedIndex=m),!c&&s&&e.trigger("change")}},enable:function(){return this.element.attr("disabled",!1),this.slider.removeClass("ui-disabled").attr("aria-disabled",!1),this._setOption("disabled",!1)},disable:function(){return this.element.attr("disabled",!0),this.slider.addClass("ui-disabled").attr("aria-disabled",!0),this._setOption("disabled",!0)}}),a(c).bind("pagecreate create",function(b){a.mobile.slider.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){a.widget("mobile.selectmenu",a.mobile.widget,{options:{theme:null,disabled:!1,icon:"arrow-d",iconpos:"right",inline:!1,corners:!0,shadow:!0,iconshadow:!0,overlayTheme:"a",hidePlaceholderMenuItems:!0,closeText:"Close",nativeMenu:!0,preventFocusZoom:/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1,initSelector:"select:not( :jqmData(role='slider') )",mini:!1},_button:function(){return a("<div/>")},_setDisabled:function(a){return this.element.attr("disabled",a),this.button.attr("aria-disabled",a),this._setOption("disabled",a)},_focusButton:function(){var a=this;setTimeout(function(){a.button.focus()},40)},_selectOptions:function(){return this.select.find("option")},_preExtension:function(){var b="";!~this.element[0].className.indexOf("ui-btn-left")||(b=" ui-btn-left"),!~this.element[0].className.indexOf("ui-btn-right")||(b=" ui-btn-right"),this.select=this.element.wrap("<div class='ui-select"+b+"'>"),this.selectID=this.select.attr("id"),this.label=a("label[for='"+this.selectID+"']").addClass("ui-select"),this.isMultiple=this.select[0].multiple,this.options.theme||(this.options.theme=a.mobile.getInheritedTheme(this.select,"c"))},_create:function(){this._preExtension(),this._trigger("beforeCreate"),this.button=this._button();var c=this,d=this.options,e=d.inline||this.select.jqmData("inline"),f=d.mini||this.select.jqmData("mini"),g=d.icon?d.iconpos||this.select.jqmData("iconpos"):!1,h=this.select[0].selectedIndex===-1?0:this.select[0].selectedIndex,i=this.button.insertBefore(this.select).buttonMarkup({theme:d.theme,icon:d.icon,iconpos:g,inline:e,corners:d.corners,shadow:d.shadow,iconshadow:d.iconshadow,mini:f});this.setButtonText(),d.nativeMenu&&b.opera&&b.opera.version&&i.addClass("ui-select-nativeonly"),this.isMultiple&&(this.buttonCount=a("<span>").addClass("ui-li-count ui-btn-up-c ui-btn-corner-all").hide().appendTo(i.addClass("ui-li-has-count"))),(d.disabled||this.element.attr("disabled"))&&this.disable(),this.select.change(function(){c.refresh()}),this.build()},build:function(){var b=this;this.select.appendTo(b.button).bind("vmousedown",function(){b.button.addClass(a.mobile.activeBtnClass)}).bind("focus",function(){b.button.addClass(a.mobile.focusClass)}).bind("blur",function(){b.button.removeClass(a.mobile.focusClass)}).bind("focus vmouseover",function(){b.button.trigger("vmouseover")}).bind("vmousemove",function(){b.button.removeClass(a.mobile.activeBtnClass)}).bind("change blur vmouseout",function(){b.button.trigger("vmouseout").removeClass(a.mobile.activeBtnClass)}).bind("change blur",function(){b.button.removeClass("ui-btn-down-"+b.options.theme)}),b.button.bind("vmousedown",function(){b.options.preventFocusZoom&&a.mobile.zoom.disable(!0)}).bind("mouseup",function(){b.options.preventFocusZoom&&setTimeout(function(){a.mobile.zoom.enable(!0)},0)})},selected:function(){return this._selectOptions().filter(":selected")},selectedIndices:function(){var a=this;return this.selected().map(function(){return a._selectOptions().index(this)}).get()},setButtonText:function(){var b=this,d=this.selected(),e=this.placeholder,f=a(c.createElement("span"));this.button.find(".ui-btn-text").html(function(){return d.length?e=d.map(function(){return a(this).text()}).get().join(", "):e=b.placeholder,f.text(e).addClass(b.select.attr("class")).addClass(d.attr("class"))})},setButtonCount:function(){var a=this.selected();this.isMultiple&&this.buttonCount[a.length>1?"show":"hide"]().text(a.length)},refresh:function(){this.setButtonText(),this.setButtonCount()},open:a.noop,close:a.noop,disable:function(){this._setDisabled(!0),this.button.addClass("ui-disabled")},enable:function(){this._setDisabled(!1),this.button.removeClass("ui-disabled")}}),a(c).bind("pagecreate create",function(b){a.mobile.selectmenu.prototype.enhanceWithin(b.target,!0)})}(a),function(a,d){var e=function(d){var e=d.select,f=d.selectID,g=d.label,h=d.select.closest(".ui-page"),i=d._selectOptions(),j=d.isMultiple=d.select[0].multiple,k=f+"-button",l=f+"-menu",m=a("<div data-"+a.mobile.ns+"role='dialog' data-"+a.mobile.ns+"theme='"+d.options.theme+"' data-"+a.mobile.ns+"overlay-theme='"+d.options.overlayTheme+"'>"+"<div data-"+a.mobile.ns+"role='header'>"+"<div class='ui-title'>"+g.getEncodedText()+"</div>"+"</div>"+"<div data-"+a.mobile.ns+"role='content'></div>"+"</div>"),n=a("<div>",{"class":"ui-selectmenu"}).insertAfter(d.select).popup({theme:"a"}),o=a("<ul>",{"class":"ui-selectmenu-list",id:l,role:"listbox","aria-labelledby":k}).attr("data-"+a.mobile.ns+"theme",d.options.theme).appendTo(n),p=a("<div>",{"class":"ui-header ui-bar-"+d.options.theme}).prependTo(n),q=a("<h1>",{"class":"ui-title"}).appendTo(p),r,s,t;d.isMultiple&&(t=a("<a>",{text:d.options.closeText,href:"#","class":"ui-btn-left"}).attr("data-"+a.mobile.ns+"iconpos","notext").attr("data-"+a.mobile.ns+"icon","delete").appendTo(p).buttonMarkup()),a.extend(d,{select:d.select,selectID:f,buttonId:k,menuId:l,thisPage:h,menuPage:m,label:g,selectOptions:i,isMultiple:j,theme:d.options.theme,listbox:n,list:o,header:p,headerTitle:q,headerClose:t,menuPageContent:r,menuPageClose:s,placeholder:"",build:function(){var b=this;b.refresh(),b.select.attr("tabindex","-1").focus(function(){a(this).blur(),b.button.focus()}),b.button.bind("vclick keydown",function(c){if(c.type==="vclick"||c.keyCode&&(c.keyCode===a.mobile.keyCode.ENTER||c.keyCode===a.mobile.keyCode.SPACE))b.open(),c.preventDefault()}),b.list.attr("role","listbox").bind("focusin",function(b){a(b.target).attr("tabindex","0").trigger("vmouseover")}).bind("focusout",function(b){a(b.target).attr("tabindex","-1").trigger("vmouseout")}).delegate("li:not(.ui-disabled, .ui-li-divider)","click",function(c){var e=b.select[0].selectedIndex,f=b.list.find("li:not(.ui-li-divider)").index(this),g=b._selectOptions().eq(f)[0];g.selected=b.isMultiple?!g.selected:!0,b.isMultiple&&a(this).find(".ui-icon").toggleClass("ui-icon-checkbox-on",g.selected).toggleClass("ui-icon-checkbox-off",!g.selected),(b.isMultiple||e!==f)&&b.select.trigger("change"),b.isMultiple?b.list.find("li:not(.ui-li-divider)").eq(f).addClass("ui-btn-down-"+d.options.theme).find("a").first().focus():b.close(),c.preventDefault()}).keydown(function(b){var c=a(b.target),e=c.closest("li"),f,g;switch(b.keyCode){case 38:return f=e.prev().not(".ui-selectmenu-placeholder"),f.is(".ui-li-divider")&&(f=f.prev()),f.length&&(c.blur().attr("tabindex","-1"),f.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 40:return g=e.next(),g.is(".ui-li-divider")&&(g=g.next()),g.length&&(c.blur().attr("tabindex","-1"),g.addClass("ui-btn-down-"+d.options.theme).find("a").first().focus()),!1;case 13:case 32:return c.trigger("click"),!1}}),b.menuPage.bind("pagehide",function(){b.list.appendTo(b.listbox),b._focusButton(),a.mobile._bindPageRemove.call(b.thisPage)}),b.listbox.bind("popupafterclose",function(a){b.close()}),b.isMultiple&&b.headerClose.click(function(){if(b.menuType==="overlay")return b.close(),!1}),b.thisPage.addDependents(this.menuPage)},_isRebuildRequired:function(){var a=this.list.find("li"),b=this._selectOptions();return b.text()!==a.text()},selected:function(){return this._selectOptions().filter(":selected:not( :jqmData(placeholder='true') )")},refresh:function(b,c){var d=this,e=this.element,f=this.isMultiple,g;(b||this._isRebuildRequired())&&d._buildList(),g=this.selectedIndices(),d.setButtonText(),d.setButtonCount(),d.list.find("li:not(.ui-li-divider)").removeClass(a.mobile.activeBtnClass).attr("aria-selected",!1).each(function(b){if(a.inArray(b,g)>-1){var c=a(this);c.attr("aria-selected",!0),d.isMultiple?c.find(".ui-icon").removeClass("ui-icon-checkbox-off").addClass("ui-icon-checkbox-on"):c.is(".ui-selectmenu-placeholder")?c.next().addClass(a.mobile.activeBtnClass):c.addClass(a.mobile.activeBtnClass)}})},close:function(){if(this.options.disabled||!this.isOpen)return;var b=this;b.menuType==="page"?a.mobile.back():(b.listbox.popup("close"),b.list.appendTo(b.listbox),b._focusButton()),b.isOpen=!1},open:function(){function o(){var b=c.list.find("."+a.mobile.activeBtnClass+" a");b.length===0&&(b=c.list.find("li.ui-btn:not( :jqmData(placeholder='true') ) a")),b.first().focus().closest("li").addClass("ui-btn-down-"+d.options.theme)}if(this.options.disabled)return;var c=this,e=a(b),f=c.list.parent(),g=f.outerHeight(),h=f.outerWidth(),i=a("."+a.mobile.activePageClass),j=e.scrollTop(),k=c.button.offset().top,l=e.height(),n=e.width();c.button.addClass(a.mobile.activeBtnClass),setTimeout(function(){c.button.removeClass(a.mobile.activeBtnClass)},300),g>l-80||!a.support.scrollTop?(c.menuPage.appendTo(a.mobile.pageContainer).page(),c.menuPageContent=m.find(".ui-content"),c.menuPageClose=m.find(".ui-header a"),c.thisPage.unbind("pagehide.remove"),j===0&&k>l&&c.thisPage.one("pagehide",function(){a(this).jqmData("lastScroll",k)}),c.menuPage.one("pageshow",function(){o(),c.isOpen=!0}),c.menuType="page",c.menuPageContent.append(c.list),c.menuPage.find("div .ui-title").text(c.label.text()),a.mobile.changePage(c.menuPage,{transition:a.mobile.defaultDialogTransition})):(c.menuType="overlay",c.listbox.one("popupafteropen",o).popup("open",{x:c.button.offset().left+c.button.outerWidth()/2,y:c.button.offset().top+c.button.outerHeight()/2}),c.isOpen=!0)},_buildList:function(){var b=this,d=this.options,e=this.placeholder,f=!0,g=[],h=[],i=b.isMultiple?"checkbox-off":"false";b.list.empty().filter(".ui-listview").listview("destroy");var j=b.select.find("option"),k=j.length,l=this.select[0],m="data-"+a.mobile.ns,n=m+"option-index",o=m+"icon",p=m+"role",q=m+"placeholder",r=c.createDocumentFragment(),s=!1,t;for(var u=0;u<k;u++,s=!1){var v=j[u],w=a(v),x=v.parentNode,y=w.text(),z=c.createElement("a"),A=[];z.setAttribute("href","#"),z.appendChild(c.createTextNode(y));if(x!==l&&x.nodeName.toLowerCase()==="optgroup"){var B=x.getAttribute("label");if(B!==t){var C=c.createElement("li");C.setAttribute(p,"list-divider"),C.setAttribute("role","option"),C.setAttribute("tabindex","-1"),C.appendChild(c.createTextNode(B)),r.appendChild(C),t=B}}f&&(!v.getAttribute("value")||y.length===0||w.jqmData("placeholder"))&&(f=!1,s=!0,v.setAttribute(q,!0),d.hidePlaceholderMenuItems&&A.push("ui-selectmenu-placeholder"),e||(e=b.placeholder=y));var D=c.createElement("li");v.disabled&&(A.push("ui-disabled"),D.setAttribute("aria-disabled",!0)),D.setAttribute(n,u),D.setAttribute(o,i),s&&D.setAttribute(q,!0),D.className=A.join(" "),D.setAttribute("role","option"),z.setAttribute("tabindex","-1"),D.appendChild(z),r.appendChild(D)}b.list[0].appendChild(r),!this.isMultiple&&!e.length?this.header.hide():this.headerTitle.text(this.placeholder),b.list.listview()},_button:function(){return a("<a>",{href:"#",role:"button",id:this.buttonId,"aria-haspopup":"true","aria-owns":this.menuId})}})};a(c).bind("selectmenubeforecreate",function(b){var c=a(b.target).data("selectmenu");!c.options.nativeMenu&&c.element.parents(":jqmData(role='popup')").length===0&&e(c)})}(a),function(a,d){a.widget("mobile.fixedtoolbar",a.mobile.widget,{options:{visibleOnPageShow:!0,disablePageZoom:!0,transition:"slide",fullscreen:!1,tapToggle:!0,tapToggleBlacklist:"a, button, input, select, textarea, .ui-header-fixed, .ui-footer-fixed, .ui-popup",hideDuringFocus:"input, textarea, select",updatePagePadding:!0,trackPersistentToolbars:!0,supportBlacklist:function(){var a=b,c=navigator.userAgent,d=navigator.platform,e=c.match(/AppleWebKit\/([0-9]+)/),f=!!e&&e[1],g=c.match(/Fennec\/([0-9]+)/),h=!!g&&g[1],i=c.match(/Opera Mobi\/([0-9]+)/),j=!!i&&i[1];return(d.indexOf("iPhone")>-1||d.indexOf("iPad")>-1||d.indexOf("iPod")>-1)&&f&&f<534||a.operamini&&{}.toString.call(a.operamini)==="[object OperaMini]"||i&&j<7458||c.indexOf("Android")>-1&&f&&f<533||h&&h<6||"palmGetResource"in b&&f&&f<534||c.indexOf("MeeGo")>-1&&c.indexOf("NokiaBrowser/8.5.0")>-1?!0:!1},initSelector:":jqmData(position='fixed')"},_create:function(){var a=this,b=a.options,c=a.element,d=c.is(":jqmData(role='header')")?"header":"footer",e=c.closest(".ui-page");if(b.supportBlacklist()){a.destroy();return}c.addClass("ui-"+d+"-fixed"),b.fullscreen?(c.addClass("ui-"+d+"-fullscreen"),e.addClass("ui-page-"+d+"-fullscreen")):e.addClass("ui-page-"+d+"-fixed"),a._addTransitionClass(),a._bindPageEvents(),a._bindToggleHandlers()},_addTransitionClass:function(){var a=this.options.transition;a&&a!=="none"&&(a==="slide"&&(a=this.element.is(".ui-header")?"slidedown":"slideup"),this.element.addClass(a))},_bindPageEvents:function(){var c=this,d=c.options,e=c.element;e.closest(".ui-page").bind("pagebeforeshow",function(){d.disablePageZoom&&a.mobile.zoom.disable(!0),d.visibleOnPageShow||c.hide(!0)}).bind("webkitAnimationStart animationstart updatelayout",function(){var a=this;d.updatePagePadding&&c.updatePagePadding(a)}).bind("pageshow",function(){var e=this;c.updatePagePadding(e),d.updatePagePadding&&a(b).bind("throttledresize."+c.widgetName,function(){c.updatePagePadding(e)})}).bind("pagebeforehide",function(e,f){d.disablePageZoom&&a.mobile.zoom.enable(!0),d.updatePagePadding&&a(b).unbind("throttledresize."+c.widgetName);if(d.trackPersistentToolbars){var g=a(".ui-footer-fixed:jqmData(id)",this),h=a(".ui-header-fixed:jqmData(id)",this),i=g.length&&f.nextPage&&a(".ui-footer-fixed:jqmData(id='"+g.jqmData("id")+"')",f.nextPage)||a(),j=h.length&&f.nextPage&&a(".ui-header-fixed:jqmData(id='"+h.jqmData("id")+"')",f.nextPage)||a();if(i.length||j.length)i.add(j).appendTo(a.mobile.pageContainer),f.nextPage.one("pageshow",function(){i.add(j).appendTo(this)})}})},_visible:!0,updatePagePadding:function(b){var c=this.element,d=c.is(".ui-header");if(this.options.fullscreen)return;b=b||c.closest(".ui-page"),a(b).css("padding-"+(d?"top":"bottom"),c.outerHeight())},_useTransition:function(c){var d=a(b),e=this.element,f=d.scrollTop(),g=e.height(),h=e.closest(".ui-page").height(),i=a.mobile.getScreenHeight(),j=e.is(":jqmData(role='header')")?"header":"footer";return!c&&(this.options.transition&&this.options.transition!=="none"&&(j==="header"&&!this.options.fullscreen&&f>g||j==="footer"&&!this.options.fullscreen&&f+i<h-g)||this.options.fullscreen)},show:function(a){var b="ui-fixed-hidden",c=this.element;this._useTransition(a)?c.removeClass("out "+b).addClass("in"):c.removeClass(b),this._visible=!0},hide:function(a){var b="ui-fixed-hidden",c=this.element,d="out"+(this.options.transition==="slide"?" reverse":"");this._useTransition(a)?c.addClass(d).removeClass("in").animationComplete(function(){c.addClass(b).removeClass(d)}):c.addClass(b).removeClass(d),this._visible=!1},toggle:function(){this[this._visible?"hide":"show"]()},_bindToggleHandlers:function(){var b=this,c=b.options,d=b.element;d.closest(".ui-page").bind("vclick",function(d){c.tapToggle&&!a(d.target).closest(c.tapToggleBlacklist).length&&b.toggle()}).bind("focusin focusout",function(d){screen.width<500&&a(d.target).is(c.hideDuringFocus)&&!a(d.target).closest(".ui-header-fixed, .ui-footer-fixed").length&&b[d.type==="focusin"&&b._visible?"hide":"show"]()})},destroy:function(){this.element.removeClass("ui-header-fixed ui-footer-fixed ui-header-fullscreen ui-footer-fullscreen in out fade slidedown slideup ui-fixed-hidden"),this.element.closest(".ui-page").removeClass("ui-page-header-fixed ui-page-footer-fixed ui-page-header-fullscreen ui-page-footer-fullscreen")}}),a(c).bind("pagecreate create",function(b){a(b.target).jqmData("fullscreen")&&a(a.mobile.fixedtoolbar.prototype.options.initSelector,b.target).not(":jqmData(fullscreen)").jqmData("fullscreen",!0),a.mobile.fixedtoolbar.prototype.enhanceWithin(b.target)})}(a),function(a,b){function i(a){d=a.originalEvent,h=d.accelerationIncludingGravity,e=Math.abs(h.x),f=Math.abs(h.y),g=Math.abs(h.z),!b.orientation&&(e>7||(g>6&&f<8||g<8&&f>6)&&e>5)?c.enabled&&c.disable():c.enabled||c.enable()}if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1))return;var c=a.mobile.zoom,d,e,f,g,h;a(b).bind("orientationchange.iosorientationfix",c.enable).bind("devicemotion.iosorientationfix",i)}(a,this),function(a,b,d){function h(){e.removeClass("ui-mobile-rendering")}var e=a("html"),f=a("head"),g=a(b);a(b.document).trigger("mobileinit");if(!a.mobile.gradeA())return;a.mobile.ajaxBlacklist&&(a.mobile.ajaxEnabled=!1),e.addClass("ui-mobile ui-mobile-rendering"),setTimeout(h,5e3),a.extend(a.mobile,{initializePage:function(){var b=a(":jqmData(role='page'), :jqmData(role='dialog')"),d=a.mobile.path.parseLocation().hash.replace("#",""),e=c.getElementById(d);b.length||(b=a("body").wrapInner("<div data-"+a.mobile.ns+"role='page'></div>").children(0)),b.each(function(){var b=a(this);b.jqmData("url")||b.attr("data-"+a.mobile.ns+"url",b.attr("id")||location.pathname+location.search)}),a.mobile.firstPage=b.first(),a.mobile.pageContainer=b.first().parent().addClass("ui-mobile-viewport"),g.trigger("pagecontainercreate"),a.mobile.showPageLoadingMsg(),h(),!a.mobile.hashListeningEnabled||!a.mobile.path.isHashValid(location.hash)||!a(e).is(':jqmData(role="page")')&&!a.mobile.path.isPath(d)&&d!==a.mobile.dialogHashKey?(a.mobile.path.isHashValid(location.hash)&&(a.mobile.urlHistory.initialDst=d.replace("#","")),a.mobile.changePage(a.mobile.firstPage,{transition:"none",reverse:!0,changeHash:!1,fromHashChange:!0})):g.trigger("hashchange",[!0])}}),a.mobile.navreadyDeferred.resolve(),a(function(){b.scrollTo(0,1),a.mobile.defaultHomeScroll=!a.support.scrollTop||a(b).scrollTop()===1?0:1,a.fn.controlgroup&&a(c).bind("pagecreate create",function(b){a(":jqmData(role='controlgroup')",b.target).jqmEnhanceable().controlgroup({excludeInvisible:!1})}),a.mobile.autoInitializePage&&a.mobile.initializePage(),g.load(a.mobile.silentScroll),a.support.cssPointerEvents||a(c).delegate(".ui-disabled","vclick",function(a){a.preventDefault(),a.stopImmediatePropagation()})})}(a,this)});/*!
 * jQuery Corners 0.3
 * Copyright (c) 2008 David Turnbull, Steven Wittens
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 */

jQuery.fn.corners = function(options) {
  var doneClass = 'rounded_by_jQuery_corners'; /* To prevent double rounding */
  var settings = parseOptions(options);
  var webkitAvailable = false;
  try {
    webkitAvailable = (document.body.style.WebkitBorderRadius !== undefined);
    /* Google Chrome corners look awful */
    var versionIndex = navigator.userAgent.indexOf('Chrome');
    if (versionIndex >= 0) webkitAvailable = false;
  } catch(err) {}
  var mozillaAvailable = false;
  try {
    mozillaAvailable = (document.body.style.MozBorderRadius !== undefined);
    /* Firefox 2 corners look worse */
    var versionIndex = navigator.userAgent.indexOf('Firefox');
    if (versionIndex >= 0 && parseInt(navigator.userAgent.substring(versionIndex+8)) < 3) mozillaAvailable = false;
  } catch(err) {}
  return this.each(function(i,e){
    $e = jQuery(e);
    if ($e.hasClass(doneClass)) return;
    $e.addClass(doneClass);
    var classScan = /{(.*)}/.exec(e.className);
    var s = classScan ? parseOptions(classScan[1], settings) : settings;
    var nodeName = e.nodeName.toLowerCase();
    if (nodeName=='input') e = changeInput(e);
    if (webkitAvailable && s.webkit) roundWebkit(e, s);
    else if(mozillaAvailable && s.mozilla && (s.sizex == s.sizey)) roundMozilla(e, s);
    else {
      var bgColor = backgroundColor(e.parentNode);
      var fgColor = backgroundColor(e);
      switch (nodeName) {
        case 'a':
        case 'input':
          roundLink(e, s, bgColor, fgColor);
          break;
        default:
          roundDiv(e, s, bgColor, fgColor);
          break;
      }
    }
  });
  
  function roundWebkit(e, s) {
    var radius = '' + s.sizex + 'px ' + s.sizey + 'px';
    var $e = jQuery(e);
    if (s.tl) $e.css('WebkitBorderTopLeftRadius', radius);
    if (s.tr) $e.css('WebkitBorderTopRightRadius', radius);
    if (s.bl) $e.css('WebkitBorderBottomLeftRadius', radius);
    if (s.br) $e.css('WebkitBorderBottomRightRadius', radius);
  }
  
  function roundMozilla(e, s)
  {  
    var radius = '' + s.sizex + 'px';
    var $e = jQuery(e);
    if (s.tl) $e.css('-moz-border-radius-topleft', radius);
    if (s.tr) $e.css('-moz-border-radius-topright', radius);
    if (s.bl) $e.css('-moz-border-radius-bottomleft', radius);
    if (s.br) $e.css('-moz-border-radius-bottomright', radius);  
  }
  
  function roundLink(e, s, bgColor, fgColor) {
    var table = tableElement("table");
    var tbody = tableElement("tbody");
    table.appendChild(tbody);
    var tr1 = tableElement("tr");
    var td1 = tableElement("td", "top");
    tr1.appendChild(td1);
    var tr2 = tableElement("tr");
    var td2 = relocateContent(e, s, tableElement("td"));
    tr2.appendChild(td2);
    var tr3 = tableElement("tr");
    var td3 = tableElement("td", "bottom");
    tr3.appendChild(td3);
    if (s.tl||s.tr) {
      tbody.appendChild(tr1);
      addCorners(td1, s, bgColor, fgColor, true);
    }
    tbody.appendChild(tr2);
    if (s.bl||s.br) {
      tbody.appendChild(tr3);
      addCorners(td3, s, bgColor, fgColor, false);
    }
    e.appendChild(table);
    /* Clicking on $('a>table') in IE will trigger onclick but not the href  */
    if (jQuery.browser.msie) table.onclick = ieLinkBypass;
    /* Firefox 2 will render garbage unless we hide the overflow here */
    e.style.overflow = 'hidden';
  }
  
  function ieLinkBypass() {
    if (!this.parentNode.onclick) this.parentNode.click();
  }
  
  function changeInput(e) {
    var a1 = document.createElement("a");
    a1.id = e.id;
    a1.className = e.className;
    if (e.onclick) {
      a1.href = 'javascript:'
      a1.onclick = e.onclick;
    } else {
      jQuery(e).parent('form').each(function() {a1.href = this.action;});
      a1.onclick = submitForm;
    }
    var a2 = document.createTextNode(e.value);
    a1.appendChild(a2);
    e.parentNode.replaceChild(a1, e);
    return a1;
  }

  function submitForm() {
    jQuery(this).parent('form').each(function() {this.submit()});
    return false;
  }

  function roundDiv(e, s, bgColor, fgColor) {
    var div = relocateContent(e, s, document.createElement('div'));
    e.appendChild(div);
    if (s.tl||s.tr) addCorners(e, s, bgColor, fgColor, true);
    if (s.bl||s.br) addCorners(e, s, bgColor, fgColor, false);
  }
  
  function relocateContent(e, s, d) {
    var $e = jQuery(e);
    var c;
    while(c=e.firstChild) d.appendChild(c);
    if (e.style.height) {
      var h = parseInt($e.css('height'));
      d.style.height = h + 'px';
      h += parseInt($e.css('padding-top')) + parseInt($e.css('padding-bottom'));
      e.style.height = h + 'px';
    }
    if (e.style.width) {
      var w = parseInt($e.css('width'));
      d.style.width = w + 'px';
      w += parseInt($e.css('padding-left')) + parseInt($e.css('padding-right'));
      e.style.width = w + 'px';
    }
    d.style.paddingLeft = $e.css('padding-left');
    d.style.paddingRight = $e.css('padding-right');
    if (s.tl||s.tr) {
      d.style.paddingTop = adjustedPadding(e, s, $e.css('padding-top'), true);
    } else {
      d.style.paddingTop = $e.css('padding-top');
    }
    if (s.bl||s.br) {
      d.style.paddingBottom = adjustedPadding(e, s, $e.css('padding-bottom'), false);
    } else {
      d.style.paddingBottom = $e.css('padding-bottom');
    }
    e.style.padding = 0;
    return d;
  }
  
  function adjustedPadding(e, s, pad, top) {
    if (pad.indexOf("px") < 0) {
      try {
        //TODO Make this check work otherwise remove it
        console.error('%s padding not in pixels', (top ? 'top' : 'bottom'), e);
      }
      catch(err) {}
      pad = s.sizey + 'px';
    }
    pad = parseInt(pad);
    if (pad - s.sizey < 0) {
      try {
        console.error('%s padding is %ipx for %ipx corner:', (top ? 'top' : 'bottom'), pad, s.sizey, e);
      }
      catch(err) {}
      pad = s.sizey;
    }
    return pad - s.sizey + 'px';
  }

  function tableElement(kind, valign) {
    var e = document.createElement(kind)
    e.style.border = 'none';
    e.style.borderCollapse = 'collapse';
    e.style.borderSpacing = 0;
    e.style.padding = 0;
    e.style.margin = 0;
    if (valign) e.style.verticalAlign = valign;
    return e;
  }
  
  function backgroundColor(e) {
    try {
      var c = jQuery.css(e, "background-color");
      if ( c.match(/^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/i) && e.parentNode )
         return backgroundColor(e.parentNode);
      if (c==null)
        return "#ffffff";
      if (c.indexOf("rgb") > -1)
    	  c = rgb2hex(c);
      if (c.length == 4)
  	    c = hexShort2hex(c);
      return c;
    } catch(err) {
      return "#ffffff";
    }
  }
  
  function hexShort2hex(c) {
    return '#' +
    c.substring(1,2) +
    c.substring(1,2) +
    c.substring(2,3) +
    c.substring(2,3) +
    c.substring(3,4) +
    c.substring(3,4);
  }

  function rgb2hex(c) {
  	var x = 255;
  	var hex = '';
  	var i;
  	var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
  	var array=regexp.exec(c);
  	for(i=1;i<4;i++) hex += ('0'+parseInt(array[i]).toString(16)).slice(-2);
  	return '#'+hex;
  }
  
  function parseOptions(options, settings) {
    var options = options || '';
    var s = {sizex:5, sizey:5, tl: false, tr: false, bl: false, br: false, webkit:true, mozilla: true, transparent:false};
    if (settings) {
      s.sizex = settings.sizex;
      s.sizey = settings.sizey;
      s.webkit = settings.webkit;
      s.transparent = settings.transparent;
      s.mozilla = settings.mozilla;
    }
    var sizex_set = false;
    var corner_set = false;
    jQuery.each(options.split(' '), function(idx, option) {
      option = option.toLowerCase();
      var i = parseInt(option);
      if (i > 0 && option == i + 'px') {
        s.sizey = i;
        if (!sizex_set) s.sizex = i;
        sizex_set = true;
      } else switch (option) {
        case 'no-native': s.webkit = s.mozilla = false; break;
        case 'webkit': s.webkit = true; break;
        case 'no-webkit': s.webkit = false; break;
        case 'mozilla': s.mozilla = true; break;
        case 'no-mozilla': s.mozilla = false; break;
        case 'anti-alias': s.transparent = false; break;
        case 'transparent': s.transparent = true; break;
        case 'top': corner_set = s.tl = s.tr = true; break;
        case 'right': corner_set = s.tr = s.br = true; break;
        case 'bottom': corner_set = s.bl = s.br = true; break;
        case 'left': corner_set = s.tl = s.bl = true; break;
        case 'top-left': corner_set = s.tl = true; break;
        case 'top-right': corner_set = s.tr = true; break;
        case 'bottom-left': corner_set = s.bl = true; break;
        case 'bottom-right': corner_set = s.br = true; break;
      }
    });
    if (!corner_set) {
      if (!settings) {
        s.tl = s.tr = s.bl = s.br = true;
      } else {
        s.tl = settings.tl;
        s.tr = settings.tr;
        s.bl = settings.bl;
        s.br = settings.br;
      }
    }
    return s;
  }
  
  function alphaBlend(a, b, alpha) {
    var ca = Array(
      parseInt('0x' + a.substring(1, 3)),
      parseInt('0x' + a.substring(3, 5)),
      parseInt('0x' + a.substring(5, 7))
    );
    var cb = Array(
      parseInt('0x' + b.substring(1, 3)),
      parseInt('0x' + b.substring(3, 5)),
      parseInt('0x' + b.substring(5, 7))
    );
    r = '0' + Math.round(ca[0] + (cb[0] - ca[0])*alpha).toString(16);
    g = '0' + Math.round(ca[1] + (cb[1] - ca[1])*alpha).toString(16);
    b = '0' + Math.round(ca[2] + (cb[2] - ca[2])*alpha).toString(16);
    return '#'
      + r.substring(r.length - 2)
      + g.substring(g.length - 2)
      + b.substring(b.length - 2);
  }

  function addCorners(e, s, bgColor, fgColor, top) {
    if (s.transparent) addTransparentCorners(e, s, bgColor, top);
    else addAntiAliasedCorners(e, s, bgColor, fgColor, top);
  }
  
  function addAntiAliasedCorners(e, s, bgColor, fgColor, top) {
    var i, j;
    var d = document.createElement("div");
    d.style.fontSize = '1px';
    d.style.backgroundColor = bgColor;
    var lastarc = 0;
    for (i = 1; i <= s.sizey; i++) {
      var coverage, arc2, arc3;
      // Find intersection of arc with bottom of pixel row
      arc = Math.sqrt(1.0 - Math.pow(1.0 - i / s.sizey, 2)) * s.sizex;
      // Calculate how many pixels are bg, fg and blended.
      var n_bg = s.sizex - Math.ceil(arc);
      var n_fg = Math.floor(lastarc);
      var n_aa = s.sizex - n_bg - n_fg;
      // Create pixel row wrapper
      var x = document.createElement("div");
      var y = d;
      x.style.margin = "0px " + n_bg + "px";
      x.style.height = '1px';
      x.style.overflow = 'hidden';
      // Create the pixel divs for a row (at least one)
      for (j = 1; j <= n_aa; j++) {
        // Calculate coverage per pixel (approximates arc within the pixel)
        if (j == 1) {
          if (j == n_aa) {
            // Single pixel
            coverage = ((arc + lastarc) * .5) - n_fg;
          }
          else {
            // First in a run
            arc2 = Math.sqrt(1.0 - Math.pow(1.0 - (n_bg + 1) / s.sizex, 2)) * s.sizey;
            coverage = (arc2 - (s.sizey - i)) * (arc - n_fg - n_aa + 1) * .5;
          }
        }
        else if (j == n_aa) {
          // Last in a run
          arc2 = Math.sqrt(1.0 - Math.pow((s.sizex - n_bg - j + 1) / s.sizex, 2)) * s.sizey;
          coverage = 1.0 - (1.0 - (arc2 - (s.sizey - i))) * (1.0 - (lastarc - n_fg)) * .5;
        }
        else {
          // Middle of a run
          arc3 = Math.sqrt(1.0 - Math.pow((s.sizex - n_bg - j) / s.sizex, 2)) * s.sizey;
          arc2 = Math.sqrt(1.0 - Math.pow((s.sizex - n_bg - j + 1) / s.sizex, 2)) * s.sizey;
          coverage = ((arc2 + arc3) * .5) - (s.sizey - i);
        }
        
        addCornerDiv(s, x, y, top, alphaBlend(bgColor, fgColor, coverage));
        y = x;
        var x = y.cloneNode(false);
        x.style.margin = "0px 1px";
      }
      addCornerDiv(s, x, y, top, fgColor);
      lastarc = arc;
    }
    if (top)
      e.insertBefore(d, e.firstChild);
    else
      e.appendChild(d);
  }
  
  function addCornerDiv(s, x, y, top, color) {
    if (top && !s.tl) x.style.marginLeft = 0;
    if (top && !s.tr) x.style.marginRight = 0;
    if (!top && !s.bl) x.style.marginLeft = 0;
    if (!top && !s.br) x.style.marginRight = 0;
    x.style.backgroundColor = color;
    if (top)
      y.appendChild(x);
    else
      y.insertBefore(x, y.firstChild);
  }

  function addTransparentCorners(e, s, bgColor, top) {
    var d = document.createElement("div");
    d.style.fontSize = '1px';
    var strip = document.createElement('div');
    strip.style.overflow = 'hidden';
    strip.style.height = '1px';
    strip.style.borderColor = bgColor;
    strip.style.borderStyle = 'none solid';
    var sizex = s.sizex-1;
    var sizey = s.sizey-1;
    if (!sizey) sizey = 1; /* hint for 1x1 */
    for (var i=0; i < s.sizey; i++) {
      var w = sizex - Math.floor(Math.sqrt(1.0 - Math.pow(1.0 - i / sizey, 2)) * sizex);
      if (i==2 && s.sizex==6 && s.sizey==6) w = 2; /* hint for 6x6 */
      var x = strip.cloneNode(false);
      x.style.borderWidth = '0 '+ w +'px';
      if (top) x.style.borderWidth = '0 '+(s.tr?w:0)+'px 0 '+(s.tl?w:0)+'px';
      else x.style.borderWidth = '0 '+(s.br?w:0)+'px 0 '+(s.bl?w:0)+'px';
      top ? d.appendChild(x) : d.insertBefore(x, d.firstChild);
    } 
    if (top)
      e.insertBefore(d, e.firstChild);
    else
      e.appendChild(d);
  }
};

/*!
 * jQuery Form Plugin
 * version: 2.69 (06-APR-2011)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function') {
		options = { success: options };
	}

	var action = this.attr('action');
	var url = (typeof action === 'string') ? $.trim(action) : '';
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	}
	url = url || window.location.href || '';

	options = $.extend(true, {
		url:  url,
		success: $.ajaxSettings.success,
		type: this[0].getAttribute('method') || 'GET', // IE7 massage (see issue 57)
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (n in options.data) {
			if(options.data[n] instanceof Array) {
				for (var k in options.data[n]) {
					a.push( { name: n, value: options.data[n][k] } );
				}
			}
			else {
				v = options.data[n];
				v = $.isFunction(v) ? v() : v; // if value is fn, invoke it
				a.push( { name: n, value: v } );
			}
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}

	var $form = this, callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(); });
	}

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;   // jQuery 1.4+ supports scope context 
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};

	// are there files to upload?
	var fileInputs = $('input:file', this).length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive) {
		   $.get(options.closeKeepAlive, fileUpload);
		}
	   else {
		   fileUpload();
		}
   }
   else {
		$.ajax(options);
   }

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit],:input[id=submit]', form).length) {
			// if there is an input with a name or id of 'submit' then we won't be
			// able to invoke the submit fn on the form (at least not x-browser)
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		
		var s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		var id = 'jqFormIO' + (new Date().getTime()), fn = '_'+id;
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ s.iframeSrc +'" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				log('aborting upload...');
				var e = 'aborted';
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, 'error', e);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
				s.complete && s.complete.call(s.context, xhr, 'error');
			}
		};

		var g = s.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}

		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) { 
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}

		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST') {
				form.setAttribute('method', 'POST');
			}
			if (form.getAttribute('action') != s.url) {
				form.setAttribute('action', s.url);
			}

			// ie borks in some cases when setting encoding
			if (! s.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (s.timeout) {
				setTimeout(function() { timedOut = true; cb(); }, s.timeout);
			}

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+s.extraData[n]+'" />')
								.appendTo(form)[0]);
					}
				}

				// add iframe to doc and submit the form
				$io.appendTo('body');
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}

		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}
	
		var data, doc, domCheckCount = 50;

		function cb() {
			if (xhr.aborted) {
				return;
			}
			
			var doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
			if (!doc || doc.location.href == s.iframeSrc) {
				// response not received yet
				if (!timedOut)
					return;
			}
            io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var ok = true;
			try {
				if (timedOut) {
					throw 'timeout';
				}

				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					// let this fall through because server response could be an empty document
					//log('Could not access iframe DOM after mutiple tries.');
					//throw 'DOMException: not available';
				}

				//log('response detected');
				xhr.responseText = doc.body ? doc.body.innerHTML : doc.documentElement ? doc.documentElement.innerHTML : null; 
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};

				var scr = /(json|script)/.test(s.dataType);
				if (scr || s.textarea) {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
					}
					else if (scr) {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.textContent;
						}
						else if (b) {
							xhr.responseText = b.innerHTML;
						}
					}			  
				}
				else if (s.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				
				data = httpData(xhr, s.dataType, s);
			}
			catch(e){
				log('error caught:',e);
				ok = false;
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, 'error', e);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
			}
			
			if (xhr.aborted) {
				log('upload aborted');
				ok = false;
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				s.success && s.success.call(s.context, data, 'success', xhr);
				g && $.event.trigger("ajaxSuccess", [xhr, s]);
			}
			
			g && $.event.trigger("ajaxComplete", [xhr, s]);

			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}
			
			s.complete && s.complete.call(s.context, xhr, ok ? 'success' : 'error');

			// clean up
			setTimeout(function() {
				$io.removeData('form-plugin-onload');
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		}

		var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
		};
		var parseJSON = $.parseJSON || function(s) {
			return window['eval']('(' + s + ')');
		};
		
		var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4
			var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

			if (xml && data.documentElement.nodeName === 'parsererror') {
				$.error && $.error('parsererror');
			}
			if (s && s.dataFilter) {
				data = s.dataFilter(data, type);
			}
			if (typeof data === 'string') {
				if (type === 'json' || !type && ct.indexOf('json') >= 0) {
					data = parseJSON(data);
				} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
					$.globalEval(data);
				}
			}
			return data;
		};
	}
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	// in jQuery 1.3+ we can fix mistakes with the ready state
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}
	
	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}
	
	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v});
		}
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea') {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug) {
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
		if (window.console && window.console.log) {
			window.console.log(msg);
		}
		else if (window.opera && window.opera.postError) {
			window.opera.postError(msg);
		}
	}
};

})(jQuery);
var ntLookupKey = 113;
var mobilemode = true;

(function( $, undefined ) {

// var equates and global variables here/

var tAccordion = 1;
var tTab       = 2;
var tPlain     = 3;
var tRound     = 4;
var tTabXP     = 5;
var tNone      = 6;
var tWizard    = 7;

$.widget("ui.ntform",  $.mobile.widget, {
   // default options
        options: {
			defaultButton: '',
			tabType: 0,
			popup:0,
			parent:'',
			procedure: '',
			action: '',
			actionCancel: '',
			actionTarget: '',
			addSec: '',
			confirmDelete:0,
			confirmDeleteMessage:'Are you sure you want to delete this record?',
			yesDeleteText:'Delete',
			noDeleteText:'No',
			confirmCancel: 0,
			confirmCancelMessage:'Are you sure you want to cancel?',
			yesCancelText:'Cancel',
			noCancelText:'No',
			confirmText:'Confirm',
			actionCancelTarget: '' ,
			urlExt:'',
			dirty:0
		},
		lastChangeValue:'',
		//------------------------------------------------------
		_create: function() {
			if (this.options.urlExt==''){try{this.options.urlExt=ntdExt} catch(e){};}			
			this.ready();
			this.firstFocus();
		},
		//------------------------------------------------------
		ready: function() {
			var _this=this;
			if (this.options.popup==1){
				try{
					if ($("#popup_" + this.options.procedure + "_div").dialog("option","title")=''){
						$("#popup_" + this.options.procedure + "_div").dialog("option","title",this.options.title);
					}	
				} catch (e) {};	
			}	
			this._bindEvents(this);
		},
		//------------------------------------------------------
		_bindEvents: function(){
			var _this = this;
			$(this.element).find('input').not('.nt-locator')
				.off('keypress.ntform').on('keypress.ntform',function(e){return _this._onKeyPress(this,e);})
				.off('keydown.ntform').on('keydown.ntform',function(e){return _this._onKeyDown(this,e);})
				.off('focus.ntform').on('focus.ntform',function(e){return _this.focus(this);})
				.off('blur.ntform').on('blur.ntform',function(e){return _this.blur(this);});
			$(this.element).find('textarea').not('.nt-locator').off('blur.ntform').on('blur.ntform',function(e){return _this.blur(this);});
			$(this.element).find('[data-form="'+_this.options.procedure+'"]').each(function(i,elem){
					switch($(elem).attr('data-do')){
					case 'imm':
						$(elem).off('change.ntform').on('change.ntform',function(e){return _this.changeField(this,e);});
						$(elem).off('blur.ntform').on('blur.ntform',function(e){return _this.blurField(this,e);});
						$(elem).off('asifblur.ntform').on('asifblur.ntform',function(e){return _this.asifBlurField(this,e);});
						break;
					case 'ivs':	
						$(elem).off('input.ntform').on('input.ntform',function(e){return _this.changeField(this,e);})
						break;
					case 'onclick':	
						$(elem).off('click.ntform').on('click.ntform',function(e){return _this.changeField(this,e);});
						break;
					case 'server':
						$(elem).off('click.ntform').on('click.ntform',function(e){return _this.pressButton(this);});
						break;
					}
			});
			$(this.element).find('[data-do="save"]').off('click.ntform').on('click.ntform',function(e){return _this.saveButton(this,e);});
			$(this.element).find('[data-do="deletef"]').off('click.ntform').on('click.ntform',function(e){return _this.deleteButton(this,e);});
			$(this.element).find('[data-do="cancel"]').off('click.ntform').on('click.ntform',function(e){return _this.cancelButton(this,e);});
			$(this.element).find('[data-do="swa"]')
					.addClass('nt-right ui-state-default ui-corner-all ui-button')
					.hover(function(){
						$(this).addClass('ui-state-hover');
					}, function(){
						$(this).removeClass('ui-state-hover');
					})
					.off('click.ntform').on('click.ntform',function(e){return _this.callSecwin(this,e);});
		},
		//------------------------------------------------------
		_onKeyPress: function(elem,e) {
			switch (e.which) {
				case 13:{ // enter
					if (e.isDefaultPrevented()){
						return false;
					}	
					return(this._onEnter(elem,e));
				}
				case 9:{ // tab
					if (e.isDefaultPrevented()){
						return false;
					}	
					return(this._onTab(elem,e));									
				}
			}
		},
//------------------------------------------------------
		_onKeyDown: function(elem,e) {
			if ((e.which == 191) && (e.shiftKey == true)){
				e.which = ntLookupKey;
			}
			switch (e.which) {
				case 8:{ // explicity handle backspace on readonly fields for benefit of IE.
					if ($(elem).attr('readonly') == 'readonly'){
						return false;
					}
					break;
				}
				//case 191:  // ?
				case ntLookupKey: {// F2 by default
					$("#"+elem.id+".hasDatepicker").each(
						function(i,v){
							e.preventDefault();
							$(elem).datepicker("show");
							return false;
						}
					);
					$("#"+elem.id).next(':button').each(
						function(i,v){
							$(this).click();
							return false;
						}
					)
				}
			}
			return true;
		},
		//------------------------------------------------------
		_onEnter: function(elem,e) {
			var _this = this;
			$(this.element).find('[data-nt-default="1"]').each(function(){
				$(this).click();
				e.preventDefault();
				return false;
			})
			this.nextFocus(elem);
			return true;
		},
		//------------------------------------------------------
		_onTab: function(elem,e) {
			this.nextFocus(elem);
			return true;
		},
		//------------------------------------------------------
		blur: function(elem) {
			//console.log('FORM BLUR')
			try{
				$('#osk').ntosk('startHide');		
			} catch(e) {};	
			return this;
		},
		//------------------------------------------------------
		hideTab: function(index){
			var id='';
			switch (this.options.tabType){
			case tNone:
			case tPlain:
			case tRound:
				$('#tab_' + this.options.procedure + index + '_div').hide();
				break;
			case tWizard:
				$('#tab_' + this.options.procedure + '_div').ntwiz("option","hideTab",index);
				break;
			case tAccordion:
				$('#tab_' + this.options.procedure + '_div').find('h3').eq(index).hide();
				break;
			case tTab:
				$('#tab_' + this.options.procedure + '_div > ul').find('li').eq(index).hide();
				break;
			}
		},
		//------------------------------------------------------
		showTab: function(index){
			var id='';
			switch (this.options.tabType){
			case tNone:
			case tPlain:
			case tRound:
				$('#tab_' + this.options.procedure + index + '_div').show();
				break;
			case tWizard:
				$('#tab_' + this.options.procedure + '_div').ntwiz("option","unhideTab",index);
			case tAccordion:
				$('#tab_' + this.options.procedure + '_div').find('h3').eq(index).show();
				break;
			case tTab:
				$('#tab_' + this.options.procedure + '_div > ul').find('li').eq(index).show();
				break;
			}
		},
		//------------------------------------------------------
		firstFocus: function(){
			var e;
			var t = 4000000000;
			$(this.element).find(' :input').not('[readonly],[disabled],[type="hidden"]').each(function(){
				tx = $(this).offset().top;
				if (tx < t && tx != 0){
					e = this;
					t = tx;
				}
			})
			$(e).focus();
		},

		//------------------------------------------------------
		_calcURL : function(elem){
			var url = $(elem).attr('id');
			if (!url){
				url = $(elem).attr('name');
			} else {
				if ($(elem).attr('type') == 'radio'){
					url = url.slice(0,url.lastIndexOf('_'));
				}
			}
			var f = $(elem).attr('data-form');
			if (!f){
				f = this.options.procedure;
			}
			return f +'_' + url + '_value';
		},

		//------------------------------------------------------
		focus : function(elem,e,i){			
			//console.log('FORM FOCUS noFocus=' + $(elem).attr("data-noFocus"))
			switch (elem.type){
			case 'text':
			case 'number':
			case 'email':
			case 'url':
			case 'range':
				if ($(elem).attr("data-noFocus") == "true"){
					$(elem).attr("data-noFocus","false");
				} else {	
					//console.log('FORM calling GetFocus');
					try{
						$('#osk').ntosk('getFocus',elem);
					} catch(e) {};	
				}	
				try{
					$('#osk').ntosk('show');				
				} catch(e) {};	
			}
		},
		//------------------------------------------------------
		blurField : function(elem,e,i){
			//console.log('FORM BLURFIELD')
			this.lastChangeValue = '';
		},
		//------------------------------------------------------
		asifBlurField : function(elem,e,i){
		    //console.log('FORM ASIF BLUR')
			if ( this.getValue(elem) != this.lastChangeValue){
				this.changeField(elem,e,i);				
			}
			this.lastChangeValue = '';
			try{
				$('#osk').ntosk('startHide');
			} catch(e) {};	
			this.nextFocus(elem);
		},
		//------------------------------------------------------
		changeField : function(elem,e,i){
			var _this=this;
			var formstate=$(elem).closest('form').find('#FormState').val();
			if ($(elem).attr("data-ac") == "open"){ // dont do anything if auto-complete is open
				return this;
			}
			if ($(elem).attr("data-wait") == "true"){ // dont do anything on-screen-keyboard was clicked.
				return this;
			}
					// in most cases want to send the id first, not the name. The id is unique to the field on
					// the form, hence has a unique validate:: routine. For radios we have to tweak the id to remove
					// the unique suffix.
			var url = this._calcURL(elem);
			this.lastChangeValue = this.getValue(elem);
			$.get(url+this.options.urlExt,
				'_popup_='+this.options.popup+'&_event_=accepted&value='+this.lastChangeValue+'&_ajax_=1&_rnd_='+Math.random()+'&formstate=' + formstate+'&_parentProc_=' + this.options.parent,
				function(data){_this._onAjaxComplete(data);});
			this.options.dirty = true;
			return this;
		},

		//------------------------------------------------------
		getValue: function(elem){
			var ans ='';
			var typ = elem.type;
			var i = 0;
			if (typ == undefined){
				typ = elem[0].type;
			}
			switch (typ){
			case "radio":
				ans = $(elem).val();
				break;
			case "checkbox":
				if (elem.checked){
					ans = elem.value;
				}
				break;
			case "select-multiple":
				for(i = 0; i < elem.length; i++) {
					if(elem.options[i].selected) {
						ans = ans + ';|;' + elem.options[i].value;
					}
				}
				break;
			case "file":
				var files = elem.files;
				try {
					for (i=0;i<files.length;i++){
						ans = ans + ';|;' + files[i].name;
					}
				} catch (err){
					ans = elem.value;
				}
				break;
			case "text":
			    var id = $(elem).attr('id')+'_slider';
				if ($('#'+id).attr('id')){
					var values = $('#'+id).slider("values");
					for(i=0;i < values.length;i++){
						ans = ans + values[i] + ';';
					}					
					break;
				} // deliberatley drop down to default if it's not a slider.				
			default:
				if ($(elem).data('luv')){
					ans = $(elem).data('luv');
				} else {
					ans = elem.value; // value not encoded automatically in IE when doing an Ajax Get.
				}
			}
			// if called as a post, do not encode & and %. If called from EIP then do.
			ans = encodeURI(ans);
			ans = ans.replace(/&/g,"%26");
			ans = ans.replace(/#/g,"%23");
			ans = ans.replace(/\+/g,"%2B");
			ans = ans.replace(/%0D%0A/g,"%0A");
			ans = ans.replace(/%0D/g,"%0A");
			ans = ans.replace(/%0A/g,"%0D%0A");
			return ans;
		},
		//------------------------------------------------------
		hideMessage: function() {
			var fn = '#'+this.options.procedure;
			fn = fn.toLowerCase();
			$(fn + '_alert_div').addClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		showMessage: function(message) {
			var fn = '#'+this.options.procedure;
			fn = fn.toLowerCase();
			$(fn + '_alert_div').empty().append(message).removeClass('nt-hidden');
			return this;
		},		
		//------------------------------------------------------
		hideField: function(fieldname) {
			var fn = '#'+this.options.procedure + '_' + fieldname;
			fn = fn.toLowerCase();
			$(fn + '_prompt_div').addClass('nt-hidden');			
			$(fn + '_value_div').addClass('nt-hidden');
			$(fn + '_comment_div').addClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		showField: function(fieldname) {
			var fn = '#'+this.options.procedure + '_' + fieldname;
			fn = fn.toLowerCase();
			$(fn + '_prompt_div').removeClass('nt-hidden');
			$(fn + '_value_div').removeClass('nt-hidden');
			$(fn + '_comment_div').removeClass('nt-hidden');
			return this;
		},
		//------------------------------------------------------
		disableSave: function() {
			id = $(this.element).find('[data-do="save"]').attr("id");
			try{$('#'+id).attr("disabled","disabled").button( "refresh" );} catch (e) {};
			return this;
		},
		//------------------------------------------------------
		enableSave: function() {
			id = $(this.element).find('[data-do="save"]').attr("id");
			try{$('#'+id).removeAttr("disabled").button( "refresh" );} catch (e) {};
			return this;
		},
		//------------------------------------------------------
		show: function() {
			$('#' + this.options.procedure + '_div').show();
			return this;
		},
		//------------------------------------------------------
		hide: function() {
			$('#' + this.options.procedure + '_div').hide();
			return this;
		},
		//------------------------------------------------------
		onOpen: function() {
			this.hide();
		},
        //------------------------------------------------------
		_onAjaxComplete: function(data) {
			xmlProcess(data);
			this.ready();
			return this;
		},

		//------------------------------------------------------
		setTimer : function(fld,t) {
			setTimeout("$('#"+$(this.element).attr('id')+"').ntform('server','"+this.options.procedure + '_' + fld + '_value'+"','_event_=timer');",t);
			return this;
		},
        //------------------------------------------------------
		nextFocus : function(elem) {
			var nf = $(elem).attr('data-nextfocus');
			if (nf){
				$('#'+nf).focus();
			} else {
				var fields = $(elem).parents('form:eq(0),body').find('button,input,textarea,select').not(':hidden');
				var index = fields.index(elem);
				if ( index > -1 && ( index + 1 ) < fields.length ) {
					fields.eq(index + 1).focus();
				} else {
					fields.first().focus();
				}
			}
			return this;
		},

		//------------------------------------------------------
		// want to do an ajax call from the form, but with all the form fields included.
        pressButton : function(elem){
			var _this=this;
			var urlA= this.options.procedure+'_' + $(elem).attr('name') + '_value' + ntdExt;
			var options = {
				url: urlA,
				dataType: 'xml',
				success:    function(data) {
					_this._onAjaxComplete(data);
				},
				data: {_event_:'accepted',

				value: $(elem).attr("value"),
				_ajax_:1}
			};
			try{$(elem).attr("disabled","disabled").button( "refresh" );} catch (e) {};
			this.removePlaceHolder();
			try{
				tinyMCE.triggerSave(true,true);
			} catch(e){};
			$(elem).closest("form").ajaxSubmit(options);
			this.nextFocus(elem);
			return this;
        },
        //------------------------------------------------------
        clickSave : function(){
			$(this.element).find('[data-do="save"]').click();		
        },
        //------------------------------------------------------
        saveButton : function(elem,event){
			if (this.options.popup){
				ntd.save(event);
			} else {
				if (this.options.action && this.options.action != ''){
					$(elem).closest("form").attr("action",this.options.action).attr("target",this.options.actionTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />');
				$(elem).closest("form").append('<input type="hidden" name="_refresh_" value="saved" />');
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="save_btn" />');
				$("#_webkit_").val(Math.random());
				this.removePlaceHolder();
				$(elem).closest("form").submit();
			}
        },
        //------------------------------------------------------
        deleteButton : function(elem,event){
			if (this.options.confirmDelete) {
				ntConfirm(this.options.confirmDeleteMessage,this.options.confirmText,this.options.yesDeleteText,this.options.noDeleteText,this.deletenow,elem,event,this);
			} else {
				this.deletenow(elem,event,this);
			}
        },
        //------------------------------------------------------
        deletenow : function(elem,event,_this){
			if (_this.options.popup){
				ntd.deletef(event);
			} else {
				if (_this.options.action && _this.options.action != ''){
					$(elem).closest("form").attr("action",_this.options.action).attr("target",_this.options.actionTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />');
				$(elem).closest("form").append('<input type="hidden" name="_refresh_" value="saved" />');
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="deletef_btn" />');
				$("#_webkit_").val(Math.random());
				_this.removePlaceHolder();
				$(elem).closest("form").submit();
			}    
        },		
        //------------------------------------------------------
		cancelButton : function(elem,event){
		 console.log('cb ' + this.options.confirmCancel + ' this.options.dirty')
			if (this.options.confirmCancel && this.options.dirty) {
				console.log('cb a1')
				ntConfirm(this.options.confirmCancelMessage,this.options.confirmText,this.options.yesCancelText,this.options.noCancelText,this.cancelNow,elem,event,this);
			} else {
				this.cancelNow(elem,event,this);
			}
        },		
        //------------------------------------------------------
		cancelNow : function(elem,event,_this){
			console.log('cancel now')
			if (_this.options.popup){
				ntd.cancel(event);
			} else {
				console.log('cn1')
				if (_this.options.actionCancel && _this.options.actionCancel != ''){
				  $(elem).closest("form").attr("action",_this.options.actionCancel).attr("target",_this.options.actionCancelTarget);
				}
				// set all buttons disabled, if target of button is same frame.
				t = $(elem).closest("form").attr("target");
				if (t == "" || t == "_self" || t == "_top"){
					$(':button').attr('disabled', 'disabled');
				}
				$(elem).closest("form").append('<input type="hidden" name="_buttontext_" value="'+$(event.target).closest("button").val()+'" />')
				$(elem).closest("form").append('<input type="hidden" name="pressedButton" value="cancel_btn" />')
				$("#_webkit_").val(Math.random());
				_this.removePlaceHolder();
				$(elem).closest("form").submit();
			}
		},
        //------------------------------------------------------
        callSecwin : function(elem,event){
			ntd.push('secwinwebuseraccess','','header',1,2,null,'','','_screen_=' + this.options.addsec);
			return this;
        },

        //------------------------------------------------------
		removePlaceHolder : function (){
			$('[placeholder]').each(function(i) {
				var e = $(this);
				if (e.val() === e.attr('placeholder')){
					e.val("");
				}
			});
		},
        //------------------------------------------------------
		server : function(url) {      // send async request to server procedure
			var parms='';
			var _this=this;
			for(var d = 1; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}
			parms +=  '&_ajax_=1' + '&_parentProc_=' + this.options.parent + '&_rnd_=' + Math.random();
			$.get(url+this.options.urlExt,parms,function(data){_this._onAjaxComplete(data);});
			return this;
		},

		//------------------------------------------------------
		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
			// now do other stuff particular to this widget
		}
 });

$.extend( $.ui.ntform, {
        version: "@VERSION"
});

})( jQuery );

// ---------------------------------------------------------------------------------------
// add functionality to "checkbox" button so it has an "on" and "off" text, and icon option.
// ---------------------------------------------------------------------------------------
$.widget("ui.checkboxbutton", $.extend({}, $.ui.button.prototype, {

  _init: function(){
    var _this=this;

    this.element.data('button', this.element.data('checkboxbutton'));
    $(this.element).bind('click',function(e){ _this._clicked()});

    var i = $.ui.button.prototype._init.apply(this, arguments);
    this._clicked(); // set initial state
    return i;
  },

	refresh: function(v){
		if (v===0){
			$(this.element).removeAttr("checked");
		} else if (v===1){
			$(this.element).attr("checked","checked");
		}
		this._clicked();
		var i = $.ui.button.prototype.refresh.apply(this, arguments);
		return i;
	},
  // Override other methods here.
  _clicked: function(){
    if($(this.element).attr("checked")){
      this.options.label = this.options.trueText;
      this.options.icons.primary = this.options.trueIcon;
    } else {
      this.options.label = this.options.falseText;
      this.options.icons.primary = this.options.falseIcon;
    }
    this._resetButton();
  }

}));

$.ui.checkboxbutton.defaults = $.extend({}, $.ui.button.defaults);
/*
 * Multi-level Drop Down Menu 3.0
 * April 17, 2010
 * Corey Hart @ http://www.codenothing.com
 * modifications to support themeroller by bruce - september 2011
 * modifications to support immediate execute of menus, with urls, on touch by bruce september 2011 //bj
 */ 
(function( $, window, undefined ){
    // Needed for IE Compatibility (Closing menus must be done backwards in IE)
    // Ensure that no complications arise from other libraries modifying the 
    // array functionality (and hope that they store the old reverse function into _reverse)
    var el, a = Array.prototype, Reverse = a._reverse || a.reverse;

    // bgiframe is needed to fix z-index problem for IE6 users.
    // For applications that don't have bgiframe plugin installed, create a useless 
    // function that doesn't break the chain
    function emptyfn(){
        return this;
    }

    // Cache common event functions so they aren't instantiated with each event
    function clearSiblings(){
        $( el = this ).children('a').removeClass( $.data( el.parentNode , 'multi-ddm-classname' ) );
    }
    function oldMenus(){
        $( el = this ).hide().siblings('a').removeClass( $.data( el.parentNode.parentNode , 'multi-ddm-classname' ) );
    }

    
    // Expose the drop down menu
    $.fn.dropDownMenu = function( options ) {
        return this.each(function(){
            // Defaults with metadata support
            var $main = $(this), i = 0, $menu, timeout,
                settings = $.extend({
                    timer: 100,
                    touch: Modernizr.touch, //bj
                    parentMO: 'ui-state-hover',  //bj
                    childMO: 'ui-state-hover',   //bj
                    bgiframe: undefined,
                    levels: [] 
                }, options || {}, $.metadata ? $main.metadata() : {}),

                // Check on every initiation, so bgiframe can be loaded after this plugin
                bgiframe = $.fn.bgiframe || $.fn.bgIframe || emptyfn;

            // Loop through each level, attach the bgiframe and store it's classname
            $menu = $main.data( 'multi-ddm-classname', settings.levels[ 0 ] || settings.parentMO || settings.childMO || '' );
            while ( $menu.length > 0 ) {
                $menu = bgiframe.call(
                    $menu.find('> li > ul').addClass('ui-corner-all ui-widget ui-widget-content')       //bj
                    .data( 'multi-ddm-classname', settings.levels[ ++i ] || settings.childMO || '' ), 
                    settings.bgiframe
                );
            }

						$main.addClass('ui-widget');
						$main.children('li').children('a').addClass('ui-widget ui-state-default');						


            // Use event delegation to track mouse movement across the menu
            $main.on('mouseenter.multi-ddm','li', function(){
                //bj On iPad if menu has no items, and has URL, then the "mouse enter" is really a "touch" and the URL should execute.
                //bj defaults to Modernizr to determine if user is on a "touch device", or lets the server specify
                // note that it can be problematic if the user has a mouse _and_ a touch deview - eg Windows 8.
                if (settings.touch){ 
                  if ($(this).children('a[href!="#"]').attr('href') != undefined){
                    window.location.href = $(this).children('a[href!="#"]').attr('href');
                  }
                  if ($(this).children('a').attr('onclick') != undefined){
                    $(this).children('a').click(); 
                  }
                }
                // end touch support
                var self = $( el = this );

                if ( timeout ) {
                    clearTimeout( timeout );
                }

                // Close old menus and remove hover of non-menus
                Reverse.call( self.siblings('li').find('ul:visible') ).each( oldMenus ).end().each( clearSiblings );

                // Open new menu and remove any lingering hover elements
                self.children('a').addClass( $.data( el.parentNode, 'multi-ddm-classname' ) ).siblings('ul').show()
                    .children('li').each( clearSiblings );
            })
            .on( 'mouseleave.multi-ddm', function(){
                timeout = setTimeout( closemenu, settings.timer );
            });
    
            // Closes all open menus
            function closemenu(){
                // Clear mouseovers
                $main.find('li').each( clearSiblings );

                // Close Menus backwards for IE Compatibility
                Reverse.call( $main.find('ul:visible') ).hide();

                if ( timeout ) {
                    clearTimeout( timeout );
                }
            }
            
            // Allows user option to close menus by clicking outside the menu on the body
            //$( window.document ).on( 'click.multi-ddm', closemenu );
            // this is turned off because ios 5 generates extra click events, and this appears not to be needed anyway.
        });
    };
})( jQuery, window || this );
///////////////////////////////////////////////////////
//   
//   jQuery Plugin to turn form into wizard.
//   Part of NetTalk by CapeSoft 
//   (c) 2010 
//
///////////////////////////////////////////////////////

// first a small plugin to get, or set, the maximum height of a collection of elements.
(function( $ ){
  $.fn.maxHeight = function(h) {
		if (arguments.length > 0){
			this.each(function() {
				$(this).height(h);
			});
			return this;
		} else {
			var max = 0;
			this.each(function() {
				max = Math.max( max, $(this).height() );
			});
			return max;
		}	
  };
})( jQuery );

///////////////////////////////////////////////////////
// now the main ntwiz plugin.
///////////////////////////////////////////////////////

(function( $, undefined ) {

$.widget( "ui.ntwiz",  $.mobile.widget, {
	options: {
	  procedure: '',
	  validateOnNext: 0,
		activeTab: 0,
		maxTab: 0,
		wizTabs: [],
		minHeight: 0,    
		popup: 0,
		saveOk: 0,
		hidePreviousButton: 0,
		disablePreviousButton: 0,
		hidden: []
	},

//------------------------------------------------------
	_create: function() {           
		var _this = this;
		this.element.addClass( "ui-widget ui-widget-content ui-corner-all" );
		if (this.options.validateOnNext == 0){	
			$('[name="wiznext_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
					_this.next();
				});
		} else {
			$('[name="wiznext_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
					_this.tryNext();
				});
		}		
		$('[name="wizprevious_btn"]').unbind('click.wiz').bind('click.wiz',function(e){
			_this.previous();
			});
		this.element.bind("pageinit",this._pageinit());
	},

//------------------------------------------------------
	_init: function() {
	},	
//------------------------------------------------------
	_pageinit: function() {
		this.options.wizTabs = this.element.find('> div');
		this.options.maxTab=this.options.wizTabs.length-1;
		this.activeTab(this.activeTab());	
		this._setheight('a');
	},	
//------------------------------------------------------
	_setheight: function(a) {         
		return; // don't really want the footer pushed down in mobile mode.
		var wizHeight = this.element.find('> div').maxHeight();
		if (wizHeight > 0){
		  if (this.options.minHeight > wizHeight){
		    wizHeight = this.options.minHeight;
		  }      		  
		  // set them all to be the same height.
		  this.element.find('> div').maxHeight(wizHeight);	
		}  
	},	

//------------------------------------------------------
	destroy: function() {
		this.element.removeClass( "ui-widget ui-widget-content ui-corner-all" );
		$.Widget.prototype.destroy.apply( this, arguments );
	},

//------------------------------------------------------
// shortcut to // .option("activeTab", //
	activeTab: function( newValue ) { 
	this._setheight('b');
		if ( newValue === undefined ) {
			return this.options.activeTab;
		}
		this._setOption( "activeTab", newValue );
		return this;
	},

//------------------------------------------------------
	_setOption: function( key, value ) {
		switch (key){
		case "activeTab":
			$(this.options.wizTabs[this.options.activeTab]).hide();
			this.options.activeTab = value;                        
			$(this.options.wizTabs[this.options.activeTab]).show();
			this.setButtons();
			$(this.options.wizTabs[this.options.activeTab]).find(':input:enabled:visible:first').focus();
			break;
		case "maxTab":	
			this.options.maxTab = value;
			break;
		case "hideTab":
			this.options.hidden[value] = 1;
			break;
		case "unhideTab":
			this.options.hidden[value] = 0;
			break;
		case "saveOk":		
		  this.options.saveOk = value;  
		  this.setButtons();
		  break;
		} 
		$.Widget.prototype._setOption.apply( this, arguments );
	},

//------------------------------------------------------
  setButtons: function(){
		if (this.options.maxTab == 0){
			$('[name="wizprevious_btn"]').hide();
			$('[name="wiznext_btn"]').hide();
			return;
		}
		if (this.options.hidePreviousButton){
			$('[name="wizprevious_btn"]').hide();
		} else {
			if (this.activeTab() == 0 || this.options.disablePreviousButton){  
				$('[name="wizprevious_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
			}  else {          
				$('[name="wizprevious_btn"]').attr("disabled",false).removeClass('ui-state-focus ui-state-hover ui-disabled');
			}
		}	
		if (this.activeTab() == this.options.maxTab){
			$('[name="wiznext_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
		  //$('[name="save_btn"]').removeAttr("disabled").removeClass('ui-state-focus ui-state-hover ui-disabled');
		}  else {          
			$('[name="wiznext_btn"]').removeAttr("disabled").removeClass('ui-state-focus ui-state-hover ui-disabled');
		  //$('[name="save_btn"]').attr("disabled",true).removeClass('ui-state-focus ui-state-hover').addClass("ui-disabled");
		} 
		return this;
  },
//------------------------------------------------------  
  tryNext: function() {  
    var parms = '_ajax_=1&_popup_=' + this.options.popup;

		$.get(this.options.procedure + '_nexttab_' + this.options.activeTab,parms,function(data){xmlProcess(data);});
  },

//------------------------------------------------------  
  tabChanged: function (){
    var parms = '_ajax_=1&_popup_=' + this.options.popup + '&_tab_=' + this.options.activeTab;
    $.get(this.options.procedure+'_tabchanged',parms,function(data){xmlProcess(data);});
  },
//------------------------------------------------------  
  next: function() {  
		for(var n = this.activeTab()+1; n <= this.options.maxTab; n++){
			if (this.options.hidden[n] != 1){
				this.activeTab(n);
				this.tabChanged();
				break;
			} 
		}
  },
//------------------------------------------------------  
  previous: function() {  
		if (this.options.hidePreviousButton || this.options.disablePreviousButton){
			return this;
		}
		for(var n = this.activeTab()-1; n >= 0; n--){
			if (this.options.hidden[n] != 1){
				this.activeTab(n);
				this.tabChanged();
				break;
			} 
		}
		return this;
  }
//------------------------------------------------------
});

$.extend( $.ui.ntwiz, {
	version: "@VERSION"
});

})( jQuery );

///////////////////////////////////////////////////////
// end ntwiz
///////////////////////////////////////////////////////
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jrn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 4187 2007-12-16 17:15:27Z joern.zaefferer $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
	metadata : {
		defaults : {
			type: 'class',
			name: 'metadata',
			cre: /({.*})/,
			single: 'metadata'
		},
		setType: function( type, name ){
			this.defaults.type = type;
			this.defaults.name = name;
		},
		get: function( elem, opts ){
			var settings = $.extend({},this.defaults,opts);
			// check for empty string in single property
			if ( !settings.single.length ) settings.single = 'metadata';
			
			var data = $.data(elem, settings.single);
			// returned cached data if it already exists
			if ( data ) return data;
			
			data = "{}";
			
			if ( settings.type == "class" ) {
				var m = settings.cre.exec( elem.className );
				if ( m )
					data = m[1];
			} else if ( settings.type == "elem" ) {
				if( !elem.getElementsByTagName )
					return undefined;
				var e = elem.getElementsByTagName(settings.name);
				if ( e.length )
					data = $.trim(e[0].innerHTML);
			} else if ( elem.getAttribute != undefined ) {
				var attr = elem.getAttribute( settings.name );
				if ( attr )
					data = attr;
			}
			
			if ( data.indexOf( '{' ) <0 )
			data = "{" + data + "}";
			
			data = eval("(" + data + ")");
			
			$.data( elem, settings.single, data );
			return data;
		}
	}
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
	return $.metadata.get( this[0], opts );
};

})(jQuery);/**
 *
 * Color picker
 * Original Author: Stefan Petre www.eyecon.ro
 * Modified, and extended, for use with NetTalk
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
jQuery.extend(jQuery.expr[':'], {
    focus: function(element) { 
        return element == document.activeElement; 
    }
});
 
(function ($) {
	var ColorPicker = function () {
		var
			ids = {},
			inAction,
			charMin = 65,
			visible,
			tpl = '<div class="ui-widget ui-widget-content ui-corner-all colorpicker">' +
			          '<div class="ui-widget-header ui-corner-all colorpicker_header">Select Color</div>' +
			          '<div class="colorpicker_color">' +
			            '<div>' +
			              '<div>' +
			              '</div>' +
			            '</div>' +
			          '</div>' +
			          '<div class="colorpicker_hue">' +
			            '<div>' +
			            '</div>' +
			          '</div>' +
			          '<div class="colorpicker_new_color">' +
			          '</div>' +
			          '<div class="colorpicker_current_color">' +
			          '</div>' +
			          '<div>' +
			            '<div class="colorpicker_hex colorpicker_field">' +
			              '<div class="colorpicker_prompt colorpicker_hex_prompt">Hex #</div>' +
			              '<input type="text" maxlength="6" style="width:5em" />' +
			            '</div>' +
			          '</div>' +  
			          '<div class="colorpicker_rgb">' + 
			            '<div class="colorpicker_rgb_r colorpicker_field">' +
			              '<div class="colorpicker_prompt">Red</div>' +
			              '<input type="number" maxlength="3" min="0" max="255" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			            '<div class="colorpicker_rgb_g colorpicker_field">' +
			              '<div class="colorpicker_prompt">Green</div>' +
			              '<input type="number" maxlength="3" min="0" max="255" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			            '<div class="colorpicker_rgb_b colorpicker_field">' +
			              '<div class="colorpicker_prompt">Blue</div>' +
			              '<input type="number" maxlength="3" min="0" max="255" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			          '</div>' +  
			          '<div class="colorpicker_hsb">' + 
			            '<div class="colorpicker_hsb_h colorpicker_field">' +
			              '<div class="colorpicker_prompt">Hue</div>' +
			              '<input type="number" maxlength="3" min="0" max="360" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			            '<div class="colorpicker_hsb_s colorpicker_field">' +
			              '<div class="colorpicker_prompt">Sat</div>' +
			              '<input type="number" maxlength="3" min="0" max="100" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			            '<div class="colorpicker_hsb_b colorpicker_field">' +
			              '<div class="colorpicker_prompt">Bright</div>' +
			              '<input type="number" maxlength="3" min="0" max="100" style="width:3em" />' +
			              '<spaner></spaner>' +
			            '</div>' +
			          '</div>' +  
			          '<div class="colorpicker_submit">' +
									'<button type="button" class="ui-button ui-widget ui-state-default ui-button-text-only ui-button-text ui-corner-all" role="button" aria-disabled="false">' +
										'<span class="ui-button-text">OK</span>' +
									'</button>' +
			          '</div>' +
			          '<div class="colorpicker_cancel">' +
									'<button id="cpcb" type="button" class="ui-button ui-widget ui-state-default ui-button-text-only ui-button-text ui-corner-all" role="button" aria-disabled="false">' +
										'<span class="ui-button-text">Cancel</span>' +
									'</button>' +
			          '</div>' +
			      '</div>',
			defaults = {
				eventName: 'click',
				onShow: function () {},
				onBeforeShow: function(){},
				onHide: function () {},
				onChange: function () {},
				onSubmit: function () {},
				showIcon: true,
				showField: true,
				color: 'ff0000',
				livePreview: true,
				liveField: '',
				liveScope: 'color',
				liveGradients: true,
				dataField: '',
				closeOnSubmit: true,
				
				flat: false
			},
			fillRGBFields = function  (hsb, cal) {
				var rgb = HSBToRGB(hsb);
				$(cal).data('colorpicker').fields
					.eq(1).val(rgb.r).end()
					.eq(2).val(rgb.g).end()
					.eq(3).val(rgb.b).end();
			},
			fillHSBFields = function  (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(4).val(hsb.h).end()
					.eq(5).val(hsb.s).end()
					.eq(6).val(hsb.b).end();
			},
			fillHexFields = function (hsb, cal) {
				$(cal).data('colorpicker').fields
					.eq(0).val(HSBToHex(hsb)).end();
			},
			setSelector = function (hsb, cal) {
				$(cal).data('colorpicker').selector.css('backgroundColor', '#' + HSBToHex({h: hsb.h, s: 100, b: 100}));
				$(cal).data('colorpicker').selectorIndic.css({
					left: parseInt(150 * hsb.s/100, 10),
					top: parseInt(150 * (100-hsb.b)/100, 10)
				});
			},
			setHue = function (hsb, cal) {
				$(cal).data('colorpicker').hue.css('top', parseInt(150 - 150 * hsb.h/360, 10));
			},
			setCurrentColor = function (hsb, cal) {
				$(cal).data('colorpicker').currentColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			setNewColor = function (hsb, cal) {
				$(cal).data('colorpicker').newColor.css('backgroundColor', '#' + HSBToHex(hsb));
			},
			keyDown = function (ev) {
				var pressedKey = ev.charCode || ev.keyCode || -1;
        var v = parseInt($("input:focus").val());
        var min = parseInt($("input:focus").attr("min"));
        var max = parseInt($("input:focus").attr("max"));
        if (v == 'Nan'){
					v = 0;
        }
				switch(pressedKey){
					case 36: // home
						v = min;
						$("input:focus").val(v);
						break;

					case 107: // grey +
					case 38: // up arrow
						v = v + 1;
						if (v > max){v = max;}
						$("input:focus").val(v);
						break;
					case 33: // page up	
						v = v + 10;
						if (v > max){v = max;}
						$("input:focus").val(v);
						break;
					case 109: // grey -
					case 40: // down arrow
						v = v - 1;
						if (v < min){	v = min;}
						$("input:focus").val(v);
						break;
					case 34: // page down
						v = v - 10;
						if (v < min){	v = min;}
						$("input:focus").val(v);
						break;
					case 35: // end
						v = max;
						$("input:focus").val(v);
						break;
						
					default:
						if ((pressedKey > charMin && pressedKey <= 90) || pressedKey == 32) {
							return false;
						}
				}	
				var cal = $(this).parent().parent().parent();
				if (cal.data('colorpicker').livePreview === true) {
					change.apply(this);
				}
			},
			change = function (ev) {
				if (this.parentNode==undefined){
					return;
				}			
				var cal = $(this).parent().parent().parent(), col;
				if (this.parentNode.className.indexOf('_hex') > 0) {
					cal.data('colorpicker').color = col = HexToHSB(fixHex(this.value));
				} else if (this.parentNode.className.indexOf('_hsb') > 0) {
					cal.data('colorpicker').color = col = fixHSB({
						h: parseInt(cal.data('colorpicker').fields.eq(4).val(), 10),
						s: parseInt(cal.data('colorpicker').fields.eq(5).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(6).val(), 10)
					});
				} else {
					cal.data('colorpicker').color = col = RGBToHSB(fixRGB({
						r: parseInt(cal.data('colorpicker').fields.eq(1).val(), 10),
						g: parseInt(cal.data('colorpicker').fields.eq(2).val(), 10),
						b: parseInt(cal.data('colorpicker').fields.eq(3).val(), 10)
					}));
				}
				if (ev) {
					fillRGBFields(col, cal.get(0));
					fillHexFields(col, cal.get(0));
					fillHSBFields(col, cal.get(0));
				}
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				if (cal.data('colorpicker').liveField != ''){
					$(cal.data('colorpicker').liveField).css(cal.data('colorpicker').liveScope,'#' + HSBToHex(col));
					if (cal.data('colorpicker').liveScope == 'background-color'){
						applyGradients(cal);
					}	
				};
				cal.data('colorpicker').onChange.apply(cal, [col, HSBToHex(col), HSBToRGB(col)]);
			},
			blur = function (ev) {
				var cal = $(this).parent().parent().parent();
				//cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');
			},
			focus = function () {
				charMin = this.parentNode.className.indexOf('_hex') > 0 ? 70 : 65;
				//$(this).parent().parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');
				//$(this).parent().addClass('colorpicker_focus');
			},
			downIncrement = function (ev) {
				var field = $(this).parent().find('input').focus();
				var current = {
					el: $(this).parent().addClass('colorpicker_slider'),
					max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
					y: ev.pageY,
					field: field,
					val: parseInt(field.val(), 10),
					preview: $(this).parent().parent().parent().data('colorpicker').livePreview					
				};
				$(document).bind('mouseup', current, upIncrement);
				$(document).bind('mousemove', current, moveIncrement);
			},
			moveIncrement = function (ev) {
				ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val + ev.pageY - ev.data.y, 10))));
				if (ev.data.preview) {
					change.apply(ev.data.field.get(0), [true]);
				}
				return false;
			},
			upIncrement = function (ev) {
				change.apply(ev.data.field.get(0), [true]);
				ev.data.el.removeClass('colorpicker_slider').find('input').focus();
				$(document).unbind('mouseup', upIncrement);
				$(document).unbind('mousemove', moveIncrement);
				return false;
			},
			downHue = function (ev) {
				var current = {
					cal: $(this).parent(),
					y: $(this).offset().top
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upHue);
				$(document).bind('mousemove', current, moveHue);
			},
			moveHue = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(4)
						.val(parseInt(360*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.y))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upHue = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upHue);
				$(document).unbind('mousemove', moveHue);
				return false;
			},
			downSelector = function (ev) {
				var current = {
					cal: $(this).parent(),
					pos: $(this).offset()
				};
				current.preview = current.cal.data('colorpicker').livePreview;
				$(document).bind('mouseup', current, upSelector);
				$(document).bind('mousemove', current, moveSelector);
			},
			moveSelector = function (ev) {
				change.apply(
					ev.data.cal.data('colorpicker')
						.fields
						.eq(6)
						.val(parseInt(100*(150 - Math.max(0,Math.min(150,(ev.pageY - ev.data.pos.top))))/150, 10))
						.end()
						.eq(5)
						.val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX - ev.data.pos.left))))/150, 10))
						.get(0),
					[ev.data.preview]
				);
				return false;
			},
			upSelector = function (ev) {
				fillRGBFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				fillHexFields(ev.data.cal.data('colorpicker').color, ev.data.cal.get(0));
				$(document).unbind('mouseup', upSelector);
				$(document).unbind('mousemove', moveSelector);
				return false;
			},
			enterButton = function (ev) {
				$(this).find('button').addClass('ui-state-focus');
			},
			leaveButton = function (ev) {
				$(this).find('button').removeClass('ui-state-focus');
			},
			clickSubmit = function (ev) {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').color;
				cal.data('colorpicker').origColor = col;
				setCurrentColor(col, cal.get(0));
				$(cal.data('colorpicker').dataField).val('#' + HSBToHex(col));
				cal.data('colorpicker').onSubmit(col, HSBToHex(col), HSBToRGB(col), cal.data('colorpicker').el);
				if (cal.data('colorpicker').closeOnSubmit == true){
					//$(cal.data('colorpicker').el).ColorPickerHide();
					hide(ev);
				}
			},
			clickCancel = function (ev) {
				hide(ev);
			},
			show = function (ev) {
				var cal = $('#' + $(this).data('colorpickerId'));
				//if (cal.data('colorpicker').dataField != ''){
					$(this).ColorPickerSetColor($(cal.data('colorpicker').dataField).val());
				//}

				cal.data('colorpicker').onBeforeShow.apply(this, [cal.get(0)]);
				var pos = $(this).offset();
				var viewPort = getViewport();
				var top = pos.top + this.offsetHeight;
				var left = pos.left;
				if (top + 176 > viewPort.t + viewPort.h) {
					top -= this.offsetHeight + 176;
				}
				if (left + 356 > viewPort.l + viewPort.w) {
					left -= 356;
				}
				cal.css({left: left + 'px', top: top + 'px'});
				if (cal.data('colorpicker').onShow.apply(this, [cal.get(0)]) != false) {
					cal.show();
				}
				$(document).bind('mousedown', {cal: cal}, maybehide);
				return false;
			},
			maybehide = function (ev) {
				if (!isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
					hide(ev);
				}
			},
			hide = function(ev){
					if (ev.data.cal.data('colorpicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
						ev.data.cal.hide();
						if (ev.data.cal.data('colorpicker').liveField != ''){
							$(ev.data.cal.data('colorpicker').liveField).css(ev.data.cal.data('colorpicker').liveScope,'#' + HSBToHex(ev.data.cal.data('colorpicker').origColor) );
							if (ev.data.cal.data('colorpicker').liveScope == 'background-color'){
								applyGradients(ev.data.cal);
							}	
						};
					}
					$(document).unbind('mousedown', maybehide);			
			},
			isChildOf = function(parentEl, el, container) {
				if (parentEl == el) {
					return true;
				}
				if (parentEl.contains) {
					return parentEl.contains(el);
				}
				if ( parentEl.compareDocumentPosition ) {
					return !!(parentEl.compareDocumentPosition(el) & 16);
				}
				var prEl = el.parentNode;
				while(prEl && prEl != container) {
					if (prEl == parentEl)
						return true;
					prEl = prEl.parentNode;
				}
				return false;
			},
			getViewport = function () {
				var m = document.compatMode == 'CSS1Compat';
				return {
					l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
					t : window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
					w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
					h : window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
				};
			},
			fixHSB = function (hsb) {
				return {
					h: Math.min(360, Math.max(0, hsb.h)),
					s: Math.min(100, Math.max(0, hsb.s)),
					b: Math.min(100, Math.max(0, hsb.b))
				};
			}, 
			fixRGB = function (rgb) {
				return {
					r: Math.min(255, Math.max(0, rgb.r)),
					g: Math.min(255, Math.max(0, rgb.g)),
					b: Math.min(255, Math.max(0, rgb.b))
				};
			},
			fixHex = function (hex) {
				var len = 6 - hex.length;
				if (len > 0) {
					var o = [];
					for (var i=0; i<len; i++) {
						o.push('0');
					}
					o.push(hex);
					hex = o.join('');
				}
				return hex;
			}, 
			HexToRGB = function (hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
			},
			HexToHSB = function (hex) {
				return RGBToHSB(HexToRGB(hex));
			},
			RGBToHSB = function (rgb) {
				var hsb = {
					h: 0,
					s: 0,
					b: 0
				};
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				if (max != 0) {
					
				}
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if (hsb.s != 0) {
					if (rgb.r == max) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if (rgb.g == max) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if (hsb.h < 0) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			},
			HSBToRGB = function (hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255-s)*v/255;
					var t3 = (t1-t2)*(h%60)/60;
					if(h==360) h = 0;
					if(h<60) {rgb.r=t1;	rgb.b=t2; rgb.g=t2+t3}
					else if(h<120) {rgb.g=t1; rgb.b=t2;	rgb.r=t1-t3}
					else if(h<180) {rgb.g=t1; rgb.r=t2;	rgb.b=t2+t3}
					else if(h<240) {rgb.b=t1; rgb.r=t2;	rgb.g=t1-t3}
					else if(h<300) {rgb.b=t1; rgb.g=t2;	rgb.r=t2+t3}
					else if(h<360) {rgb.r=t1; rgb.g=t2;	rgb.b=t1-t3}
					else {rgb.r=0; rgb.g=0;	rgb.b=0}
				}
				return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
			},
			// bj start bruce
			RGBStringToHex = function (rgbString){
				var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
				delete (parts[0]);
				for (var i = 1; i <= 3; ++i) {
					parts[i] = parseInt(parts[i]).toString(16);
					if (parts[i].length == 1) parts[i] = '0' + parts[i];
				}
				return('#' + parts.join('')); // "0070ff"
			}, // bj end bruce
			RGBToHex = function (rgb) {
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function (nr, val) {
					if (val.length == 1) {
						hex[nr] = '0' + val;
					}
				});
				return hex.join('');
			},
			HSBToHex = function (hsb) {
				return RGBToHex(HSBToRGB(hsb));
			},
			applyGradients = function(cal){
				if (cal.data('colorpicker').liveGradients == true){
					var col = $(cal.data('colorpicker').liveField).css('background-color');
					if (col != 'transparent'){
						if (Modernizr.cssgradients ==  false){
							if (window.ActiveXObject) {  //for IE
								$(cal.data('colorpicker').liveField).each(function(){
									this.style.filter = '"filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+col+', endColorstr=#FFFFFFFF)"';
								});	
							}
						} else {
							$(cal.data('colorpicker').liveField).css('background','-webkit-gradient(linear, 0 0, 0 100%, from('+col+'), to(#FFFFFF))'); 
							if ($(cal.data('colorpicker').liveField).css('background') == ''){
								$(cal.data('colorpicker').liveField).css('background','-moz-linear-gradient(center bottom, #FFFFFF 0%, '+col+' 75%)');
							}	
						}	
					}	
				}	
			},
			restoreOriginal = function () {
				var cal = $(this).parent();
				var col = cal.data('colorpicker').origColor;
				cal.data('colorpicker').color = col;
				fillRGBFields(col, cal.get(0));
				fillHexFields(col, cal.get(0));
				fillHSBFields(col, cal.get(0));
				setSelector(col, cal.get(0));
				setHue(col, cal.get(0));
				setNewColor(col, cal.get(0));
				if (cal.data('colorpicker').liveField != ''){
					$(cal.data('colorpicker').liveField).css(cal.data('colorpicker').liveScope,'#' + HSBToHex(col));
					if (cal.data('colorpicker').liveScope == 'background-color'){
						applyGradients(cal);
					}	
				};
			};
		return {
			init: function (opt) {
				opt = $.extend({}, defaults, opt||{});
				if (typeof opt.color == 'string') {
					opt.color = HexToHSB(opt.color);
				} else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
					opt.color = RGBToHSB(opt.color);
				} else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
					opt.color = fixHSB(opt.color);
				} else {
					return this;
				}
				
				return this.each(function () {
					if (!$(this).data('colorpickerId')) {
						var options = $.extend({}, opt);
						options.origColor = opt.color;
						var id = 'colorpicker_' + parseInt(Math.random() * 1000);
						$(this).data('colorpickerId', id);
						var cal = $(tpl).attr('id', id);
						if (options.flat) {
							cal.appendTo(this).show();
						} else {
							cal.appendTo(document.body);
						}
						options.dataField = '#' + $(this).attr("id");
						if (opt.showIcon == true){
							var _this = '#' + $(this).attr("id");
							$(this).after('<img  class="colorpicker_lookup" src="/styles/images/colorpicker_lookup.png"/>');
							$(this).next('img').bind('click', function(){ $(_this).trigger('click');});
//							$(this).after('<div class="colorpicker_lookup"></div>');
//							$(this).next('div').bind('click', function(){ $(_this).trigger('click');});
//							$(this).next('div').position({my: "right top", at: "right top", of: _this})
						} 
						if (opt.showField == false) {
							$(this).addClass('nt-hidden');
						}
						
						options.fields = cal
											.find('input')
												.bind('keyup', keyDown)
												.bind('change', change)
												.bind('blur', blur)
												.bind('focus', focus);
						cal
							.find('span').bind('mousedown', downIncrement).end()
							.find('>div.colorpicker_current_color').bind('click', restoreOriginal);
						options.selector = cal.find('div.colorpicker_color').bind('mousedown', downSelector);
						options.selectorIndic = options.selector.find('div div');
						options.el = this;
						options.hue = cal.find('div.colorpicker_hue div');
						cal.find('div.colorpicker_hue').bind('mousedown', downHue);
						options.newColor = cal.find('div.colorpicker_new_color');
						options.currentColor = cal.find('div.colorpicker_current_color');
						cal.data('colorpicker', options);
						cal.find('div.colorpicker_submit')
							.bind('mouseenter', enterButton)
							.bind('mouseleave', leaveButton)
							.bind('click', {cal: cal}, clickSubmit);
						cal.find('div.colorpicker_cancel')
							.bind('mouseenter', enterButton)
							.bind('mouseleave', leaveButton)
							.bind('click', {cal: cal}, clickCancel);							
						fillRGBFields(options.color, cal.get(0));
						fillHSBFields(options.color, cal.get(0));
						fillHexFields(options.color, cal.get(0));
						setHue(options.color, cal.get(0));
						setSelector(options.color, cal.get(0));
						setCurrentColor(options.color, cal.get(0));
						setNewColor(options.color, cal.get(0));
						if (options.flat) {
							cal.css({
								position: 'relative',
								display: 'block'
							});
						} else {
							$(this).bind(options.eventName, show);
						}
					}
				});
			},
			showPicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						show.apply(this);
					}
				});
			},
			hidePicker: function() {
				return this.each( function () {
					if ($(this).data('colorpickerId')) {
						$('#' + $(this).data('colorpickerId')).hide(); // jQuery method, not local method.
					}
				});
			},
			setColor: function(col) {
				if (typeof col == 'string') {
				  // bj start bruce
				  if (col.substr(0,3) == 'rgb'){
						col = RGBStringToHex(col);
					}
					// bj end bruce 
					col = HexToHSB(col);
				} else if (col.r != undefined && col.g != undefined && col.b != undefined) {
					col = RGBToHSB(col);
				} else if (col.h != undefined && col.s != undefined && col.b != undefined) {
					col = fixHSB(col);
				} else {
					return this;
				}
				return this.each(function(){
					if ($(this).data('colorpickerId')) {
						var cal = $('#' + $(this).data('colorpickerId'));
						cal.data('colorpicker').color = col;
						cal.data('colorpicker').origColor = col;
						fillRGBFields(col, cal.get(0));
						fillHSBFields(col, cal.get(0));
						fillHexFields(col, cal.get(0));
						setHue(col, cal.get(0));
						setSelector(col, cal.get(0));
						setCurrentColor(col, cal.get(0));
						setNewColor(col, cal.get(0));
					}
				});
			}
		};
	}();
	$.fn.extend({
		ColorPicker: ColorPicker.init,
		ColorPickerHide: ColorPicker.hidePicker,
		ColorPickerShow: ColorPicker.showPicker,
		ColorPickerSetColor: ColorPicker.setColor
	});
})(jQuery);
/*
ntdialog object is a stack to manage popup dialogs
a single var called ntd is created for each page at the end of the declaration.
*/
function ntdialog(){
this.level=-1;
this.luf=new Array();
this.sf=new Array();
this.dlg=new Array();
this.pmt=new Array();
this.open=new Array();
this.action=new Array();
this.calledfrom=new Array();
this.grandparent=new Array();
this.row=new Array();
this.other=new Array();
this.autosave=new Array();
this.oncomplete=new Array();
this.viewstate=new Array();
this.equate=new Array();
this.saved=new Array();
this.parent=new Array();
this.browseid=new Array();
}
// ----
ntdialog.prototype.push = function (dlg,luf,pmt,run,action,sf,calledfrom,row,other,autosave,oncomplete,grandparent,viewstate,equate,par,browseid){
 this.level += 1;
 this.dlg[this.level] = dlg.toLowerCase();
 this.luf[this.level] = luf;//lookupfield
 this.sf[this.level] = sf;//sortfield
 this.pmt[this.level] = pmt;//title
 this.row[this.level] = row;//row id
 this.other[this.level] = other;//other parameters
 this.autosave[this.level] = autosave;
 this.saved[this.level] = 0;
 this.open[this.level] = 0;
 if (action == null){
   this.action[this.level] = 0;
 } else {
   this.action[this.level] = action;
 }
 if (oncomplete){
   this.oncomplete[this.level] = oncomplete;
 } else {
   this.oncomplete[this.level] = '';
 }

 if (viewstate){
   this.viewstate[this.level] = viewstate;
 } else {
   this.viewstate[this.level] = '';
 }

 if (equate){
   this.equate[this.level] = equate;
 } else {
   this.equate[this.level] = '';
 }

 this.calledfrom[this.level] = calledfrom;
 this.parent[this.level] = par;
 this.grandparent[this.level] = grandparent;
 this.browseid[this.level] = browseid;
 if (run == 1){
   this.run();
 }
}
// ----
ntdialog.prototype.current = function (){
  return this.dlg[this.level];
}
// ----
ntdialog.prototype.setRow = function (rowId){  
	this.row[this.level] = rowId;
}
// ----
ntdialog.prototype.run = function (){  
	var lvl = this.level;
	var _this = this;
	var _id = '#popup_'+this.dlg[this.level].toLowerCase()+'_div';
	var _lsid = '#'+this.dlg[this.level].toLowerCase()+'_div';
	//console.log('ntd Run id=' + _id + ' ntdLocalStorage=' + ntdLocalStorage + '  this.action[this.level]=' + this.action[this.level] + ' this.level=' + this.level + ' this.autosave=' + this.autosave[this.level])
	if (this.level>-1){
		if (this.autosave[this.level] != 1){
			if (!ntdLocalStorage){
				SetSessionValue('popup_'+this.dlg[this.level],1);                       
			}	
			//console.log('ntd confirmation dialog open')
			if (this.pmt[this.level]) {
				$(_id).dialog( "option", "title", this.pmt[this.level] );
			}	
			$(_id).dialog('open');
			try{
				$('#'+this.dlg[this.level] + '_frm').ntform('hide');
			} catch(e){}
		}
		//console.log('a1 ' + this.action[this.level])
		switch (this.action[this.level]){
		case 1: //insert
			if (ntdLocalStorage){
				//console.log('b1 ' + this.dlg[this.level])
				$('#'+this.dlg[this.level] + '_frm').ntformls("populate",this.action[this.level]);
			} else {
				$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=insert_btn&_popup_=1&_bidv_='+this.row[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});
			}	
			break;
		case 2: //change
			if (ntdLocalStorage){
				$('#'+this.dlg[this.level] + '_frm').ntformls("populate",this.action[this.level],this.row[this.level]);	
			} else {
				if (this.autosave[this.level] != 1){
					$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=change_btn&_popup_=1&_bidv_='+this.row[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});
				} else {
					$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=change_btn&_popup_=1&_bidv_='+this.row[this.level] + '&_auto_='+this.calledfrom[this.level]+'&_parentProc_=' + this.parent[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});
				}
			}	

			break;
//   case 3: //delete
//    $.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=delete_btn&_popup_=1&_bidv_='+this.row[this.level],function(data){xmlProcess(data);firstFocus(_id);});
//    break;
		case 4: // copy
			if (ntdLocalStorage){
				$('#'+this.dlg[this.level] + '_frm').ntformls("populate",this.action[this.level]);	
			} else {
				$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=copy_btn&_popup_=1&_bidv_='+this.row[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});
			}	
			break;
		case 5: // view
			$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&pressedButton=view_btn&_popup_=1&_bidv_='+this.row[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});
			break;
		case 6: //lookup
		
			$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&Lookup_btn=1&_refresh_=sort&_popup_=1&LookupField='+this.luf[this.level]+'&_sort_='+this.sf[this.level] + '&_title_=' + this.pmt[this.level] + '&' + this.other[this.level] + '&'+this.luf[this.level]+'='+$('#'+ntd.getluf()).val(),function(data){xmlProcess(data);firstFocus(_id);});
			break;
//		case 7: //zoom in
//			$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&_zoom_=1&_popup_=1&_date_=' + this.row[this.level],function(data){xmlProcess(data);firstFocus(_id); _this.oncomplete[lvl]();});
//			break;
		case 100: // browse
			//console.log('ntd ls browse ntdLocalStorage=' + ntdLocalStorage + '  id=' + _lsid)
			if (ntdLocalStorage){
				$(_lsid).ntbrowsels("populate");	
				break;
			}	
		case 101: // form
			//console.log('ntd ls form ')
			if (ntdLocalStorage){
				$('#'+this.dlg[this.level] + '_frm').ntformls("populate",this.action[this.level]);	
				break;
			}				
		default:
			if (!ntdLocalStorage){
				$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&_popup_=1&_bidv_='+this.row[this.level] + '&' + this.other[this.level],function(data){xmlProcess(data);firstFocus(_id);});	
			}	
		}
		if (this.autosave[this.level] != 1){
			this.open[this.level]=1;
		}
	}
}
// ----
ntdialog.prototype.pop = function (dlg){
	try{
		tinyMCE.triggerSave(true,true);
	} catch (e) { //alert('tinyMCE. Save failed. ' + e.message);
	}		
	var par='';
	var rid='';
	var prid='';
	if (this.level > -1){
		if(!ntdLocalStorage){
			SetSessionValue('popup_'+this.dlg[this.level],0)
		}	
		if (ntdFrontLoaded != 1){
			if (dlg != undefined){
				$(dlg).html('');
			} else {
				$('#'+ntd.getdlg().toLowerCase()+'_div').html('');
			}
		}	
		this.open[this.level]=0;
		var svd = (this.saved[this.level]) ? "&_refresh_=saved" : "&_refresh_=cancelled" ;
		if (this.browseid[this.level]){
			if (!ntdLocalStorage){
				$(this.browseid[this.level]).ntbrowse("disable");
			}	
			rid = $(this.browseid[this.level]).ntbrowse('option','randomid');
			prid = '&_parentrid_=' + $(this.browseid[this.level]).ntbrowse('option','parentrid');
		}	
		this.level -= 1;
		if (this.parent[this.level+1] && this.parent[this.level+1] != ''){
			par = '&_parentProc_='+this.parent[this.level+1]
		}		
		if (this.level > -1){
			if (this.open[this.level] == 0){
				this.run();
			} else {			  
				if(!ntdLocalStorage){
					$.get(this.dlg[this.level]+ntdExt,'_ajax_=1&_event_=gainfocus&_popup_=1&_bidv_=' + this.row[this.level+1]+'&viewstate='+this.viewstate[this.level+1]+'&_equate_='+this.equate[this.level+1]+'&_action_=' + this.action[this.level+1]+'&_from_='+ this.dlg[this.level+1]+'&_calledfrom_=' + this.calledfrom[this.level+1] + svd + '&' + this.other[this.level+1] + par + '&_rid_=' + rid + prid,function(data){xmlProcess(data);});
				}	
			} 
		} else if (this.calledfrom[0]){
				if(!ntdLocalStorage){
					$.get(this.calledfrom[0]+ntdExt,'_ajax_=1&_event_=gainfocus&_popup_=0&_bidv_=' + this.row[this.level+1]+'&viewstate='+this.viewstate[this.level+1]+'&_equate_='+this.equate[this.level+1]+'&_action_=' + this.action[this.level+1]+'&_from_='+ this.dlg[this.level+1]+'&_calledfrom_=' + this.calledfrom[this.level+1] + svd + '&' + this.other[this.level+1] + par + '&_rid_=' + rid + prid,function(data){xmlProcess(data);});
				}	
		}	
	}
}
// ----
ntdialog.prototype.getluf = function (){
  if (this.level > -1){
    return this.luf[this.level];
  } else {
    return '';
  }
}
// ----
ntdialog.prototype.getdlg = function (){
  if (this.level > -1){
    return this.dlg[this.level];
  } else {
    return '';
  }
}
// ----
ntdialog.prototype.close = function (){
	$('#popup_'+ntd.getdlg().toLowerCase()+'_div').dialog('close'); // close does a ntd.pop
}
// ----
ntdialog.prototype.cancel = function (){
	var id = this.dlg[this.level];
	if (this.calledfrom[this.level] != null){
		id = this.calledfrom[this.level];
	}
	if (ntdLocalStorage){
		this.close()
	} else {
		var options = { 
			url: id,
			dataType: 'xml',
			success:    function(data) { 
				xmlProcess(data); 
			},
			url: this.dlg[this.level] + '_xxx_cancelled' + ntdExt,
			data: {	pressedButton: 'cancel_btn', _popup_: 1,_ajax_: 1, _grandparent_: this.grandparent[this.level]}
		}; 
		$("#"+this.dlg[this.level]+"_frm").ajaxSubmit(options);
	}	
}
// ----
ntdialog.prototype.save = function (event){
	//console.log('ntd.save level=' + this.level + ' row=' + this.row[this.level])
	this.saved[this.level] = 1;
	try{
		tinyMCE.triggerSave(true,true);		      
		$('.nt-tinymce').each(function(index){      
				try{				  
					tinyMCE.execCommand('mceRemoveControl',true,$(this).attr('id'));
				} catch (e) { 
				}						
			});	
	} catch (e) { 
	}		
	var id = this.dlg[this.level];	
	if (this.calledfrom[this.level] != null){
		id = this.calledfrom[this.level];
	}
	if (ntdLocalStorage){
		if (this.action[this.level] == 1) {
			this.row[this.level] = '';
		} 
		//console.log('form ls save')
		$('#'+this.dlg[this.level] + '_frm').ntformls("save",this.action[this.level],this.browseid[this.level],this.row[this.level]);	
		this.close()
	} else {
		var options = { 
			url: id,
			dataType: 'xml',
			success:    function(data) { 
				xmlProcess(data); 
			},
			url: this.dlg[this.level] + '_xxx_validate' + ntdExt,
			data: {	pressedButton: 'save_btn', _popup_: 1,_ajax_: 1, _grandparent_: this.grandparent[this.level], _buttontext_: $(event.target).text()}
		}; 
		$("#"+this.dlg[this.level]+"_frm").ajaxSubmit(options);
		// use the line below instead when debugging, as it's visible in firebug.
		//$.post(id+ntdExt,'pressedButton=save_btn&_popup_=1&'+ $("#"+this.dlg[this.level]+"_frm").serialize(),function(data){xmlProcess(data);});
	}	
}
// ----
ntdialog.prototype.deleteb = function (id,br,ff,par){
	$.post(br+ntdExt,'pressedButton=deleteb_btn&_popup_=1&_fromForm_='+ ff + '&_bidv_=' + id + '&_ajax_=1&_parentProc_' + par,function(data){xmlProcess(data);});
}
// ----
ntdialog.prototype.deletef = function (){
	var id = this.dlg[this.level];
	if (this.calledfrom[this.level] != null){
		id = this.calledfrom[this.level];//.id;
	}
	$.post(this.dlg[this.level] + '_xxx_delete' + ntdExt,'pressedButton=deletef_btn&_popup_=1&_ajax_=1&'+ $("#"+this.dlg[this.level]+"_frm").serialize(),function(data){xmlProcess(data);});
	this.action[this.level] = 3; // delete
	//$.post(id+ntdExt,'pressedButton=deletef_btn&_popup_=1&'+ $("#"+this.dlg[this.level]+"_frm").serialize(),function(data){xmlProcess(data);});
	$('#popup_'+ntd.getdlg().toLowerCase()+'_div').dialog('close'); // close does a ntd.pop
}
// ----
var ntd = new ntdialog();
var ntdExt = '';
var ntdFrontLoaded=0;
var ntdLocalStorage=0;/*
 * jQuery Media Plugin for converting elements into rich media content.
 *
 *     Updated for NetTalk by Bruce Johnson to set the default for unknown extensions, and no extensions, to be HTML
 *
 * Examples and documentation at: http://malsup.com/jquery/media/
 * Copyright (c) 2007-2010 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @author: M. Alsup
 * @version: 0.99 (05-JUN-2013)
 * @requires jQuery v1.1.2 or later
 * $Id: jquery.media.js 2460 2007-07-23 02:53:15Z malsup $
 *
 * Supported Media Players:
 *	- Flash
 *	- Quicktime
 *	- Real Player
 *	- Silverlight
 *	- Windows Media Player
 *	- iframe
 *
 * Supported Media Formats:
 *	 Any types supported by the above players, such as:
 *	 Video: asf, avi, flv, mov, mpg, mpeg, mp4, qt, smil, swf, wmv, 3g2, 3gp
 *	 Audio: aif, aac, au, gsm, mid, midi, mov, mp3, m4a, snd, rm, wav, wma
 *	 Other: bmp, html, pdf, psd, qif, qtif, qti, tif, tiff, xaml
 *
 * Thanks to Mark Hicken and Brent Pedersen for helping me debug this on the Mac!
 * Thanks to Dan Rossi for numerous bug reports and code bits!
 * Thanks to Skye Giordano for several great suggestions!
 * Thanks to Richard Connamacher for excellent improvements to the non-IE behavior!
 */
/*global SWFObject alert Sys */
/*jshint forin:false */
;(function($) {
"use strict";	

var mode = document.documentMode || 0;
var msie = /MSIE/.test(navigator.userAgent);
var lameIE = msie && (/MSIE (6|7|8)\.0/.test(navigator.userAgent) || mode < 9);

/**
 * Chainable method for converting elements into rich media.
 *
 * @param options
 * @param callback fn invoked for each matched element before conversion
 * @param callback fn invoked for each matched element after conversion
 */
$.fn.media = function(options, f1, f2) {
	if (options == 'undo') {
		return this.each(function() {
			var $this = $(this);
			var html = $this.data('media.origHTML');
			if (html)
				$this.replaceWith(html);
		});
	}
	
	return this.each(function() {
		if (typeof options == 'function') {
			f2 = f1;
			f1 = options;
			options = {};
		}
		var o = getSettings(this, options);
		// pre-conversion callback, passes original element and fully populated options
		if (typeof f1 == 'function') f1(this, o);

		var r = getTypesRegExp();
		if (o.src!='0' && o.src!='unknown'){			
			var m = r.exec(o.src.toLowerCase()) || [".html", "html"]; // Bruce set the default to HTML here.
		} else {	
			var m = r.exec(o.src.toLowerCase()) || [];
		}	
		var fn;

		if (o.type)
			m[0] = o.type;
		else
			m.shift();
		for (var i=0; i < m.length; i++) {
			fn = m[i].toLowerCase();
			if (isDigit(fn[0])) fn = 'fn' + fn; // fns can't begin with numbers
			if (!$.fn.media[fn])
				continue;  // unrecognized media type
			// normalize autoplay settings
			var player = $.fn.media[fn+'_player'];
			if (!o.params) o.params = {};
			if (player) {
				var num = player.autoplayAttr == 'autostart';
				o.params[player.autoplayAttr || 'autoplay'] = num ? (o.autoplay ? 1 : 0) : o.autoplay ? true : false;
			}
			var $div = $.fn.media[fn](this, o);

			$div.css('backgroundColor', o.bgColor).width(o.width);
			
			if (o.canUndo) {
				var $temp = $('<div></div>').append(this);
				$div.data('media.origHTML', $temp.html()); // store original markup
			}
			
			// post-conversion callback, passes original element, new div element and fully populated options
			if (typeof f2 == 'function') f2(this, $div[0], o, player.name);
			break;
		}
	});
};

/**
 * Non-chainable method for adding or changing file format / player mapping
 * @name mapFormat
 * @param String format File format extension (ie: mov, wav, mp3)
 * @param String player Player name to use for the format (one of: flash, quicktime, realplayer, winmedia, silverlight or iframe
 */
$.fn.media.mapFormat = function(format, player) {
	if (!format || !player || !$.fn.media.defaults.players[player]) return; // invalid
	format = format.toLowerCase();
	if (isDigit(format[0])) format = 'fn' + format;
	$.fn.media[format] = $.fn.media[player];
	$.fn.media[format+'_player'] = $.fn.media.defaults.players[player];
};

// global defautls; override as needed
$.fn.media.defaults = {
	standards:  true,       // use object tags only (no embeds for non-IE browsers)
	canUndo:    true,       // tells plugin to store the original markup so it can be reverted via: $(sel).mediaUndo()
	width:		400,
	height:		400,
	autoplay:	0,			// normalized cross-player setting
	bgColor:	'#ffffff',	// background color
	params:		{ wmode: 'transparent'},	// added to object element as param elements; added to embed element as attrs
	attrs:		{},			// added to object and embed elements as attrs
	flvKeyName: 'file',		// key used for object src param (thanks to Andrea Ercolino)
	flashvars:	{},			// added to flash content as flashvars param/attr
	flashVersion:	'7',	// required flash version
	expressInstaller: null,	// src for express installer

	// default flash video and mp3 player (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
	flvPlayer:	 'mediaplayer.swf',
	mp3Player:	 'mediaplayer.swf',

	// @see http://msdn2.microsoft.com/en-us/library/bb412401.aspx
	silverlight: {
		inplaceInstallPrompt: 'true', // display in-place install prompt?
		isWindowless:		  'true', // windowless mode (false for wrapping markup)
		framerate:			  '24',	  // maximum framerate
		version:			  '0.9',  // Silverlight version
		onError:			  null,	  // onError callback
		onLoad:			      null,   // onLoad callback
		initParams:			  null,	  // object init params
		userContext:		  null	  // callback arg passed to the load callback
	}
};

// Media Players; think twice before overriding
$.fn.media.defaults.players = {
	flash: {
		name:		 'flash',
		title:		 'Flash',
		types:		 'flv,mp3,swf',
		mimetype:	 'application/x-shockwave-flash',
		pluginspage: 'http://www.adobe.com/go/getflashplayer',
		ieAttrs: {
			classid:  'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
			type:	  'application/x-oleobject',
			codebase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + $.fn.media.defaults.flashVersion
		}
	},
	quicktime: {
		name:		 'quicktime',
		title:		 'QuickTime',
		mimetype:	 'video/quicktime',
		pluginspage: 'http://www.apple.com/quicktime/download/',
		types:		 'aif,aiff,aac,au,bmp,gsm,mov,mid,midi,mpg,mpeg,mp4,m4a,psd,qt,qtif,qif,qti,snd,tif,tiff,wav,3g2,3gp',
		ieAttrs: {
			classid:  'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
			codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
		}
	},
	realplayer: {
		name:		  'real',
		title:		  'RealPlayer',
		types:		  'ra,ram,rm,rpm,rv,smi,smil',
		mimetype:	  'audio/x-pn-realaudio-plugin',
		pluginspage:  'http://www.real.com/player/',
		autoplayAttr: 'autostart',
		ieAttrs: {
			classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
		}
	},
	winmedia: {
		name:		  'winmedia',
		title:		  'Windows Media',
		types:		  'asx,asf,avi,wma,wmv',
		mimetype:	  isFirefoxWMPPluginInstalled() ? 'application/x-ms-wmp' : 'application/x-mplayer2',
		pluginspage:  'http://www.microsoft.com/Windows/MediaPlayer/',
		autoplayAttr: 'autostart',
		oUrl:		  'url',
		ieAttrs: {
			classid:  'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6',
			type:	  'application/x-oleobject'
		}
	},
	// special cases
	img: {
		name:  'img',
		title: 'Image',
		types: 'gif,png,jpg'
	},
	iframe: {					// if the SRC does not have an extension then it will default to HTML in an iFrame (Bruce)
		name:  'iframe',
		types: 'html,pdf'   
	},
	silverlight: {
		name:  'silverlight',
		types: 'xaml'
	}
};

//
//	everything below here is private
//


// detection script for FF WMP plugin (http://www.therossman.org/experiments/wmp_play.html)
// (hat tip to Mark Ross for this script)
function isFirefoxWMPPluginInstalled() {
	var plugs = navigator.plugins || [];
	for (var i = 0; i < plugs.length; i++) {
		var plugin = plugs[i];
		if (plugin['filename'] == 'np-mswmp.dll')
			return true;
	}
	return false;
}

var counter = 1;

for (var player in $.fn.media.defaults.players) {
	var types = $.fn.media.defaults.players[player].types;
	$.each(types.split(','), function(i,o) {
		if (isDigit(o[0])) o = 'fn' + o;
		$.fn.media[o] = $.fn.media[player] = getGenerator(player);
		$.fn.media[o+'_player'] = $.fn.media.defaults.players[player];
	});
}

function getTypesRegExp() {
	var types = '';
	for (var player in $.fn.media.defaults.players) {
		if (types.length) types += ',';
		types += $.fn.media.defaults.players[player].types;
	}
	return new RegExp('\\.(' + types.replace(/,/ig,'|') + ')\\b');
}

function getGenerator(player) {
	return function(el, options) {
		return generate(el, options, player);
	};
}

function isDigit(c) {
	return '0123456789'.indexOf(c) > -1;
}

// flatten all possible options: global defaults, meta, option obj
function getSettings(el, options) {
	options = options || {};
	var a, n;
	var $el = $(el);
	var cls = el.className || '';
	// support metadata plugin (v1.0 and v2.0)
	var meta = $.metadata ? $el.metadata() : $.meta ? $el.data() : {};
	meta = meta || {};
	var w = meta.width  || parseInt(((cls.match(/\bw:(\d+)/)||[])[1]||0),10) || parseInt(((cls.match(/\bwidth:(\d+)/)||[])[1]||0),10);
	var h = meta.height || parseInt(((cls.match(/\bh:(\d+)/)||[])[1]||0),10) || parseInt(((cls.match(/\bheight:(\d+)/)||[])[1]||0),10);

	if (w) meta.width = w;
	if (h) meta.height = h;
	if (cls) meta.cls = cls;
	
	// crank html5 style data attributes
	var dataName = 'data-';
    for (var i=0; i < el.attributes.length; i++) {
        a = el.attributes[i], n = $.trim(a.name);
        var index = n.indexOf(dataName);
        if (index === 0) {
			n = n.substring(dataName.length);
			meta[n] = a.value;
        }
    }

	a = $.fn.media.defaults;
	var b = options;
	var c = meta;

	var p = { params: { bgColor: options.bgColor || $.fn.media.defaults.bgColor } };
	var opts = $.extend({}, a, b, c);
	$.each(['attrs','params','flashvars','silverlight'], function(i,o) {
		opts[o] = $.extend({}, p[o] || {}, a[o] || {}, b[o] || {}, c[o] || {});
	});

	if (typeof opts.caption == 'undefined') opts.caption = $el.text();

	// make sure we have a source!
	opts.src = opts.src || $el.attr('href') || $el.attr('src') || 'unknown';
	return opts;
}

//
//	Flash Player
//

// generate flash using SWFObject library if possible
$.fn.media.swf = function(el, opts) {
	var f, p;
	if (!window.SWFObject && !window.swfobject) {
		// roll our own
		if (opts.flashvars) {
			var a = [];
			for (f in opts.flashvars)
				a.push(f + '=' + opts.flashvars[f]);
			if (!opts.params) opts.params = {};
			opts.params.flashvars = a.join('&');
		}
		return generate(el, opts, 'flash');
	}

	var id = el.id ? (' id="'+el.id+'"') : '';
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id + cls + '>');

	// swfobject v2+
	if (window.swfobject) {
		$(el).after($div).appendTo($div);
		if (!el.id) el.id = 'movie_player_' + counter++;

		// replace el with swfobject content
		window.swfobject.embedSWF(opts.src, el.id, opts.width, opts.height, opts.flashVersion,
			opts.expressInstaller, opts.flashvars, opts.params, opts.attrs);
	}
	// swfobject < v2
	else {
		$(el).after($div).remove();
		var so = new SWFObject(opts.src, 'movie_player_' + counter++, opts.width, opts.height, opts.flashVersion, opts.bgColor);
		if (opts.expressInstaller) so.useExpressInstall(opts.expressInstaller);

		for (p in opts.params)
			if (p != 'bgColor') so.addParam(p, opts.params[p]);
		for (f in opts.flashvars)
			so.addVariable(f, opts.flashvars[f]);
		so.write($div[0]);
	}

	if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
	return $div;
};

// map flv and mp3 files to the swf player by default
$.fn.media.flv = $.fn.media.mp3 = function(el, opts) {
	var src = opts.src;
	var player = /\.mp3\b/i.test(src) ? opts.mp3Player : opts.flvPlayer;
	var key = opts.flvKeyName;
	src = encodeURIComponent(src);
	opts.src = player;
	opts.src = opts.src + '?'+key+'=' + (src);
	var srcObj = {};
	srcObj[key] = src;
	opts.flashvars = $.extend({}, srcObj, opts.flashvars );
	return $.fn.media.swf(el, opts);
};

//
//	Silverlight
//
$.fn.media.xaml = function(el, opts) {
	if (!window.Sys || !window.Sys.Silverlight) {
		if ($.fn.media.xaml.warning) return;
		$.fn.media.xaml.warning = 1;
		alert('You must include the Silverlight.js script.');
		return;
	}

	var props = {
		width: opts.width,
		height: opts.height,
		background: opts.bgColor,
		inplaceInstallPrompt: opts.silverlight.inplaceInstallPrompt,
		isWindowless: opts.silverlight.isWindowless,
		framerate: opts.silverlight.framerate,
		version: opts.silverlight.version
	};
	var events = {
		onError: opts.silverlight.onError,
		onLoad: opts.silverlight.onLoad
	};

	var id1 = el.id ? (' id="'+el.id+'"') : '';
	var id2 = opts.id || 'AG' + counter++;
	// convert element to div
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id1 + cls + '>');
	$(el).after($div).remove();

	Sys.Silverlight.createObjectEx({
		source: opts.src,
		initParams: opts.silverlight.initParams,
		userContext: opts.silverlight.userContext,
		id: id2,
		parentElement: $div[0],
		properties: props,
		events: events
	});

	if (opts.caption) $('<div>').appendTo($div).html(opts.caption);
	return $div;
};

//
// generate object/embed markup
//
function generate(el, opts, player) {
	var $el = $(el);
	var o = $.fn.media.defaults.players[player];
	var a, key, v;

	if (player == 'iframe') {
		o = $('<iframe' + ' width="' + opts.width + '" height="' + opts.height + '" >');
		o.attr('src', opts.src);
		o.css('backgroundColor', o.bgColor);
	}
	else if (player == 'img') {
		o = $('<img>');
		o.attr('src', opts.src);
		if (opts.width)
			o.attr('width', opts.width);
		if (opts.height)
			o.attr('height', opts.height);
		o.css('backgroundColor', o.bgColor);
	}
	else if (lameIE) {
		a = ['<object width="' + opts.width + '" height="' + opts.height + '" '];
		for (key in opts.attrs)
			a.push(key + '="'+opts.attrs[key]+'" ');
		for (key in o.ieAttrs || {}) {
			v = o.ieAttrs[key];
			if (key == 'codebase' && window.location.protocol == 'https:')
				v = v.replace('http','https');
			a.push(key + '="'+v+'" ');
		}
		a.push('></ob'+'ject'+'>');
		var p = ['<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">'];
		for (key in opts.params)
			p.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
		o = document.createElement(a.join(''));
		for (var i=0; i < p.length; i++)
			o.appendChild(document.createElement(p[i]));
	}
	else if (opts.standards) {
		// Rewritten to be standards compliant by Richard Connamacher
		a = ['<object type="' + o.mimetype +'" width="' + opts.width + '" height="' + opts.height +'"'];
		if (opts.src) a.push(' data="' + opts.src + '" ');
		if (msie) {
			for (key in o.ieAttrs || {}) {
				v = o.ieAttrs[key];
				if (key == 'codebase' && window.location.protocol == 'https:')
					v = v.replace('http','https');
				a.push(key + '="'+v+'" ');
			}
		}
		a.push('>');
		a.push('<param name="' + (o.oUrl || 'src') +'" value="' + opts.src + '">');
		for (key in opts.params) {
			if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
				continue;
			a.push('<param name="'+ key +'" value="' + opts.params[key] + '">');
		}
		// Alternate HTML
		a.push('<div><p><strong>'+o.title+' Required</strong></p><p>'+o.title+' is required to view this media. <a href="'+o.pluginspage+'">Download Here</a>.</p></div>');
		a.push('</ob'+'ject'+'>');
	}
	 else {
	        a = ['<embed width="' + opts.width + '" height="' + opts.height + '" style="display:block"'];
	        if (opts.src) a.push(' src="' + opts.src + '" ');
	        for (key in opts.attrs)
	            a.push(key + '="'+opts.attrs[key]+'" ');
	        for (key in o.eAttrs || {})
	            a.push(key + '="'+o.eAttrs[key]+'" ');
	        for (key in opts.params) {
	            if (key == 'wmode' && player != 'flash') // FF3/Quicktime borks on wmode
					continue;
	            a.push(key + '="'+opts.params[key]+'" ');
	        }
	        a.push('></em'+'bed'+'>');
	    }	
	// convert element to div
	var id = el.id ? (' id="'+el.id+'"') : '';
	var cls = opts.cls ? (' class="' + opts.cls + '"') : '';
	var $div = $('<div' + id + cls + '>');
	$el.after($div).remove();
	if (lameIE || player == 'iframe' || player == 'img')
		$div.append(o);
	else
		$div.html(a.join(''));
	
	if (opts.caption) 
		$('<div>').appendTo($div).html(opts.caption);
	return $div;
}


})(jQuery);;var NetTalkVersion=9.31
// ---------------------------------------------

var cnt=0;
var tcnt=0;
var fcnt='';
var icnt='';

function initTabID(){
	var newId=false;
	var ce=false;
	if (!sessionStorage.id || localStorage.newIdRequired == 1){
		localStorage.newIdRequired = 0;
		sessionStorage.id = Math.random().toString(36).substr(5);		
		newId = true;
	} else {
		if (document.cookie.indexOf('x-TabID=') < 0){
			newId = true;
		}	
	}

	// for ajax calls no cookie is used - rather the x-TabID header is set to the current session storage ID.
	$.ajaxSetup({
		headers: { 'x-TabID': sessionStorage.id }
	});	
	
	if (newId){
		if (localStorage.fromTabId){
			$.get('NewTabID'+ntdExt,'_ajax_=1&x-FromTabID=' + localStorage.fromTabId,function(data){xmlProcess(data);});	
		} else {
			$.get('NewTabID'+ntdExt,'_ajax_=1',function(data){xmlProcess(data);});			
		}	
	}	
	
	// can't change headers for a non-ajax request. 
	// these cookies are "fleeting" so clear them away.
	document.cookie = 'x-TabID=; expires=Thu, 01-Jan-70 00:00:01 GMT;';	
	document.cookie = 'x-FromTabID=; expires=Thu, 01-Jan-70 00:00:01 GMT;';	
	localStorage.fromTabId = '';
	
	// mouse could be left, right or middle... so set FromTabId preemptivly.
	$('a').mousedown(function (event) { 
		localStorage.fromTabId = sessionStorage.id;
	}); 
	// a Ctrl-Click, or right-click/new tab or whatever does NOT go through this code. which is why FromTabID is set on MouseDown
	$('a').click(function (event) {		
		if (event.metaKey || event.ctrlKey || $(this).attr('target') == '_blank'){ 	// going to a new tab
		} else {  																	// normal click, so want TabID Cookie
			document.cookie = 'x-TabID=' + sessionStorage.id + ';';
		}		
	});  	
	// setting on button click appears to be too late, so set on button down.
	$('button').mousedown(function (event) {
		initTabIDWorker();	
	});  
	// pressing enter on button, when the button has the focus
	$('button').keydown(function(event){
		initTabIDWorker();
	});
};

function initTabIDWorker(){
	var t= $(this).attr('target');
	var oc = $(this).attr('onclick');
	if (oc){
		oc = oc.indexOf("'_blank'");
	} else {
		oc = -1;
	}
	if (t == '_blank' || oc >= 0){
		localStorage.fromTabId = sessionStorage.id;
		localStorage.newIdRequired = 1;
	} else {
		document.cookie = 'x-TabID=' + sessionStorage.id + ';';
	}		
}
function countDown(){
  hh = parseInt( cnt / 3600 );
  mm = parseInt( cnt / 60 ) % 60;
  ss = cnt % 60;
    var t = hh + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss);
  jQuery('#' + icnt).html(t);
  cnt -= 1;
  if (cnt ==0){
    window.open(fcnt,'_top');
  } else {
        setTimeout("countDown();",1000);
  }
};

function resetCountDown(){
  cnt = tcnt;
}

function startCountDown(t,f,i){
  if (t){
        tcnt = t;
    }
    if (f){
        fcnt = f;
    }
    if (i){
        icnt = i;
    }
    cnt = tcnt;
  countDown();
};

function versionCheck(v){
  var s = v + '';
  s = s.replace('.','');
  v = Number(v);
  if (v != NetTalkVersion){
    $('#_ver' + s).html('UPDATE OF WEB FOLDER REQUIRED - Try pressing Ctrl-F5. Server is on version ' + v + ' but web folder is on version ' +  NetTalkVersion);
	//window.location.reload(true);  // what happens if the server folder has not been updated though?
  } else {
        $('#_ver' + s).hide();
    }
}

function showInfo(m,t,d){
  if (!d){
    d = 'alert_div';
  }
  $('#'+d).html(m).hide().fadeIn(1000);
  if (t){
    setTimeout("hideInfo('"+d+"');",t);
  }
}
    
function hideInfo(d){    
  if (!d){
    d = 'alert_div';
  }
  $('#'+d).show().fadeOut(1000,function(){$('#'+d).html('')});
}  

function getScreenSize(force){
	if (force==true || sessionStorage._ScreenWidth_ != $(window).width() || sessionStorage._ScreenHeight_ != $(window).height()){
		sessionStorage._ScreenWidth_ = $(window).width();
		sessionStorage._ScreenHeight_ = $(window).height();
		$.get('SetSessionValue'+ntdExt,'_ScreenWidth_=' + $(window).width() + '&_ScreenHeight_=' + $(window).height() + '&_ajax_=1',function(data){xmlProcess(data);});
	}	
}

// ---------------------------------------------
// functions to handle busy graphic
var busyCounter=0;
$(document).ready(function() {
	busyCounter = 0;
	$("#_busy").hide();
	$(document).on("ajaxSend",function(event){
		$("#_busy").css('left',event.pageX).css('right',event.pageY);
		$("#_busy").show();
		busyCounter += 1;
		if (window.attachEvent && !window.addEventListener) { // detects IE8 and below
			$('input:radio, input:checkbox').unbind('click.iefix');
		};
	});
	$(document).on("ajaxComplete",function(){;
		busyCounter -= 1;
		$("#_busy").hide();
		if (window.attachEvent && !window.addEventListener) { // detects IE8 and below
			$('input:radio, input:checkbox').on('click.iefix',function () {
				this.blur();
				this.focus();
			});
		}
	});
});
// ---------------------------------------------
function ntConfirm(m,t,b1,b2,f,p1,p2,p3){
	if (mobilemode){
		f(p1,p2,p3);
		return;
	}
	setTimeout(function(){
        var a = jQuery(":focus").attr('id');
		$("#message_alert").remove();
        if (t){
			$('body').append('<div id="message_alert" title="' + t + '">' + m + '</div>');
		} else {	
			$('body').append('<div id="message_alert" title="Alert">' + m + '</div>');
		}	
		$("#message_alert").dialog({
			resizable: false,
			modal: true,
			buttons: [	{			
				text: b1,
				click: function() {
					$(this).dialog("close");
					$("#message_alert").remove();
					f(p1,p2,p3);
				} }, {
				text: b2,
				click: function() {
					$(this).dialog("close");
					$("#message_alert").remove();					
				} } 				
			],
			open: function() {
				 $(this).parent().find('button:nth-child(1)').focus(); 
			},
			close: function() {
				 $('#' + a).focus();  
			}
		});		
    }, 1);
};
// ---------------------------------------------
function ntAlert(m,t,timer){
  setTimeout(function() {
        var a = jQuery(":focus").attr('id');
		$("#message_alert").remove();
        if (t){
			$('body').append('<div id="message_alert" title="' + t + '">' + m + '</div>');
		} else {	
			$('body').append('<div id="message_alert" title="Alert">' + m + '</div>');
		}	
		$("#message_alert").dialog({
			resizable: false,
			modal: true,
			buttons: {
				Ok: function() {
					$(this).dialog("close");
					$("#message_alert").remove();
				}
			},
			open: function() {
				 $(this).parent().find('button:nth-child(1)').focus(); 
			},
			close: function() {
				 $('#' + a).focus();  
			}
		});
		if (timer){
			setTimeout(function() { $("#message_alert").dialog("close"); }, timer);
		}
    }, 1);
}
// ---------------------------------------------
var hadfocus='';
var setfocus='';
function afterSv(){
  GreenAll();
  applyHTML5();
}

var tables = [];
function GreenAll(){
  for(var e = 0; e < tables.length; e++){
     tables[e].table=document.getElementById(tables[e].tid); // necessary after ajax call
     if (tables[e].table != null){
       tables[e].parseCell();
       tables[e].applyGreenBar();
     }
     tables[e].makeResizable();
     tables[e].prepColumns();
     tables[e].bind();
     //tables[e].restoreFocus();
  }
}
// -----------------------------------------------------------------------------------
// AutoTab support
// If an entry field has data-nt-autotab=1", then when the maxlength is reached focus
// automatically moves to the next field.
// -----------------------------------------------------------------------------------
jQuery.fn.focusNextInputField = function() { // this function from http://jqueryminute.com/, thanks to jdSharp.
    return this.each(function() {
        var fields = $(this).parents('form:eq(0),body').find('button,input,textarea,select').not('[readonly]');
        var index = fields.index( this );
        if ( index > -1 && ( index + 1 ) < fields.length ) {
            fields.eq( index + 1 ).focus();
        }
        return false;
    });
};

jQuery(document).ready( function(){
    jQuery("body").on("[data-nt-autotab=1]","keyup",function(e) {
        if ($(this).val().length == $(this).attr("maxlength")){
            if((e.which >= 32) && (e.which <= 122)){
                jQuery(':focus').focusNextInputField();
            }
        }
    });
});


// recursive function to find the first checkbox which is "inside" c.
function getCheckbox(c){
 if (c.type == 'checkbox'){
  return c;
 }
 if (c.firstChild != null){
  a = getCheckbox(c.firstChild);
  if (a != null){
  return a;
  }
 }
 while (c.nextSibling != null){
  a = getCheckbox(c.nextSibling);
  if (a != null){
   return a;
  }
 }
 return null;
}

function dsb(event,f,b,n,prid,prv){
 var i=0;
 if (n=='deleteb_btn'){
  if(confirm('Are you sure you want to delete this record?')==false){
   return false;
  }
 }
 // dont send files if form is cancelled.
 if (n=='cancel_btn'){
                jQuery(':file').remove();
 }
 // set all buttons disabled, if target of button is same frame.
 if (f.target == "" || f.target == "_self"){
         jQuery(':button').attr('disabled', 'disabled');
 }
 for (var e=0 ; e < f.elements.length; e++) {
   if (f.elements[e].name == prid){
    f.elements[e].value = prv;
    i = 1;
   }
 }
 var bid = document.createElement('INPUT');
 bid.type = 'hidden';
 bid.name = '_buttontext_';
 bid.value = $(event.target).closest("button").val();
 f.appendChild(bid);

 jQuery("#_webkit_").val(Math.random());
 if ((i==0) && (prid != '')){
  var rid = document.createElement('INPUT');
  rid.type = 'hidden';
  rid.name = prid;
  rid.value = prv;
  f.appendChild(rid);
 }
 var pb = document.createElement('INPUT');
 pb.type = 'hidden';
 pb.name = 'pressedButton';
 pb.value = n;
 f.appendChild(pb);
 osf(f);
 removePlaceHolder();
 f.submit();
}

function osf(f){
    if(f.target=='' || f.target=='_self' || f.target=='_top') {
        for (var e=0 ; e < f.elements.length; e++) {
            if(f.elements[e].type=='button'){
                f.elements[e].disabled = true;
            }
        }
    }
}

function ml(ta,ml,e){
	var k;
	if(window.event){ // IE
		k = e.keyCode
	} else if(e.which){ // Netscape/Firefox/Opera/Safari
		k = e.which
	};
	switch(k){
	case 8: // backspace
	case null:
	case undefined:  // del
	case 120: // ctrl-x
		return true		
	case 118: // ctrl-v
		break;
	}	  
	if (k > 60000){
		return true;
	}
	return (ta.value.length <= ml);
}

function firstFocus(id){
  var e;
  var t = 4000000000;
    jQuery(id + ' :input').not('[readonly],[disabled],[type="hidden"]').each(function(){
      tx = $(this).offset().top
      if (tx+1 < t && tx != 0){  // +1 to handle lookup buttons that are 1 pixel higher than the textarea field.
        e = this;
        t = tx;
      }
    })
    $(e).focus();
}

function nextFocus(f,pname,skipone){
  var i = 0;
  var j = 0;
  if (skipone==2){ // pname is specified control to get focus
    for (var e=0 ; e < f.elements.length; e++) {
      if(f.elements[e].name==pname){
  try{
    f.elements[e].focus();
  } catch (e) {
  }
  break;
      }
    }
  } else {
    for (var e=0 ; e < f.elements.length; e++) {
      if (i==1){
  if ((f.elements[e].type == "text") || (f.elements[e].type == "textarea") || (f.elements[e].type == "checkbox") || (f.elements[e].type == "radio") || (f.elements[e].type == "select-one")){
    //|| (f.elements[e].type == "button")
    if(f.elements[e].readOnly != true){
      if((skipone==1) && (j==0)){
        j = 1;
      } else {
        try{
    f.elements[e].focus();
        } catch (e) {
        }
        break;
      }
    }
  }
      }
      else{
  if(pname==''){
    if(f.elements[e].readOnly != true){
      try{
        f.elements[e].focus();
      } catch (e) {
      }
      break;
    }
  } else {
    if(f.elements[e].name==pname){
      i = 1;
    }
  }
      }
    }
  }
}


function removeElement(fn,dn){
 var f=document.getElementById(fn);
 var dv=document.getElementById(dn);
 var a;
 var b;
 if (dv != null){
  var divs = dv.getElementsByTagName('DIV');
  for(var e = divs.length-1; e>=0 ; e--){
   if ((divs[e].id != dn) && (divs[e].id != '')){
    removeElement(fn,divs[e].id);
   }
  }
  if (f != null){
   for(var e = f.elements.length-1; e>=0 ; e--) {
    a = f.elements[e].parentNode.id;
    b = dv.id
    if (a==b){
     try{
      dv.removeChild(f.elements[e]);
     } catch (e) {
     }
    }
   }
  }
 }
}

function FieldValue(f,e){
  var ans ='';
  var typ = f.type;
  var i = 0;
  var j = 0;
  if (typ == undefined){
    typ = f[0].type;
  }
  switch (typ){
  case "radio":
    j = f.length;
    for(i = 0; i < j; i++) {
      if(f[i].checked) {
  ans = f[i].value;
  break;
      }
    }
    break;
  case "checkbox":
    if (f.checked){
      ans = f.value;
    }
    break;
  case "select-multiple":
    j = f.length;
    for(i = 0; i < j; i++) {
      if(f.options[i].selected) {
        ans = ans + ';|;' + f.options[i].value;
    }
    }
    break;
  default:
    if ($(f).data('luv')){
      ans = $(f).data('luv');
    } else {
      ans = f.value;
    }
  }
  // if called as a post, do not encode & and %. If called from EIP then do.
  if ((ans != undefined) && ((e == 0) || (e == undefined))){
                ans = ans.replace(/%/g,"%25");
                ans = ans.replace(/&/g,"%26");
                ans = ans.replace(/#/g,"%23");
				ans = ans.replace(/\+/g,"%2B");
        }
  return ans
}

function SetSessionValue(name,value){
	$.get('SetSessionValue'+ntdExt,name+'='+value+'&_ajax_=1',function(data){xmlProcess(data);});
}

function TabChanged(url,value){
	$.get(url+ntdExt,'_tab_='+value+'&_ajax_=1',function(data){xmlProcess(data);});
}

function aGet(url,parms){
	$.get(url+ntdExt,parms+'&_ajax_=1&_cb_='+url,function(data){xmlProcess(data);ntWidth();});
}

function GetTab(name){
	$.get(name+ntdExt,'_ajax_=1',function(data){xmlProcess(data);});
}

function xmlProcess(data,processString){
	if ((typeof(data) == 'string') && (processString != true)) {
		$('html').trigger("ajaxComplete");
		return;
	}
	$('response',data).each(function(i){
		var t = $("response",data).get(i); // returns Element object
		var e = $(t).attr("type");
		if (window.ActiveXObject) {  //for IE
			var s = t.xml;           // IE 9 doesn't get this
			if (s == undefined){
						var s = (new XMLSerializer()).serializeToString(t); // but IE9 can do this, which IE7/8 can't
			}
		} else { // code for Mozilla, Firefox, Opera, etc.
			var s = (new XMLSerializer()).serializeToString(t);
		}
		if (s){
			s = s.substring(s.indexOf('>')+1,s.lastIndexOf('<'));
			if (e=='element'){
				d = $(t).attr("id");
				$("#"+d).replaceWith(s);
				try{$("#"+d).page().removeClass("ui-page").css('border',0);} catch(e){};
			} else if (e=='script'){
				s = s.replace(/&quot;/g,'"');
				s = s.replace(/&amp;/g,"&");
				s = s.replace(/&lt;/g,"<");
				s = s.replace(/&gt;/g,">");
				try{
				eval(s);
				} catch (e){
					try{
					} catch (e){}
				}
			}
		}
	});
	afterSv();
    gradient();
    resetCountDown();
}

// SetServer
function sv(id,name,ev,val,par,sil){
	hadfocus = id;
	if(par==undefined){
		$.get(name+ntdExt,{_event_: ev,value: val,_ajax_:1, _rnd_: Math.random()},function(data){xmlProcess(data);});
	}else{
		var parms='';
		for(var d = 2; d < arguments.length; d++){
			parms += arguments[d] + '&';
		}
		parms += '_ajax_=1&_rnd_=' + Math.random();
		$.get(name+ntdExt,parms,function(data){xmlProcess(data);});
	}
}

//Set timer
function SetTimer(name,t,par,sil){
	if(par==undefined)  {par='fred=1'};
	if(sil==undefined)  {sil='fred=2'};
	setTimeout("sv('','"+name+"','','','"+par+"','"+sil+"');",t);
};

// SelectDate and ResetAfterDate called by Date Lookup button
var cr1;
var cs;
var ct;
var cb1;
var cb2;
// SelectDate
function sd(f,e,p,r,b1,b2){
 ct = document.forms[f].elements[e];
 switch (p){
 case "@D6":
 case "@D06":
  var c = new calendar6(ct);
  break;
 case "@D2":
 case "@D02":
  var c = new calendar2(ct);
  break;
 }
 c.popup();
 if (arguments.length == 4){
  cr1 = r;
  cs = 1;
 }
 if (arguments.length == 6){
  cr1 = r;
  cs = 2;
  cb1 = b1;
  cb2 = b2;
 }
}
// ResetAfterDate
// removed in 7.24 - I think it's no longer used here - it's moved into nt-browse
//function rad(){
//	if (cs==1){
//		sv('',cr1,1,ct.value);
//		cs = 0;
//	}
//	if (cs==2){
//		sv('',cr1,cb1,cb2,'Value='+ct.value);
//		cs = 0;
//	}
//}

// jQuery Default Settings
jQuery.datepicker.setDefaults({
   closeText: 'Cancel',
   dateFormat: 'm/dd/yy',
   showButtonPanel: true,
   showOn: 'button',
   buttonImageOnly: true,
   buttonImage: 'styles/images/calendar.gif',
   buttonText: 'Calendar',
   constrainInput: false
});

// html5 helper-functions for browsers that don't yet support html5.
// Modernizr is used as a detector so if browser has native support these functions do nothing.
// ---------------------------------------------
function applyPlaceHolderElement(e){
 var t = e.attr('placeholder');
 var f = e.parents('form:first');
 if (e.val() === ''){
  e.val(t);
  e.css('color', '#888');
 }
 e.bind('focus.placeholder', function(event) {
  if (e.val() === t){
   e.val('');
  }
  e.css('color', '');
 });
 e.bind('blur.placeholder', function(event) {
  if (e.val() === ''){
         e.val(t);
   e.css('color', '#888');
  }
 });
 f.bind("submit.placeholder", function(event) {
  if (e.val() === t){
   e.val("");
  }
 });
};

// ---------------------------------------------
// Jan 2010 - Webkit support placeholder on a <input> but none yet on <textarea>
function applyPlaceHolder(){
	$('[placeholder]').each(function(i) {
		var e = $(this);
		if (!Modernizr.input.placeholder && e.type === 'INPUT'){
			// do nothing
		} else {
			if ($(e).is(":focus")) {
				// do nothing
			} else {
				applyPlaceHolderElement(e);
			}
		};
	});
};
// ---------------------------------------------
function removePlaceHolder(){
	$('[placeholder]').each(function(i) {
		var e = $(this);
		if (e.val() === e.attr('placeholder')){
			e.val("");
		}
	});
};
// ---------------------------------------------
function applyHTML5(){
	applyPlaceHolder();
}
// ---------------------------------------------
function bubbleStyle(div,attr,col){
    if ((attr=='background-color') && (col != 'transparent')){
		$("#"+div).parent().css('background-color',col);
        $("#"+div).css('background-color','transparent');
        $("#"+div).parent('[class~="nt-grad"]').each(function(){
			if (Modernizr.cssgradients ==  false){
				if (window.ActiveXObject) {  //for IE
					var ua = navigator.userAgent;
					var re  = new RegExp("MSIE ([0-8]{1,}[\.0-8]{0,})");
					if (re.exec(ua) != null){
						$("#"+div).parent().each(function(){
							this.style.filter = '"filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+col+', endColorstr=#FFFFFFFF)"';
						});
					}
				}
			} else {

				$(this).css('background','linear-gradient(to top, #FFFFFF 0%, '+col+' 75%)');
				//$("#"+div).parent().css('background','-webkit-gradient(linear, 0 0, 0 100%, from('+col+'), to(#FFFFFF))');
				//if ($("#"+div).parent().css('background') == ''){
				//	$("#"+div).parent().css('background','-moz-linear-gradient(center bottom, #FFFFFF 0%, '+col+' 75%)');
				//}


			}
		});
    }
}

function gradient(){
	$('.nt-grad').each(function(){
		var col = $(this).css('background-color');
		if ((col != 'transparent') && (col != 'rgba(0, 0, 0, 0)')){
			if (Modernizr.cssgradients ==  false){
				if (window.ActiveXObject) {  //for IE
					var ua = navigator.userAgent;
					var re  = new RegExp("MSIE ([0-8]{1,}[\.0-8]{0,})");
					if (re.exec(ua) != null){
						this.style.filter = '"filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='+col+', endColorstr=#FFFFFFFF)"';
					}
				}
			} else {
				$(this).css('background','linear-gradient(to top, #FFFFFF 0%, '+col+' 75%)');			
				//$(this).css('background','-webkit-gradient(linear, 0 0, 0 100%, from('+col+'), to(#FFFFFF))');
				//if ($(this).css('background') == ''){
				//	$(this).css('background','-moz-linear-gradient(center bottom, #FFFFFF 0%, '+col+' 75%)');
				//}
			}
        }
	});
}

// ---------------------------------------------
function browseCssSupport(){
// $('body').prepend('<div id="_ntbc_" class="nt-browse-colors"></div>');
}

// ---------------------------------------------
jQuery(document).ready( function(){jQuery('.rounded').corners();});

// ---------------------------------------------
// run html5 support scripts when page opens
jQuery(document).bind('ready', function(event) {
	applyHTML5();
	gradient();
    browseCssSupport();
});
// ---------------------------------------------
// IE checkbox / radio fix for IE <= 8
// http://norman.walsh.name/2009/03/24/jQueryIE
$(function () {
	if (window.attachEvent && !window.addEventListener) { // detects IE8 and below
        $('input:radio, input:checkbox').bind('click.iefix',function () {
            this.blur();
            this.focus();
        });
    }
});


// ---------------------------------------------
//  Extension of jQueryUi dialog to add a call to SetAccess
// ---------------------------------------------
(function(jQuery){
    var _init = jQuery.ui.dialog.prototype._init;

    //Custom Dialog Init
    jQuery.ui.dialog.prototype._init = function() {
        _init.apply(this, arguments);
        var _this=this;
    if ((this.options.addsec != '') && (this.options.addsec != undefined)){
            tb = this.uiDialogTitlebar;
            tb.append('<a href="#" id="dialog-access" class="dialog-access ui-dialog-titlebar-access ui-corner-all"><span class="ui-icon ui-icon-key"></span></a>');
            //Secwin Button
            jQuery('.dialog-access', tb).hover(function(){
                jQuery(this).addClass('ui-state-hover');
            }, function(){
                jQuery(this).removeClass('ui-state-hover');
            }).click(function(){
                ntd.push('secwinwebuseraccess','','header',1,2,null,'','','_screen_=' + _this.options.addsec);
                return false;
            });
        }
    };

})(jQuery);


function swpf(id,addsec){
	$('#form-access-'+id).prepend('<a href="#" id="a-form-access-'+id+'" class="nt-form-page-access ui-widget-header ui-corner-all"><span class="ui-icon ui-icon-key"></span></a>');
	$('#a-form-access-'+id).hover(function(){
		$(this).addClass('ui-state-hover');
	}, function(){
		$(this).removeClass('ui-state-hover');
	}).click(function(){
		ntd.push('secwinwebuseraccess','','header',1,2,null,'','','_screen_=' + addsec);
		return false;
	});
}

function primeLocation(pLat,pLong,pAlt,pAcc,pAltAcc,pHeading,pSpeed){
	navigator.geolocation.getCurrentPosition(
		function(pos){ // location found
			$(pLat).val(pos.coords.latitude);
			$(pLong).val(pos.coords.longitude);
			$(pAlt).val(pos.coords.altitude);
			$(pAcc).val(pos.coords.accuracy);
			$(pAltAcc).val(pos.coords.altitudeAccuracy);
			$(pHeading).val(pos.coords.heading);
			$(pSpeed).val(pos.coords.speed);
			
		},
		function(pos){ // location not found
		});
}

function getLocation(){
	navigator.geolocation.getCurrentPosition(sendLocation,noSendLocation);
}

function sendLocation(pos){
	$.get('SetSessionValue'+ntdExt,'_Latitude_=' + pos.coords.latitude +
                               '&_Longitude_=' + pos.coords.longitude +
                               '&_Altitude_=' + pos.coords.altitude +
                               '&_Accuracy_=' + pos.coords.accuracy +
                               '&_AltitudeAccuracy_=' + pos.coords.altitudeAccuracy +
                               '&_Heading_=' + pos.coords.heading +
                               '&_Speed_=' + pos.coords.speed +
                               '&_LocationUnixTime_=' + parseInt(pos.timestamp/1000) +
                               '&_LocationDate_=' + parseInt(pos.timestamp / 86400000 + 61730) +
                               '&_LocationTime_=' + parseInt((pos.timestamp % 86400000) / 10) +
                               '&_LocationError_=' +
                               '&_ajax_=1'
         ,function(data){xmlProcess(data);});
}

function noSendLocation(err){
	switch(err.code){
		case err.PERMISSION_DENIED: SetSessionValue('_LocationError_',err.code + '_permission_denied');
		break;
		case err.POSITION_UNAVAILABLE: SetSessionValue('_LocationError_',err.code + '_position_unavailable');
		break;
		case err.TIMEOUT: SetSessionValue('_LocationError_',err.code + '_timeout');
		break;
		default: SetSessionValue('_LocationError_',err.code + '_unknown');
		break;
	}
};

function ntPlay(wav){
	var audio = new Audio(wav);
	audio.play();
};

function ntWidth(){
	$('#body_div').css('min-width',$('#contentbody_div').outerWidth(true) + $('.nt-menuleft:first').outerWidth(true) +20);
}

//window.name = Math.random().toString(36).substr(5);

function consoleLog(s){
  //$('#consolelog').append(s + '<br/>')
}

function today(pic){
	var p=0;
	var td = new Date(); // primed with current date and time
	return formatDate(td,pic);
}
function formatDate(td,pic){
	var zero=false;

	var dd = td.getDate();
	var mm = td.getMonth()+1; //January is 0!
	var yyyy = td.getFullYear();
	if (!pic){
		p = 1;
	} else { // default to mm/dd/yyyy
		if (pic.charAt(0) == '@'){
			pic = pic.substring(1) // remove leading @
		}
		if (pic.charAt(0) == 'D' || pic.charAt(0) == 'd'){
			pic = pic.substring(1) // remove leading D or d
		}
		if (pic.charAt(0) == '0'){
			zero = true;
		}
		p = parseInt(pic);
		if ( p < 1){ p = 1};
	}	
	switch(p){
	case 1: // mm/dd/yyyy
	case 2: 
		if (zero){
			if(mm<10) { mm='0'+mm} 			
		}

		if(dd<10) {	dd='0'+dd} 
		td = mm+'/'+dd+'/'+yyyy;
		break;
	case 3: 
		break;
	case 4: 
		break;
	case 5: 
	case 6: 
		if (zero){
			if(dd<10) {	dd='0'+dd} 
		}
		if(mm<10) { mm='0'+mm} 			
		td = dd+'/'+mm+'/'+yyyy;
		break;
	case 7: 
		break;
	case 8: 
		break;
	case 9: 
	case 10: 
		if(dd<10) {	dd='0'+dd} 
		if(mm<10) { mm='0'+mm} 			
		td = yyyy+'/'+mm+'/'+dd;	
		break;
	case 11: 
		break;
	case 12: 
		break;
	case 13: 
		break;
	case 14: 
		break;
	case 15: 
		break;
	case 16: 
		break;
	default:
		if(dd<10) {	dd='0'+dd} 
		if(mm<10) { mm='0'+mm} 
		td = mm+'/'+dd+'/'+yyyy;	
		break;
	}	
	return td;
}
function clock(pic){
	var td = new Date();
	var hh = td.getHours(); // => 9
	var mm = td.getMinutes(); // =>  30
	var ss = td.getSeconds(); // => 51
	if(ss<10) {	ss='0'+ss} 
	if(mm<10) { mm='0'+mm} 
	td = hh+':'+mm+':'+ss;	
	return td;
	
}
function GetUserTimeOffset(){
	date = new Date();
	SetSessionValue('_UserTimeOffset_',date.getTimezoneOffset()) 
}             
;///////////////////////////////////////////////////////
//
//   jQuery Plugin for NetTalk Browse
//   Part of NetTalk by CapeSoft
//   (c) 2013
//
///////////////////////////////////////////////////////

(function( $, undefined ) {

$.widget( "ui.ntbrowse",  $.mobile.widget, {
        options: {
			id: '',               // contains div name (minus the _div part)
			mobile:0,
			randomid: '',
			procedure: '',            // server procedure
			title: '',            // title for dialog
			parent: '',           // parent procedure which is including this browse
			parentrid: '',        // rid of parent procedure if it is a browse
			form: '',             // url of the form procedure
			formInsert: '',
			formCopy: '',
			formChange: '',
			formView: '',
			formDelete: '',
			formpopup: 1,         // is the form procedure opened as a popup?
			popup: 0,             // is the browse on a popup window
			bgOne:'nt-browse-gb1',                  // first color used in greeen-barring
			bgTwo:'nt-browse-gb2',                  // second color used in green-barring
			bgOver:'nt-browse-mouseover',                   // color for row currently under mouse
			bgSelect:'nt-browse-selected',                  // highlight color - shows selected record
			rowsHigh:1,
			column:0,
			highlightSelected:1,
			greenbar:1,
			mouseover:1,
			rowSelected:1,
			resizable:0,
			value: '',
			selectAction: '',
			closeAction: '',
			lookupField: '',
			confirmDelete:1,
			confirmDeleteMessage:'Are you sure you want to delete this record?',
			deleteText:'Delete',
			cancelText:'No',
			confirmText:'Confirm',				
			expand: 'circle-arrow-s',
			contract: 'circle-arrow-n',
			addsec:'',    				// secwin access rights procedure name
			urlExt:''

		},
		state: {
			exportProgress:'',
			exportButton:''
		},
		locVal:'',

		//------------------------------------------------------
        _create: function() {
			var _this=this;
			this.options.divId = '#' + this.options.id + '_div';
			$(this.options.divId).addClass("exists");
			this.options.tableId = '#' + this.options.id + '_tbl';
			if (this.options.urlExt==''){try{this.options.urlExt=ntdExt} catch(e){};}
			this.ready();			
        },

		//------------------------------------------------------
        _init: function() {
        },

		//------------------------------------------------------
		ready: function() {
			this._prepColumns();
			this._makeResizable();
			this._bindEvents();
			this.refresh();
			if (this.options.popup==1){
				try{
					$("#popup_" + this.options.procedure + "_div").dialog("option","title",this.options.title);
				} catch (e) {};	
			}					
        },

		//------------------------------------------------------
        destroy: function() {
			$.Widget.prototype.destroy.apply( this, arguments );
        },

		//------------------------------------------------------
		// called on window unload event
        destructor: function() {
			var parms = '_rid_=' + this.options.randomid + '&_event_=clearbrowse';
//                $.get(this.options.procedure + this.options.urlExt,parms,function(data){}); in page mode, to memory form, from button under browse, this is a problem as it can delete the bidv too early.
			return this;
        },

		//------------------------------------------------------
        _bindEvents : function() {
			var _this = this;
			$(this.element).off('focus.bt','[data-do="lo"]').on('focus.bt','[data-do="lo"]',function(e){_this.locateFocus(this);});
			$(this.element).off('blur.bt','[data-do="lo"]').on('blur.bt','[data-do="lo"]',function(e){_this.locateBlur(this);});
			$(this.element).off('asifBlur.bt','[data-do="lo"]').on('asifBlur.bt','[data-do="lo"]',function(e){_this.locateAsifBlur(this,e);});
			$(this.element).off('change.bt','[data-do="lo"]').on('change.bt','[data-do="lo"]',function(e){_this.locate(this,e);});
			$(this.element).off('input.bt','[data-do="lo"]').on('input.bt','[data-do="lo"]',function(e){_this.locate(this,e);});
			$(this.element).off('valuechanged.bt','[data-do="lo"]').on('valuechanged.bt','[data-do="lo"]',function(e){_this.locateChanged(this);});
			$(this.element).off('change.bt','[data-do="eip"]').on('change.bt','[data-do="eip"]',function(e){_this.eip(this);});
			$(this.element).off('click.bt','[data-do="cv"]').on('click.bt','[data-do="cv"]',function(e){_this.toggleRowStatus(this);});
			$(this.element).off('click.bt','[data-do="bserver"]').on('click.bt','[data-do="bserver"]',function(e){_this.bbutton(this);});
			$(this.element).off('click.bt','[data-do="sh"]').on('click.bt','[data-do="sh"]',function(e){_this.sort(this,$(this).attr('data-value'));});
			$(this.element).off('click.bt','[data-do="clo"]').on('click.bt','[data-do="clo"]',function(e){_this.clearLocator();});
			$(this.element).off('click.bt','[data-do="insert"]').on('click.bt','[data-do="insert"]',function(e){_this.edit(this,1,'insert');});
			$(this.element).off('click.bt','[data-do="copy"]').on('click.bt','[data-do="copy"]',function(e){_this.edit(this,4,'copy');});
			$(this.element).off('click.bt','[data-do="change"]').on('click.bt','[data-do="change"]',function(e){_this.edit(this,2,'change');});
			$(this.element).off('click.bt','[data-do="view"]').on('click.bt','[data-do="view"]',function(e){_this.edit(this,5,'view');});
			$(this.element).off('click.bt','[data-do="deleteb"]').on('click.bt','[data-do="deleteb"]',function(e){_this.deleteb(this);});
			$(this.element).off('click.bt','[data-do="browsecancel"]').on('click.bt','[data-do="browsecancel"]',function(e){_this.cancel();});
			$(this.element).off('click.bt','[data-do="close"]').on('click.bt','[data-do="close"]',function(e){_this.close();});
			$(this.element).off('click.bt','[data-do="select"]').on('click.bt','[data-do="select"]',function(e){_this.select(this);});
			$(this.element).off('click.bt','[data-do="first"]').on('click.bt','[data-do="first"]',function(e){_this.nav('','first');});
			$(this.element).off('click.bt','[data-do="previous"]').on('click.bt','[data-do="previous"]',function(e){_this.nav('','previous');});
			$(this.element).off('click.bt','[data-do="next"]').on('click.bt','[data-do="next"]',function(e){_this.nav('','next');});
			$(this.element).off('click.bt','[data-do="last"]').on('click.bt','[data-do="last"]',function(e){_this.nav('','last');});
			$(this.element).off('click.bt','[data-do="export"]').on('click.bt','[data-do="export"]',function(e){_this.exportTo('excel',this);});
			return this;
        },

		//------------------------------------------------------
        refresh : function(v) {
			this.setvalue(v);
			this.options.table=document.getElementById(this.options.id + '_tbl');
			if (this.options.value){
				this.options.rowSelected = $('[data-nt-id="' + this.options.value + '"]').closest('tr').prevAll().length;
				this.options.rowSelected = parseInt(this.options.rowSelected/this.options.rowsHigh) * this.options.rowsHigh;
			} else {
				this.options.rowSelected = -1
			}	
		
			this._applyGreenBar();
			this._preContractVertically();
			
			var _this = this;
			
			$(this.options.tableId + '> tbody > tr')
					.off('mouseover.bt mouseout.bt click.bt dblclick.bt')
					.on('mouseover.bt',function(ev){_this._onMouseIn(this,ev);})
					.on('mouseout.bt',function(ev){_this._onMouseOut(this,ev);})
					.on('dblclick.bt',function(ev){_this._onDoubleClick(this,ev);})
					.on('click.bt',function(ev){_this.clickRow(this,ev);});

			$(this.options.tableId + ' input')
				.off('keydown.bt focus.bt')
				.on('keydown.bt',function(e){_this._keydown(this,e);})
				.on('focus.bt',function(e){_this._setColumn(this,e);});
				
			$('#locator1' + _this.options.id + ',' + '#locator2' + _this.options.id)
				.off('keypress.bt')
				.off('keydown.bt')
				.off('keyup.bt')
				//.on('keypress.bt',function(e){return _this._keyPressLoc(this,e);})
				//.on('keyup.bt',function(e){return _this._keyUpLoc(this,e);})
				.on('keydown.bt',function(e){return _this._keyDownPaging(this,e);});
			return this;
        },

		//------------------------------------------------------
        activeTab: function( newValue ) {
			if ( newValue === undefined ) {
					return this.options.activeTab;
			}
			this._setOption( "activeTab", newValue );
			return this;
        },

		//------------------------------------------------------
        _setOption: function( opt, value ) {
			switch (opt){
			case "bgOver":
					this.options.bgOver = value;
					break;
			case "bgSelect":
					this.options.bgSelect = value;
					break;
			case "bgOne":
					this.options.bgOne = value;
					break;
			case "bgTwo":
					this.options.bgTwo = value;
					break;
			}
			$.Widget.prototype._setOption.apply( this, arguments );
        },

		//------------------------------------------------------
		colorBlock : function(block,what) {  // sets the color of a multi-row block.
			if ((this.options.greenbar == 0) && (this.options.mouseover==0) && (this.options.highlightSelected==0)){
				return 0;
			}

			var _this=this;
			var col=this.options.bgOne;
			var i = parseInt(block*this.options.rowsHigh);
			if (i > this.options.table.tBodies[0].rows.length){
					return 1;
			}

			if (this.options.mouseover==1 && what==1){
					col=this.options.bgOver;
			} else if(this.options.highlightSelected==1 && this.options.rowSelected==i){
					col=this.options.bgSelect;
			} else if (this.options.greenbar==1){
					col=(block%2==0) ?  this.options.bgOne :  this.options.bgTwo;
			}

			$(this.options.tableId + '> tbody > tr').
					slice(i,i+_this.options.rowsHigh).each(function(){
							$(this).removeClass(_this.options.bgOne + ' ' + _this.options.bgTwo + ' ' + _this.options.bgOver + ' ' + _this.options.bgSelect).
							addClass(col);
					});
			return 0;
		},

		//------------------------------------------------------
		_colorRow : function(row,what) {  // draws a whole block, based on a row index
			this.colorBlock(parseInt(row / this.options.rowsHigh),what);
		},

		//------------------------------------------------------
		_onMouseIn : function(row,ev) {
			if ($(ev.currentTarget).parent().is("tbody")){
				this._colorRow(row.sectionRowIndex,1);
			}
			ev.stopPropagation()
			return this;
		},

		//------------------------------------------------------
		_onMouseOut : function(row,ev) {
			if ($(ev.currentTarget).parent().is("tbody")){
				this._colorRow(row.sectionRowIndex);
			}
			ev.stopPropagation()
			return this;
		},

		//------------------------------------------------------
		_onDoubleClick : function(row,ev) {
			if ($(row).attr('data-nt-id') != ''){
				if($(row).attr('data-do') == "ds"){
					this.select(this);
				} else if($(row).attr('data-do') == "dc"){
					this.edit(this,2,'change');  
				} else if($(row).attr('data-do') == "dv"){	
					this.edit(this,5,'view');  
				}
			}	
			return this;
		},
		//------------------------------------------------------
		clickRow : function(row,ev) {
			var i = this.options.rowSelected;       // this.rowSelected holds the index of the first row in the selcted block.
			this.options.rowSelected = parseInt(row.sectionRowIndex/this.options.rowsHigh) * this.options.rowsHigh;
			this._colorRow(i);
			this._colorRow(row.sectionRowIndex);
			var phf = $(row).attr('data-nt-id');
			this.setvalue(phf);
			this.server('_event_=rowclicked','_bidv_='+phf);
			this.options.value = phf;
			if($(row).attr('data-do') == "ss"){
				this.select();
			} else if($(row).attr('data-do') == "sc"){
				this.edit(this,2,'change');
			}	

			//this.alertParent('clickrow'); // parent is now alerted on server side, 7.11
			return this;
		},

		//------------------------------------------------------
		_applyGreenBar : function() {
			if (this.options.table == null){
				return;
			}
			if (this.options.table.tBodies[0] == null){
				return;
			}
			if ((this.options.greenbar == 0) && (this.options.highlightSelected == 0) && (this.options.mouseover == 0)){
				return;
			}
			var b = 0;
			while(this.colorBlock(b) == 0){
				b++;
			}
			return this;
		},

		//------------------------------------------------------
		_makeResizable : function() {
			if(this.options.resizable == 1){
				var _this = this;
				$('#' + _this.options.id.toLowerCase() + '_table_resize_div')
					.resizable({minwidth: _this.options.minwidth,minheight: _this.options.minheight,stop: function(event,ui){_this.resized();}});
			}
			return this;
		},

		//------------------------------------------------------
		resized : function() {
			this.server('_event_=resized&_width_=' + $(id).width() + '&_height_=' + $('#'+this.options.id.toLowerCase()+'_table_div').height());
			return this;
		},

		//------------------------------------------------------
		_restoreFocus : function() {
			if (this.options.column != 0){
				$(this.options.tableId + ' tbody > tr:first').children('td:eq('+this.options.column+')').find(':input:first').focus();
			}
			return this;
		},

		//------------------------------------------------------
		_setColumn : function(inp,e) {
			this.options.column = $(inp).closest('td').prevAll().length;
			return this;
		},

		//------------------------------------------------------
		_keyDownPaging : function(inp,e) {    // handle paging keys in EIP and locator fields
			if ((e.which == 191) && (e.shiftKey == true)){ // 191=?
				e.which = ntLookupKey;
			}

			switch(e.which){
				case 13: {
					$(inp).change();
					e.preventDefault();
					return false;
				}

				case $.ui.keyCode.PAGE_UP: {
					this.nav(inp.id,'previous');
					return false;
				}

				case $.ui.keyCode.PAGE_DOWN: {
					this.nav(inp.id,'next');
					return false;
				}

				case $.ui.keyCode.HOME: {
					if (e.ctrlKey==true){
						this.nav(inp.id,'first');
						return false;
					}
				}

				case $.ui.keyCode.END: {
					if (e.ctrlKey==true){
						this.nav(inp.id,'last');
						return false;
					}
				}

				//case 191:  // ?
				case ntLookupKey: {// F2 by default
					$("#"+inp.id+".hasDatepicker").each(
						function(i,v){
							e.preventDefault();
							$(inp).datepicker("show");
							return false;
						}
					);


					$("#"+inp.id).next(':button').each(
						function(i,v){
							$(this).click();
							return false;
						}
					)
				}
				return true;
			}
			return this;
		},

		//------------------------------------------------------
//		_keyPressLoc : function(inp,e) {      // Handle enter key in locator fields
//			if (e.which == 13){
//				e.preventDefault();
//				return false;		

//			}
//			return true;
//		},
		//------------------------------------------------------
//		_keyUpLoc : function(inp,e) {      // Handle char key in locator fields when immediate locating is on
//			if ($(inp).attr('data-imm')=='true'){
//				this.locVal = $(inp).val();
//				this.server('_event_=locatorchanged&_refresh_=locate',$(inp).attr("id")+'='+encodeURIComponent(this.locVal));

//			}			
//			return true;
//		},
		//------------------------------------------------------
		_keydown : function(inp,e) {  // bind up and down arrow keys in EIP in browse
			switch(e.which){
				case $.ui.keyCode.DOWN: {
					this._setColumn(inp,e);
					$(inp).closest('tr').nextAll(':eq(0)').children('td:eq('+this.options.column+')').find(':input:first').focus();
					e.which = 0;
					return false;
				}
				case $.ui.keyCode.UP: {
					this._setColumn(inp,e);
					$(inp).closest('tr').prevAll(':eq(0)').children('td:eq('+this.options.column+')').find(':input:first').focus();
					e.which = 0;
					return false;
				}
			}
			return this._keyDownPaging(inp,e);
		},

		//------------------------------------------------------
		_preContractVertically : function() {
			var _this=this;
			$(this.options.divId).find('[data-nt-ctd="true"]').each(function(i,elem){
				_this.setRowStatus(elem,true);
			});
			$(this.options.divId).find('[data-nt-ctd="false"]').each(function(i,elem){
				_this.setRowStatus(elem,false);
			});
			return this;
        },
		//------------------------------------------------------
		toggleRowStatus : function(elem) {
			//var l = this.options.rowsHigh-1;
			var tr = $(elem).closest('tr');
			if ($(elem).attr('data-nt-ctd')=='true'){
				var state=false;
			} else {
				var state=true;
			}	
			//var state = ($(tr).nextAll(':lt('+l+')').is(':visible'))
			this.setRowStatus(elem,state);
			this.server('_event_=expcon','_bidv_='+ $(tr).attr('data-nt-id') +'_status_=' + state);
			
        },
		//------------------------------------------------------
		setRowStatus : function(elem,state) { // if state is true then row much be contracted (ie minimised).

			var exp = 'ui-icon-' + this.options.expand;
			var con = 'ui-icon-' + this.options.contract;
			var l = this.options.rowsHigh-1;
			if (state){ 
				$(elem).removeClass(con).addClass(exp).attr('data-nt-ctd','true').closest('tr').children('td').each(function(){
					$(this).attr('rowspanwas',$(this).attr('rowspan'));
					$(this).attr('rowspan',1)
				});
				$(elem).closest('tr').nextAll(':lt('+l+')').hide();
			} else {
				$(elem).removeClass(exp).addClass(con).attr('data-nt-ctd','false').closest('tr').children('td').each(function(){
					$(this).attr('rowspan',$(this).attr('rowspanwas'));
				});
				$(elem).closest('tr').nextAll(':lt('+l+')').show();
			}
			return this;
		},
//------------------------------------------------------
		_prepColumns : function() {
			var _this=this;
			if ((this.options.addsec != '') && (this.options.addsec != undefined)){
				var k = $('#'+_this.options.id.toLowerCase()+'_table_div').find('th:last').find('[data-key]').attr('data-key');
				if (k == undefined){
					$('#'+_this.options.id.toLowerCase()+'_table_div').find('th:last').append('<div class="nt-right" data-key="true"><a href="#" id="' + _this.options.id.toLowerCase() + '-browse-access" class="nt-browse-titlebar-access"><span class="ui-icon ui-icon-key"></span></a></div>');
					//Secwin Button
					$('#' + _this.options.id.toLowerCase() + '-browse-access').hover(function(){
						$(this).addClass('ui-state-hover');
					}, function(){
						$(this).removeClass('ui-state-hover');
					}).click(function(){
						ntd.push('secwinwebuseraccess','','header',1,2,null,'','','_screen_=' + _this.options.addsec);
						return false;
					});
				}
			}
			return this;
		},

        //------------------------------------------------------
        // needs refactor
		ec : function(hcb) {          // checkbox on top of column to set checkbox in whole column.
			for(var i=0;i<this.options.table.tHead.rows[0].cells.length;i++){
				if (this.options.table.tHead.rows[0].cells[i] == hcb.parentNode){
					var c = i;
				}
			}
			this.quiet = 1;
			for(i=0;i<this.options.table.tBodies[0].rows.length;i++){
				var o = this.options.table.tBodies[0].rows[i].cells[c].firstChild;
				cb = getCheckbox(o);
				if (cb != null){
					cb.checked = hcb.checked;
					cb.onclick();
				}
			}
			this.quiet = 0;
			return this;
		},

        //------------------------------------------------------
        disableButton : function(elem){
			try{$(elem).attr("disabled","disabled").removeClass('ui-state-focus').button( "refresh" );} catch (e) {};
        },
        //------------------------------------------------------
        enableButton : function(elem){
			try{$(elem).removeAttr("disabled").removeClass('ui-state-focus').button("refresh");} catch (e) {};
        },
		
        //------------------------------------------------------		
        bbutton : function(elem){
			this.disableButton(elem);
			this.eip(elem);
        },
        //------------------------------------------------------
		eip : function(elem) {
			var n = $(elem).attr("name");
			var vl= $(elem).data('luv')
			if (vl==undefined){
				vl=FieldValue(elem);
			}

			this.server('_event_=eipaccepted&_action_=2&_eipclm_='+ n.replace(/__/g,":"),'_bidv_=' + $(elem).closest('tr').attr('data-nt-id'),'value='+vl);
			return this;
		},

        //------------------------------------------------------
		setvalue : function(v) {
			if ((v != null) && (v != '')){
				this.options.value = v;
			}

			return this;
		},

        //------------------------------------------------------
		//alertParent : function(cause){
		//	if (this.options.parent != '' && this.options.parent != this.options.id){
		//		var lurl = this.options.parent+'_'+this.options.procedure+'_value';
		//		this.sv(lurl.toLowerCase(),'_event_=1','_bidv_='+this.options.value,'_silent_=0','_cause_=' + cause);
		//	}

		//	return this;
		//},
		//------------------------------------------------------
		exportTo : function(fmt,elem){			
			$(elem).prepend('<div id="ExportProgressLLKP" class="nt-export-progress"></div>');
			this.state.exportButton = elem;
			this.state.exportProgress = $('#ExportProgressLLKP');						
			this.disableButton(this.state.exportButton);
			$(this.state.exportButton).css('opacity','1');
			this.get('_event_=export&_exportto_=' + fmt)
			this.setTimer(2000);
			return this;
		},
		//------------------------------------------------------
		exportProgress : function(p){
			if (p<100){
				$(this.state.exportProgress).css('width',p+'%');
				this.setTimer(2000);
			} else {
				$(this.state.exportProgress).css('width','0%');
				this.enableButton(this.state.exportButton);
			}
		},

		//------------------------------------------------------
		setTimer : function(t) {
			setTimeout("$('"+this.options.divId+"').ntbrowse('server','"+this.options.procedure+"','_event_=timer');",t);
			return this;	
		},
		
		//------------------------------------------------------
		nav : function(f,d){
			this.fadeTable();
			this.server('_event_=nav&_refresh_='+d+'&focus=' + f)
			//this.alertParent('nav');
			return this;
		},

        //------------------------------------------------------
		clearLocator : function(){
			$('#' + this.options.id + '_locator_a_div').find('input').val('');
			$('#' + this.options.id + '_locator_b_div').find('input').val('');
			this.fadeTable();
			this.locVal = '';
			this.server('_event_=locatorchanged&_refresh_=clearlocate')
			return this;
		},
        //------------------------------------------------------
		locate : function(elem,ev){
			if (ev.type=='input'){
				// to handle X in search field, always trigger if the locator is now blank.
				if ($(elem).val() == ''){
					this.clearLocator();
				} else {
					this.locateChanged(elem);
				}
				return this;
			}	
			if ((this.locVal != $(elem).val()) || (($(elem).attr('data-imm')!='true'))){ // tweaked for 7.31, to avoid /index.php?option=com_smf&Itemid=36&topic=5056.msg20017



				this.goLocate(elem);
			}
			return this;
		},

        //------------------------------------------------------
		// can be called from outside if the locator value has been changed.
		locateChanged : function(elem,force){
			// sync the values in both locators
			if (elem.id == 'locator1' + this.options.id){
				$('#locator2' + this.options.id).val($('#locator1' + this.options.id).val())
			} else if (elem.id == 'locator2' + this.options.id){
				$('#locator1' + this.options.id).val($('#locator2' + this.options.id).val())
			}
			// if imm then send the locator to the server
			if (($(elem).attr('data-imm')=='true') || (force)){
				this.goLocate(elem);
			}
		},
        //------------------------------------------------------
		// send the locator to the server
		goLocate : function(elem){
			this.fadeTable();
			this.locVal = $(elem).val();
			this.server('_event_=locatorchanged&_refresh_=locate',$(elem).attr("id")+'='+encodeURIComponent(this.locVal));
		},
        //------------------------------------------------------
		locateFocus : function(elem){
			if ($(elem).attr("data-noFocus") == "true"){
				$(elem).attr("data-noFocus","false");
			} else {	
				try{
					$('#osk').ntosk('getFocus',elem);
				} catch(e) {};
			}	
			try{
				$('#osk').ntosk('show');						
			} catch(e) {};	
		},
        //------------------------------------------------------
		locateBlur : function(){
			try{
				$('#osk').ntosk('startHide');
			} catch(e) {};	
		},
        //------------------------------------------------------
		locateAsifBlur : function(elem,e,i){
			if ( $(elem).val != this.locVal){
				this.locate(elem,e,i);				
			}
			try{
				$('#osk').ntosk('startHide');		
			} catch(e) {};	
		},
        //------------------------------------------------------
		sort : function(elem,s){
			if (s == undefined){
				s = $(elem).children('a').attr('data-value');
			}
			this.server('_event_=sortchanged&_refresh_=sort',this.options.procedure+'_sort_' + this.options.randomid + '='+s);
			return this;
		},

        //------------------------------------------------------
        disable : function(){
			var _this=this;
			$(this.options.divId).find(':button').each(function(i,e){
			if($(e).attr('disabled') != 'disabled' ){
				$(e).attr("data-wait","wait").each(function(i,e){_this.disableButton(e)});;
			}
			})
			$(this.options.tableId + ' tbody > tr').off('mouseover.bt mouseout.bt click.bt') ;
        },
		
        //------------------------------------------------------
        enable : function(){
			var _this=this;
			$(this.options.divId).find('[data-wait="wait"]').removeAttr("data-wait").each(function(i,e){_this.enableButton(e)});
			this._bindEvents();
			this.refresh();
        },
		
        //------------------------------------------------------
        hide : function(){
			$(this.options.divId).hide();
        },
        //------------------------------------------------------
        show : function(){
			$(this.options.divId).show();
        },
        //------------------------------------------------------
        hideTable : function(){
			$(this.options.tableId).fadeOut(200);
			$(this.options.tableId).hide();
        },
        //------------------------------------------------------
        fadeTable : function(){
			$(this.options.tableId).find('input, textarea, button, select').prop("disabled", true);
			$(this.options.tableId).fadeTo(200,0.5)
        },
        //------------------------------------------------------
        unhideTable : function(){
			$(this.options.tableId).css({opacity:1});
			$(this.options.tableId).show();
        },
        //------------------------------------------------------
        serverClearLocator : function(){
			$('#' + this.options.id + '_locator_b_div').find('input').val('');
			$('#' + this.options.id + '_locator_a_div').find('input').val('');
        },
        //------------------------------------------------------
        locatorFocus : function(){
			$('#' + this.options.id + '_locator_b_div').find('input').focus();
			$('#' + this.options.id + '_locator_a_div').find('input').focus();
        },

		//------------------------------------------------------
        hideLocator : function(){
			$('#' + this.options.id + '_locator_b_div').hide();
			$('#' + this.options.id + '_locator_a_div').hide();
        },

        //------------------------------------------------------
        unhideLocator : function(i){
			if (i & 1){
				$('#' + this.options.id + '_locator_b_div').show();
			} else {
				$('#' + this.options.id + '_locator_b_div').hide();
			}
			
			if (i & 2){
				$('#' + this.options.id + '_locator_a_div').show();
			} else {
				$('#' + this.options.id + '_locator_a_div').hide();
			}
        },

        //------------------------------------------------------
        hideSelectButton : function(i){
			if(i){
				$('#'+ this.options.id +'_div').find('[data-do="select"]').hide();
			} else {
				$('#'+ this.options.id +'_div').find('[data-do="select"]').show();
			}	
		},
        //------------------------------------------------------
        hideButton : function(b){
			$('#'+ this.options.id +'_div').find('[data-do="'+b+'"]').hide();
		},
        //------------------------------------------------------
        showButton : function(b){
			$('#'+ this.options.id +'_div').find('[data-do="'+b+'"]').show();
		},
		//------------------------------------------------------
        hideFormButtons : function(i){
			if (i==true){
				$('#' + this.options.id + '_update_b').find('[data-do="insert"]').hide();
				$('#' + this.options.id + '_update_a').find('[data-do="insert"]').hide();			
			} else {
				$('#' + this.options.id + '_update_b').find('[data-do="insert"]').show();
				$('#' + this.options.id + '_update_a').find('[data-do="insert"]').show();
			}
			$('#' + this.options.id + '_update_b').find('[data-do="copy"]').hide();
			$('#' + this.options.id + '_update_a').find('[data-do="copy"]').hide();
			$('#' + this.options.id + '_update_b').find('[data-do="change"]').hide();
			$('#' + this.options.id + '_update_a').find('[data-do="change"]').hide();
			$('#' + this.options.id + '_update_b').find('[data-do="deleteb"]').hide();
			$('#' + this.options.id + '_update_a').find('[data-do="deleteb"]').hide();		
			$('#' + this.options.id + '_update_b').find('[data-do="view"]').hide();
			$('#' + this.options.id + '_update_a').find('[data-do="view"]').hide();		
			$('#' + this.options.id + '_update_b').find('[data-do="export"]').hide();
			$('#' + this.options.id + '_update_a').find('[data-do="export"]').hide();		
        },

        //------------------------------------------------------
        unhideFormButtons : function(){
			$('#' + this.options.id + '_update_b').find('[data-do="insert"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="insert"]').show();
			$('#' + this.options.id + '_update_b').find('[data-do="copy"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="copy"]').show();
			$('#' + this.options.id + '_update_b').find('[data-do="change"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="change"]').show();
			$('#' + this.options.id + '_update_b').find('[data-do="deleteb"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="deleteb"]').show();			
			$('#' + this.options.id + '_update_b').find('[data-do="view"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="view"]').show();			
			$('#' + this.options.id + '_update_b').find('[data-do="export"]').show();
			$('#' + this.options.id + '_update_a').find('[data-do="export"]').show();			
        },

        //------------------------------------------------------
        hideNav : function(){
			$('#' + this.options.id + '_nav_a').hide();
			$('#' + this.options.id + '_nav_b').hide();
        },
		
        //------------------------------------------------------
        unhideNav : function(disablePrev,disableNext){
			var _this=this;
			$('#' + this.options.id + '_nav_a').show();
			$('#' + this.options.id + '_nav_b').show();
			if (disablePrev==true){
				$('#' + this.options.id + '_nav_b').find('[data-do="first"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_b').find('[data-do="first"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_b').find('[data-do="previous"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="first"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="previous"]').each(function(i,e){_this.disableButton(e)});
			} else if (disablePrev==false) {
				$('#' + this.options.id + '_nav_b').find('[data-do="first"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_b').find('[data-do="previous"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="first"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="previous"]').each(function(i,e){_this.enableButton(e)});
			}
			if (disableNext==true){
				$('#' + this.options.id + '_nav_b').find('[data-do="last"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_b').find('[data-do="next"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="last"]').each(function(i,e){_this.disableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="next"]').each(function(i,e){_this.disableButton(e)});
			} else if (disableNext==false){
				$('#' + this.options.id + '_nav_b').find('[data-do="last"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_b').find('[data-do="next"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="last"]').each(function(i,e){_this.enableButton(e)});
				$('#' + this.options.id + '_nav_a').find('[data-do="next"]').each(function(i,e){_this.enableButton(e)});
			}
        },
		
        //------------------------------------------------------
		edit : function(elem,action,header){    
			var actionname='';
			var actionform='';
			var actionFormOverride='';
			this.setvalue($(elem).closest('tr').attr('data-nt-id'));
			switch(action){
			case 1: //Insert
				actionname ='insert_btn';
				actionform = $('[data-nt-id="'+this.options.value+'"]').attr('data-nt-insert');
				if (!actionform){
					actionform = this.options.formInsert;
				}
				break;
			case 2: //Change
				actionname ='change_btn';
				actionform = $('[data-nt-id="'+this.options.value+'"]').attr('data-nt-change');
				if (!actionform){
					actionform = this.options.formChange;
				}
				break;
			case 3: //Delete
				actionname ='change_btn';
				actionform = $('[data-nt-id="'+this.options.value+'"]').attr('data-nt-delete');
				if (!actionform){
					actionform = this.options.formDelete;
				}
				break;
			case 4: //Copy
				actionname ='copy_btn';
				actionform = $('[data-nt-id="'+this.options.value+'"]').attr('data-nt-copy');
				if (!actionform){
					actionform = this.options.formCopy;
				}
				break;
			case 5: //View
				actionname ='view_btn';
				actionform = $('[data-nt-id="'+this.options.value+'"]').attr('data-nt-view');
				if (!actionform){
					actionform = this.options.formView;
				}
				break;
			}
			if (actionform == ''){
				actionform = this.options.form;
			}
			if (this.options.formpopup){     
				header = ''; // don't default the header when called from a browse.
				ntd.push(actionform,'',header,1,action,null,this.options.procedure,this.options.value,'_parentProc_=' + this.options.parent,null,null,null,null,null,null,this.options.divId);
			} else {
				this.gotoPage(actionform,actionname,this.options.value);
			}
			return this;
		},

        //------------------------------------------------------
		deleteb : function(elem){
			var _this=this;
			if (this.options.confirmDelete){
				//if (confirm(this.options.confirmDeleteMessage)==false){
				//        return false;
				//}
				$('body').append('<div id="message_confirm" title="'+_this.options.confirmText+'">' + this.options.confirmDeleteMessage + '</div>');
				$( "#message_confirm" ).dialog({
					resizable: false,
					modal: true,
					buttons: [{
						text: _this.options.deleteText,
						click : function() {    
							$( this ).dialog( "close" );
							$( "#message_confirm" ).remove();
							_this.deletenow(elem);
						}
					}, {


						text: _this.options.cancelText,
						click: function() {
							$( this ).dialog( "close" );
							$( "#message_confirm" ).remove();
							return _this;
						}
					}]	
				});      
			} else {
				this.deletenow(elem);
			}
		},

		//------------------------------------------------------
		deletenow : function(elem){				
			this.setvalue($(elem).closest('tr').attr('data-nt-id'));
			this.serverPost('pressedButton=deleteb_btn','_event_=deleteb&_action_=3&_fromForm_='+ this.options.form,'_bidv_=' + this.options.value + '&_ajax_=1&_parentProc_=' +  this.options.parent + '&_parentRid_=' + this.options.parentrid);
			return this;
		},

        //------------------------------------------------------
		select : function(elem){
			if (elem){
				this.setvalue($(elem).closest('tr').attr('data-nt-id'));
			}

			if (this.options.popup){
				$('#'+ntd.getluf()).data('luv',this.options.value);
				$('#'+ntd.getluf()).change();
				$('#popup_'+ntd.getdlg().toLowerCase()+'_div').dialog('close'); // close does a ntd.pop
			} else{
				this.gotoPage(this.options.selectAction,'select_btn',this.options.value,this.options.lookupField);
				return this;
			};
		},

        //------------------------------------------------------
		cancel : function(){
			if (this.options.popup){
				$('#popup_'+ntd.getdlg().toLowerCase()+'_div').dialog('close'); // close does a ntd.pop
			} else {
				this.gotoPage(this.options.selectAction,'browsecancel_btn');
			}
			return this;
		},
        //------------------------------------------------------
		close : function(){
			if (this.options.popup){
				$('#popup_'+ntd.getdlg().toLowerCase()+'_div').dialog('close'); // close does a ntd.pop
			} else {
				this.gotoPage(this.options.closeAction,'close_btn');
			}
			return this;
		},
        //------------------------------------------------------
		rad : function(){     // Reset After Date
			this.eip(this.ct,this.eipclm,this.vs);
			return this;
		},

        //------------------------------------------------------
        gotoPage : function(a,n,v,l){
			$(':button').attr('disabled', 'disabled');
			$('#xdecfr').remove();
			var ht = '<form method = "POST" action="'+a+'" id="xdecfr">';
			if (n) ht = ht + '<input type="hidden" name="pressedbutton" value = "'+n+'" />';
			if (v) ht = ht + '<input type="hidden" name="_bidv_" value = "'+v+'" />';
			if (l) ht = ht + '<input type="hidden" name="lookupfield" value = "'+this.options.lookupField+'" />';
			if ($('#FormState')) ht = ht + '<input type="hidden" name="FormState" value = "'+$('#FormState').val()+'" />';
			ht = ht + '</form>';
			$(this.options.divId).append(ht)
			$('#xdecfr').submit();
			// this page terminates here
			return this;
		},

        //------------------------------------------------------
		sv : function(p0) {   // send async request to server
			var parms='';
			var _this=this;
			for(var d = 1; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}
			parms += '_parentProc_=' + this.options.parent + '&_parentRid_=' + this.options.parentrid + '&_popup_=' + this.options.popup  + '&_rid_=' & this.options.randomid + '&_ajax_=1&_rnd_=' + Math.random().toString(36).substr(5);
			$.get(p0+ this.options.urlExt,parms,function(data){_this.onAjaxComplete(data);});
			return this;
		},

        //------------------------------------------------------
		get : function() {         // send async request to server procedure
			var parms='';
			var _this=this;
			for(var d = 0; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}

			parms += '_parentProc_=' + this.options.parent + '&_parentRid_=' + this.options.parentrid + '&_ajax_=0&_popup_=' + this.options.popup + '&_rid_=' + this.options.randomid + '&_rnd_=' + Math.random().toString(36).substr(5);
			parms = parms.replace(/\r\n/g,"%0D%0A");
			parms = parms.replace(/\n\r/g,"%0D%0A");
			parms = parms.replace(/\r/g,"%0D%0A");
			parms = parms.replace(/\n/g,"%0D%0A");
			document.location = this.options.procedure + this.options.urlExt + '?' + parms;
			return this;
		},
        //------------------------------------------------------
		server : function() {         // send async request to server procedure
			var parms='';
			var _this=this;
			for(var d = 0; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}

			parms += '_parentProc_=' + this.options.parent + '&_parentRid_=' + this.options.parentrid + '&_ajax_=1&_popup_=' + this.options.popup + '&_rid_=' + this.options.randomid + '&_rnd_=' + Math.random().toString(36).substr(5);
			parms = parms.replace(/\r\n/g,"%0D%0A");
			parms = parms.replace(/\n\r/g,"%0D%0A");
			parms = parms.replace(/\r/g,"%0D%0A");
			parms = parms.replace(/\n/g,"%0D%0A");
			$.get(this.options.procedure + this.options.urlExt,parms,function(data){_this.onAjaxComplete(data);});
			return this;
		},

        //------------------------------------------------------
		serverPost : function() {     // send async request POST to server procedure
			var parms='';
			var _this=this;
			for(var d = 0; d < arguments.length; d++){
				parms += arguments[d] + '&';
			}

			parms += '_ajax_=1&_parentProc_=' + this.options.parent + '&_parentRid_=' + this.options.parentrid + '&_popup_=' + this.options.popup + '&_rid_=' & this.options.randomid + '&_rnd_=' + Math.random().toString(36).substr(5);
			$.post(this.options.procedure+ this.options.urlExt,parms,function(data){_this.onAjaxComplete(data);});
			return this;
		},

        //------------------------------------------------------
		onAjaxComplete : function(data) {
			//var a=Math.random().toString(36).substr(5); /?
			xmlProcess(data);
			//this.ready();  // no need to call ready, the xmlProcess will recreate the object if needed.
			return this;
		}

//------------------------------------------------------
});

$.extend( $.ui.ntbrowse, {
        version: "@VERSION"
});

})( jQuery );

///////////////////////////////////////////////////////
// end ntbrowse
///////////////////////////////////////////////////////


$(window).unload(function() {
  $(':ui-ntbrowse').ntbrowse("destructor");
});
(function( $, undefined ) {
	var BIG = 1;
	var SMALL = 0;
	var ZOOM = 1;
	var REGULAR = 0;


	var _dragging='';
	var _dragform='';
	var _zoomed=false;

$.widget("ui.ntcalendar", {
   // default options
	options: {
		proc: 'nothing',
		parent:'',
		divId: '',
		insertForm: '',
		insertText: 'Insert',
		changeText: 'Change',
		insertTip: 'Click here to insert a record',
		popupMode: true,
		otherFormParameters: '',
		size: SMALL,
		monthClass: '',
		smallMonthClass: '',
		contentClass: '',
		smallContentClass: '',
		labelClass: '',
		smallLabelClass: '',
		emptyLabelClass: '',
		smallEmptyLabelClass: '',
		zoomHeading: '',  
		draganddrop: true,
		gradients: true,
		headerClass:'ui-widget-header ui-corner-top nt-month-header', // s_web._SitesQueue.Defaults.Style.MonthHeader
		headingClass:'nt-heading',										// s_web._SitesQueue.Defaults.Style.MonthHeading

		subHeaderClass:'nt-month-header-cell nt-wide',				// s_web._SitesQueue.Defaults.Style.MonthHeaderCell
		emptyCellClass:'nt-monthday-empty-cell',
		cellClass:'nt-monthday-cell ui-corner-all',
		weekDayName:['S','M','T','W','T','F','S'],
		compressEmptyLines:false
   },
//------------------------------------------------------    
		_create: function() {
		},	
//------------------------------------------------------    
		begin: function() {
			var _this = this;
			$(this.element).find('[data-nt-month]').each(function(){_this._addMonth(this,REGULAR);});
			this._addButtons(this.options.size == SMALL ? true : false,REGULAR);
			this._addPopup();
			this.refreshZoom();
		},	
//------------------------------------------------------    
		refresh: function() {
			var _this = this;	
			$(this.element).find('[data-nt-month]').each(function(){_this._addMonth(this,REGULAR);});
			this._addButtons(true,REGULAR);
			this.refreshZoom();
		},
//------------------------------------------------------    
		refreshZoom: function() {
			if (_zoomed == true){
				var zoomMonth = '#' + $('#'+this.options.divId+'_zoom_div').find('[data-nt-month]:first').attr('id');
				this._zoomInMonth($(zoomMonth));
			}	
		},
//------------------------------------------------------      		
		_addPopup: function(){
			var _this = this;
			$(this.element).after('<div id="popup_'+this.options.divId+'_div" class="nt-hidden">' +
														'<div id="'+this.options.divId+'_zoom_div"></div></div>');
			$('#popup_'+this.options.divId+'_div').
			dialog({close: function(event, ui) {_zoomed = false; },  
							autoOpen: false, 
							width: 860, 
							modal: true, 
							position: ['center',15]})
			.removeClass('nt-hidden');				
		},
//------------------------------------------------------      
		clear: function(){
			$('#'+this.options.divId+'_cal_div').empty();
		},
//------------------------------------------------------      
		hide: function(){
			$('#'+this.options.divId+'_cal_div').hide();
		},
//------------------------------------------------------      
		show: function(){
			$('#'+this.options.divId+'_cal_div').show();
		},		
//------------------------------------------------------      
		addSmallHtmlMonth: function(date,m,y,headingText,firstDay,createDiv){
			var ml = [31,28,31,30,31,30,31,31,30,31,30,31];
			if (y%4==0){
				if (y % 100 == 0){
					if ( y % 400 == 0){
						ml[1] = 29;
					}
				} else {	
					ml[1] = 29;
				}
			}
			var id = 'd_'+m+'_'+y+'_div';
			var dayOneOffset = (date - firstDay) % 7;
			if (createDiv){

				$('#'+this.options.divId+'_cal_div').append(this.htmlSmallMonthWrapper(id,date));
			} else {
				$('#'+id).attr('data-nt-month',date);

			}	
			$('#'+id).append(this.htmlSmallMonthHeader(id,headingText))
			$('#'+id).append(this.htmlSmallMonthSubHeader(id))
			$('#'+id).append(this.htmlSmallMonthLines(this.options.divId,date,6,dayOneOffset,ml[m-1]))
		},
//------------------------------------------------------      
		htmlSmallMonthWrapper: function(id,date){
			return(	'<div id="'+id+'" data-nt-month="'+date+'">' +
					'</div>')
		},
//------------------------------------------------------      
		htmlSmallMonthHeader: function(id,headingText){
			return(	'<div id="'+id+'_h" class="'+this.options.headerClass+'" data-nt-head="header">' +
					'<span class="'+this.options.headingClass+'" data-nt-heading="'+headingText+'">A</span>' +
					'</div>')
		},
//------------------------------------------------------      
		htmlSmallMonthSubHeader: function(id){
			return(	'<div id="'+id+'_sh"  class="'+this.options.subHeaderClass+'">' +
					'<div>'+this.options.weekDayName[0]+'</div>' +
					'<div>'+this.options.weekDayName[1]+'</div>' +
					'<div>'+this.options.weekDayName[2]+'</div>' +
					'<div>'+this.options.weekDayName[3]+'</div>' +
					'<div>'+this.options.weekDayName[4]+'</div>' +
					'<div>'+this.options.weekDayName[5]+'</div>' +
					'<div>'+this.options.weekDayName[6]+'</div>' +
					'</div>' )
		},
//------------------------------------------------------      
		htmlSmallMonthLines: function(id,date,weeks,dayOneOffset,dim){
			var s='';
			var i=0;
			var j=0;
			var day=1;
			if (!weeks) weeks=6;
			for(i=0; i < weeks; i++){
				s = s +	'<div id="'+id+'_m" class="nt-wide">' 
				for(j=0; j < 7 ; j++){
					if (dayOneOffset || day > 31 || day > dim){
						dayOneOffset -= 1;
						s = s +	'<div id="'+id+'_'+i+'_'+j+'" class="'+this.options.emptyCellClass+'">&#160;</div>';
					} else {
						s = s +	'<div id="'+id+'_'+ parseInt(date+day-1) +'" class="'+this.options.cellClass+'" data-nt-date="'+parseInt(date+day-1)+'"><div>'+day+'</div></div>';
						day += 1
					}					
				}	
				s = s +	'</div>'
				if (this.options.compressEmptyLines && day >= 31){
					break;
				}
			}
			return(s);
		},
//------------------------------------------------------      
		htmlSmallMonthData: function(date,data){
			var id = 'd_'+date+'_div';
			var i=0;
			for (var i = 0; i < data.length; i++) {			
				$('#' + this.options.divId + '_' + parseInt(date-1+data[i][0])).each(function(){
					if (data[i-1]){
						if (data[i][2]==-1) data[i][2] = data[i-1][2];
						if (data[i][3]==-1) data[i][3] = data[i-1][3];
						if (data[i][4]==-1) data[i][4] = data[i-1][4];
						if (data[i][5]==-1) data[i][5] = data[i-1][5];
						if (data[i][6]==-1) data[i][6] = data[i-1][6];
						if (data[i][7]==-1) data[i][7] = data[i-1][7];
						if (data[i][8]==-1) data[i][8] = data[i-1][8];
						if (data[i][9]==-1) data[i][9] = data[i-1][9];
					}
					$(this)	.addClass(data[i][3])
							.attr('style',data[i][4])
							.attr('title',data[i][5])
							.attr('data-nt-image-big',data[i][6])
							.attr('data-nt-image-small',data[i][7])
							.attr('data-nt-id',data[i][8])
							.attr('data-nt-form',data[i][9])
							.attr('data-nt-place',data[i][10])
							;
					if 	(data[i][11] == 'r' || data[i][11] == 'i'){ 
						$(this).attr('data-nt-info',data[i][11]);
						if (data[i][8]){
							$(this).attr('data-nt-id','uk');
						}		
					}
					if (data[i][2]){ // content
						$(this).html('<div>'+data[i][1]+'</div><div>'+data[i][2]+'</div>');
					} else { // just label
						$(this).html('<div>'+data[i][1]+'</div>');
					}
				});
			}	
		},
		
//------------------------------------------------------      
		_addMonth: function(month,zoomed){
		  this._setHeader(month);
		  this._primeUpdates(month,zoomed);		
		  this._primeInserts(month,zoomed);
			this._makeDraggable(month,zoomed);
			this._makeDroppable(month,zoomed);
			(this.options.size == BIG || zoomed == ZOOM) ? this._bigMonth(month) : this._smallMonth(month);
			this._applyGradients(month);
		},
//------------------------------------------------------      
		_setHeader: function(month){
			var _this = this;
			var _span = $(month).find('[data-nt-heading]');
			var _atr = $(month).find('[data-nt-heading]').attr('data-nt-heading');
			$(_span).html(_atr);
		},
//------------------------------------------------------      
		_bigMonth: function(month){
			var _this = this;
			$(month).removeClass(_this.options.smallMonthClass).addClass(_this.options.monthClass);
		},
//------------------------------------------------------      
		_smallMonth: function(month){
			var _this = this;
			$(month).removeClass(_this.options.MonthClass).addClass(_this.options.smallMonthClass);
		},
//------------------------------------------------------      
		_primeInserts: function(month,zoomed) {	
			var _this = this;	
			$(month).find("[data-nt-date]").not("[data-nt-id]").add('[data-nt-info="i"]',month)
				.removeClass("drop0 drop1 drag0 drag1")
				.addClass("drop"+zoomed)
				.attr("title",this.options.insertTip)
				.bind("click",function(){
					if (_dragging==''){
						if (_this.options.popupMode && _this.options.insertForm){
							ntd.push(_this.options.insertForm,'',_this.options.insertText,1,1,null,_this.options.proc,'','_date_='+$(this).attr('data-nt-date')+'&'+_this.options.otherFormParameters,null,null,null,null,null,_this.options.parent);
						}	
					}		
				})	
				.find('div:first')
					.removeClass((_this.options.size==BIG || zoomed == ZOOM)? _this.options.smallEmptyLabelClass : _this.options.emptyLabelClass)
					.addClass((_this.options.size==BIG || zoomed == ZOOM) ? _this.options.emptyLabelClass : _this.options.smallEmptyLabelClass);
		},	
//------------------------------------------------------ 
		_primeUpdates: function(month,zoomed){ // find all full cells and prime them for call to update.
			var _this = this;	
				
			$(month).find("[data-nt-id]").not('[data-nt-info="r"]').not('[data-nt-info="i"]')
				.removeClass("drag0 drag1 drop0 drop1")
				.addClass("drag"+zoomed+" drop"+zoomed)
				.bind("click.cal",function(){
					if (_dragging=='' && $(this).attr('data-nt-form') != undefined){
						if (_this.options.popupMode){
							ntd.push($(this).attr('data-nt-form'),'',_this.options.changeText,1,2,null,_this.options.proc,$(this).attr('data-nt-id'),'_date_='+$(this).attr('data-nt-date')+'&'+_this.options.otherFormParameters,null,null,null,null,null,_this.options.parent);
						}	
					}
				})	
				
			$(month).find('[data-nt-id]')
				.addClass(_this.options.gradients ? "cal-grad" : "")
				.find('div:first')
					.removeClass((_this.options.size==BIG || zoomed == ZOOM) ? _this.options.smallLabelClass : _this.options.labelClass)
					.addClass((_this.options.size==BIG || zoomed == ZOOM) ? _this.options.labelClass : _this.options.smallLabelClass)
					.each(function(){
						if (_this.options.size==SMALL){
							image = $(this).parent().attr('data-nt-image-small');
							if (image){
								$(this).css('background-image','url("/'+image+'")');
							}	
						}
					})	
					.next()
						.removeClass((_this.options.size==BIG || zoomed == ZOOM) ? _this.options.smallContentClass : _this.options.contentClass)
						.addClass((_this.options.size==BIG || zoomed == ZOOM) ? _this.options.contentClass : _this.options.smallContentClass)
						.each(function(){
							if (_this.options.size==BIG || zoomed == ZOOM){
								image = $(this).parent().attr('data-nt-image-big');
								if (image){
									$(this).css('background-image','url("/'+image+'")');
								}	
							}
						})
						
			$(month)
				.find('[data-nt-place="f"]').removeClass('ui-corner-all').addClass((_this.options.size==BIG || zoomed == ZOOM)?'cal-corner-left':'cal-corner-left-small').end()
				.find('[data-nt-place="m"]').removeClass('ui-corner-all').end()
				.find('[data-nt-place="l"]').removeClass('ui-corner-all').addClass((_this.options.size==BIG || zoomed == ZOOM)?'cal-corner-right':'cal-corner-right-small').end()
				.find('[data-nt-place="s"]').removeClass('ui-corner-all').addClass((_this.options.size==BIG || zoomed == ZOOM)?'cal-corner-all':'cal-corner-all-small').end()
		},	
//------------------------------------------------------ 
		_makeDraggable: function(month,zoomed){
		  if (this.options.draganddrop){
			  $(month).find('.drag'+zoomed).draggable({
				  revert: 'invalid',
				  start: function(event, ui) { 
  					_dragging = $(this).attr('data-nt-id');
	  				_dragform = $(this).attr('data-nt-form');
		  		},
			  	stop: function(event, ui) { 
				  	setTimeout(function(){_dragging='';}, 300);
				  }
			  });
			};  
		},	
//------------------------------------------------------ 		
		_makeDroppable: function(month,zoomed){
			var _this = this;	            
			if (this.options.draganddrop){
			  $(month).find('.drop'+zoomed).droppable({
				  accept: '.drag'+zoomed,
				  drop: function(event, ui) { 
					  ntd.push(_dragform,'',_this.options.changeText,1,2,null,_this.options.proc,_dragging,'_newdate_='+$(this).attr('data-nt-date'),1,null,null,null,null,_this.options.parent);
				  }
			  });
			};  
		},
//------------------------------------------------------ 
		_removeDragAndDrop: function(month,zoomed){
		  if (this.options.draganddrop){
				try{$(month).find('.drag'+zoomed).draggable("destroy");  } catch (e) {}	
				try{$(month).find('.drop'+zoomed).droppable("destroy");	 } catch (e) {}	
			};  
		},	
//------------------------------------------------------    
		_addButtons: function(addZoom,zoomed){
			var _this = this;
			$(this.element).find('[data-nt-month]:first').each(function(){_this._addPreviousButton(this,zoomed);});
			if (addZoom == 1){
				this._addZoomButtons();
			}	
			$(this.element).find('[data-nt-month]:last').each(function(){_this._addNextButton(this,zoomed);});
		},
//------------------------------------------------------ 		
		_addZoomButtons: function(){
			var _this = this;
			if (this.options.size == SMALL){
				$(this.element).find('[data-nt-month]').each(function(){_this._addZoomButton(this);});			
			}	
			this._bindZoomButtons();
		},
//------------------------------------------------------ 		
		_bindZoomButtons: function(){
			var _this = this;	
			$(this.element).find('.ui-icon-circle-zoomin').bind('click',function(){
				_this._zoomInMonth($(this).parent().parent());
			});
		},
//------------------------------------------------------ 		
		_zoomInMonth: function(month){		
			var _this = this;
			_zoomed = true;
			$('#popup_'+this.options.divId+'_div').dialog( "option", "title", _this.options.zoomHeading ).dialog('open');
			$('#'+this.options.divId+'_zoom_div').empty();
			$(month).clone().appendTo('#'+this.options.divId+'_zoom_div');
			var zoomMonth = $('#'+this.options.divId+'_zoom_div').find('[data-nt-month]:first')
			this._removeDragAndDrop(zoomMonth,0);
			this._removePreviousButton(zoomMonth,0);
			this._removeNextButton(zoomMonth,0);
			this._removeZoomButton(zoomMonth);
			this._zoomFormatIncoming(this);
		},
//------------------------------------------------------    
		_zoomFormatIncoming: function(_this){		
			_this._addMonth($('#'+ _this.options.divId + '_zoom_div').find('[data-nt-month]:first'),ZOOM);
			_this._addPreviousButton($('#'+ _this.options.divId + '_zoom_div').find('[data-nt-month]:first'),1);
			_this._addNextButton($('#'+ _this.options.divId + '_zoom_div').find('[data-nt-month]:last'),1);
		},
//------------------------------------------------------ 		
		_addZoomButton: function(month){
			var _this = this;
			var _id = $(month).attr('id') + '_zoom';
			if ($('#' + _id).html() == null){
				$(month)
					.find('[data-nt-heading]')
					.after('<span id="' + _id + '" class="nt-right ui-icon ui-icon-circle-zoomin">Zoom</span>')
			} 
		},
//------------------------------------------------------ 		
		_removeZoomButton: function(month){
			$(month).find('#' + $(month).attr('id') + '_zoom').remove();
		},		
//------------------------------------------------------    
		_addPreviousButton: function(month,zoomed){ 
			if ($('#' + this.options.divId + zoomed  + '_prev').attr('id') == undefined){
				$(month)
					.find('[data-nt-heading]')
					.before('<span id="' + this.options.divId + zoomed + '_prev" class="nt-hard-left ui-icon ui-icon-circle-triangle-w">Prev</span>')
				this._bindPreviousButton(month,zoomed);
			}	
		},
//------------------------------------------------------ 		
		_removePreviousButton: function(month,zoomed){
			$(month).find('#' + this.options.divId + zoomed  + '_prev').remove();
		},		
//------------------------------------------------------ 		
		_addNextButton: function(month,zoomed){
			if ($('#' + this.options.divId + zoomed  + '_next').attr('id') == undefined){		
				$(month)
					.find('[data-nt-heading]')
					.after('<span id="' + this.options.divId + zoomed + '_next" class="nt-right ui-icon ui-icon-circle-triangle-e">Next</span>');
					//.after('<span id="' + this.options.divId + zoomed + '_next" class="nt-right ui-icon ui-icon-circle-triangle-e">Next</span>');
				this._bindNextButton(month,zoomed);
			}	
		},
//------------------------------------------------------ 		
		_removeNextButton: function(month,zoomed){
			$(month).find('#' + this.options.divId + zoomed + '_next').remove();
		},
//------------------------------------------------------ 		
		_bindNextButton: function(month,zoomed){
			var _this = this;	
			if (zoomed==false){
				$('#' + this.options.divId + zoomed  + '_next').bind('click',function(){
					_this._scrollNext(month);
				});
			} else {
				$('#' + this.options.divId + zoomed  + '_next')
					.bind('click',function(){
						var parentMonth = '#'+$(month).attr('id');
						$(month).empty().remove();
						var nextMonth = $(parentMonth).next();
						if ($(nextMonth).attr('id') != undefined){
							_this._zoomInMonth(nextMonth);
						} else {
							_this._scrollNext(parentMonth,function(){
									nextMonth = $(parentMonth).next();
									_this._zoomInMonth(nextMonth);
								});
						}	
					});	
			}	
		},
//------------------------------------------------------ 		
		_bindPreviousButton: function(month,zoomed){
			var _this = this;	
			if (zoomed==false){
				$('#' + this.options.divId + zoomed  + '_prev').bind('click',function(){
					_this._scrollPrevious(month);
				});
			} else {
				$('#' + this.options.divId + zoomed  + '_prev')
					.bind('click',function(){
						var parentMonth = '#'+$(month).attr('id');
						$(month).empty().remove();
						var previousMonth = $(parentMonth).prev();
						if ($(previousMonth).attr('id') != undefined){
							_this._zoomInMonth(previousMonth);
						} else {
							_this._scrollPrevious(parentMonth,function(){
									previousMonth = $(parentMonth).prev();
									_this._zoomInMonth(previousMonth);
								});
						}	
					});	
			}	
		},
//------------------------------------------------------    
		_scrollNext: function(month,onComplete){		
			var _this = this;	
			_this._removeNextButton(month,REGULAR);
			// create holder for incoming new month
			var newId = _this._getNextDivName();
			var height = $(month).height();
			var width = $(month).width();
			var _ad = $(month).attr('data-nt-month');
			$(month)
				.after('<div id="'+ newId+'"></div>');
				//.after('<div id="'+ newId+'" style="height:' + height + 'px; width: '+width +'px;"></div>');				
			// get new month	
			$.get(_this.options.proc,'_ajax_=1&_next_=' + _ad + '&_parentProc_=' + this.options.parent,function(data){
					// when new month arrives
					xmlProcess(data);
					$(_this.element).find('#' + newId).each(function(){_this._addMonth(this,REGULAR);});
					_this._addButtons(true,REGULAR);
					if (onComplete){
						onComplete();
					}	
				});
			$(_this.element).find('[data-nt-month]:first').empty().remove();
		},		
//------------------------------------------------------    
		_scrollPrevious: function(month,onComplete){		
			var _this = this;	
			_this._removePreviousButton(month,REGULAR);
			// create holder for incoming new month
			var newId = _this._getPreviousDivName();
			var height = $(month).height();
			var width = $(month).width();
			var _ad = $(month).attr('data-nt-month');
			$(month)
				.before('<div id="'+ newId+'" style="float:left"></div>');
				//.before('<div id="'+ newId+'" style="height:' + height + 'px; width: '+width +'px; float:left"></div>');				
			// get new month	
			$.get(_this.options.proc,'_ajax_=1&_prev_=' + _ad + '&_parentProc_=' + this.options.parent,function(data){
					// when new month arrives
					xmlProcess(data);
					$(_this.element).find('#' + newId).each(function(){;_this._addMonth(this,REGULAR);});
					_this._addButtons(true,REGULAR);
					if (onComplete){
						onComplete();
					}	
				});
			$(_this.element).find('[data-nt-month]:last').empty().remove();
		},		
//------------------------------------------------------    
		_getPreviousDivName: function(){		
			var d = $(this.element).find('[data-nt-month]:first').attr('id');
			var parts=d.split('_');
			if (parts[1]==1){
			  parts[2] = parseInt(parts[2]) - 1;
			  parts[1] = 12;
			} else {
				parts[1] = parseInt(parts[1]) - 1;
			}	
			d = parts.join('_');
			return(d);
		},
//------------------------------------------------------    		
		_getNextDivName: function(){
			var d = $(this.element).find('[data-nt-month]:last').attr('id');
			var parts=d.split('_');
			if (parts[1]==12){
			  parts[2] = parseInt(parts[2]) + 1;
			  parts[1] = 1;
			} else {
				parts[1] = parseInt(parts[1]) + 1;
			}	
			d = parts.join('_');
			return(d);
		},
//------------------------------------------------------      
		_applyGradients: function(month){ 
		  var _this=this;
			$(month).find('.cal-grad')
				.each(function(){
					var col = $(this).css('background-color');
					if (col != 'transparent'){
						if (Modernizr.cssgradients ==  false){
							if (window.ActiveXObject) {  //for IE
								var ua = navigator.userAgent;
								var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
								if (re.exec(ua) != null){
									this.style.filter = '"filter: progid:DXImageTransform.Microsoft.gradient(StartColorStr='+_this._colToIEHex(col)+', EndColorStr=#FFFFFFFF)"';
								}	
							}
						} else {
							$(this).css('background','-webkit-gradient(linear, 0 0, 0 100%, from('+col+'), to(#FFFFFF))'); 
							if ($(this).css('background') == ''){
								$(this).css('background','-moz-linear-gradient(center bottom, #FFFFFF 0%, '+col+' 75%)');
							}		
						}	
					}	
				});		
		},
//------------------------------------------------------    
		_colToIEHex: function(color) {
		  if (color.substr(0, 1) === '#') {
			return color;
		  }
		  var dig = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);    
		  var r = parseInt(dig[2]);
		  var g = parseInt(dig[3]);
		  var b = parseInt(dig[4]);    
		  var rgb = b | (g << 8) | (r << 16);    
		  return dig[1] + '#FF' + rgb.toString(16);
		},
//------------------------------------------------------    
	   destroy: function() {
		   $.Widget.prototype.destroy.apply(this, arguments); // default destroy
		   // now do other stuff particular to this widget
	   }
 });

$.extend( $.ui.ntcalendar, {
	version: "@VERSION"
});

})( jQuery );

//===============================================================================================================
//===============================================================================================================

(function( $, undefined ) {
// vars and equates here
//  var _timePerPixel=0;
//  var _changeClicked=0;

$.widget("ui.ntplanner", {
		// default options
		options: {
			proc: 'nothing',
			parent:'',
			divId: '',
			resizable: 1,
			dayWidth: 72,
			planWidth: 0,
			dayOuterWidth: 72,  
			height: 52,   
			padding: 3,
			startDay: 0,
			endDay: 86400,
			date: 0,
			columns: 7,
			changeText: 'Change',
			insertText: 'Insert',
			insertForm: '',      
			vertical: 0,
			gradients: true,
			showtimes: 1,     
			datesOnTop: 0,
			_timePerPixel:0,    
			_changeClicked:0
		},
		//------------------------------------------------------    
		_create: function() {
			this.refresh();
		},	
	//------------------------------------------------------      
		hide: function(){
			$('#'+this.options.divId+'_cal_div').hide();
		},
	//------------------------------------------------------      
		show: function(){
			$('#'+this.options.divId+'_cal_div').show();
		},		
	//------------------------------------------------------
		addCanvas: function() {	   
			var i=(this.options.columns-1); 
			while(i>=0){
				$("[data-nt-row='data']").prepend('<canvas class="planner-back" width="'+(this.options.dayOuterWidth-2)+'" height="'+this.options.height+'" style="left:'+(i*this.options.dayOuterWidth)+'px;"></canvas>');
				i--;
			}  
		},
		//------------------------------------------------------    
		drawCanvasBackground: function() {	   		  
			if (this.options.showtimes == 1){
				var _this=this;
				var st=this.formatTime(this.options.startDay);
				var ed=this.formatTime(this.options.endDay);   	  	
				//$(".planner-back")
				var fc=$(".planner-back").eq(0).css('color');
				var fs=$(".planner-back").eq(0).css('font-size');
				$(".planner-back")
					.drawText({fillStyle:fc,strokeStyle:fc,x:5,y:26,text:st,align:"left",baseline:"middle",font:"normal "+fs+" Verdana, sans-serif"})
					.drawText({fillStyle:fc,strokeStyle:fc,x:this.options.dayWidth-5,y:26,text:ed,align:"right",baseline:"middle",font:"normal "+fs+" Verdana, sans-serif"});  		    
			}    
		},		
		//------------------------------------------------------    
		formatTime: function(t){
			var h = parseInt(t/360000);
			var m = parseInt(t%360000/6000);
			if (m<10) {
				return h + ':0' + m;
			} else {
				return h + ':' + m;
			}
		},
		//------------------------------------------------------   
		_resizable: function() {	
			// need to set max size, and also cope with browser window being resized smaller.
			var _this=this;
			if (this.options.resizable){
				$(this.element).find('#' + this.options.divId + '_resize_div').resizable({
					handles: "e", 
					alsoResize: '#'+ this.options.divId + '_columns_div',
					stop: function(event, ui) {SetSessionValue(_this.options.proc+':width',$(_this.element).find(".cal-scroll").width());}
				});
			} else {
				$('.cal-scroll').css('overflow-x','hidden');
			}
		},
		//------------------------------------------------------    
		_calcColumnWidths: function() {	
			var _this = this;		
			var _width=0;
			var _div;
			$(this.element).find('[data-nt-row="header"]').children().each(function(){
				$(this).width(_this.options.dayWidth);
				_this.options.dayOuterWidth = parseInt($(this).outerWidth(true));
			});
			_width=this.options.dayOuterWidth * this.options.columns;
			$('#'+this.options.divId+'_columns_div').children(':first').width(_width);	
			if (_this.options.vertical == 0){
				_this.options._timePerPixel = (this.options.columns*(this.options.endDay-this.options.startDay))/_width;
			} else if (_this.options.vertical == 86400){
				_this.options._timePerPixel = (this.options.endDay-this.options.startDay) / this.options.dayOuterWidth;
			} else {
				_this.options._timePerPixel = 100 * this.options.vertical / this.options.height;
			}			                                                       
		},
		//------------------------------------------------------    
		_prepareData: function() {	
			var _this = this;
			var dateStart=0;
			var dateEnd=0; 
			var viewDateStart=0;
			var viewDateEnd=0; 
			var timeStart=0;
			var timeEnd=0; 
			var dDraw=0;
			var dleft=0;
			var dright=0; 			
			var dheight=0;
			var dtop=0;
			var col=0;
			var dmarginTop=0;
			var dmarginBottom=0;
			var dmarginLeft=0;
			var dmarginRight=0;
			$(this.element).find("[data-nt-id]").each(function(){			  
				dDraw = 0;
				if (_this.options.vertical == 0){
					// plan with non-date/time as left column
					dDraw = 1;
					dleft = (($(this).attr('data-nt-start-date') - _this.options.date) * _this.options.dayOuterWidth) + 
							 (($(this).attr('data-nt-start-time') - _this.options.startDay) / _this.options._timePerPixel); 
					dright = (($(this).attr('data-nt-end-date') - _this.options.date) * _this.options.dayOuterWidth) + 
						   (($(this).attr('data-nt-end-time') - _this.options.startDay) / _this.options._timePerPixel); 		      
					dheight = _this.options.height -  _this.options.padding * 2 - 0;        
					dtop = _this.options.padding;
				} else if (_this.options.vertical == 86400){
					// plan with whole day as left column
					dDraw = 1;
					col = ($(this).attr('data-nt-column')-1);			    
					dleft = (col * _this.options.dayOuterWidth) +
							 (($(this).attr('data-nt-start-time') - _this.options.startDay) / _this.options._timePerPixel);			    
					dright = (col * _this.options.dayOuterWidth) + 
						   (($(this).attr('data-nt-end-time') - _this.options.startDay) / _this.options._timePerPixel); 		      
					if (dleft < col * _this.options.dayOuterWidth){
					  dleft = col * _this.options.dayOuterWidth;
					}
					if (dright > (col+1) * _this.options.dayOuterWidth){
						dright = (col+1) * _this.options.dayOuterWidth;
					}
					dheight = _this.options.height -  _this.options.padding * 2 - 0;
					dtop =  _this.options.padding;
				} else {                                     
				  // plan with varible time as the left column.
					dateStart = $(this).attr('data-nt-start-date');
					dateEnd = $(this).attr('data-nt-end-date');
					timeStart = $(this).attr('data-nt-start-time');
					timeEnd = $(this).attr('data-nt-end-time');
					viewDateStart = _this.options.date
					viewDateEnd = _this.options.date + _this.options.columns - 1
					
					if ((viewDateEnd < dateStart) || (viewDateStart > dateEnd)){
						dDraw = 0; // don't draw if viewable date is out of range
					} else if (dateStart == viewDateEnd && timeStart > _this.options.endDay){
						dDraw = 0; // don't draw if starts after viewable end
					} else if (dateEnd == viewDateStart && timeEnd < _this.options.startDay){
						dDraw = 0; // don't draw if ends before viewable start
					} else {
						dDraw = 1;						
						if ((dateStart == viewDateStart && timeStart < _this.options.startDay) || (dateStart < viewDateStart)){
							timeStart = _this.options.startDay;
						}
						if ((dateEnd == viewDateEnd && timeEnd > _this.options.endDay) || (dateEnd > viewDateEnd)){
							timeEnd = _this.options.endDay;
						}
						if (_this.options.datesOnTop){
							days = $(this).attr('data-nt-end-date')-$(this).attr('data-nt-start-date')+1;
						} else {
							days = 1;
						}
						dheight = (timeEnd-timeStart)/_this.options._timePerPixel; 
						col = ($(this).attr('data-nt-column')-1);
						dleft = (col*_this.options.dayOuterWidth)+5;
						dright = ((col+days)*_this.options.dayOuterWidth)-10;
						dtop = ((timeStart-_this.options.startDay)%(_this.options.vertical*100))/_this.options._timePerPixel;
						dmarginLeft = $(this).attr('data-nt-margin')
						dmarginRight = dmarginLeft;
					}
				}      
				if (dDraw){
					$(this)				
					.css('left',(dleft-(-dmarginLeft))+'px')
					.width(dright-dleft-0-dmarginLeft-dmarginRight)
					.css('top',dtop-(-dmarginTop)+'px')
					.css('height',dheight-dmarginTop-dmarginBottom+'px')
					.css('padding-left','0px') 
					.css('padding-right','0px')
					.removeClass('nt-hidden')
					.off('click.cal')
					.on('click.cal',function(e){
						_this.options._changeClicked = 1;
						ntd.push($(this).attr('data-nt-form'),'',_this.options.changeText,1,2,null,
						_this.options.proc,$(this).attr('data-nt-id'),'',0,'',$(this).parent().attr('data-nt-parent'),'','',_this.options.parent);
					})
				} else {
					$(this).addClass('nt-hidden');
				}
			});
		},
		//------------------------------------------------------    
		_bindInsert: function() {	
			var _this = this;
			$(this.element).find('[data-nt-row="data"]')
			.off('click.cal')
			.on('click.cal',function(e){
				if (_this.options._changeClicked == 0){
					if (_this.options.datesOnTop == 1){
						var _somedate =  _this.options.date + parseInt((e.pageX - $(this).offset().left) / _this.options.dayOuterWidth);
						if (_this.options.vertical == 0 || _this.options.vertical == 86400){
						  var _sometime = _this.options.startDay + parseInt(((e.pageX - $(this).offset().left) % _this.options.dayOuterWidth) * _this.options._timePerPixel);
						} else {
						  var po = $(this).parent().offset().top + $(this).parent().find(':first-child').height();
						  var _sometime = _this.options.startDay + parseInt((e.pageY-po) * _this.options._timePerPixel);
						}
					} else {
						var po = $(this).parent().offset().top + $(this).parent().find(':first-child').height();
						if (_this.options.vertical == 86400){  			
						var _somedate =  _this.options.date + parseInt((e.pageY-po) / $(this).height()) ;
						} else {
						var _somedate = _this.options.date;
						}
						if (_this.options.vertical == 0 || _this.options.vertical == 86400){  				  
						var _sometime = _this.options.startDay + parseInt(((e.pageX - $(this).offset().left) % _this.options.dayOuterWidth) * _this.options._timePerPixel);
						} else {    
						  var po = $(this).parent().offset().top + $(this).parent().find(':first-child').height();
						  var _sometime = _this.options.startDay + parseInt((e.pageY-po) * _this.options._timePerPixel);  				  
						}
					}
					if (_this.options.insertForm){
						ntd.push(_this.options.insertForm,'',_this.options.insertText,1,1,null,_this.options.proc,'','_date_='+ _somedate + '&_time_=' + _sometime + '&_bidv_=' + $(this).attr('data-nt-parent'),0,'',$(this).parent().attr('data-nt-parent'),'','',_this.options.parent);			
					}	
				} else {
					_this.options._changeClicked = 0;
				}	
			});
		},  

		
		//------------------------------------------------------    
		refresh: function() {	
			var _this=this;
			var i = $('.cal-scroll').width(); 		  
			if (this.options.planWidth){
				$('.cal-scroll').width(this.options.planWidth);
			} else {  
				if (i < this.options.dayWidth){
					$('.cal-scroll').width(20-(-this.options.dayWidth));
				}		  
			}    
			$('.planner-row-size').height(_this.options.height);
			this._calcColumnWidths();
			this._resizable();
			if (this.options.vertical >= 86400 || this.options.vertical==0){     			
				this.addCanvas();
				this.drawCanvasBackground();
			}  
			this._prepareData();
			this._bindInsert();      
		},		
		//------------------------------------------------------    
		destroy: function() {
			$.Widget.prototype.destroy.apply(this, arguments); // default destroy
			// now do other stuff particular to this widget
		}
 });

$.extend( $.ui.ntplanner, {
	version: "@VERSION"
});

})( jQuery );
	/**
 * Copyright (c) 2012 Anders Ekdahl (http://coffeescripter.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.2.7
 *
 * Demo and documentation: https://adgallery.codeplex.com
 * bj - updated path to GIF files.
 */
(function($){$.fn.adGallery=function(options){var defaults={loader_image:'/styles/images/loader.gif',start_at_index:0,update_window_hash:true,description_wrapper:false,thumb_opacity:0.7,animate_first_image:false,animation_speed:400,width:false,height:false,display_next_and_prev:true,display_back_and_forward:true,scroll_jump:0,slideshow:{enable:true,autostart:false,speed:5000,start_label:'Start',stop_label:'Stop',stop_on_scroll:true,countdown_prefix:'(',countdown_sufix:')',onStart:false,onStop:false},effect:'slide-hori',enable_keyboard_move:true,cycle:true,hooks:{displayDescription:false},callbacks:{init:false,afterImageVisible:false,beforeImageVisible:false}};var settings=$.extend(false,defaults,options);if(options&&options.slideshow){settings.slideshow=$.extend(false,defaults.slideshow,options.slideshow);};if(!settings.slideshow.enable){settings.slideshow.autostart=false;};var galleries=[];$(this).each(function(){var gallery=new AdGallery(this,settings);galleries[galleries.length]=gallery;});return galleries;};function VerticalSlideAnimation(img_container,direction,desc){var current_top=parseInt(img_container.css('top'),10);if(direction=='left'){var old_image_top='-'+this.image_wrapper_height+'px';img_container.css('top',this.image_wrapper_height+'px');}else{var old_image_top=this.image_wrapper_height+'px';img_container.css('top','-'+this.image_wrapper_height+'px');};if(desc){desc.css('bottom','-'+desc[0].offsetHeight+'px');desc.animate({bottom:0},this.settings.animation_speed*2);};if(this.current_description){this.current_description.animate({bottom:'-'+this.current_description[0].offsetHeight+'px'},this.settings.animation_speed*2);};return{old_image:{top:old_image_top},new_image:{top:current_top}};};function HorizontalSlideAnimation(img_container,direction,desc){var current_left=parseInt(img_container.css('left'),10);if(direction=='left'){var old_image_left='-'+this.image_wrapper_width+'px';img_container.css('left',this.image_wrapper_width+'px');}else{var old_image_left=this.image_wrapper_width+'px';img_container.css('left','-'+this.image_wrapper_width+'px');};if(desc){desc.css('bottom','-'+desc[0].offsetHeight+'px');desc.animate({bottom:0},this.settings.animation_speed*2);};if(this.current_description){this.current_description.animate({bottom:'-'+this.current_description[0].offsetHeight+'px'},this.settings.animation_speed*2);};return{old_image:{left:old_image_left},new_image:{left:current_left}};};function ResizeAnimation(img_container,direction,desc){var image_width=img_container.width();var image_height=img_container.height();var current_left=parseInt(img_container.css('left'),10);var current_top=parseInt(img_container.css('top'),10);img_container.css({width:0,height:0,top:this.image_wrapper_height/2,left:this.image_wrapper_width/2});return{old_image:{width:0,height:0,top:this.image_wrapper_height/2,left:this.image_wrapper_width/2},new_image:{width:image_width,height:image_height,top:current_top,left:current_left}};};function FadeAnimation(img_container,direction,desc){img_container.css('opacity',0);return{old_image:{opacity:0},new_image:{opacity:1}};};function NoneAnimation(img_container,direction,desc){img_container.css('opacity',0);return{old_image:{opacity:0},new_image:{opacity:1},speed:0};};function AdGallery(wrapper,settings){this.init(wrapper,settings);};AdGallery.prototype={wrapper:false,image_wrapper:false,gallery_info:false,nav:false,loader:false,preloads:false,thumbs_wrapper:false,thumbs_wrapper_width:0,scroll_back:false,scroll_forward:false,next_link:false,prev_link:false,slideshow:false,image_wrapper_width:0,image_wrapper_height:0,current_index:-1,current_image:false,current_description:false,nav_display_width:0,settings:false,images:false,in_transition:false,animations:false,init:function(wrapper,settings){var context=this;this.wrapper=$(wrapper);this.settings=settings;this.setupElements();this.setupAnimations();if(this.settings.width){this.image_wrapper_width=this.settings.width;this.image_wrapper.width(this.settings.width);this.wrapper.width(this.settings.width);}else{this.image_wrapper_width=this.image_wrapper.width();};if(this.settings.height){this.image_wrapper_height=this.settings.height;this.image_wrapper.height(this.settings.height);}else{this.image_wrapper_height=this.image_wrapper.height();};this.nav_display_width=this.nav.width();this.current_index=-1;this.current_image=false;this.current_description=false;this.in_transition=false;this.findImages();if(this.settings.display_next_and_prev){this.initNextAndPrev();};var nextimage_callback=function(callback){return context.nextImage(callback);};this.slideshow=new AdGallerySlideshow(nextimage_callback,this.settings.slideshow);this.controls.append(this.slideshow.create());if(this.settings.slideshow.enable){this.slideshow.enable();}else{this.slideshow.disable();};if(this.settings.display_back_and_forward){this.initBackAndForward();};if(this.settings.enable_keyboard_move){this.initKeyEvents();};this.initHashChange();var start_at=parseInt(this.settings.start_at_index,10);if(typeof this.getIndexFromHash()!="undefined"){start_at=this.getIndexFromHash();};this.loading(true);this.showImage(start_at,function(){if(context.settings.slideshow.autostart){context.preloadImage(start_at+1);context.slideshow.start();};});this.fireCallback(this.settings.callbacks.init);},setupAnimations:function(){this.animations={'slide-vert':VerticalSlideAnimation,'slide-hori':HorizontalSlideAnimation,'resize':ResizeAnimation,'fade':FadeAnimation,'none':NoneAnimation};},setupElements:function(){this.controls=this.wrapper.find('.ad-controls');this.gallery_info=$('<p class="ad-info"></p>');this.controls.append(this.gallery_info);this.image_wrapper=this.wrapper.find('.ad-image-wrapper');this.image_wrapper.empty();this.nav=this.wrapper.find('.ad-nav');this.thumbs_wrapper=this.nav.find('.ad-thumbs');this.preloads=$('<div class="ad-preloads"></div>');this.loader=$('<img class="ad-loader" src="'+this.settings.loader_image+'">');this.image_wrapper.append(this.loader);this.loader.hide();$(document.body).append(this.preloads);},loading:function(bool){if(bool){this.loader.show();}else{this.loader.hide();};},addAnimation:function(name,fn){if($.isFunction(fn)){this.animations[name]=fn;};},findImages:function(){var context=this;this.images=[];var thumbs_loaded=0;var thumbs=this.thumbs_wrapper.find('a');var thumb_count=thumbs.length;if(this.settings.thumb_opacity<1){thumbs.find('img').css('opacity',this.settings.thumb_opacity);};thumbs.each(function(i){var link=$(this);link.data("ad-i",i);var image_src=link.attr('href');var thumb=link.find('img');context.whenImageLoaded(thumb[0],function(){var width=thumb[0].parentNode.parentNode.offsetWidth;if(thumb[0].width==0){width=100;};context.thumbs_wrapper_width+=width;thumbs_loaded++;});context._initLink(link);context.images[i]=context._createImageData(link,image_src);});var inter=setInterval(function(){if(thumb_count==thumbs_loaded){context._setThumbListWidth(context.thumbs_wrapper_width);clearInterval(inter);};},100);},_setThumbListWidth:function(wrapper_width){wrapper_width-=100;var list=this.nav.find('.ad-thumb-list');list.css('width',wrapper_width+'px');var i=1;var last_height=list.height();while(i<201){list.css('width',(wrapper_width+i)+'px');if(last_height!=list.height()){break;};last_height=list.height();i++;};if(list.width()<this.nav.width()){list.width(this.nav.width());};},_initLink:function(link){var context=this;link.click(function(){context.showImage(link.data("ad-i"));context.slideshow.stop();return false;}).hover(function(){if(!$(this).is('.ad-active')&&context.settings.thumb_opacity<1){$(this).find('img').fadeTo(300,1);};context.preloadImage(link.data("ad-i"));},function(){if(!$(this).is('.ad-active')&&context.settings.thumb_opacity<1){$(this).find('img').fadeTo(300,context.settings.thumb_opacity);};});},_createImageData:function(thumb_link,image_src){var link=false;var thumb_img=thumb_link.find("img");if(thumb_img.data('ad-link')){link=thumb_link.data('ad-link');}else if(thumb_img.attr('longdesc')&&thumb_img.attr('longdesc').length){link=thumb_img.attr('longdesc');};var desc=false;if(thumb_img.data('ad-desc')){desc=thumb_img.data('ad-desc');}else if(thumb_img.attr('alt')&&thumb_img.attr('alt').length){desc=thumb_img.attr('alt');};var title=false;if(thumb_img.data('ad-title')){title=thumb_img.data('ad-title');}else if(thumb_img.attr('title')&&thumb_img.attr('title').length){title=thumb_img.attr('title');};return{thumb_link:thumb_link,image:image_src,error:false,preloaded:false,desc:desc,title:title,size:false,link:link};},initKeyEvents:function(){var context=this;$(document).keydown(function(e){if(e.keyCode==39){context.nextImage();context.slideshow.stop();}else if(e.keyCode==37){context.prevImage();context.slideshow.stop();};});},getIndexFromHash:function(){if(window.location.hash&&window.location.hash.indexOf('#ad-image-')===0){var id=window.location.hash.replace(/^#ad-image-/g,'');var thumb=this.thumbs_wrapper.find("#"+id);if(thumb.length){return this.thumbs_wrapper.find("a").index(thumb);}else if(!isNaN(parseInt(id,10))){return parseInt(id,10);};};return undefined;},removeImage:function(index){if(index<0||index>=this.images.length){throw"Cannot remove image for index "+index;};var image=this.images[index];this.images.splice(index,1);var thumb_link=image.thumb_link;var thumb_width=thumb_link[0].parentNode.offsetWidth;this.thumbs_wrapper_width-=thumb_width;thumb_link.remove();this._setThumbListWidth(this.thumbs_wrapper_width);this.gallery_info.html((this.current_index+1)+' / '+this.images.length);this.thumbs_wrapper.find('a').each(function(i){$(this).data("ad-i",i);});if(index==this.current_index&&this.images.length!=0){this.showImage(0);};},removeAllImages:function(){for(var i=this.images.length-1;i>=0;i--){this.removeImage(i);};},addImage:function(thumb_url,image_url,image_id,title,description){image_id=image_id||"";title=title||"";description=description||"";var li=$('<li><a href="'+image_url+'" id="'+image_id+'">'+'<img src="'+thumb_url+'" title="'+title+'" alt="'+description+'">'+'</a></li>');var context=this;this.thumbs_wrapper.find("ul").append(li);var link=li.find("a");var thumb=link.find("img");thumb.css('opacity',this.settings.thumb_opacity);this.whenImageLoaded(thumb[0],function(){var thumb_width=thumb[0].parentNode.parentNode.offsetWidth;if(thumb[0].width==0){thumb_width=100;};context.thumbs_wrapper_width+=thumb_width;context._setThumbListWidth(context.thumbs_wrapper_width);});var i=this.images.length;link.data("ad-i",i);this._initLink(link);this.images[i]=context._createImageData(link,image_url);this.gallery_info.html((this.current_index+1)+' / '+this.images.length);},initHashChange:function(){var context=this;if("onhashchange"in window){$(window).bind("hashchange",function(){var index=context.getIndexFromHash();if(typeof index!="undefined"&&index!=context.current_index){context.showImage(index);};});}else{var current_hash=window.location.hash;setInterval(function(){if(window.location.hash!=current_hash){current_hash=window.location.hash;var index=context.getIndexFromHash();if(typeof index!="undefined"&&index!=context.current_index){context.showImage(index);};};},200);};},initNextAndPrev:function(){this.next_link=$('<div class="ad-next"><div class="ad-next-image"></div></div>');this.prev_link=$('<div class="ad-prev"><div class="ad-prev-image"></div></div>');this.image_wrapper.append(this.next_link);this.image_wrapper.append(this.prev_link);var context=this;this.prev_link.add(this.next_link).mouseover(function(e){$(this).css('height',context.image_wrapper_height);$(this).find('div').show();}).mouseout(function(e){$(this).find('div').hide();}).click(function(){if($(this).is('.ad-next')){context.nextImage();context.slideshow.stop();}else{context.prevImage();context.slideshow.stop();};}).find('div').css('opacity',0.7);},initBackAndForward:function(){var context=this;this.scroll_forward=$('<div class="ad-forward"></div>');this.scroll_back=$('<div class="ad-back"></div>');this.nav.append(this.scroll_forward);this.nav.prepend(this.scroll_back);var has_scrolled=0;var thumbs_scroll_interval=false;$(this.scroll_back).add(this.scroll_forward).click(function(){var width=context.nav_display_width-50;if(context.settings.scroll_jump>0){var width=context.settings.scroll_jump;};if($(this).is('.ad-forward')){var left=context.thumbs_wrapper.scrollLeft()+width;}else{var left=context.thumbs_wrapper.scrollLeft()-width;};if(context.settings.slideshow.stop_on_scroll){context.slideshow.stop();};context.thumbs_wrapper.animate({scrollLeft:left+'px'});return false;}).css('opacity',0.6).hover(function(){var direction='left';if($(this).is('.ad-forward')){direction='right';};thumbs_scroll_interval=setInterval(function(){has_scrolled++;if(has_scrolled>30&&context.settings.slideshow.stop_on_scroll){context.slideshow.stop();};var left=context.thumbs_wrapper.scrollLeft()+1;if(direction=='left'){left=context.thumbs_wrapper.scrollLeft()-1;};context.thumbs_wrapper.scrollLeft(left);},10);$(this).css('opacity',1);},function(){has_scrolled=0;clearInterval(thumbs_scroll_interval);$(this).css('opacity',0.6);});},_afterShow:function(){this.gallery_info.html((this.current_index+1)+' / '+this.images.length);if(!this.settings.cycle){this.prev_link.show().css('height',this.image_wrapper_height);this.next_link.show().css('height',this.image_wrapper_height);if(this.current_index==(this.images.length-1)){this.next_link.hide();};if(this.current_index==0){this.prev_link.hide();};};if(this.settings.update_window_hash){var thumb_link=this.images[this.current_index].thumb_link;if(thumb_link.attr("id")){window.location.hash="#ad-image-"+thumb_link.attr("id");}else{window.location.hash="#ad-image-"+this.current_index;};};this.fireCallback(this.settings.callbacks.afterImageVisible);},_getContainedImageSize:function(image_width,image_height){if(image_height>this.image_wrapper_height){var ratio=image_width/image_height;image_height=this.image_wrapper_height;image_width=this.image_wrapper_height*ratio;};if(image_width>this.image_wrapper_width){var ratio=image_height/image_width;image_width=this.image_wrapper_width;image_height=this.image_wrapper_width*ratio;};return{width:image_width,height:image_height};},_centerImage:function(img_container,image_width,image_height){img_container.css('top','0px');if(image_height<this.image_wrapper_height){var dif=this.image_wrapper_height-image_height;img_container.css('top',(dif/2)+'px');};img_container.css('left','0px');if(image_width<this.image_wrapper_width){var dif=this.image_wrapper_width-image_width;img_container.css('left',(dif/2)+'px');};},_getDescription:function(image){var desc=false;if(image.desc.length||image.title.length){var title='';if(image.title.length){title='<strong class="ad-description-title">'+image.title+'</strong>';};var desc='';if(image.desc.length){desc='<span>'+image.desc+'</span>';};desc=$('<p class="ad-image-description">'+title+desc+'</p>');};return desc;},showImage:function(index,callback){if(this.images[index]&&!this.in_transition&&index!=this.current_index){var context=this;var image=this.images[index];this.in_transition=true;if(!image.preloaded){this.loading(true);this.preloadImage(index,function(){context.loading(false);context._showWhenLoaded(index,callback);});}else{this._showWhenLoaded(index,callback);};};},_showWhenLoaded:function(index,callback){if(this.images[index]){var context=this;var image=this.images[index];var img_container=$(document.createElement('div')).addClass('ad-image');var img=$(new Image()).attr('src',image.image);if(image.link){var link=$('<a href="'+image.link+'" target="_blank"></a>');link.append(img);img_container.append(link);}else{img_container.append(img);};this.image_wrapper.prepend(img_container);var size=this._getContainedImageSize(image.size.width,image.size.height);img.attr('width',size.width);img.attr('height',size.height);img_container.css({width:size.width+'px',height:size.height+'px'});this._centerImage(img_container,size.width,size.height);var desc=this._getDescription(image);if(desc){if(!this.settings.description_wrapper&&!this.settings.hooks.displayDescription){img_container.append(desc);var width=size.width-parseInt(desc.css('padding-left'),10)-parseInt(desc.css('padding-right'),10);desc.css('width',width+'px');}else if(this.settings.hooks.displayDescription){this.settings.hooks.displayDescription.call(this,image);}else{var wrapper=this.settings.description_wrapper;wrapper.append(desc);};};this.highLightThumb(this.images[index].thumb_link);var direction='right';if(this.current_index<index){direction='left';};this.fireCallback(this.settings.callbacks.beforeImageVisible);if(this.current_image||this.settings.animate_first_image){var animation_speed=this.settings.animation_speed;var easing='swing';var animation=this.animations[this.settings.effect].call(this,img_container,direction,desc);if(typeof animation.speed!='undefined'){animation_speed=animation.speed;};if(typeof animation.easing!='undefined'){easing=animation.easing;};if(this.current_image){var old_image=this.current_image;var old_description=this.current_description;old_image.animate(animation.old_image,animation_speed,easing,function(){old_image.remove();if(old_description)old_description.remove();});};img_container.animate(animation.new_image,animation_speed,easing,function(){context.current_index=index;context.current_image=img_container;context.current_description=desc;context.in_transition=false;context._afterShow();context.fireCallback(callback);});}else{this.current_index=index;this.current_image=img_container;context.current_description=desc;this.in_transition=false;context._afterShow();this.fireCallback(callback);};};},nextIndex:function(){if(this.current_index==(this.images.length-1)){if(!this.settings.cycle){return false;};var next=0;}else{var next=this.current_index+1;};return next;},nextImage:function(callback){var next=this.nextIndex();if(next===false)return false;this.preloadImage(next+1);this.showImage(next,callback);return true;},prevIndex:function(){if(this.current_index==0){if(!this.settings.cycle){return false;};var prev=this.images.length-1;}else{var prev=this.current_index-1;};return prev;},prevImage:function(callback){var prev=this.prevIndex();if(prev===false)return false;this.preloadImage(prev-1);this.showImage(prev,callback);return true;},preloadAll:function(){var context=this;var i=0;function preloadNext(){if(i<context.images.length){i++;context.preloadImage(i,preloadNext);};};context.preloadImage(i,preloadNext);},preloadImage:function(index,callback){if(this.images[index]){var image=this.images[index];if(!this.images[index].preloaded){var img=$(new Image());img.attr('src',image.image);if(!this.isImageLoaded(img[0])){this.preloads.append(img);var context=this;img.load(function(){image.preloaded=true;image.size={width:this.width,height:this.height};context.fireCallback(callback);}).error(function(){image.error=true;image.preloaded=false;image.size=false;});}else{image.preloaded=true;image.size={width:img[0].width,height:img[0].height};this.fireCallback(callback);};}else{this.fireCallback(callback);};};},whenImageLoaded:function(img,callback){if(this.isImageLoaded(img)){callback&&callback();}else{$(img).load(callback);};},isImageLoaded:function(img){if(typeof img.complete!='undefined'&&!img.complete){return false;};if(typeof img.naturalWidth!='undefined'&&img.naturalWidth==0){return false;};return true;},highLightThumb:function(thumb){this.thumbs_wrapper.find('.ad-active').removeClass('ad-active');thumb.addClass('ad-active');if(this.settings.thumb_opacity<1){this.thumbs_wrapper.find('a:not(.ad-active) img').fadeTo(300,this.settings.thumb_opacity);thumb.find('img').fadeTo(300,1);};var left=thumb[0].parentNode.offsetLeft;left-=(this.nav_display_width/2)-(thumb[0].offsetWidth/2);this.thumbs_wrapper.animate({scrollLeft:left+'px'});},fireCallback:function(fn){if($.isFunction(fn)){fn.call(this);};}};function AdGallerySlideshow(nextimage_callback,settings){this.init(nextimage_callback,settings);};AdGallerySlideshow.prototype={start_link:false,stop_link:false,countdown:false,controls:false,settings:false,nextimage_callback:false,enabled:false,running:false,countdown_interval:false,init:function(nextimage_callback,settings){var context=this;this.nextimage_callback=nextimage_callback;this.settings=settings;},create:function(){this.start_link=$('<span class="ad-slideshow-start">'+this.settings.start_label+'</span>');this.stop_link=$('<span class="ad-slideshow-stop">'+this.settings.stop_label+'</span>');this.countdown=$('<span class="ad-slideshow-countdown"></span>');this.controls=$('<div class="ad-slideshow-controls"></div>');this.controls.append(this.start_link).append(this.stop_link).append(this.countdown);this.countdown.hide();var context=this;this.start_link.click(function(){context.start();});this.stop_link.click(function(){context.stop();});$(document).keydown(function(e){if(e.keyCode==83){if(context.running){context.stop();}else{context.start();};};});return this.controls;},disable:function(){this.enabled=false;this.stop();this.controls.hide();},enable:function(){this.enabled=true;this.controls.show();},toggle:function(){if(this.enabled){this.disable();}else{this.enable();};},start:function(){if(this.running||!this.enabled)return false;var context=this;this.running=true;this.controls.addClass('ad-slideshow-running');this._next();this.fireCallback(this.settings.onStart);return true;},stop:function(){if(!this.running)return false;this.running=false;this.countdown.hide();this.controls.removeClass('ad-slideshow-running');clearInterval(this.countdown_interval);this.fireCallback(this.settings.onStop);return true;},_next:function(){var context=this;var pre=this.settings.countdown_prefix;var su=this.settings.countdown_sufix;clearInterval(context.countdown_interval);this.countdown.show().html(pre+(this.settings.speed/1000)+su);var slide_timer=0;this.countdown_interval=setInterval(function(){slide_timer+=1000;if(slide_timer>=context.settings.speed){var whenNextIsShown=function(){if(context.running){context._next();};slide_timer=0;};if(!context.nextimage_callback(whenNextIsShown)){context.stop();};slide_timer=0;};var sec=parseInt(context.countdown.text().replace(/[^0-9]/g,''),10);sec--;if(sec>0){context.countdown.html(pre+sec+su);};},1000);},fireCallback:function(fn){if($.isFunction(fn)){fn.call(this);};}};})(jQuery);/*
 * jQuery Iframe Transport Plugin 1.5
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint unparam: true, nomen: true */
/*global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['jquery'], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Helper variable to create unique names for the transport iframes:
    var counter = 0;

    // The iframe transport accepts three additional options:
    // options.fileInput: a jQuery collection of file input fields
    // options.paramName: the parameter name for the file form data,
    //  overrides the name property of the file input field(s),
    //  can be a string or an array of strings.
    // options.formData: an array of objects with name and value properties,
    //  equivalent to the return data of .serializeArray(), e.g.:
    //  [{name: 'a', value: 1}, {name: 'b', value: 2}]
    $.ajaxTransport('iframe', function (options) {
        if (options.async && (options.type === 'POST' || options.type === 'GET')) {
            var form,
                iframe;
            return {
                send: function (_, completeCallback) {
                    form = $('<form style="display:none;"></form>');
                    form.attr('accept-charset', options.formAcceptCharset);
                    // javascript:false as initial iframe src
                    // prevents warning popups on HTTPS in IE6.
                    // IE versions below IE8 cannot set the name property of
                    // elements that have already been added to the DOM,
                    // so we set the name along with the iframe HTML markup:
                    iframe = $(
                        '<iframe src="javascript:false;" name="iframe-transport-' +
                            (counter += 1) + '"></iframe>'
                    ).bind('load', function () {
                        var fileInputClones,
                            paramNames = $.isArray(options.paramName) ?
                                    options.paramName : [options.paramName];
                        iframe
                            .unbind('load')
                            .bind('load', function () {
                                var response;
                                // Wrap in a try/catch block to catch exceptions thrown
                                // when trying to access cross-domain iframe contents:
                                try {
                                    response = iframe.contents();
                                    // Google Chrome and Firefox do not throw an
                                    // exception when calling iframe.contents() on
                                    // cross-domain requests, so we unify the response:
                                    if (!response.length || !response[0].firstChild) {
                                        throw new Error();
                                    }
                                } catch (e) {
                                    response = undefined;
                                }
                                // The complete callback returns the
                                // iframe content document as response object:
                                completeCallback(
                                    200,
                                    'success',
                                    {'iframe': response}
                                );
                                // Fix for IE endless progress bar activity bug
                                // (happens on form submits to iframe targets):
                                $('<iframe src="javascript:false;"></iframe>')
                                    .appendTo(form);
                                form.remove();
                            });
                        form
                            .prop('target', iframe.prop('name'))
                            .prop('action', options.url)
                            .prop('method', options.type);
                        if (options.formData) {
                            $.each(options.formData, function (index, field) {
                                $('<input type="hidden"/>')
                                    .prop('name', field.name)
                                    .val(field.value)
                                    .appendTo(form);
                            });
                        }
                        if (options.fileInput && options.fileInput.length &&
                                options.type === 'POST') {
                            fileInputClones = options.fileInput.clone();
                            // Insert a clone for each file input field:
                            options.fileInput.after(function (index) {
                                return fileInputClones[index];
                            });
                            if (options.paramName) {
                                options.fileInput.each(function (index) {
                                    $(this).prop(
                                        'name',
                                        paramNames[index] || options.paramName
                                    );
                                });
                            }
                            // Appending the file input fields to the hidden form
                            // removes them from their original location:
                            form
                                .append(options.fileInput)
                                .prop('enctype', 'multipart/form-data')
                                // enctype must be set as encoding for IE:
                                .prop('encoding', 'multipart/form-data');
                        }
                        form.submit();
                        // Insert the file input fields at their original location
                        // by replacing the clones with the originals:
                        if (fileInputClones && fileInputClones.length) {
                            options.fileInput.each(function (index, input) {
                                var clone = $(fileInputClones[index]);
                                $(input).prop('name', clone.prop('name'));
                                clone.replaceWith(input);
                            });
                        }
                    });
                    form.append(iframe).appendTo(document.body);
                },
                abort: function () {
                    if (iframe) {
                        // javascript:false as iframe src aborts the request
                        // and prevents warning popups on HTTPS in IE6.
                        // concat is used to avoid the "Script URL" JSLint error:
                        iframe
                            .unbind('load')
                            .prop('src', 'javascript'.concat(':false;'));
                    }
                    if (form) {
                        form.remove();
                    }
                }
            };
        }
    });

    // The iframe transport returns the iframe content document as response.
    // The following adds converters from iframe to text, json, html, and script:
    $.ajaxSetup({
        converters: {
            'iframe text': function (iframe) {
                return $(iframe[0].body).text();
            },
            'iframe json': function (iframe) {
                return $.parseJSON($(iframe[0].body).text());
            },
            'iframe html': function (iframe) {
                return $(iframe[0].body).html();
            },
            'iframe script': function (iframe) {
                return $.globalEval($(iframe[0].body).text());
            }
        }
    });

}));
/*
 * jQuery File Upload Plugin 5.42.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * modified by Bruce
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* jshint nomen:false */
/* global define, window, document, location, Blob, FormData */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui.widget'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';

    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    $.support.fileInput = !(new RegExp(
        // Handle devices which give false positives for the feature detection:
        '(Android (1\\.[0156]|2\\.[01]))' +
            '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
            '|(w(eb)?OSBrowser)|(webOS)' +
            '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
    ).test(window.navigator.userAgent) ||
        // Feature detection for all other devices:
        $('<input type="file">').prop('disabled'));

    // The FileReader API is not actually used, but works as feature detection,
    // as some Safari versions (5?) support XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads.
    // window.XMLHttpRequestUpload is not available on IE10, so we check for
    // window.ProgressEvent instead to detect XHR2 file upload capability:
    $.support.xhrFileUpload = !!(window.ProgressEvent && window.FileReader);
    $.support.xhrFormDataFileUpload = !!window.FormData;

    // Detect support for Blob slicing (required for chunked uploads):
    $.support.blobSlice = window.Blob && (Blob.prototype.slice ||
        Blob.prototype.webkitSlice || Blob.prototype.mozSlice);

    // Helper function to create drag handlers for dragover/dragenter/dragleave:
    function getDragHandler(type) {
        var isDragOver = type === 'dragover';
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var dataTransfer = e.dataTransfer;
            if (dataTransfer && $.inArray('Files', dataTransfer.types) !== -1 &&
                    this._trigger(
                        type,
                        $.Event(type, {delegatedEvent: e})
                    ) !== false) {
                e.preventDefault();
                if (isDragOver) {
                    dataTransfer.dropEffect = 'copy';
                }
            }
        };
    }

    // The fileupload widget listens for change events on file input fields defined
    // via fileInput setting and paste or drop events of the given dropZone.
    // In addition to the default jQuery Widget methods, the fileupload widget
    // exposes the "add" and "send" methods, to add or directly send files using
    // the fileupload API.
    // By default, files added via file input selection, paste, drag & drop or
    // "add" method are uploaded immediately, but it is possible to override
    // the "add" callback option to queue file uploads.
    $.widget('blueimp.fileupload', {

        options: {
			// bruce. Want to cache the field name so it is sent with all the files uploaded. 
			ntFieldName: '', 
            // The drop target element(s), by the default the complete document.
            // Set to null to disable drag & drop support:
            dropZone: $(document),
            // The paste target element(s), by the default undefined.
            // Set to a DOM node or jQuery object to enable file pasting:
            pasteZone: undefined,
            // The file input field(s), that are listened to for change events.
            // If undefined, it is set to the file input fields inside
            // of the widget element on plugin initialization.
            // Set to null to disable the change listener.
            fileInput: undefined,
            // By default, the file input field is replaced with a clone after
            // each input field change event. This is required for iframe transport
            // queues and allows change events to be fired for the same file
            // selection, but can be disabled by setting the following option to false:
            replaceFileInput: true,
            // The parameter name for the file form data (the request argument name).
            // If undefined or empty, the name property of the file input field is
            // used, or "files[]" if the file input name property is also empty,
            // can be a string or an array of strings:
            paramName: undefined,
            // By default, each file of a selection is uploaded using an individual
            // request for XHR type uploads. Set to false to upload file
            // selections in one request each:
            singleFileUploads: true,
            // To limit the number of files uploaded with one XHR request,
            // set the following option to an integer greater than 0:
            limitMultiFileUploads: undefined,
            // The following option limits the number of files uploaded with one
            // XHR request to keep the request size under or equal to the defined
            // limit in bytes:
            limitMultiFileUploadSize: undefined,
            // Multipart file uploads add a number of bytes to each uploaded file,
            // therefore the following option adds an overhead for each file used
            // in the limitMultiFileUploadSize configuration:
            limitMultiFileUploadSizeOverhead: 512,
            // Set the following option to true to issue all file upload requests
            // in a sequential order:
            sequentialUploads: false,
            // To limit the number of concurrent uploads,
            // set the following option to an integer greater than 0:
            limitConcurrentUploads: undefined,
            // Set the following option to true to force iframe transport uploads:
            forceIframeTransport: false,
            // Set the following option to the location of a redirect url on the
            // origin server, for cross-domain iframe transport uploads:
            redirect: undefined,
            // The parameter name for the redirect url, sent as part of the form
            // data and set to 'redirect' if this option is empty:
            redirectParamName: undefined,
            // Set the following option to the location of a postMessage window,
            // to enable postMessage transport uploads:
            postMessage: undefined,
            // By default, XHR file uploads are sent as multipart/form-data.
            // The iframe transport is always using multipart/form-data.
            // Set to false to enable non-multipart XHR uploads:
            multipart: true,
            // To upload large files in smaller chunks, set the following option
            // to a preferred maximum chunk size. If set to 0, null or undefined,
            // or the browser does not support the required Blob API, files will
            // be uploaded as a whole.
            maxChunkSize: undefined,
            // When a non-multipart upload or a chunked multipart upload has been
            // aborted, this option can be used to resume the upload by setting
            // it to the size of the already uploaded bytes. This option is most
            // useful when modifying the options object inside of the "add" or
            // "send" callbacks, as the options are cloned for each file upload.
            uploadedBytes: undefined,
            // By default, failed (abort or error) file uploads are removed from the
            // global progress calculation. Set the following option to false to
            // prevent recalculating the global progress data:
            recalculateProgress: true,
            // Interval in milliseconds to calculate and trigger progress events:
            progressInterval: 100,
            // Interval in milliseconds to calculate progress bitrate:
            bitrateInterval: 500,
            // By default, uploads are started automatically when adding files:
            autoUpload: true,

            // Error and info messages:
            messages: {
                uploadedBytes: 'Uploaded bytes exceed file size'
            },

            // Translation function, gets the message key to be translated
            // and an object with context specific data as arguments:
            i18n: function (message, context) {
                message = this.messages[message] || message.toString();
                if (context) {
                    $.each(context, function (key, value) {
                        message = message.replace('{' + key + '}', value);
                    });
                }
                return message;
            },

            // Additional form data to be sent along with the file uploads can be set
            // using this option, which accepts an array of objects with name and
            // value properties, a function returning such an array, a FormData
            // object (for XHR file uploads), or a simple object.
            // The form of the first fileInput is given as parameter to the function:
            formData: function (form) {
                return form.serializeArray();
            },

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop, paste or add API call).
            // If the singleFileUploads option is enabled, this callback will be
            // called once for each file in the selection for XHR file uploads, else
            // once for each file selection.
            //
            // The upload starts when the submit method is invoked on the data parameter.
            // The data object contains a files property holding the added files
            // and allows you to override plugin options as well as define ajax settings.
            //
            // Listeners for this callback can also be bound the following way:
            // .bind('fileuploadadd', func);
            //
            // data.submit() returns a Promise object and allows to attach additional
            // handlers using jQuery's Deferred callbacks:
            // data.submit().done(func).fail(func).always(func);
            add: function (e, data) {
                if (e.isDefaultPrevented()) {
                    return false;
                }
                if (data.autoUpload || (data.autoUpload !== false &&
                        $(this).fileupload('option', 'autoUpload'))) {
                    data.process().done(function () {
                        data.submit();
                    });
                }
            },

            // Other callbacks:

            // Callback for the submit event of each file upload:
            // submit: function (e, data) {}, // .bind('fileuploadsubmit', func);

            // Callback for the start of each file upload request:
            // send: function (e, data) {}, // .bind('fileuploadsend', func);

            // Callback for successful uploads:
            // done: function (e, data) {}, // .bind('fileuploaddone', func);

            // Callback for failed (abort or error) uploads:
            // fail: function (e, data) {}, // .bind('fileuploadfail', func);

            // Callback for completed (success, abort or error) requests:
            // always: function (e, data) {}, // .bind('fileuploadalways', func);

            // Callback for upload progress events:
            // progress: function (e, data) {}, // .bind('fileuploadprogress', func);

            // Callback for global upload progress events:
            // progressall: function (e, data) {}, // .bind('fileuploadprogressall', func);

            // Callback for uploads start, equivalent to the global ajaxStart event:
            // start: function (e) {}, // .bind('fileuploadstart', func);

            // Callback for uploads stop, equivalent to the global ajaxStop event:
            // stop: function (e) {}, // .bind('fileuploadstop', func);

            // Callback for change events of the fileInput(s):
            // change: function (e, data) {}, // .bind('fileuploadchange', func);

            // Callback for paste events to the pasteZone(s):
            // paste: function (e, data) {}, // .bind('fileuploadpaste', func);

            // Callback for drop events of the dropZone(s):
            // drop: function (e, data) {}, // .bind('fileuploaddrop', func);

            // Callback for dragover events of the dropZone(s):
            // dragover: function (e) {}, // .bind('fileuploaddragover', func);

            // Callback for the start of each chunk upload request:
            // chunksend: function (e, data) {}, // .bind('fileuploadchunksend', func);

            // Callback for successful chunk uploads:
            // chunkdone: function (e, data) {}, // .bind('fileuploadchunkdone', func);

            // Callback for failed (abort or error) chunk uploads:
            // chunkfail: function (e, data) {}, // .bind('fileuploadchunkfail', func);

            // Callback for completed (success, abort or error) chunk upload requests:
            // chunkalways: function (e, data) {}, // .bind('fileuploadchunkalways', func);

            // The plugin options are used as settings object for the ajax calls.
            // The following are jQuery ajax settings required for the file uploads:
            processData: false,
            contentType: false,
            cache: false
        },

        // A list of options that require reinitializing event listeners and/or
        // special initialization code:
        _specialOptions: [
            'fileInput',
            'dropZone',
            'pasteZone',
            'multipart',
            'forceIframeTransport'
        ],

        _blobSlice: $.support.blobSlice && function () {
            var slice = this.slice || this.webkitSlice || this.mozSlice;
            return slice.apply(this, arguments);
        },

        _BitrateTimer: function () {
            this.timestamp = ((Date.now) ? Date.now() : (new Date()).getTime());
            this.loaded = 0;
            this.bitrate = 0;
            this.getBitrate = function (now, loaded, interval) {
                var timeDiff = now - this.timestamp;
                if (!this.bitrate || !interval || timeDiff > interval) {
                    this.bitrate = (loaded - this.loaded) * (1000 / timeDiff) * 8;
                    this.loaded = loaded;
                    this.timestamp = now;
                }
                return this.bitrate;
            };
        },

        _isXHRUpload: function (options) {
            return !options.forceIframeTransport &&
                ((!options.multipart && $.support.xhrFileUpload) ||
                $.support.xhrFormDataFileUpload);
        },

        _getFormData: function (options) {
            var formData;
            if ($.type(options.formData) === 'function') {
                return options.formData(options.form);
            }
            if ($.isArray(options.formData)) {
                return options.formData;
            }
            if ($.type(options.formData) === 'object') {
                formData = [];
                $.each(options.formData, function (name, value) {
                    formData.push({name: name, value: value});
                });
                return formData;
            }
            return [];
        },

        _getTotal: function (files) {
            var total = 0;
            $.each(files, function (index, file) {
                total += file.size || 1;
            });
            return total;
        },

        _initProgressObject: function (obj) {
            var progress = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            if (obj._progress) {
                $.extend(obj._progress, progress);
            } else {
                obj._progress = progress;
            }
        },

        _initResponseObject: function (obj) {
            var prop;
            if (obj._response) {
                for (prop in obj._response) {
                    if (obj._response.hasOwnProperty(prop)) {
                        delete obj._response[prop];
                    }
                }
            } else {
                obj._response = {};
            }
        },

        _onProgress: function (e, data) {
            if (e.lengthComputable) {
                var now = ((Date.now) ? Date.now() : (new Date()).getTime()),
                    loaded;
                if (data._time && data.progressInterval &&
                        (now - data._time < data.progressInterval) &&
                        e.loaded !== e.total) {
                    return;
                }
                data._time = now;
                loaded = Math.floor(
                    e.loaded / e.total * (data.chunkSize || data._progress.total)
                ) + (data.uploadedBytes || 0);
                // Add the difference from the previously loaded state
                // to the global loaded counter:
                this._progress.loaded += (loaded - data._progress.loaded);
                this._progress.bitrate = this._bitrateTimer.getBitrate(
                    now,
                    this._progress.loaded,
                    data.bitrateInterval
                );
                data._progress.loaded = data.loaded = loaded;
                data._progress.bitrate = data.bitrate = data._bitrateTimer.getBitrate(
                    now,
                    loaded,
                    data.bitrateInterval
                );
                // Trigger a custom progress event with a total data property set
                // to the file size(s) of the current upload and a loaded data
                // property calculated accordingly:
                this._trigger(
                    'progress',
                    $.Event('progress', {delegatedEvent: e}),
                    data
                );
                // Trigger a global progress event for all current file uploads,
                // including ajax calls queued for sequential file uploads:
                this._trigger(
                    'progressall',
                    $.Event('progressall', {delegatedEvent: e}),
                    this._progress
                );
            }
        },

        _initProgressListener: function (options) {
            var that = this,
                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
            // Accesss to the native XHR object is required to add event listeners
            // for the upload progress event:
            if (xhr.upload) {
                $(xhr.upload).bind('progress', function (e) {
                    var oe = e.originalEvent;
                    // Make sure the progress event properties get copied over:
                    e.lengthComputable = oe.lengthComputable;
                    e.loaded = oe.loaded;
                    e.total = oe.total;
                    that._onProgress(e, options);
                });
                options.xhr = function () {
                    return xhr;
                };
            }
        },

        _isInstanceOf: function (type, obj) {
            // Cross-frame instanceof check
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        },

        _initXHRData: function (options) {
            var that = this,
                formData,
                file = options.files[0],
                // Ignore non-multipart setting if not supported:
                multipart = options.multipart || !$.support.xhrFileUpload,
                paramName = $.type(options.paramName) === 'array' ?
                    options.paramName[0] : options.paramName;
            options.headers = $.extend({}, options.headers);
            if (options.contentRange) {
                options.headers['Content-Range'] = options.contentRange;
            }
            if (!multipart || options.blob || !this._isInstanceOf('File', file)) {
                options.headers['Content-Disposition'] = 'attachment; filename="' +
                    encodeURI(file.name) + '"';
            }
            if (!multipart) {
                options.contentType = file.type || 'application/octet-stream';
                options.data = options.blob || file;
            } else if ($.support.xhrFormDataFileUpload) {
                if (options.postMessage) {
                    // window.postMessage does not allow sending FormData
                    // objects, so we just add the File/Blob objects to
                    // the formData array and let the postMessage window
                    // create the FormData object out of this array:
                    formData = this._getFormData(options);
                    if (options.blob) {
                        formData.push({
                            name: paramName,
                            value: options.blob
                        });
                    } else {
                        $.each(options.files, function (index, file) {
                            formData.push({
                                name: ($.type(options.paramName) === 'array' &&
                                    options.paramName[index]) || paramName,
                                value: file
                            });
                        });
                    }
                } else {
                    if (that._isInstanceOf('FormData', options.formData)) {
                        formData = options.formData;
                    } else {
                        formData = new FormData();
                        $.each(this._getFormData(options), function (index, field) {
                            formData.append(field.name, field.value);
                        });
                    }
                    if (options.blob) {
                        formData.append(paramName, options.blob, file.name);
                    } else {
                        $.each(options.files, function (index, file) {
                            // This check allows the tests to run with
                            // dummy objects:
                            if (that._isInstanceOf('File', file) ||
                                    that._isInstanceOf('Blob', file)) {
                                formData.append(
                                    ($.type(options.paramName) === 'array' &&
                                        options.paramName[index]) || paramName,
                                    file,
                                    file.uploadName || file.name
                                );
                            }
                        });
                    }
                }
                options.data = formData;
            }
            // Blob reference is not needed anymore, free memory:
            options.blob = null;
        },

        _initIframeSettings: function (options) {
            var targetHost = $('<a></a>').prop('href', options.url).prop('host');
            // Setting the dataType to iframe enables the iframe transport:
            options.dataType = 'iframe ' + (options.dataType || '');
            // The iframe transport accepts a serialized array as form data:
            options.formData = this._getFormData(options);
            // Add redirect url to form data on cross-domain uploads:
            if (options.redirect && targetHost && targetHost !== location.host) {
                options.formData.push({
                    name: options.redirectParamName || 'redirect',
                    value: options.redirect
                });
            }
        },

        _initDataSettings: function (options) {
            if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options);
            }
        },

        _getParamName: function (options) {
			if (this.options.ntFieldName){ // bruce. don't want the files[] array - just use the first name.
				return this.options.ntFieldName;
			}	
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },

        _initFormSettings: function (options) {
            // Retrieve missing options from the input field and the
            // associated form, if available:
            if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
                // If the given file input doesn't have an associated form,
                // use the default widget file input's form:
                if (!options.form.length) {
                    options.form = $(this.options.fileInput.prop('form'));
                }
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type ||
                ($.type(options.form.prop('method')) === 'string' &&
                    options.form.prop('method')) || ''
                ).toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT' &&
                    options.type !== 'PATCH') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },

        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },

        // jQuery 1.6 doesn't provide .state(),
        // while jQuery 1.8+ removed .isRejected() and .isResolved():
        _getDeferredState: function (deferred) {
            if (deferred.state) {
                return deferred.state();
            }
            if (deferred.isResolved()) {
                return 'resolved';
            }
            if (deferred.isRejected()) {
                return 'rejected';
            }
            return 'pending';
        },

        // Maps jqXHR callbacks to the equivalent
        // methods of the given Promise object:
        _enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },

        // Creates and returns a Promise object enhanced with
        // the jqXHR methods abort, success, error and complete:
        _getXHRPromise: function (resolveOrReject, context, args) {
            var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },

        // Adds convenience methods to the data callback argument:
        _addConvenienceMethods: function (e, data) {
            var that = this,
                getPromise = function (args) {
                    return $.Deferred().resolveWith(that, args).promise();
                };
            data.process = function (resolveFunc, rejectFunc) {
                if (resolveFunc || rejectFunc) {
                    data._processQueue = this._processQueue =
                        (this._processQueue || getPromise([this])).pipe(
                            function () {
                                if (data.errorThrown) {
                                    return $.Deferred()
                                        .rejectWith(that, [data]).promise();
                                }
                                return getPromise(arguments);
                            }
                        ).pipe(resolveFunc, rejectFunc);
                }
                return this._processQueue || getPromise([this]);
            };
            data.submit = function () {
                if (this.state() !== 'pending') {
                    data.jqXHR = this.jqXHR =
                        (that._trigger(
                            'submit',
                            $.Event('submit', {delegatedEvent: e}),
                            this
                        ) !== false) && that._onSend(e, this);
                }
                return this.jqXHR || that._getXHRPromise();
            };
            data.abort = function () {
                if (this.jqXHR) {
                    return this.jqXHR.abort();
                }
                this.errorThrown = 'abort';
                that._trigger('fail', null, this);
                return that._getXHRPromise(false);
            };
            data.state = function () {
                if (this.jqXHR) {
                    return that._getDeferredState(this.jqXHR);
                }
                if (this._processQueue) {
                    return that._getDeferredState(this._processQueue);
                }
            };
            data.processing = function () {
                return !this.jqXHR && this._processQueue && that
                    ._getDeferredState(this._processQueue) === 'pending';
            };
            data.progress = function () {
                return this._progress;
            };
            data.response = function () {
                return this._response;
            };
        },

        // Parses the Range header from the server response
        // and returns the uploaded bytes:
        _getUploadedBytes: function (jqXHR) {
            var range = jqXHR.getResponseHeader('Range'),
                parts = range && range.split('-'),
                upperBytesPos = parts && parts.length > 1 &&
                    parseInt(parts[1], 10);
            return upperBytesPos && upperBytesPos + 1;
        },

        // Uploads a file in multiple, sequential requests
        // by splitting the file up in multiple blob chunks.
        // If the second parameter is true, only tests if the file
        // should be uploaded in chunks, but does not invoke any
        // upload requests:
        _chunkedUpload: function (options, testOnly) {
            options.uploadedBytes = options.uploadedBytes || 0;
            var that = this,
                file = options.files[0],
                fs = file.size,
                ub = options.uploadedBytes,
                mcs = options.maxChunkSize || fs,
                slice = this._blobSlice,
                dfd = $.Deferred(),
                promise = dfd.promise(),
                jqXHR,
                upload;
            if (!(this._isXHRUpload(options) && slice && (ub || mcs < fs)) ||
                    options.data) {
                return false;
            }
            if (testOnly) {
                return true;
            }
            if (ub >= fs) {
                file.error = options.i18n('uploadedBytes');
                return this._getXHRPromise(
                    false,
                    options.context,
                    [null, 'error', file.error]
                );
            }
            // The chunk upload method:
            upload = function () {
                // Clone the options object for each chunk upload:
                var o = $.extend({}, options),
                    currentLoaded = o._progress.loaded;
                o.blob = slice.call(
                    file,
                    ub,
                    ub + mcs,
                    file.type
                );
                // Store the current chunk size, as the blob itself
                // will be dereferenced after data processing:
                o.chunkSize = o.blob.size;
                // Expose the chunk bytes position range:
                o.contentRange = 'bytes ' + ub + '-' +
                    (ub + o.chunkSize - 1) + '/' + fs;
                // Process the upload data (the blob and potential form data):
                that._initXHRData(o);
                // Add progress listeners for this chunk upload:
                that._initProgressListener(o);
                jqXHR = ((that._trigger('chunksend', null, o) !== false && $.ajax(o)) ||
                        that._getXHRPromise(false, o.context))
                    .done(function (result, textStatus, jqXHR) {
                        ub = that._getUploadedBytes(jqXHR) ||
                            (ub + o.chunkSize);
                        // Create a progress event if no final progress event
                        // with loaded equaling total has been triggered
                        // for this chunk:
                        if (currentLoaded + o.chunkSize - o._progress.loaded) {
                            that._onProgress($.Event('progress', {
                                lengthComputable: true,
                                loaded: ub - o.uploadedBytes,
                                total: ub - o.uploadedBytes
                            }), o);
                        }
                        options.uploadedBytes = o.uploadedBytes = ub;
                        o.result = result;
                        o.textStatus = textStatus;
                        o.jqXHR = jqXHR;
                        that._trigger('chunkdone', null, o);
                        that._trigger('chunkalways', null, o);
                        if (ub < fs) {
                            // File upload not yet complete,
                            // continue with the next chunk:
                            upload();
                        } else {
                            dfd.resolveWith(
                                o.context,
                                [result, textStatus, jqXHR]
                            );
                        }
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        o.jqXHR = jqXHR;
                        o.textStatus = textStatus;
                        o.errorThrown = errorThrown;
                        that._trigger('chunkfail', null, o);
                        that._trigger('chunkalways', null, o);
                        dfd.rejectWith(
                            o.context,
                            [jqXHR, textStatus, errorThrown]
                        );
                    });
            };
            this._enhancePromise(promise);
            promise.abort = function () {
                return jqXHR.abort();
            };
            upload();
            return promise;
        },

        _beforeSend: function (e, data) {
            if (this._active === 0) {
                // the start callback is triggered when an upload starts
                // and no other uploads are currently running,
                // equivalent to the global ajaxStart event:
                this._trigger('start');
                // Set timer for global bitrate progress calculation:
                this._bitrateTimer = new this._BitrateTimer();
                // Reset the global progress values:
                this._progress.loaded = this._progress.total = 0;
                this._progress.bitrate = 0;
            }
            // Make sure the container objects for the .response() and
            // .progress() methods on the data object are available
            // and reset to their initial state:
            this._initResponseObject(data);
            this._initProgressObject(data);
            data._progress.loaded = data.loaded = data.uploadedBytes || 0;
            data._progress.total = data.total = this._getTotal(data.files) || 1;
            data._progress.bitrate = data.bitrate = 0;
            this._active += 1;
            // Initialize the global progress values:
            this._progress.loaded += data.loaded;
            this._progress.total += data.total;
        },

        _onDone: function (result, textStatus, jqXHR, options) {
            var total = options._progress.total,
                response = options._response;
            if (options._progress.loaded < total) {
                // Create a progress event if no final progress event
                // with loaded equaling total has been triggered:
                this._onProgress($.Event('progress', {
                    lengthComputable: true,
                    loaded: total,
                    total: total
                }), options);
            }
            response.result = options.result = result;
            response.textStatus = options.textStatus = textStatus;
            response.jqXHR = options.jqXHR = jqXHR;
            this._trigger('done', null, options);
        },

        _onFail: function (jqXHR, textStatus, errorThrown, options) {
            var response = options._response;
            if (options.recalculateProgress) {
                // Remove the failed (error or abort) file upload from
                // the global progress calculation:
                this._progress.loaded -= options._progress.loaded;
                this._progress.total -= options._progress.total;
            }
            response.jqXHR = options.jqXHR = jqXHR;
            response.textStatus = options.textStatus = textStatus;
            response.errorThrown = options.errorThrown = errorThrown;
            this._trigger('fail', null, options);
        },

        _onAlways: function (jqXHRorResult, textStatus, jqXHRorError, options) {
            // jqXHRorResult, textStatus and jqXHRorError are added to the
            // options object via done and fail callbacks
            this._trigger('always', null, options);
        },

        _onSend: function (e, data) {
            if (!data.submit) {
                this._addConvenienceMethods(e, data);
            }
            var that = this,
                jqXHR,
                aborted,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function () {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        ((aborted || that._trigger(
                            'send',
                            $.Event('send', {delegatedEvent: e}),
                            options
                        ) === false) &&
                        that._getXHRPromise(false, options.context, aborted)) ||
                        that._chunkedUpload(options) || $.ajax(options)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        that._sending -= 1;
                        that._active -= 1;
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift();
                            while (nextSlot) {
                                if (that._getDeferredState(nextSlot) === 'pending') {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                        if (that._active === 0) {
                            // The stop callback is triggered when all uploads have
                            // been completed, equivalent to the global ajaxStop event:
                            that._trigger('stop');
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    this._sequence = this._sequence.pipe(send, send);
                    pipe = this._sequence;
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    aborted = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(options.context, aborted);
                        }
                        return send();
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },

        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                files = data.files,
                filesLength = files.length,
                limit = options.limitMultiFileUploads,
                limitSize = options.limitMultiFileUploadSize,
                overhead = options.limitMultiFileUploadSizeOverhead,
                batchSize = 0,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i,
                j = 0;
            if (limitSize && (!filesLength || files[0].size === undefined)) {
                limitSize = undefined;
            }
            if (!(options.singleFileUploads || limit || limitSize) ||
                    !this._isXHRUpload(options)) {
                fileSet = [files];
                paramNameSet = [paramName];
            } else if (!(options.singleFileUploads || limitSize) && limit) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i += limit) {
                    fileSet.push(files.slice(i, i + limit));
                    paramNameSlice = paramName.slice(i, i + limit);
                    if (!paramNameSlice.length) {
                        paramNameSlice = paramName;
                    }
                    paramNameSet.push(paramNameSlice);
                }
            } else if (!options.singleFileUploads && limitSize) {
                fileSet = [];
                paramNameSet = [];
                for (i = 0; i < filesLength; i = i + 1) {
                    batchSize += files[i].size + overhead;
                    if (i + 1 === filesLength ||
                            ((batchSize + files[i + 1].size + overhead) > limitSize) ||
                            (limit && i + 1 - j >= limit)) {
                        fileSet.push(files.slice(j, i + 1));
                        paramNameSlice = paramName.slice(j, i + 1);
                        if (!paramNameSlice.length) {
                            paramNameSlice = paramName;
                        }
                        paramNameSet.push(paramNameSlice);
                        j = i + 1;
                        batchSize = 0;
                    }
                }
            } else {
                paramNameSet = paramName;
            }
            data.originalFiles = files;
            $.each(fileSet || files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                that._initResponseObject(newData);
                that._initProgressObject(newData);
                that._addConvenienceMethods(e, newData);
                result = that._trigger(
                    'add',
                    $.Event('add', {delegatedEvent: e}),
                    newData
                );
                return result;
            });
            return result;
        },

        _replaceFileInput: function (data) {
            var input = data.fileInput,
                inputClone = input.clone(true);
            // Add a reference for the new cloned file input to the data argument:
            data.fileInputClone = inputClone;
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // elements set with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },

        _handleFileTreeEntry: function (entry, path) {
            var that = this,
                dfd = $.Deferred(),
                errorHandler = function (e) {
                    if (e && !e.entry) {
                        e.entry = entry;
                    }
                    // Since $.when returns immediately if one
                    // Deferred is rejected, we use resolve instead.
                    // This allows valid files and invalid items
                    // to be returned together in one set:
                    dfd.resolve([e]);
                },
                successHandler = function (entries) {
                    that._handleFileTreeEntries(
                        entries,
                        path + entry.name + '/'
                    ).done(function (files) {
                        dfd.resolve(files);
                    }).fail(errorHandler);
                },
                readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            successHandler(entries);
                        } else {
                            entries = entries.concat(results);
                            readEntries();
                        }
                    }, errorHandler);
                },
                dirReader, entries = [];
            path = path || '';
            if (entry.isFile) {
                if (entry._file) {
                    // Workaround for Chrome bug #149735
                    entry._file.relativePath = path;
                    dfd.resolve(entry._file);
                } else {
                    entry.file(function (file) {
                        file.relativePath = path;
                        dfd.resolve(file);
                    }, errorHandler);
                }
            } else if (entry.isDirectory) {
                dirReader = entry.createReader();
                readEntries();
            } else {
                // Return an empy list for file system items
                // other than files or directories:
                dfd.resolve([]);
            }
            return dfd.promise();
        },

        _handleFileTreeEntries: function (entries, path) {
            var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _getDroppedFiles: function (dataTransfer) {
            dataTransfer = dataTransfer || {};
            var items = dataTransfer.items;
            if (items && items.length && (items[0].webkitGetAsEntry ||
                    items[0].getAsEntry)) {
                return this._handleFileTreeEntries(
                    $.map(items, function (item) {
                        var entry;
                        if (item.webkitGetAsEntry) {
                            entry = item.webkitGetAsEntry();
                            if (entry) {
                                // Workaround for Chrome bug #149735:
                                entry._file = item.getAsFile();
                            }
                            return entry;
                        }
                        return item.getAsEntry();
                    })
                );
            }
            return $.Deferred().resolve(
                $.makeArray(dataTransfer.files)
            ).promise();
        },

        _getSingleFileInputFiles: function (fileInput) {
            fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') ||
                    fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().resolve([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            } else if (files[0].name === undefined && files[0].fileName) {
                // File normalization for Safari 4 and Firefox 3:
                $.each(files, function (index, file) {
                    file.name = file.fileName;
                    file.size = file.fileSize;
                });
            }
            return $.Deferred().resolve(files).promise();
        },

        _getFileInputFiles: function (fileInput) {
            if (!(fileInput instanceof $) || fileInput.length === 1) {
                return this._getSingleFileInputFiles(fileInput);
            }
            return $.when.apply(
                $,
                $.map(fileInput, this._getSingleFileInputFiles)
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },

        _onChange: function (e) {
            var that = this,
                data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            this._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data);
                }
                if (that._trigger(
                        'change',
                        $.Event('change', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    that._onAdd(e, data);
                }
            });
        },

        _onPaste: function (e) {
            var items = e.originalEvent && e.originalEvent.clipboardData &&
                    e.originalEvent.clipboardData.items,
                data = {files: []};
            if (items && items.length) {
                $.each(items, function (index, item) {
                    var file = item.getAsFile && item.getAsFile();
                    if (file) {
                        data.files.push(file);
                    }
                });
                if (this._trigger(
                        'paste',
                        $.Event('paste', {delegatedEvent: e}),
                        data
                    ) !== false) {
                    this._onAdd(e, data);
                }
            }
        },

        _onDrop: function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var that = this,
                dataTransfer = e.dataTransfer,
                data = {};
            if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {
                e.preventDefault();
                this._getDroppedFiles(dataTransfer).always(function (files) {
                    data.files = files;
                    if (that._trigger(
                            'drop',
                            $.Event('drop', {delegatedEvent: e}),
                            data
                        ) !== false) {
                        that._onAdd(e, data);
                    }
                });
            }
        },

        _onDragOver: getDragHandler('dragover'),

        _onDragEnter: getDragHandler('dragenter'),

        _onDragLeave: getDragHandler('dragleave'),

        _initEventHandlers: function () {
            if (this._isXHRUpload(this.options)) {
                this._on(this.options.dropZone, {
                    dragover: this._onDragOver,
                    drop: this._onDrop,
                    // event.preventDefault() on dragenter is required for IE10+:
                    dragenter: this._onDragEnter,
                    // dragleave is not required, but added for completeness:
                    dragleave: this._onDragLeave
                });
                this._on(this.options.pasteZone, {
                    paste: this._onPaste
                });
            }
            if ($.support.fileInput) {
                this._on(this.options.fileInput, {
                    change: this._onChange
                });
            }
        },

        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, 'dragenter dragleave dragover drop');
            this._off(this.options.pasteZone, 'paste');
            this._off(this.options.fileInput, 'change');
        },

        _setOption: function (key, value) {
            var reinit = $.inArray(key, this._specialOptions) !== -1;
            if (reinit) {
                this._destroyEventHandlers();
            }
            this._super(key, value);
            if (reinit) {
                this._initSpecialOptions();
                this._initEventHandlers();
            }
        },

        _initSpecialOptions: function () {
            var options = this.options;
            if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            } else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
            if (!(options.dropZone instanceof $)) {
                options.dropZone = $(options.dropZone);
            }
            if (!(options.pasteZone instanceof $)) {
                options.pasteZone = $(options.pasteZone);
            }
        },

        _getRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _isRegExpOption: function (key, value) {
            return key !== 'url' && $.type(value) === 'string' &&
                /^\/.*\/[igm]{0,3}$/.test(value);
        },

        _initDataAttributes: function () {
            var that = this,
                options = this.options,
                clone = $(this.element[0].cloneNode(false)),
                data = clone.data();
            // Avoid memory leaks:
            clone.remove();
            // Initialize options set via HTML5 data-attributes:
            $.each(
                data,
                function (key, value) {
                    var dataAttributeName = 'data-' +
                        // Convert camelCase to hyphen-ated key:
                        key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                    if (clone.attr(dataAttributeName)) {
                        if (that._isRegExpOption(key, value)) {
                            value = that._getRegExp(value);
                        }
                        options[key] = value;
                    }
                }
            );
        },

        _create: function () {
            this._initDataAttributes();
            this._initSpecialOptions();
            this._slots = [];
            this._sequence = this._getXHRPromise(true);
            this._sending = this._active = 0;
            this._initProgressObject(this);
            this._initEventHandlers();
        },

        // This method is exposed to the widget API and allows to query
        // the number of active uploads:
        active: function () {
            return this._active;
        },

        // This method is exposed to the widget API and allows to query
        // the widget upload progress.
        // It returns an object with loaded, total and bitrate properties
        // for the running uploads:
        progress: function () {
            return this._progress;
        },

        // This method is exposed to the widget API and allows adding files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files property and can contain additional options:
        // .fileupload('add', {files: filesList});
        add: function (data) {
            var that = this;
            if (!data || this.options.disabled) {
                return;
            }
            if (data.fileInput && !data.files) {
                this._getFileInputFiles(data.fileInput).always(function (files) {
                    data.files = files;
                    that._onAdd(null, data);
                });
            } else {
                data.files = $.makeArray(data.files);
                this._onAdd(null, data);
            }
        },

        // This method is exposed to the widget API and allows sending files
        // using the fileupload API. The data parameter accepts an object which
        // must have a files or fileInput property and can contain additional options:
        // .fileupload('send', {files: filesList});
        // The method returns a Promise object for the file upload call.
        send: function (data) {
            if (data && !this.options.disabled) {
                if (data.fileInput && !data.files) {
                    var that = this,
                        dfd = $.Deferred(),
                        promise = dfd.promise(),
                        jqXHR,
                        aborted;
                    promise.abort = function () {
                        aborted = true;
                        if (jqXHR) {
                            return jqXHR.abort();
                        }
                        dfd.reject(null, 'abort', 'abort');
                        return promise;
                    };
                    this._getFileInputFiles(data.fileInput).always(
                        function (files) {
                            if (aborted) {
                                return;
                            }
                            if (!files.length) {
                                dfd.reject();
                                return;
                            }
                            data.files = files;
                            jqXHR = that._onSend(null, data);
                            jqXHR.then(
                                function (result, textStatus, jqXHR) {
                                    dfd.resolve(result, textStatus, jqXHR);
                                },
                                function (jqXHR, textStatus, errorThrown) {
                                    dfd.reject(jqXHR, textStatus, errorThrown);
                                }
                            );
                        }
                    );
                    return this._enhancePromise(promise);
                }
                data.files = $.makeArray(data.files);
                if (data.files.length) {
                    return this._onSend(null, data);
                }
            }
            return this._getXHRPromise(false, data && data.context);
        }

    });

}));
// nettalk file upload wrapper

(function( $, undefined ) {

$.widget( "ui.ntupload", {
	options: {
		proc: '',
		field: '',
		multiple: true,
		autoUpload: false,
		jQueryButtons: true, 				
		addText: 'Add Files',
		addIcon: 'ui-icon-plus',
		addClass: '',
		addId: 'a',
		addOnce: 1,
		clearText: 'Clear',
		clearIcon: 'ui-icon-trash',
		clearClass: '',
		clearId: 'l',
		startText: 'Start',
		startIcon: 'ui-icon-play',
		startClass: '',
		smallStartClass: '',
		startId: 's',		
		cancelText: 'Cancel',
		cancelIcon: 'ui-icon-cancel',
		cancelClass: '',		
		smallCancelClass: '',
		removeText: 'Remove',
		removeIcon: 'ui-icon-trash',
		smallRemoveClass: '',		
		cancelId: 'c',
		progressId: 'p',
		progressClass: '',
		listTable: true,		
		tableId: '',
		tableClass: 'nt-upload-table ui-corner-all',		
		uploadingText: 'Uploading',
		uploadedText: 'Uploaded',
		failedText: 'Failed',
		waitingText: 'Waiting',
		cancelledText: 'Cancelled',
		progressEvents: 1,
		maxSize:1,
		maxWarning:'File Too Large',
		ntform:''
	},
	datas: new Array(),	
	waiting:0,
	started: 0,
	uploaded: 0,
	

//------------------------------------------------------
	_init : function() {       
	var _this=this;	
	this.options.addId = 'a' + Math.random().toString(36).substring(7);
	this.options.clearId = 'l' + Math.random().toString(36).substring(7);
	this.options.startId = 's' + Math.random().toString(36).substring(7);		
	this.options.startId = 's' + Math.random().toString(36).substring(7);		
	this.options.cancelId = 'c' + Math.random().toString(36).substring(7);
	this.options.progressId = 'p' + Math.random().toString(36).substring(7);
	
	if (this.options.jQueryButtons){		
	   
		if (this.options.addIcon){
			$(this.element).children('label').append('<span class="ui-button-icon-primary ui-icon '+this.options.addIcon+'"></span>');
		}	
		$(this.element).children('label').addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ' +this.options.addClass);
	} else {
		$(this.element).children('label').addClass('ui-button ui-corner-all nt-addfiles-button ' +this.options.addClass);
	}	
	$(this.element).children('label').append('<span id="'+this.options.addId+'" class="ui-button-text"><span>'+this.options.addText+'</span></span>');

	$(this.element).append('<button id="'+this.options.startId+'" data-inline="true" type="button" class="'+this.options.startClass+'">'+this.options.startText+'</Button>');
	$(this.element).append('<button id="'+this.options.clearId+'" data-inline="true" type="button" class="'+this.options.clearClass+'">'+this.options.clearText+'</Button>');
	$(this.element).append('<button id="'+this.options.cancelId+'" data-inline="true" type="button" class="'+this.options.cancelClass+'">'+this.options.cancelText+'</Button>');

	if (this.options.jQueryButtons){
		var options = '';
		if (this.options.startIcon){
			options = {icons: {primary: this.options.startIcon}};
		}
		$('#'+this.options.startId).button(options).hide();
		if (this.options.clearIcon){
			options = {icons: {primary: this.options.clearIcon}};
		}	
		$('#'+this.options.clearId).button(options).hide();				
		if (this.options.cancelIcon){
			options = {icons: {primary: this.options.cancelIcon}};
		}	
		$('#'+this.options.cancelId).button(options).hide();				
	} else {
		$('#'+this.options.startId).hide();	
		$('#'+this.options.clearId).hide();	
		$('#'+this.options.cancelId).hide();
	}
	
	if (this.options.listTable){
		if (!this.options.listTableId){
			this.options.tableId = 'T' + Math.random().toString(36).substring(7);
		}	
		$(this.element).append('<table id="'+this.options.tableId+'" class="'+this.options.tableClass+'"></table>');
		if (this.options.multiple){
		  $('#'+this.options.tableId).append('<tr><td colspan="4"><div id="'+this.options.progressId+'" class="'+this.options.progressClass+'" style="height:5px"></div></td></tr>');
		}  
	}
	$('#'+this.options.startId).off('click.ul').on('click.ul',function(e){_this.startall();});
	$('#'+this.options.clearId).off('click.ul').on('click.ul',function(e){_this.clearall();});
	$('#'+this.options.cancelId).off('click.ul').on('click.ul',function(e){_this.cancelall();});
	if (this.options.multiple){
	  $('#'+this.options.progressId).progressbar();
	  $('#'+this.options.progressId).hide();
	}  
	$('#'+this.options.tableId).hide();
	
  if (!!window.FormData) {
    this.options.progressEvents = true;
  } else {
    this.options.progressEvents = false;
  }	
	
	$(this.element).find('[data-do="input"]').fileupload({
        dataType: 'xml',
		url: _this.options.proc + '_' + _this.options.field + '_value?_event_=accepted',
		autoUpload: true,
		
        done: function (e, data) {
		  _this.doneone(e,data);
        },

        fail: function (e, data) {
		  _this.failone(e,data);
        },

		add: function(e,data){			
			_this.add(e,data);			
		},
		
		progressall: function (e, data) {
		  _this.progressall(e,data);			
		},
		
		progress: function (e, data) {
		  _this.progress(e,data);			
		}
		
    });
	
	},	

//------------------------------------------------------
	startall : function() {	 
        var _this=this;	                  
    if (this.options.progressEvents){
	      $('#'+this.options.progressId).show();
    }    
		if (this.options.jQueryButtons){
			$('#'+this.options.clearId).button().show();
			$('#'+this.options.cancelId).button().show();
		} else {
			$('#'+this.options.clearId).show();
			$('#'+this.options.cancelId).show();
		}		

		for(var d = 0; d < this.datas.length; d++){
			_this.startone(this.datas[d]);
		};		
	},		
	
//------------------------------------------------------
	clearall : function() {	 
    var _this=this;			
		for(var d = this.datas.length-1; d >= 0 ; d--){		    
			this.clearone(_this.datas[d]);
		};	
	},			
//------------------------------------------------------
	cancelall : function() {	 
        var _this=this;	
		$('#'+this.options.progressId).hide();
		for(var d = 0; d < this.datas.length; d++){
			_this.cancelone(this.datas[d]);
		};		
		if (this.options.jQueryButtons){
			$('#'+this.options.cancelId).button().hide();
			$('#'+this.options.startId).button().show();
			$('#'+this.options.clearId).button().show();		
		} else {
			$('#'+this.options.cancelId).hide();
			$('#'+this.options.startId).show();
			$('#'+this.options.clearId).show();		
		}		
	},			
//------------------------------------------------------
	startone : function(data) {	   
		if (this.options.progressEvents){
			$('#T'+data.context).show();
		}  
		$('#R'+data.context).hide();
		$('#C'+data.context).show();
		$('#W'+data.context).html('<span class="ui-corner-all ui-state-highlight nt-padding-5px">'+this.options.uploadingText+'</span>');
		data.submit();
		this.started += 1;
	},			
//------------------------------------------------------
	clearone : function(data,done) {	 		
		var _this=this;	
		var found=0;
		$('#T'+data.context).remove();
		if (done != true){
			$('#'+data.context).remove();
		}	
		for(var d = 0; d < this.datas.length; d++){
			if (_this.datas[d].context == data.context){
				found = true;				
			}	
			if (found){
				_this.datas[d] = _this.datas[d+1];
			}			
		}	
		this.datas.length -= 1;
		this.waiting -= 1;
		if (this.waiting == 0){
			if (this.options.jQueryButtons){
				$('#'+this.options.startId).button().hide();
				$('#'+this.options.clearId).button().hide();				
			} else {
				$('#'+this.options.startId).hide();
				$('#'+this.options.clearId).hide();				
			}			
			this.enableSave();
			if (this.uploaded ==0){
				$('#'+this.options.tableId).hide();
			}	
		}  
	},			
//------------------------------------------------------
	cancelone : function(data) {	 
        var _this=this;			
        if (!data.jqXHR) {
			data.errorThrown = 'abort';
			this._trigger('fail', data);			
        } else {
			data.jqXHR.abort();
        }		
		$('#W'+data.context).html('<span class="ui-state-error nt-padding-5px ui-corner-all">'+this.options.cancelledText+'</span>');
	},			
//------------------------------------------------------
	doneone : function(d,data) {	 
		$('#T'+data.context).hide();
		$('#S'+data.context).hide();
		$('#R'+data.context).hide();
		$('#C'+data.context).hide();
		$('#W'+data.context).html('<span class="ui-corner-all ui-state-highlight nt-padding-5px">'+this.options.uploadedText+'</span>');
		if(this.options.addOnce){
		  $('#' + this.options.field).parent().hide();
		}
		this.stopone();
		this.uploaded += 1;
		this.clearone(data,true);
		xmlProcess(data.jqXHR.responseText,true);
	},			
//------------------------------------------------------
	failone : function(d,data) {
		$('#T'+data.context).hide();
		$('#R'+data.context).show();
		$('#C'+data.context).hide();
		$('#W'+data.context).html('<span class="ui-state-error nt-padding-5px ui-corner-all">'+this.options.failedText+'</span>');
		this.stopone();
	},			
//------------------------------------------------------
	stopone : function() {	 
		this.started -= 1;
		if (this.started == 0){
			$('#'+this.options.progressId).hide();
			if (this.options.jQueryButtons){
				$('#'+this.options.cancelId).button().hide();
			} else {
				$('#'+this.options.cancelId).hide();
			}			
		}
	},			
	
//------------------------------------------------------
	add : function(e,data) {
		var _this=this;	
		var s='';
		if (this.options.multiple == false){
		  this.clearall();
		}
		$.each(data.files, function (index, file) {
			var bts;
			if (file.size == undefined){
				s = ''
			} else if (file.size < 1024){
				s = file.size + ' Bytes'
			} else if (file.size < 1048576){
				s = parseInt(file.size / 1024) + ' KB'
			} else {
				s = parseInt(file.size / 1048576) + ' MB'				
			}
			if (_this.options.maxSize && _this.options.maxSize < file.size){
				if (_this.options.maxSize < 1024){
					s = _this.options.maxSize + ' Bytes'
				} else if (_this.options.maxSize < 1048576){
					s = parseInt(_this.options.maxSize / 1024) + ' KB'
				} else {
					s = parseInt(_this.options.maxSize/ 1048576) + ' MB'				
				}
				alert(_this.options.maxWarning + ' : ' + file.name + ' > ' + s);
			} else {
				data.context = 'X' + Math.random().toString(36).substring(7);
				if (_this.options.multiple){    
					bts = '<td><button type="button" id="S'+data.context+'" data-inline="true" class="'+_this.options.smallStartClass+'">'+_this.options.startText+'</button></td>' +
						'<td><button type="button" id="R'+data.context+'" data-inline="true" class="'+_this.options.smallRemoveClass+'">'+_this.options.removeText+'</button></td>' +
					'<td	><button type="button" id="C'+data.context+'" data-inline="true" class="'+_this.options.smallCancelClass+'">'+_this.options.cancelText+'</button></td>' 
				} else {
					bts = '<td></td><td></td><td></td>'
				}			

				$('#'+ _this.options.tableId).append('<tr id="'+data.context+'"><td>'+file.name+'</td>' + 
												'<td id="Z'+data.context+'">'+s+'</td>'+
												'<td id="W'+data.context+'"><span class="">'+_this.options.waitingText+'</span></td>'+
												bts +
												 '</tr>' +
												 '<tr id="T'+data.context+'"><td colspan="6"><div id="P'+data.context+'" class="" style="height:10px"></div></td></tr>' 
												 );
				if (_this.options.jQueryButtons){
					var options = '';
					if (_this.options.startIcon){
						options = {icons: {primary: _this.options.startIcon}};
					}			
					$('#S'+data.context).button(options);
					if (_this.options.removeIcon){
						options = {icons: {primary: _this.options.removeIcon}};
					}			
					$('#R'+data.context).button(options);

					if (_this.options.cancelIcon){
						options = {icons: {primary: _this.options.cancelIcon}};
					}			
					$('#C'+data.context).button(options).hide();
				} else {
					$('#C'+data.context).hide();
				}
				$('#S'+data.context).off('click.ul').on('click.ul',function(e){_this.startone(data);});
				$('#R'+data.context).off('click.ul').on('click.ul',function(e){_this.clearone(data);});
				$('#C'+data.context).off('click.ul').on('click.ul',function(e){_this.cancelone(data);});
				
				$('#P'+data.context).progressbar();
				$('#T'+data.context).hide();
				_this.datas[_this.datas.length] = data;
				if (_this.options.autoUpload){
					_this.startone(data);
				}
				_this.waiting += 1;
			}	
		});		
		if(_this.waiting){
			$('#'+this.options.tableId).show();
			if (this.options.autoUpload == false){
				if (this.options.jQueryButtons){
					$('#'+this.options.startId).button().show();
					$('#'+this.options.clearId).button().show();
				} else {
					$('#'+this.options.startId).show();
					$('#'+this.options.clearId).show();
				}				
			} else {
				if (this.options.jQueryButtons){
					$('#'+this.options.cancelId).button().show();
				} else {
					$('#'+this.options.cancelId).show();
				}			
			}				
			this.disableSave();
		}	
	},
//------------------------------------------------------
	disableSave : function() {
		if (this.options.ntform){
			$(this.options.ntform).ntform("disableSave","upload");
		}	
	},	
//------------------------------------------------------
	enableSave : function() {
		if (this.options.ntform){
			$(this.options.ntform).ntform("enableSave","upload");
		}	
	},	
//------------------------------------------------------
	progressall : function(e,data) {
	  if (this.options.multiple){
		  $('#'+this.options.progressId).progressbar('value',parseInt(data.loaded / data.total * 100, 10));	  
		}  
	},	

//------------------------------------------------------
	progress : function(e,data) {	
	  $('#P'+data.context).progressbar('value',parseInt(data.loaded / data.total * 100, 10));
	}
	
	
//------------------------------------------------------
});

$.extend( $.ui.ntupload, {
	version: "@VERSION"
});

})( jQuery );
