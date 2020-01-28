import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import P404 from "../views/404.vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../views/Layouts/UserLayout.vue"
      ),
    children: [
      {
        path: "/user",
        redirect: "/user/logiin"
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
    component: () =>
      import(
        /* webpackChunkName: "layout" */ "../views/Layouts/BasicLayout.vue"
      ),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue"
              )
          },
          {
            path: "/form/step-form",
            name: "stepform",
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
    name: 404,
    component: P404
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});
router.afterEach(() => {
  Nprogress.done();
});
export default router;
