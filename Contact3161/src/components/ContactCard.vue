<template>
    <div class="ui fluid card">
        <div class="image">
            <img v-if="contact.imageUrl" :src="`${contact.imageUrl}`" :alt="`${contact.firstname} ${contact.lastname}`" />
            <div v-else class="no-image">No Image</div>
        </div>
        <div class="content">
            <div class="header">{{ contact.firstname }} {{ contact.lastname }}</div>
            <div class="meta">
                <span>{{ contact.mobile }}</span>
                <a :href="`mailto:${contact.email}`" :title="contact.email">{{ contact.email }}</a>
                <a :href="contact.facebook" target="_blank" :title="contact.facebook">{{ contact.facebook }}</a>
            </div>
        </div>
        <div class="extra content">
            <div class="button-group">
                <button class="ui blue button" @click="editContact">
                    <i class="edit icon"></i> Edit
                </button>
                <button class="ui red button" @click="deleteContact">
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
    methods: {
        deleteContact() {
            this.$emit("delete", this.index);
        },
        editContact() {
            this.$emit("edit", this.index);
        }
    }
};
</script>

<style scoped>
.ui.fluid.card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    overflow: hidden; /* Prevent content from overflowing */
}

/* Fix the image container height */
.ui.fluid.card .image {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* Creates a square aspect ratio */
    overflow: hidden;
    background-color: #f0f0f0; /* Light gray background for empty images */
}

/* Position the image absolutely within the container */
.ui.fluid.card .image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* No image placeholder styling */
.ui.fluid.card .image .no-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 1.2em;
    font-weight: 500;
}

/* Content section styling */
.ui.fluid.card .content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    min-height: 120px; /* Minimum height for content area */
    overflow: hidden; /* Prevent content overflow */
}

.ui.fluid.card .content .header {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ui.fluid.card .content .meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
}

.ui.fluid.card .content .meta a,
.ui.fluid.card .content .meta span {
    display: block;
    color: #4183c4;
    text-decoration: none;
    font-size: 0.95em;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Button section styling */
.ui.fluid.card .extra.content {
    padding: 1rem;
    background-color: #f9f9f9;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.button-group {
    display: flex;
    justify-content: space-between;
    gap: 5%;
}

.button-group button {
    flex: 1;
}

@media screen and (min-width: 768px) {
    /* On larger screens, keep single line with ellipsis */
    .ui.fluid.card .content .meta a,
    .ui.fluid.card .content .meta span {
        white-space: nowrap;
    }
}

@media screen and (max-width: 767px) {
    /* On smaller screens, allow text to wrap */
    .ui.fluid.card .content {
        min-height: fit-content;
    }
    
    .ui.fluid.card .content .meta a,
    .ui.fluid.card .content .meta span {
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
    }
    
    .ui.fluid.card .content .meta {
        gap: 0.5rem;
    }
}
</style>
