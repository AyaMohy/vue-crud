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
              <input type="email" v-model="accounts.email">
              </div>
              <div class="col-6">
                <label>Name:</label>
              <input type="text" v-model="accounts.name"/>

              </div>
              <div class="col-6">
                <label>UserName:</label>
              <input type="text" v-model="accounts.username"/> 
              </div>
              <div class="col-6">
                <label>Password:</label>
                <input type="password" v-model="accounts.password"/>
             
            </div>
            </div>
            <button type="submit">submit</button>
        </form>
        <div class="register">
          <p>Don't have an account? <router-link to="/register">Register</router-link>
          </p>
        </div>
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
        accounts:{
            email:'',
            username:'',
            name:'',
            password:''
        },
        product: {},
      };
    },
  
    computed: { ...mapGetters(["isCreating", "createdData"]) },
  
    methods: {
      ...mapActions(["storeAccount"]),
      onSubmit() {
        console.log("post")
        this.storeAccount({
          displayname: this.accounts.name,
          email: this.accounts.email,
          userName: this.accounts.username,
          password: this.accounts.password,
        });
      },
    },
  };
  </script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 50px;

  border: 1px solid #ccc;
  border-radius: 5px;
}

.header {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  padding-left: 25px;
  border: 1px solid #ccc;
  border-radius: 60px;

}

.submit {
  margin-top: 30px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 60px;
  /* backgrount facebook */
  background: #5138ED;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.register {
  margin-top: 20px;
  text-align: center;
}

.register p {
  margin-bottom: 10px;
  font-weight: 700;

}

.register a {
  color: #5138ED;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.error {
  text-align: left;
  color: red;
  font-size: 14px;
  font-weight: 500;
}
</style>
  