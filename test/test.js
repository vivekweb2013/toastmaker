const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Module = require("module");
const wrap = Module.wrap;
const ToastMaker = require('../src/toastmaker');

const DEFAULT_TOAST_TIMEOUT = 3000;
const DEFAULT_TOAST_CLASS = 'toastmaker';
const DEFAULT_ALIGN_CLASS = 'toastmaker-center';
const DEFAULT_VALIGN_CLASS = 'toastmaker-bottom';
const TEST_EXECUTION_TIME_WITH_OFFSET = DEFAULT_TOAST_TIMEOUT + 2000;

before(function () {
    // runs once before the first test in this block
    this.jsdom = require('jsdom-global')();
});

after(function () {
    // runs once after the last test in this block
    this.jsdom();
});

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

describe('test module loading', function () {
    context('with amd/define available as global', function () {
        const moduleWrapCopy = Module.wrap;

        before(function () {
            Module.wrap = function (script) {
                script = `
                        define = function () {
                            console.log('    I am a fake define!    ');
                        }
            
                        define.amd = true;` + script;
                return moduleWrapCopy(script); // Call original wrapper function
            };
        });
        it('should run without any error', function () {
            const ToastMaker = requireUncached("../src/toastmaker");
        });
        after(function () { Module.wrap = wrap; });
    });

    context('with no exports/define available', function () {
        const moduleWrapCopy = Module.wrap;

        before(function () {
            Module.wrap = function (script) {
                script = `exports = 'test';
                delete define;
                ` + script;
                return moduleWrapCopy(script); // Call original wrapper function
            };
        });

        it('should run without any error', function () {
            const ToastMaker = requireUncached("../src/toastmaker");
        });

        after(function () { Module.wrap = wrap; });
    });

    after(function () { Module.wrap = wrap; });
});


describe('Validate "text" Option', () => {

    context('when invalid "text" is passed to ToastMaker', function () {

        it('should throw error if text argument empty or undefined', () => {
            expect(() => ToastMaker()).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
            expect(() => ToastMaker('')).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
        });

        it('should throw error if text argument type is number', () => {
            expect(() => ToastMaker(12345)).to.throw("Invalid argument 'text'. Type must be string but found number");
            expect(() => ToastMaker(0)).to.throw("Invalid argument 'text'. Type must be string but found number");
            expect(() => ToastMaker(-12345)).to.throw("Invalid argument 'text'. Type must be string but found number");
        });

        it('should throw error if text argument type is boolean', () => {
            expect(() => ToastMaker(true)).to.throw("Invalid argument 'text'. Type must be string but found boolean");
        });

        it('should throw error if text argument type is object/array', () => {
            expect(() => ToastMaker({})).to.throw("Invalid argument 'text'. Type must be string but found object");
            expect(() => ToastMaker([])).to.throw("Invalid argument 'text'. Type must be string but found array");
        });
    });

    context('when valid "text" is passed to ToastMaker', () => {

        it('should create and show the toast element', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);
            expect(() => ToastMaker('Hi')).to.not.throw();

            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);
            const toastElement = toastElements[0];
            assert.equal(toastElement.textContent, 'Hi');

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should create even if text contains emojis', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);
            const emojiText = '😀👐🏾🦋🔥🌈🍮🍪🚌✈️💿☎️☁︎✂︎⛴🏈';
            expect(() => ToastMaker(emojiText)).to.not.throw();

            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);
            const toastElement = toastElements[0];
            assert.equal(toastElement.textContent, emojiText);

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

    });

});

describe('Validate "timeout" Option', () => {

    context('when invalid "timeout" is passed to ToastMaker', () => {

        it('should throw error if timeout argument type is string', () => {
            expect(() => ToastMaker('Hi', 'test')).to.throw("Invalid argument 'timeout'. Type must be number but found string");
        });

        it('should throw error if timeout argument type is boolean', () => {
            expect(() => ToastMaker('Hi', true)).to.throw("Invalid argument 'timeout'. Type must be number but found boolean");
        });

        it('should throw error if timeout argument type is object/array', () => {
            expect(() => ToastMaker('Hi', {})).to.throw("Invalid argument 'timeout'. Type must be number but found object");
            expect(() => ToastMaker('Hi', [])).to.throw("Invalid argument 'timeout'. Type must be number but found array");
        });

    });

    context('when valid "timeout" is passed to ToastMaker', () => {

        it('should not throw error if "timeout" argument type is undefined or null', function (done) {
            // in this case toast should be created with default timeout.
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', undefined)).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should show toast for specified duration', function (done) {
            this.timeout(10000); // wait for 10 seconds

            // show toast for 8 seconds
            expect(() => ToastMaker('Hi', 8000)).to.not.throw();;

            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);

            setTimeout(() => {
                // check if toast is still there after 7 seconds
                const toastBeforeTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastBeforeTimeout.length, 1);
            }, 7000);

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, 8000);
        });

    });
});

describe('Validate Additional Options', () => {

    context('when invalid "options" is passed to ToastMaker', () => {

        it('should throw error if "options" argument type is string', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, 'test')).to.throw("Invalid argument 'options'. Type must be object but found string");
        });

        it('should throw error if "options" argument type is boolean', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, true)).to.throw("Invalid argument 'options'. Type must be object but found boolean");
        });

        it('should throw error if "options" argument type is number', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, 123)).to.throw("Invalid argument 'options'. Type must be object but found number");
        });

        it('should throw error if "options" argument type is array', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, [1, 2, 3])).to.throw("Invalid argument 'options'. Type must be object but found array");
        });

        it('should throw error if "styles" option type is string', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: 'test' })).to.throw("Invalid argument 'styles'. Type must be object but found string");
        });

        it('should throw error if "styles" option type is boolean', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: true })).to.throw("Invalid argument 'styles'. Type must be object but found boolean");
        });

        it('should throw error if "styles" option type is number', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: 123 })).to.throw("Invalid argument 'styles'. Type must be object but found number");
        });

        it('should throw error if "styles" option type is array', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: [1, 2, 3] })).to.throw("Invalid argument 'styles'. Type must be object but found array");
        });

        it('should throw error if "styles" has invalid property value', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: { fontSize: [123] } })).to.throw("Invalid value '[123]' specified for style 'fontSize'. Style value must be of type string or number");
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: { fontSize: {} } })).to.throw("Invalid value '{}' specified for style 'fontSize'. Style value must be of type string or number");
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { styles: { fontSize: true } })).to.throw("Invalid value 'true' specified for style 'fontSize'. Style value must be of type string or number");
        });

        it('should throw error if "align" option type is boolean', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: true })).to.throw("Invalid argument 'align'. Type must be string but found boolean");
        });

        it('should throw error if "align" option type is number', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: 123 })).to.throw("Invalid argument 'align'. Type must be string but found number");
        });

        it('should throw error if "align" option type is array', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: [1, 2, 3] })).to.throw("Invalid argument 'align'. Type must be string but found array");
        });

        it('should throw error if "align" option type is object', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: {} })).to.throw("Invalid argument 'align'. Type must be string but found object");
        });

        it('should throw error if "align" option value is other than left, center, right', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: 'test' })).to.throw("Invalid value test specified for argument 'align'. Allowed - left | center | right");
        });

        it('should throw error if "valign" option type is boolean', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { valign: true })).to.throw("Invalid argument 'valign'. Type must be string but found boolean");
        });

        it('should throw error if "valign" option type is number', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { valign: 123 })).to.throw("Invalid argument 'valign'. Type must be string but found number");
        });

        it('should throw error if "valign" option type is array', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { valign: [1, 2, 3] })).to.throw("Invalid argument 'valign'. Type must be string but found array");
        });

        it('should throw error if "valign" option type is object', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { valign: {} })).to.throw("Invalid argument 'valign'. Type must be string but found object");
        });

        it('should throw error if "valign" option value is other than top, bottom', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { valign: 'test' })).to.throw("Invalid value test specified for argument 'valign'. Allowed - top | bottom");
        });

        it('should throw error if "classList" option type is string', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: 'test' })).to.throw("Invalid argument 'classList'. Type must be array but found string");
        });

        it('should throw error if "classList" option type is boolean', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: true })).to.throw("Invalid argument 'classList'. Type must be array but found boolean");
        });

        it('should throw error if "classList" option type is number', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: 123 })).to.throw("Invalid argument 'classList'. Type must be array but found number");
        });

        it('should throw error if "classList" option type is object', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: {} })).to.throw("Invalid argument 'classList'. Type must be array but found object");
        });

        it('should throw error if "classList" contains invalid value', () => {
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: [1, 2] })).to.throw("Invalid css class '1'. CSS class must be of type string");
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: [{}] })).to.throw("Invalid css class '{}'. CSS class must be of type string");
            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { classList: [true] })).to.throw("Invalid css class 'true'. CSS class must be of type string");
        });

    });

    context('when valid "options" is passed to ToastMaker', () => {

        it('should not throw error if "options" argument type is undefined or null', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, undefined)).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should create toast with specified "styles" option', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, {
                styles: {
                    fontSize: '18px',
                    backgroundColor: 'green'
                }
            })).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toastElements.length, 1);
            const toast = toastElements[0];
            assert.equal(toast.style.fontSize, '18px');
            assert.equal(toast.style.backgroundColor, 'green');

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should create toast with default "align" & "valign" classes', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, {})).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(`${DEFAULT_TOAST_CLASS}  ${DEFAULT_ALIGN_CLASS} ${DEFAULT_VALIGN_CLASS}`);
            assert.equal(toastElements.length, 1);
            const toast = toastElements[0];

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should create toast with specified "align" & "valign" classes', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, { align: 'right', valign: 'top' })).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(`${DEFAULT_TOAST_CLASS}  toastmaker-right toastmaker-top`);
            assert.equal(toastElements.length, 1);
            const toast = toastElements[0];

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

        it('should create toast with specified "classList" option', function (done) {
            this.timeout(TEST_EXECUTION_TIME_WITH_OFFSET);

            expect(() => ToastMaker('Hi', DEFAULT_TOAST_TIMEOUT, {
                classList: ['custom-class', 'other-custom-class']
            })).to.not.throw();
            // check if toast element is created in dom
            const toastElements = document.getElementsByClassName(`${DEFAULT_TOAST_CLASS} custom-class other-custom-class`);
            assert.equal(toastElements.length, 1);

            setTimeout(() => {
                // check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

    });

});