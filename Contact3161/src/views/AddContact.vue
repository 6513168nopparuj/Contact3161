<template>
    <div class="add-contact-container">
        <h2>Add New Contact</h2>
        <form @submit.prevent="submitForm">
            <div class="form-field">
                <label for="cid">Contact ID</label>
                <input
                    id="cid"
                    v-model="cid"
                    type="text"
                    required
                />
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
            <button type="submit">Add Contact</button> ‎
            <RouterLink to="/Contacts">
                <button style="background-color: black; color: Red">
                    Back
                </button>
            </RouterLink>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    name: "AddContact",
    setup() {
        const router = useRouter();
        const cid = ref("");
        const firstname = ref("");
        const lastname = ref("");
        const mobile = ref("");
        const email = ref("");
        const facebook = ref("");
        const imageUrl = ref("");

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
                console.log(contactData)
                const response = await axios.post(
                    "http://localhost:8082/contacts",
                    contactData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 201 || response.status === 200) {
                    router.push("/Contacts");
                }
            } catch (error) {
                console.error(
                    "Error adding contact:",
                    error.response?.data || error
                );
                alert("Failed to add contact. Please try again.");
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
};
</script>

<style scoped>
.add-contact-container {
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
