/*!
 * ToastMaker
 * https://github.com/vivekweb2013/toastmaker
 * @license MIT
 */
(function (global, factory) {
    // UMD(Universal Module Definition) Pattern - https://github.com/umdjs/umd
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        global.ToastMaker = factory();
    }
}(this, function (global) {

    var ToastMaker = function (text, timeout, options) {
        // Validate mandatory options
        var validate = function (arg, argName, type, isMandatory, allowedValues) {
            var actualType = Array.isArray(arg) ? "array" : typeof arg;
            if (isMandatory && (arg == null || arg === ''))
                throw new Error("Invalid argument '" + argName + "'. Argument is either empty, null or undefined");
            if (actualType !== type)
                throw new Error("Invalid argument '" + argName + "'. Type must be " + type + " but found " + actualType);
            if (allowedValues && allowedValues.indexOf(arg) == -1)
                throw new Error("Invalid value " + arg + " specified for argument '" + argName + "'. Allowed - " + allowedValues.join(" | "));
        }

        // Initialize & validate the options
        validate(text, "text", "string", true);
        options = options || {};
        validate(options, "options", "object");
        timeout = timeout || 3000;
        validate(timeout, "timeout", "number");
        options.styles = options.styles || {}; // Object with style properties
        validate(options.styles, "styles", "object");
        options.align = options.align || "center" // left | center | right
        validate(options.align, "align", "string", true, ["left", "center", "right"]);
        options.valign = options.valign || "bottom"; // top | bottom
        validate(options.valign, "valign", "string", true, ["top", "bottom"]);
        options.classList = options.classList || [];
        validate(options.classList, "classList", "array");

        var alignmentClasses = ["toastmaker", "toastmaker-" + options.valign, "toastmaker-" + options.align];
        options.classList = options.classList.concat(alignmentClasses) // Array of css class names

        // Create toast element
        var toast = document.createElement('div');

        // Add css classes to toast element
        options.classList.forEach(function (c) {
            if (typeof c != "string") throw new Error("Invalid css class '" + JSON.stringify(c) + "'. CSS class must be of type string");
            toast.classList.add(c);
        });

        // Add text message to toast element
        var content = document.createTextNode(text);
        toast.appendChild(content);

        // Add styles to the toast element
        toast.style.animationDuration = timeout / 1000 + "s";
        for (var prop in options.styles) {
            if (typeof options.styles[prop] != 'string' && typeof options.styles[prop] != "number")
                throw new Error("Invalid value '" + JSON.stringify(options.styles[prop]) + "' specified for style '" +
                prop + "'. Style value must be of type string or number");
            toast.style[prop] = options.styles[prop];
        }

        // Inject toast element to DOM
        document.body.appendChild(toast);
        setTimeout(function () {
            document.body.removeChild(toast);
        }, timeout);
    }

    return ToastMaker;
}));