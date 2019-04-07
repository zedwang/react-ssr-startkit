import Home from "./views/Home";
import Search from "./views/Search";
import Alerts from "./views/Alerts";
import Profile from "./views/Profile";

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/alerts",
        component: Alerts,
        exact: true,
    },
    {
        path: "/search",
        component: Search,
        exact: true,
    },
    {
        path: "/profile",
        component: Profile,
        exact: true,
    }
];
