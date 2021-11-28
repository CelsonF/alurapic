<template>
  <div>
    <h1 v-text="titulo"></h1>
    <ul class="list-dogs">
        <li v-for="foto in fotos">
             <img :src="foto.url" :alt="foto.titulo" />
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
    };
  },
  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
    .then(result => result.json())
    .then(fotos => this.fotos = fotos, err => console.log(err));
  }
};
</script>

<style>
</style>
