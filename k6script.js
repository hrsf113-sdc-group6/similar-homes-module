const http = require('k6/http');
const { check, sleep } = require('k6');

export const options = {
  vus: 70,
  duration: '1m',
};

export default function () {
  let res = http.get(`http://localhost:3004/similarhomes/${Math.floor(Math.random() * 1e7) + 1}/nearby/`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 350,
  });
  // sleep(0.02);
}
