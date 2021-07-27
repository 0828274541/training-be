import axios from 'axios';
import { store } from '../store/index';

const instance = axios.create({
  baseURL: 'http://localhost:3001'
  // baseURL: 'https://training-be-node.herokuapp.com'
});

store.subscribe(() => {
  const { token } = store.getState().auth;
  instance.defaults.headers.common['auth-token'] = token;
});

instance.defaults.headers.common['auth-token'] = store.getState().auth.token;

instance.interceptors.request.use((config) => {
  console.log('Redirect to', config.url);
  return config;
});

instance.interceptors.response.use(
  // (response) =>
  // switch (response.data.code) {
  //     case 401: {
  //       //  store.commit('RESET_USER_INFO');
  //       //  return router.push("auth/login");

  //     }

  //     default: break;
  // }
);

export default instance;
