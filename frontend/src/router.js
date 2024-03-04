
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterUser from './components/RegisterUser.vue';
import ListUser from './components/ListUser.vue';

import EditPage from "./components/EditPage.vue";



const routes = [
    {
        path: '/',
        component: LoginPage,
        name: 'LoginPage'
    },
    {
        path: '/HomePage',
        component: HomePage,
        name: 'HomePage'
    },
    {
        path: '/RegisterUser',
        component: RegisterUser,
        name: 'RegisterUser'
    },
    {
        path: '/ListUser',
        component: ListUser,
        name: 'ListUser'
    },
    {
        path: "/edit/:id",
        name: "EditPage",
        component: EditPage,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; // Export the router instance
