import { async } from 'regenerator-runtime';
import { TIMEOUt_SEC } from './config.js';

const timeOut = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`request took too long timeout after ${s} seconds`));
    }, s * 1000);
  });
};
export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeOut(TIMEOUt_SEC)]);

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
};
/*
export const getJson = async function (url) {
 
};
export const sendsJson = async function (url, uploadData) {
  try {

    const res = await Promise.race([fetchPro, timeOut(TIMEOUt_SEC)]);

    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message}`);
    return data;
  } catch (error) {
    throw error;
  }
}*/
