import axios from 'axios';
import RNSecureStorage from 'rn-secure-storage';

// let baseURL = 'http://192.168.1.104:8000';
let baseURL = 'https://immense-tundra-42798.herokuapp.com'; // production

let instance = axios.create({
  baseURL: baseURL,
  timeout: 1800000,
});

console.log(instance, 1244);
const getAuthHeader = async () => {
  try {
    const token = await RNSecureStorage.get('jwt');
    var auth_data = '';
    if (token) {
      auth_data = token;
    } else {
      auth_data = '';
    }
    instance.defaults.headers = {authorization: auth_data};
  } catch (error) {
    console.log('GetAuthHeader ' + error);
  }
  return;
};

getAuthHeader();

export const Connector = instance;
export const ApiUrl = baseURL;
export const AuthHeader = getAuthHeader;
