<template>
    <v-container fluid class="pa-6"
        style="background: linear-gradient(120deg, #70B2B2 80%, #E5E9C5 100%); min-height: 100vh;">
        <v-row justify="center">
            <v-col cols="12" md="10">
                <v-card elevation="8" class="rounded-xl pa-6">
                    <div class="d-flex justify-space-between align-center mb-6">
                        <h2 class="text-h5 font-weight-bold" style="color: #393E46">
                            إدارة المواعيد
                        </h2>
                        <v-btn color="primary" class="rounded-pill" @click="openDialog()">
                            <v-icon start>mdi-plus</v-icon>
                            إضافة موعد جديد
                        </v-btn>
                    </div>
                    <!-- Filter/Search -->
                    <v-row class="mb-4">
                        <v-col cols="12" md="4">
                            <v-text-field v-model="search" label="بحث عن اسم المريض أو الطبيب"
                                append-inner-icon="mdi-magnify" dense outlined hide-details />
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition"
                                offset-y min-width="auto">
                                <template #activator="{ props }">
                                    <v-text-field 
                                    v-model="filterDate" 
                                    label="تصفية حسب التاريخ" 
                                    readonly
                                    v-bind="props"
                                    dense outlined hide-details
                                    append-inner-icon="mdi-calendar"
                                    />
                                </template>
                                <v-date-picker v-model="filterDate" @change="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <!-- Appointments Table -->
                    <v-table class="rounded-lg" density="comfortable">
                        <thead>
                            <tr style="background-color: #F8FAF7;">
                                <th>اسم المريض</th>
                                <th>اسم الطبيب</th>
                                <th>تاريخ الموعد</th>
                                <th>الساعة</th>
                                <th>ملاحظات</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="appointment in filteredAppointments" :key="appointment.id">
                                <td>{{ appointment.patientName }}</td>
                                <td>{{ appointment.doctorName }}</td>
                                <td>{{ formatDate(appointment.date) }}</td>
                                <td>{{ appointment.time }}</td>
                                <td>{{ appointment.notes }}</td>
                                <td>
                                    <v-btn icon size="small" color="primary" @click="openDialog(appointment)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon size="small" color="error" @click="deleteAppointment(appointment)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr v-if="filteredAppointments.length === 0">
                                <td colspan="6" class="text-center">لا توجد مواعيد</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-col>
        </v-row>
        <!-- Dialog: Add/Edit Appointment -->
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="font-weight-bold">
                    {{ editMode ? 'تعديل موعد' : 'إضافة موعد جديد' }}
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="formValid">
                        <v-autocomplete v-model="form.patientId" :items="patients" item-title="name" item-value="id"
                            label="اسم المريض" :rules="[v => !!v || 'مطلوب']" dense outlined class="mb-2" />
                        <v-autocomplete v-model="form.doctorId" :items="doctors" item-title="name" item-value="id"
                            label="اسم الطبيب" :rules="[v => !!v || 'مطلوب']" dense outlined class="mb-2" />
                        <v-text-field v-model="form.date" label="تاريخ الموعد" type="date"
                            :rules="[v => !!v || 'مطلوب']" dense outlined class="mb-2" />
                        <v-text-field v-model="form.time" label="الوقت" type="time" :rules="[v => !!v || 'مطلوب']" dense
                            outlined class="mb-2" />
                        <v-textarea v-model="form.notes" label="ملاحظات" rows="2" dense outlined />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="closeDialog">إلغاء</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :disabled="!formValid" @click="saveAppointment">
                        حفظ
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
// import axios from 'axios'

interface Appointment {
    id: number
    patientId: number | null;
    patientName: string
    doctorId: number | null;
    doctorName: string
    date: string
    time: string
    notes: string
}

interface Patient { id: number; name: string }
interface Doctor { id: number; name: string }

const appointments = ref<Appointment[]>([]);
const patients = ref<Patient[]>([])
const doctors = ref<Doctor[]>([])

const search = ref('')
const filterDate = ref('')
const dateMenu = ref(false)

const dialog = ref(false)
const editMode = ref(false)
const formValid = ref(false)

// const form = ref({
//     id: 0,
//     patientId: null,
//     doctorId: null,
//     date: '',
//     time: '',
//     notes: ''
// })

const form = ref<Appointment>({
    id: 0,
    patientId: null,
    patientName: '',
    doctorId: null,
    doctorName: '',
    date: '',
    time: '',
    notes: ''
});

const openDialog = (appointment?: Appointment) => {
    if (appointment) {
        editMode.value = true
        // form.value = { ...appointment }
        form.value = {
            id: appointment?.id ?? 0,
            patientId: appointment?.patientId ?? null,
            patientName: appointment?.patientName ?? '',
            doctorId: appointment?.doctorId ?? null,
            doctorName: appointment?.doctorName ?? '',
            date: appointment?.date ?? '',
            time: appointment?.time ?? '',
            notes: appointment?.notes ?? ''
        };

    } else {
        editMode.value = false
        form.value = {
            id: 0,
            patientId: null,
            patientName: '',
            doctorId: null,
            doctorName: '',
            date: '',
            time: '',
            notes: ''
        }
    }
    dialog.value = true
}

const closeDialog = () => {
    dialog.value = false
    formValid.value = false
}

// Fake API functions for demo (replace with real API)
const fetchAppointments = async () => {
    // استبدل هذه البيانات ببيانات API حقيقية
    appointments.value = [
        { id: 1, patientId: 2, patientName: 'علي أحمد', doctorId: 1, doctorName: 'د. محمد', date: '2025-11-10', time: '10:00', notes: 'متابعة' },
        { id: 2, patientId: 1, patientName: 'زينب كريم', doctorId: 2, doctorName: 'د. سارة', date: '2025-11-11', time: '13:00', notes: '' }
    ]
}
const fetchPatients = async () => {
    patients.value = [
        { id: 1, name: 'زينب كريم' }, { id: 2, name: 'علي أحمد' }
    ]
}
const fetchDoctors = async () => {
    doctors.value = [
        { id: 1, name: 'د. محمد' }, { id: 2, name: 'د. سارة' }
    ]
}

onMounted(async () => {
    await fetchAppointments()
    await fetchPatients()
    await fetchDoctors()
})

const saveAppointment = async () => {
    if (!formValid.value) return
    if (editMode.value) {
        // تعديل
        const idx = appointments.value.findIndex(a => a.id === form.value.id)
        if (idx !== -1) {
            // تحديث البيانات (API)
            const pat = patients.value.find(p => p.id === form.value.patientId)
            const doc = doctors.value.find(d => d.id === form.value.doctorId)
            // appointments.value[idx] = {
            //     ...form.value,
            //     patientName: pat?.name ?? '',
            //     doctorName: doc?.name ?? ''
            // }
            appointments.value[idx] = {
                id: form.value.id,
                patientId: form.value.patientId,
                patientName: pat?.name ?? '',
                doctorId: form.value.doctorId,
                doctorName: doc?.name ?? '',
                date: form.value.date,
                time: form.value.time,
                notes: form.value.notes
            };

        }
    } else {
        // إضافة جديد
        const newId = Math.max(...appointments.value.map(a => a.id), 0) + 1
        const pat = patients.value.find(p => p.id === form.value.patientId)
        const doc = doctors.value.find(d => d.id === form.value.doctorId)
        appointments.value.push({
            ...form.value,
            id: newId,
            patientName: pat?.name ?? '',
            doctorName: doc?.name ?? ''
        })
    }
    closeDialog()
}

const deleteAppointment = (appointment: Appointment) => {
    appointments.value = appointments.value.filter(a => a.id !== appointment.id)
}

// فلترة حسب البحث والتاريخ
const filteredAppointments = computed(() => {
    return appointments.value.filter(a =>
        (!search.value || a.patientName.includes(search.value) || a.doctorName.includes(search.value)) &&
        (!filterDate.value || a.date === filterDate.value)
    )
})

const formatDate = (date: string) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('ar-EG')
}
</script>

<style scoped>
.v-table th,
.v-table td {
    text-align: center;
}
</style>
