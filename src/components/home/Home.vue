<template>
  <div>
    <h1 class="centralizado" v-text="titulo"></h1>
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input type="search" class="filtro" placeholder="Filtrar pelo titulo" @input="filtro = $event.target.value"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:rotate.animate.reverse="25" :url="foto.url" :titulo="foto.titulo" />
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
  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos")
      .then((result) => result.json())
      .then(
        (fotos) => (this.fotos = fotos),
        (err) => console.log(err)
      );
  },
  methods: {
    remove(foto) {
       this.$http
       .delete(`http://localhost:3000/v1/fotos/${foto._id}`)
       .then(()=> {
         let indice = this.fotos.indexOf(foto);
         this.fotos.splice(indice,1);
         this.mensagem = 'Foto removida com sucesso'
         },
         err => {
          console.log(err)
          this.mensagem = 'Não foi possível remover a foto';
       });
    }
  }
  ,
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
