<!-- eslint-disable vue/html-indent -->
<template>
     <div class="container">
      <div class="card">
        <div class="card-body">
          <!-- <form v-on:submit.prevent="onSaveProduct" :validation-schema="schema"> -->
          <form
            @submit.prevent="onSubmit" 
          >
            <!-- <Form @submit="onSaveProduct" :validation-schema="schema"> -->
            <div class="form-group row my-1">
              <div class="col-6">
                <label>Email:</label>
              <input type="email" v-model="informations.email">
              </div>
              <div class="col-6">
                <label>Password:</label>
                <input type="password" v-model="informations.password"/>
             
            </div>
            <div class="col-6">
                <label>URL:</label>
                <input type="password" v-model="informations.url"/>
             
            </div>
            <div class="col-6">
                <label>Description:</label>
                <input type="password" v-model="informations.description"/>
             
            </div>
            </div>
            <button type="submit">submit</button>
        </form>
        </div>
      </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as yup from "yup";

export default {
  components: {
 
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      price: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },

  data() {
    return {
      informations: {
        url: "",
        email: "",
        password: "",
        description: ""
      },
    };
  },

  computed: { ...mapGetters(["isCreating", "createdData"]) },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, Product has been added.",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  methods: {
    ...mapActions(["storeProduct"]),
    onSubmit() {
      this.storeProduct({
        url: this.informations.url,
        email: this.informations.email,
        password: this.informations.password,
        description: this.informations.description
      });
    },
  },
};
</script>
