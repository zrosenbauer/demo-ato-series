'use strict';

const Redis = require('ioredis');
const redis = new Redis('cache:6379');

const blockList = [
  'blue132@example.com'
];

const badEmailDomains = [
  'hacker.com'
];

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
    .get(`ipAddress:${ipAddress}`)
    .exec();
  const [ignoreIp, ipAddressCount] = ipResult;

  if (ipAddressCount > 7) {
    throw new Error('ATOStopper: IP Address Velocity Exceeded');
  }

  const [emailResult] = await redis
    .pipeline()
    .incr(`email:${email}`)
    .get(`email:${email}`)
    .exec();

  const [ignoreEmail, emailCount] = emailResult;

  if (emailCount > 3) {
    throw new Error('ATOStopper: Email Velocity Exceeded');
  }
}

module.exports = {
  assertSafe
};
