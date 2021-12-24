<template>
  <div>
    <h1 class="centralizado" v-text="titulo"></h1>
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input type="search" class="filtro" placeholder="Filtrar pelo titulo" @input="filtro = $event.target.value"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:rotate.animate.reverse="25" :url="foto.url" :titulo="foto.titulo" />
            
            <router-link :to="{ name : 'altera', params: { id : foto._id }}">
              <meu-botao tipo="button" rotulo="Alterar"/>
            </router-link>

            <meu-botao 
              @botaoAtivado="remove(foto)" 
              :confirmacao="true" 
              tipo="button" 
              estilo="perigo"
              rotulo="Remover"
            />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue'
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';


export default {
  components:{
  'meu-painel':Painel,
  'imagem-responsiva':ImagemResponsiva,
  'meu-botao':Botao
  },
  directives: {
    'meu-transform':transform
  },
  
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro:'',
      mensagem:''
    };
  },
  methods: {
    remove(foto) {
       this.service
       .apaga(foto._id)
       .then(
         ()=> {
         let indice = this.fotos.indexOf(foto);
         this.fotos.splice(indice,1);
         this.mensagem = 'Foto removida com sucesso'
         },
         err => {
          this.mensagem = 'Não foi possível remover a foto';
          console.log(err);
       });
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    
    this.service
    .lista()
    .then(
      (fotos) => (this.fotos = fotos),
      (err) => console.log(err)
    )
  },
  computed: {
    fotosComFiltro() {
       if (this.filtro) {
         let exp = new RegExp(this.filtro.trim(), 'i');
         return this.fotos.filter(foto => exp.test(foto.titulo));
       } else {
         return this.fotos;
       }
    }
  }
};
</script>

<style>


.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style-type: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}


</style>
