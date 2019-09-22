import HomePage from './components/pages/HomePage/Page';
import NotFoundPage from './components/pages/NotFoundPage/Page';
import LoginPage from './components/pages/LoginPage/Page';
import RegistrationPage from './components/pages/RegistrationPage/Page';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegistrationPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
