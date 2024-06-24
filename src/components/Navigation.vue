<template>
    <header class="sticky top-0 bg-gray-200 shadow-lg px-3">
        <nav class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 pr-8">
            <RouterLink :to="{name: 'home'}">
                <div class="flex items-start gap-3 flex-1">
                    <i class="fa-solid fa-shield-heart ml-2 text-blue-secondary text-3xl"></i>
                    <p class="text-blue-primary font-bold text-2xl">Vital Sign Record</p>
                </div>
            </RouterLink>
            <div class="text-blue-secondary logout">
                <i class="fa-solid fa-right-from-bracket mr-2"></i>
                <a href="#" class="font-semibold" @click.prevent="onLogout()">Log Out</a>
            </div>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'vuex';
import { LOGOUT_ACTION } from '../store/constant';

export default {
    // Methods
    methods: {
        // Map logout action from vuex store
        ...mapActions('auth', {
            logout: LOGOUT_ACTION
        }),

        // When logout button is clicked, perform logout action, redirect user to login page
        onLogout() {
            this.logout()
            this.$router.push("/auth/login")
        }
    },
}
</script>

<style scoped>
.logout {
    font-size: 1.25rem;
}
</style>