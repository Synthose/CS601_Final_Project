export default {
  name: "#app",
    data() {
      return{
        snappyMessage: setRandomMessage(),
        link: "http://www.bu.edu/csmet/academic-programs/courses/cs601/",
        messages: [
          "hello",
           "test",
           "Happy Happy Day"
        ]
      }
    },
    methods: {
      setRandomMessage() {
        this.snappyMessage = this.messages[Math.floor(Math.random() * this.messages.length)];
      }
    },
    created: {
    },
}
