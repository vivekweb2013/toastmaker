(function (root, factory) {
    // UMD(Universal Module Definition) Pattern - https://github.com/umdjs/umd
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ToastMaker = factory();
    }
}(this, function (global) {
    'use strict';

    var ToastMaker = function (text, timeout, options) {
        // Validate mandatory options
        var validate = function (arg, argName, type, isMandatory, allowedValues) {
            var actualType = Array.isArray(arg) ? 'array' : typeof arg;
            if (isMandatory && (arg == null || arg === ''))
                throw "Invalid argument '" + argName + "'. Argument is either empty, null or undefined";
            if (actualType !== type)
                throw "Invalid argument '" + argName + "'. Type must be " + type + " but found " + actualType;
            if (allowedValues && allowedValues.indexOf(arg) == -1)
                throw "Invalid value " + arg + " specified for argument '" + argName + "'. Allowed - " + allowedValues.join(" | ");
        }

        // Initialize & validate the options
        validate(text, 'text', 'string', true);
        options = options || {};
        validate(options, 'options', 'object');
        timeout = timeout || 3000;
        validate(timeout, 'timeout', 'number');
        options.styles = options.styles || {}; // Object with style properties
        validate(options.styles, 'styles', 'object');
        options.align = options.align || 'center' // left | center | right
        validate(options.align, 'align', 'string', true, ['left', 'center', 'right']);
        options.valign = options.valign || 'bottom'; // top | bottom
        validate(options.valign, 'valign', 'string', true, ['top', 'bottom']);
        options.classList = options.classList || [];
        validate(options.classList, 'classList', 'array');

        var alignmentClasses = ['toastmaker', 'toastmaker-' + options.valign, 'toastmaker-' + options.align];
        options.classList = options.classList.concat(alignmentClasses) // Array of css class names

        // Create toast element
        var toast = document.createElement('div');

        // Add css classes
        options.classList.forEach(function (c) { toast.classList.add(c) });

        // Add text message to toast element
        var content = document.createTextNode(text);
        toast.appendChild(content);

        // Add styles to the toast element
        toast.style.animationDuration = timeout / 1000 + 's';
        for (var prop in options.styles) {
            toast.style[prop] = options.styles[prop];
        }

        // Add toast element element to DOM
        document.body.appendChild(toast);
        setTimeout(function () {
            document.body.removeChild(toast);
        }, timeout);
    }

    return ToastMaker;
}));