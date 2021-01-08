import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
    theme: {
      primary: '#FF9800',
      secondary: '#5c9012',
      accent: '#82B1FF',
      error: '#ff4444',
      info: '#33b5e5',
      success: '#00C851',
      warning: '#ffbb33'
    }
});

export default new Vuetify({
});
