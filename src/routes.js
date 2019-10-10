import HomePage from './components/Screens/HomePage/Page';
import NotFoundPage from './components/Screens/NotFoundPage/Page';
import LoginPage from './components/Screens/LoginPage/Page';
import RegistrationPage from './components/Screens/RegistrationPage/Page';

export default [
  // {
  //   path: '/',
  //   component: MainPage,
    
  // },
  {
    path: '/',
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
