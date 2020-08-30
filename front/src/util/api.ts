import * as axios from 'axios';
import * as egg from 'store/types';

// let headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');

export const api = axios.default.create({
  baseURL: 'http://localhost:3030',
  responseType: 'json',
  withCredentials: true, // 쿠키 땜시 설정
});

// interface ServerData {
//   message: string;
//   token: string;
// }

/** @api요청_회원가입 */
export const signUp = async (
  bodyData: egg.RequestSignUpData,
): Promise<axios.AxiosResponse<any>> =>
  await api.post('/account/sign-up', bodyData);

/** @api요청_로그인 */
export const logIn = async (
  bodyData: egg.RequestLoginData,
): Promise<axios.AxiosResponse<any>> =>
  await api.post('/account/sign-in', bodyData);

/** @api요청_로그아웃 */
export const logOut = async (): Promise<axios.AxiosResponse<any>> =>
  await api.delete('/account/log-out');

/** @api요청_쿠키_유저정보_가져오기 */
export const loadUserData = async (): Promise<axios.AxiosResponse<any>> =>
  await api.get('/account/user');

/** @api요청_인풋_유요성체크 */
export const inputValidation = async (
  body: egg.RequestInputValidData,
): Promise<axios.AxiosResponse<any>> =>
  await api.post('/account/validation', body);

/** @api요청_쿠키_만료연장 */
export const cookieExpiry = async (): Promise<axios.AxiosResponse<any>> =>
  await api.get('/account/cookie-expiry');

export default api;
