<template>
  <body>
  <div class="card">
    <img src="../assets/suga.jpg" alt="John" style="width:100%">
    <br>
    <h3><b>{{this.author}}</b></h3>
    <p class="title">Postings: (13)</p>
    <p class="title">Booklists: (9)</p>
    <p>Followers: (46)</p>
    <p><a class="button">Profile</a></p>
  </div>


  </body>


</template>

<script>

  import discussionservice from '@/services/discussionservice'

    export default {
      name: "ProfileCard",
      data() {
        return {
          discussion: [],
          title: '',
          author: '',
          date: '',
          username: '',
          content: '',
          commenttext: '',
          useremail: ''

        }
      },
      created() {
        this.getDiscussionAuthor();
      },
      methods: {
        getDiscussionAuthor: function () {
          discussionservice.fetchOneDiscussion(this.$route.params.id)
            .then(response => {

              if (response) {
                this.discussion = response.data;
                this.title = this.discussion[0].title;
                this.date = this.discussion[0].date;
                this.author = this.discussion[0].username;
                this.content = this.discussion[0].content;
              }
            })
        }
      }
    }
</script>

<style scoped>

  body {
    float:left;
    margin-left: 140px;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    font-family: arial;
  }

  .title {
    color: grey;
    font-size: 18px;
  }

  .button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #3498DB;
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    font-size: 22px;
    color: black;
  }

  button:hover, a:hover {
    opacity: 0.7;
  }








</style>
