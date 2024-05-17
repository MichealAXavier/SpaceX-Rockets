import { createRouter, createWebHistory } from 'vue-router';
import LaunchCard from '../components/LaunchCard.vue'; 
const routes = [
  {
    path: '/:flightNo?', 
    name: 'LaunchCard',
    component: LaunchCard, 
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
