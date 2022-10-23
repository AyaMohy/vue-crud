// import { GET_ALL_PRODUCTS } from "./Types";
import axios from 'axios';

// initial state
const state = () => ({
  products: [],
  productsPaginatedData: null,
  product: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
})

// getters
const getters = {
  productList: state => state.products,
  productsPaginatedData: state => state.productsPaginatedData,
  product: state => state.product,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData
};

// actions
const actions = {
  async fetchAllProducts({ commit }) {
    // let page = 1;
    // // let search = '';
    // if(query !== null){
    //   page = query?.page || 1;
    //   // search = query?.search || '';
    // }

    commit('setProductIsLoading', true);
    // let url = `${process.env.VUE_APP_API_URL}products?page=${page}`;
    let url = `http://localhost:5000/api/User/1abedcdc-6f87-406c-bb89-7c388c3cef05`
    // if (search === null) {
    //   url = `${url}?page=${page}`;
    // } else {
    //   url = `${process.env.VUE_APP_API_URL}products/view/search?search=${search}&page=${page}`
    // }

    await axios.get(url)
      .then(res => {
        const products = res.data;
        // const products = res.data.data.data;
        commit('setProducts', products);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        commit('setProductsPaginated', res.data.data);
        commit('setProductIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsLoading', false);
      });
  },

  async fetchDetailProduct({ commit }, id) {
    commit('setProductIsLoading', true);
    await axios.get(`${process.env.VUE_APP_API_URL}products/${id}`)
      .then(res => {
        commit('setProductDetail', res.data.data);
        commit('setProductIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsLoading', false);
      });
  },

  async storeProduct({ commit }, product) {
    commit('setProductIsCreating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}products`, product)
      .then(res => {
        commit('saveNewProducts', res.data.data);
        commit('setProductIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsCreating', false);
      });
  },

  async storeAccount({ commit }, accounts) {
       await axios.post('http://localhost:5000/api/Account/register', {
          email: accounts.email,
          password:accounts.password,
          displayName:accounts.displayname,
          userName:accounts.userName
        })
        .then(res=>{
          console.log("rse post data: ", res.data)
          // Cookies.set('logedIn', true);
          // Cookies.set('token', res.data.result.token);
        } ).catch(err => {
          console.log('error post', err);
          commit('setProductIsCreating', false);
        });
        
  },

  

  async updateProduct({ commit }, product) {
    commit('setProductIsUpdating', true);
    commit('setProductIsUpdating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}products/${product.id}?_method=PUT`, product)
      .then(res => {
        commit('saveUpdatedProduct', res.data.data);
        commit('setProductIsUpdating', false);
      }).catch(err => {
        console.log('error fetch all data', err);
        commit('setProductIsUpdating', false);
      });
  },


  async deleteProduct({ commit }, id) {
    commit('setProductIsDeleting', true);

    await axios.delete(`http://localhost:5000/api/Information/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'token':'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJvYiIsIm5hbWVpZCI6IjFhYmVkY2RjLTZmODctNDA2Yy1iYjg5LTdjMzg4YzNjZWYwNSIsImVtYWlsIjoiYm9iQHRlc3QuY29tIiwibmJmIjoxNjY2NTUzNDc2LCJleHAiOjE2NjcxNTgyNzYsImlhdCI6MTY2NjU1MzQ3Nn0.-RHRYb_8uC7F_5XOkvQcYx7Sc72fPXc6c3XWqB7ATcuh94Dfbm7jgxX6WCTsGbR4LL7_RyDANt1stf71O_g7Yg'
          // 'token': Cookies.get('token')
        }
      }
    )
      // await axios.delete(`${process.env.VUE_APP_API_URL}products/${id}`)
      .then(res => {
        commit('setDeleteProduct', res.data);
        commit('setProductIsDeleting', false);
      }).catch(err => {
        console.log('error delete item', err);
        commit('setProductIsDeleting', false);
      });
  },

  updateProductInput({ commit }, e) {
    commit('setProductDetailInput', e);
  }
}

// mutations
const mutations = {
  setProducts: (state, products) => {
    state.products = products
  },

  setProductsPaginated: (state, productsPaginatedData) => {
    state.productsPaginatedData = productsPaginatedData
  },

  setProductDetail: (state, product) => {
    state.product = product
  },

  setDeleteProduct: (state, id) => {
    state.productsPaginatedData.data.filter(x => x.id !== id);
  },

  setProductDetailInput: (state, e) => {
    let product = state.product;
    product[e.target.name] = e.target.value;
    state.product = product
  },

  saveNewProducts: (state, product) => {
    state.products.unshift(product)
    state.createdData = product;
  },

  saveUpdatedProduct: (state, product) => {
    state.products.unshift(product)
    state.updatedData = product;
  },

  setProductIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setProductIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setProductIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setProductIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}