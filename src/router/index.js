import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import P404 from "../views/404.vue";
import P403 from "../views/403.vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { check, isLogin } from "../utils/auth";
import { notification } from "ant-design-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../Layouts/UserLayout.vue"
      ),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../Layouts/BasicLayout.vue"
      ),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"
              )
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue"
              )
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/StepInfo.vue"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/StepConfirm.vue"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/StepResult.vue"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: 403,
    hideInMenu: true,
    component: P403
  },
  {
    path: "*",
    name: 404,
    hideInMenu: true,
    component: P404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      });
    } else if(to.path!=="/403"){
      notification.error({
        message: '403',
        description:
          '没有权限，请联系管理员',
      });
      next({
        path: '/403'
      });
    }
    Nprogress.done();
  }
  next();
});
router.afterEach(() => {
  Nprogress.done();
});
export default router;
