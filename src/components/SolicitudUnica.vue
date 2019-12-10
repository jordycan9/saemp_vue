<template>
  <v-row align="center" justify="center">
   <qrcode value="Hello, ld!" :options="{ width: 200 }"></qrcode>

  </v-row>
</template>

<script>

import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
    data(){
      
        return{
           
        }
    },
    methods:{

    }
}
</script>