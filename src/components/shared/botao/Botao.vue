<template>
  <button class="botao" :class="estiloBotao" :type="tipo" @click="disparaAcao"> {{rotulo}} </button>
</template>

<script>
export default {

props:{
    tipo: {
        required:true,
        type:String
    },
    rotulo: {
        required:true,
        type:String
    },
    confirmacao: {
        required:false,
        default:false,
        type:Boolean
    },
    estilo: {
        required:false,
        default:'padrao',
        type:String
    },
} ,

methods: {
    disparaAcao(){

        if (this.confirmacao) {
            if (confirm('Confirma operação?')) {
                this.$emit('botaoAtivado');
            }
            return;
        }
        this.$emit('botaoAtivado');
    }
},
computed: {
    estiloBotao() {
        if(this.estilo == 'padrao')
         return 'botao botao-padrao';
        
        if(this.estilo == 'perigo')
         return 'botao botao-perigo';
    }
}

}
</script>

<style scoped>
   .botao {
       display: inline-block;
       padding: 0.625rem;
       margin: 0.625rem;
       border-radius: 0.187rem;
       font-size: 1.2rem;
   }

   .botao-perigo {
       background-color: firebrick;
       color: #FFF;
   }

   .botao-padrao {
       background-color: darkcyan;
       color: #FFF;
   }

</style>