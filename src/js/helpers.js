import { async } from 'regenerator-runtime';
import { TIMEOUt_SEC } from './config.js';

const timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`request took too long timeout after ${s} seconds`));
    }, s * 1000);
  });
};
export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeOut(TIMEOUt_SEC)]);

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
