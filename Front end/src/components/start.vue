<template>   
    <div id="box" style="sont-size:11px">
      <v-layout row wrap justify-space-around class="text-center mt-10 pt-10">
     <v-flex xs12 md6 class="mt-5">
      <p class="display-1">Word Race Game</p> 

      <p class="headline">Play and enjoy </p><br /> <br/>

      <v-btn text class="primary" @click="startGame">
<span class="pl-10 pr-10 text-capitalize">Start Game</span>
</v-btn>
   
     </v-flex>
          <v-flex xs12 md4 class="mt-5">
      <p class="display-1">Top 10 scores</p> 

     <p v-for="(score,i) in scores" :key="i">{{i+1}}. {{score.point}}</p>
   
     </v-flex>
      

      
 
    </v-layout>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'App',

  data: () => ({
    scores:[],
   
   
  }),

  methods: {
      startGame(){
            this.$router.push({ name: "gamePage" });
         
      }
  },

  async created(){
 axios.get('Server URL', {})
.then((response) => {
  this.scores= response.data.points;
}, (error) => {
  alert(error);
});
   
  }

};
</script>
<style scopped>
  #box{
    max-width:800px;
    margin:auto;
  }
</style>