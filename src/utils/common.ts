export const shuffle = (arr: any) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url: string, params: Record<string, any>) => {
  let urlWithParams = url;
  const paramKeys = Object.keys(params);

  if (paramKeys.length > 0) {
    urlWithParams += "?";

    paramKeys.forEach((key, i) => {
      const sign = i === 0 ? "" : "&";
      urlWithParams += `${sign}${key}=${params[key]}`;
    });
  }

  return urlWithParams;
};

