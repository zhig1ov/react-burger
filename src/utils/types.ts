export type TIngredients = {
  _id: string,
  name:string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  uuid?: number
}

export type TLocationTemplate = {
  modalViewLocation?: any;
  from: {
    pathname: string;
  };
}

export type TRegisterUserData = {
  name: string;
  email: string;
}

export type TDict<T> = {
  [name: string]: T;
};