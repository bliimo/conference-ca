import HomePage from './components/Pages/HomePage/Page';
import MainPage from './components/Pages/MainPage/Page'
import NotFoundPage from './components/Pages/NotFoundPage/Page';
import LoginPage from './components/Pages/LoginPage/Page';
import RegistrationPage from './components/Pages/RegistrationPage/Page';

export default [
  {
    path: '/',
    component: MainPage,
    
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegistrationPage
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
];
