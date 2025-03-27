<template>
    <div class="contacts-container">
        <div class="header-container">
            <h2 class="ui dividing header header">
                <i
                    class="address book icon"
                    style="color: white; padding-top: 5%"
                ></i>
                <router-link
                    to="/Contacts"
                    class="content"
                    style="color: white; text-decoration: none; padding-top: 5%"
                >
                    Contacts
                </router-link>
            </h2>
            <button
                v-if="isLoggedIn"
                class="ui red button logout-btn"
                @click="logout"
            >
                Logout
            </button>
        </div>

        <div class="main-content">
            <div class="search-section">
                <div class="ui fluid action input">
                    <input
                        type="text"
                        class="search-input"
                        placeholder="Search by name, mobile, or email"
                        v-model="searchQuery"
                    />
                    <button class="ui green button" @click="addContact">
                        <i class="plus icon"></i> Add
                    </button>
                </div>
            </div>

            <div class="border">
                <div class="contacts-list">
                    <div
                        v-if="filteredContacts.length > 0"
                        class="ui grid container"
                        style="padding-bottom: 7%"
                    >
                        <div
                            class="four wide column"
                            v-for="contact in filteredContacts"
                            :key="contact._id"
                        >
                            <ContactCard
                                :contact="contact"
                                :index="Number(contact.cid)"
                                @delete="deleteContact"
                                @edit="editContact"
                            />
                        </div>
                    </div>
                    <div v-else class="no-results">
                        <h1>No results found.</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ContactCard from "../components/ContactCard.vue";

export default {
    name: "ContactsView",
    components: {
        ContactCard,
    },
    methods: {
        addContact() {
            this.$router.push("/addContact");
        },
    },
    setup() {
        const router = useRouter();
        const searchQuery = ref("");
        const contacts = ref([]);
        const isLoggedIn = ref(false);

        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found!");
                    router.push("/SignIn");
                    return;
                }

                isLoggedIn.value = true;
                const response = await axios.get(
                    "http://localhost:8082/contacts",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                contacts.value = response.data.users;
            } catch (error) {
                console.error(
                    "Error fetching contacts:",
                    error.response?.data || error
                );

                if (error.response?.status === 403) {
                    alert(
                        "Session expired or insufficient permissions. Please log in again."
                    );
                    localStorage.removeItem("token");
                    router.push("/SignIn");
                } else {
                    alert("Failed to load contacts.");
                }
            }
        };

        onMounted(fetchContacts);

        const logout = () => {
            localStorage.removeItem("token");
            isLoggedIn.value = false;
            router.push("/SignIn");
        };

        const deleteContact = async (contactId) => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/SignIn");
                    return;
                }
                const response = await axios.delete(
                    `http://localhost:8082/contacts/${contactId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.status === 200) {
                    await fetchContacts(); // Refresh the contacts list
                }
            } catch (error) {
                console.error(
                    "Error deleting contact:",
                    error.response?.data || error
                );
                if (error.response?.status === 403) {
                    alert(
                        "Session expired or insufficient permissions. Please log in again."
                    );
                    localStorage.removeItem("token");
                    router.push("/SignIn");
                } else {
                    alert("Failed to delete contact.");
                }
            }
        };

        const editContact = (cid) => {
            router.push(`/updateContact/${cid}`);
        };

        const filteredContacts = computed(() => {
            if (!searchQuery.value) {
                return contacts.value;
            }
            const q = searchQuery.value.toLowerCase();
            return contacts.value.filter(
                (contact) =>
                    contact.firstname.toLowerCase().includes(q) ||
                    contact.lastname.toLowerCase().includes(q) ||
                    contact.mobile.includes(q) ||
                    contact.email.toLowerCase().includes(q)
            );
        });

        return {
            searchQuery,
            filteredContacts,
            logout,
            deleteContact,
            editContact,
            isLoggedIn,
        };
    },
};
</script>

<style scoped>
.contacts-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}

.main-content {
    margin-top: 70px;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: hidden;
    width: 100%;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
}

.border {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 1rem;
    overflow: hidden;
    width: 100%;
}

.contacts-list {
    height: 100%;
    overflow-y: auto;
    padding: 1rem;
    box-sizing: border-box;
}

.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: black;
    padding: 1rem 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}

/* Search bar styling */
.search-section {
    margin-bottom: 1rem;
    width: 100%;
}

.ui.fluid.action.input {
    display: flex;
    gap: 10px;
}

.search-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 0; /* Prevents input from overflowing */
}

/* Grid responsiveness */
.ui.grid.container {
    margin: 0 !important;
    width: 100% !important;
    padding: 0 !important;
}

.ui.grid.container > .column {
    padding: 1rem !important;
}

@media screen and (max-width: 1200px) {
    .ui.grid.container .four.wide.column {
        width: 33.33% !important;
    }
}

@media screen and (max-width: 992px) {
    .ui.grid.container .four.wide.column {
        width: 50% !important;
    }
}

@media screen and (max-width: 768px) {
    .main-content {
        padding: 15px;
    }
    
    .ui.grid.container .four.wide.column {
        width: 100% !important;
    }
    
    .header-container {
        padding: 1rem;
    }
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
