(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a3, prop, b2[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/preact/dist/preact.module.js
  function w(n2, l3) {
    for (var u3 in l3) n2[u3] = l3[u3];
    return n2;
  }
  function _(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function g(l3, u3, t3) {
    var i3, r4, o3, e3 = {};
    for (o3 in u3) "key" == o3 ? i3 = u3[o3] : "ref" == o3 ? r4 = u3[o3] : e3[o3] = u3[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i3, r4, null);
  }
  function m(n2, t3, i3, r4, o3) {
    var e3 = { type: n2, props: t3, key: i3, ref: r4, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function C(n2, l3) {
    if (null == l3) return n2.__ ? C(n2.__, n2.__i + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? C(n2) : null;
  }
  function S(n2) {
    var l3, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
      return S(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !P.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(P);
  }
  function P() {
    var n2, u3, t3, r4, o3, f3, c3, s3;
    for (i.sort(e); n2 = i.shift(); ) n2.__d && (u3 = i.length, r4 = void 0, f3 = (o3 = (t3 = n2).__v).__e, c3 = [], s3 = [], t3.__P && ((r4 = w({}, o3)).__v = o3.__v + 1, l.vnode && l.vnode(r4), j(t3.__P, r4, o3, t3.__n, t3.__P.namespaceURI, 32 & o3.__u ? [f3] : null, c3, null == f3 ? C(o3) : f3, !!(32 & o3.__u), s3), r4.__v = o3.__v, r4.__.__k[r4.__i] = r4, z(c3, r4, s3), r4.__e != f3 && S(r4)), i.length > u3 && i.sort(e));
    P.__r = 0;
  }
  function $(n2, l3, u3, t3, i3, r4, o3, e3, f3, c3, s3) {
    var a3, h3, y3, d3, w3, _3, g4 = t3 && t3.__k || v, m3 = l3.length;
    for (f3 = I(u3, l3, g4, f3, m3), a3 = 0; a3 < m3; a3++) null != (y3 = u3.__k[a3]) && (h3 = -1 === y3.__i ? p : g4[y3.__i] || p, y3.__i = a3, _3 = j(n2, y3, h3, i3, r4, o3, e3, f3, c3, s3), d3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && V(h3.ref, null, y3), s3.push(y3.ref, y3.__c || d3, y3)), null == w3 && null != d3 && (w3 = d3), 4 & y3.__u || h3.__k === y3.__k ? f3 = A(y3, f3, n2) : "function" == typeof y3.type && void 0 !== _3 ? f3 = _3 : d3 && (f3 = d3.nextSibling), y3.__u &= -7);
    return u3.__e = w3, f3;
  }
  function I(n2, l3, u3, t3, i3) {
    var r4, o3, e3, f3, c3, s3 = u3.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i3), r4 = 0; r4 < i3; r4++) null != (o3 = l3[r4]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f3 = r4 + h3, (o3 = n2.__k[r4] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : d(o3) ? m(k, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 !== (c3 = o3.__i = L(o3, u3, f3, a3)) && (a3--, (e3 = u3[c3]) && (e3.__u |= 2)), null == e3 || null === e3.__v ? (-1 == c3 && h3--, "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f3 && (c3 == f3 - 1 ? h3-- : c3 == f3 + 1 ? h3++ : (c3 > f3 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r4] = null;
    if (a3) for (r4 = 0; r4 < s3; r4++) null != (e3 = u3[r4]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = C(e3)), q(e3, e3));
    return t3;
  }
  function A(n2, l3, u3) {
    var t3, i3;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i3 = 0; t3 && i3 < t3.length; i3++) t3[i3] && (t3[i3].__ = n2, l3 = A(t3[i3], l3, u3));
      return l3;
    }
    n2.__e != l3 && (l3 && n2.type && !u3.contains(l3) && (l3 = C(n2)), u3.insertBefore(n2.__e, l3 || null), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function H(n2, l3) {
    return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (d(n2) ? n2.some(function(n3) {
      H(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function L(n2, l3, u3, t3) {
    var i3, r4, o3 = n2.key, e3 = n2.type, f3 = l3[u3];
    if (null === f3 || f3 && o3 == f3.key && e3 === f3.type && 0 == (2 & f3.__u)) return u3;
    if (t3 > (null != f3 && 0 == (2 & f3.__u) ? 1 : 0)) for (i3 = u3 - 1, r4 = u3 + 1; i3 >= 0 || r4 < l3.length; ) {
      if (i3 >= 0) {
        if ((f3 = l3[i3]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return i3;
        i3--;
      }
      if (r4 < l3.length) {
        if ((f3 = l3[r4]) && 0 == (2 & f3.__u) && o3 == f3.key && e3 === f3.type) return r4;
        r4++;
      }
    }
    return -1;
  }
  function T(n2, l3, u3) {
    "-" == l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || y.test(l3) ? u3 : u3 + "px";
  }
  function F(n2, l3, u3, t3, i3) {
    var r4;
    n: if ("style" == l3) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u3 && l3 in u3 || T(n2.style, l3, "");
      if (u3) for (l3 in u3) t3 && u3[l3] === t3[l3] || T(n2.style, l3, u3[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r4 = l3 != (l3 = l3.replace(f, "$1")), l3 = l3.toLowerCase() in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r4] = u3, u3 ? t3 ? u3.u = t3.u : (u3.u = c, n2.addEventListener(l3, r4 ? a : s, r4)) : n2.removeEventListener(l3, r4 ? a : s, r4);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u3 ? "" : u3));
    }
  }
  function O(n2) {
    return function(u3) {
      if (this.l) {
        var t3 = this.l[u3.type + n2];
        if (null == u3.t) u3.t = c++;
        else if (u3.t < t3.u) return;
        return t3(l.event ? l.event(u3) : u3);
      }
    };
  }
  function j(n2, u3, t3, i3, r4, o3, e3, f3, c3, s3) {
    var a3, h3, p3, v3, y3, g4, m3, b2, C3, S2, M2, P4, I2, A4, H3, L2, T4, F4 = u3.type;
    if (void 0 !== u3.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f3 = u3.__e = t3.__e]), (a3 = l.__b) && a3(u3);
    n: if ("function" == typeof F4) try {
      if (b2 = u3.props, C3 = "prototype" in F4 && F4.prototype.render, S2 = (a3 = F4.contextType) && i3[a3.__c], M2 = a3 ? S2 ? S2.props.value : a3.__ : i3, t3.__c ? m3 = (h3 = u3.__c = t3.__c).__ = h3.__E : (C3 ? u3.__c = h3 = new F4(b2, M2) : (u3.__c = h3 = new x(b2, M2), h3.constructor = F4, h3.render = B), S2 && S2.sub(h3), h3.props = b2, h3.state || (h3.state = {}), h3.context = M2, h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), C3 && null == h3.__s && (h3.__s = h3.state), C3 && null != F4.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = w({}, h3.__s)), w(h3.__s, F4.getDerivedStateFromProps(b2, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u3, p3) C3 && null == F4.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), C3 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (C3 && null == F4.getDerivedStateFromProps && b2 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b2, M2), !h3.__e && (null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b2, h3.__s, M2) || u3.__v == t3.__v)) {
          for (u3.__v != t3.__v && (h3.props = b2, h3.state = h3.__s, h3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), P4 = 0; P4 < h3._sb.length; P4++) h3.__h.push(h3._sb[P4]);
          h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(b2, h3.__s, M2), C3 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, g4);
        });
      }
      if (h3.context = M2, h3.props = b2, h3.__P = n2, h3.__e = false, I2 = l.__r, A4 = 0, C3) {
        for (h3.state = h3.__s, h3.__d = false, I2 && I2(u3), a3 = h3.render(h3.props, h3.state, h3.context), H3 = 0; H3 < h3._sb.length; H3++) h3.__h.push(h3._sb[H3]);
        h3._sb = [];
      } else do {
        h3.__d = false, I2 && I2(u3), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A4 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i3 = w(w({}, i3), h3.getChildContext())), C3 && !p3 && null != h3.getSnapshotBeforeUpdate && (g4 = h3.getSnapshotBeforeUpdate(v3, y3)), f3 = $(n2, d(L2 = null != a3 && a3.type === k && null == a3.key ? a3.props.children : a3) ? L2 : [L2], u3, t3, i3, r4, o3, e3, f3, c3, s3), h3.base = u3.__e, u3.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u3.__v = null, c3 || null != o3) if (n3.then) {
        for (u3.__u |= c3 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o3[o3.indexOf(f3)] = null, u3.__e = f3;
      } else for (T4 = o3.length; T4--; ) _(o3[T4]);
      else u3.__e = t3.__e, u3.__k = t3.__k;
      l.__e(n3, u3, t3);
    }
    else null == o3 && u3.__v == t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : f3 = u3.__e = N(t3.__e, u3, t3, i3, r4, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(u3), 128 & u3.__u ? void 0 : f3;
  }
  function z(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++) V(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function N(u3, t3, i3, r4, o3, e3, f3, c3, s3) {
    var a3, h3, v3, y3, w3, g4, m3, b2 = i3.props, k3 = t3.props, x3 = t3.type;
    if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((w3 = e3[a3]) && "setAttribute" in w3 == !!x3 && (x3 ? w3.localName == x3 : 3 == w3.nodeType)) {
        u3 = w3, e3[a3] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x3) return document.createTextNode(k3);
      u3 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null === x3) b2 === k3 || c3 && u3.data === k3 || (u3.data = k3);
    else {
      if (e3 = e3 && n.call(u3.childNodes), b2 = i3.props || p, !c3 && null != e3) for (b2 = {}, a3 = 0; a3 < u3.attributes.length; a3++) b2[(w3 = u3.attributes[a3]).name] = w3.value;
      for (a3 in b2) if (w3 = b2[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = w3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        F(u3, a3, null, w3, o3);
      }
      for (a3 in k3) w3 = k3[a3], "children" == a3 ? y3 = w3 : "dangerouslySetInnerHTML" == a3 ? h3 = w3 : "value" == a3 ? g4 = w3 : "checked" == a3 ? m3 = w3 : c3 && "function" != typeof w3 || b2[a3] === w3 || F(u3, a3, w3, b2[a3], o3);
      if (h3) c3 || v3 && (h3.__html === v3.__html || h3.__html === u3.innerHTML) || (u3.innerHTML = h3.__html), t3.__k = [];
      else if (v3 && (u3.innerHTML = ""), $(u3, d(y3) ? y3 : [y3], t3, i3, r4, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f3, e3 ? e3[0] : i3.__k && C(i3, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) _(e3[a3]);
      c3 || (a3 = "value", "progress" == x3 && null == g4 ? u3.removeAttribute("value") : void 0 !== g4 && (g4 !== u3[a3] || "progress" == x3 && !g4 || "option" == x3 && g4 !== b2[a3]) && F(u3, a3, g4, b2[a3], o3), a3 = "checked", void 0 !== m3 && m3 !== u3[a3] && F(u3, a3, m3, b2[a3], o3));
    }
    return u3;
  }
  function V(n2, u3, t3) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function q(n2, u3, t3) {
    var i3, r4;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || V(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r4 = 0; r4 < i3.length; r4++) i3[r4] && q(i3[r4], u3, t3 || "function" != typeof n2.type);
    t3 || _(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function B(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function D(u3, t3, i3) {
    var r4, o3, e3, f3;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u3, t3), o3 = (r4 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f3 = [], j(t3, u3 = (!r4 && i3 || t3).__k = g(k, null, [u3]), o3 || p, p, t3.namespaceURI, !r4 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r4 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r4, f3), z(e3, u3, f3);
  }
  var n, l, u, t, i, r, o, e, f, c, s, a, h, p, v, y, d;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      p = {};
      v = [];
      y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      d = Array.isArray;
      n = v.slice, l = { __e: function(n2, l3, u3, t3) {
        for (var i3, r4, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
          if ((r4 = i3.constructor) && null != r4.getDerivedStateFromError && (i3.setState(r4.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
        } catch (l4) {
          n2 = l4;
        }
        throw n2;
      } }, u = 0, t = function(n2) {
        return null != n2 && null == n2.constructor;
      }, x.prototype.setState = function(n2, l3) {
        var u3;
        u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u3), this.props)), n2 && w(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
      }, x.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
      }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
        return n2.__v.__b - l3.__v.__b;
      }, P.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;
    }
  });

  // node_modules/preact/hooks/dist/hooks.module.js
  function d2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u3.__.length && u3.__.push({}), u3.__[n2];
  }
  function h2(n2) {
    return o2 = 1, p2(D2, n2);
  }
  function p2(n2, u3, i3) {
    var o3 = d2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : D2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r4 = o3.t(t3, n3);
      t3 !== r4 && (o3.__N = [r4, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.u)) {
      var f3 = function(n3, t3, r4) {
        if (!o3.__c.__H) return true;
        var u4 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r4);
        var i4 = o3.__c.props !== n3;
        return u4.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), c3 && c3.call(this, n3, t3, r4) || i4;
      };
      r2.u = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r4) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r4), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r4);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u3) {
    var i3 = d2(t2++, 3);
    !c2.__s && C2(i3.__H, u3) && (i3.__ = n2, i3.i = u3, r2.__H.__h.push(i3));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r4) {
    var u3 = d2(t2++, 7);
    return C2(u3.__H, r4) && (u3.__ = n2(), u3.__H = r4, u3.__h = n2), u3.__;
  }
  function q2(n2, t3) {
    return o2 = 8, T2(function() {
      return n2;
    }, t3);
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], c2.__e(t3, n2.__v);
    }
  }
  function w2(n2) {
    var t3, r4 = function() {
      clearTimeout(u3), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r4, 100);
    k2 && (t3 = requestAnimationFrame(r4));
  }
  function z2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r4) {
      return t4 !== n2[r4];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, s2, k2;
  var init_hooks_module = __esm({
    "node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = l;
      e2 = c2.__b;
      a2 = c2.__r;
      v2 = c2.diffed;
      l2 = c2.__c;
      m2 = c2.unmount;
      s2 = c2.__;
      c2.__b = function(n2) {
        r2 = null, e2 && e2(n2);
      }, c2.__ = function(n2, t3) {
        n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
      }, c2.__r = function(n2) {
        a2 && a2(n2), t2 = 0;
        var i3 = (r2 = n2.__c).__H;
        i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
          n3.__N && (n3.__ = n3.__N), n3.i = n3.__N = void 0;
        })) : (i3.__h.forEach(z2), i3.__h.forEach(B2), i3.__h = [], t2 = 0)), u2 = r2;
      }, c2.diffed = function(n2) {
        v2 && v2(n2);
        var t3 = n2.__c;
        t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
          n3.i && (n3.__H = n3.i), n3.i = void 0;
        })), u2 = r2 = null;
      }, c2.__c = function(n2, t3) {
        t3.some(function(n3) {
          try {
            n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
              return !n4.__ || B2(n4);
            });
          } catch (r4) {
            t3.some(function(n4) {
              n4.__h && (n4.__h = []);
            }), t3 = [], c2.__e(r4, n3.__v);
          }
        }), l2 && l2(n2, t3);
      }, c2.unmount = function(n2) {
        m2 && m2(n2);
        var t3, r4 = n2.__c;
        r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
          try {
            z2(n3);
          } catch (n4) {
            t3 = n4;
          }
        }), r4.__H = void 0, t3 && c2.__e(t3, r4.__v));
      };
      k2 = "function" == typeof requestAnimationFrame;
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/create-class-name.js
  function createClassName(classNames) {
    return classNames.filter(function(className) {
      return className !== null;
    }).join(" ");
  }
  var init_create_class_name = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/create-class-name.js"() {
    }
  });

  // node_modules/preact/compat/dist/compat.module.js
  function g3(n2, t3) {
    for (var e3 in t3) n2[e3] = t3[e3];
    return n2;
  }
  function E2(n2, t3) {
    for (var e3 in n2) if ("__source" !== e3 && !(e3 in t3)) return true;
    for (var r4 in t3) if ("__source" !== r4 && n2[r4] !== t3[r4]) return true;
    return false;
  }
  function N2(n2, t3) {
    this.props = n2, this.context = t3;
  }
  function D3(n2) {
    function t3(t4) {
      var e3 = g3({}, t4);
      return delete e3.ref, n2(e3, t4.ref || null);
    }
    return t3.$$typeof = A3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n2.displayName || n2.name) + ")", t3;
  }
  function V2(n2, t3, e3) {
    return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
      "function" == typeof n3.__c && n3.__c();
    }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
      return V2(n3, t3, e3);
    })), n2;
  }
  function W(n2, t3, e3) {
    return n2 && e3 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
      return W(n3, t3, e3);
    }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e3)), n2;
  }
  function P3() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j3(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__a && t3.__a(n2);
  }
  function B3() {
    this.i = null, this.l = null;
  }
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  var T3, A3, F3, U, H2, q3, G2, J2, K, Q, X, en, cn, ln, fn, an, sn;
  var init_compat_module = __esm({
    "node_modules/preact/compat/dist/compat.module.js"() {
      init_preact_module();
      init_preact_module();
      init_hooks_module();
      init_hooks_module();
      (N2.prototype = new x()).isPureReactComponent = true, N2.prototype.shouldComponentUpdate = function(n2, t3) {
        return E2(this.props, n2) || E2(this.state, t3);
      };
      T3 = l.__b;
      l.__b = function(n2) {
        n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T3 && T3(n2);
      };
      A3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
      F3 = l.__e;
      l.__e = function(n2, t3, e3, r4) {
        if (n2.then) {
          for (var u3, o3 = t3; o3 = o3.__; ) if ((u3 = o3.__c) && u3.__c) return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u3.__c(n2, t3);
        }
        F3(n2, t3, e3, r4);
      };
      U = l.unmount;
      l.unmount = function(n2) {
        var t3 = n2.__c;
        t3 && t3.__R && t3.__R(), t3 && 32 & n2.__u && (n2.type = null), U && U(n2);
      }, (P3.prototype = new x()).__c = function(n2, t3) {
        var e3 = t3.__c, r4 = this;
        null == r4.o && (r4.o = []), r4.o.push(e3);
        var u3 = j3(r4.__v), o3 = false, i3 = function() {
          o3 || (o3 = true, e3.__R = null, u3 ? u3(c3) : c3());
        };
        e3.__R = i3;
        var c3 = function() {
          if (!--r4.__u) {
            if (r4.state.__a) {
              var n3 = r4.state.__a;
              r4.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
            }
            var t4;
            for (r4.setState({ __a: r4.__b = null }); t4 = r4.o.pop(); ) t4.forceUpdate();
          }
        };
        r4.__u++ || 32 & t3.__u || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n2.then(i3, i3);
      }, P3.prototype.componentWillUnmount = function() {
        this.o = [];
      }, P3.prototype.render = function(n2, e3) {
        if (this.__b) {
          if (this.__v.__k) {
            var r4 = document.createElement("div"), o3 = this.__v.__k[0].__c;
            this.__v.__k[0] = V2(this.__b, r4, o3.__O = o3.__P);
          }
          this.__b = null;
        }
        var i3 = e3.__a && g(k, null, n2.fallback);
        return i3 && (i3.__u &= -33), [g(k, null, e3.__a ? null : n2.children), i3];
      };
      H2 = function(n2, t3, e3) {
        if (++e3[1] === e3[0] && n2.l.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e3 = n2.i; e3; ) {
          for (; e3.length > 3; ) e3.pop()();
          if (e3[1] < e3[0]) break;
          n2.i = e3 = e3[2];
        }
      };
      (B3.prototype = new x()).__a = function(n2) {
        var t3 = this, e3 = j3(t3.__v), r4 = t3.l.get(n2);
        return r4[0]++, function(u3) {
          var o3 = function() {
            t3.props.revealOrder ? (r4.push(u3), H2(t3, n2, r4)) : u3();
          };
          e3 ? e3(o3) : o3();
        };
      }, B3.prototype.render = function(n2) {
        this.i = null, this.l = /* @__PURE__ */ new Map();
        var t3 = H(n2.children);
        n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
        for (var e3 = t3.length; e3--; ) this.l.set(t3[e3], this.i = [1, 0, this.i]);
        return n2.children;
      }, B3.prototype.componentDidUpdate = B3.prototype.componentDidMount = function() {
        var n2 = this;
        this.l.forEach(function(t3, e3) {
          H2(n2, e3, t3);
        });
      };
      q3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
      G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
      K = /[A-Z0-9]/g;
      Q = "undefined" != typeof document;
      X = function(n2) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
      };
      x.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
        Object.defineProperty(x.prototype, t3, { configurable: true, get: function() {
          return this["UNSAFE_" + t3];
        }, set: function(n2) {
          Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
        } });
      });
      en = l.event;
      l.event = function(n2) {
        return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
      };
      ln = { enumerable: false, configurable: true, get: function() {
        return this.class;
      } };
      fn = l.vnode;
      l.vnode = function(n2) {
        "string" == typeof n2.type && function(n3) {
          var t3 = n3.props, e3 = n3.type, u3 = {}, o3 = -1 === e3.indexOf("-");
          for (var i3 in t3) {
            var c3 = t3[i3];
            if (!("value" === i3 && "defaultValue" in t3 && null == c3 || Q && "children" === i3 && "noscript" === e3 || "class" === i3 || "className" === i3)) {
              var l3 = i3.toLowerCase();
              "defaultValue" === i3 && "value" in t3 && null == t3.value ? i3 = "value" : "download" === i3 && true === c3 ? c3 = "" : "translate" === l3 && "no" === c3 ? c3 = false : "o" === l3[0] && "n" === l3[1] ? "ondoubleclick" === l3 ? i3 = "ondblclick" : "onchange" !== l3 || "input" !== e3 && "textarea" !== e3 || X(t3.type) ? "onfocus" === l3 ? i3 = "onfocusin" : "onblur" === l3 ? i3 = "onfocusout" : J2.test(i3) && (i3 = l3) : l3 = i3 = "oninput" : o3 && G2.test(i3) ? i3 = i3.replace(K, "-$&").toLowerCase() : null === c3 && (c3 = void 0), "oninput" === l3 && u3[i3 = l3] && (i3 = "oninputCapture"), u3[i3] = c3;
            }
          }
          "select" == e3 && u3.multiple && Array.isArray(u3.value) && (u3.value = H(t3.children).forEach(function(n4) {
            n4.props.selected = -1 != u3.value.indexOf(n4.props.value);
          })), "select" == e3 && null != u3.defaultValue && (u3.value = H(t3.children).forEach(function(n4) {
            n4.props.selected = u3.multiple ? -1 != u3.defaultValue.indexOf(n4.props.value) : u3.defaultValue == n4.props.value;
          })), t3.class && !t3.className ? (u3.class = t3.class, Object.defineProperty(u3, "className", ln)) : (t3.className && !t3.class || t3.class && t3.className) && (u3.class = u3.className = t3.className), n3.props = u3;
        }(n2), n2.$$typeof = q3, fn && fn(n2);
      };
      an = l.__r;
      l.__r = function(n2) {
        an && an(n2), cn = n2.__c;
      };
      sn = l.diffed;
      l.diffed = function(n2) {
        sn && sn(n2);
        var t3 = n2.props, e3 = n2.__e;
        null != e3 && "textarea" === n2.type && "value" in t3 && t3.value !== e3.value && (e3.value = null == t3.value ? "" : t3.value), cn = null;
      };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/create-component.js
  function createComponent(fn2) {
    return D3(fn2);
  }
  var init_create_component = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/create-component.js"() {
      init_compat_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/no-op.js
  function noop() {
  }
  var init_no_op = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/no-op.js"() {
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/ae4e6ff7-9fb3-4c25-bff9-f4f408b56235/icon.module.js
  var icon_module_default;
  var init_icon_module = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/ae4e6ff7-9fb3-4c25-bff9-f4f408b56235/icon.module.js"() {
      if (document.getElementById("44cd31a4bb") === null) {
        const element = document.createElement("style");
        element.id = "44cd31a4bb";
        element.textContent = `._icon_13804_1 {
  fill: currentColor;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvaWNvbnMvaWNvbi5tb2R1bGUuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0FBQ3BCIiwiZmlsZSI6Im5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvaWNvbnMvaWNvbi5tb2R1bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmljb24ge1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG59XG4iXX0= */`;
        document.head.append(element);
      }
      icon_module_default = { "icon": "_icon_13804_1" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/icons/create-icon.js
  function createIcon(path, options) {
    const { width, height } = options;
    return createComponent(function(_a) {
      var _b = _a, { color } = _b, rest = __objRest(_b, ["color"]);
      return g(
        "svg",
        __spreadProps(__spreadValues({}, rest), { class: icon_module_default.icon, height, style: {
          fill: typeof color === "undefined" ? "currentColor" : `var(--figma-color-icon-${color})`
        }, width, xmlns: "http://www.w3.org/2000/svg" }),
        g("path", { "clip-rule": "evenodd", d: path, "fill-rule": "evenodd" })
      );
    });
  }
  var init_create_icon = __esm({
    "node_modules/@create-figma-plugin/ui/lib/icons/create-icon.js"() {
      init_preact_module();
      init_create_component();
      init_icon_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/get-current-from-ref.js
  function getCurrentFromRef(ref) {
    if (ref.current === null) {
      throw new Error("`ref.current` is `undefined`");
    }
    return ref.current;
  }
  var init_get_current_from_ref = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/get-current-from-ref.js"() {
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/icons/icon-32/icon-cross-32.js
  var IconCross32;
  var init_icon_cross_32 = __esm({
    "node_modules/@create-figma-plugin/ui/lib/icons/icon-32/icon-cross-32.js"() {
      init_create_icon();
      IconCross32 = createIcon("m16 15.293 4.6465-4.6464.7071.7071-4.6465 4.6464 4.6465 4.6465-.7071.7071L16 16.7073l-4.6464 4.6464-.7071-.7071 4.6464-4.6465-4.6464-4.6463.7071-.7071z", { height: 32, width: 32 });
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/icons/icon-32/icon-search-32.js
  var IconSearch32;
  var init_icon_search_32 = __esm({
    "node_modules/@create-figma-plugin/ui/lib/icons/icon-32/icon-search-32.js"() {
      init_create_icon();
      IconSearch32 = createIcon("M19.1034 15.0517c0 1.9616-1.5901 3.5517-3.5517 3.5517-1.9615 0-3.5517-1.5901-3.5517-3.5517 0-1.9615 1.5902-3.5517 3.5517-3.5517 1.9616 0 3.5517 1.5902 3.5517 3.5517m-.7062 3.5529c-.7793.625-1.7687.9988-2.8455.9988-2.5138 0-4.5517-2.0378-4.5517-4.5517 0-2.5138 2.0379-4.5517 4.5517-4.5517 2.5139 0 4.5517 2.0379 4.5517 4.5517 0 1.0769-.3739 2.0664-.999 2.8458l3.2491 3.2492-.7071.7071z", { height: 32, width: 32 });
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/faea3451-ebf3-4f2a-b18a-1ee6ce6d4141/search-textbox.module.js
  var search_textbox_module_default;
  var init_search_textbox_module = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/faea3451-ebf3-4f2a-b18a-1ee6ce6d4141/search-textbox.module.js"() {
      if (document.getElementById("c51b28009c") === null) {
        const element = document.createElement("style");
        element.id = "c51b28009c";
        element.textContent = `._searchTextbox_1ynmc_1 {
  position: relative;
  z-index: var(--z-index-1);
  display: flex;
  align-items: center;
}
/* .disabled {
  opacity: var(--opacity-30);
} */

._input_1ynmc_11 {
  width: 100%;
  height: 40px;
  flex-grow: 1;
  padding-left: 36px;
  background-color: transparent;
  color: var(--figma-color-text);
}
._disabled_1ynmc_7 ._input_1ynmc_11 {
  color: var(--figma-color-text-disabled);
  cursor: not-allowed;
}
._input_1ynmc_11::placeholder {
  color: var(--figma-color-text-tertiary);
}

._searchIcon_1ynmc_27 {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  padding: 4px;
  color: var(--figma-color-icon);
  pointer-events: none; /* so that clicking the icon focuses the textbox */
}
._disabled_1ynmc_7 ._searchIcon_1ynmc_27 {
  color: var(--figma-color-icon-disabled);
}

._clearButton_1ynmc_41 {
  height: 40px;
  flex: 0 0 40px;
  padding: 4px;
  color: var(--figma-color-icon-secondary);
}
._searchTextbox_1ynmc_1:not(._disabled_1ynmc_7) ._clearButton_1ynmc_41:hover {
  color: var(--figma-color-icon);
}
._searchTextbox_1ynmc_1:not(._disabled_1ynmc_7) ._clearButton_1ynmc_41:focus {
  color: var(--figma-color-icon);
  outline: 0;
}
._disabled_1ynmc_7 ._clearButton_1ynmc_41 {
  color: var(--figma-color-icon-disabled);
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy9zZWFyY2gtdGV4dGJveC9zZWFyY2gtdGV4dGJveC5tb2R1bGUuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCO0FBQ0E7O0dBRUc7O0FBRUg7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsNkJBQTZCO0VBQzdCLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UsdUNBQXVDO0VBQ3ZDLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0VBQ1osOEJBQThCO0VBQzlCLG9CQUFvQixFQUFFLGtEQUFrRDtBQUMxRTtBQUNBO0VBQ0UsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxZQUFZO0VBQ1osd0NBQXdDO0FBQzFDO0FBQ0E7RUFDRSw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLDhCQUE4QjtFQUM5QixVQUFVO0FBQ1o7QUFDQTtFQUNFLHVDQUF1QztBQUN6QyIsImZpbGUiOiJub2RlX21vZHVsZXMvQGNyZWF0ZS1maWdtYS1wbHVnaW4vdWkvbGliL2NvbXBvbmVudHMvc2VhcmNoLXRleHRib3gvc2VhcmNoLXRleHRib3gubW9kdWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZWFyY2hUZXh0Ym94IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiB2YXIoLS16LWluZGV4LTEpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLyogLmRpc2FibGVkIHtcbiAgb3BhY2l0eTogdmFyKC0tb3BhY2l0eS0zMCk7XG59ICovXG5cbi5pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQwcHg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgcGFkZGluZy1sZWZ0OiAzNnB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLXRleHQpO1xufVxuLmRpc2FibGVkIC5pbnB1dCB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0LWRpc2FibGVkKTtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cbi5pbnB1dDo6cGxhY2Vob2xkZXIge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC10ZXJ0aWFyeSk7XG59XG5cbi5zZWFyY2hJY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIHBhZGRpbmc6IDRweDtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWljb24pO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTsgLyogc28gdGhhdCBjbGlja2luZyB0aGUgaWNvbiBmb2N1c2VzIHRoZSB0ZXh0Ym94ICovXG59XG4uZGlzYWJsZWQgLnNlYXJjaEljb24ge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItaWNvbi1kaXNhYmxlZCk7XG59XG5cbi5jbGVhckJ1dHRvbiB7XG4gIGhlaWdodDogNDBweDtcbiAgZmxleDogMCAwIDQwcHg7XG4gIHBhZGRpbmc6IDRweDtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWljb24tc2Vjb25kYXJ5KTtcbn1cbi5zZWFyY2hUZXh0Ym94Om5vdCguZGlzYWJsZWQpIC5jbGVhckJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1pY29uKTtcbn1cbi5zZWFyY2hUZXh0Ym94Om5vdCguZGlzYWJsZWQpIC5jbGVhckJ1dHRvbjpmb2N1cyB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1pY29uKTtcbiAgb3V0bGluZTogMDtcbn1cbi5kaXNhYmxlZCAuY2xlYXJCdXR0b24ge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItaWNvbi1kaXNhYmxlZCk7XG59XG4iXX0= */`;
        document.head.append(element);
      }
      search_textbox_module_default = { "searchTextbox": "_searchTextbox_1ynmc_1", "input": "_input_1ynmc_11", "disabled": "_disabled_1ynmc_7", "searchIcon": "_searchIcon_1ynmc_27", "clearButton": "_clearButton_1ynmc_41" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/search-textbox/search-textbox.js
  var EMPTY_STRING, SearchTextbox;
  var init_search_textbox = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/search-textbox/search-textbox.js"() {
      init_preact_module();
      init_hooks_module();
      init_icon_cross_32();
      init_icon_search_32();
      init_create_class_name();
      init_create_component();
      init_get_current_from_ref();
      init_no_op();
      init_search_textbox_module();
      EMPTY_STRING = "";
      SearchTextbox = createComponent(function(_a, ref) {
        var _b = _a, { clearOnEscapeKeyDown = false, disabled = false, onFocus = noop, onInput = noop, onKeyDown = noop, onValueInput = noop, placeholder, propagateEscapeKeyDown = true, spellCheck = false, value } = _b, rest = __objRest(_b, ["clearOnEscapeKeyDown", "disabled", "onFocus", "onInput", "onKeyDown", "onValueInput", "placeholder", "propagateEscapeKeyDown", "spellCheck", "value"]);
        const inputElementRef = A2(null);
        const handleClearButtonClick = q2(function() {
          const inputElement = getCurrentFromRef(inputElementRef);
          inputElement.value = EMPTY_STRING;
          const inputEvent = new window.Event("input", {
            bubbles: true,
            cancelable: true
          });
          inputElement.dispatchEvent(inputEvent);
          inputElement.focus();
        }, []);
        const handleFocus = q2(function(event) {
          onFocus(event);
          event.currentTarget.select();
        }, [onFocus]);
        const handleInput = q2(function(event) {
          onInput(event);
          const value2 = event.currentTarget.value;
          onValueInput(value2);
        }, [onInput, onValueInput]);
        const handleKeyDown = q2(function(event) {
          onKeyDown(event);
          if (event.key === "Escape") {
            if (clearOnEscapeKeyDown === true && value !== EMPTY_STRING) {
              event.stopPropagation();
              handleClearButtonClick();
              return;
            }
            if (propagateEscapeKeyDown === false) {
              event.stopPropagation();
            }
            event.currentTarget.blur();
          }
        }, [
          clearOnEscapeKeyDown,
          handleClearButtonClick,
          onKeyDown,
          propagateEscapeKeyDown,
          value
        ]);
        const refCallback = q2(function(inputElement) {
          inputElementRef.current = inputElement;
          if (ref === null) {
            return;
          }
          if (typeof ref === "function") {
            ref(inputElement);
            return;
          }
          ref.current = inputElement;
        }, [ref]);
        return g(
          "div",
          { class: createClassName([
            search_textbox_module_default.searchTextbox,
            disabled === true ? search_textbox_module_default.disabled : null
          ]) },
          g("input", __spreadProps(__spreadValues({}, rest), { ref: refCallback, class: search_textbox_module_default.input, disabled: disabled === true, onFocus: handleFocus, onInput: handleInput, onKeyDown: handleKeyDown, placeholder, spellcheck: spellCheck, tabIndex: 0, type: "text", value })),
          g(
            "div",
            { class: search_textbox_module_default.searchIcon },
            g(IconSearch32, null)
          ),
          value === EMPTY_STRING || disabled === true ? null : g(
            "button",
            { class: search_textbox_module_default.clearButton, onClick: handleClearButtonClick, tabIndex: 0 },
            g(IconCross32, null)
          )
        );
      });
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/events.js
  function on2(name, handler) {
    const id = `${currentId}`;
    currentId += 1;
    eventHandlers[id] = { handler, name };
    return function() {
      delete eventHandlers[id];
    };
  }
  function invokeEventHandler(name, args) {
    let invoked = false;
    for (const id in eventHandlers) {
      if (eventHandlers[id].name === name) {
        eventHandlers[id].handler.apply(null, args);
        invoked = true;
      }
    }
    if (invoked === false) {
      throw new Error(`No event handler with name \`${name}\``);
    }
  }
  var eventHandlers, currentId, emit;
  var init_events = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
      eventHandlers = {};
      currentId = 0;
      emit = typeof window === "undefined" ? function(name, ...args) {
        figma.ui.postMessage([name, ...args]);
      } : function(name, ...args) {
        window.parent.postMessage({
          pluginMessage: [name, ...args]
        }, "*");
      };
      if (typeof window === "undefined") {
        figma.ui.onmessage = function(args) {
          if (!Array.isArray(args)) {
            return;
          }
          const [name, ...rest] = args;
          if (typeof name !== "string") {
            return;
          }
          invokeEventHandler(name, rest);
        };
      } else {
        window.onmessage = function(event) {
          if (typeof event.data.pluginMessage === "undefined") {
            return;
          }
          const args = event.data.pluginMessage;
          if (!Array.isArray(args)) {
            return;
          }
          const [name, ...rest] = event.data.pluginMessage;
          if (typeof name !== "string") {
            return;
          }
          invokeEventHandler(name, rest);
        };
      }
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/mixed-values.js
  var MIXED_STRING;
  var init_mixed_values = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/mixed-values.js"() {
      MIXED_STRING = "999999999999999";
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
      init_events();
      init_mixed_values();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/textbox/private/is-keycode-character-generating.js
  function isKeyCodeCharacterGenerating(keyCode) {
    return keyCode === 32 || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 105 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222;
  }
  var init_is_keycode_character_generating = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/textbox/private/is-keycode-character-generating.js"() {
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox/private/raw-textbox.js
  var EMPTY_STRING2, RawTextbox;
  var init_raw_textbox = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox/private/raw-textbox.js"() {
      init_lib();
      init_preact_module();
      init_hooks_module();
      init_create_component();
      init_get_current_from_ref();
      init_no_op();
      init_is_keycode_character_generating();
      EMPTY_STRING2 = "";
      RawTextbox = createComponent(function(_a, ref) {
        var _b = _a, { disabled = false, onBlur = noop, onFocus = noop, onInput = noop, onKeyDown = noop, onMouseDown = noop, onValueInput = noop, password = false, placeholder, propagateEscapeKeyDown = true, revertOnEscapeKeyDown = false, spellCheck = false, validateOnBlur, value } = _b, rest = __objRest(_b, ["disabled", "onBlur", "onFocus", "onInput", "onKeyDown", "onMouseDown", "onValueInput", "password", "placeholder", "propagateEscapeKeyDown", "revertOnEscapeKeyDown", "spellCheck", "validateOnBlur", "value"]);
        const inputElementRef = A2(null);
        const [originalValue, setOriginalValue] = h2(EMPTY_STRING2);
        const setTextboxValue = q2(function(value2) {
          const inputElement = getCurrentFromRef(inputElementRef);
          inputElement.value = value2;
          const inputEvent = new window.Event("input", {
            bubbles: true,
            cancelable: true
          });
          inputElement.dispatchEvent(inputEvent);
        }, []);
        const handleBlur = q2(function(event) {
          onBlur(event);
          if (typeof validateOnBlur !== "undefined") {
            const result = validateOnBlur(value);
            if (typeof result === "string") {
              setTextboxValue(result);
              setOriginalValue(EMPTY_STRING2);
              return;
            }
            if (result === false) {
              if (value !== originalValue) {
                setTextboxValue(originalValue);
              }
              setOriginalValue(EMPTY_STRING2);
              return;
            }
          }
          setOriginalValue(EMPTY_STRING2);
        }, [onBlur, originalValue, setTextboxValue, validateOnBlur, value]);
        const handleFocus = q2(function(event) {
          onFocus(event);
          setOriginalValue(value);
          event.currentTarget.select();
        }, [onFocus, value]);
        const handleInput = q2(function(event) {
          onInput(event);
          const newValue = event.currentTarget.value;
          onValueInput(newValue);
        }, [onInput, onValueInput]);
        const handleKeyDown = q2(function(event) {
          onKeyDown(event);
          if (event.key === "Escape") {
            if (revertOnEscapeKeyDown === true) {
              setTextboxValue(originalValue);
              setOriginalValue(EMPTY_STRING2);
            }
            if (propagateEscapeKeyDown === false) {
              event.stopPropagation();
            }
            event.currentTarget.blur();
            return;
          }
          if (value === MIXED_STRING && isKeyCodeCharacterGenerating(event.keyCode) === false) {
            event.preventDefault();
            event.currentTarget.select();
          }
        }, [
          onKeyDown,
          originalValue,
          propagateEscapeKeyDown,
          revertOnEscapeKeyDown,
          setTextboxValue,
          value
        ]);
        const handleMouseDown = q2(function(event) {
          onMouseDown(event);
          if (value === MIXED_STRING) {
            event.preventDefault();
            event.currentTarget.select();
          }
        }, [onMouseDown, value]);
        const refCallback = q2(function(inputElement) {
          inputElementRef.current = inputElement;
          if (ref === null) {
            return;
          }
          if (typeof ref === "function") {
            ref(inputElement);
            return;
          }
          ref.current = inputElement;
        }, [ref]);
        return g("input", __spreadProps(__spreadValues({}, rest), { ref: refCallback, disabled: disabled === true, onBlur: handleBlur, onFocus: handleFocus, onInput: handleInput, onKeyDown: handleKeyDown, onMouseDown: handleMouseDown, placeholder, spellcheck: spellCheck, tabIndex: 0, type: password === true ? "password" : "text", value: value === MIXED_STRING ? "Mixed" : value }));
      });
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/505efe92-2424-4cdf-b470-e172378bf966/textbox.module.js
  var textbox_module_default;
  var init_textbox_module = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/505efe92-2424-4cdf-b470-e172378bf966/textbox.module.js"() {
      if (document.getElementById("574dc931b3") === null) {
        const element = document.createElement("style");
        element.id = "574dc931b3";
        element.textContent = `._textbox_sir3b_1 {
  position: relative;
  z-index: var(--z-index-1);
}
._textbox_sir3b_1:focus-within {
  z-index: var(--z-index-2); /* Stack \`.textbox\` over its sibling elements */
}

._input_sir3b_9 {
  display: block;
  width: 100%;
  height: 28px;
  padding: 0 var(--space-extra-small);
  background-color: transparent;
  color: var(--figma-color-text);
}
._disabled_sir3b_17 ._input_sir3b_9 {
  color: var(--figma-color-text-disabled);
  cursor: not-allowed;
}
._hasIcon_sir3b_21 ._input_sir3b_9 {
  padding-left: 32px;
}

._input_sir3b_9::placeholder {
  color: var(--figma-color-text-tertiary);
}

._icon_sir3b_29 {
  position: absolute;
  top: 14px;
  left: 16px;
  color: var(--figma-color-icon-secondary);
  pointer-events: none; /* so that clicking the icon focuses the textbox */
  text-align: center;
  transform: translate(-50%, -50%);
}
._textbox_sir3b_1:not(._disabled_sir3b_17) ._input_sir3b_9:focus ~ ._icon_sir3b_29 {
  color: var(--figma-color-icon-brand);
}
._disabled_sir3b_17 ._icon_sir3b_29 {
  color: var(--figma-color-icon-disabled);
}

._icon_sir3b_29 svg {
  fill: currentColor;
}

._border_sir3b_49 {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: var(--border-radius-2);
  pointer-events: none;
}
._hasBorder_sir3b_59 ._border_sir3b_49,
._textbox_sir3b_1:not(._disabled_sir3b_17):hover ._border_sir3b_49 {
  border-color: var(--figma-color-border);
}
._textbox_sir3b_1:not(._disabled_sir3b_17) ._input_sir3b_9:focus ~ ._border_sir3b_49 {
  top: -1px;
  bottom: -1px;
  border-width: 2px;
  border-color: var(--figma-color-border-brand-strong);
}

._underline_sir3b_70 {
  position: absolute;
  right: var(--space-extra-small);
  bottom: 0;
  left: var(--space-extra-small);
  height: 1px;
  background-color: var(--figma-color-border);
}
._textbox_sir3b_1:not(._disabled_sir3b_17) ._input_sir3b_9:focus ~ ._underline_sir3b_70,
._textbox_sir3b_1:not(._disabled_sir3b_17):hover ._underline_sir3b_70 {
  background-color: transparent;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy90ZXh0Ym94L3RleHRib3gvdGV4dGJveC5tb2R1bGUuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UseUJBQXlCLEVBQUUsK0NBQStDO0FBQzVFOztBQUVBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUNBQW1DO0VBQ25DLDZCQUE2QjtFQUM3Qiw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLHVDQUF1QztFQUN2QyxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsVUFBVTtFQUNWLHdDQUF3QztFQUN4QyxvQkFBb0IsRUFBRSxrREFBa0Q7RUFDeEUsa0JBQWtCO0VBQ2xCLGdDQUFnQztBQUNsQztBQUNBO0VBQ0Usb0NBQW9DO0FBQ3RDO0FBQ0E7RUFDRSx1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFFBQVE7RUFDUixTQUFTO0VBQ1QsT0FBTztFQUNQLDZCQUE2QjtFQUM3QixxQ0FBcUM7RUFDckMsb0JBQW9CO0FBQ3RCO0FBQ0E7O0VBRUUsdUNBQXVDO0FBQ3pDO0FBQ0E7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixvREFBb0Q7QUFDdEQ7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsK0JBQStCO0VBQy9CLFNBQVM7RUFDVCw4QkFBOEI7RUFDOUIsV0FBVztFQUNYLDJDQUEyQztBQUM3QztBQUNBOztFQUVFLDZCQUE2QjtBQUMvQiIsImZpbGUiOiJub2RlX21vZHVsZXMvQGNyZWF0ZS1maWdtYS1wbHVnaW4vdWkvbGliL2NvbXBvbmVudHMvdGV4dGJveC90ZXh0Ym94L3RleHRib3gubW9kdWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50ZXh0Ym94IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiB2YXIoLS16LWluZGV4LTEpO1xufVxuLnRleHRib3g6Zm9jdXMtd2l0aGluIHtcbiAgei1pbmRleDogdmFyKC0tei1pbmRleC0yKTsgLyogU3RhY2sgYC50ZXh0Ym94YCBvdmVyIGl0cyBzaWJsaW5nIGVsZW1lbnRzICovXG59XG5cbi5pbnB1dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyOHB4O1xuICBwYWRkaW5nOiAwIHZhcigtLXNwYWNlLWV4dHJhLXNtYWxsKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0KTtcbn1cbi5kaXNhYmxlZCAuaW5wdXQge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kaXNhYmxlZCk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG4uaGFzSWNvbiAuaW5wdXQge1xuICBwYWRkaW5nLWxlZnQ6IDMycHg7XG59XG5cbi5pbnB1dDo6cGxhY2Vob2xkZXIge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC10ZXJ0aWFyeSk7XG59XG5cbi5pY29uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE0cHg7XG4gIGxlZnQ6IDE2cHg7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1pY29uLXNlY29uZGFyeSk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyAvKiBzbyB0aGF0IGNsaWNraW5nIHRoZSBpY29uIGZvY3VzZXMgdGhlIHRleHRib3ggKi9cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbn1cbi50ZXh0Ym94Om5vdCguZGlzYWJsZWQpIC5pbnB1dDpmb2N1cyB+IC5pY29uIHtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWljb24tYnJhbmQpO1xufVxuLmRpc2FibGVkIC5pY29uIHtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWljb24tZGlzYWJsZWQpO1xufVxuXG4uaWNvbiBzdmcge1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG59XG5cbi5ib3JkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMtMik7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhc0JvcmRlciAuYm9yZGVyLFxuLnRleHRib3g6bm90KC5kaXNhYmxlZCk6aG92ZXIgLmJvcmRlciB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyKTtcbn1cbi50ZXh0Ym94Om5vdCguZGlzYWJsZWQpIC5pbnB1dDpmb2N1cyB+IC5ib3JkZXIge1xuICB0b3A6IC0xcHg7XG4gIGJvdHRvbTogLTFweDtcbiAgYm9yZGVyLXdpZHRoOiAycHg7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWJyYW5kLXN0cm9uZyk7XG59XG5cbi51bmRlcmxpbmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiB2YXIoLS1zcGFjZS1leHRyYS1zbWFsbCk7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogdmFyKC0tc3BhY2UtZXh0cmEtc21hbGwpO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyKTtcbn1cbi50ZXh0Ym94Om5vdCguZGlzYWJsZWQpIC5pbnB1dDpmb2N1cyB+IC51bmRlcmxpbmUsXG4udGV4dGJveDpub3QoLmRpc2FibGVkKTpob3ZlciAudW5kZXJsaW5lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4iXX0= */`;
        document.head.append(element);
      }
      textbox_module_default = { "textbox": "_textbox_sir3b_1", "input": "_input_sir3b_9", "disabled": "_disabled_sir3b_17", "hasIcon": "_hasIcon_sir3b_21", "icon": "_icon_sir3b_29", "border": "_border_sir3b_49", "hasBorder": "_hasBorder_sir3b_59", "underline": "_underline_sir3b_70" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox/textbox.js
  var Textbox;
  var init_textbox = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox/textbox.js"() {
      init_preact_module();
      init_create_class_name();
      init_create_component();
      init_raw_textbox();
      init_textbox_module();
      Textbox = createComponent(function(_a, ref) {
        var _b = _a, { icon, variant } = _b, rest = __objRest(_b, ["icon", "variant"]);
        if (typeof icon === "string" && icon.length !== 1) {
          throw new Error(`String \`icon\` must be a single character: ${icon}`);
        }
        return g(
          "div",
          { class: createClassName([
            textbox_module_default.textbox,
            variant === "border" ? textbox_module_default.hasBorder : null,
            typeof icon === "undefined" ? null : textbox_module_default.hasIcon,
            rest.disabled === true ? textbox_module_default.disabled : null
          ]) },
          g(RawTextbox, __spreadProps(__spreadValues({}, rest), { ref, class: textbox_module_default.input })),
          typeof icon === "undefined" ? null : g("div", { class: textbox_module_default.icon }, icon),
          g("div", { class: textbox_module_default.border }),
          variant === "underline" ? g("div", { class: textbox_module_default.underline }) : null
        );
      });
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/c2f0a34c-ed4c-4876-b092-72fe5c0af78f/base.js
  var init_base = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/c2f0a34c-ed4c-4876-b092-72fe5c0af78f/base.js"() {
      if (document.getElementById("1b9108f9bd") === null) {
        const element = document.createElement("style");
        element.id = "1b9108f9bd";
        element.textContent = `:root {
  --border-1: 1px;
  --border-radius-2: 2px;
  --border-radius-6: 6px;
  --box-shadow: var(--box-shadow-menu);
  --box-shadow-menu: 0 5px 17px rgba(0, 0, 0, 0.2),
    0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000000,
    0 0 0 0.5px rgba(0, 0, 0, 0.1);
  --box-shadow-modal: 0 2px 14px rgba(0, 0, 0, 0.15),
    0 0 0 0.5px rgba(0, 0, 0, 0.2);
  --font-family: 'Inter', 'Helvetica', sans-serif;
  --font-family-code: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  --font-size-11: 11px;
  --font-size-12: 12px;
  --font-weight-regular: 400;
  --font-weight-bold: 600;
  --line-height-16: 16px;
  --opacity-30: 0.3;
  --space-extra-small: 8px;
  --space-small: 12px;
  --space-medium: 16px;
  --space-large: 20px;
  --space-extra-large: 24px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --z-index-1: 1;
  --z-index-2: 2;
}

.figma-dark {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

body {
  margin: 0;
  background-color: var(--figma-color-bg);
  color: var(--figma-color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-11);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-16);
}

div,
span {
  cursor: default;
  user-select: none;
}

h1,
h2,
h3 {
  margin: 0;
  font-weight: inherit;
}

button {
  padding: 0;
  border: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font: inherit;
  outline: 0;
}

hr {
  border: 0;
  margin: 0;
}

label {
  display: block;
}

input,
textarea {
  padding: 0;
  border: 0;
  margin: 0;
  -webkit-appearance: none;
  cursor: default;
  font: inherit;
  outline: 0;
}

svg {
  display: block;
}

::selection {
  background-color: var(--figma-color-bg-onselected);
}
`;
        document.head.prepend(element);
      }
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/render.js
  function render(Plugin2) {
    return function(rootNode2, props) {
      D(g(Plugin2, __spreadValues({}, props)), rootNode2);
    };
  }
  var init_render = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/render.js"() {
      init_base();
      init_preact_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/index.js
  var init_lib2 = __esm({
    "node_modules/@create-figma-plugin/ui/lib/index.js"() {
      init_search_textbox();
      init_textbox();
      init_render();
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/5d8c1ea4-8929-4ca9-a6ab-859a428c268b/output.js
  var init_output = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/5d8c1ea4-8929-4ca9-a6ab-859a428c268b/output.js"() {
      if (document.getElementById("7da87ebefd") === null) {
        const element = document.createElement("style");
        element.id = "7da87ebefd";
        element.textContent = `*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  -o-tab-size: 4;
     tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
  -webkit-tap-highlight-color: transparent;
  /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-feature-settings: normal;
  /* 2 */
  font-variation-settings: normal;
  /* 3 */
  font-size: 1em;
  /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  letter-spacing: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}

.visible {
  visibility: visible;
}

.fixed {
  position: fixed;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.inset-0 {
  inset: 0px;
}

.right-0 {
  right: 0px;
}

.top-full {
  top: 100%;
}

.z-10 {
  z-index: 10;
}

.z-50 {
  z-index: 50;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-4 {
  margin-left: 1rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.block {
  display: block;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.grid {
  display: grid;
}

.h-4 {
  height: 1rem;
}

.h-6 {
  height: 1.5rem;
}

.h-7 {
  height: 1.75rem;
}

.h-\\[32px\\] {
  height: 32px;
}

.h-screen {
  height: 100vh;
}

.max-h-\\[60vh\\] {
  max-height: 60vh;
}

.max-h-\\[70vh\\] {
  max-height: 70vh;
}

.w-4 {
  width: 1rem;
}

.w-6 {
  width: 1.5rem;
}

.w-\\[300px\\] {
  width: 300px;
}

.w-\\[32px\\] {
  width: 32px;
}

.w-full {
  width: 100%;
}

.min-w-\\[120px\\] {
  min-width: 120px;
}

.min-w-\\[160px\\] {
  min-width: 160px;
}

.min-w-\\[80px\\] {
  min-width: 80px;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-none {
  flex: none;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.flex-grow {
  flex-grow: 1;
}

.grow {
  flex-grow: 1;
}

.scale-50 {
  --tw-scale-x: .5;
  --tw-scale-y: .5;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.scale-\\[0\\.5\\] {
  --tw-scale-x: 0.5;
  --tw-scale-y: 0.5;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.resize {
  resize: both;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-start {
  align-items: flex-start;
}

.items-center {
  align-items: center;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.overflow-hidden {
  overflow: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.whitespace-pre {
  white-space: pre;
}

.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.border {
  border-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-\\[\\#333\\] {
  --tw-border-opacity: 1;
  border-color: rgb(51 51 51 / var(--tw-border-opacity, 1));
}

.border-\\[var\\(--figma-color-border\\)\\] {
  border-color: var(--figma-color-border);
}

.bg-\\[\\#1e1e1e\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(30 30 30 / var(--tw-bg-opacity, 1));
}

.bg-\\[var\\(--figma-color-bg\\)\\] {
  background-color: var(--figma-color-bg);
}

.bg-\\[var\\(--figma-color-bg-brand\\)\\] {
  background-color: var(--figma-color-bg-brand);
}

.bg-\\[var\\(--figma-color-bg-danger\\)\\] {
  background-color: var(--figma-color-bg-danger);
}

.bg-\\[var\\(--figma-color-bg-secondary\\)\\] {
  background-color: var(--figma-color-bg-secondary);
}

.bg-\\[var\\(--figma-color-bg-success\\)\\] {
  background-color: var(--figma-color-bg-success);
}

.bg-\\[var\\(--figma-color-bg-warning\\)\\] {
  background-color: var(--figma-color-bg-warning);
}

.bg-black\\/50 {
  background-color: rgb(0 0 0 / 0.5);
}

.p-0\\.5 {
  padding: 0.125rem;
}

.p-1 {
  padding: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}

.p-3 {
  padding: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.px-1\\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}

.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.pt-2 {
  padding-top: 0.5rem;
}

.pt-4 {
  padding-top: 1rem;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-bold {
  font-weight: 700;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

.uppercase {
  text-transform: uppercase;
}

.tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}

.leading-none {
  line-height: 1;
}

.text-\\[\\#666\\] {
  --tw-text-opacity: 1;
  color: rgb(102 102 102 / var(--tw-text-opacity, 1));
}

.text-\\[\\#6a8759\\] {
  --tw-text-opacity: 1;
  color: rgb(106 135 89 / var(--tw-text-opacity, 1));
}

.text-\\[\\#9b703f\\] {
  --tw-text-opacity: 1;
  color: rgb(155 112 63 / var(--tw-text-opacity, 1));
}

.text-\\[\\#cc7832\\] {
  --tw-text-opacity: 1;
  color: rgb(204 120 50 / var(--tw-text-opacity, 1));
}

.text-\\[\\#e6e6e6\\] {
  --tw-text-opacity: 1;
  color: rgb(230 230 230 / var(--tw-text-opacity, 1));
}

.text-\\[\\#f39c12\\] {
  --tw-text-opacity: 1;
  color: rgb(243 156 18 / var(--tw-text-opacity, 1));
}

.text-\\[var\\(--figma-color-text\\)\\] {
  color: var(--figma-color-text);
}

.text-\\[var\\(--figma-color-text-danger\\)\\] {
  color: var(--figma-color-text-danger);
}

.text-\\[var\\(--figma-color-text-onbrand\\)\\] {
  color: var(--figma-color-text-onbrand);
}

.text-\\[var\\(--figma-color-text-secondary\\)\\] {
  color: var(--figma-color-text-secondary);
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.text-\\[var\\(--figma-color-text-brand\\)\\] {
  color: var(--figma-color-text-brand);
}

.opacity-50 {
  opacity: 0.5;
}

.shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\\:bg-\\[var\\(--figma-color-bg-brand-hover\\)\\]:hover {
  background-color: var(--figma-color-bg-brand-hover);
}

.hover\\:bg-\\[var\\(--figma-color-bg-danger\\)\\]:hover {
  background-color: var(--figma-color-bg-danger);
}

.hover\\:bg-\\[var\\(--figma-color-bg-danger-hover\\)\\]:hover {
  background-color: var(--figma-color-bg-danger-hover);
}

.hover\\:bg-\\[var\\(--figma-color-bg-danger-secondary\\)\\]:hover {
  background-color: var(--figma-color-bg-danger-secondary);
}

.hover\\:bg-\\[var\\(--figma-color-bg-hover\\)\\]:hover {
  background-color: var(--figma-color-bg-hover);
}

.hover\\:bg-\\[var\\(--figma-color-bg-success-hover\\)\\]:hover {
  background-color: var(--figma-color-bg-success-hover);
}

.hover\\:bg-\\[var\\(--figma-color-bg-warning-hover\\)\\]:hover {
  background-color: var(--figma-color-bg-warning-hover);
}

.hover\\:text-\\[\\#fff\\]:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
`;
        document.head.append(element);
      }
    }
  });

  // node_modules/clsx/dist/clsx.mjs
  function r3(e3) {
    var t3, f3, n2 = "";
    if ("string" == typeof e3 || "number" == typeof e3) n2 += e3;
    else if ("object" == typeof e3) if (Array.isArray(e3)) {
      var o3 = e3.length;
      for (t3 = 0; t3 < o3; t3++) e3[t3] && (f3 = r3(e3[t3])) && (n2 && (n2 += " "), n2 += f3);
    } else for (f3 in e3) e3[f3] && (n2 && (n2 += " "), n2 += f3);
    return n2;
  }
  function clsx() {
    for (var e3, t3, f3 = 0, n2 = "", o3 = arguments.length; f3 < o3; f3++) (e3 = arguments[f3]) && (t3 = r3(e3)) && (n2 && (n2 += " "), n2 += t3);
    return n2;
  }
  var init_clsx = __esm({
    "node_modules/clsx/dist/clsx.mjs"() {
    }
  });

  // node_modules/tailwind-merge/dist/bundle-mjs.mjs
  function twJoin() {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < arguments.length) {
      if (argument = arguments[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  }
  function createTailwindMerge(createConfigFirst, ...createConfigRest) {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall = initTailwindMerge;
    function initTailwindMerge(classList) {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    }
    function tailwindMerge(classList) {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    }
    return function callTailwindMerge() {
      return functionToCall(twJoin.apply(null, arguments));
    };
  }
  var CLASS_PART_SEPARATOR, createClassGroupUtils, getGroupRecursive, arbitraryPropertyRegex, getGroupIdForArbitraryProperty, createClassMap, processClassesRecursively, getPart, isThemeGetter, getPrefixedClassGroupEntries, createLruCache, IMPORTANT_MODIFIER, createParseClassName, sortModifiers, createConfigUtils, SPLIT_CLASSES_REGEX, mergeClassList, toValue, fromTheme, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, isLength, isArbitraryLength, isNumber, isArbitraryNumber, isInteger, isPercent, isArbitraryValue, isTshirtSize, sizeLabels, isArbitrarySize, isArbitraryPosition, imageLabels, isArbitraryImage, isArbitraryShadow, isAny, getIsArbitraryValue, isLengthOnly, isNever, isShadow, isImage, getDefaultConfig, twMerge;
  var init_bundle_mjs = __esm({
    "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
      CLASS_PART_SEPARATOR = "-";
      createClassGroupUtils = (config) => {
        const classMap = createClassMap(config);
        const {
          conflictingClassGroups,
          conflictingClassGroupModifiers
        } = config;
        const getClassGroupId = (className) => {
          const classParts = className.split(CLASS_PART_SEPARATOR);
          if (classParts[0] === "" && classParts.length !== 1) {
            classParts.shift();
          }
          return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
        };
        const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
          const conflicts = conflictingClassGroups[classGroupId] || [];
          if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
            return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
          }
          return conflicts;
        };
        return {
          getClassGroupId,
          getConflictingClassGroupIds
        };
      };
      getGroupRecursive = (classParts, classPartObject) => {
        var _a;
        if (classParts.length === 0) {
          return classPartObject.classGroupId;
        }
        const currentClassPart = classParts[0];
        const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
        const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
        if (classGroupFromNextClassPart) {
          return classGroupFromNextClassPart;
        }
        if (classPartObject.validators.length === 0) {
          return void 0;
        }
        const classRest = classParts.join(CLASS_PART_SEPARATOR);
        return (_a = classPartObject.validators.find(({
          validator
        }) => validator(classRest))) == null ? void 0 : _a.classGroupId;
      };
      arbitraryPropertyRegex = /^\[(.+)\]$/;
      getGroupIdForArbitraryProperty = (className) => {
        if (arbitraryPropertyRegex.test(className)) {
          const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
          const property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
          if (property) {
            return "arbitrary.." + property;
          }
        }
      };
      createClassMap = (config) => {
        const {
          theme,
          prefix
        } = config;
        const classMap = {
          nextPart: /* @__PURE__ */ new Map(),
          validators: []
        };
        const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
        prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
          processClassesRecursively(classGroup, classMap, classGroupId, theme);
        });
        return classMap;
      };
      processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
        classGroup.forEach((classDefinition) => {
          if (typeof classDefinition === "string") {
            const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
            classPartObjectToEdit.classGroupId = classGroupId;
            return;
          }
          if (typeof classDefinition === "function") {
            if (isThemeGetter(classDefinition)) {
              processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
              return;
            }
            classPartObject.validators.push({
              validator: classDefinition,
              classGroupId
            });
            return;
          }
          Object.entries(classDefinition).forEach(([key, classGroup2]) => {
            processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
          });
        });
      };
      getPart = (classPartObject, path) => {
        let currentClassPartObject = classPartObject;
        path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
          if (!currentClassPartObject.nextPart.has(pathPart)) {
            currentClassPartObject.nextPart.set(pathPart, {
              nextPart: /* @__PURE__ */ new Map(),
              validators: []
            });
          }
          currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
        });
        return currentClassPartObject;
      };
      isThemeGetter = (func) => func.isThemeGetter;
      getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
        if (!prefix) {
          return classGroupEntries;
        }
        return classGroupEntries.map(([classGroupId, classGroup]) => {
          const prefixedClassGroup = classGroup.map((classDefinition) => {
            if (typeof classDefinition === "string") {
              return prefix + classDefinition;
            }
            if (typeof classDefinition === "object") {
              return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
            }
            return classDefinition;
          });
          return [classGroupId, prefixedClassGroup];
        });
      };
      createLruCache = (maxCacheSize) => {
        if (maxCacheSize < 1) {
          return {
            get: () => void 0,
            set: () => {
            }
          };
        }
        let cacheSize = 0;
        let cache = /* @__PURE__ */ new Map();
        let previousCache = /* @__PURE__ */ new Map();
        const update = (key, value) => {
          cache.set(key, value);
          cacheSize++;
          if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = /* @__PURE__ */ new Map();
          }
        };
        return {
          get(key) {
            let value = cache.get(key);
            if (value !== void 0) {
              return value;
            }
            if ((value = previousCache.get(key)) !== void 0) {
              update(key, value);
              return value;
            }
          },
          set(key, value) {
            if (cache.has(key)) {
              cache.set(key, value);
            } else {
              update(key, value);
            }
          }
        };
      };
      IMPORTANT_MODIFIER = "!";
      createParseClassName = (config) => {
        const {
          separator,
          experimentalParseClassName
        } = config;
        const isSeparatorSingleCharacter = separator.length === 1;
        const firstSeparatorCharacter = separator[0];
        const separatorLength = separator.length;
        const parseClassName = (className) => {
          const modifiers = [];
          let bracketDepth = 0;
          let modifierStart = 0;
          let postfixModifierPosition;
          for (let index = 0; index < className.length; index++) {
            let currentCharacter = className[index];
            if (bracketDepth === 0) {
              if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
                modifiers.push(className.slice(modifierStart, index));
                modifierStart = index + separatorLength;
                continue;
              }
              if (currentCharacter === "/") {
                postfixModifierPosition = index;
                continue;
              }
            }
            if (currentCharacter === "[") {
              bracketDepth++;
            } else if (currentCharacter === "]") {
              bracketDepth--;
            }
          }
          const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
          const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
          const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
          const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
          return {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
          };
        };
        if (experimentalParseClassName) {
          return (className) => experimentalParseClassName({
            className,
            parseClassName
          });
        }
        return parseClassName;
      };
      sortModifiers = (modifiers) => {
        if (modifiers.length <= 1) {
          return modifiers;
        }
        const sortedModifiers = [];
        let unsortedModifiers = [];
        modifiers.forEach((modifier) => {
          const isArbitraryVariant = modifier[0] === "[";
          if (isArbitraryVariant) {
            sortedModifiers.push(...unsortedModifiers.sort(), modifier);
            unsortedModifiers = [];
          } else {
            unsortedModifiers.push(modifier);
          }
        });
        sortedModifiers.push(...unsortedModifiers.sort());
        return sortedModifiers;
      };
      createConfigUtils = (config) => __spreadValues({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config)
      }, createClassGroupUtils(config));
      SPLIT_CLASSES_REGEX = /\s+/;
      mergeClassList = (classList, configUtils) => {
        const {
          parseClassName,
          getClassGroupId,
          getConflictingClassGroupIds
        } = configUtils;
        const classGroupsInConflict = [];
        const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
        let result = "";
        for (let index = classNames.length - 1; index >= 0; index -= 1) {
          const originalClassName = classNames[index];
          const {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
          } = parseClassName(originalClassName);
          let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
          let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
          if (!classGroupId) {
            if (!hasPostfixModifier) {
              result = originalClassName + (result.length > 0 ? " " + result : result);
              continue;
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
              result = originalClassName + (result.length > 0 ? " " + result : result);
              continue;
            }
            hasPostfixModifier = false;
          }
          const variantModifier = sortModifiers(modifiers).join(":");
          const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
          const classId = modifierId + classGroupId;
          if (classGroupsInConflict.includes(classId)) {
            continue;
          }
          classGroupsInConflict.push(classId);
          const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
          for (let i3 = 0; i3 < conflictGroups.length; ++i3) {
            const group = conflictGroups[i3];
            classGroupsInConflict.push(modifierId + group);
          }
          result = originalClassName + (result.length > 0 ? " " + result : result);
        }
        return result;
      };
      toValue = (mix) => {
        if (typeof mix === "string") {
          return mix;
        }
        let resolvedValue;
        let string = "";
        for (let k3 = 0; k3 < mix.length; k3++) {
          if (mix[k3]) {
            if (resolvedValue = toValue(mix[k3])) {
              string && (string += " ");
              string += resolvedValue;
            }
          }
        }
        return string;
      };
      fromTheme = (key) => {
        const themeGetter = (theme) => theme[key] || [];
        themeGetter.isThemeGetter = true;
        return themeGetter;
      };
      arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
      fractionRegex = /^\d+\/\d+$/;
      stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
      tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
      lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
      colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
      shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
      imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
      isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
      isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
      isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
      isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
      isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
      isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
      isArbitraryValue = (value) => arbitraryValueRegex.test(value);
      isTshirtSize = (value) => tshirtUnitRegex.test(value);
      sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
      isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
      isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
      imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
      isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
      isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
      isAny = () => true;
      getIsArbitraryValue = (value, label, testValue) => {
        const result = arbitraryValueRegex.exec(value);
        if (result) {
          if (result[1]) {
            return typeof label === "string" ? result[1] === label : label.has(result[1]);
          }
          return testValue(result[2]);
        }
        return false;
      };
      isLengthOnly = (value) => (
        // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
        // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
        // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
        lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
      );
      isNever = () => false;
      isShadow = (value) => shadowRegex.test(value);
      isImage = (value) => imageRegex.test(value);
      getDefaultConfig = () => {
        const colors = fromTheme("colors");
        const spacing = fromTheme("spacing");
        const blur = fromTheme("blur");
        const brightness = fromTheme("brightness");
        const borderColor = fromTheme("borderColor");
        const borderRadius = fromTheme("borderRadius");
        const borderSpacing = fromTheme("borderSpacing");
        const borderWidth = fromTheme("borderWidth");
        const contrast = fromTheme("contrast");
        const grayscale = fromTheme("grayscale");
        const hueRotate = fromTheme("hueRotate");
        const invert = fromTheme("invert");
        const gap = fromTheme("gap");
        const gradientColorStops = fromTheme("gradientColorStops");
        const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
        const inset = fromTheme("inset");
        const margin = fromTheme("margin");
        const opacity = fromTheme("opacity");
        const padding = fromTheme("padding");
        const saturate = fromTheme("saturate");
        const scale = fromTheme("scale");
        const sepia = fromTheme("sepia");
        const skew = fromTheme("skew");
        const space = fromTheme("space");
        const translate = fromTheme("translate");
        const getOverscroll = () => ["auto", "contain", "none"];
        const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
        const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
        const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
        const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
        const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
        const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
        const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
        const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
        const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
        const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
        const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
        const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
        return {
          cacheSize: 500,
          separator: ":",
          theme: {
            colors: [isAny],
            spacing: [isLength, isArbitraryLength],
            blur: ["none", "", isTshirtSize, isArbitraryValue],
            brightness: getNumberAndArbitrary(),
            borderColor: [colors],
            borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
            borderSpacing: getSpacingWithArbitrary(),
            borderWidth: getLengthWithEmptyAndArbitrary(),
            contrast: getNumberAndArbitrary(),
            grayscale: getZeroAndEmpty(),
            hueRotate: getNumberAndArbitrary(),
            invert: getZeroAndEmpty(),
            gap: getSpacingWithArbitrary(),
            gradientColorStops: [colors],
            gradientColorStopPositions: [isPercent, isArbitraryLength],
            inset: getSpacingWithAutoAndArbitrary(),
            margin: getSpacingWithAutoAndArbitrary(),
            opacity: getNumberAndArbitrary(),
            padding: getSpacingWithArbitrary(),
            saturate: getNumberAndArbitrary(),
            scale: getNumberAndArbitrary(),
            sepia: getZeroAndEmpty(),
            skew: getNumberAndArbitrary(),
            space: getSpacingWithArbitrary(),
            translate: getSpacingWithArbitrary()
          },
          classGroups: {
            // Layout
            /**
             * Aspect Ratio
             * @see https://tailwindcss.com/docs/aspect-ratio
             */
            aspect: [{
              aspect: ["auto", "square", "video", isArbitraryValue]
            }],
            /**
             * Container
             * @see https://tailwindcss.com/docs/container
             */
            container: ["container"],
            /**
             * Columns
             * @see https://tailwindcss.com/docs/columns
             */
            columns: [{
              columns: [isTshirtSize]
            }],
            /**
             * Break After
             * @see https://tailwindcss.com/docs/break-after
             */
            "break-after": [{
              "break-after": getBreaks()
            }],
            /**
             * Break Before
             * @see https://tailwindcss.com/docs/break-before
             */
            "break-before": [{
              "break-before": getBreaks()
            }],
            /**
             * Break Inside
             * @see https://tailwindcss.com/docs/break-inside
             */
            "break-inside": [{
              "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
            }],
            /**
             * Box Decoration Break
             * @see https://tailwindcss.com/docs/box-decoration-break
             */
            "box-decoration": [{
              "box-decoration": ["slice", "clone"]
            }],
            /**
             * Box Sizing
             * @see https://tailwindcss.com/docs/box-sizing
             */
            box: [{
              box: ["border", "content"]
            }],
            /**
             * Display
             * @see https://tailwindcss.com/docs/display
             */
            display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
            /**
             * Floats
             * @see https://tailwindcss.com/docs/float
             */
            float: [{
              float: ["right", "left", "none", "start", "end"]
            }],
            /**
             * Clear
             * @see https://tailwindcss.com/docs/clear
             */
            clear: [{
              clear: ["left", "right", "both", "none", "start", "end"]
            }],
            /**
             * Isolation
             * @see https://tailwindcss.com/docs/isolation
             */
            isolation: ["isolate", "isolation-auto"],
            /**
             * Object Fit
             * @see https://tailwindcss.com/docs/object-fit
             */
            "object-fit": [{
              object: ["contain", "cover", "fill", "none", "scale-down"]
            }],
            /**
             * Object Position
             * @see https://tailwindcss.com/docs/object-position
             */
            "object-position": [{
              object: [...getPositions(), isArbitraryValue]
            }],
            /**
             * Overflow
             * @see https://tailwindcss.com/docs/overflow
             */
            overflow: [{
              overflow: getOverflow()
            }],
            /**
             * Overflow X
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-x": [{
              "overflow-x": getOverflow()
            }],
            /**
             * Overflow Y
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-y": [{
              "overflow-y": getOverflow()
            }],
            /**
             * Overscroll Behavior
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            overscroll: [{
              overscroll: getOverscroll()
            }],
            /**
             * Overscroll Behavior X
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-x": [{
              "overscroll-x": getOverscroll()
            }],
            /**
             * Overscroll Behavior Y
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-y": [{
              "overscroll-y": getOverscroll()
            }],
            /**
             * Position
             * @see https://tailwindcss.com/docs/position
             */
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            /**
             * Top / Right / Bottom / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            inset: [{
              inset: [inset]
            }],
            /**
             * Right / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-x": [{
              "inset-x": [inset]
            }],
            /**
             * Top / Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-y": [{
              "inset-y": [inset]
            }],
            /**
             * Start
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            start: [{
              start: [inset]
            }],
            /**
             * End
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            end: [{
              end: [inset]
            }],
            /**
             * Top
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            top: [{
              top: [inset]
            }],
            /**
             * Right
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            right: [{
              right: [inset]
            }],
            /**
             * Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            bottom: [{
              bottom: [inset]
            }],
            /**
             * Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            left: [{
              left: [inset]
            }],
            /**
             * Visibility
             * @see https://tailwindcss.com/docs/visibility
             */
            visibility: ["visible", "invisible", "collapse"],
            /**
             * Z-Index
             * @see https://tailwindcss.com/docs/z-index
             */
            z: [{
              z: ["auto", isInteger, isArbitraryValue]
            }],
            // Flexbox and Grid
            /**
             * Flex Basis
             * @see https://tailwindcss.com/docs/flex-basis
             */
            basis: [{
              basis: getSpacingWithAutoAndArbitrary()
            }],
            /**
             * Flex Direction
             * @see https://tailwindcss.com/docs/flex-direction
             */
            "flex-direction": [{
              flex: ["row", "row-reverse", "col", "col-reverse"]
            }],
            /**
             * Flex Wrap
             * @see https://tailwindcss.com/docs/flex-wrap
             */
            "flex-wrap": [{
              flex: ["wrap", "wrap-reverse", "nowrap"]
            }],
            /**
             * Flex
             * @see https://tailwindcss.com/docs/flex
             */
            flex: [{
              flex: ["1", "auto", "initial", "none", isArbitraryValue]
            }],
            /**
             * Flex Grow
             * @see https://tailwindcss.com/docs/flex-grow
             */
            grow: [{
              grow: getZeroAndEmpty()
            }],
            /**
             * Flex Shrink
             * @see https://tailwindcss.com/docs/flex-shrink
             */
            shrink: [{
              shrink: getZeroAndEmpty()
            }],
            /**
             * Order
             * @see https://tailwindcss.com/docs/order
             */
            order: [{
              order: ["first", "last", "none", isInteger, isArbitraryValue]
            }],
            /**
             * Grid Template Columns
             * @see https://tailwindcss.com/docs/grid-template-columns
             */
            "grid-cols": [{
              "grid-cols": [isAny]
            }],
            /**
             * Grid Column Start / End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start-end": [{
              col: ["auto", {
                span: ["full", isInteger, isArbitraryValue]
              }, isArbitraryValue]
            }],
            /**
             * Grid Column Start
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start": [{
              "col-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Column End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-end": [{
              "col-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Template Rows
             * @see https://tailwindcss.com/docs/grid-template-rows
             */
            "grid-rows": [{
              "grid-rows": [isAny]
            }],
            /**
             * Grid Row Start / End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start-end": [{
              row: ["auto", {
                span: [isInteger, isArbitraryValue]
              }, isArbitraryValue]
            }],
            /**
             * Grid Row Start
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start": [{
              "row-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Row End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-end": [{
              "row-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Auto Flow
             * @see https://tailwindcss.com/docs/grid-auto-flow
             */
            "grid-flow": [{
              "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
            }],
            /**
             * Grid Auto Columns
             * @see https://tailwindcss.com/docs/grid-auto-columns
             */
            "auto-cols": [{
              "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Grid Auto Rows
             * @see https://tailwindcss.com/docs/grid-auto-rows
             */
            "auto-rows": [{
              "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Gap
             * @see https://tailwindcss.com/docs/gap
             */
            gap: [{
              gap: [gap]
            }],
            /**
             * Gap X
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-x": [{
              "gap-x": [gap]
            }],
            /**
             * Gap Y
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-y": [{
              "gap-y": [gap]
            }],
            /**
             * Justify Content
             * @see https://tailwindcss.com/docs/justify-content
             */
            "justify-content": [{
              justify: ["normal", ...getAlign()]
            }],
            /**
             * Justify Items
             * @see https://tailwindcss.com/docs/justify-items
             */
            "justify-items": [{
              "justify-items": ["start", "end", "center", "stretch"]
            }],
            /**
             * Justify Self
             * @see https://tailwindcss.com/docs/justify-self
             */
            "justify-self": [{
              "justify-self": ["auto", "start", "end", "center", "stretch"]
            }],
            /**
             * Align Content
             * @see https://tailwindcss.com/docs/align-content
             */
            "align-content": [{
              content: ["normal", ...getAlign(), "baseline"]
            }],
            /**
             * Align Items
             * @see https://tailwindcss.com/docs/align-items
             */
            "align-items": [{
              items: ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Align Self
             * @see https://tailwindcss.com/docs/align-self
             */
            "align-self": [{
              self: ["auto", "start", "end", "center", "stretch", "baseline"]
            }],
            /**
             * Place Content
             * @see https://tailwindcss.com/docs/place-content
             */
            "place-content": [{
              "place-content": [...getAlign(), "baseline"]
            }],
            /**
             * Place Items
             * @see https://tailwindcss.com/docs/place-items
             */
            "place-items": [{
              "place-items": ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Place Self
             * @see https://tailwindcss.com/docs/place-self
             */
            "place-self": [{
              "place-self": ["auto", "start", "end", "center", "stretch"]
            }],
            // Spacing
            /**
             * Padding
             * @see https://tailwindcss.com/docs/padding
             */
            p: [{
              p: [padding]
            }],
            /**
             * Padding X
             * @see https://tailwindcss.com/docs/padding
             */
            px: [{
              px: [padding]
            }],
            /**
             * Padding Y
             * @see https://tailwindcss.com/docs/padding
             */
            py: [{
              py: [padding]
            }],
            /**
             * Padding Start
             * @see https://tailwindcss.com/docs/padding
             */
            ps: [{
              ps: [padding]
            }],
            /**
             * Padding End
             * @see https://tailwindcss.com/docs/padding
             */
            pe: [{
              pe: [padding]
            }],
            /**
             * Padding Top
             * @see https://tailwindcss.com/docs/padding
             */
            pt: [{
              pt: [padding]
            }],
            /**
             * Padding Right
             * @see https://tailwindcss.com/docs/padding
             */
            pr: [{
              pr: [padding]
            }],
            /**
             * Padding Bottom
             * @see https://tailwindcss.com/docs/padding
             */
            pb: [{
              pb: [padding]
            }],
            /**
             * Padding Left
             * @see https://tailwindcss.com/docs/padding
             */
            pl: [{
              pl: [padding]
            }],
            /**
             * Margin
             * @see https://tailwindcss.com/docs/margin
             */
            m: [{
              m: [margin]
            }],
            /**
             * Margin X
             * @see https://tailwindcss.com/docs/margin
             */
            mx: [{
              mx: [margin]
            }],
            /**
             * Margin Y
             * @see https://tailwindcss.com/docs/margin
             */
            my: [{
              my: [margin]
            }],
            /**
             * Margin Start
             * @see https://tailwindcss.com/docs/margin
             */
            ms: [{
              ms: [margin]
            }],
            /**
             * Margin End
             * @see https://tailwindcss.com/docs/margin
             */
            me: [{
              me: [margin]
            }],
            /**
             * Margin Top
             * @see https://tailwindcss.com/docs/margin
             */
            mt: [{
              mt: [margin]
            }],
            /**
             * Margin Right
             * @see https://tailwindcss.com/docs/margin
             */
            mr: [{
              mr: [margin]
            }],
            /**
             * Margin Bottom
             * @see https://tailwindcss.com/docs/margin
             */
            mb: [{
              mb: [margin]
            }],
            /**
             * Margin Left
             * @see https://tailwindcss.com/docs/margin
             */
            ml: [{
              ml: [margin]
            }],
            /**
             * Space Between X
             * @see https://tailwindcss.com/docs/space
             */
            "space-x": [{
              "space-x": [space]
            }],
            /**
             * Space Between X Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-x-reverse": ["space-x-reverse"],
            /**
             * Space Between Y
             * @see https://tailwindcss.com/docs/space
             */
            "space-y": [{
              "space-y": [space]
            }],
            /**
             * Space Between Y Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-y-reverse": ["space-y-reverse"],
            // Sizing
            /**
             * Width
             * @see https://tailwindcss.com/docs/width
             */
            w: [{
              w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
            }],
            /**
             * Min-Width
             * @see https://tailwindcss.com/docs/min-width
             */
            "min-w": [{
              "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
            }],
            /**
             * Max-Width
             * @see https://tailwindcss.com/docs/max-width
             */
            "max-w": [{
              "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
                screen: [isTshirtSize]
              }, isTshirtSize]
            }],
            /**
             * Height
             * @see https://tailwindcss.com/docs/height
             */
            h: [{
              h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Min-Height
             * @see https://tailwindcss.com/docs/min-height
             */
            "min-h": [{
              "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Max-Height
             * @see https://tailwindcss.com/docs/max-height
             */
            "max-h": [{
              "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
            }],
            /**
             * Size
             * @see https://tailwindcss.com/docs/size
             */
            size: [{
              size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
            }],
            // Typography
            /**
             * Font Size
             * @see https://tailwindcss.com/docs/font-size
             */
            "font-size": [{
              text: ["base", isTshirtSize, isArbitraryLength]
            }],
            /**
             * Font Smoothing
             * @see https://tailwindcss.com/docs/font-smoothing
             */
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            /**
             * Font Style
             * @see https://tailwindcss.com/docs/font-style
             */
            "font-style": ["italic", "not-italic"],
            /**
             * Font Weight
             * @see https://tailwindcss.com/docs/font-weight
             */
            "font-weight": [{
              font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
            }],
            /**
             * Font Family
             * @see https://tailwindcss.com/docs/font-family
             */
            "font-family": [{
              font: [isAny]
            }],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-normal": ["normal-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-ordinal": ["ordinal"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-slashed-zero": ["slashed-zero"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
            /**
             * Letter Spacing
             * @see https://tailwindcss.com/docs/letter-spacing
             */
            tracking: [{
              tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
            }],
            /**
             * Line Clamp
             * @see https://tailwindcss.com/docs/line-clamp
             */
            "line-clamp": [{
              "line-clamp": ["none", isNumber, isArbitraryNumber]
            }],
            /**
             * Line Height
             * @see https://tailwindcss.com/docs/line-height
             */
            leading: [{
              leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
            }],
            /**
             * List Style Image
             * @see https://tailwindcss.com/docs/list-style-image
             */
            "list-image": [{
              "list-image": ["none", isArbitraryValue]
            }],
            /**
             * List Style Type
             * @see https://tailwindcss.com/docs/list-style-type
             */
            "list-style-type": [{
              list: ["none", "disc", "decimal", isArbitraryValue]
            }],
            /**
             * List Style Position
             * @see https://tailwindcss.com/docs/list-style-position
             */
            "list-style-position": [{
              list: ["inside", "outside"]
            }],
            /**
             * Placeholder Color
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/placeholder-color
             */
            "placeholder-color": [{
              placeholder: [colors]
            }],
            /**
             * Placeholder Opacity
             * @see https://tailwindcss.com/docs/placeholder-opacity
             */
            "placeholder-opacity": [{
              "placeholder-opacity": [opacity]
            }],
            /**
             * Text Alignment
             * @see https://tailwindcss.com/docs/text-align
             */
            "text-alignment": [{
              text: ["left", "center", "right", "justify", "start", "end"]
            }],
            /**
             * Text Color
             * @see https://tailwindcss.com/docs/text-color
             */
            "text-color": [{
              text: [colors]
            }],
            /**
             * Text Opacity
             * @see https://tailwindcss.com/docs/text-opacity
             */
            "text-opacity": [{
              "text-opacity": [opacity]
            }],
            /**
             * Text Decoration
             * @see https://tailwindcss.com/docs/text-decoration
             */
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            /**
             * Text Decoration Style
             * @see https://tailwindcss.com/docs/text-decoration-style
             */
            "text-decoration-style": [{
              decoration: [...getLineStyles(), "wavy"]
            }],
            /**
             * Text Decoration Thickness
             * @see https://tailwindcss.com/docs/text-decoration-thickness
             */
            "text-decoration-thickness": [{
              decoration: ["auto", "from-font", isLength, isArbitraryLength]
            }],
            /**
             * Text Underline Offset
             * @see https://tailwindcss.com/docs/text-underline-offset
             */
            "underline-offset": [{
              "underline-offset": ["auto", isLength, isArbitraryValue]
            }],
            /**
             * Text Decoration Color
             * @see https://tailwindcss.com/docs/text-decoration-color
             */
            "text-decoration-color": [{
              decoration: [colors]
            }],
            /**
             * Text Transform
             * @see https://tailwindcss.com/docs/text-transform
             */
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            /**
             * Text Overflow
             * @see https://tailwindcss.com/docs/text-overflow
             */
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            /**
             * Text Wrap
             * @see https://tailwindcss.com/docs/text-wrap
             */
            "text-wrap": [{
              text: ["wrap", "nowrap", "balance", "pretty"]
            }],
            /**
             * Text Indent
             * @see https://tailwindcss.com/docs/text-indent
             */
            indent: [{
              indent: getSpacingWithArbitrary()
            }],
            /**
             * Vertical Alignment
             * @see https://tailwindcss.com/docs/vertical-align
             */
            "vertical-align": [{
              align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
            }],
            /**
             * Whitespace
             * @see https://tailwindcss.com/docs/whitespace
             */
            whitespace: [{
              whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
            }],
            /**
             * Word Break
             * @see https://tailwindcss.com/docs/word-break
             */
            break: [{
              break: ["normal", "words", "all", "keep"]
            }],
            /**
             * Hyphens
             * @see https://tailwindcss.com/docs/hyphens
             */
            hyphens: [{
              hyphens: ["none", "manual", "auto"]
            }],
            /**
             * Content
             * @see https://tailwindcss.com/docs/content
             */
            content: [{
              content: ["none", isArbitraryValue]
            }],
            // Backgrounds
            /**
             * Background Attachment
             * @see https://tailwindcss.com/docs/background-attachment
             */
            "bg-attachment": [{
              bg: ["fixed", "local", "scroll"]
            }],
            /**
             * Background Clip
             * @see https://tailwindcss.com/docs/background-clip
             */
            "bg-clip": [{
              "bg-clip": ["border", "padding", "content", "text"]
            }],
            /**
             * Background Opacity
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/background-opacity
             */
            "bg-opacity": [{
              "bg-opacity": [opacity]
            }],
            /**
             * Background Origin
             * @see https://tailwindcss.com/docs/background-origin
             */
            "bg-origin": [{
              "bg-origin": ["border", "padding", "content"]
            }],
            /**
             * Background Position
             * @see https://tailwindcss.com/docs/background-position
             */
            "bg-position": [{
              bg: [...getPositions(), isArbitraryPosition]
            }],
            /**
             * Background Repeat
             * @see https://tailwindcss.com/docs/background-repeat
             */
            "bg-repeat": [{
              bg: ["no-repeat", {
                repeat: ["", "x", "y", "round", "space"]
              }]
            }],
            /**
             * Background Size
             * @see https://tailwindcss.com/docs/background-size
             */
            "bg-size": [{
              bg: ["auto", "cover", "contain", isArbitrarySize]
            }],
            /**
             * Background Image
             * @see https://tailwindcss.com/docs/background-image
             */
            "bg-image": [{
              bg: ["none", {
                "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
              }, isArbitraryImage]
            }],
            /**
             * Background Color
             * @see https://tailwindcss.com/docs/background-color
             */
            "bg-color": [{
              bg: [colors]
            }],
            /**
             * Gradient Color Stops From Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from-pos": [{
              from: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops Via Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via-pos": [{
              via: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops To Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to-pos": [{
              to: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops From
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from": [{
              from: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops Via
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via": [{
              via: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops To
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to": [{
              to: [gradientColorStops]
            }],
            // Borders
            /**
             * Border Radius
             * @see https://tailwindcss.com/docs/border-radius
             */
            rounded: [{
              rounded: [borderRadius]
            }],
            /**
             * Border Radius Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-s": [{
              "rounded-s": [borderRadius]
            }],
            /**
             * Border Radius End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-e": [{
              "rounded-e": [borderRadius]
            }],
            /**
             * Border Radius Top
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-t": [{
              "rounded-t": [borderRadius]
            }],
            /**
             * Border Radius Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-r": [{
              "rounded-r": [borderRadius]
            }],
            /**
             * Border Radius Bottom
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-b": [{
              "rounded-b": [borderRadius]
            }],
            /**
             * Border Radius Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-l": [{
              "rounded-l": [borderRadius]
            }],
            /**
             * Border Radius Start Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ss": [{
              "rounded-ss": [borderRadius]
            }],
            /**
             * Border Radius Start End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-se": [{
              "rounded-se": [borderRadius]
            }],
            /**
             * Border Radius End End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ee": [{
              "rounded-ee": [borderRadius]
            }],
            /**
             * Border Radius End Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-es": [{
              "rounded-es": [borderRadius]
            }],
            /**
             * Border Radius Top Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tl": [{
              "rounded-tl": [borderRadius]
            }],
            /**
             * Border Radius Top Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tr": [{
              "rounded-tr": [borderRadius]
            }],
            /**
             * Border Radius Bottom Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-br": [{
              "rounded-br": [borderRadius]
            }],
            /**
             * Border Radius Bottom Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-bl": [{
              "rounded-bl": [borderRadius]
            }],
            /**
             * Border Width
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w": [{
              border: [borderWidth]
            }],
            /**
             * Border Width X
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-x": [{
              "border-x": [borderWidth]
            }],
            /**
             * Border Width Y
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-y": [{
              "border-y": [borderWidth]
            }],
            /**
             * Border Width Start
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-s": [{
              "border-s": [borderWidth]
            }],
            /**
             * Border Width End
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-e": [{
              "border-e": [borderWidth]
            }],
            /**
             * Border Width Top
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-t": [{
              "border-t": [borderWidth]
            }],
            /**
             * Border Width Right
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-r": [{
              "border-r": [borderWidth]
            }],
            /**
             * Border Width Bottom
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-b": [{
              "border-b": [borderWidth]
            }],
            /**
             * Border Width Left
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-l": [{
              "border-l": [borderWidth]
            }],
            /**
             * Border Opacity
             * @see https://tailwindcss.com/docs/border-opacity
             */
            "border-opacity": [{
              "border-opacity": [opacity]
            }],
            /**
             * Border Style
             * @see https://tailwindcss.com/docs/border-style
             */
            "border-style": [{
              border: [...getLineStyles(), "hidden"]
            }],
            /**
             * Divide Width X
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x": [{
              "divide-x": [borderWidth]
            }],
            /**
             * Divide Width X Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x-reverse": ["divide-x-reverse"],
            /**
             * Divide Width Y
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y": [{
              "divide-y": [borderWidth]
            }],
            /**
             * Divide Width Y Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y-reverse": ["divide-y-reverse"],
            /**
             * Divide Opacity
             * @see https://tailwindcss.com/docs/divide-opacity
             */
            "divide-opacity": [{
              "divide-opacity": [opacity]
            }],
            /**
             * Divide Style
             * @see https://tailwindcss.com/docs/divide-style
             */
            "divide-style": [{
              divide: getLineStyles()
            }],
            /**
             * Border Color
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color": [{
              border: [borderColor]
            }],
            /**
             * Border Color X
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-x": [{
              "border-x": [borderColor]
            }],
            /**
             * Border Color Y
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-y": [{
              "border-y": [borderColor]
            }],
            /**
             * Border Color S
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-s": [{
              "border-s": [borderColor]
            }],
            /**
             * Border Color E
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-e": [{
              "border-e": [borderColor]
            }],
            /**
             * Border Color Top
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-t": [{
              "border-t": [borderColor]
            }],
            /**
             * Border Color Right
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-r": [{
              "border-r": [borderColor]
            }],
            /**
             * Border Color Bottom
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-b": [{
              "border-b": [borderColor]
            }],
            /**
             * Border Color Left
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-l": [{
              "border-l": [borderColor]
            }],
            /**
             * Divide Color
             * @see https://tailwindcss.com/docs/divide-color
             */
            "divide-color": [{
              divide: [borderColor]
            }],
            /**
             * Outline Style
             * @see https://tailwindcss.com/docs/outline-style
             */
            "outline-style": [{
              outline: ["", ...getLineStyles()]
            }],
            /**
             * Outline Offset
             * @see https://tailwindcss.com/docs/outline-offset
             */
            "outline-offset": [{
              "outline-offset": [isLength, isArbitraryValue]
            }],
            /**
             * Outline Width
             * @see https://tailwindcss.com/docs/outline-width
             */
            "outline-w": [{
              outline: [isLength, isArbitraryLength]
            }],
            /**
             * Outline Color
             * @see https://tailwindcss.com/docs/outline-color
             */
            "outline-color": [{
              outline: [colors]
            }],
            /**
             * Ring Width
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w": [{
              ring: getLengthWithEmptyAndArbitrary()
            }],
            /**
             * Ring Width Inset
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w-inset": ["ring-inset"],
            /**
             * Ring Color
             * @see https://tailwindcss.com/docs/ring-color
             */
            "ring-color": [{
              ring: [colors]
            }],
            /**
             * Ring Opacity
             * @see https://tailwindcss.com/docs/ring-opacity
             */
            "ring-opacity": [{
              "ring-opacity": [opacity]
            }],
            /**
             * Ring Offset Width
             * @see https://tailwindcss.com/docs/ring-offset-width
             */
            "ring-offset-w": [{
              "ring-offset": [isLength, isArbitraryLength]
            }],
            /**
             * Ring Offset Color
             * @see https://tailwindcss.com/docs/ring-offset-color
             */
            "ring-offset-color": [{
              "ring-offset": [colors]
            }],
            // Effects
            /**
             * Box Shadow
             * @see https://tailwindcss.com/docs/box-shadow
             */
            shadow: [{
              shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
            }],
            /**
             * Box Shadow Color
             * @see https://tailwindcss.com/docs/box-shadow-color
             */
            "shadow-color": [{
              shadow: [isAny]
            }],
            /**
             * Opacity
             * @see https://tailwindcss.com/docs/opacity
             */
            opacity: [{
              opacity: [opacity]
            }],
            /**
             * Mix Blend Mode
             * @see https://tailwindcss.com/docs/mix-blend-mode
             */
            "mix-blend": [{
              "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
            }],
            /**
             * Background Blend Mode
             * @see https://tailwindcss.com/docs/background-blend-mode
             */
            "bg-blend": [{
              "bg-blend": getBlendModes()
            }],
            // Filters
            /**
             * Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/filter
             */
            filter: [{
              filter: ["", "none"]
            }],
            /**
             * Blur
             * @see https://tailwindcss.com/docs/blur
             */
            blur: [{
              blur: [blur]
            }],
            /**
             * Brightness
             * @see https://tailwindcss.com/docs/brightness
             */
            brightness: [{
              brightness: [brightness]
            }],
            /**
             * Contrast
             * @see https://tailwindcss.com/docs/contrast
             */
            contrast: [{
              contrast: [contrast]
            }],
            /**
             * Drop Shadow
             * @see https://tailwindcss.com/docs/drop-shadow
             */
            "drop-shadow": [{
              "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
            }],
            /**
             * Grayscale
             * @see https://tailwindcss.com/docs/grayscale
             */
            grayscale: [{
              grayscale: [grayscale]
            }],
            /**
             * Hue Rotate
             * @see https://tailwindcss.com/docs/hue-rotate
             */
            "hue-rotate": [{
              "hue-rotate": [hueRotate]
            }],
            /**
             * Invert
             * @see https://tailwindcss.com/docs/invert
             */
            invert: [{
              invert: [invert]
            }],
            /**
             * Saturate
             * @see https://tailwindcss.com/docs/saturate
             */
            saturate: [{
              saturate: [saturate]
            }],
            /**
             * Sepia
             * @see https://tailwindcss.com/docs/sepia
             */
            sepia: [{
              sepia: [sepia]
            }],
            /**
             * Backdrop Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/backdrop-filter
             */
            "backdrop-filter": [{
              "backdrop-filter": ["", "none"]
            }],
            /**
             * Backdrop Blur
             * @see https://tailwindcss.com/docs/backdrop-blur
             */
            "backdrop-blur": [{
              "backdrop-blur": [blur]
            }],
            /**
             * Backdrop Brightness
             * @see https://tailwindcss.com/docs/backdrop-brightness
             */
            "backdrop-brightness": [{
              "backdrop-brightness": [brightness]
            }],
            /**
             * Backdrop Contrast
             * @see https://tailwindcss.com/docs/backdrop-contrast
             */
            "backdrop-contrast": [{
              "backdrop-contrast": [contrast]
            }],
            /**
             * Backdrop Grayscale
             * @see https://tailwindcss.com/docs/backdrop-grayscale
             */
            "backdrop-grayscale": [{
              "backdrop-grayscale": [grayscale]
            }],
            /**
             * Backdrop Hue Rotate
             * @see https://tailwindcss.com/docs/backdrop-hue-rotate
             */
            "backdrop-hue-rotate": [{
              "backdrop-hue-rotate": [hueRotate]
            }],
            /**
             * Backdrop Invert
             * @see https://tailwindcss.com/docs/backdrop-invert
             */
            "backdrop-invert": [{
              "backdrop-invert": [invert]
            }],
            /**
             * Backdrop Opacity
             * @see https://tailwindcss.com/docs/backdrop-opacity
             */
            "backdrop-opacity": [{
              "backdrop-opacity": [opacity]
            }],
            /**
             * Backdrop Saturate
             * @see https://tailwindcss.com/docs/backdrop-saturate
             */
            "backdrop-saturate": [{
              "backdrop-saturate": [saturate]
            }],
            /**
             * Backdrop Sepia
             * @see https://tailwindcss.com/docs/backdrop-sepia
             */
            "backdrop-sepia": [{
              "backdrop-sepia": [sepia]
            }],
            // Tables
            /**
             * Border Collapse
             * @see https://tailwindcss.com/docs/border-collapse
             */
            "border-collapse": [{
              border: ["collapse", "separate"]
            }],
            /**
             * Border Spacing
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing": [{
              "border-spacing": [borderSpacing]
            }],
            /**
             * Border Spacing X
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-x": [{
              "border-spacing-x": [borderSpacing]
            }],
            /**
             * Border Spacing Y
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-y": [{
              "border-spacing-y": [borderSpacing]
            }],
            /**
             * Table Layout
             * @see https://tailwindcss.com/docs/table-layout
             */
            "table-layout": [{
              table: ["auto", "fixed"]
            }],
            /**
             * Caption Side
             * @see https://tailwindcss.com/docs/caption-side
             */
            caption: [{
              caption: ["top", "bottom"]
            }],
            // Transitions and Animation
            /**
             * Tranisition Property
             * @see https://tailwindcss.com/docs/transition-property
             */
            transition: [{
              transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
            }],
            /**
             * Transition Duration
             * @see https://tailwindcss.com/docs/transition-duration
             */
            duration: [{
              duration: getNumberAndArbitrary()
            }],
            /**
             * Transition Timing Function
             * @see https://tailwindcss.com/docs/transition-timing-function
             */
            ease: [{
              ease: ["linear", "in", "out", "in-out", isArbitraryValue]
            }],
            /**
             * Transition Delay
             * @see https://tailwindcss.com/docs/transition-delay
             */
            delay: [{
              delay: getNumberAndArbitrary()
            }],
            /**
             * Animation
             * @see https://tailwindcss.com/docs/animation
             */
            animate: [{
              animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
            }],
            // Transforms
            /**
             * Transform
             * @see https://tailwindcss.com/docs/transform
             */
            transform: [{
              transform: ["", "gpu", "none"]
            }],
            /**
             * Scale
             * @see https://tailwindcss.com/docs/scale
             */
            scale: [{
              scale: [scale]
            }],
            /**
             * Scale X
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-x": [{
              "scale-x": [scale]
            }],
            /**
             * Scale Y
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-y": [{
              "scale-y": [scale]
            }],
            /**
             * Rotate
             * @see https://tailwindcss.com/docs/rotate
             */
            rotate: [{
              rotate: [isInteger, isArbitraryValue]
            }],
            /**
             * Translate X
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-x": [{
              "translate-x": [translate]
            }],
            /**
             * Translate Y
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-y": [{
              "translate-y": [translate]
            }],
            /**
             * Skew X
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-x": [{
              "skew-x": [skew]
            }],
            /**
             * Skew Y
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-y": [{
              "skew-y": [skew]
            }],
            /**
             * Transform Origin
             * @see https://tailwindcss.com/docs/transform-origin
             */
            "transform-origin": [{
              origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
            }],
            // Interactivity
            /**
             * Accent Color
             * @see https://tailwindcss.com/docs/accent-color
             */
            accent: [{
              accent: ["auto", colors]
            }],
            /**
             * Appearance
             * @see https://tailwindcss.com/docs/appearance
             */
            appearance: [{
              appearance: ["none", "auto"]
            }],
            /**
             * Cursor
             * @see https://tailwindcss.com/docs/cursor
             */
            cursor: [{
              cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
            }],
            /**
             * Caret Color
             * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
             */
            "caret-color": [{
              caret: [colors]
            }],
            /**
             * Pointer Events
             * @see https://tailwindcss.com/docs/pointer-events
             */
            "pointer-events": [{
              "pointer-events": ["none", "auto"]
            }],
            /**
             * Resize
             * @see https://tailwindcss.com/docs/resize
             */
            resize: [{
              resize: ["none", "y", "x", ""]
            }],
            /**
             * Scroll Behavior
             * @see https://tailwindcss.com/docs/scroll-behavior
             */
            "scroll-behavior": [{
              scroll: ["auto", "smooth"]
            }],
            /**
             * Scroll Margin
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-m": [{
              "scroll-m": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin X
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mx": [{
              "scroll-mx": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Y
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-my": [{
              "scroll-my": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Start
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ms": [{
              "scroll-ms": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin End
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-me": [{
              "scroll-me": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Top
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mt": [{
              "scroll-mt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Right
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mr": [{
              "scroll-mr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Bottom
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mb": [{
              "scroll-mb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Left
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ml": [{
              "scroll-ml": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-p": [{
              "scroll-p": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding X
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-px": [{
              "scroll-px": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Y
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-py": [{
              "scroll-py": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Start
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-ps": [{
              "scroll-ps": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding End
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pe": [{
              "scroll-pe": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Top
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pt": [{
              "scroll-pt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Right
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pr": [{
              "scroll-pr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Bottom
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pb": [{
              "scroll-pb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Left
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pl": [{
              "scroll-pl": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Snap Align
             * @see https://tailwindcss.com/docs/scroll-snap-align
             */
            "snap-align": [{
              snap: ["start", "end", "center", "align-none"]
            }],
            /**
             * Scroll Snap Stop
             * @see https://tailwindcss.com/docs/scroll-snap-stop
             */
            "snap-stop": [{
              snap: ["normal", "always"]
            }],
            /**
             * Scroll Snap Type
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-type": [{
              snap: ["none", "x", "y", "both"]
            }],
            /**
             * Scroll Snap Type Strictness
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-strictness": [{
              snap: ["mandatory", "proximity"]
            }],
            /**
             * Touch Action
             * @see https://tailwindcss.com/docs/touch-action
             */
            touch: [{
              touch: ["auto", "none", "manipulation"]
            }],
            /**
             * Touch Action X
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-x": [{
              "touch-pan": ["x", "left", "right"]
            }],
            /**
             * Touch Action Y
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-y": [{
              "touch-pan": ["y", "up", "down"]
            }],
            /**
             * Touch Action Pinch Zoom
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-pz": ["touch-pinch-zoom"],
            /**
             * User Select
             * @see https://tailwindcss.com/docs/user-select
             */
            select: [{
              select: ["none", "text", "all", "auto"]
            }],
            /**
             * Will Change
             * @see https://tailwindcss.com/docs/will-change
             */
            "will-change": [{
              "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
            }],
            // SVG
            /**
             * Fill
             * @see https://tailwindcss.com/docs/fill
             */
            fill: [{
              fill: [colors, "none"]
            }],
            /**
             * Stroke Width
             * @see https://tailwindcss.com/docs/stroke-width
             */
            "stroke-w": [{
              stroke: [isLength, isArbitraryLength, isArbitraryNumber]
            }],
            /**
             * Stroke
             * @see https://tailwindcss.com/docs/stroke
             */
            stroke: [{
              stroke: [colors, "none"]
            }],
            // Accessibility
            /**
             * Screen Readers
             * @see https://tailwindcss.com/docs/screen-readers
             */
            sr: ["sr-only", "not-sr-only"],
            /**
             * Forced Color Adjust
             * @see https://tailwindcss.com/docs/forced-color-adjust
             */
            "forced-color-adjust": [{
              "forced-color-adjust": ["auto", "none"]
            }]
          },
          conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"]
          },
          conflictingClassGroupModifiers: {
            "font-size": ["leading"]
          }
        };
      };
      twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
    }
  });

  // src/lib/utils.ts
  function cn2(...inputs) {
    return twMerge(clsx(inputs));
  }
  var init_utils = __esm({
    "src/lib/utils.ts"() {
      "use strict";
      init_clsx();
      init_bundle_mjs();
    }
  });

  // src/components/common/Text.tsx
  function Text(_a) {
    var _b = _a, {
      children,
      align = "left",
      size = "base",
      weight = "normal",
      variant = "default",
      numeric = false,
      className
    } = _b, props = __objRest(_b, [
      "children",
      "align",
      "size",
      "weight",
      "variant",
      "numeric",
      "className"
    ]);
    return /* @__PURE__ */ g(
      "span",
      __spreadValues({
        className: cn2(
          // Base styles
          "block font-sans",
          // Text alignment
          align === "left" && "text-left",
          align === "center" && "text-center",
          align === "right" && "text-right",
          // Font size
          size === "xs" && "text-xs",
          size === "sm" && "text-sm",
          size === "base" && "text-base",
          size === "lg" && "text-lg",
          size === "xl" && "text-xl",
          // Font weight
          weight === "normal" && "font-normal",
          weight === "medium" && "font-medium",
          weight === "bold" && "font-bold",
          // Variants
          variant === "default" && "text-[var(--figma-color-text)]",
          variant === "muted" && "text-[var(--figma-color-text-secondary)]",
          variant === "primary" && "text-[var(--figma-color-text-brand)]",
          variant === "error" && "text-[var(--figma-color-text-danger)]",
          // Numeric
          numeric && "tabular-nums",
          // Custom classes
          className
        )
      }, props),
      children
    );
  }
  var init_Text = __esm({
    "src/components/common/Text.tsx"() {
      "use strict";
      init_preact_module();
      init_utils();
    }
  });

  // src/components/common/Button.tsx
  function Button(_a) {
    var _b = _a, {
      variant = "primary",
      size = "medium",
      fullWidth = false,
      disabled = false,
      children,
      className = ""
    } = _b, props = __objRest(_b, [
      "variant",
      "size",
      "fullWidth",
      "disabled",
      "children",
      "className"
    ]);
    const baseClasses = "inline-flex items-center justify-center transition-colors font-medium h-[32px]";
    const sizeClasses = {
      small: "px-2 text-xs rounded",
      medium: "px-3 text-xs rounded-md",
      large: "px-4 text-sm rounded-lg"
    };
    const mappedVariant = variant === "info" ? "secondary" : variant;
    const variantClasses = {
      primary: "bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-brand-hover)]",
      secondary: "bg-[var(--figma-color-bg)] text-[var(--figma-color-text)] border border-[var(--figma-color-border)] hover:bg-[var(--figma-color-bg-hover)]",
      danger: "bg-[var(--figma-color-bg-danger)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-danger-hover)]",
      warning: "bg-[var(--figma-color-bg-warning)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-warning-hover)]",
      success: "bg-[var(--figma-color-bg-success)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-success-hover)]"
    };
    const widthClass = fullWidth ? "w-full" : "";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    const classes = [
      baseClasses,
      sizeClasses[size],
      variantClasses[mappedVariant],
      widthClass,
      disabledClass,
      className
    ].join(" ");
    return /* @__PURE__ */ g(
      "button",
      __spreadValues({
        className: classes,
        disabled
      }, props),
      children
    );
  }
  var init_Button = __esm({
    "src/components/common/Button.tsx"() {
      "use strict";
      init_preact_module();
    }
  });

  // src/components/common/IconButton.tsx
  function IconButton(_a) {
    var _b = _a, {
      size = "medium",
      variant = "secondary",
      disabled = false,
      children,
      className = ""
    } = _b, props = __objRest(_b, [
      "size",
      "variant",
      "disabled",
      "children",
      "className"
    ]);
    const baseClasses = "inline-flex items-center justify-center transition-colors rounded-md h-[32px] w-[32px]";
    const sizeClasses = {
      small: "text-xs",
      medium: "text-xs",
      large: "text-sm"
    };
    const variantClasses = {
      primary: "text-[var(--figma-color-text-onbrand)] bg-[var(--figma-color-bg-brand)] hover:bg-[var(--figma-color-bg-brand-hover)]",
      secondary: "text-[var(--figma-color-text)] hover:bg-[var(--figma-color-bg-hover)]"
    };
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    const classes = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      disabledClass,
      className
    ].join(" ");
    return /* @__PURE__ */ g(
      "button",
      __spreadValues({
        className: classes,
        disabled
      }, props),
      children
    );
  }
  var init_IconButton = __esm({
    "src/components/common/IconButton.tsx"() {
      "use strict";
      init_preact_module();
    }
  });

  // src/components/common/index.ts
  var init_common = __esm({
    "src/components/common/index.ts"() {
      "use strict";
      init_Button();
      init_IconButton();
      init_Text();
    }
  });

  // src/components/Modal.tsx
  function formatCSSValue(value) {
    if (value === null || value === void 0) return "";
    if (typeof value === "number") {
      if (["width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight", "padding", "spacing"].some(
        (dim) => String(value).includes(dim)
      )) {
        return `${value}px`;
      }
      if (String(value).includes("opacity")) {
        return `${value * 100}%`;
      }
      return value.toString();
    }
    if (typeof value === "boolean") return value ? "1" : "0";
    if (Array.isArray(value)) return `[${value.join(", ")}]`;
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  }
  function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function copyToClipboard(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      emit("SHOW_NOTIFICATION", "Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text:", err);
      emit("SHOW_ERROR", "Failed to copy text");
    }
  }
  function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return /* @__PURE__ */ g("div", { className: "fixed inset-0 z-50 flex items-center justify-center" }, /* @__PURE__ */ g(
      "div",
      {
        className: "fixed inset-0 bg-black/50",
        onClick: onClose
      }
    ), /* @__PURE__ */ g("div", { className: "relative z-10 w-[300px] bg-[var(--figma-color-bg)] rounded-lg shadow-lg" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between py-3 px-4 border-b border-[var(--figma-color-border)]" }, /* @__PURE__ */ g("div", { className: "mb-4" }, /* @__PURE__ */ g(Text, { size: "lg", weight: "bold" }, title)), /* @__PURE__ */ g(
      IconButton,
      {
        onClick: onClose,
        variant: "secondary",
        size: "small"
      },
      /* @__PURE__ */ g(CloseIcon, null)
    )), /* @__PURE__ */ g("div", { className: "p-4" }, children)));
  }
  function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    children,
    confirmText = "Confirm",
    variant = "info",
    showCancelButton = true,
    cancelButtonText = "Cancel"
  }) {
    if (!isOpen) return null;
    return /* @__PURE__ */ g(Modal, { isOpen, onClose, title }, /* @__PURE__ */ g("div", { className: "flex flex-col gap-2" }, message && /* @__PURE__ */ g(Text, { size: "base" }, message), children, /* @__PURE__ */ g("div", { className: "flex justify-end gap-2 mt-4" }, showCancelButton && /* @__PURE__ */ g(
      Button,
      {
        onClick: onClose,
        variant: "secondary",
        size: "medium"
      },
      cancelButtonText
    ), /* @__PURE__ */ g(
      Button,
      {
        onClick: onConfirm,
        variant: variant === "danger" ? "danger" : "primary",
        size: "medium"
      },
      confirmText
    ))));
  }
  function ClassDetailsModal({ isOpen, onClose, classData }) {
    if (!isOpen || !classData) return null;
    const allProperties = __spreadValues(__spreadValues(__spreadValues({
      // Layout properties
      width: classData.width,
      height: classData.height,
      minWidth: classData.minWidth,
      maxWidth: classData.maxWidth,
      minHeight: classData.minHeight,
      maxHeight: classData.maxHeight,
      display: classData.layoutMode === "NONE" ? "block" : "flex"
    }, classData.layoutMode !== "NONE" && classData.layoutProperties ? {
      flexDirection: classData.layoutMode === "HORIZONTAL" ? "row" : "column",
      flexWrap: classData.layoutProperties.layoutWrap === "WRAP" ? "wrap" : "nowrap",
      justifyContent: classData.layoutProperties.primaryAxisAlignItems.toLowerCase().replace("_", "-"),
      alignItems: classData.layoutProperties.counterAxisAlignItems.toLowerCase(),
      gap: classData.layoutProperties.itemSpacing,
      rowGap: classData.layoutProperties.counterAxisSpacing,
      paddingTop: classData.layoutProperties.padding.top,
      paddingRight: classData.layoutProperties.padding.right,
      paddingBottom: classData.layoutProperties.padding.bottom,
      paddingLeft: classData.layoutProperties.padding.left,
      position: classData.layoutProperties.layoutPositioning.toLowerCase()
    } : {}), classData.appearance ? {
      opacity: classData.appearance.opacity,
      mixBlendMode: classData.appearance.blendMode.toLowerCase(),
      borderRadius: classData.appearance.cornerRadius,
      borderWidth: classData.appearance.strokeWeight,
      borderStyle: classData.appearance.dashPattern.length > 0 ? "dashed" : "solid",
      borderPosition: classData.appearance.strokeAlign.toLowerCase()
    } : {}), (() => {
      var _a, _b, _c, _d, _e, _f;
      const styleProps = {};
      if (((_a = classData.styles) == null ? void 0 : _a.fills) && Array.isArray(classData.styles.fills) && classData.styles.fills.length > 0) {
        styleProps.backgroundColor = classData.styles.fills[0];
      } else if ((_b = classData.styleReferences) == null ? void 0 : _b.fillStyleId) {
        const fillStyleId = String(classData.styleReferences.fillStyleId);
        styleProps.backgroundColor = `[style-id: ${fillStyleId}]`;
      }
      if (((_c = classData.styles) == null ? void 0 : _c.strokes) && Array.isArray(classData.styles.strokes) && classData.styles.strokes.length > 0) {
        styleProps.borderColor = classData.styles.strokes[0];
      } else if ((_d = classData.styleReferences) == null ? void 0 : _d.strokeStyleId) {
        const strokeStyleId = String(classData.styleReferences.strokeStyleId);
        styleProps.borderColor = `[style-id: ${strokeStyleId}]`;
      }
      if (((_e = classData.styles) == null ? void 0 : _e.effects) && Array.isArray(classData.styles.effects) && classData.styles.effects.length > 0) {
        styleProps.boxShadow = classData.styles.effects[0];
      } else if ((_f = classData.styleReferences) == null ? void 0 : _f.effectStyleId) {
        const effectStyleId = String(classData.styleReferences.effectStyleId);
        styleProps.boxShadow = `[style-id: ${effectStyleId}]`;
      }
      return styleProps;
    })());
    const CodeBlock = ({ properties }) => {
      const definedProperties = Object.entries(properties).filter(
        ([_3, value]) => value !== null && value !== void 0 && value !== ""
      );
      if (definedProperties.length === 0) return null;
      const cssCode = `
.${classData.name} {
${definedProperties.map(([key, value]) => `  ${toKebabCase(key)}: ${formatCSSValue(value)};`).join("\n")}
}`;
      return /* @__PURE__ */ g("div", { className: "mb-4" }, /* @__PURE__ */ g("div", { className: "bg-[#1e1e1e] rounded-lg overflow-hidden" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between px-4 py-2 border-b border-[#333]" }, /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g("span", { className: "text-[#f39c12] text-xs uppercase" }, "css"), /* @__PURE__ */ g("span", { className: "text-[#666] text-xs" }, "Styles")), /* @__PURE__ */ g(
        Button,
        {
          onClick: () => copyToClipboard(cssCode),
          variant: "secondary",
          size: "small"
        },
        "COPY"
      )), /* @__PURE__ */ g("div", { className: "p-4 font-mono text-xs" }, /* @__PURE__ */ g("div", { className: "text-[#e6e6e6]" }, /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, "."), /* @__PURE__ */ g("span", { className: "text-[#cc7832]" }, classData.name), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, " ", `{`)), definedProperties.map(([key, value]) => /* @__PURE__ */ g("div", { key, className: "ml-4" }, /* @__PURE__ */ g("span", { className: "text-[#6a8759]" }, toKebabCase(key)), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, ":"), /* @__PURE__ */ g("span", { className: "text-[#cc7832]" }, " ", formatCSSValue(value)), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, ";"))), /* @__PURE__ */ g("div", { className: "text-[#9b703f]" }, `}`))));
    };
    return /* @__PURE__ */ g(Modal, { isOpen, onClose, title: "Info" }, /* @__PURE__ */ g("div", { className: "max-h-[70vh] overflow-y-auto" }, /* @__PURE__ */ g(CodeBlock, { properties: allProperties })));
  }
  var CloseIcon;
  var init_Modal = __esm({
    "src/components/Modal.tsx"() {
      "use strict";
      init_preact_module();
      init_Text();
      init_lib();
      init_common();
      CloseIcon = () => /* @__PURE__ */ g("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none" }, /* @__PURE__ */ g("path", { d: "M18 6L6 18M6 6L18 18", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }));
    }
  });

  // src/components/common/DropdownItem.tsx
  function DropdownItem(_a) {
    var _b = _a, {
      icon,
      children,
      className = ""
    } = _b, props = __objRest(_b, [
      "icon",
      "children",
      "className"
    ]);
    return /* @__PURE__ */ g("div", { className: "w-full" }, /* @__PURE__ */ g(
      Button,
      __spreadValues({
        className: `w-full flex items-center justify-start gap-2 h-7 leading-none ${className}`,
        size: "small"
      }, props),
      /* @__PURE__ */ g("div", { className: "flex items-center gap-2 flex-1" }, icon && /* @__PURE__ */ g("div", { className: "w-4 h-4 flex items-center justify-center flex-shrink-0" }, icon), /* @__PURE__ */ g("span", { className: "text-left" }, children))
    ));
  }
  var init_DropdownItem = __esm({
    "src/components/common/DropdownItem.tsx"() {
      "use strict";
      init_preact_module();
      init_Button();
    }
  });

  // src/ui.tsx
  var ui_exports = {};
  __export(ui_exports, {
    default: () => ui_default
  });
  function Plugin() {
    const [isInitialized, setIsInitialized] = h2(false);
    const [savedClasses, setSavedClasses] = h2([]);
    const [searchQuery, setSearchQuery] = h2("");
    const [activeMenu, setActiveMenu] = h2(null);
    const [_editingClass, _setEditingClass] = h2(null);
    const [hasSelectedFrame, setHasSelectedFrame] = h2(false);
    const [newClassName, setNewClassName] = h2("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = h2(false);
    const [classToDelete, setClassToDelete] = h2(null);
    const [isUpdateModalOpen, setUpdateModalOpen] = h2(false);
    const [isRenameModalOpen, setIsRenameModalOpen] = h2(false);
    const [classToRename, setClassToRename] = h2(null);
    const [newName, setNewName] = h2("");
    const [classToUpdate, setClassToUpdate] = h2(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = h2(false);
    const [classToView, setClassToView] = h2(null);
    const [isImportModalOpen, setIsImportModalOpen] = h2(false);
    const [importConflicts, setImportConflicts] = h2([]);
    const dropdownRef = A2(null);
    y2(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setActiveMenu(null);
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    y2(() => {
      let mounted = true;
      const unsubscribeClasses = on2("CLASSES_LOADED", (classes) => {
        if (!mounted) return;
        setSavedClasses(classes);
        setIsInitialized(true);
      });
      const unsubscribeSelection = on2("SELECTION_CHANGED", (hasFrame) => {
        if (!mounted) return;
        setHasSelectedFrame(hasFrame);
      });
      const unsubscribeClassSaved = on2("CLASS_SAVED", (data) => {
        if (!mounted) return;
        setSavedClasses((prevClasses) => [...prevClasses, data]);
        setNewClassName("");
      });
      const unsubscribeClassDeleted = on2("CLASS_DELETED", (deletedClassName) => {
        if (!mounted) return;
        setSavedClasses(
          (prevClasses) => prevClasses.filter((cls) => cls.name !== deletedClassName)
        );
      });
      const unsubscribeClassUpdated = on2("CLASS_UPDATED", (data) => {
        if (!mounted) return;
        setSavedClasses(
          (prevClasses) => prevClasses.map(
            (cls) => cls.name === data.name ? __spreadProps(__spreadValues({}, data.properties), { name: data.name }) : cls
          )
        );
        setUpdateModalOpen(false);
      });
      const unsubscribeClassApplied = on2("CLASS_APPLIED", (result) => {
        if (result.success) {
          setActiveMenu(null);
        } else if (result.error) {
          console.error("Error applying class:", result.error);
        }
      });
      const unsubscribeImportResult = on2("IMPORT_RESULT", (result) => {
        if (result.success) {
          emit("LOAD_CLASSES");
        } else {
          emit("SHOW_ERROR", result.error || "Failed to import classes");
        }
      });
      requestAnimationFrame(() => {
        if (mounted) {
          emit("LOAD_CLASSES");
          emit("CHECK_SELECTION");
        }
      });
      return () => {
        mounted = false;
        unsubscribeClasses();
        unsubscribeSelection();
        unsubscribeClassSaved();
        unsubscribeClassDeleted();
        unsubscribeClassUpdated();
        unsubscribeClassApplied();
        unsubscribeImportResult();
      };
    }, []);
    const handleSaveClass = async (name) => {
      if (!name.trim()) {
        emit("SHOW_ERROR", "Class name cannot be empty");
        return;
      }
      if (savedClasses.some((cls) => cls.name === name.trim())) {
        emit("SHOW_ERROR", "A class with this name already exists");
        return;
      }
      await emit("SAVE_CLASS", { name: name.trim() });
      setActiveMenu(null);
    };
    const filteredClasses = savedClasses.filter(
      (cls) => cls.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleApplyClass = async (classData) => {
      try {
        const classToApply = __spreadProps(__spreadValues({}, classData), {
          layoutMode: classData.layoutMode || "NONE"
          // Valore di default se non definito
        });
        await emit("APPLY_CLASS", classToApply);
        setActiveMenu(null);
        return true;
      } catch (error) {
        console.error("Error applying class:", error);
        emit("SHOW_ERROR", "An error occurred while applying the class");
        return false;
      }
    };
    const handleUpdate = (savedClass) => {
      setActiveMenu(null);
      setClassToUpdate(savedClass);
      setUpdateModalOpen(true);
    };
    const handleRename = (savedClass) => {
      setActiveMenu(null);
      setClassToRename(savedClass);
      setNewName(savedClass.name);
      setIsRenameModalOpen(true);
    };
    const handleDeleteClick = (classData) => {
      setClassToDelete(classData);
      setIsDeleteModalOpen(true);
    };
    const handleConfirmDelete = async () => {
      if (!classToDelete) return;
      await emit("DELETE_CLASS", classToDelete);
      setIsDeleteModalOpen(false);
      setClassToDelete(null);
    };
    const handleConfirmUpdate = async () => {
      if (!classToUpdate) return;
      await emit("UPDATE_CLASS", classToUpdate);
      setUpdateModalOpen(false);
      setClassToUpdate(null);
    };
    const handleConfirmRename = async () => {
      if (!classToRename) return;
      const trimmedName = newName.trim();
      console.log("Attempting to rename in UI:", classToRename.name, "to:", trimmedName);
      if (!trimmedName) {
        emit("SHOW_ERROR", "Class name cannot be empty");
        return;
      }
      if (trimmedName.length > 20) {
        emit("SHOW_ERROR", "Class name cannot be longer than 20 characters");
        return;
      }
      const existingClass = savedClasses.find(
        (cls) => cls.name.toLowerCase() === trimmedName.toLowerCase() && cls.name !== classToRename.name
      );
      if (existingClass) {
        console.log("Found duplicate in UI:", existingClass);
        emit("SHOW_ERROR", "A class with this name already exists");
        return;
      }
      console.log("Emitting RENAME_CLASS event");
      await emit("RENAME_CLASS", { oldName: classToRename.name, newName: trimmedName });
      setIsRenameModalOpen(false);
      setClassToRename(null);
      setNewName("");
    };
    const handleViewDetails = (savedClass) => {
      setActiveMenu(null);
      setClassToView(savedClass);
      setIsDetailsModalOpen(true);
    };
    const handleExportClasses = async () => {
      const exportResult = await emit("EXPORT_CLASSES");
      if (typeof exportResult === "string") {
        const blob = new Blob([exportResult], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `class-action-export-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.classaction`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        emit("SHOW_NOTIFICATION", "Classes exported successfully");
      }
    };
    const handleFileChange = async (event) => {
      const input = event.target;
      if (!input.files || input.files.length === 0) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e3) => {
        var _a;
        if (!((_a = e3.target) == null ? void 0 : _a.result)) return;
        const jsonString = e3.target.result;
        emit("IMPORT_CLASSES", jsonString);
        input.value = "";
      };
      reader.readAsText(file);
    };
    const handleSaveDialog = async (data) => {
      try {
        const blob = new Blob([data.fileContent], { type: "application/json" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = data.suggestedFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
        emit("SHOW_NOTIFICATION", `Successfully exported ${data.totalClasses} classes`);
      } catch (error) {
        console.error("Error saving file:", error);
        emit("SHOW_ERROR", "Failed to save export file");
      }
    };
    on2("SHOW_SAVE_DIALOG", handleSaveDialog);
    if (!isInitialized) {
      return /* @__PURE__ */ g("div", { className: "flex items-center justify-center h-screen" }, /* @__PURE__ */ g("div", { className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ g(Text, { size: "base" }, "Initializing plugin...")));
    }
    return /* @__PURE__ */ g("div", { className: "flex flex-col p-4 gap-4" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ g(Text, { size: "lg", weight: "bold", className: "text-[var(--figma-color-text)]" }, "Class Action")), /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g("div", { className: "flex-1" }, /* @__PURE__ */ g(
      Textbox,
      {
        placeholder: "Enter class name...",
        value: newClassName,
        onValueInput: setNewClassName,
        onKeyDown: (e3) => {
          if (e3.key === "Enter" && hasSelectedFrame) {
            handleSaveClass(newClassName);
          }
        },
        variant: "border"
      }
    )), /* @__PURE__ */ g(
      Button,
      {
        onClick: () => handleSaveClass(newClassName),
        disabled: !hasSelectedFrame,
        variant: "primary",
        size: "medium"
      },
      "Save class"
    )), /* @__PURE__ */ g("div", { className: "w-full" }, /* @__PURE__ */ g(
      "div",
      {
        className: "w-full bg-[var(--figma-color-bg-secondary)] border border-[var(--figma-color-border)] rounded-md"
      },
      /* @__PURE__ */ g(
        SearchTextbox,
        {
          placeholder: "Search classes...",
          value: searchQuery,
          onValueInput: setSearchQuery
        }
      )
    )), /* @__PURE__ */ g("div", { className: "flex flex-col gap-2" }, filteredClasses.length > 0 ? filteredClasses.map((savedClass) => /* @__PURE__ */ g(
      "div",
      {
        key: savedClass.name,
        className: "relative flex flex-col p-2 border rounded-md",
        style: { borderColor: "var(--figma-color-border)" }
      },
      /* @__PURE__ */ g("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ g(Text, null, savedClass.name), /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g(
        Button,
        {
          onClick: () => handleApplyClass(savedClass),
          variant: "primary",
          size: "medium"
        },
        "Apply"
      ), /* @__PURE__ */ g(
        IconButton,
        {
          onClick: (e3) => {
            e3.stopPropagation();
            setActiveMenu(activeMenu === savedClass.name ? null : savedClass.name);
          },
          variant: "secondary",
          size: "medium"
        },
        /* @__PURE__ */ g(EllipsisIcon, null)
      ))),
      activeMenu === savedClass.name && /* @__PURE__ */ g(
        "div",
        {
          ref: dropdownRef,
          className: "absolute right-0 top-full p-1 mt-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg",
          style: {
            backgroundColor: "var(--figma-color-bg)",
            border: "1px solid var(--figma-color-border)"
          }
        },
        /* @__PURE__ */ g("div", { className: "flex flex-col gap-1" }, /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleViewDetails(savedClass),
            variant: "secondary",
            icon: /* @__PURE__ */ g(InfoIcon, null)
          },
          "Info"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleRename(savedClass),
            variant: "secondary",
            icon: /* @__PURE__ */ g(RenameIcon, null)
          },
          "Rename"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleUpdate(savedClass),
            variant: "secondary",
            icon: /* @__PURE__ */ g(UpdateIcon, null)
          },
          "Update"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleDeleteClick(savedClass),
            variant: "danger",
            icon: /* @__PURE__ */ g(TrashIcon, null)
          },
          "Delete"
        ))
      )
    )) : /* @__PURE__ */ g(Text, { variant: "muted" }, "No classes found")), /* @__PURE__ */ g("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ g(Text, { size: "base", weight: "medium" }, "Saved Classes"), /* @__PURE__ */ g("div", { className: "flex gap-2" }, /* @__PURE__ */ g("div", null, /* @__PURE__ */ g(
      "input",
      {
        type: "file",
        accept: ".classaction,application/json",
        onChange: handleFileChange,
        style: { display: "none" },
        id: "import-input"
      }
    ), /* @__PURE__ */ g(
      Button,
      {
        variant: "secondary",
        size: "medium",
        onClick: () => {
          var _a;
          return (_a = document.getElementById("import-input")) == null ? void 0 : _a.click();
        }
      },
      /* @__PURE__ */ g("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ g(ImportIcon, null), /* @__PURE__ */ g("span", null, "Import"))
    )), /* @__PURE__ */ g(
      Button,
      {
        onClick: handleExportClasses,
        variant: "secondary",
        size: "medium"
      },
      /* @__PURE__ */ g("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ g(ExportIcon, null), /* @__PURE__ */ g("span", null, "Export"))
    ))), /* @__PURE__ */ g(
      ConfirmDialog,
      {
        isOpen: isDeleteModalOpen,
        onClose: () => setIsDeleteModalOpen(false),
        onConfirm: handleConfirmDelete,
        title: "Delete Class",
        message: `Are you sure you want to delete the class "${classToDelete == null ? void 0 : classToDelete.name}"?`,
        confirmText: "Delete",
        variant: "danger"
      }
    ), /* @__PURE__ */ g(
      ConfirmDialog,
      {
        isOpen: isUpdateModalOpen,
        onClose: () => setUpdateModalOpen(false),
        onConfirm: handleConfirmUpdate,
        title: "Update Class",
        message: "Do you want to update this class with the current frame dimensions?",
        confirmText: "Update",
        variant: "info"
      }
    ), /* @__PURE__ */ g(
      ConfirmDialog,
      {
        isOpen: isRenameModalOpen,
        onClose: () => {
          setIsRenameModalOpen(false);
          setClassToRename(null);
          setNewName("");
        },
        onConfirm: handleConfirmRename,
        title: "Rename Class",
        variant: "info",
        message: "Enter new name for the selected class:"
      },
      /* @__PURE__ */ g("div", { className: "mt-2" }, /* @__PURE__ */ g(
        Textbox,
        {
          value: newName,
          onValueInput: setNewName,
          variant: "border",
          placeholder: "Enter new name...",
          onKeyDown: (e3) => {
            if (e3.key === "Enter") {
              handleConfirmRename();
            }
          }
        }
      ))
    ), /* @__PURE__ */ g(
      ClassDetailsModal,
      {
        isOpen: isDetailsModalOpen,
        onClose: () => {
          setIsDetailsModalOpen(false);
          setClassToView(null);
        },
        classData: classToView
      }
    ), isImportModalOpen && /* @__PURE__ */ g(
      ConfirmDialog,
      {
        isOpen: isImportModalOpen,
        onClose: () => {
          setIsImportModalOpen(false);
          setImportConflicts([]);
        },
        title: "Import Conflicts",
        message: `The following classes already exist:
${importConflicts.join(", ")}

Do you want to overwrite them?`,
        onConfirm: () => {
          setIsImportModalOpen(false);
          setImportConflicts([]);
        },
        confirmText: "Overwrite",
        variant: "warning"
      }
    ));
  }
  var InfoIcon, UpdateIcon, RenameIcon, TrashIcon, EllipsisIcon, ImportIcon, ExportIcon, ui_default;
  var init_ui = __esm({
    "src/ui.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_lib2();
      init_lib();
      init_output();
      init_Modal();
      init_common();
      init_DropdownItem();
      InfoIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M8 7.5V11.5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("circle", { cx: "8", cy: "5", r: "1", fill: "currentColor" }));
      UpdateIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M8 5L10.5 2.5L8 0", stroke: "currentColor", "stroke-width": "1.5" }));
      RenameIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M11.5 2.5L13.5 4.5M8 13H14M2 11L10.5 2.5L12.5 4.5L4 13H2V11Z", stroke: "currentColor", "stroke-width": "1.5" }));
      TrashIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M2.5 4.5H13.5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M12.5 4.5L11.9359 12.6575C11.8889 13.3819 11.2845 14 10.5575 14H5.44248C4.71553 14 4.11112 13.3819 4.06413 12.6575L3.5 4.5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M5.5 4.5V3C5.5 2.17157 6.17157 1.5 7 1.5H9C9.82843 1.5 10.5 2.17157 10.5 3V4.5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M6.5 7V11", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M9.5 7V11", stroke: "currentColor", "stroke-width": "1.5" }));
      EllipsisIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z", fill: "currentColor" }), /* @__PURE__ */ g("path", { d: "M3 9C3.55228 9 4 8.55228 4 8C4 7.44772 3.55228 7 3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9Z", fill: "currentColor" }), /* @__PURE__ */ g("path", { d: "M13 9C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7C12.4477 7 12 7.44772 12 8C12 8.55228 12.4477 9 13 9Z", fill: "currentColor" }));
      ImportIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M8 2V11M8 11L5 8M8 11L11 8", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M3 13H13", stroke: "currentColor", "stroke-width": "1.5" }));
      ExportIcon = () => /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M8 11V2M8 2L5 5M8 2L11 5", stroke: "currentColor", "stroke-width": "1.5" }), /* @__PURE__ */ g("path", { d: "M3 13H13", stroke: "currentColor", "stroke-width": "1.5" }));
      ui_default = render(Plugin);
    }
  });

  // <stdin>
  var rootNode = document.getElementById("create-figma-plugin");
  var modules = { "src/main.ts--default": (init_ui(), __toCommonJS(ui_exports))["default"] };
  var commandId = __FIGMA_COMMAND__ === "" ? "src/main.ts--default" : __FIGMA_COMMAND__;
  if (typeof modules[commandId] === "undefined") {
    throw new Error(
      "No UI defined for command `" + commandId + "`"
    );
  }
  modules[commandId](rootNode, __SHOW_UI_DATA__);
})();
