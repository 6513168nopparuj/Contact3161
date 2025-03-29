<template>
    <div class="update-contact-container">
        <h2>Update Contact</h2>
        <form @submit.prevent="submitForm">
            <div class="form-field">
                <label for="cid">Contact ID</label>
                <input id="cid" v-model="cid" type="text" required />
            </div>
            <div class="form-field">
                <label for="firstname">First Name</label>
                <input
                    id="firstname"
                    v-model="firstname"
                    type="text"
                    required
                />
            </div>
            <div class="form-field">
                <label for="lastname">Last Name</label>
                <input id="lastname" v-model="lastname" type="text" required />
            </div>
            <div class="form-field">
                <label for="mobile">Mobile Number</label>
                <input id="mobile" v-model="mobile" type="text" required />
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" />
            </div>
            <div class="form-field">
                <label for="facebook">Facebook</label>
                <input id="facebook" v-model="facebook" type="text" />
            </div>
            <div class="form-field">
                <label for="imageUrl">Image URL</label>
                <input id="imageUrl" v-model="imageUrl" type="url" />
            </div>
            <button type="submit">Update Contact</button> ‎
            <RouterLink to="/Contacts">
                <button style="background-color: black; color: Red">
                    Back
                </button>
            </RouterLink>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import axios from "axios";

export default {
    name: "UpdateContact",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const cid = ref(route.params.cid || "");
        const firstname = ref("");
        const lastname = ref("");
        const mobile = ref("");
        const email = ref("");
        const facebook = ref("");
        const imageUrl = ref("");
        const fetchContact = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/SignIn");
                    return;
                }
                const response = await axios.get(
                    `http://localhost:8082/contacts/${cid.value}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const contact = response.data;
                // console.log(contact.user.cid)
                cid.value = contact.user.cid;
                firstname.value = contact.user.firstname;
                lastname.value = contact.user.lastname;
                mobile.value = contact.user.mobile;
                email.value = contact.user.email;
                facebook.value = contact.user.facebook;
                imageUrl.value = contact.user.imageUrl;
            } catch (error) {
                console.error(
                    "Error fetching contact:",
                    error.response?.data || error
                );
                alert("Failed to load contact data. Please try again.");
            }
        };
        onMounted(fetchContact);
        const submitForm = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/SignIn");
                    return;
                }
                const contactData = {
                    cid: cid.value,
                    firstname: firstname.value,
                    lastname: lastname.value,
                    mobile: mobile.value,
                    email: email.value,
                    facebook: facebook.value,
                    imageUrl: imageUrl.value,
                };
                const response = await axios.patch(
                    `http://localhost:8082/contacts/${cid.value}`,
                    contactData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.status === 200) {
                    router.push("/Contacts");
                }
            } catch (error) {
                console.error(
                    "Error updating contact:",
                    error.response?.data || error
                );
                alert("Failed to update contact. Please try again.");
            }
        };
        return {
            cid,
            firstname,
            lastname,
            mobile,
            email,
            facebook,
            imageUrl,
            submitForm,
        };
    },
    components: { RouterLink },
};
</script>

<style scoped>

.update-contact-container {
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-field {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
