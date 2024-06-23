<template>
    <div class="flex justify-center items-center h-screen bg-blue-primary">
        <form @submit.prevent="onRegister()">   
            <div class="p-6 w-96 shadow-lg bg-white rounded-md">
                <h1 class="text-3xl block text-center font-semibold text-blue-secondary"> <i class="fa-solid fa-align-justify mr-2"></i> Register</h1>
                <hr class="mt-3">
                <div class="mt-3">
                    <label for="email" class="block text-base mb-2">Email</label>
                    <input type="text" id="email" v-model="email" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your email"></input>
                </div>
                <div class="mt-2 text-red-500 font-semibold" v-if="errors.email">{{ errors.email }}</div>
                <div class="mt-3">
                    <label for="password" class="block text-base mb-2">Password</label>
                    <input type="password" id="password" v-model="password" class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter your password"></input>
                </div>
                <div class="mt-2 text-red-500 font-semibold" v-if="errors.password">{{ errors.password }}</div>
                <div class="mt-3 flex justify-end">
                    <div>
                        <router-link to="/auth/login" class="text-indigo-500 font-semibold">Login</router-link>
                    </div>
                </div>
                <div class="flex mt-5 justify-center">
                    <button class="border-2 border-blue-primary bg-blue-300 py-1 w-full rounded-md hover:bg-blue-200 hover:font-semibold" type="submit">Register</button>
                </div>
                <div class="mt-2 text-red-500 font-semibold text-center" v-if="errors.message">{{ errors.message }}</div>
            </div>
        </form> 
    </div>
</template>

<script>
import Register from '../scripts/Register';

export default {
    ...Register
}
</script>