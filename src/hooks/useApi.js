import { useState } from 'react';

export function useApi(url, defaultMethod = 'GET') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = async (options = {}) => {
  const {
    method = defaultMethod,
    payload = null,
    headers = { 'Content-Type': 'application/json' },
    queryParams = null,
  } = options;

  setLoading(true);
  setError(null);
  setData(null);

  try {
    let fullUrl = url;
    if (method.toUpperCase() === 'GET' && queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      fullUrl = `${url}?${queryString}`;
    }

    const fetchOptions = {
      method,
      headers,
    };

    if (method.toUpperCase() !== 'GET' && payload) {
      fetchOptions.body = JSON.stringify(payload);
    }

    const response = await fetch(fullUrl, fetchOptions);
    const text = await response.text();

    console.log('--- API Raw Response ---');
    console.log(text);

    let jsonData;
    try {
      jsonData = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', parseError);
      throw new Error('Invalid JSON response: ' + text);
    }

    setData(jsonData);

    if (jsonData.status === 'error') {
      setError(jsonData.message || 'Unknown error');
    }

    return jsonData;
  } catch (err) {
    console.error('🚨 API Call Error:', err.message);
    setError(err.message || 'Request failed');
    return null;
  } finally {
    setLoading(false);
  }
};


  return { loading, error, data, callApi };
}
