<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>
    <form action="">
      <div class="controle">
        <label for="titulo"> TÍTULO </label>
        <input type="text" id="titulo" autocomplete="off" />
      </div>
      <div class="controle">
        <label for="url">URL</label>
        <input type="text" id="url" autocomplete="off" />
        <imagem-responsiva />
      </div>
      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea name="descricao" id="descricao" cols="30" rows="10" autocomplete="off"></textarea>
      </div>
      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link to="/">
           <meu-botao rotulo="VOLTAR" tipo="button"/>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  }
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>