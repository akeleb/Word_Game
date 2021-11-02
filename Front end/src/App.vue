<template>
  <v-app>
    <v-app-bar
      
      color="purple"
      dark
   app
    >
    
     <v-toolbar-title class="ml-10">Word Race Game</v-toolbar-title>
     <v-spacer></v-spacer>
  <!--   <v-btn     
        text
      >
        <span class="text-capitalize mr-2">Help</span>
       
      </v-btn> -->
    </v-app-bar>

    <v-main class="mt-10">
       <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    words:[],
     tempWords:["Hallu", "Make","Fast","Time", "Money", "Work"],
    triedText:"",
    isCorrectWord:false,
    timer:100000,
    gameOver:false
  }),
mounted() {

    let self = this; 


    window.addEventListener('keyup', function(ev) {
        self.keyDownHandler(ev); // declared in your component methods
    });
},
methods: {
    keyDownHandler(e) {

      if((/[a-zA-Z]/).test(e.key) && e.key.length==1 )
        this.triedText =this.triedText+ e.key
        else if(e.key=="Backspace") 	
           this.triedText=this.triedText.slice(0, -1);

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
           if(this.timer>500)  this.timer= this.timer-250
          
            }
            else  this.isCorrectWord=false
    },
},
created() {
    this.words.push(this.tempWords[Math.floor(Math.random() * this.tempWords.length)]) 

     setInterval(() => {
       this.words.push(this.tempWords[Math.floor(Math.random() * this.tempWords.length)])

       if(this.words.length>7){
         this.gameOver=true
         this.timer=6000
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