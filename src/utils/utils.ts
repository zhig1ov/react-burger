import { baseUrl } from "./constants";
import { TDict } from './types';

type TFetchOptions = {
  method: string;
  headers: TDict<string>;
  body: string;
}

export function setCookie(name: string, value: string, props?: any) {
  props = {
    path: '/',
    ...props
  }
  let exp = props.expires;
  
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;

  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) =>
  document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;

export const checkResponse = (res: Response) => {
  return res.ok ? 
    res.json() :
    res.json().then((err: any) => Promise.reject(err));
}

export const updateToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage['refreshToken']
    })
  })
  .then(checkResponse);
}

export const fetchWithRefresh = async (url: string, options: TFetchOptions) => {
  try{
    const res = await fetch(url, options);
    return await checkResponse(res);
  }
  catch(err: any){
    if(err.message === 'jwt expired'){
      const updateData = await updateToken();
        localStorage.setItem('refreshToken', updateData.refreshToken);
        setCookie('accessToken', updateData.accessToken);
        options.headers.authorization = updateData.accessToken;
        const res = await fetch(url, options)
        return await checkResponse(res);
    }
    else{
        return Promise.reject(err);
    }
  }
}