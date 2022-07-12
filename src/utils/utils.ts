import { baseUrl } from "./constants";
import { TDict } from './types';
import { TOrder, TIngredients } from './types'

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

export function getCookie(name: string) {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
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

// Отсортировать заказ по статусу
export const filterOrdersByStatus = (arr: Array<TOrder>) => {
  return arr?.reduce((acc: { [name: string]: Array<TOrder> }, curr) => {
      curr.status === 'done' ? acc['done'] = [...acc['done'], curr] : acc['pending'] = [...acc['pending'], curr]
      return acc;
  }, { done: [], pending: [] })
}

const getCardDate = (days: number) => (
  days === 0 ? 'Сегодня'
      : days === 1 ? 'Вчера'
      : days > 1 ? `${days} дня(-ей) назад`
      : 'Ooops, ошибочка вышла('
);

export const createCardDate = (date: string) => {
  const dayCreated: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime: number = Math.ceil((today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000));
  const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`
  const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`

  return `${getCardDate(diffTime)}, ${hours}:${min} i-GMT+${dayCreated.getTimezoneOffset() * (-1) / 60}`;
};

export const getPrice = (arr: Array<TIngredients>) => arr?.reduce((acc: number, curr: TIngredients) => acc += curr.price, 0)

export const getBurgerIngredients = (arrIdBurgerIngredients: Array<string>, arrAllIngredients: Array<TIngredients>) => (
  arrIdBurgerIngredients?.map((id: string) => (
      arrAllIngredients.filter((item: TIngredients) => item._id === id))))?.flat()
  type TGetBurgerIngredientsObjWithCountReduceAcc = {
  item: { [name: string]: TIngredients }, count: { [name: string]: number }
}

export const getStatus = (status: string) => {
  return status === 'done'
      ? { text: 'Выполнен', textColor: 'green' }
      : status === 'pending'
      ? { text: 'Отменен', textColor: 'yellow' }
      : { text: 'Готовится', textColor: 'white' };
}

export const getBurgerIngredientsObjWithCount = (arr: Array<TIngredients>) => arr?.reduce((acc: TGetBurgerIngredientsObjWithCountReduceAcc, curr: TIngredients) => {
  const id = curr._id
  acc.item[id] = curr;
  acc.count[id] = (acc.count[id] || 0) + 1
  return acc
}
  , { item: {}, count: {} })