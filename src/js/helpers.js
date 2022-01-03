import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAXcall = async function (uri, payload = null) {
  // eslint-disable-next-line no-useless-catch
  try {
    const fetchPromise = payload
      ? fetch(uri, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      : fetch(uri);

    const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

    const data = await response.json();

    if (!response.ok) {
      const newError = new Error(`${response.status} ${data.message}`);
      newError.response = {
        status: response.status,
        body: data,
      };
      throw newError;
    }

    return data;
  } catch (err) {
    throw err;
  }
};

const errorMessage = function (error) {
  switch (error.response?.status) {
    case 500: {
      return 'Server error. Please, try again later or contact Support.';
    }
    case 400: {
      return 'We were not able to handle one or more of the provided parameters. Please, check and try again.';
    }
    default: {
      return 'Unknown error. Please, contact Support.';
    }
  }
};

const round = function (value, step = 1) {
  //  step || (step = 1.0);
  return Math.round(value / step) * step;
};

const wait = seconds =>
  new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });

export { AJAXcall, round, errorMessage, wait };
