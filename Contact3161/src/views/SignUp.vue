<template>
    <div class="ui middle aligned center aligned grid" style="height: 100vh">
        <div class="column" style="max-width: 450px">
            <h2 class="ui teal image header">
                <div class="content">Sign Up</div>
            </h2>
            <form class="ui large form" @submit.prevent="handleSignUp">
                <div class="ui segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                v-model="formData.username"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                v-model="formData.password"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" class="ui fluid large teal button">
                        Sign Up
                    </button>
                </div>
            </form>

            <div class="ui message">
                Already have an account ?
                <button class="ui small blue button" @click="goToLogin">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SignUp",
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        async handleSignUp() {
            try {
                console.log("Sign up form data", this.formData);
                const response = await axios.post(
                    "http://localhost:8082/user/signup",
                    {
                        username: this.formData.username,
                        password: Number(this.formData.password),
                    }
                );

                const token = response.data.token;
                localStorage.setItem("token", token);

                console.log("Sign up response", response);
                alert("Account created successfully!");
                this.$router.push("/contacts");
            } catch (error) {
                console.log("Sign up error", error);
                alert("Sign up failed. Try again!");
            }
        },
        goToLogin() {
            this.$router.push("/SignIn");
        },
    },
};
</script>
