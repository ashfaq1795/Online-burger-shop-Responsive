"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValidation = exports.updateObject = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateObject = function updateObject(oldObject, updatedProperties) {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};

exports.updateObject = updateObject;

var checkValidation = function checkValidation(value, rules) {
  var isValid = true; //this is AND operation. if any one of them false the final result of isValid will be false. this is what we required.

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.required) {
    isValid = value !== 'select' && isValid;
  }

  if (rules.isEmail) {
    var emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    isValid = emailPattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    var pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

exports.checkValidation = checkValidation;