<template>   
    <div id="box">
      <v-layout row wrap justify-space-around class="text-center">
    <!--- <v-flex xs12 md4>
      <span>5</span> <br/>
      <span>Level</span>
     </v-flex> -->
        <v-flex xs12 md4>
      <span>{{score}}</span> <br/>
      <span>Score</span>
     </v-flex>

      <v-flex xs12 class="mt-10" id="stack">

      <span v-for="(word,i) in words" :key="i" id="word">{{word}}</span> 
   
     </v-flex>
    <div class="mt-10 container ">
    <p> Write the correct word, Use CapsLk to capitalize and Backspace to pop up one letter at a time.</p>
     <span id="textArea" class="mr-10 pr-10 ">{{triedText}}</span> <span> <v-icon v-if="!isCorrectWord && triedText!=''" class="red--text">cancel</v-icon>
     <v-icon v-if="isCorrectWord && triedText!=''" class="green--text">check</v-icon></span>
    </div>
      </v-layout>
       <v-dialog max-width="700px" v-model="gameOver" persistent>
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" >
         
      </v-btn>
    </template>
    <v-card class="grey lighten-4">
      <v-card-title>
        <span>Game Over!</span>
        <v-spacer></v-spacer>
      
      </v-card-title>
      <v-card-text>

      <p class="text-center red--text headline">Game over! Try again</p>
      <p class="text-center">Score: {{score}}</p>
     
        <audio id="playSound" src="../assets/audio.mp3" preload="auto">
  
</audio>
      
      </v-card-text>
    </v-card>
  </v-dialog>
      </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data: () => ({
    words:[],
     tempWords:["Hallu", "Make","Fast","component","Time", "Money", "Work","interrupted"],//sample words but we ca
    triedText:"",
    isCorrectWord:false,
    timer:3000,
    gameOver:false,
    score:0,
    loadingCount:0
  }),
mounted() {

    let self = this; 


    window.addEventListener('keyup', function(ev) {
        self.keyDownHandler(ev); 
    });
},
methods: {
    keyDownHandler(e) {

      if((/[a-zA-Z]/).test(e.key) && e.key.length==1 )
        this.triedText =this.triedText+ e.key
        else if(e.key=="Backspace") 	
           this.triedText=this.triedText.slice(0, -1);
        else if(e.key=="Shift") { 
            if(e.key.length==1)
            this.triedText =this.triedText+ e.key
}
let count=0
           for(let i=0;i<this.words.length;i++){
             if(this.triedText==this.words[i]){
               count++
          
                  this.words.splice( this.words.indexOf( this.words[i]), 1);
              
             }
           }

           if(count>0) {
           
             this.isCorrectWord=true 
            this.triedText=""
           if(this.timer>500)  this.timer= this.timer - 1000;
           this.score=this.score+2 //use any increamental point for now it is constant
          
          
            }
            else  this.isCorrectWord=false
    },
},
async created() {

         if(this.loadingCount==0)
    this.words.push(this.tempWords[Math.floor(Math.random() * this.tempWords.length)]) 

      setInterval(()  =>  {
        this.loadingCount=1;
        
if(this.words.length<7){
       this.words.push(this.tempWords[Math.floor(Math.random() * this.tempWords.length)])

}
  else{
         this.gameOver=true
       
         this.timer=6000
            document.getElementById('playSound').play()
if(this.score>0)  {
   axios.post('Server URL', {
  point: this.score,
  
})
.then((response) => {

  if(response.status==200){
          this.$router.push({ name: "start" });
          this.words=[]
          this.$router.go();
  }    
}, (error) => {
  alert(error);
     this.$router.push({ name: "start" });
          this.words=[]
          this.$router.go();
});
     
} else {
     this.$router.push({ name: "start" });
          this.words=[]
          this.$router.go();
}

       }
    }, this.timer);
},
// destroyed() {
//     window.removeEventListener('keydown', this.keyDownHandler)
// },
};
</script>
<style scopped>
  #box{
    max-width:800px;
    margin:auto;
  }
  #stack{
    background-color:grey;
    padding:10px;
    border-radius:6px;
  }
  #word{
    color:black;
    margin:10px;
    background-color:white;
    padding:10px;
    border-radius:3px;

  }
  #textArea{
     color:white;
    margin:10px;
    background-color:grey;
    padding:10px;
    border-radius:3px;
  }
</style>