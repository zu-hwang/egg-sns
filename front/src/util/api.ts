import * as axios from 'axios';
import * as egg from 'store/types';

// let headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');

const API = axios.default.create({
  baseURL: 'http://localhost:3030',
  responseType: 'json',
  withCredentials: true, // 쿠키 땜시 설정
});

// interface ServerData {
//   message: string;
//   token: string;
// }

export const signUp = async (
  bodyData: egg.RequestSignUpData,
): Promise<axios.AxiosResponse<any>> =>
  await API.post('/account/sign-up', bodyData);

export const logIn = async (
  bodyData: egg.RequestLoginData,
): Promise<axios.AxiosResponse<any>> =>
  await API.post('/account/sign-in', bodyData);

export const logOut = async (): Promise<axios.AxiosResponse<any>> =>
  await API.delete('/account/log-out');

export const loadUserData = async (): Promise<axios.AxiosResponse<any>> =>
  await API.get('/account/user-info');

export default API;
