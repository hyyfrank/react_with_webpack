import React from 'react'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Algorithms from './pages/algorithms'
import Videos from './pages/videos'
import Configs from './pages/configs'

const myroute = 
  {
    component: Login,
    routes: [
      {
        path: '/',
        label: '登录',
        exact: true,
        component: Login
      },
      {
        path: '/dashboard',
        label: '面板',
        exact: true,
        component: Dashboard
      },
      {
        path: '/algorithms',
        label: '算法服务',
        exact: true,
        component: Algorithms
      },
      {
        path: '/configs',
        label: '配置服务',
        exact: true,
        component: Configs
      },
      {
        path: '/videos',
        label: '视频服务',
        exact: true,
        component: Videos,
        routes: [
          {
            path: '/videos/monitorarea',
            label: '移动',
            exact: true,
            component: Algorithms
          },
          {
            path: '/videos/config',
            label: '桌面',
            exact: true,
            component: Algorithms
          }
        ]
      }
    ]
  }

export default myroute