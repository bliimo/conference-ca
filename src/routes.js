import HomePage from './components/Pages/HomePage/Page';
import NotFoundPage from './components/Pages/NotFoundPage/Page';
import LoginPage from './components/Pages/LoginPage/Page';
import RegistrationPage from './components/Pages/RegistrationPage/Page';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
