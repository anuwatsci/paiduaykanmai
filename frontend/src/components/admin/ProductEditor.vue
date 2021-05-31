<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Product" : "Add Product" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Values Required for All Fields!
        </h4>

        <div class="form-group">
            <label for="">ชื่อสินค้า</label>
            <input type="text" class="form-control" v-model="product.name" />
        </div>

        <div class="form-group">
            <label for="">รายละเอียด</label>
            <textarea
                class="form-control"
                v-model="product.description"
            ></textarea>
        </div>

        <div class="form-group">
            <label for="">ราคา</label>
            <input type="text" class="form-control" v-model="product.price" />
        </div>

        <div class="form-group">
            <label for="">หน่วยสินค้า</label>
            <input type="text" class="form-control" v-model="product.unitName" />
        </div>
 

        <div class="form-group">
            <label for="">Category</label>
            <select class="form-control" @change="onChange">
                <option :value="null">Choose a category</option>
                <option
                    v-for="(c, i) in categories"
                    :key="i"
                    :value="c.name"
                    :selected="c.name == product.category"
                >
                    {{ c.name }}
                </option>
            </select>
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/pages"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handleProduct">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            product: {
                name: null,
                description: null,
                price: null, 
                unitName: null,
                category: null,
            },
        };
    },
    computed: {
        ...mapState(["categories"]),
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        product: {
            name: { required },
            description: { required },
            price: { required },
            category: { required },
            unitName: { required }
        },
    },
    methods: {
        ...mapMutations(["setCurrentShop"]),
        ...mapActions(["addProduct", "editProduct"]),
        onChange(e) {
            this.product.category = e.target.value;
        },
        async handleProduct() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const product = new FormData();

                product.append("name", this.product.name);
                product.append("description", this.product.description);
                product.append("price", this.product.price); 
                product.append("unitName", this.product.unitName); 
                product.append(
                    "category",
                    this.product.category.name || this.product.category
                );

                if (this.editMode) {
                    console.log(this.product._id)
                    product.append("id", this.product._id); 
                    await this.editProduct(product);
                } else {
                    await this.addProduct(product);
                }

                this.setCurrentShop(1);
                this.$router.push("/admin/products");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.product,
                this.$store.getters.productById(this.$route.params["id"])
            );
        }
    },
};
</script>
