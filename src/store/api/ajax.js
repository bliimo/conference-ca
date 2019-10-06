const ajax = (url, opts = {}, { token } = {}) => {
  const headers = (() => (opts ? { ...opts.headers } : {}))();
  const auth = `Bearer ${token}`;

  if (token) headers.Authorization = auth; // eslint-disable-line fp/no-mutation

  return fetch(url, { // eslint-disable-line
    ...opts,
    headers,
  })
    .then(response => {
      const { status, ok } = response;
      return response.text().then(text => {
        const parsed = text
          ? { ...JSON.parse(text), status, ok }
          : { status, ok };
        return parsed;
      });
    })
    .then(resp => {
      const { status } = resp;
      if (status === 401) {
        return {
          ...resp,
          message: `Unfortunately, your session has become invalid.`,
        };
      }
      return resp;
    })
    .catch(error => {
      if (error.message.match(/Network request failed/)) {
        return {
          status: 503,
          message: 'Service Unavailable',
        };
      }
      return error;
    });
};

export default ajax;
