<template>
    <div id="app">
      <div id="nav">
        <div class="header-container">
          <h2 class="ui dividing header">
            <i class="address book icon" style="color: white"></i>
            <router-link to="/Contacts" class="content" style="color: white; text-decoration: none;">
              Contacts
            </router-link>
          </h2>
        </div>
      </div>
      <router-view />
    </div>
  </template>

<script setup>
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
}
</style>
