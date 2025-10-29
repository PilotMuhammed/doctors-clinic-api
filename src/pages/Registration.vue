<template>
    <v-container class="auth-container fill-height d-flex align-center justify-center" fluid>
        <v-card class="pa-12 rounded-xl auth-card" min-width="460" elevation="12">
            <v-tabs v-model="tab" color="primary" class="mb-6">
                <v-tab value="login">تسجيل الدخول</v-tab>
                <v-tab value="register">إنشاء حساب</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <!-- Login Tab -->
                <v-window-item value="login">
                    <v-form @submit.prevent="login">
                        <v-text-field v-model="loginForm.username" label="اسم المستخدم" prepend-inner-icon="mdi-account"
                            color="primary" dense outlined class="mb-4" required />
                        <v-text-field v-model="loginForm.password" label="كلمة المرور" prepend-inner-icon="mdi-lock"
                            type="password" color="primary" dense outlined class="mb-6" required />
                        <v-btn color="primary" class="rounded-xl" block type="submit" size="large">دخول</v-btn>
                    </v-form>
                </v-window-item>
                <!-- Register Tab -->
                <v-window-item value="register">
                    <v-form @submit.prevent="register">
                        <v-text-field v-model="registerForm.fullName" label="الاسم الكامل"
                            prepend-inner-icon="mdi-account" color="primary" dense outlined class="mb-4" required />
                        <v-text-field v-model="registerForm.username" label="اسم المستخدم"
                            prepend-inner-icon="mdi-account-circle" color="primary" dense outlined class="mb-4"
                            required />
                        <v-text-field v-model="registerForm.password" label="كلمة المرور" prepend-inner-icon="mdi-lock"
                            type="password" color="primary" dense outlined class="mb-6" required />
                        <v-btn color="secondary" class="rounded-xl" block type="submit" size="large">إنشاء حساب</v-btn>
                    </v-form>
                </v-window-item>
            </v-window>
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tab = ref('login')

// بيانات تسجيل الدخول
const loginForm = ref({
    username: '',
    password: '',
})

// بيانات إنشاء الحساب
const registerForm = ref({
    fullName: '',
    username: '',
    password: '',
})

// دوال وهمية (تربط بالـAPI لاحقًا)
function login() {
    // اكتب هنا طلب الـAPI
}
function register() {
    // اكتب هنا طلب الـAPI
}
</script>

<style scoped>
.auth-container {
    background: linear-gradient(135deg, #E5E9C5 60%, #CBD99B 100%);
    min-height: 100vh;
    padding-top: 4vh;
    padding-bottom: 4vh;
}

.auth-card {
    background: #fff;
    box-shadow: 0 6px 32px 0 #2a7d7c33;
    border-radius: 24px;
}

.v-input input {
    font-size: 1.1rem;
}
</style>
