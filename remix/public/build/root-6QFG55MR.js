import {
  stegaClean
} from "/build/_shared/chunk-YFGEKUM2.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  Links,
  Meta,
  Outlet,
  Scripts
} from "/build/_shared/chunk-NAKAXN23.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-YJKL7LU4.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/groq/lib/groq.mjs
function groq(strings, ...keys) {
  const lastIndex = strings.length - 1;
  return strings.slice(0, lastIndex).reduce((acc, str, i) => acc + str + keys[i], "") + strings[lastIndex];
}

// app/queries.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\queries.ts"
  );
  import.meta.hot.lastModified = "1718178029431.7559";
}
var ARTISTS_QUERY = groq`*[_type == "artist"]`;
var ARTISTS_NAME_QUERY = groq`*[_type == "artist"]{name}`;
var EVENTS_QUERY = groq`*[_type == "event" && defined(slug.current)]{_id, name, slug, date}|order(date desc)`;

// node_modules/get-it/dist/_chunks-es/_commonjsHelpers.js
var isReactNative = typeof navigator > "u" ? false : navigator.product === "ReactNative";
var defaultOptions = { timeout: isReactNative ? 6e4 : 12e4 };
var processOptions = function(opts) {
  const options = {
    ...defaultOptions,
    ...typeof opts == "string" ? { url: opts } : opts
  };
  if (options.timeout = normalizeTimeout(options.timeout), options.query) {
    const { url, searchParams } = splitUrl(options.url);
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== void 0)
        if (Array.isArray(value))
          for (const v of value)
            searchParams.append(key, v);
        else
          searchParams.append(key, value);
      const search = searchParams.toString();
      search && (options.url = `${url}?${search}`);
    }
  }
  return options.method = options.body && !options.method ? "POST" : (options.method || "GET").toUpperCase(), options;
};
function splitUrl(url) {
  const qIndex = url.indexOf("?");
  if (qIndex === -1)
    return { url, searchParams: new URLSearchParams() };
  const base = url.slice(0, qIndex), qs = url.slice(qIndex + 1);
  if (!isReactNative)
    return { url: base, searchParams: new URLSearchParams(qs) };
  if (typeof decodeURIComponent != "function")
    throw new Error(
      "Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined"
    );
  const params = new URLSearchParams();
  for (const pair of qs.split("&")) {
    const [key, value] = pair.split("=");
    key && params.append(decodeQueryParam(key), decodeQueryParam(value || ""));
  }
  return { url: base, searchParams: params };
}
function decodeQueryParam(value) {
  return decodeURIComponent(value.replace(/\+/g, " "));
}
function normalizeTimeout(time) {
  if (time === false || time === 0)
    return false;
  if (time.connect || time.socket)
    return time;
  const delay = Number(time);
  return isNaN(delay) ? normalizeTimeout(defaultOptions.timeout) : { connect: delay, socket: delay };
}
var validUrl = /^https?:\/\//i;
var validateOptions = function(options) {
  if (!validUrl.test(options.url))
    throw new Error(`"${options.url}" is not a valid URL`);
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}

// node_modules/get-it/dist/index.browser.js
var middlewareReducer = (middleware) => function(hook, defaultValue, ...args) {
  const bailEarly = hook === "onError";
  let value = defaultValue;
  for (let i = 0; i < middleware[hook].length; i++) {
    const handler = middleware[hook][i];
    if (value = handler(value, ...args), bailEarly && !value)
      break;
  }
  return value;
};
function createPubSub() {
  const subscribers = /* @__PURE__ */ Object.create(null);
  let nextId = 0;
  function subscribe(subscriber) {
    const id = nextId++;
    return subscribers[id] = subscriber, function() {
      delete subscribers[id];
    };
  }
  function publish(event) {
    for (const id in subscribers)
      subscribers[id](event);
  }
  return {
    publish,
    subscribe
  };
}
var channelNames = [
  "request",
  "response",
  "progress",
  "error",
  "abort"
];
var middlehooks = [
  "processOptions",
  "validateOptions",
  "interceptRequest",
  "finalizeOptions",
  "onRequest",
  "onResponse",
  "onError",
  "onReturn",
  "onHeaders"
];
function createRequester(initMiddleware, httpRequest) {
  const loadedMiddleware = [], middleware = middlehooks.reduce(
    (ware, name) => (ware[name] = ware[name] || [], ware),
    {
      processOptions: [processOptions],
      validateOptions: [validateOptions]
    }
  );
  function request(opts) {
    const onResponse = (reqErr, res, ctx) => {
      let error = reqErr, response = res;
      if (!error)
        try {
          response = applyMiddleware("onResponse", res, ctx);
        } catch (err) {
          response = null, error = err;
        }
      error = error && applyMiddleware("onError", error, ctx), error ? channels.error.publish(error) : response && channels.response.publish(response);
    }, channels = channelNames.reduce((target, name) => (target[name] = createPubSub(), target), {}), applyMiddleware = middlewareReducer(middleware), options = applyMiddleware("processOptions", opts);
    applyMiddleware("validateOptions", options);
    const context2 = { options, channels, applyMiddleware };
    let ongoingRequest;
    const unsubscribe = channels.request.subscribe((ctx) => {
      ongoingRequest = httpRequest(ctx, (err, res) => onResponse(err, res, ctx));
    });
    channels.abort.subscribe(() => {
      unsubscribe(), ongoingRequest && ongoingRequest.abort();
    });
    const returnValue = applyMiddleware("onReturn", channels, context2);
    return returnValue === channels && channels.request.publish(context2), returnValue;
  }
  return request.use = function(newMiddleware) {
    if (!newMiddleware)
      throw new Error("Tried to add middleware that resolved to falsey value");
    if (typeof newMiddleware == "function")
      throw new Error(
        "Tried to add middleware that was a function. It probably expects you to pass options to it."
      );
    if (newMiddleware.onReturn && middleware.onReturn.length > 0)
      throw new Error(
        "Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event"
      );
    return middlehooks.forEach((key) => {
      newMiddleware[key] && middleware[key].push(newMiddleware[key]);
    }), loadedMiddleware.push(newMiddleware), request;
  }, request.clone = () => createRequester(loadedMiddleware, httpRequest), initMiddleware.forEach(request.use), request;
}
var trim = function(string) {
  return string.replace(/^\s+|\s+$/g, "");
};
var isArray = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};
var parseHeaders = function(headers) {
  if (!headers)
    return {};
  for (var result = {}, headersArr = trim(headers).split(`
`), i = 0; i < headersArr.length; i++) {
    var row = headersArr[i], index = row.indexOf(":"), key = trim(row.slice(0, index)).toLowerCase(), value = trim(row.slice(index + 1));
    typeof result[key] > "u" ? result[key] = value : isArray(result[key]) ? result[key].push(value) : result[key] = [result[key], value];
  }
  return result;
};
var parseHeaders$1 = /* @__PURE__ */ getDefaultExportFromCjs(parseHeaders);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => (__defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value), value);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _method;
var _url;
var _resHeaders;
var _headers;
var _controller;
var _init;
var _useAbortSignal;
var FetchXhr = class {
  constructor() {
    __publicField(this, "onabort"), __publicField(this, "onerror"), __publicField(this, "onreadystatechange"), __publicField(this, "ontimeout"), __publicField(this, "readyState", 0), __publicField(this, "response"), __publicField(this, "responseText", ""), __publicField(this, "responseType", ""), __publicField(this, "status"), __publicField(this, "statusText"), __publicField(this, "withCredentials"), __privateAdd(this, _method, void 0), __privateAdd(this, _url, void 0), __privateAdd(this, _resHeaders, void 0), __privateAdd(this, _headers, {}), __privateAdd(this, _controller, void 0), __privateAdd(this, _init, {}), __privateAdd(this, _useAbortSignal, void 0);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- _async is only declared for typings compatibility
  open(method, url, _async) {
    var _a;
    __privateSet(this, _method, method), __privateSet(this, _url, url), __privateSet(this, _resHeaders, ""), this.readyState = 1, (_a = this.onreadystatechange) == null || _a.call(this), __privateSet(this, _controller, void 0);
  }
  abort() {
    __privateGet(this, _controller) && __privateGet(this, _controller).abort();
  }
  getAllResponseHeaders() {
    return __privateGet(this, _resHeaders);
  }
  setRequestHeader(name, value) {
    __privateGet(this, _headers)[name] = value;
  }
  // Allow setting extra fetch init options, needed for runtimes such as Vercel Edge to set `cache` and other options in React Server Components
  setInit(init, useAbortSignal = true) {
    __privateSet(this, _init, init), __privateSet(this, _useAbortSignal, useAbortSignal);
  }
  send(body) {
    const textBody = this.responseType !== "arraybuffer", options = {
      ...__privateGet(this, _init),
      method: __privateGet(this, _method),
      headers: __privateGet(this, _headers),
      body
    };
    typeof AbortController == "function" && __privateGet(this, _useAbortSignal) && (__privateSet(this, _controller, new AbortController()), typeof EventTarget < "u" && __privateGet(this, _controller).signal instanceof EventTarget && (options.signal = __privateGet(this, _controller).signal)), typeof document < "u" && (options.credentials = this.withCredentials ? "include" : "omit"), fetch(__privateGet(this, _url), options).then((res) => (res.headers.forEach((value, key) => {
      __privateSet(this, _resHeaders, __privateGet(this, _resHeaders) + `${key}: ${value}\r
`);
    }), this.status = res.status, this.statusText = res.statusText, this.readyState = 3, textBody ? res.text() : res.arrayBuffer())).then((resBody) => {
      var _a;
      typeof resBody == "string" ? this.responseText = resBody : this.response = resBody, this.readyState = 4, (_a = this.onreadystatechange) == null || _a.call(this);
    }).catch((err) => {
      var _a, _b;
      if (err.name === "AbortError") {
        (_a = this.onabort) == null || _a.call(this);
        return;
      }
      (_b = this.onerror) == null || _b.call(this, err);
    });
  }
};
_method = /* @__PURE__ */ new WeakMap(), _url = /* @__PURE__ */ new WeakMap(), _resHeaders = /* @__PURE__ */ new WeakMap(), _headers = /* @__PURE__ */ new WeakMap(), _controller = /* @__PURE__ */ new WeakMap(), _init = /* @__PURE__ */ new WeakMap(), _useAbortSignal = /* @__PURE__ */ new WeakMap();
var adapter = typeof XMLHttpRequest == "function" ? "xhr" : "fetch";
var XmlHttpRequest = adapter === "xhr" ? XMLHttpRequest : FetchXhr;
var httpRequester = (context2, callback) => {
  var _a;
  const opts = context2.options, options = context2.applyMiddleware("finalizeOptions", opts), timers = {}, injectedResponse = context2.applyMiddleware("interceptRequest", void 0, {
    adapter,
    context: context2
  });
  if (injectedResponse) {
    const cbTimer = setTimeout(callback, 0, null, injectedResponse);
    return { abort: () => clearTimeout(cbTimer) };
  }
  let xhr = new XmlHttpRequest();
  xhr instanceof FetchXhr && typeof options.fetch == "object" && xhr.setInit(options.fetch, (_a = options.useAbortSignal) != null ? _a : true);
  const headers = options.headers, delays = options.timeout;
  let aborted = false, loaded = false, timedOut = false;
  if (xhr.onerror = (event) => {
    xhr instanceof FetchXhr ? onError(
      event instanceof Error ? event : new Error(`Request error while attempting to reach is ${options.url}`, { cause: event })
    ) : onError(
      new Error(
        `Request error while attempting to reach is ${options.url}${event.lengthComputable ? `(${event.loaded} of ${event.total} bytes transferred)` : ""}`
      )
    );
  }, xhr.ontimeout = (event) => {
    onError(
      new Error(
        `Request timeout while attempting to reach ${options.url}${event.lengthComputable ? `(${event.loaded} of ${event.total} bytes transferred)` : ""}`
      )
    );
  }, xhr.onabort = () => {
    stopTimers(true), aborted = true;
  }, xhr.onreadystatechange = () => {
    resetTimers(), !(aborted || xhr.readyState !== 4) && xhr.status !== 0 && onLoad();
  }, xhr.open(
    options.method,
    options.url,
    true
    // Always async
  ), xhr.withCredentials = !!options.withCredentials, headers && xhr.setRequestHeader)
    for (const key in headers)
      headers.hasOwnProperty(key) && xhr.setRequestHeader(key, headers[key]);
  return options.rawBody && (xhr.responseType = "arraybuffer"), context2.applyMiddleware("onRequest", { options, adapter, request: xhr, context: context2 }), xhr.send(options.body || null), delays && (timers.connect = setTimeout(() => timeoutRequest("ETIMEDOUT"), delays.connect)), { abort };
  function abort() {
    aborted = true, xhr && xhr.abort();
  }
  function timeoutRequest(code) {
    timedOut = true, xhr.abort();
    const error = new Error(
      code === "ESOCKETTIMEDOUT" ? `Socket timed out on request to ${options.url}` : `Connection timed out on request to ${options.url}`
    );
    error.code = code, context2.channels.error.publish(error);
  }
  function resetTimers() {
    delays && (stopTimers(), timers.socket = setTimeout(() => timeoutRequest("ESOCKETTIMEDOUT"), delays.socket));
  }
  function stopTimers(force) {
    (force || aborted || xhr.readyState >= 2 && timers.connect) && clearTimeout(timers.connect), timers.socket && clearTimeout(timers.socket);
  }
  function onError(error) {
    if (loaded)
      return;
    stopTimers(true), loaded = true, xhr = null;
    const err = error || new Error(`Network error while attempting to reach ${options.url}`);
    err.isNetworkError = true, err.request = options, callback(err);
  }
  function reduceResponse() {
    return {
      body: xhr.response || (xhr.responseType === "" || xhr.responseType === "text" ? xhr.responseText : ""),
      url: options.url,
      method: options.method,
      headers: parseHeaders$1(xhr.getAllResponseHeaders()),
      statusCode: xhr.status,
      statusMessage: xhr.statusText
    };
  }
  function onLoad() {
    if (!(aborted || loaded || timedOut)) {
      if (xhr.status === 0) {
        onError(new Error("Unknown XHR error"));
        return;
      }
      stopTimers(), loaded = true, callback(null, reduceResponse());
    }
  }
};
var getIt = (initMiddleware = [], httpRequest = httpRequester) => createRequester(initMiddleware, httpRequest);

// node_modules/get-it/dist/middleware.browser.js
function agent(_opts) {
  return {};
}
var browser = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var s = 1e3, m = s * 60, h = m * 60, d = h * 24, w = d * 7, y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0)
      return parse(val);
    if (type === "number" && isFinite(val))
      return options.long ? fmtLong(val) : fmtShort(val);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    if (str = String(str), !(str.length > 100)) {
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (match) {
        var n = parseFloat(match[1]), type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return;
        }
      }
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    return msAbs >= d ? Math.round(ms2 / d) + "d" : msAbs >= h ? Math.round(ms2 / h) + "h" : msAbs >= m ? Math.round(ms2 / m) + "m" : msAbs >= s ? Math.round(ms2 / s) + "s" : ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    return msAbs >= d ? plural(ms2, msAbs, d, "day") : msAbs >= h ? plural(ms2, msAbs, h, "hour") : msAbs >= m ? plural(ms2, msAbs, m, "minute") : msAbs >= s ? plural(ms2, msAbs, s, "second") : ms2 + " ms";
  }
  function plural(ms2, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
  }
  return ms;
}
function setup(env) {
  createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = coerce, createDebug.disable = disable, createDebug.enable = enable, createDebug.enabled = enabled, createDebug.humanize = requireMs(), createDebug.destroy = destroy, Object.keys(env).forEach((key) => {
    createDebug[key] = env[key];
  }), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++)
      hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;
  function createDebug(namespace) {
    let prevTime, enableOverride = null, namespacesCache, enabledCache;
    function debug2(...args) {
      if (!debug2.enabled)
        return;
      const self2 = debug2, curr = Number(/* @__PURE__ */ new Date()), ms2 = curr - (prevTime || curr);
      self2.diff = ms2, self2.prev = prevTime, self2.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), typeof args[0] != "string" && args.unshift("%O");
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        if (match === "%%")
          return "%";
        index++;
        const formatter = createDebug.formatters[format];
        if (typeof formatter == "function") {
          const val = args[index];
          match = formatter.call(self2, val), args.splice(index, 1), index--;
        }
        return match;
      }), createDebug.formatArgs.call(self2, args), (self2.log || createDebug.log).apply(self2, args);
    }
    return debug2.namespace = namespace, debug2.useColors = createDebug.useColors(), debug2.color = createDebug.selectColor(namespace), debug2.extend = extend, debug2.destroy = createDebug.destroy, Object.defineProperty(debug2, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => enableOverride !== null ? enableOverride : (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, enabledCache = createDebug.enabled(namespace)), enabledCache),
      set: (v) => {
        enableOverride = v;
      }
    }), typeof createDebug.init == "function" && createDebug.init(debug2), debug2;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter > "u" ? ":" : delimiter) + namespace);
    return newDebug.log = this.log, newDebug;
  }
  function enable(namespaces) {
    createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], createDebug.skips = [];
    let i;
    const split = (typeof namespaces == "string" ? namespaces : "").split(/[\s,]+/), len = split.length;
    for (i = 0; i < len; i++)
      split[i] && (namespaces = split[i].replace(/\*/g, ".*?"), namespaces[0] === "-" ? createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
  }
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    return createDebug.enable(""), namespaces;
  }
  function enabled(name) {
    if (name[name.length - 1] === "*")
      return true;
    let i, len;
    for (i = 0, len = createDebug.skips.length; i < len; i++)
      if (createDebug.skips[i].test(name))
        return false;
    for (i = 0, len = createDebug.names.length; i < len; i++)
      if (createDebug.names[i].test(name))
        return true;
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce(val) {
    return val instanceof Error ? val.stack || val.message : val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return createDebug.enable(createDebug.load()), createDebug;
}
var common = setup;
(function(module, exports) {
  exports.formatArgs = formatArgs, exports.save = save, exports.load = load, exports.useColors = useColors, exports.storage = localstorage(), exports.destroy = /* @__PURE__ */ (() => {
    let warned = false;
    return () => {
      warned || (warned = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? true : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? false : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), !this.useColors)
      return;
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0, lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      match !== "%%" && (index++, match === "%c" && (lastC = index));
    }), args.splice(lastC, 0, c);
  }
  exports.log = console.debug || console.log || (() => {
  });
  function save(namespaces) {
    try {
      namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
    } catch {
    }
  }
  function load() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch {
    }
    return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch {
    }
  }
  module.exports = common(exports);
  const { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
})(browser, browser.exports);
var browserExports = browser.exports;
var isBuffer = typeof Buffer > "u" ? () => false : (obj) => Buffer.isBuffer(obj);
function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  return !(isObject(prot) === false || // eslint-disable-next-line no-prototype-builtins
  prot.hasOwnProperty("isPrototypeOf") === false);
}
var serializeTypes = ["boolean", "string", "number"];
function jsonRequest() {
  return {
    processOptions: (options) => {
      const body = options.body;
      return !body || !(typeof body.pipe != "function" && !isBuffer(body) && (serializeTypes.indexOf(typeof body) !== -1 || Array.isArray(body) || isPlainObject(body))) ? options : Object.assign({}, options, {
        body: JSON.stringify(options.body),
        headers: Object.assign({}, options.headers, {
          "Content-Type": "application/json"
        })
      });
    }
  };
}
function jsonResponse(opts) {
  return {
    onResponse: (response) => {
      const contentType = response.headers["content-type"] || "", shouldDecode = opts && opts.force || contentType.indexOf("application/json") !== -1;
      return !response.body || !contentType || !shouldDecode ? response : Object.assign({}, response, { body: tryParse(response.body) });
    },
    processOptions: (options) => Object.assign({}, options, {
      headers: Object.assign({ Accept: "application/json" }, options.headers)
    })
  };
  function tryParse(body) {
    try {
      return JSON.parse(body);
    } catch (err) {
      throw err.message = `Failed to parsed response body as JSON: ${err.message}`, err;
    }
  }
}
var actualGlobal = {};
typeof globalThis < "u" ? actualGlobal = globalThis : typeof window < "u" ? actualGlobal = window : typeof globalThis < "u" ? actualGlobal = globalThis : typeof self < "u" && (actualGlobal = self);
var global$1 = actualGlobal;
function observable(opts = {}) {
  const Observable2 = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- @TODO consider dropping checking for a global Observable since it's not on a standards track
    opts.implementation || global$1.Observable
  );
  if (!Observable2)
    throw new Error(
      "`Observable` is not available in global scope, and no implementation was passed"
    );
  return {
    onReturn: (channels, context2) => new Observable2((observer) => (channels.error.subscribe((err) => observer.error(err)), channels.progress.subscribe(
      (event) => observer.next(Object.assign({ type: "progress" }, event))
    ), channels.response.subscribe((response) => {
      observer.next(Object.assign({ type: "response" }, response)), observer.complete();
    }), channels.request.publish(context2), () => channels.abort.publish()))
  };
}
function progress() {
  return {
    onRequest: (evt) => {
      if (evt.adapter !== "xhr")
        return;
      const xhr = evt.request, context2 = evt.context;
      "upload" in xhr && "onprogress" in xhr.upload && (xhr.upload.onprogress = handleProgress("upload")), "onprogress" in xhr && (xhr.onprogress = handleProgress("download"));
      function handleProgress(stage) {
        return (event) => {
          const percent = event.lengthComputable ? event.loaded / event.total * 100 : -1;
          context2.channels.progress.publish({
            stage,
            percent,
            total: event.total,
            loaded: event.loaded,
            lengthComputable: event.lengthComputable
          });
        };
      }
    }
  };
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => (__defNormalProp$1(obj, typeof key != "symbol" ? key + "" : key, value), value);
var promise = (options = {}) => {
  const PromiseImplementation = options.implementation || Promise;
  if (!PromiseImplementation)
    throw new Error("`Promise` is not available in global scope, and no implementation was passed");
  return {
    onReturn: (channels, context2) => new PromiseImplementation((resolve, reject) => {
      const cancel = context2.options.cancelToken;
      cancel && cancel.promise.then((reason) => {
        channels.abort.publish(reason), reject(reason);
      }), channels.error.subscribe(reject), channels.response.subscribe((response) => {
        resolve(options.onlyBody ? response.body : response);
      }), setTimeout(() => {
        try {
          channels.request.publish(context2);
        } catch (err) {
          reject(err);
        }
      }, 0);
    })
  };
};
var Cancel = class {
  constructor(message) {
    __publicField$1(this, "__CANCEL__", true), __publicField$1(this, "message"), this.message = message;
  }
  toString() {
    return `Cancel${this.message ? `: ${this.message}` : ""}`;
  }
};
var _CancelToken = class {
  constructor(executor) {
    if (__publicField$1(this, "promise"), __publicField$1(this, "reason"), typeof executor != "function")
      throw new TypeError("executor must be a function.");
    let resolvePromise = null;
    this.promise = new Promise((resolve) => {
      resolvePromise = resolve;
    }), executor((message) => {
      this.reason || (this.reason = new Cancel(message), resolvePromise(this.reason));
    });
  }
};
__publicField$1(_CancelToken, "source", () => {
  let cancel;
  return {
    token: new _CancelToken((can) => {
      cancel = can;
    }),
    cancel
  };
});
var CancelToken = _CancelToken;
var isCancel = (value) => !!(value && value != null && value.__CANCEL__);
promise.Cancel = Cancel;
promise.CancelToken = CancelToken;
promise.isCancel = isCancel;
var defaultShouldRetry = (err, _attempt, options) => options.method !== "GET" && options.method !== "HEAD" ? false : err.isNetworkError || false;
var isStream = (stream) => stream !== null && typeof stream == "object" && typeof stream.pipe == "function";
var sharedRetry = (opts) => {
  const maxRetries = opts.maxRetries || 5, retryDelay = opts.retryDelay || getRetryDelay, allowRetry = opts.shouldRetry;
  return {
    onError: (err, context2) => {
      const options = context2.options, max = options.maxRetries || maxRetries, delay = options.retryDelay || retryDelay, shouldRetry2 = options.shouldRetry || allowRetry, attemptNumber = options.attemptNumber || 0;
      if (isStream(options.body) || !shouldRetry2(err, attemptNumber, options) || attemptNumber >= max)
        return err;
      const newContext = Object.assign({}, context2, {
        options: Object.assign({}, options, { attemptNumber: attemptNumber + 1 })
      });
      return setTimeout(() => context2.channels.request.publish(newContext), delay(attemptNumber)), null;
    }
  };
};
function getRetryDelay(attemptNum) {
  return 100 * Math.pow(2, attemptNum) + Math.random() * 100;
}
var retry = (opts = {}) => sharedRetry({ shouldRetry: defaultShouldRetry, ...opts });
retry.shouldRetry = defaultShouldRetry;
var __defProp2 = Object.defineProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField2 = (obj, key, value) => (__defNormalProp2(obj, typeof key != "symbol" ? key + "" : key, value), value);
var NodeRequestError = class extends Error {
  constructor(err, req) {
    super(err.message), __publicField2(this, "request"), __publicField2(this, "code"), this.request = req, this.code = err.code;
  }
};
function buildKeepAlive(agent2) {
  return function(config2 = {}) {
    const ms2 = config2.ms || 1e3, maxFree = config2.maxFree || 256, { finalizeOptions } = agent2({
      keepAlive: true,
      keepAliveMsecs: ms2,
      maxFreeSockets: maxFree
    });
    return {
      finalizeOptions,
      onError: (err, context2) => {
        if ((context2.options.method === "GET" || context2.options.method === "POST") && err instanceof NodeRequestError && err.code === "ECONNRESET" && err.request.reusedSocket) {
          const attemptNumber = context2.options.attemptNumber || 0, maxRetries = config2.maxRetries || 3;
          if (attemptNumber < maxRetries) {
            const newContext = Object.assign({}, context2, {
              options: Object.assign({}, context2.options, { attemptNumber: attemptNumber + 1 })
            });
            return setImmediate(() => context2.channels.request.publish(newContext)), null;
          }
        }
        throw err;
      }
    };
  };
}
var keepAlive = buildKeepAlive(agent);

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from2.length, ar; i < l; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}

// node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});

// node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// node_modules/rxjs/dist/esm5/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {
}

// node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable2 = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();

// node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
  return x;
}

// node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}

// node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable3 = new Observable2();
    observable3.source = this;
    observable3.operator = operator;
    return observable3;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable2] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);

// node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return isFunction(last(args)) ? args.pop() : void 0;
}

// node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};

// node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

// node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable2]);
}

// node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

// node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

// node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

// node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

// node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          if (false)
            return [3, 8];
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

// node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable2]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise2) {
  return new Observable(function(subscriber) {
    promise2.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
          _a.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process2(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process2(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}

// node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator2;
    executeSchedule(subscriber, scheduler, function() {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator2.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
    };
  });
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

// node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}

// node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

// node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});

// node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
function lastValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

// node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray2 = Array.isArray;
function callOrApply(fn, args) {
  return isArray2(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map(function(args) {
    return callOrApply(fn, args);
  });
}

// node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js
function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = identity;
  }
  return function(subscriber) {
    maybeSchedule(scheduler, function() {
      var length = observables.length;
      var values = new Array(length);
      var active = length;
      var remainingFirstValues = length;
      var _loop_1 = function(i2) {
        maybeSchedule(scheduler, function() {
          var source = from(observables[i2], scheduler);
          var hasFirstValue = false;
          source.subscribe(createOperatorSubscriber(subscriber, function(value) {
            values[i2] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, function() {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      };
      for (var i = 0; i < length; i++) {
        _loop_1(i);
      }
    }, subscriber);
  };
}
function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    executeSchedule(subscription, scheduler, execute);
  } else {
    execute();
  }
}

// node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js
var isArray3 = Array.isArray;
function argsOrArgArray(args) {
  return args.length === 1 && isArray3(args[0]) ? args[0] : args;
}

// node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js
function combineLatest() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var resultSelector = popResultSelector(args);
  return resultSelector ? pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs(resultSelector)) : operate(function(source, subscriber) {
    combineLatestInit(__spreadArray([source], __read(argsOrArgArray(args))))(subscriber);
  });
}

// node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js
function combineLatestWith() {
  var otherSources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }
  return combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
}

// node_modules/@sanity/client/dist/index.browser.js
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => (__defNormalProp$3(obj, typeof key != "symbol" ? key + "" : key, value), value);
var ClientError = class extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), __publicField$3(this, "response"), __publicField$3(this, "statusCode", 400), __publicField$3(this, "responseBody"), __publicField$3(this, "details"), Object.assign(this, props);
  }
};
var ServerError = class extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), __publicField$3(this, "response"), __publicField$3(this, "statusCode", 500), __publicField$3(this, "responseBody"), __publicField$3(this, "details"), Object.assign(this, props);
  }
};
function extractErrorProps(res) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (body.error && body.message)
    return props.message = `${body.error} - ${body.message}`, props;
  if (isMutationError(body) || isActionError(body)) {
    const allItems = body.error.items || [], items = allItems.slice(0, 5).map((item) => {
      var _a;
      return (_a = item.error) == null ? void 0 : _a.description;
    }).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > 5 && (itemsStr += `
...and ${allItems.length - 5} more`), props.message = `${body.error.description}${itemsStr}`, props.details = body.error, props;
  }
  return body.error && body.error.description ? (props.message = body.error.description, props.details = body.error, props) : (props.message = body.error || body.message || httpErrorMessage(res), props);
}
function isMutationError(body) {
  return isPlainObject2(body) && isPlainObject2(body.error) && body.error.type === "mutationError" && typeof body.error.description == "string";
}
function isActionError(body) {
  return isPlainObject2(body) && isPlainObject2(body.error) && body.error.type === "actionError" && typeof body.error.description == "string";
}
function isPlainObject2(obj) {
  return typeof obj == "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
  const statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
var httpError = {
  onResponse: (res) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res);
    return res;
  }
};
var printWarnings = {
  onResponse: (res) => {
    const warn = res.headers["x-sanity-warning"];
    return (Array.isArray(warn) ? warn : [warn]).filter(Boolean).forEach((msg) => console.warn(msg)), res;
  }
};
function defineHttpRequest(envMiddleware2) {
  return getIt([
    retry({ shouldRetry }),
    ...envMiddleware2,
    printWarnings,
    jsonRequest(),
    jsonResponse(),
    progress(),
    httpError,
    observable({ implementation: Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0)
    return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery) && isRetriableResponse ? true : retry.shouldRetry(err, attempt, options);
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
var VALID_ASSET_TYPES = ["image", "file"];
var VALID_INSERT_LOCATIONS = ["before", "after", "replace"];
var dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
};
var projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
};
var validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
};
var validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
};
var validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
};
var requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
};
var validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
};
var hasDataset = (config2) => {
  if (!config2.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config2.dataset || "";
};
var requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => (__defNormalProp$2(obj, typeof key != "symbol" ? key + "" : key, value), value);
var __accessCheck$7 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$7 = (obj, member, getter) => (__accessCheck$7(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$7 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$7 = (obj, member, value, setter) => (__accessCheck$7(obj, member, "write to private field"), member.set(obj, value), value);
var BasePatch = class {
  constructor(selection, operations = {}) {
    __publicField$2(this, "selection"), __publicField$2(this, "operations"), this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
};
var _client$6;
var _ObservablePatch = class _ObservablePatch2 extends BasePatch {
  constructor(selection, operations, client2) {
    super(selection, operations), __privateAdd$7(this, _client$6, void 0), __privateSet$7(this, _client$6, client2);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _ObservablePatch2(this.selection, { ...this.operations }, __privateGet$7(this, _client$6));
  }
  commit(options) {
    if (!__privateGet$7(this, _client$6))
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet$7(this, _client$6).mutate({ patch: this.serialize() }, opts);
  }
};
_client$6 = /* @__PURE__ */ new WeakMap();
var ObservablePatch = _ObservablePatch;
var _client2$5;
var _Patch = class _Patch2 extends BasePatch {
  constructor(selection, operations, client2) {
    super(selection, operations), __privateAdd$7(this, _client2$5, void 0), __privateSet$7(this, _client2$5, client2);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _Patch2(this.selection, { ...this.operations }, __privateGet$7(this, _client2$5));
  }
  commit(options) {
    if (!__privateGet$7(this, _client2$5))
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return __privateGet$7(this, _client2$5).mutate({ patch: this.serialize() }, opts);
  }
};
_client2$5 = /* @__PURE__ */ new WeakMap();
var Patch = _Patch;
var __defProp$12 = Object.defineProperty;
var __defNormalProp$12 = (obj, key, value) => key in obj ? __defProp$12(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$12 = (obj, key, value) => (__defNormalProp$12(obj, typeof key != "symbol" ? key + "" : key, value), value);
var __accessCheck$6 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$6 = (obj, member, getter) => (__accessCheck$6(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$6 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$6 = (obj, member, value, setter) => (__accessCheck$6(obj, member, "write to private field"), member.set(obj, value), value);
var defaultMutateOptions = { returnDocuments: false };
var BaseTransaction = class {
  constructor(operations = [], transactionId) {
    __publicField$12(this, "operations"), __publicField$12(this, "trxId"), this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
};
var _client$5;
var _Transaction = class _Transaction2 extends BaseTransaction {
  constructor(operations, client2, transactionId) {
    super(operations, transactionId), __privateAdd$6(this, _client$5, void 0), __privateSet$6(this, _client$5, client2);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _Transaction2([...this.operations], __privateGet$6(this, _client$5), this.trxId);
  }
  commit(options) {
    if (!__privateGet$6(this, _client$5))
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return __privateGet$6(this, _client$5).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, __privateGet$6(this, _client$5)));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client$5 = /* @__PURE__ */ new WeakMap();
var Transaction = _Transaction;
var _client2$4;
var _ObservableTransaction = class _ObservableTransaction2 extends BaseTransaction {
  constructor(operations, client2, transactionId) {
    super(operations, transactionId), __privateAdd$6(this, _client2$4, void 0), __privateSet$6(this, _client2$4, client2);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _ObservableTransaction2([...this.operations], __privateGet$6(this, _client2$4), this.trxId);
  }
  commit(options) {
    if (!__privateGet$6(this, _client2$4))
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return __privateGet$6(this, _client2$4).mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, __privateGet$6(this, _client2$4)));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
};
_client2$4 = /* @__PURE__ */ new WeakMap();
var ObservableTransaction = _ObservableTransaction;
var BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
function once(fn) {
  let didCall = false, returnValue;
  return (...args) => (didCall || (returnValue = fn(...args), didCall = true), returnValue);
}
var createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args) => console.warn(message.join(" "), ...args))
);
var printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]);
var printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]);
var printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${generateHelpUrl(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]);
var printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]);
var printNoDefaultExport = createWarningPrinter([
  "The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."
]);
var defaultCdnHost = "apicdn.sanity.io";
var defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
};
var LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];
var isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
var validateApiPerspective = function(perspective) {
  switch (perspective) {
    case "previewDrafts":
    case "published":
    case "raw":
      return;
    default:
      throw new TypeError(
        "Invalid API perspective string, expected `published`, `previewDrafts` or `raw`"
      );
  }
};
var initConfig = (config2, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config2,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config2.stega == "boolean" ? { enabled: config2.stega } : config2.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname;
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (typeof newConfig.perspective == "string" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname);
  isBrowser && isLocalhost && newConfig.token && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return newConfig.useProjectHostname ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
var projectHeader = "X-Sanity-Project-ID";
function requestOptions(config2, overrides = {}) {
  const headers = {}, token = overrides.token || config2.token;
  token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config2.useProjectHostname && config2.projectId && (headers[projectHeader] = config2.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config2.token || config2.withCredentials : overrides.withCredentials), timeout = typeof overrides.timeout > "u" ? config2.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout > "u" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config2.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config2.fetch == "object" ? { ...config2.fetch, ...overrides.fetch } : overrides.fetch || config2.fetch
  });
}
var encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), `?${searchParams}`;
};
var excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param;
var getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
});
var isResponse = (event) => event.type === "response";
var getBody = (event) => event.body;
var indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null));
var getQuerySizeLimit = 11264;
function _fetch(client2, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client2, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    combineLatestWith(
      from(
        import("/build/_shared/stegaEncodeSourceMap-XOMPMDEG.js").then(function(n) {
          return n.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(map(mapResponse));
}
function _getDocument(client2, httpRequest, id, opts = {}) {
  const options = { uri: _getDataUrl(client2, "doc", id), json: true, tag: opts.tag };
  return _requestObservable(client2, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client2, httpRequest, ids, opts = {}) {
  const options = { uri: _getDataUrl(client2, "doc", ids.join(",")), json: true, tag: opts.tag };
  return _requestObservable(client2, httpRequest, options).pipe(
    filter(isResponse),
    map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _createIfNotExists(client2, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client2, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client2, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client2, httpRequest, doc, "createOrReplace", options);
}
function _delete(client2, httpRequest, selection, options) {
  return _dataRequest(
    client2,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _mutate(client2, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client2, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client2, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client2,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client2, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout, token, tag, headers, returnQuery, lastLiveEventId } = options, uri = _getDataUrl(client2, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    canUseCdn: isQuery,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client2, httpRequest, reqOptions).pipe(
    filter(isResponse),
    map(getBody),
    map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client2, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client2, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
function _requestObservable(client2, httpRequest, options) {
  var _a, _b;
  const uri = options.url || options.uri, config2 = client2.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/") === 0 : options.canUseCdn;
  let useCdn = ((_a = options.useCdn) != null ? _a : config2.useCdn) && canUseCdn;
  const tag = options.tag && config2.requestTagPrefix ? [config2.requestTagPrefix, options.tag].join(".") : options.tag || config2.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/query/") === 0) {
    const resultSourceMap = (_b = options.resultSourceMap) != null ? _b : config2.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspective = options.perspective || config2.perspective;
    typeof perspective == "string" && perspective !== "raw" && (validateApiPerspective(perspective), options.query = { perspective, ...options.query }, perspective === "previewDrafts" && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query });
  }
  const reqOptions = requestOptions(
    config2,
    Object.assign({}, options, {
      url: _getUrl(client2, uri, useCdn)
    })
  ), request = new Observable(
    (subscriber) => httpRequest(reqOptions, config2.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client2, httpRequest, options) {
  return _requestObservable(client2, httpRequest, options).pipe(
    filter((event) => event.type === "response"),
    map((event) => event.body)
  );
}
function _getDataUrl(client2, operation, path) {
  const config2 = client2.config(), catalog = hasDataset(config2), baseUri = `/${operation}/${catalog}`;
  return `/data${path ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client2, uri, canUseCdn = false) {
  const { url, cdnUrl } = client2.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
var isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  var _a, _b;
  if (isDomExceptionSupported)
    return new DOMException((_a = signal == null ? void 0 : signal.reason) != null ? _a : "The operation was aborted.", "AbortError");
  const error = new Error((_b = signal == null ? void 0 : signal.reason) != null ? _b : "The operation was aborted.");
  return error.name = "AbortError", error;
}
var __accessCheck$5 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$5 = (obj, member, getter) => (__accessCheck$5(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$5 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$5 = (obj, member, value, setter) => (__accessCheck$5(obj, member, "write to private field"), member.set(obj, value), value);
var _client$4;
var _httpRequest$4;
var ObservableAssetsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$5(this, _client$4, void 0), __privateAdd$5(this, _httpRequest$4, void 0), __privateSet$5(this, _client$4, client2), __privateSet$5(this, _httpRequest$4, httpRequest);
  }
  upload(assetType, body, options) {
    return _upload(__privateGet$5(this, _client$4), __privateGet$5(this, _httpRequest$4), assetType, body, options);
  }
};
_client$4 = /* @__PURE__ */ new WeakMap(), _httpRequest$4 = /* @__PURE__ */ new WeakMap();
var _client2$3;
var _httpRequest2$4;
var AssetsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$5(this, _client2$3, void 0), __privateAdd$5(this, _httpRequest2$4, void 0), __privateSet$5(this, _client2$3, client2), __privateSet$5(this, _httpRequest2$4, httpRequest);
  }
  upload(assetType, body, options) {
    const observable22 = _upload(__privateGet$5(this, _client2$3), __privateGet$5(this, _httpRequest2$4), assetType, body, options);
    return lastValueFrom(
      observable22.pipe(
        filter((event) => event.type === "response"),
        map(
          (event) => event.body.document
        )
      )
    );
  }
};
_client2$3 = /* @__PURE__ */ new WeakMap(), _httpRequest2$4 = /* @__PURE__ */ new WeakMap();
function _upload(client2, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const dataset2 = hasDataset(client2.config()), assetEndpoint = assetType === "image" ? "images" : "files", options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client2, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: `/assets/${assetEndpoint}/${dataset2}`,
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
var pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {});
var MAX_URL_LENGTH = 14800;
var possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "visibility",
  "effectFormat",
  "tag"
];
var defaultOptions2 = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions2), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return new Observable((observer) => observer.error(new Error("Query too large for listener")));
  const listenFor = options.events ? options.events : ["mutation"], shouldEmitReconnect = listenFor.indexOf("reconnect") !== -1, esOptions = {};
  return (token || withCredentials) && (esOptions.withCredentials = true), token && (esOptions.headers = {
    Authorization: `Bearer ${token}`
  }), new Observable((observer) => {
    let es, reconnectTimer, stopped = false, unsubscribed = false;
    open();
    function onError() {
      stopped || (emitReconnect(), !stopped && es.readyState === es.CLOSED && (unsubscribe(), clearTimeout(reconnectTimer), reconnectTimer = setTimeout(open, 100)));
    }
    function onChannelError(err) {
      observer.error(cooerceError(err));
    }
    function onMessage(evt) {
      const event = parseEvent$1(evt);
      return event instanceof Error ? observer.error(event) : observer.next(event);
    }
    function onDisconnect() {
      stopped = true, unsubscribe(), observer.complete();
    }
    function unsubscribe() {
      es && (es.removeEventListener("error", onError), es.removeEventListener("channelError", onChannelError), es.removeEventListener("disconnect", onDisconnect), listenFor.forEach((type) => es.removeEventListener(type, onMessage)), es.close());
    }
    function emitReconnect() {
      shouldEmitReconnect && observer.next({ type: "reconnect" });
    }
    async function getEventSource() {
      const { default: EventSource2 } = await import("/build/_shared/browser-ZC4XKKKZ.js");
      if (unsubscribed)
        return;
      const evs = new EventSource2(uri, esOptions);
      return evs.addEventListener("error", onError), evs.addEventListener("channelError", onChannelError), evs.addEventListener("disconnect", onDisconnect), listenFor.forEach((type) => evs.addEventListener(type, onMessage)), evs;
    }
    function open() {
      getEventSource().then((eventSource) => {
        eventSource && (es = eventSource, unsubscribed && unsubscribe());
      }).catch((reason) => {
        observer.error(reason), stop();
      });
    }
    function stop() {
      stopped = true, unsubscribe(), unsubscribed = true;
    }
    return stop;
  });
}
function parseEvent$1(event) {
  try {
    const data = event.data && JSON.parse(event.data) || {};
    return Object.assign({ type: event.type }, data);
  } catch (err) {
    return err;
  }
}
function cooerceError(err) {
  if (err instanceof Error)
    return err;
  const evt = parseEvent$1(err);
  return evt instanceof Error ? evt : new Error(extractErrorMessage(evt));
}
function extractErrorMessage(err) {
  return err.error ? err.error.description ? err.error.description : typeof err.error == "string" ? err.error : JSON.stringify(err.error, null, 2) : err.message || "Unknown listener error";
}
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$4 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$4 = (obj, member, value, setter) => (__accessCheck$4(obj, member, "write to private field"), member.set(obj, value), value);
var requiredApiVersion = "2021-03-26";
var _client$3;
var LiveClient = class {
  constructor(client2) {
    __privateAdd$4(this, _client$3, void 0), __privateSet$4(this, _client$3, client2);
  }
  /**
   * Requires `apiVersion` to be `2021-03-26` or later.
   */
  events() {
    const apiVersion = __privateGet$4(this, _client$3).config().apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    const path = _getDataUrl(__privateGet$4(this, _client$3), "live/events"), url = new URL(__privateGet$4(this, _client$3).getUrl(path, false)), listenFor = ["restart", "message"];
    return new Observable((observer) => {
      let es, reconnectTimer, stopped = false, unsubscribed = false;
      open();
      function onError(evt) {
        if (!stopped) {
          if ("data" in evt) {
            const event = parseEvent(evt);
            observer.error(new Error(event.message, { cause: event }));
          }
          es.readyState === es.CLOSED && (unsubscribe(), clearTimeout(reconnectTimer), reconnectTimer = setTimeout(open, 100));
        }
      }
      function onMessage(evt) {
        const event = parseEvent(evt);
        return event instanceof Error ? observer.error(event) : observer.next(event);
      }
      function unsubscribe() {
        if (es) {
          es.removeEventListener("error", onError);
          for (const type of listenFor)
            es.removeEventListener(type, onMessage);
          es.close();
        }
      }
      async function getEventSource() {
        const EventSourceImplementation = typeof EventSource > "u" ? (await import("/build/_shared/browser-ZC4XKKKZ.js")).default : EventSource;
        if (unsubscribed)
          return;
        const evs = new EventSourceImplementation(url.toString());
        evs.addEventListener("error", onError);
        for (const type of listenFor)
          evs.addEventListener(type, onMessage);
        return evs;
      }
      function open() {
        getEventSource().then((eventSource) => {
          eventSource && (es = eventSource, unsubscribed && unsubscribe());
        }).catch((reason) => {
          observer.error(reason), stop();
        });
      }
      function stop() {
        stopped = true, unsubscribe(), unsubscribed = true;
      }
      return stop;
    });
  }
};
_client$3 = /* @__PURE__ */ new WeakMap();
function parseEvent(event) {
  try {
    const data = event.data && JSON.parse(event.data) || {};
    return { type: event.type, id: event.lastEventId, ...data };
  } catch (err) {
    return err;
  }
}
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => (__accessCheck$3(obj, member, "write to private field"), member.set(obj, value), value);
var _client$2;
var _httpRequest$3;
var ObservableDatasetsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$3(this, _client$2, void 0), __privateAdd$3(this, _httpRequest$3, void 0), __privateSet$3(this, _client$2, client2), __privateSet$3(this, _httpRequest$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), {
      uri: "/datasets",
      tag: null
    });
  }
};
_client$2 = /* @__PURE__ */ new WeakMap(), _httpRequest$3 = /* @__PURE__ */ new WeakMap();
var _client2$2;
var _httpRequest2$3;
var DatasetsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$3(this, _client2$2, void 0), __privateAdd$3(this, _httpRequest2$3, void 0), __privateSet$3(this, _client2$2, client2), __privateSet$3(this, _httpRequest2$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return lastValueFrom(
      _modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PUT", name, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return lastValueFrom(
      _modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PATCH", name, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return lastValueFrom(_modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return lastValueFrom(
      _request(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), { uri: "/datasets", tag: null })
    );
  }
};
_client2$2 = /* @__PURE__ */ new WeakMap(), _httpRequest2$3 = /* @__PURE__ */ new WeakMap();
function _modify(client2, httpRequest, method, name, options) {
  return dataset(name), _request(client2, httpRequest, {
    method,
    uri: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => (__accessCheck$2(obj, member, "write to private field"), member.set(obj, value), value);
var _client$1;
var _httpRequest$2;
var ObservableProjectsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$2(this, _client$1, void 0), __privateAdd$2(this, _httpRequest$2, void 0), __privateSet$2(this, _client$1, client2), __privateSet$2(this, _httpRequest$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), { uri: `/projects/${projectId2}` });
  }
};
_client$1 = /* @__PURE__ */ new WeakMap(), _httpRequest$2 = /* @__PURE__ */ new WeakMap();
var _client2$1;
var _httpRequest2$2;
var ProjectsClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$2(this, _client2$1, void 0), __privateAdd$2(this, _httpRequest2$2, void 0), __privateSet$2(this, _client2$1, client2), __privateSet$2(this, _httpRequest2$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return lastValueFrom(_request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return lastValueFrom(
      _request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), { uri: `/projects/${projectId2}` })
    );
  }
};
_client2$1 = /* @__PURE__ */ new WeakMap(), _httpRequest2$2 = /* @__PURE__ */ new WeakMap();
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), member.set(obj, value), value);
var _client;
var _httpRequest$1;
var ObservableUsersClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$1(this, _client, void 0), __privateAdd$1(this, _httpRequest$1, void 0), __privateSet$1(this, _client, client2), __privateSet$1(this, _httpRequest$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      __privateGet$1(this, _client),
      __privateGet$1(this, _httpRequest$1),
      { uri: `/users/${id}` }
    );
  }
};
_client = /* @__PURE__ */ new WeakMap(), _httpRequest$1 = /* @__PURE__ */ new WeakMap();
var _client2;
var _httpRequest2$1;
var UsersClient = class {
  constructor(client2, httpRequest) {
    __privateAdd$1(this, _client2, void 0), __privateAdd$1(this, _httpRequest2$1, void 0), __privateSet$1(this, _client2, client2), __privateSet$1(this, _httpRequest2$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return lastValueFrom(
      _request(__privateGet$1(this, _client2), __privateGet$1(this, _httpRequest2$1), {
        uri: `/users/${id}`
      })
    );
  }
};
_client2 = /* @__PURE__ */ new WeakMap(), _httpRequest2$1 = /* @__PURE__ */ new WeakMap();
var __defProp3 = Object.defineProperty;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField3 = (obj, key, value) => (__defNormalProp3(obj, typeof key != "symbol" ? key + "" : key, value), value);
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => (__accessCheck2(obj, member, "write to private field"), member.set(obj, value), value);
var _clientConfig;
var _httpRequest;
var _ObservableSanityClient = class _ObservableSanityClient2 {
  constructor(httpRequest, config2 = defaultConfig) {
    __publicField3(this, "assets"), __publicField3(this, "datasets"), __publicField3(this, "live"), __publicField3(this, "projects"), __publicField3(this, "users"), __privateAdd2(this, _clientConfig, void 0), __privateAdd2(this, _httpRequest, void 0), __publicField3(this, "listen", _listen), this.config(config2), __privateSet2(this, _httpRequest, httpRequest), this.assets = new ObservableAssetsClient(this, __privateGet2(this, _httpRequest)), this.datasets = new ObservableDatasetsClient(this, __privateGet2(this, _httpRequest)), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, __privateGet2(this, _httpRequest)), this.users = new ObservableUsersClient(this, __privateGet2(this, _httpRequest));
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _ObservableSanityClient2(__privateGet2(this, _httpRequest), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...__privateGet2(this, _clientConfig) };
    if (__privateGet2(this, _clientConfig) && __privateGet2(this, _clientConfig).allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return __privateSet2(this, _clientConfig, initConfig(newConfig, __privateGet2(this, _clientConfig) || {})), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new _ObservableSanityClient2(__privateGet2(this, _httpRequest), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof (newConfig == null ? void 0 : newConfig.stega) == "boolean" ? { enabled: newConfig.stega } : (newConfig == null ? void 0 : newConfig.stega) || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      __privateGet2(this, _httpRequest),
      __privateGet2(this, _clientConfig).stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, __privateGet2(this, _httpRequest), id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, __privateGet2(this, _httpRequest), ids, options);
  }
  create(document2, options) {
    return _create(this, __privateGet2(this, _httpRequest), document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExists(this, __privateGet2(this, _httpRequest), document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplace(this, __privateGet2(this, _httpRequest), document2, options);
  }
  delete(selection, options) {
    return _delete(this, __privateGet2(this, _httpRequest), selection, options);
  }
  mutate(operations, options) {
    return _mutate(this, __privateGet2(this, _httpRequest), operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, __privateGet2(this, _httpRequest), operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, __privateGet2(this, _httpRequest), options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig = /* @__PURE__ */ new WeakMap(), _httpRequest = /* @__PURE__ */ new WeakMap();
var ObservableSanityClient = _ObservableSanityClient;
var _clientConfig2;
var _httpRequest2;
var _SanityClient = class _SanityClient2 {
  constructor(httpRequest, config2 = defaultConfig) {
    __publicField3(this, "assets"), __publicField3(this, "datasets"), __publicField3(this, "live"), __publicField3(this, "projects"), __publicField3(this, "users"), __publicField3(this, "observable"), __privateAdd2(this, _clientConfig2, void 0), __privateAdd2(this, _httpRequest2, void 0), __publicField3(this, "listen", _listen), this.config(config2), __privateSet2(this, _httpRequest2, httpRequest), this.assets = new AssetsClient(this, __privateGet2(this, _httpRequest2)), this.datasets = new DatasetsClient(this, __privateGet2(this, _httpRequest2)), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, __privateGet2(this, _httpRequest2)), this.users = new UsersClient(this, __privateGet2(this, _httpRequest2)), this.observable = new ObservableSanityClient(httpRequest, config2);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _SanityClient2(__privateGet2(this, _httpRequest2), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...__privateGet2(this, _clientConfig2) };
    if (__privateGet2(this, _clientConfig2) && __privateGet2(this, _clientConfig2).allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), __privateSet2(this, _clientConfig2, initConfig(newConfig, __privateGet2(this, _clientConfig2) || {})), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new _SanityClient2(__privateGet2(this, _httpRequest2), {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof (newConfig == null ? void 0 : newConfig.stega) == "boolean" ? { enabled: newConfig.stega } : (newConfig == null ? void 0 : newConfig.stega) || {}
      }
    });
  }
  fetch(query, params, options) {
    return lastValueFrom(
      _fetch(
        this,
        __privateGet2(this, _httpRequest2),
        __privateGet2(this, _clientConfig2).stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return lastValueFrom(_getDocument(this, __privateGet2(this, _httpRequest2), id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return lastValueFrom(_getDocuments(this, __privateGet2(this, _httpRequest2), ids, options));
  }
  create(document2, options) {
    return lastValueFrom(
      _create(this, __privateGet2(this, _httpRequest2), document2, "create", options)
    );
  }
  createIfNotExists(document2, options) {
    return lastValueFrom(
      _createIfNotExists(this, __privateGet2(this, _httpRequest2), document2, options)
    );
  }
  createOrReplace(document2, options) {
    return lastValueFrom(
      _createOrReplace(this, __privateGet2(this, _httpRequest2), document2, options)
    );
  }
  delete(selection, options) {
    return lastValueFrom(_delete(this, __privateGet2(this, _httpRequest2), selection, options));
  }
  mutate(operations, options) {
    return lastValueFrom(_mutate(this, __privateGet2(this, _httpRequest2), operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return lastValueFrom(_action(this, __privateGet2(this, _httpRequest2), operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return lastValueFrom(_request(this, __privateGet2(this, _httpRequest2), options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return lastValueFrom(_dataRequest(this, __privateGet2(this, _httpRequest2), endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig2 = /* @__PURE__ */ new WeakMap(), _httpRequest2 = /* @__PURE__ */ new WeakMap();
var SanityClient = _SanityClient;
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
  const defaultRequester = defineHttpRequest(envMiddleware2);
  return { requester: defaultRequester, createClient: (config2) => new ClassConstructor(
    (options, requester2) => (requester2 || defaultRequester)({
      maxRedirects: 0,
      maxRetries: config2.maxRetries,
      retryDelay: config2.retryDelay,
      ...options
    }),
    config2
  ) };
}
function defineDeprecatedCreateClient(createClient2) {
  return function(config2) {
    return printNoDefaultExport(), createClient2(config2);
  };
}
var envMiddleware = [];
var exp = defineCreateClientExports(envMiddleware, SanityClient);
var requester = exp.requester;
var createClient = exp.createClient;
var deprecatedCreateClient = defineDeprecatedCreateClient(createClient);

// app/root.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.jsx"
  );
  import.meta.hot.lastModified = "1718179819899.9333";
}
var client = createClient({
  projectId: "n4jg9pm4",
  dataset: "production",
  useCdn: true,
  // set to `false` to bypass the edge cache
  apiVersion: "2024-06-11"
});
async function getArtistNames() {
  const artists = await client.fetch(ARTISTS_NAME_QUERY);
  return artists;
}
function App() {
  console.log("hello");
  const artists = getArtistNames();
  console.log("artists", artists);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 47,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Hello worlds!" }, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.jsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.jsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.jsx",
    lineNumber: 43,
    columnNumber: 10
  }, this);
}
_c = App;
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default
};
/*! Bundled license information:

get-it/dist/middleware.browser.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=/build/root-6QFG55MR.js.map
