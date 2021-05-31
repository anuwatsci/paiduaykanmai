<template>
    <div class="container">
        <Header /> 
        <router-view />
    </div>
</template>

<script>
import { mapActions } from "vuex";

import Header from "./components/Header";

export default {
    components: {
        Header,
    },
    methods: {
        ...mapActions(["setShopsAction", "setCategoriesAction"]), 
    },
    created() {
        this.setShopsAction();
        this.setCategoriesAction(); 
    },
};
</script>
