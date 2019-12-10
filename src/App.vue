<template>
  <v-app id="app">
<v-navigation-drawer
      fixed
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="logueado"
    >
      <v-list dense>
        <template v-if="esAdministrador || esCliente">
          <v-list-item :to="{name: 'home'}"  >
            <v-list-item-action>
              <v-icon>apps</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>


          <template v-if="esAdministrador">
          <v-list-item :to="{name: ''}"  >
            <v-list-item-action>
              <v-icon>assignment_turned_in</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Solicitudes
            </v-list-item-title>
          </v-list-item>
        </template>
        
        <template v-if="esAdministrador">
         
            
            <v-list-item :to="{name: 'embarcacion'}">
              <v-list-item-action>
             <v-icon>directions_boat</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Embarcacion
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
        </template>

         <template v-if="esAdministrador">
         
            
            <v-list-item :to="{name: 'agencia'}">
              <v-list-item-action>
             <v-icon>work</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Agencia
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
        </template>
   
         
          <template v-if="esAdministrador">
            <v-list-item :to="{name: 'solicitudUnica'}"  >
                <v-list-item-action>
                  <v-icon>folder_shared</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  Consultas
                </v-list-item-title>
            </v-list-item>
        </template>

       
         <template v-if="esCliente">
            <v-list-item :to="{name: 'solicitud_unica'}">
                <v-list-item-action>
                  <v-icon>today</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  Solicitud Unica de Arribo
                </v-list-item-title>
            </v-list-item>
        </template>
         <template v-if="esCliente || esAdministrador">
            <v-list-item :to="{name: 'cambios_guardia'}">
                <v-list-item-action>
                  <v-icon>people</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                  Cambios de Guardia
                </v-list-item-title>
            </v-list-item>
        </template>
         <template v-if="esCliente">
            <v-list-item :to="{name: 'estatus_solicitud'}">
                <v-list-item-action>
                  <v-icon>verified_user</v-icon>
                </v-list-item-action>
                <v-list-item-title>
                 Estatus de la Solicitud
                </v-list-item-title>
            </v-list-item>
        </template>


        <template v-if="esAdministrador">

            <v-list-item :to="{name: 'usuario'}">
              <v-list-item-action>
                <v-icon>group_add</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Usuarios
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">SAAEMP</span>
      </v-toolbar-title>
    
      <v-spacer />
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon>
      </v-btn>
     <v-btn :to="{name:'login'}" icon v-else>
        <v-icon>fingerprint</v-icon>
      </v-btn>
     
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        
       <v-slide-y-transition mode="out-in">
         <router-view/>
       </v-slide-y-transition>
         
      </v-container>
    </v-content>
  <v-footer height="auto">
    <v-layout justify-center>
      <v-flex text-xs-center>
        <v-card flat tile color="primary" class="white--text">
          <v-card-text class="white--text pt-0">
            AMLS &copy;2019
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-footer>
   
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data () {
    return{
      drawer:true
    }
  },
  computed:{
    logueado(){
      return this.$store.state.usuario;

    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador';
    },
     esCliente(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Cliente';
    }
    
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    }
  }
};
</script>
