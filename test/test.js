const assert = require('chai').assert;
const expect = require('chai').expect;
const ToastMaker = require('../lib/toastmaker');

const DEFAULT_TOAST_TIMEOUT = 3000;


before(function () {
    // runs once before the first test in this block
    this.jsdom = require('jsdom-global')();
});
after(function () {
    // runs once after the last test in this block
    this.jsdom();
});

describe('ToastMaker', () => {
    it('should throw error if no text argument is passed for toast', () => {
        expect(() => ToastMaker()).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
    });
});

describe('ToastMaker', () => {
    it('should throw error if number is specified as text argument for toast', () => {
        expect(() => ToastMaker(12345)).to.throw("Invalid argument 'text'. Type must be string but found number");
    });
});

describe('ToastMaker', () => {
    it('should throw error if object is specified as text argument for toast', () => {
        expect(() => ToastMaker({})).to.throw("Invalid argument 'text'. Type must be string but found object");
    });
});

describe('ToastMaker', () => {
    it('should throw error if empty string is specified as text argument for toast', () => {
        expect(() => ToastMaker('')).to.throw("Invalid argument 'text'. Argument is either empty, null or undefined");
    });
});

describe('ToastMaker', () => {
    it('should not throw error if non-empty text argument is passed for toast', function (done) {
        this.timeout(5000);
        expect(() => ToastMaker('Hi')).to.not.throw();

        const toast = document.getElementsByClassName('toastmaker');
        assert.equal(toast.length, 1);

        setTimeout(() => {
            const toastAfterTimeout = document.getElementsByClassName('toastmaker');
            assert.equal(toastAfterTimeout.length, 0);
            done();
        }, DEFAULT_TOAST_TIMEOUT);
    });
});