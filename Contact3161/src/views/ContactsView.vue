<template>
    <div class="contacts-container">
        <div class="header-container">
            <h2 class="ui dividing header">
                <i class="address book icon"></i>
                <div class="content">Contacts</div>
            </h2>
        </div>

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
                >
                    <div
                        class="four wide column"
                        v-for="(contact, index) in filteredContacts"
                        :key="index"
                    >
                        <ContactCard
                            :contact="contact"
                            :index="index"
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
</template>

<script>
import { ref, computed } from "vue";
import ContactCard from "../components/ContactCard.vue";
import contactsData from "../contact.json";

export default {
    name: "ContactsView",
    components: {
        ContactCard,
    },
    setup() {
        const searchQuery = ref("");
        const contacts = ref(contactsData);

        const filteredContacts = computed(() => {
            if (!searchQuery.value) {
                return contacts.value;
            }
            const q = searchQuery.value.toLowerCase();
            return contacts.value.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(q) ||
                    contact.mobile.includes(q) ||
                    contact.email.toLowerCase().includes(q)
            );
        });

        const addContact = () => {
            contacts.value.push({
                name: "New Contact",
                mobile: "",
                email: "",
                facebook: "",
                img: "/images/avatar2/large/elyse.png",
            });
        };

        const deleteContact = (index) => {
            contacts.value.splice(index, 1);
        };

        const editContact = (index) => {
            alert(`Edit contact at index ${index}`);
        };

        return {
            searchQuery,
            filteredContacts,
            addContact,
            deleteContact,
            editContact,
        };
    },
};
</script>

<style scoped>
.border {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 1rem;
}
.contacts-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height of viewport */
    overflow: hidden; /* Prevent entire page from scrolling */
}

.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.contacts-list {
    margin-top: 3%;
    margin-bottom: 3%;
    /* border: 1px solid black; */
    overflow-y: auto;
    flex: 1;
    padding: 1rem;
    max-height: calc(100vh - 110px); /* Prevent overflow */
}

/* Search bar styling */
.search-section {
    padding-top: 8%;
}
.search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.no-results {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; /* Makes sure it takes up the full height of its container */
    text-align: center;
}
</style>
