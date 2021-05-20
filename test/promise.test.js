import * as chai from 'chai';
import MyPromise from '../src/promise.js';
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai);
const assert = chai.assert;

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(MyPromise);
    assert.isObject(MyPromise.prototype);
  });
  it('new Promise() 必须接受一个函数, 否则报错', () => {
    assert.throw(() => {
      new MyPromise();
    });
  });
  it('new Promise(fn）会生成一个对象，对象又 then 方法', () => {
    const promise = new MyPromise(() => {});
    assert.isFunction(promise.then);
  });
  it('new Promise(fn) 中的 fn 立即执行', () => {
    const fn = sinon.fake();
    new MyPromise(fn);
    assert(fn.called);
  });
  it('new Promise(fn) 中的 fn 执行时接受 resolve 和 reject 两个函数', () => {
    new MyPromise((resolve, reject) => {
      assert.isFunction(reject);
      assert.isFunction(resolve);
    });
  });
  it('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', done => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve) => {
      resolve();
      assert.isFalse(success.called);
      setTimeout(() => {
        assert.isTrue(success.called);
        done();
      });
    });
    promise.then(success);
  });
  it('promise.then(null, fail) 中的 fail 会在 reject 被调用的时候执行', done => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject();
      assert.isFalse(fail.called);
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    promise.then(null, fail);
  });
  it('2.1.1', () => {
    const promise = new MyPromise(() => {
    });
    assert(promise.status === 'pending');
  });
  it('2.1.2', done => {
    const promise = new MyPromise((resolve) => {
      resolve();
      setTimeout(() => {
        assert(promise.status === 'fulfilled');
        done();
      });
    });
    promise.then(() => {
    }, () => {
    });
  });
  it('2.1.3', done => {
    const promise = new MyPromise((resolve, reject) => {
      reject();
      setTimeout(() => {
        assert(promise.status === 'rejected');
        done();
      });
    });
    promise.then(() => {
    }, () => {
    });
  });
  it('2.2.1 onFulfilled和onRejected都是可选的参数', () => {
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    promise.then(false, null);
  });
  it('2.2.2 如果onFulfilled是函数', done => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve) => {
      resolve('params');
      resolve('params');
      resolve('params');
      assert.isFalse(success.called);
      setTimeout(() => {
        assert(promise.status === 'fulfilled');
        assert.isTrue(success.calledWith('params'));
        assert.isTrue(success.calledOnce);
        done();
      });
    });
    promise.then(success);
  });
  it('2.2.3 如果onRejected是函数', done => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject('params');
      reject('params');
      reject('params');
      assert.isFalse(fail.called);
      setTimeout(() => {
        assert(promise.status === 'rejected');
        assert.isTrue(fail.calledWith('params'));
        assert.isTrue(fail.calledOnce);
        done();
      });
    });
    promise.then(null, fail);
  });
  it('2.2.4 在我的代码执行完之前，不得调用 then 后面的俩函数', done => {
    const success = sinon.fake();
    const promise = new MyPromise((resolve) => {
      resolve();
    });
    promise.then(success);
    assert.isFalse(success.called);
    setTimeout(() => {
      assert.isTrue(success.called);
      done();
    });
  });
  it('2.2.4 失败回调', done => {
    const fail = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    promise.then(null, fail);
    assert.isFalse(fail.called);
    setTimeout(() => {
      assert.isTrue(fail.called);
      done();
    });
  });
  it('2.2.5 onFulfilled 和 onRejected 被调用时，里面没有 this', () => {
    const promise = new MyPromise((resolve) => {
      resolve();
    });
    promise.then(function () {
      'use strict';
      assert(this === undefined);
    });
  });
  it('2.2.6 then可以在同一个promise里被多次调用', done => {
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    const promise = new MyPromise((resolve) => {
      resolve();
    });
    promise.then(callbacks[0]);
    promise.then(callbacks[1]);
    promise.then(callbacks[2]);
    setTimeout(() => {
      assert.isTrue(callbacks[0].called);
      assert.isTrue(callbacks[0].calledBefore(callbacks[1]))
      assert.isTrue(callbacks[1].called);
      assert.isTrue(callbacks[1].calledBefore(callbacks[2]))
      assert.isTrue(callbacks[2].called);
      done();
    });
  });
  it('2.2.6 失败回调', done => {
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()];
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    promise.then(null, callbacks[0]);
    promise.then(null, callbacks[1]);
    promise.then(null, callbacks[2]);
    setTimeout(() => {
      assert.isTrue(callbacks[0].called);
      assert.isTrue(callbacks[0].calledBefore(callbacks[1]))
      assert.isTrue(callbacks[1].called);
      assert.isTrue(callbacks[1].calledBefore(callbacks[2]))
      assert.isTrue(callbacks[2].called);
      done();
    });
  })
});