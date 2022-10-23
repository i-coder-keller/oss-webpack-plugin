'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// const { validate } = require('schema-utils')
// const schema = require('./schema.json')
var PLUGIN_NAME = "alioss-webpack-plugin";
var AliossWebpackPlugin = /*#__PURE__*/function () {
  function AliossWebpackPlugin(options) {
    _classCallCheck(this, AliossWebpackPlugin);
    _defineProperty(this, "options", {});
    // validate(schema, options, { name: PLUGIN_NAME })
    this.options = options;
  }
  _createClass(AliossWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      console.log(compiler.module);
      compiler.hooks.emit.tapAsync(PLUGIN_NAME, function (compilation) {
        // console.log(compilation)
        // const { assets, outputOptions } = compilation
        // console.log(assets, outputOptions)
      });
    }
  }]);
  return AliossWebpackPlugin;
}();
var src = {
  AliossWebpackPlugin: AliossWebpackPlugin
};

module.exports = src;
