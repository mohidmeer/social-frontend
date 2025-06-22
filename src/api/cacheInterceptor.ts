const responseCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 30 * 1000;

const getCacheKey = (config: any) => config.url;

export const invalidateCache = (url: string) => {
  delete responseCache[url];
};

export const checkCache = (config: any) => {

    console.log(responseCache)
  const key = getCacheKey(config);

  console.log(config.method)

  if (config.method === 'get') {
    const cached = responseCache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      config.adapter = async () => ({
        data: cached.data,
        status: 200,
        statusText: "OK (cached)",
        headers: {},
        config,
      });
    }
  } else {
    invalidateCache(key);
  }

  return config;
};


export const saveToCache = (response: any) => {
  const key = getCacheKey(response.config);
  if (response.config.method === 'get') {
    responseCache[key] = {
      data: response.data,
      timestamp: Date.now(),
    };
  }
  return response;
};