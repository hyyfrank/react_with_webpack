import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Algorithms from "./pages/algorithms";
import Machines from "./pages/machines";
import Devices from "./pages/devices";
import Deploys from "./pages/deploys";

const myroute = {
  component: Login,
  routes: [
    {
      path: "/",
      label: "登录",
      exact: true,
      component: Login,
    },
    {
      path: "/login",
      label: "登录",
      exact: true,
      component: Login,
    },
    {
      path: "/dashboard",
      label: "面板",
      exact: true,
      component: Dashboard,
    },
    {
      path: "/algorithms",
      label: "算法服务",
      exact: true,
      component: Algorithms,
    },
    {
      path: "/devices",
      label: "相机管理",
      exact: true,
      component: Devices,
    },
    {
      path: "/machines",
      label: "服务器列表",
      exact: true,
      component: Machines,
    },
    {
      path: "/deploys",
      label: "部署列表",
      component: Deploys,
      routes: [
        {
          path: "/deploys/detail/:IoTCode",
          label: "监控区域",
          exact: true,
          component: Deploys,
        },
      ],
    },
  ],
};

export default myroute;
