<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar color="primary" dark flat>
            <v-toolbar-title class="text-h6 font-weight-bold">لوحة التحكم الرئيسية</v-toolbar-title>
            <v-spacer />
            <v-btn icon>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container class="dashboard-container py-10">
                <v-row justify="center" align="stretch" class="gap-6">
                    <!-- Card 1: عدد المرضى -->
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl" elevation="8">
                            <v-icon size="56" color="primary" class="mb-2">mdi-account-multiple</v-icon>
                            <div class="text-h5 font-weight-bold mb-1" style="color: #393e46">
                                عدد المرضى
                            </div>
                            <div class="display-1" style="color: #a0c878">120</div>
                        </v-card>
                    </v-col>
                    <!-- Card 2: عدد المواعيد -->
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl" elevation="8">
                            <v-icon size="56" color="secondary" class="mb-2">mdi-calendar-check</v-icon>
                            <div class="text-h5 font-weight-bold mb-1" style="color: #393e46">
                                المواعيد اليوم
                            </div>
                            <div class="display-1" style="color: #9fb3df">8</div>
                        </v-card>
                    </v-col>
                    <!-- Card 3: عدد الأطباء -->
                    <v-col cols="12" md="4">
                        <v-card class="pa-6 rounded-xl" elevation="8">
                            <v-icon size="56" color="accent" class="mb-2">mdi-stethoscope</v-icon>
                            <div class="text-h5 font-weight-bold mb-1" style="color: #393e46">
                                عدد الأطباء
                            </div>
                            <div class="display-1" style="color: #a0c878">6</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
// بإمكانك لاحقًا استبدال الأرقام ببيانات ديناميكية من API
</script>

<style scoped>
.dashboard-container {
    background: linear-gradient(120deg, #f8faf7 75%, #a0c878 100%);
    min-height: 80vh;
}

.v-card {
    transition: transform 0.2s, box-shadow 0.2s;
}

.v-card:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 32px #a0c87833;
}
</style>
