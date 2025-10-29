import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: { defaultSet: 'mdi', aliases, sets: { mdi }},
    theme: { defaultTheme: 'companyTheme', themes: {
        companyTheme: { dark: false, colors: {
            primary:   '#466FC5',
            secondary: '#F5A623',
            accent:    '#FFD966',
            background:'#F4F6FB',
            surface:   '#FFFFFF',
            text:      '#232946',}
        }
    }
    }
})

export default vuetify