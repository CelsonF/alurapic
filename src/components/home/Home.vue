<template>
  <div>
    <h1 class="centralizado" v-text="titulo"></h1>
    <input type="search" class="filtro" placeholder="Filtrar pelo titulo" @input="filtro = $event.target.value"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <imagem-responsiva class="imagem-responsiva" :url="foto.url" :titulo="foto.titulo" />
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

export default {
  components:{
  'meu-painel':Painel,
  'imagem-responsiva':ImagemResponsiva,
  'meu-botao':Botao
  },
  
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro:''
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
        alert(`Remover foto ${foto.titulo}.`);
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
