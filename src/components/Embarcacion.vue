<template>
  <v-layout align-start>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="embarcaciones"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.estado="{ item }">
        <v-card-text v-if="item.estado" class="blue--text">Activo</v-card-text>
        <v-card-text v-if="!item.estado" class="red--text">Inactivo</v-card-text>
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Embarcaciones</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" @click="limpiar" v-on="on">Nueva Embarcacion</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="1" md="12">
                      <v-text-field v-model="armador" label="Armador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="eslora" type="number" label="Eslora"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="manga" label="Manga"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="tbr" label="TBR"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="trn" label="TRN"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="calado" label="Calado"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="tipo" label="Tipo"></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6" md="12" v-show="valida">
                      <div class="red--tex" v-for="v in validaMensaje" :key="v" v-text="v">

                      </div>
                    </v-col>
                   
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
                  Activar Item
              </v-card-title>
              <v-card-title class="headline" v-if="adAccion==2">
                  Desactivar Item
              </v-card-title>

              <v-card-text>
                  Estas a punto de <span v-if="adAccion==1">Activar</span>
                  <span v-if="adAccion==2">Desactivar</span> la embarcacion {{adNombre}}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="activarDesactivarCerrar()" color="green darken-1" flat="flat">
                  Cancelar
                </v-btn>
                 <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-4" flat="flat">
                  Activar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-4" flat="flat">
                  Desactivar
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
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <template v-if="item.estado">
        <v-icon
          small
          @click="activarDesactivarMostrar(2,item)"
        >
          block
        </v-icon>
        </template>
          <template v-else>
        <v-icon
          small
          @click="activarDesactivarMostrar(1,item)"
        >
          check
        </v-icon>
        </template>

      </template>
        <template v-slot:item.certificado="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
fa fa-file-pdf-o
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="listar()">Resetear</v-btn>
      </template>
    </v-data-table>
  </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader

  export default {
     icons: {
    iconfont: 'fa4',
  },
    data(){
      return{
                  dialog: false,
                  search: '',
                  embarcaciones:[],
                headers: [
               { text: 'Actions', value: 'action', sortable: false},
               { text: 'Nombre', value: 'nombre', sortable:true},
               { text: 'Armador', value: 'armador', sortable:true},
               { text: 'Tipo', value: 'tipo', sortable:true},
               { text: 'TBR', value: 'tbr',sortable:false},
               { text: 'TRN', value: 'trn',sortable:false},
               { text: 'Eslora', value: 'eslora',sortable:false},
               { text: 'Manga', value: 'manga',sortable:false},
               { text: 'Calado', value: 'calado',sortable:false},
               { text: 'Estado', value: 'estado',sortable:false},
               { text: 'Certificado de Arqueo', value: 'certificado'}
            ],
            editedIndex: -1,
            _id:'',
            nombre:'',
            armador:'',
            tipo:'',
            tbr:'',
            trn:'',
            eslora:'',
            manga:'',
            calado:'',
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
          this.listar()
        },

        methods: {

          

          validar(){
            this.valida=0;
            this.validaMensaje=[];
            if(this.nombre.length<1){
              this.validaMensaje.push('El nombre es obligatorio');
            }
            if(this.armador.length<1){
              this.validaMensaje.push('El armador es obligatorio');
            }
            if(this.tipo.length<1){
              this.validaMensaje.push('El tipo de embarcación es obligatorio');
            }
             if(this.tbr.length<1){
              this.validaMensaje.push('El TBR es obligatorio');
            }
             if(this.trn.length<1){
              this.validaMensaje.push('El trn es obligatorio');
            }
             if(this.eslora.length<1){
              this.validaMensaje.push('La Eslora es obligatorio');
            }
             if(this.nombre.manga<1){
              this.validaMensaje.push('La manga es obligatorio');
            }
             if(this.calado.length<1){
              this.validaMensaje.push('El calado es obligatorio');
            }
            if(this.validaMensaje.length){
              this.valida=1;
            }
            return this.valida;
          },

          limpiar(){
            this._id='',
            this.nombre='',
            this.armador='',
            this.eslora='',
            this.tbr='',
            this.trn='',
            this.tipo='',
            this.manga='',
            this.calado=''
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
                axios.put('embarcacion/update',{'_id':this._id,'nombre':this.nombre,'armador':this.armador,'tipo':this.tipo,'tbr':this.tbr,'trn':this.trn,'eslora':this.eslora,'manga':this.manga,'calado':this.calado},configuracion)
               .then(function(response){
                 me.limpiar();
                 me.close();
                 me.listar();
               }).catch(function(error){
                 console.log(error)
               });
             }else{
               //Nuevo
               axios.post('embarcacion/add',{'nombre':this.nombre,'armador':this.armador,'tipo':this.tipo,'tbr':this.tbr,'trn':this.trn,'eslora':this.eslora,'manga':this.manga,'calado':this.calado},configuracion)
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
            axios.get('embarcacion/list',configuracion).then(function (response){
            me.embarcaciones=response.data;
            }).catch(function(error){
              console.log(error)
            })
          },

          editItem (item) {
            this._id=item._id;
            this.nombre=item.nombre;
            this.armador=item.armador;
            this.eslora=item.eslora;
            this.tbr=item.tbr;
            this.trn=item.trn;
            this.tipo=item.tipo;
            this.manga=item.manga;
            this.calado=item.calado;
            this.editedIndex=1;

            this.dialog = true
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
           axios.put('embarcacion/activate',{'_id':this.adId},configuracion)
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
           axios.put('embarcacion/deactivate',{'_id':this.adId},configuracion)
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