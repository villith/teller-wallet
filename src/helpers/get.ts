import { Contact } from "../classes/Contact";

const findById = (id: string | number, array: any[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const findAllById = (id: string | number, array: any[]) => {
  const indexes = [];
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.id === id) {
      indexes.push(i);
    }
  }
  return indexes;
};

const findByPublicKey = (key: string, array: Contact[]) => {
  let index = -1;
  for (let i = 0; i < array.length; i += 1) {
    const obj = array[i];
    if (obj.address === key) {
      index = i;
      break;
    }
  }
  return index;
};

export { findById, findAllById, findByPublicKey }
