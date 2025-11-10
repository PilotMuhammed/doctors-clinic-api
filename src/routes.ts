import Home from './pages/Home.vue';
import Registration from './pages/Registration.vue';
import Dashboard from './pages/Dashboard.vue';
import AppointmentsDashboard from './pages/AppointmentsDashboard.vue';

const routes = [
    {path: '/', name:'Home', component: Home},
    {path: '/register', name:'Registration', component: Registration},
    {path: '/dashboard', name:'Dashboard', component: Dashboard},
    {path: '/appointmentsdashboard', name:'AppointmentsDashboard', component: AppointmentsDashboard},

]

export default routes