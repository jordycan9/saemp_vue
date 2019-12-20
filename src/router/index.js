import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Embarcacion from '../components/Embarcacion.vue'
import Archivo from '../components/Archivo.vue'
import Login from '../components/Login.vue'
import Test from '../components/Test.vue'
import store from '../store'
import Usuario from '../components/Usuario.vue'
import Pasajeros from '../components/Pasajeros.vue'
import SolicitudUnica from '../components/SolicitudUnica.vue'
import CambiosGuardia from '../components/CambiosGuardia.vue'
import EstatusSolicitud from '../components/EstatusSolicitud'
import Agencia from '../components/Agencia.vue'
import Solicitudes from '../components/Solicitudes.vue'
import Consultas from '../components/Consultas.vue'
import SolicitudUnicaAdmin from '../components/SolicitudUnicaAdmin.vue'
import SolicitudApitab from '../components/SolicitudApitab.vue'
import CambioGuardiaApi from '../components/CambioGuardiaApi.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        administrador:true,
        cliente:true,
        apitab:true
      }
    },
    {
      path: '/solicitud_unica',
      name: 'solicitud_unica',
      component: SolicitudUnica,
      meta:{
        cliente:true
      }
      
    },
    {
      path: '/solicitud_unica_admin',
      name: 'solicitud_unica_admin',
      component: SolicitudUnicaAdmin,
      meta:{
        administrador:true
      }
      
    },
    {
      path: '/pasajeros',
      name: 'pasajeros',
      component: Pasajeros,
      meta:{
        cliente:true
      }
      
    },
    {
      path: '/solicitudes',
      name: 'solicitudes',
      component: Solicitudes,
      meta:{
        administrador:true
      }
      
    },

    {
      path: '/consultas',
      name: 'consultas',
      component: Consultas,
      meta:{
        administrador:true
      }
      
    },

    {
      path: '/agencia',
      name: 'agencia',
      component: Agencia,
      meta:{
        cliente:true,
        administrador:true
      }
      
    },
    {
      path: '/cambios_guardia',
      name: 'cambios_guardia',
      component: CambiosGuardia,
      meta:{
        cliente:true,
        administrador:true
      }
      
    },
    {
      path: '/estatus_solicitud',
      name: 'estatus_solicitud',
      component: EstatusSolicitud,
      meta:{
        cliente:true
      }
      
    },
    {
      path: '/embarcacion',
      name: 'embarcacion',
      component: Embarcacion,
      meta:{
        administrador:true,
      } 
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario,
      meta:{
        administrador:true
      }
    },
  
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        libre:true
      }         
    },

    {
      path: '/solicitud',
      name: 'solicitud_apitab',
      component: SolicitudApitab,
      meta:{
        apitab:true,
       

      }         
    },
    {
      path: '/cambio_guardia',
      name: 'cambio_guardia_api',
      component: CambioGuardiaApi,
      meta:{
        apitab:true,
       
      }         
    }

  ]
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.libre)){
    next()
  } else if(store.state.usuario && store.state.usuario.rol == 'Administrador'){
      if(to.matched.some(record => record.meta.administrador)){
        next()
      }      
  }
  else if(store.state.usuario && store.state.usuario.rol == 'Cliente'){
    if(to.matched.some(record => record.meta.cliente)){
      next()
    }   
}
else if(store.state.usuario && store.state.usuario.rol == 'APITAB'){
  if(to.matched.some(record => record.meta.apitab)){
    next()
  }   
}
else{
    next({name:'login'});
  }
})
export default router
