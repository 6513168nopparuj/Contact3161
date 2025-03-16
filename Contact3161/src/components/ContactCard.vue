<template>
    <div class="ui fluid card">
        <div class="image">
            <img :src="contact.img" :alt="contact.name" />
        </div>
        <div class="content">
            <div class="header">{{ contact.name }}</div>
            <div class="meta">
                {{ contact.mobile }}<br />
                <a>{{ contact.email }}</a
                ><br />
                <a> {{ contact.facebook }}</a>
            </div>
        </div>
        <div class="extra content">
            <div class="ui two buttons">
                <button class="ui basic blue button" @click="edit">Edit</button>
                <button class="ui basic red button" @click="remove">
                    Delete
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

<style scoped></style>
