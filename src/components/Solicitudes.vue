<template>
  <v-layout align-start>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="cambiosGuardia"
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
          <v-toolbar-title>SOLICITUD CAMBIO DE GUARDIA</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field class="text-xs-center" v-if="verNuevo==0" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          
        
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
                <v-btn @click="activarDesactivarCerrar()" color="error" small>
                  Cancelar
                </v-btn>
                 <v-btn v-if="adAccion==1" @click="activar()" small color="primary">
                  Aprobar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" small color="orange">
                  Anular
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        
        <v-icon
          small
          class="mr-2"
          @click="verGuardia(item)"
        >
          tab
        </v-icon>
       

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
              <v-text-field v-model="folio" label="Folio"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 lg4 x14>
              <v-text-field v-model="fecha" type="date" label="Fecha"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 lg4 x14>
              <v-autocomplete  v-model="embarcacion" :items="embarcaciones"  label="Embarcaciones"></v-autocomplete>
            </v-flex>

           
            <v-flex xs12 sm4 lg4 x14>
              <v-autocomplete :items="agencias"  v-model="agencia" label="Agencias"></v-autocomplete>
            </v-flex>
          
              <v-flex xs12 sm4 lg8 x14>
              <v-textarea v-model="detalles"  clearable="clearable" label="Detalles"></v-textarea>
            </v-flex>

            <v-flex xs12 sm2 md2 lg2 x12>
              <v-btn small fab dar color="" @click="agregarDetalle()">
                  <v-icon dark>group_add
</v-icon>
              </v-btn>
            </v-flex>

             <v-flex xs12 sm2 md12 lg12 xl12>
               <template>
                 <v-data-table
                  :headers="cabeceraDetalles"
                  :items="pasajeros"
                  class="elevation-1"
                  hide-default-footer
                
                 >
                          <template slot="items" slot-scope="props">
                          
                           <td class="text-xs-center"><v-text-field v-model="props.items.nombreCompleto"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.identificacion"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.libretaMar"></v-text-field></td>
                          <td class="text-xs-center"><v-text-field v-model="props.items.destino"></v-text-field></td>

                          

                      </template>
             <template  v-slot:item.borrar="{ item }">
                 <v-icon
          small
          @click="eliminarPasajero(pasajeros,item)"
        >
          delete
        </v-icon>
            </template>

               

            <template  v-slot:item.nombreCompleto="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.nombreCompleto"></v-text-field></td>
            </template>
             <template  v-slot:item.identificacion="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.identificacion"></v-text-field></td>
            </template>
             <template  v-slot:item.libretaMar="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.libretaMar"></v-text-field></td>
            </template>
            <template  v-slot:item.destino="{ item }">
                 <td class="text-xs-center"><v-text-field clearable="clearable" v-model="item.destino"></v-text-field></td>
            </template>
            
         

                 </v-data-table>
               </template>
            </v-flex>
             <v-flex xs12 sm2 md12 lg12 xl12>
            
             <v-btn class="ma-2" v-if="verDetallee==0" @click.native="guardar()" outlined color="indigo">Guardar</v-btn>
             <v-btn class="ma-2"  @click.native="ocultarNuevo()" outlined color="red">Cancel</v-btn>
               
              
             </v-flex>


        </v-layout>
    </v-container>

  </v-flex>


  </v-layout>

  
</template>
<script>
import axios from 'axios';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader

  export default {
     icons: {
    iconfont: 'fa4',
  },
    data(){
      return{
                  dialog: false,
                  search: '',
                 cambiosGuardia:[],
                headers: [
               { text: 'Actions', value: 'action', sortable: false},
               { text: 'Usuario', value: 'usuario.nombre', sortable:true},
               { text: 'Folio', value: 'folio', sortable:true},
               { text: 'Agencia', value: 'agencia.nombre', sortable:true},
               { text: 'Fecha', value: 'fecha', sortable:false},
               { text: 'Embarcacion', value: 'embarcacion.nombre',sortable:false},
               { text: 'Estado', value: 'estado',sortable:true},
               { text: 'Detalles', value: 'detalles',sortable:true},
            ],
            editedIndex: -1,
            _id:'',
            embarcacion:'',
            embarcaciones:[],
           
            nombreCompleto:'',
            agencias:[],
            nombre:'',
            agencia2:'',
            cabeceraDetalles:[
              { text: 'Borrar', value: 'borrar', sortable: false},
              { text: 'Nombre Completo', value: 'nombreCompleto' },
              { text: 'Identificacion', value: 'identificacion' },
              { text: 'Libreta de Mar', value: 'libretaMar' },
              { text: 'Destino', value: 'destino' },
           
            ],
            pasajeros:[],
            verNuevo:0,
            verDetallee:0,
            fecha:'',
            estado:'',
            detalles:'',
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
            this.limpiar()
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
            this.agencia='',
            this.fecha='',

            this.pasajeros=[],
          
            this.valida=0,
            this.validaMensaje=[],
            this.editedIndex=-1;
            this.verDetallee=0;
          },
          guardar(){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
          
           
              if(this.editedIndex >-1 ){
              
                axios.put('cambioGuardia/update',
                {
                    '_id':this._id,
                    'embarcacion':this.embarcacion,
                    'usuario':this.$store.state.usuario._id,
                    'detalles':this.detalles,
                    'agencia':this.agencia,
                    'fecha':this.fecha,
                    'pasajeros':this.pasajeros,
                   
                    
               },configuracion)
               .then(function(response){
                    me.close();
                    me.ocultarNuevo();
                    me.listar();
               }).catch(function(error){
                 console.log(error)
               });
              }else{
                axios.post('cambioGuardia/add',
                {
                  
                    'embarcacion':this.embarcacion,
                    'usuario':this.$store.state.usuario._id,
                    'detalles':this.detalles,
                    'agencia':this.agencia,
                    'fecha':this.fecha,
                    'pasajeros':this.pasajeros,
                    'detalles':this.detalles
                    
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
            axios.get('cambioGuardia/listAdmin',configuracion).then(function (response){
            me.cambiosGuardia=response.data;
            }).catch(function(error){
              console.log(error)
            })
          },

          listarDetalles(id){
            let me=this;
            let header={"Token":this.$store.state.token};
            let configuracion= {headers: header}
            axios.get('cambioGuardia/query?_id='+id,configuracion).then(function (response){
            me.pasajeros=response.data.pasajeros;
            
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
            this.verDetallee=1;
          },

          editItem (item) {
            this.limpiar();
            this.fecha = item.fecha
            this.folio = item.folio
            this.detalles = item.detalles
            this.agencia = item.agencia._id
            this.embarcacion = item.embarcacion._id
            this.listarDetalles(item._id);
            this.verNuevo=1;
            this._id=item._id;
            this.folio = item.folio
            this.fecha = item.fecha
            this.detalles = item.detalles
            this.editedIndex=1;
            this.dialog = false
            this.verNuevo=1
          },

        activarDesactivarMostrar(accion,item){
          this.adModal=1;
          this.adNombre=item.folio;
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
           axios.put('cambioGuardia/activate',{'_id':this.adId,'aprobacionAmls':this.$store.state.usuario.nombre},configuracion)
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
           console.log(this.$store.state.usuario.nombre)
           let configuracion= {headers: header}
           axios.put('cambioGuardia/deactivate',{'_id':this.adId,'aprobacionAmls':this.$store.state.usuario.nombre},configuracion)

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