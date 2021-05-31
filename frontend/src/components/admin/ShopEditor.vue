<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Shop" : "Add Shop" }}
        </h2>

        <h4
            v-if="$v.$invalid && $v.$dirty"
            class="bg-danger text-white text-center p-2"
        >
            Values Required for All Fields!
        </h4>

        <div class="form-group">
            <label for="">ชื่อร้าน</label>
            <input type="text" class="form-control" v-model="shop.name" />
        </div>

        <div class="form-group">
            <label for="">โทรศัพท์</label>
            <input type="text" class="form-control" v-model="shop.telephoneNumber" />
        </div>

            <div class="form-group">
            <label for="">ที่อยู่</label>
            <input type="text" class="form-control" v-model="shop.address" />
        </div>

        <div class="form-group">
            <label for="">รายละเอียด</label> 
            <vue-editor v-model="shop.description"></vue-editor>
        </div>

        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/shops"
                >Back</router-link
            >
            <button class="btn btn-primary m-1" @click="handleShop">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            shop: {
                name: null,
                telephoneNumber: null,
                description: null,
                address: null,
            },
        };
    },
    computed: {
        editMode() {
            return this.$route.params["op"] == "edit";
        },
    },
    validations: {
        shop: {
            name: { required }, 
        },
    },
    methods: {
        ...mapActions(["addShop", "editShop"]),
        async handleShop() {
            this.$v.$touch();
            console.log(this.$v.$invalid);
            if (!this.$v.$invalid) {
                if (this.editMode) {
                    await this.editShop(this.shop);
                } else {
                    await this.addShop(this.shop);
                }

                this.$router.push("/admin/shops");
            }
        },
    },
    created() {
        if (this.editMode) {
            Object.assign(
                this.shop,
                this.$store.getters.shopById(this.$route.params["id"])
            );
        }
    },
};
</script>
