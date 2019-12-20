<template>
  <v-layout align-start>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="solicitudUnica"
      :search="search"
      class="elevation-1"
      v-if="verNuevo==0"
    >
      <template v-slot:item.estado="{ item }">
         <v-chip class="ma-2" color="orange" text-color="white"  v-if="item.estado==0">
          <v-avatar left>
            <v-icon>restore</v-icon>
          </v-avatar>
            En proceso
         </v-chip>

          <v-chip class="ma-2" color="primary" text-color="white"  v-if="item.estado==1">
          <v-avatar left>
            <v-icon>done</v-icon>
          </v-avatar>
            Apropado por AMLS
         </v-chip>

          <v-chip class="ma-2" color="red" text-color="white"  v-if="item.estado==2">
          <v-avatar left>
            <v-icon>cancel</v-icon>
          </v-avatar>
            Anulado
         </v-chip>

          <v-chip class="ma-2" color="success" text-color="white"  v-if="item.estado==3">
          <v-avatar left>
            <v-icon>done_all</v-icon>
          </v-avatar>
            Aprobado por API
         </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Solicitud Unica de Arribo</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field class="text-xs-center" v-if="verNuevo==0" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
         <v-btn v-if="verNuevo==0" @click="mostrarNuevo()"  small>Nueva Solicitud</v-btn>
          
        
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                   
                   
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="adModal" max-width="290">
            <v-card>
              <v-card-title class="headline" v-if="adAccion==1">
                  Aprobar Item
              </v-card-title>
              <v-card-title class="headline" v-if="adAccion==2">
                  Anular Item
              </v-card-title>

              <v-card-text>
                  Estas a punto de <span v-if="adAccion==1">Aprobar</span>
                  <span v-if="adAccion==2">Anular</span> la solicitud con folio {{adNombre}}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="activarDesactivarCerrar()"  small color="error">
                  Cancelar
                </v-btn>
                 <v-btn v-if="adAccion==1" @click="activar()" small color="primary">
                  Activar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" small color="orange">
                  Desactivar
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">

         
     
       

         <template v-if="item.estado==0">
        <v-icon
          small
          @click="activarDesactivarMostrar(1,item)"
        >
          check
        </v-icon>
          <v-icon
          small
          @click="activarDesactivarMostrar(2,item)"
        >
          block
        </v-icon>
        </template>
       <template v-if="item.estado==1">
        <v-icon
          small
          @click="activarDesactivarMostrar(2,item)"
        >
          block
        </v-icon>
        </template>
          <template v-if="item.estado==2">
        <v-icon
          small
          @click="activarDesactivarMostrar(1,item)"
        >
          check
        </v-icon>
        </template>

      
       

      </template>
   

      
      <template v-slot:no-data>
        <v-btn color="primary" @click="listar()">Resetear</v-btn>
      </template>
    </v-data-table>

    <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>       
            <v-flex xs12 sm4 lg4 x14>
              <v-autocomplete  v-model="embarcacion" :items="embarcaciones"  label="Embarcaciones"></v-autocomplete>
            </v-flex>

           
            <v-flex xs12 sm4 lg4 x14>
              <v-autocomplete :items="agencias"  v-model="agencia" label="Agencias"></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 lg4 x14>
               <v-autocomplete v-model="procedencia" :items="procedencia" label="Procedencia"></v-autocomplete> 
            </v-flex>

           <v-flex xs12 sm4 lg4 x14>
              <v-datetime-picker label="Ingrese la ETA de la embarcación" locale="es" v-model="eta"> </v-datetime-picker>

            </v-flex>

            
            <v-flex xs12 sm4 lg4 x14>
              <v-datetime-picker label="Ingrese la ETD de la embarcación"   v-model="etd"> </v-datetime-picker>
            </v-flex>

            <v-flex xs12 sm4 lg8 x14>
              <v-textarea v-model="comentarios"  clearable="clearable" label="Detalles"></v-textarea>
            </v-flex>

                
           


          
            
             <v-flex xs12 sm2 md12 lg12 xl12>
            
             <v-btn class="ma-2" @click.native="guardar()" small outlined color="indigo">Guardar</v-btn>
             <v-btn class="ma-2" @click.native="ocultarNuevo()" small outlined color="red">Cancel</v-btn>
               
              
             </v-flex>


        </v-layout>
    </v-container>

  </v-flex>


  </v-layout>

  
</template>
<script>
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader
import DatetimePicker from 'vuetify-datetime-picker'

  export default {
     icons: {
    iconfont: 'fa4',
  },
    data(){
      return{
                  dialog: false,
                  search: '',
                  solicitudUnica:[],
                headers: [
               { text: 'Actions', value: 'action', sortable: false},
               { text: 'Agencia', value: 'agencia.nombre', sortable:true},
               { text: 'ETA', value: 'eta', sortable:true},
               { text: 'ETD', value: 'etd', sortable:true},
               { text: 'Procedencia', value: 'procedencia', sortable:false},
               { text: 'Embarcacion', value: 'embarcacion.nombre',sortable:false},
               { text: 'Estado', value: 'estado',sortable:true},
               { text: 'Detalles', value: 'comentarios',sortable:true},
            ],
            editedIndex: -1,
            _id:'',
            embarcacion:'',
            embarcaciones:[],
            procedencia:['CARMEN','DOS BOCAS','FRONTERA','TUXPAN','SEYBAPLAYA','AREA DE PLATAFORMAS',],
            nombreCompleto:'',
            agencias:[],
            nombre:'',
            agencia2:'',
           
            pasajeros:[],
            verNuevo:0,
            eta:'',
            etd:'',
            date:'',
            agencia:'',
            fecha:'',
            folio:'',
            estado:'',
            comentarios:'',
            valida:0,
            validaMensaje:[],
            adModal:0,
            adAccion:0,
            adNombre:'',
            adId:''
      }
    },
          computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'Nueva Embarcacion' : 'Editar Embarcacion'
          }
        },

        watch: {
          dialog (val) {
            val || this.close()
          }
        },

        created () {
          this.listar();
          this.selectEmbarcaciones();
          this.selectAgencias();
        },

        methods: {
          mostrarNuevo(){
            this.verNuevo =1;

          },
          ocultarNuevo(){
            this.verNuevo =0
          },

          eliminarPasajero(arr,item){ 
            let i=arr.indexOf(item);
            if(i!= -1){
              arr.splice(i,1);
            }
          },

          selectEmbarcaciones(){
            let me = this;
            let embarcacionArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('embarcacion/list',configuracion).then((response)=>{
              embarcacionArray=response.data;
              embarcacionArray.map(function(x){
                me.embarcaciones.push({text:x.nombre, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },

           selectAgencias(){
            let me = this;
            let agencaiArray=[];
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('agencia/list',configuracion).then((response)=>{
              agencaiArray=response.data;
              agencaiArray.map(function(x){
                me.agencias.push({text:x.nombre, value:x._id})
              });
            }).catch(function(error){
              console.log(error);
            })
          },


          validar(){
            this.valida=0;
            this.validaMensaje=[];
            if(!this.rol){
              this.validaMensaje.push('El rol es obligatorio');
            }
            if(this.empresa.length<1 || this.empresa.length>30){
              this.validaMensaje.push('El nombre de la empresa debe tener entre 1 y 30 caracteres');
            }
            if(this.nombre.length<1 || this.nombre.length>50){
              this.validaMensaje.push('El nombre del usuario debe tener entre 1 y 50 caracteres');
            }
             if(this.email.length<1 || this.email.length>50){
              this.validaMensaje.push('El email debe tener entre 1 y 50 caracteres');
            }
             if(this.password.length<1 || this.password.length>64){
              this.validaMensaje.push('El password debe tener entre 1 y 64 pasajeros');
            }
           

           
           
            if(this.validaMensaje.length){
              this.valida=1;
            }
            return this.valida;
          },

          agregarDetalle(){
            this.pasajeros.push(
              {
                nombreCompleto: '',
                identificacion: '',
                libretaMar: '',
                destino:''
              }
            )
          },
          limpiar(){
            this._id=''
           
            this.usuario='',
            this.folio='',
            this.agencia='',
            this.fecha='',

            this.pasajeros=[],
          
            this.valida=0,
            this.validaMensaje=[],
            this.editedIndex=-1;
          },
          guardar(){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
              if(this.validar()){
              return;
            }
           
              if(this.editedIndex >-1 ){
                axios.put('solicitudUnica/update',
                {
                    '_id':this._id,
                    'embarcacion':this.embarcacion,
                    'usuario':this.$store.state.usuario._id,            
                    'detalles':this.detalles,
                    'agencia':this.agencia,
                    'eta':this.eta.toLocaleString(),
                    'etd':this.etd.toLocaleString(),
                    'comentarios':this.comentarios,
                    'procedencia':this.procedencia
                
                    
               },configuracion)
               .then(function(response){
                    this.verNuevo =0
                    me.close();
                    me.ocultarNuevo();
                    me.listar();
               }).catch(function(error){
                 console.log(error)
               });
              }else{
                console.log(this.eta)
                axios.post('solicitudUnica/add',
                {
                  
                    'embarcacion':this.embarcacion,
                    'usuario':this.$store.state.usuario._id,            
                    'detalles':this.detalles,
                    'agencia':this.agencia,
                    'eta':this.eta.toLocaleString(),
                    'etd':this.etd.toLocaleString(),
                    'comentarios':this.comentarios,
                    'procedencia':this.procedencia
                    
                    
               },configuracion)
               .then(function(response){
                 me.limpiar();
                 me.close();
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
              }
             
          },
          listar(){
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            let me=this;
            axios.get('solicitudUnica/listAdmin',configuracion).then(function (response){
            me.solicitudUnica=response.data;
            }).catch(function(error){
              console.log(error)
            })
          },
        
          listarDetalles(id){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('solicitudUnica/query?_id='+id,configuracion).then(function (response){
           
            console.log(configuracion)
            }).catch(function(error){
              console.log(error)
            })
          },
          verGuardia(item){
            this.limpiar();
            this.fecha = item.fecha
            this.folio = item.folio
            this.detalles = item.detalles
            this.agencia = item.agencia._id
            this.embarcacion = item.embarcacion._id
            this.listarDetalles(item._id);
            this.verNuevo=1;
          },

          editItem (item) {
            this.limpiar();
            this.eta = item.eta
            this.etd = item.etd
            this.procedencia = item.procedencia
            this.comentarios = item.comentarios
            this.agencia = item.agencia._id
            this.embarcacion = item.embarcacion._id
            this.listarDetalles(item._id);
            this.verNuevo=1;
            this._id=item._id;
           
            this.editedIndex=1;
            this.dialog = false
            this.verNuevo=1
          },

        activarDesactivarMostrar(accion,item){
          this.adModal=1;
          this.adNombre=item.nombre;
          this.adId=item._id;
          if(accion==1){
            this.adAccion=1
          }else if(accion==2){
            this.adAccion=2
          }else{
            this.adMmodal=0;
          }
        },
        activar(){
          let me=this;
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('solicitudUnica/activate',{'_id':this.adId,'aprobacionAmls':this.$store.state.usuario.nombre},configuracion)
               .then(function(response){
                 me.adModal=0,
                 me.adAccion=0,
                 me.adNombre='',
                 me.adId='',
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },

        desactivar(){
          let me=this;
           let header={"Token":this.$store.state.token};
           let configuracion= {headers: header}
           axios.put('solicitudUnica/deactivate',{'_id':this.adId,'aprobacionAmls':this.$store.state.usuario.nombre},configuracion)
               .then(function(response){
                 me.adModal=0,
                 me.adAccion=0,
                 me.adNombre='',
                 me.adId='',
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
        },
        activarDesactivarCerrar(){
          this.adModal=0;
        },

          close () {
            this.dialog = false
          },

         
        }
  }
</script>