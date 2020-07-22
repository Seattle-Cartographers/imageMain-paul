import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

export default () => {
  const BASE_URL = 'http://localhost:3012/';
  const END_POINT = '/api/carousels';
  const id = '10000000';
  const url = `${BASE_URL}${id}${END_POINT}`;
  const responses = http.get(url);
  check(responses, {
    'is status 200': (r) => r.status === 200,
  });
};
