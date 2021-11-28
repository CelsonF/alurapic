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
      fotos: [
        {
          id:0,
          url: "https://images.dog.ceo/breeds/boxer/28082007167-min.jpg",
          titulo: "foto cachorro",
        },
        {
          id:1,
          url: "https://images.dog.ceo/breeds/akita/Akita_inu_blanc.jpg",
          titulo: "foto cachorro",
        },
      ],
    };
  },
};
</script>

<style>
</style>
