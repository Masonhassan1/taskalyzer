import Login from 'views/auth/Login';
import Register from 'views/auth/Register';
import Index from 'views/Index';
import Tasks from 'views/admin/Tasks/Tasks';
import Task from 'views/admin/Task/Task';
import Profile from 'views/admin/Profile/Profile';

const routes = [
    {
        path: '/index',
        name: 'Dashboard',
        icon: 'ni ni-app text-green',
        component: Index,
        hideInSidebar: false,
        layout: '/admin'
    },
    {
        path: '/tasks',
        name: 'Tasks',
        icon: 'ni ni-bullet-list-67 text-yellow',
        component: Tasks,
        hideInSidebar: false,
        layout: '/admin'
    },
    {
        path: '/task/',
        name: 'Task',
        component: Task,
        hideInSidebar: true,
        layout: '/admin'
    },
    {
        path: '/user-profile',
        name: 'User Profile',
        icon: 'ni ni-single-02 text-orange',
        component: Profile,
        hideInSidebar: false,
        layout: '/admin'
    },
    {
        path: '/login',
        name: 'Login',
        icon: 'ni ni-key-25 text-info',
        component: Login,
        hideInSidebar: true,
        layout: '/auth'
    },
    {
        path: '/register',
        name: 'Register',
        icon: 'ni ni-circle-08 text-pink',
        component: Register,
        hideInSidebar: true,
        layout: '/auth'
    }
];
export default routes;
