<template>
    <div id="app">
        <div id="nav">
            <div class="header-container">
                <h2 class="ui dividing header header-flex">
                    <i class="address book icon" style="color: white"></i>
                    <router-link
                        to="/Contacts"
                        class="content"
                        style="color: white; text-decoration: none"
                    >
                        Contacts
                    </router-link>
                </h2>
                <button
                    v-if="isLoggedIn"
                    class="ui red button logout-button"
                    @click="logout"
                >
                    Logout
                </button>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

const checkAuth = () => {
    isLoggedIn.value = !!localStorage.getItem("token");
};

const logout = () => {
    localStorage.removeItem("token");
    isLoggedIn.value = false; 
    router.push("/SignIn"); 
};

onMounted(() => {
    checkAuth();
});
</script>

<style>
body {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
}

.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: black;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logout-button {
    margin-right: 20px;
}

.header-flex {
    display: flex;
    align-items: center; /* Align items vertically */
    gap: 10px; /* Space between icon and text */
}

.header-flex i,
.header-flex .content {
    color: white;
}

.content {
    text-decoration: none;
}

</style>
