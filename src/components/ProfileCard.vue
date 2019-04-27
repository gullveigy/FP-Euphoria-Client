<template>
  <body>
  <div class="card">
    <img v-if="userInfo && userInfo.avatar" class="avatar" :src="avatarBaseUrl + '/images/' + userInfo.avatar" alt="Ash" style="width: 300px; height: 300px; border-radius: 10px">
    <br>
    <h3><b>{{this.author}}</b></h3>
    <p>Postings: ({{this.authordiscussion.length}})</p>
    <p>Booklists: ({{this.authorbooklistdir.length}})</p>
    <p>Followers: ({{this.authorfollower}})</p>
    <b-button variant="outline-success" style="width: 200px; margin-left: auto; margin-right: auto; margin-bottom: 15px" v-on:click="followAuthor()">Follow</b-button>
  </div>


  </body>


</template>

<script>

  import Vue from 'vue'
  import firebase from 'firebase'
  import discussionservice from '@/services/discussionservice'
  import userservice from '@/services/userservice'
  import followservice from '@/services/followservice'
  import booklistdirservice from '@/services/booklistdirservice'
  import BButton from 'bootstrap-vue/es/components/button/button'
  Vue.component('b-button', BButton);
  import { baseUrl } from '../components/utils/config.js'

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
        authorid: '',
        followername: '',
        followeremail: '',
        email: '',
        authorinfo: [],
        authorfollower: '',
        authoremail: '',
        authordiscussion: [],
        authorbooklistdir: []
      }
    },
    created() {
      this.getDiscussionAuthor();
      this.getDAuthorInfo();
    },

    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      avatarBaseUrl() {
        return baseUrl
      }
    },
    mounted() {
      this.getDiscussionAuthor()
    },

    methods: {
      getDiscussionAuthor: function () {
        discussionservice.fetchOneDiscussion(this.$route.params.id)
          .then(response => {

            if (response) {
              this.discussion = response.data;
              this.title = this.discussion[0].title;
              this.date = this.discussion[0].date;
              this.file = this.discussion[0].file;
              this.author = this.discussion[0].username;
              this.content = this.discussion[0].content;
              console.log(this.author);

              userservice.fetchOneByname(this.author).then(response => {
                if (response) {
                  this.$store.commit("SET_USERINFO", response.data[0]);
                }
              });

            }
          })
      },


      getDAuthorInfo: function () {
        discussionservice.fetchOneDiscussion(this.$route.params.id)
          .then(response => {
            if (response) {
              this.discussion = response.data;
              this.author = this.discussion[0].username;

              userservice.fetchOneByname(this.author).then(response => {
                if (response) {
                  this.authorinfo = response.data;
                  this.authorfollower = this.authorinfo[0].followers;
                  this.authoremail = this.authorinfo[0].email;


                  discussionservice.fetchUserDiscussion(this.authoremail)
                    .then(response => {
                      if (response) {
                        this.authordiscussion = response.data;
                      }
                    });

                  booklistdirservice.fetchUserDir(this.authoremail)
                    .then(response => {
                      if (response) {
                        this.authorbooklistdir = response.data;
                      }
                    })
                }
              })
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
                        });


                      var newfollow = {
                        email: firebase.auth().currentUser.email,
                        followername: this.info[0].username,
                        followeremail: this.info[0].email
                      };


                      followservice.addFollower(newfollow)
                        .then(response => {
                          console.log(response.data);
                          this.getDiscussionAuthor();
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


  a {
    text-decoration: none;
    font-size: 22px;
    color: black;
  }

  button:hover, a:hover {
    opacity: 0.7;
  }








</style>
