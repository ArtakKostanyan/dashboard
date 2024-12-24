import {
    createRouter,
    createRoute,
    createRootRoute,
    Outlet,
} from '@tanstack/react-router';
import Sidebar from '../components/Sidebar';
import Users from '../pages/Users';
import { ROUTES } from './index';
import UserAddEdit from "../pages/UserAddEdit";

const rootRoute = createRootRoute({
    component: () => (
        <div className="flex flex-row">
            <div>
                <Sidebar />
            </div>
            <div className={'w-1/2'}>
                <Outlet />
            </div>
        </div>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.Dashboard.path,
    component: function Index() {
        return (
            <div className="p-2">
                <h3>Dashboard</h3>
            </div>
        );
    },
});

const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.User.path,
    component: Users,
});

const createUserRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.CreateUser.path,
    component: function Index() {
        return <UserAddEdit isNew={true} />;
    },
});

const editUserRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: ROUTES.EditUser.path,
    component: function Index() {
        return <UserAddEdit isNew={false} />;
    },
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    createUserRoute,
    userRoute,
    editUserRoute,
]);

const router = createRouter({ routeTree });

export { router };
