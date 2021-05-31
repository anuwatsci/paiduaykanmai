<template>
    <div class="row mt-3">
        <CategoryList />

        <div class="col-9">
            เบอร์โทร
            <div v-html="shopTel"></div>
            ที่อยู่
            <div v-html="shopAddress"></div>
            รายละเอียด
            <div v-html="shopDesc"></div>
            
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

import CategoryList from "./CategoryList";

export default {
    components: { CategoryList },
    computed: {
        ...mapState(["shops"]),
        shopDesc() {
            const name = this.$route.params.name
                ? this.$route.params.name
                : "home";
            const shop = this.shops.find((page) => page.name == name); 
            if (shop) {
                return shop.description;
            } else {
                return "";
            }
        }, shopTel() {
            const name = this.$route.params.name
                ? this.$route.params.name
                : "home";
            const shop = this.shops.find((page) => page.name == name); 
            if (shop) {
                return shop.telephoneNumber;
            } else {
                return "";
            }
        },shopAddress() {
            const name = this.$route.params.name
                ? this.$route.params.name
                : "home";
            const shop = this.shops.find((page) => page.name == name); 
            if (shop) {
                return shop.address;
            } else {
                return "";
            }
        },

        
    },
};
</script>
