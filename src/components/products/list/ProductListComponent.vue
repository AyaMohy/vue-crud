<script>
import { mapGetters, mapActions } from "vuex";
import ProductDetail from "../list/ProductDetail";
import VPagination from "@hennge/vue3-pagination";

export default {
  components: {
    ProductDetail,
    VPagination,
  },
  data() {
    return {
      query: {
        page: 1,
        search: "",
      },
    };
  },

  computed: { ...mapGetters(["productList", "productsPaginatedData", "isLoading"]) },
  created() {
    this.fetchAllProducts(this.query);
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),

    getResults() {
      this.fetchAllProducts(this.query);
    },

    searchProducts() {
      this.fetchAllProducts(this.query);
    },
  },
 
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-between mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-4">
          All Users
        </h4>
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <!-- <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-3">URL</div>
          <div class="col-2">email</div>
          <div class="col-2">Actions</div>
        </div> -->

        <div v-for="(item, index) in productList.info" :key="item.id">
          <ProductDetail :index="index" :product="item" />
        </div>
      </div>

      <div 
        v-if="isLoading" 
        class="text-center mt-5 mb-5"
      >
        Loading Products...
        <div
          class="spinner-grow"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div v-if="productsPaginatedData !== null" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="productsPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<!-- bob@test.com -->
<!-- Pa$$w0rd -->
