<template>
  <div class="corpo">
    <h1 class="centralizado" v-text="titulo"></h1>
    <input type="search" class="filtro" placeholder="Filtrar pelo titulo" @input="filtro = $event.target.value"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto in fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
            <img class="imagem-responsiva " :src="foto.url" :alt="foto.titulo" />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from './components/shared/painel/Painel.vue'

export default {
  components:{
  'meu-painel':Painel
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
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style-type: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.imagem-responsiva {
  width: 100%;
}

.filtro {
  display: block;
  width: 100%;
}


</style>
