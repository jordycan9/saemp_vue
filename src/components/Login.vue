<template>

    <v-layout align-center justify-center>
       
        <v-flex xs12 sm8 md6 lg3 x14>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                       
                <v-toolbar-title>
                    Acceso al Sistema
                </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field v-model="email" autofocus color="accent" label="Email" required></v-text-field>
                    <v-text-field v-model="password" type="password" autofocus color="accent" label="Password" required></v-text-field>
                </v-card-text>
               
                   

                  
                <v-card-actions class="px-3 pb3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>


        <div class="text-center ma-2">
   
    <v-snackbar 
      v-model="snackbar" 
      color='error' 
      right="right==right"
      top="top === top"
      timeout="6000"
      v-if="errorM" 
    
    >
            {{errorM}}
            <v-btn
                color="white"
                text
                @click="snackbar = false"
            >
                Close
        </v-btn>
    </v-snackbar>
    </div>

      
    </v-layout>
   
</template>
    


<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
            errorM: '',
            snackbar: false,
        }
    },
    methods:{
        ingresar(){
            axios.post('usuario/login',{email:this.email,password:this.password}).
            then(respuesta =>{
                return respuesta.data
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name:'home'})
            })
            .catch(error =>{
               // console.log(error);
               this.errorM=null;
               if(error.response.status==404){
                   this.errorM="No existe el usuario o las credenciales son incorrectas"
                   this.snackbar=true;
               }else{
                   this.errorM="Ocurrio un error con el servidor"
               }
            })
        }
    }
}
</script>