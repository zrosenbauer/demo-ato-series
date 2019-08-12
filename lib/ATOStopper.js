'use strict';

const Redis = require('ioredis');
const redis = new Redis('cache:6379');

const blockList = [
  'blue132@example.com'
];

const badEmailDomains = [
  'hacker.com'
];

const MINUTES_15 = 60 * 15;

async function assertSafe ({ email, ipAddress }) {
  if (blockList.includes(email)) {
    throw new Error('ATOStopper: Blocked email');
  }

  if (badEmailDomains.includes(email)) {
    throw new Error('ATOStopper: Blocked email');
  }

  const [ipResult] = await redis
    .pipeline()
    .incr(`ipAddress:${ipAddress}`)
    .expire(`ipAddress:${ipAddress}`, MINUTES_15)
    .get(`ipAddress:${ipAddress}`)
    .exec();
  const [, ipAddressCount] = ipResult;

  if (ipAddressCount > 20) {
    throw new Error('ATOStopper: IP Address Velocity Exceeded');
  }

  const [emailResult] = await redis
    .pipeline()
    .incr(`email:${email}`)
    .expire(`ipAddress:${ipAddress}`, MINUTES_15)
    .get(`email:${email}`)
    .exec();

  const [, emailCount] = emailResult;

  if (emailCount > 7) {
    throw new Error('ATOStopper: Email Velocity Exceeded');
  }
}

module.exports = {
  assertSafe
};
