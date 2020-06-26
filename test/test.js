const assert = require('chai').assert;
const expect = require('chai').expect;
const ToastMaker = require('../lib/toastmaker');

const DEFAULT_TOAST_TIMEOUT = 3000;
const DEFAULT_TOAST_CLASS = 'toastmaker';
const ADJUSTED_TEST_EXECUTION_TIMEOUT = DEFAULT_TOAST_TIMEOUT + 2000;


before(function () {
    // runs once before the first test in this block
    this.jsdom = require('jsdom-global')();
});
after(function () {
    // runs once after the last test in this block
    this.jsdom();
});

describe('Validate "text" Option', () => {
    context('when invalid `text` is passed to ToastMaker', function () {

        it('should throw error if text argument empty or undefined', () => {
            expect(() => ToastMaker()).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
            expect(() => ToastMaker('')).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
        });

        it('should throw error if text argument type is number', () => {
            expect(() => ToastMaker(12345)).to.throw("Invalid argument 'text'. Type must be string but found number");
            expect(() => ToastMaker(0)).to.throw("Invalid argument 'text'. Type must be string but found number");
            expect(() => ToastMaker(-12345)).to.throw("Invalid argument 'text'. Type must be string but found number");
        });

        it('should throw error if text argument type is object', () => {
            expect(() => ToastMaker({})).to.throw("Invalid argument 'text'. Type must be string but found object");
            expect(() => ToastMaker([])).to.throw("Invalid argument 'text'. Type must be string but found object");
        });
    });

    context('when valid "text" is passed to ToastMaker', function () {

        it('should create and show the toast element', function (done) {
            this.timeout(ADJUSTED_TEST_EXECUTION_TIMEOUT);
            expect(() => ToastMaker('Hi')).to.not.throw();

            //check if toast element is created in dom
            const toast = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
            assert.equal(toast.length, 1);

            setTimeout(() => {
                //check if toast element is removed from dom
                const toastAfterTimeout = document.getElementsByClassName(DEFAULT_TOAST_CLASS);
                assert.equal(toastAfterTimeout.length, 0);
                done();
            }, DEFAULT_TOAST_TIMEOUT);
        });

    });

});