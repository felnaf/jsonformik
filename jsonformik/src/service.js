import instance from './api/instance';
import cryptoJs from 'crypto-js';

export const getData = (url) => instance.get(url);
export const postData = (url, data) => instance.post(url, data);
export const deleteData = (url) => instance.delete(url);
export const editData = (url, data) => instance.patch(url, data);

export const encrypt = (password) => {
    var ciphertext = cryptoJs.AES.encrypt(
      JSON.stringify(password),
      'my-secret-key@123'
    ).toString();
    return ciphertext;
  };

  export const decrypt = (password) => {
    // const { data } = await getDataFromJson('loginCredentials/');
  
    var bytes = cryptoJs.AES.decrypt(password, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
  
    return decryptedData;
  };