import HomePage from './components/pages/HomePage/Page';
import NotFoundPage from './components/pages/NotFoundPage/Page';

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
