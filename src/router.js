import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(`./components/views/Home.vue`);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: `/`,
      name: `home`,
      component: Home,
    },
  ],
  mode: `history`,
});
