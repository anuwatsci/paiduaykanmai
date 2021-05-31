import Vue from "vue";
import VueRouter from "vue-router";

import Shops from "../components/Shops";
import ProductList from "../components/ProductList"; 
import Login from "../components/admin/Login";

import Admin from "../components/admin/Admin";
import AdminShops from "../components/admin/Shops";
import PageEditor from "../components/admin/ShopEditor";
import Products from "../components/admin/Products";
import ProductEditor from "../components/admin/ProductEditor"; 

import dataStore from "../store";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",

    routes: [ 
        { path: "/categories/:category", component: ProductList },
        { path: "/login", component: Login },
        {
            path: "/admin",
            component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "shops", component: AdminShops },
                { path: "shops/:op(add|edit)/:id?", component: PageEditor },
                { path: "products", component: Products },
                { path: "products/:op(add|edit)/:id?", component: ProductEditor }, 
                { path: "*", redirect: "/admin/products" },
            ],
        },

        { path: "/:name?", component: Shops },
        { path: "*", redirect: "/" },
    ],
});
