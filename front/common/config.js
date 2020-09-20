import defaultProfile from 'public/static/images/svg/default_profile.svg';

export const BACKEND_DOMAIN = 'http://localhost';
export const BACKEND_PORT = 3030;

export const SERVER_URL = `${BACKEND_DOMAIN}:${BACKEND_PORT}`;
export const STATIC_URL = `${SERVER_URL}/static/`;
export const BASIC_USER_AVATAR = defaultProfile;
