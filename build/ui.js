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

  // node_modules/@create-figma-plugin/utilities/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
      init_events();
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/6f9507fa-a437-442d-a435-9d7f4f32fd4a/base.js
  var init_base = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/6f9507fa-a437-442d-a435-9d7f4f32fd4a/base.js"() {
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
      init_render();
    }
  });

  // ../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/f9fe5962-d839-4d46-bb37-b628e2293835/output.js
  var init_output = __esm({
    "../../../../private/var/folders/ts/fmpm0j6d07sgg0yz71ypxsf80000gn/T/f9fe5962-d839-4d46-bb37-b628e2293835/output.js"() {
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
  font-family: Geist, sans-serif;
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
  font-family: Geist Mono, monospace;
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

:root {
  font-family: 'Geist', sans-serif !important;
}

code, pre {
  font-family: 'Geist Mono', monospace !important;
}

/* Ensure buttons use Geist */

button {
  font-family: 'Geist', sans-serif !important;
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

.bottom-full {
  bottom: 100%;
}

.left-2 {
  left: 0.5rem;
}

.right-0 {
  right: 0px;
}

.right-2 {
  right: 0.5rem;
}

.right-4 {
  right: 1rem;
}

.right-8 {
  right: 2rem;
}

.top-1\\/2 {
  top: 50%;
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

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
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

.mt-24 {
  margin-top: 6rem;
}

.mt-4 {
  margin-top: 1rem;
}

.block {
  display: block;
}

.inline-block {
  display: inline-block;
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

.h-0 {
  height: 0px;
}

.h-10 {
  height: 2.5rem;
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

.h-8 {
  height: 2rem;
}

.h-9 {
  height: 2.25rem;
}

.h-\\[32px\\] {
  height: 32px;
}

.h-full {
  height: 100%;
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

.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.-translate-y-2 {
  --tw-translate-y: -0.5rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
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

.transform {
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

.border-none {
  border-style: none;
}

.border-\\[\\#333\\] {
  --tw-border-opacity: 1;
  border-color: rgb(51 51 51 / var(--tw-border-opacity, 1));
}

.border-\\[\\#E6E6E6\\] {
  --tw-border-opacity: 1;
  border-color: rgb(230 230 230 / var(--tw-border-opacity, 1));
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

.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
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

.pl-8 {
  padding-left: 2rem;
}

.pr-10 {
  padding-right: 2.5rem;
}

.pr-8 {
  padding-right: 2rem;
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
  font-family: Geist Mono, monospace;
}

.font-sans {
  font-family: Geist, sans-serif;
}

.text-\\[13px\\] {
  font-size: 13px;
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

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-\\[var\\(--font-geist-mono\\)\\] {
  font-weight: var(--font-geist-mono);
}

.font-\\[var\\(--font-geist-sans\\)\\] {
  font-weight: var(--font-geist-sans);
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

.font-semibold {
  font-weight: 600;
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

.text-\\[var\\(--figma-color-text-brand\\)\\] {
  color: var(--figma-color-text-brand);
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

.text-\\[var\\(--figma-color-text-tertiary\\)\\] {
  color: var(--figma-color-text-tertiary);
}

.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}

.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
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

.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.ring-1 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.ring-blue-500 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1));
}

.blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-150 {
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Override create-figma-plugin default fonts */

.placeholder\\:text-\\[var\\(--figma-color-text-tertiary\\)\\]::-moz-placeholder {
  color: var(--figma-color-text-tertiary);
}

.placeholder\\:text-\\[var\\(--figma-color-text-tertiary\\)\\]::placeholder {
  color: var(--figma-color-text-tertiary);
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

.hover\\:text-\\[var\\(--figma-color-text\\)\\]:hover {
  color: var(--figma-color-text);
}

.hover\\:text-gray-600:hover {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}

.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.focus\\:border-\\[var\\(--figma-color-border-brand-strong\\)\\]:focus {
  border-color: var(--figma-color-border-brand-strong);
}

.focus\\:bg-\\[var\\(--figma-color-bg\\)\\]:focus {
  background-color: var(--figma-color-bg);
}

.focus\\:bg-\\[var\\(--figma-color-bg-secondary\\)\\]:focus {
  background-color: var(--figma-color-bg-secondary);
}

.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:ring-1:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:ring-\\[var\\(--figma-color-border-brand-strong\\)\\]:focus {
  --tw-ring-color: var(--figma-color-border-brand-strong);
}

.focus\\:ring-blue-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1));
}

.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}

.dark\\:border-\\[\\#444444\\]:is(.figma-dark *) {
  --tw-border-opacity: 1;
  border-color: rgb(68 68 68 / var(--tw-border-opacity, 1));
}

.dark\\:bg-\\[\\#2C2C2C\\]:is(.figma-dark *) {
  --tw-bg-opacity: 1;
  background-color: rgb(44 44 44 / var(--tw-bg-opacity, 1));
}
`;
        document.head.append(element);
      }
    }
  });

  // src/components/common/Text.tsx
  function Text({
    children,
    size = "base",
    weight = "normal",
    variant = "default",
    className = "",
    mono = false
  }) {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg"
    };
    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold"
    };
    const variantClasses = {
      muted: "text-[var(--figma-color-text-secondary)]",
      default: "text-[var(--figma-color-text)]"
    };
    return /* @__PURE__ */ g("span", { className: `
      ${sizeClasses[size]}
      ${weightClasses[weight]}
      ${variantClasses[variant]}
      ${mono ? "font-mono" : "font-sans"}
      ${className}
    `.trim() }, children);
  }
  var init_Text = __esm({
    "src/components/common/Text.tsx"() {
      "use strict";
      init_preact_module();
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
    const baseClasses = "inline-flex items-center justify-center transition-colors font-medium";
    const sizeClasses = {
      small: "px-2 text-xs rounded-md h-7",
      medium: "px-3 text-xs rounded-md h-8",
      large: "px-4 text-sm rounded-lg h-9"
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

  // src/components/common/Icon.tsx
  function Icon(_a) {
    var _b = _a, {
      icon: LucideIcon,
      size = "md",
      className
    } = _b, props = __objRest(_b, [
      "icon",
      "size",
      "className"
    ]);
    const iconSize = typeof size === "string" ? sizeMap[size] : size;
    return /* @__PURE__ */ g(
      LucideIcon,
      __spreadValues({
        size: iconSize,
        className: twMerge(
          clsx(
            "inline-block flex-shrink-0",
            "text-[var(--figma-color-text)]",
            "transition-colors duration-200",
            className
          )
        )
      }, props)
    );
  }
  var sizeMap;
  var init_Icon = __esm({
    "src/components/common/Icon.tsx"() {
      "use strict";
      init_preact_module();
      init_clsx();
      init_bundle_mjs();
      sizeMap = {
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32
      };
    }
  });

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase, mergeClasses;
  var init_utils = __esm({
    "node_modules/lucide-react/dist/esm/shared/src/utils.js"() {
      toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      mergeClasses = (...classes) => classes.filter((className, index, array) => {
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
      }).join(" ").trim();
    }
  });

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes;
  var init_defaultAttributes = __esm({
    "node_modules/lucide-react/dist/esm/defaultAttributes.js"() {
      defaultAttributes = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      };
    }
  });

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon2;
  var init_Icon2 = __esm({
    "node_modules/lucide-react/dist/esm/Icon.js"() {
      init_compat_module();
      init_defaultAttributes();
      init_utils();
      Icon2 = D3(
        (_a, ref) => {
          var _b = _a, {
            color = "currentColor",
            size = 24,
            strokeWidth = 2,
            absoluteStrokeWidth,
            className = "",
            children,
            iconNode
          } = _b, rest = __objRest(_b, [
            "color",
            "size",
            "strokeWidth",
            "absoluteStrokeWidth",
            "className",
            "children",
            "iconNode"
          ]);
          return g(
            "svg",
            __spreadValues(__spreadProps(__spreadValues({
              ref
            }, defaultAttributes), {
              width: size,
              height: size,
              stroke: color,
              strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
              className: mergeClasses("lucide", className)
            }), rest),
            [
              ...iconNode.map(([tag, attrs]) => g(tag, attrs)),
              ...Array.isArray(children) ? children : [children]
            ]
          );
        }
      );
    }
  });

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon;
  var init_createLucideIcon = __esm({
    "node_modules/lucide-react/dist/esm/createLucideIcon.js"() {
      init_compat_module();
      init_utils();
      init_Icon2();
      createLucideIcon = (iconName, iconNode) => {
        const Component2 = D3(
          (_a, ref) => {
            var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
            return g(Icon2, __spreadValues({
              ref,
              iconNode,
              className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className)
            }, props));
          }
        );
        Component2.displayName = `${iconName}`;
        return Component2;
      };
    }
  });

  // node_modules/lucide-react/dist/esm/icons/download.js
  var __iconNode, Download;
  var init_download = __esm({
    "node_modules/lucide-react/dist/esm/icons/download.js"() {
      init_createLucideIcon();
      __iconNode = [
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
        ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
        ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
      ];
      Download = createLucideIcon("Download", __iconNode);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/ellipsis.js
  var __iconNode2, Ellipsis;
  var init_ellipsis = __esm({
    "node_modules/lucide-react/dist/esm/icons/ellipsis.js"() {
      init_createLucideIcon();
      __iconNode2 = [
        ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
        ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
        ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
      ];
      Ellipsis = createLucideIcon("Ellipsis", __iconNode2);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/info.js
  var __iconNode3, Info;
  var init_info = __esm({
    "node_modules/lucide-react/dist/esm/icons/info.js"() {
      init_createLucideIcon();
      __iconNode3 = [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["path", { d: "M12 16v-4", key: "1dtifu" }],
        ["path", { d: "M12 8h.01", key: "e9boi3" }]
      ];
      Info = createLucideIcon("Info", __iconNode3);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/layers.js
  var __iconNode4, Layers;
  var init_layers = __esm({
    "node_modules/lucide-react/dist/esm/icons/layers.js"() {
      init_createLucideIcon();
      __iconNode4 = [
        [
          "path",
          {
            d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
            key: "zw3jo"
          }
        ],
        [
          "path",
          {
            d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
            key: "1wduqc"
          }
        ],
        [
          "path",
          {
            d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
            key: "kqbvx6"
          }
        ]
      ];
      Layers = createLucideIcon("Layers", __iconNode4);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode5, RefreshCw;
  var init_refresh_cw = __esm({
    "node_modules/lucide-react/dist/esm/icons/refresh-cw.js"() {
      init_createLucideIcon();
      __iconNode5 = [
        ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
        ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
        ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
        ["path", { d: "M8 16H3v5", key: "1cv678" }]
      ];
      RefreshCw = createLucideIcon("RefreshCw", __iconNode5);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/search.js
  var __iconNode6, Search;
  var init_search = __esm({
    "node_modules/lucide-react/dist/esm/icons/search.js"() {
      init_createLucideIcon();
      __iconNode6 = [
        ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
        ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
      ];
      Search = createLucideIcon("Search", __iconNode6);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/square-pen.js
  var __iconNode7, SquarePen;
  var init_square_pen = __esm({
    "node_modules/lucide-react/dist/esm/icons/square-pen.js"() {
      init_createLucideIcon();
      __iconNode7 = [
        ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
        [
          "path",
          {
            d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
            key: "ohrbg2"
          }
        ]
      ];
      SquarePen = createLucideIcon("SquarePen", __iconNode7);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/trash.js
  var __iconNode8, Trash;
  var init_trash = __esm({
    "node_modules/lucide-react/dist/esm/icons/trash.js"() {
      init_createLucideIcon();
      __iconNode8 = [
        ["path", { d: "M3 6h18", key: "d0wm0j" }],
        ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
        ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }]
      ];
      Trash = createLucideIcon("Trash", __iconNode8);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/upload.js
  var __iconNode9, Upload;
  var init_upload = __esm({
    "node_modules/lucide-react/dist/esm/icons/upload.js"() {
      init_createLucideIcon();
      __iconNode9 = [
        ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
        ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
        ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
      ];
      Upload = createLucideIcon("Upload", __iconNode9);
    }
  });

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode10, X2;
  var init_x = __esm({
    "node_modules/lucide-react/dist/esm/icons/x.js"() {
      init_createLucideIcon();
      __iconNode10 = [
        ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
        ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
      ];
      X2 = createLucideIcon("X", __iconNode10);
    }
  });

  // node_modules/lucide-react/dist/esm/lucide-react.js
  var init_lucide_react = __esm({
    "node_modules/lucide-react/dist/esm/lucide-react.js"() {
      init_ellipsis();
      init_layers();
      init_square_pen();
      init_download();
      init_info();
      init_refresh_cw();
      init_search();
      init_trash();
      init_upload();
      init_x();
    }
  });

  // src/components/common/icons.ts
  var init_icons = __esm({
    "src/components/common/icons.ts"() {
      "use strict";
      init_Icon();
      init_lucide_react();
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
  function toKebabCase2(str) {
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
    ), /* @__PURE__ */ g("div", { className: "relative z-10 w-[300px] bg-[var(--figma-color-bg)] rounded-lg shadow-lg" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between py-3 px-4 border-b border-[var(--figma-color-border)]" }, /* @__PURE__ */ g("div", null, /* @__PURE__ */ g(Text, { size: "lg", weight: "bold" }, title)), /* @__PURE__ */ g(
      IconButton,
      {
        onClick: onClose,
        variant: "secondary",
        size: "small"
      },
      /* @__PURE__ */ g(Icon, { icon: X2, size: "sm" })
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
    const [resolvedColors, setResolvedColors] = h2({});
    y2(() => {
      var _a, _b;
      setResolvedColors({});
      const styleIds = {};
      if ((_a = classData.styleReferences) == null ? void 0 : _a.fillStyleId) {
        const fillStyleId = String(classData.styleReferences.fillStyleId);
        if (fillStyleId.startsWith("S:")) {
          styleIds.backgroundColor = fillStyleId;
        }
      }
      if ((_b = classData.styleReferences) == null ? void 0 : _b.strokeStyleId) {
        const strokeStyleId = String(classData.styleReferences.strokeStyleId);
        if (strokeStyleId.startsWith("S:")) {
          styleIds.borderColor = strokeStyleId;
        }
      }
      if (Object.keys(styleIds).length > 0) {
        const removeListener = on2("RESOLVED_STYLE_COLORS", (msg) => {
          setResolvedColors(msg.resolvedColors);
        });
        emit("RESOLVE_STYLE_COLORS", { styleIds });
        return () => removeListener();
      }
    }, [classData]);
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
        styleProps.backgroundColor = resolvedColors.backgroundColor || `[style-id: ${fillStyleId}]`;
      }
      if (((_c = classData.styles) == null ? void 0 : _c.strokes) && Array.isArray(classData.styles.strokes) && classData.styles.strokes.length > 0) {
        styleProps.borderColor = classData.styles.strokes[0];
      } else if ((_d = classData.styleReferences) == null ? void 0 : _d.strokeStyleId) {
        const strokeStyleId = String(classData.styleReferences.strokeStyleId);
        styleProps.borderColor = resolvedColors.borderColor || `[style-id: ${strokeStyleId}]`;
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
${definedProperties.map(([key, value]) => `  ${toKebabCase2(key)}: ${formatCSSValue(value)};`).join("\n")}
}`;
      return /* @__PURE__ */ g("div", { className: "mb-4" }, /* @__PURE__ */ g("div", { className: "bg-[#1e1e1e] rounded-lg overflow-hidden" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between px-4 py-2 border-b border-[#333]" }, /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g("span", { className: "text-[#f39c12] text-xs uppercase" }, "css"), /* @__PURE__ */ g("span", { className: "text-[#666] text-xs" }, "Styles")), /* @__PURE__ */ g(
        Button,
        {
          onClick: () => copyToClipboard(cssCode),
          variant: "secondary",
          size: "small"
        },
        "COPY"
      )), /* @__PURE__ */ g("div", { className: "p-4 font-mono text-xs" }, /* @__PURE__ */ g("div", { className: "text-[#e6e6e6]" }, /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, "."), /* @__PURE__ */ g("span", { className: "text-[#cc7832]" }, classData.name), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, " ", `{`)), definedProperties.map(([key, value]) => /* @__PURE__ */ g("div", { key, className: "ml-4" }, /* @__PURE__ */ g("span", { className: "text-[#6a8759]" }, toKebabCase2(key)), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, ":"), /* @__PURE__ */ g("span", { className: "text-[#cc7832]" }, " ", formatCSSValue(value)), /* @__PURE__ */ g("span", { className: "text-[#9b703f]" }, ";"))), /* @__PURE__ */ g("div", { className: "text-[#9b703f]" }, `}`))));
    };
    return /* @__PURE__ */ g(Modal, { isOpen, onClose, title: "Info" }, /* @__PURE__ */ g("div", { className: "max-h-[70vh] overflow-y-auto" }, /* @__PURE__ */ g(CodeBlock, { properties: allProperties })));
  }
  var init_Modal = __esm({
    "src/components/Modal.tsx"() {
      "use strict";
      init_preact_module();
      init_Text();
      init_lib();
      init_common();
      init_hooks_module();
      init_icons();
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

  // src/components/common/styles.ts
  var inputBaseStyles;
  var init_styles = __esm({
    "src/components/common/styles.ts"() {
      "use strict";
      inputBaseStyles = `
  w-full h-8 px-3
  bg-[var(--figma-color-bg-secondary)]
  border border-[var(--figma-color-border)]
  rounded-md
  text-xs
  font-sans
  text-[var(--figma-color-text)]
  placeholder:text-[var(--figma-color-text-tertiary)]
  focus:outline-none
  focus:border-[var(--figma-color-border-brand-strong)]
  focus:ring-1
  focus:ring-[var(--figma-color-border-brand-strong)]
  focus:bg-[var(--figma-color-bg-secondary)]
  disabled:opacity-50
  disabled:cursor-not-allowed
  transition-colors
`;
    }
  });

  // src/components/SearchInput.tsx
  function SearchInput({
    value,
    onValueInput,
    placeholder = "Search...",
    disabled = false,
    className = "",
    autoFocus = false,
    onKeyDown,
    icon = true,
    iconPosition = "left",
    showClearButton = true,
    onClear
  }) {
    const handleClear = q2(() => {
      onValueInput("");
      onClear == null ? void 0 : onClear();
    }, [onValueInput, onClear]);
    return /* @__PURE__ */ g("div", { className: `relative flex items-center ${className}` }, icon && iconPosition === "left" && /* @__PURE__ */ g("div", { className: "absolute left-2 text-[var(--figma-color-text-tertiary)]" }, /* @__PURE__ */ g(Search, { size: 16 })), /* @__PURE__ */ g(
      "input",
      {
        type: "text",
        value,
        onInput: (e3) => onValueInput(e3.target.value),
        placeholder,
        disabled,
        autoFocus,
        onKeyDown,
        className: `
          ${inputBaseStyles}
          ${icon && iconPosition === "left" ? "pl-8" : ""}
          ${showClearButton && value || icon && iconPosition === "right" ? "pr-8" : ""}
        `
      }
    ), icon && iconPosition === "right" && /* @__PURE__ */ g("div", { className: "absolute right-2 text-[var(--figma-color-text-tertiary)]" }, /* @__PURE__ */ g(Search, { size: 16 })), showClearButton && value && /* @__PURE__ */ g(
      "button",
      {
        onClick: handleClear,
        className: `
            absolute
            ${iconPosition === "right" ? "right-8" : "right-2"}
            p-0.5
            text-[var(--figma-color-text-tertiary)]
            hover:text-[var(--figma-color-text)]
            focus:outline-none
            transition-colors
          `,
        type: "button"
      },
      /* @__PURE__ */ g(X2, { size: 16 })
    ));
  }
  var init_SearchInput = __esm({
    "src/components/SearchInput.tsx"() {
      "use strict";
      init_preact_module();
      init_hooks_module();
      init_styles();
      init_icons();
    }
  });

  // src/components/TextInput.tsx
  function TextInput({
    value,
    onValueInput,
    placeholder = "",
    disabled = false,
    className = "",
    autoFocus = false,
    onKeyDown,
    variant = "default"
  }) {
    return /* @__PURE__ */ g(
      "input",
      {
        type: "text",
        value,
        onInput: (e3) => onValueInput(e3.target.value),
        placeholder,
        disabled,
        autoFocus,
        onKeyDown,
        className: `
        ${inputBaseStyles}
        ${variant === "border" ? "" : "border-none"}
        ${className}
      `
      }
    );
  }
  var init_TextInput = __esm({
    "src/components/TextInput.tsx"() {
      "use strict";
      init_preact_module();
      init_styles();
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
    const [isApplyAllModalOpen, setIsApplyAllModalOpen] = h2(false);
    const [applyAllAnalysis, setApplyAllAnalysis] = h2(null);
    const [showSearch, setShowSearch] = h2(false);
    const dropdownRef = A2(null);
    const [dropdownPosition, setDropdownPosition] = h2("bottom");
    const calculateDropdownPosition = q2((buttonElement) => {
      const buttonRect = buttonElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }, []);
    const handleMenuClick = (e3, menuName) => {
      e3.stopPropagation();
      if (e3.currentTarget instanceof HTMLElement) {
        calculateDropdownPosition(e3.currentTarget);
      }
      setActiveMenu(activeMenu === menuName ? null : menuName);
    };
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
      const unsubscribeClassesAppliedAll = on2("CLASSES_APPLIED_ALL", (_result) => {
      });
      const unsubscribeImportResult = on2("IMPORT_RESULT", (result) => {
        if (result.success) {
          emit("LOAD_CLASSES");
        } else {
          emit("SHOW_ERROR", result.error || "Failed to import classes");
        }
      });
      const unsubscribeAnalysisResult = on2("APPLY_ALL_ANALYSIS_RESULT", (result) => {
        if (!mounted) return;
        setApplyAllAnalysis(result);
        setIsApplyAllModalOpen(true);
      });
      const unsubscribeSaveDialog = on2("SHOW_SAVE_DIALOG", async (data) => {
        if (!mounted) return;
        try {
          const blob = new Blob([data.fileContent], { type: "application/json" });
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = data.suggestedFileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(downloadLink.href);
        } catch (error) {
          console.error("Error saving file:", error);
          emit("SHOW_ERROR", "Failed to save export file");
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
        unsubscribeClassesAppliedAll();
        unsubscribeImportResult();
        unsubscribeAnalysisResult();
        unsubscribeSaveDialog();
      };
    }, []);
    const handleSaveClass = async (name) => {
      if (!name.trim()) {
        emit("SHOW_ERROR", "Class name cannot be empty");
        return;
      }
      if (savedClasses.some((cls) => cls.name.toLowerCase() === name.trim().toLowerCase())) {
        emit("SHOW_ERROR", "A class with this name already exists (names are case-insensitive)");
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
        (cls) => cls.name.toLowerCase() === trimmedName.toLowerCase() && cls.name.toLowerCase() !== classToRename.name.toLowerCase()
      );
      if (existingClass) {
        console.log("Found duplicate in UI:", existingClass);
        emit("SHOW_ERROR", "A class with this name already exists (names are case-insensitive)");
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
      await emit("EXPORT_CLASSES");
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
    const handleApplyAllClick = async () => {
      try {
        await emit("ANALYZE_APPLY_ALL");
      } catch (error) {
        console.error("Error analyzing frames:", error);
        emit("SHOW_ERROR", "An error occurred while analyzing frames");
      }
    };
    const handleConfirmApplyAll = async () => {
      try {
        await emit("APPLY_ALL_MATCHING_CLASSES");
        setIsApplyAllModalOpen(false);
        setApplyAllAnalysis(null);
      } catch (error) {
        console.error("Error applying all matching classes:", error);
        emit("SHOW_ERROR", "An error occurred while applying classes");
      }
    };
    if (!isInitialized) {
      return /* @__PURE__ */ g("div", { className: "flex items-center justify-center h-screen" }, /* @__PURE__ */ g("div", { className: "flex flex-col items-center gap-2" }, /* @__PURE__ */ g(Text, { size: "base" }, "Initializing plugin...")));
    }
    return /* @__PURE__ */ g("div", { className: "flex flex-col p-4 gap-4" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ g(
      Text,
      {
        size: "lg",
        weight: "bold",
        className: "text-lg"
      },
      "Class Action"
    )), /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g("div", { className: "flex-1" }, /* @__PURE__ */ g(
      TextInput,
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
    )), /* @__PURE__ */ g("div", { className: "flex flex-col gap-2" }, /* @__PURE__ */ g("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ g(Text, { size: "base", weight: "medium" }, "Saved Classes"), /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g(
      IconButton,
      {
        onClick: (e3) => {
          e3.stopPropagation();
          setActiveMenu(activeMenu === "actions" ? null : "actions");
        },
        variant: "secondary",
        size: "medium"
      },
      /* @__PURE__ */ g(Ellipsis, { size: 16 })
    ), activeMenu === "actions" && /* @__PURE__ */ g(
      "div",
      {
        ref: dropdownRef,
        className: "absolute right-4 mt-24 p-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg",
        style: {
          backgroundColor: "var(--figma-color-bg)",
          border: "1px solid var(--figma-color-border)"
        }
      },
      /* @__PURE__ */ g("div", { className: "flex flex-col gap-1" }, /* @__PURE__ */ g(
        DropdownItem,
        {
          onClick: () => {
            if (showSearch) {
              setSearchQuery("");
            }
            setShowSearch(!showSearch);
            setActiveMenu(null);
          },
          variant: "secondary",
          icon: /* @__PURE__ */ g(Search, { size: 16 })
        },
        "Search"
      ), /* @__PURE__ */ g(
        DropdownItem,
        {
          onClick: () => {
            var _a;
            (_a = document.getElementById("import-input")) == null ? void 0 : _a.click();
            setActiveMenu(null);
          },
          variant: "secondary",
          icon: /* @__PURE__ */ g(Upload, { size: 16 })
        },
        "Import"
      ), /* @__PURE__ */ g(
        DropdownItem,
        {
          onClick: () => {
            handleExportClasses();
            setActiveMenu(null);
          },
          variant: "secondary",
          icon: /* @__PURE__ */ g(Download, { size: 16 })
        },
        "Export"
      ), /* @__PURE__ */ g(
        DropdownItem,
        {
          onClick: () => {
            handleApplyAllClick();
            setActiveMenu(null);
          },
          variant: "secondary",
          icon: /* @__PURE__ */ g(Layers, { size: 16 })
        },
        "Apply All"
      ))
    ))), /* @__PURE__ */ g("div", { className: `
          transform transition-all duration-300 ease-in-out
          ${showSearch ? "translate-y-0 opacity-100 h-10" : "-translate-y-2 opacity-0 h-0 overflow-hidden"}
        ` }, /* @__PURE__ */ g("div", { className: "flex items-center gap-2 mb-2" }, /* @__PURE__ */ g("div", { className: "flex-1" }, /* @__PURE__ */ g(
      SearchInput,
      {
        placeholder: "Search classes...",
        value: searchQuery,
        onValueInput: setSearchQuery
      }
    )), /* @__PURE__ */ g(
      IconButton,
      {
        onClick: () => {
          setSearchQuery("");
          setShowSearch(false);
        },
        variant: "secondary",
        size: "medium"
      },
      /* @__PURE__ */ g("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, /* @__PURE__ */ g("path", { d: "M12 4L4 12M4 4l8 8", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }))
    ))), filteredClasses.length > 0 ? filteredClasses.map((savedClass) => /* @__PURE__ */ g(
      "div",
      {
        key: savedClass.name,
        className: "relative flex flex-col p-2 border rounded-md",
        style: { borderColor: "var(--figma-color-border)" }
      },
      /* @__PURE__ */ g("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ g(Text, { mono: true, size: "xs" }, savedClass.name), /* @__PURE__ */ g("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ g(
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
          onClick: (e3) => handleMenuClick(e3, savedClass.name),
          variant: "secondary",
          size: "medium"
        },
        /* @__PURE__ */ g(Ellipsis, { size: 16 })
      ))),
      activeMenu === savedClass.name && /* @__PURE__ */ g(
        "div",
        {
          ref: dropdownRef,
          className: `absolute right-0 p-1 rounded-md z-10 overflow-hidden whitespace-nowrap shadow-lg ${dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"}`,
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
            icon: /* @__PURE__ */ g(Info, { size: 16 })
          },
          "Info"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleRename(savedClass),
            variant: "secondary",
            icon: /* @__PURE__ */ g(SquarePen, { size: 16 })
          },
          "Rename"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleUpdate(savedClass),
            variant: "secondary",
            icon: /* @__PURE__ */ g(RefreshCw, { size: 16 })
          },
          "Update"
        ), /* @__PURE__ */ g(
          DropdownItem,
          {
            onClick: () => handleDeleteClick(savedClass),
            variant: "danger",
            icon: /* @__PURE__ */ g(Trash, { size: 16 })
          },
          "Delete"
        ))
      )
    )) : /* @__PURE__ */ g(Text, { variant: "muted" }, "No classes found")), /* @__PURE__ */ g(
      "input",
      {
        type: "file",
        accept: ".classaction,application/json",
        onChange: handleFileChange,
        style: { display: "none" },
        id: "import-input"
      }
    ), /* @__PURE__ */ g(
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
        message: "Enter new name for the selected class:",
        confirmText: "Rename"
      },
      /* @__PURE__ */ g("div", { className: "mt-2" }, /* @__PURE__ */ g(
        TextInput,
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
    ), /* @__PURE__ */ g(
      ConfirmDialog,
      {
        isOpen: isApplyAllModalOpen,
        onClose: () => {
          setIsApplyAllModalOpen(false);
          setApplyAllAnalysis(null);
        },
        onConfirm: handleConfirmApplyAll,
        title: "Apply All Classes",
        message: applyAllAnalysis ? `This will apply matching classes to ${applyAllAnalysis.matchingFrames} out of ${applyAllAnalysis.totalFrames} frames in the current page. Continue?` : "Analyzing frames...",
        confirmText: "Apply",
        variant: "info"
      }
    ));
  }
  var ui_default;
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
      init_SearchInput();
      init_TextInput();
      init_icons();
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
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/download.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/ellipsis.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/info.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/layers.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/refresh-cw.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/search.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/square-pen.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/trash.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/upload.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/x.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
