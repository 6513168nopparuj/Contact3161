<template>
    <div class="ui fluid card">
        <div class="image">
            <img :src="`${contact.imageUrl}`" :alt="`${contact.firstname} ${contact.lastname}`" />
        </div>
        <div class="content">
            <div class="header">{{ contact.firstname }} {{ contact.lastname }}</div>
            <div class="meta">
                {{ contact.mobile }}<br />
                <a>{{ contact.email }}</a><br />
                <a>{{ contact.facebook }}</a>
            </div>
        </div>
        <div class="extra content">
            <div class="button-group">
                <button class="ui blue button" @click="edit">
                    <i class="edit icon"></i> Edit
                </button>
                <button class="ui red button" @click="remove">
                    <i class="trash alternate outline icon"></i> Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactCard",
    props: {
        contact: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Set a fixed width for the card */
.ui.fluid.card {
    width: 100%; /* Adjust this value as needed */
}

/* Fix the image container height and hide overflow */
.ui.fluid.card .image {
    height: 100%; /* Adjust the height as needed */
    overflow: hidden;
}

/* Ensure the image covers the container without distortion */
.ui.fluid.card .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.button-group {
    display: flex;
    justify-content: space-between;
    gap: 5%; /* This creates space between the buttons */
}
</style>
