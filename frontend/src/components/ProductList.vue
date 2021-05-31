<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            <div class="row">
                <div class="col-4 mt-3" v-for="(p, i) in products" :key="i">
              
                    <h3>
                        {{ p.name }}
                    </h3>
                    <p>
                        {{ p.description }}
                    </p>
                    <p>
                        {{ p.price | currency }}
                    </p> 
                </div>
            </div>
            <ProductPagination />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
    components: { CategoryList, ProductPagination },
    computed: {
        ...mapState(["products"]),
    },
    methods: {
        ...mapActions(["setProductsByCategoryAction"]),
        ...mapMutations(["setCurrentCategory", "setCurrentShop"]),
        handleAddProduct(product) {
            this.addProduct(product);
        },
    },
    created() {
        this.setCurrentShop(1);
        const category = this.$route.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
    },
    beforeRouteUpdate(to, from, next) {
        this.setCurrentShop(1);
        const category = to.params.category;
        this.setProductsByCategoryAction(category);
        this.setCurrentCategory(category);
        next();
    },
};
</script>
