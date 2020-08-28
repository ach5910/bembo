"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var defaultCtx = {
  name: "",
  mods: {}
};

function isString(v) {
  return typeof v == "string";
}

function isMod(v) {
  return _typeof(v) == "object" && v !== null;
}

function debug() {
  return {
    name: this.name,
    mods: _objectSpread({}, this.mods)
  };
}

function mergeCtx(ctx) {
  ctx.name = "".concat(this.name && ctx.name ? "".concat(this.name, "__") : this.name).concat(ctx.name);
  ctx.mods = _objectSpread(_objectSpread({}, this.mods), ctx.mods);
  return ctx;
}

function toString() {
  var _this = this;

  var classNames = [this.name];
  Object.entries(this.mods).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value = _ref2[1];

    return !!value;
  }).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        mod = _ref4[0];

    classNames.push("".concat(_this.name, "--").concat(mod));
  });
  return classNames.join(" ");
}

function createMods() {
  var ctx = _objectSpread({}, defaultCtx);

  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  ctx.mods = params.reduce(function (acc, curr) {
    if (isMod(curr)) {
      return _objectSpread(_objectSpread({}, acc), curr);
    }

    acc[curr] = curr;
    return acc;
  }, {});
  ctx.mergeCtx = mergeCtx.bind(ctx);
  ctx.toString = toString.bind(ctx);
  return ctx;
}

function createCtx() {
  var ctx = _objectSpread({}, defaultCtx);

  for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    params[_key2] = arguments[_key2];
  }

  ctx.name = params.filter(isString).reduce(function (acc, curr) {
    return "".concat(acc ? "".concat(acc, "-") : acc).concat(curr.trim());
  }, "");
  ctx.mods = params.filter(isMod).reduce(function (acc, curr) {
    return _objectSpread(_objectSpread({}, acc), curr);
  }, {});
  ctx.mergeCtx = mergeCtx.bind(ctx);
  ctx.toString = toString.bind(ctx);
  return ctx;
}

function createBem(ctx) {
  var _bem = bem.bind(ctx);

  _bem.toString = toString.bind(ctx);
  _bem.debug = debug.bind(ctx);
  return {
    el: bem.bind(ctx),
    e: bem.bind(ctx),
    mod: mod.bind(ctx),
    m: mod.bind(ctx),
    toString: toString.bind(ctx),
    debug: debug.bind(ctx)
  };
}

function mod() {
  if (arguments.length == 0) {
    return this.toString();
  }

  var ctx = this.mergeCtx(createMods.apply(void 0, arguments));
  return createBem(ctx);
}

function bem() {
  if (arguments.length == 0) {
    return this.toString();
  }

  var ctx = this.mergeCtx(createCtx.apply(void 0, arguments));
  return createBem(ctx);
}

function factory() {
  var _default = createCtx();

  for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    params[_key3] = arguments[_key3];
  }

  return bem.call.apply(bem, [_default].concat(params));
}

var _default2 = factory;
exports["default"] = _default2;