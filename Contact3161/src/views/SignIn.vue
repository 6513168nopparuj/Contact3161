<template>
    <div class="ui middle aligned center aligned grid" style="height: 100vh;">
      <div class="column" style="max-width: 450px;">
        <h2 class="ui teal image header">
          <div class="content">Sign In</div>
        </h2>
        <form class="ui large form" @submit.prevent="signIn">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" placeholder="E-mail address" v-model="formData.email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" placeholder="Password" v-model="formData.password">
              </div>
            </div>
            <button type="submit" class="ui fluid large teal button">Sign In</button>
          </div>
        </form>
        <div class="ui message">
          New to us? <a href="#">Sign Up</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignIn",
    data() {
      return {
        formData: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      signIn() {
        console.log(this.formData);
      }
    }
  }
  </script>
  