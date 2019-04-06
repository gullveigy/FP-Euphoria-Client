<template>
  <body>
  <div class="card">
    <img src="../assets/suga.jpg" alt="John" style="width:100%">
    <br>
    <h3><b>{{this.author}}</b></h3>
    <p class="title">Postings: (13)</p>
    <p class="title">Booklists: (9)</p>
    <p>Followers: (46)</p>
    <b-button variant="outline-success" style="width: 200px; margin-left: auto; margin-right: auto; margin-bottom: 15px" v-on:click="followAuthor()">Follow</b-button>
  </div>


  </body>


</template>

<script>

  import Vue from 'vue'
  import firebase from 'firebase'
  import discussionservice from '@/services/discussionservice'
  import userservice from '@/services/userservice'
  import BButton from 'bootstrap-vue/es/components/button/button'
  Vue.component('b-button', BButton);

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
          useremail: '',
          info: [],
          uid: '',
          authorid: ''

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
                console.log(this.author)
              }
            })
        },

        followAuthor: function (){
          if (firebase.auth().currentUser) {
            discussionservice.fetchOneDiscussion(this.$route.params.id)
              .then(response => {

                if (response) {
                  this.discussion = response.data;
                  this.author = this.discussion[0].username;
                  console.log(this.author);

                  userservice.fetchOneByname(this.author)
                    .then(response => {
                      if (response) {
                        console.log(this.author);
                        this.info = response.data;

                        userservice.upvoteforAuthor(this.info[0]._id)
                           .then(response => {
                             if (response) {
                               console.log(response.data);
                             }
                           })
                        }
                  })
                }

              });
            this.$swal({
              title: 'Follow Successfully!',
              text: 'Go Back to Personal Center to Check It?',
              type: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK, Go',
              cancelButtonText: 'No, thx',
              showCloseButton: true
              // showLoaderOnConfirm: true
            }).then((result) => {
              if (result.value === true) {
                this.$router.replace('/userprofile')
              } else this.$router.replace('/postcontent')
            })
          }else {
            this.$swal({
              title: 'You need to login first!',
              text: 'You can\'t do this action',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'OK, Go login',
              cancelButtonText: 'No, thx',
              showCloseButton: true
              // showLoaderOnConfirm: true
            }).then((result) => {
              if (result.value === true) {
                this.$router.replace('login')
              } else this.$router.replace('/')
            })
          }
          },

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
