/* ============================================
   Main Entry — Antigravity Courses
   ============================================ */

import './style.css';
import Router from './router';
import { renderHome } from './home';
import { renderCourseDetail } from './courseDetail';

const router = new Router();

router
  .on('/', () => renderHome())
  .on('/course/:id', (params) => {
    const id = parseInt(params?.id || '0', 10);
    if (id >= 1 && id <= 13) {
      renderCourseDetail(id);
    } else {
      Router.navigate('/');
    }
  })
  .notFound(() => Router.navigate('/'));

document.addEventListener('DOMContentLoaded', () => {
  router.start();
});
