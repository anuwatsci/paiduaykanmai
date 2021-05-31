<template>
    <div>
        <h2>Shops</h2>

        <router-link class="btn btn-primary mb-4" to="/admin/shops/add"
            >Add Shop</router-link
        >

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tel.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in shops" :key="i">
                    <td class="align-middle">{{ p.name }}</td>
                    <td class="align-middle">{{ p.telephoneNumber }}</td>
                    <td class="align-middle">
                        <button
                            class="btn btn-sm btn-secondary mx-2"
                            @click="handleEdit(p)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-sm btn-danger mx-2"
                            @click="deleteShop(p)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState(["shops"]),
    },
    methods: {
        ...mapActions(["deleteShop"]),
        handleEdit(shop) {
            this.$router.push(`/admin/shops/edit/${shop._id}`);
        },
    },
};
</script>
