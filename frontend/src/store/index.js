import Vue from "vue";
import Vuex from "vuex";

import Axios from "axios";
 
import AuthModule from "./auth";

Vue.use(Vuex);

const baseUrl = "http://localhost:3000";
const shopsUrl = `${baseUrl}/shops`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`; 

export default new Vuex.Store({
    strict: true,
    modules: { 
        auth: AuthModule
    },
    state: {
        shops: [],
        categories: [],
        products: [], 
        currentshop: 1,
        shopCount: 0,
        shopSize: 4,
        currentCategory: "all",
    },
    getters: {
        shopById: (state) => (id) => state.shops.find((p) => p._id == id),
        productById: (state) => (id) => state.products.find((p) => p._id == id),
    },
    mutations: {
        setshops(state, shops) {
            state.shops = shops;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setshopCount(state, count) {
            state.shopCount = Math.ceil(Number(count) / state.shopSize);
        },
        setCurrentShop(state, shop) {
            state.currentshop = shop;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
        },
    },
    actions: {
        async setShopsAction(context) {
            context.commit("setshops", (await Axios.get(shopsUrl)).data);
        },
        async setCategoriesAction(context) {
            context.commit(
                "setCategories",
                (await Axios.get(categoriesUrl)).data
            );
        },
        async setProductsByCategoryAction(context, category) {
            let url;
            let productCountUrl;

            if (category != "all") {
                url = `${productsUrl}/${category}`;
                productCountUrl = `${productsUrl}/count/${category}`;
            } else {
                url = `${productsUrl}`;
                productCountUrl = `${productsUrl}/count/all`;
            }

            const productCount = (await Axios.get(productCountUrl)).data;

            context.commit("setshopCount", productCount);
            context.commit("setProducts", (await Axios.get(url)).data);
        },

        async setProductsByCategoryPaginationAction(context, shop) {
            let url;

            if (context.state.currentCategory != "all") {
                url = `${productsUrl}/${context.state.currentCategory}?p=${shop}`;
            } else {
                url = `${productsUrl}?p=${shop}`;
            }

            context.commit("setProducts", (await Axios.get(url)).data);
        },

        async addShop(context, shop) {
            await Axios.post(shopsUrl, shop);
            context.commit("setshops", (await Axios.get(shopsUrl)).data);
        },
        async editShop(context, shop) {
            await Axios.put(`${shopsUrl}/${shop._id}`, shop);
            context.commit("setshops", (await Axios.get(shopsUrl)).data);
        },
        async deleteShop(context, shop) {
            await Axios.delete(`${shopsUrl}/${shop._id}`);
            context.commit("setshops", (await Axios.get(shopsUrl)).data);
        },

        async addProduct(context, product) {
            await Axios.post(productsUrl, product);
        },
        async editProduct(context, product) {
            await Axios.put(productsUrl, product);
        },
        async deleteProduct(context, product) {
            await Axios.delete(`${productsUrl}/${product._id}`);

            const url = `${productsUrl}?p=${context.state.currentshop}`;
            context.commit("setProducts", (await Axios.get(url)).data);
        },
    },
});
