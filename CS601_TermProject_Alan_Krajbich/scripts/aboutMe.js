export default {
  name: "#app",
    data() {
      return{
        snappyMessage: 'awating message',
        link: "http://www.bu.edu/csmet/academic-programs/courses/cs601/",
        messages: [
          "Thank you for the great semester",
           "These are random!",
           "Refresh Again to see more!",
           "I am a CS student at BU",
           "Power Overwhelming",
           "All your base are belong to us"
        ],
        correct: "You guessed correctly! Congratulations!",
        incorrect: "You guessed incorrectly! Try again!",
        correctColor: "green",
        incorrectColor: "red",
        unknownColor: "grey",
        questionResponses:[
        "",
         "",
         "",
         "",
         "",
        ]
      }
    },
    methods: {
      setRandomMessage: function() {
        this.snappyMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
      },
      checkIfLie: function(qNumber) {
        
        if( event.target.className == "lie"){
          this.questionResponses[qNumber] = this.correct;
        }else{
          this.questionResponses[qNumber] = this.incorrect;
        }
      },
    },
    computed: {
    },
    created() {
      this.setRandomMessage();
    },
}
