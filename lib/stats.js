'use strict';

const ua = require('universal-analytics');
const isDocker = require('is-docker');
const Configstore = require('configstore');
const uuidv4 = require('uuid/v4');
const pkg = require('../package.json');

const trackingID = 'UA-129582046-1';

// Usage stats
function Stats(enabled, opts) {
  this.timer = {};

  return this;
}

Stats.prototype.track = function track(category, action) {
  if (!this.tracker) {
    return;
  }
  this.tracker.event(category, action).send();
};

Stats.prototype.time = function time(category, action) {
  if (!this.tracker) {
    return;
  }

  if (!this.timer[category]) {
    this.timer[category] = {};
  }
  this.timer[category][action] = Date.now();
};

Stats.prototype.timeEnd = function timeEnd(category, action, cb) {
  if (!this.tracker) {
    cb();
    return;
  }

  this.tracker
    .timing(category, action, Date.now() - this.timer[category][action])
    .send(cb);
};

module.exports = (enabled, opts) => new Stats(enabled, opts);
