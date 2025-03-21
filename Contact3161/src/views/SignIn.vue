<template>
    <div class="ui middle aligned center aligned grid" style="height: 100vh">
        <div class="column" style="max-width: 450px">
            <h2 class="ui teal image header">
                <div class="content">Login</div>
            </h2>
            <form class="ui large form" @submit.prevent="handleLogin">
                <div class="ui segment">
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input id="username"
                                type="text"
                                placeholder="User Account"
                                v-model="formData.username"
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="ui left icon input">
                            <i class="lock icon"></i>
                            <input id="password"
                                type="password"
                                placeholder="Password"
                                v-model="formData.password"
                            />
                        </div>
                    </div>
                    <button type="submit" class="ui fluid large teal button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "SignIn",
    data() {
        return {
            formData: {
                username: "",
                password: "",
            },
        };
    },
    created() {
        const token = localStorage.getItem("token");
        if (token) {
            this.$router.push("/contacts"); // Redirect if already logged in
        }
    },
    methods: {
        async handleLogin() {
            try {
                console.log("Login form data", this.formData)
                const response = await axios.post(
                    "http://localhost:8082/contacts/login",
                    {
                        username: this.formData.username,
                        password: Number(this.formData.password),
                    }
                );

                const token = response.data.token;
                localStorage.setItem("token", token);

                console.log("Login response", response);
                alert("Login successful!");
                this.$router.push("/contacts");
            } catch (error) {
                console.log("Login error", error);
                alert("Login failed, please check your credentials!");
            }
        },
    },
};
</script>
