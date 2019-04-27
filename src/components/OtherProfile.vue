<template>
  <div id="otheruserpage">


  <div class="container emp-profile">

    <h2 style="color: black; text-align: left; margin-bottom: 40px">Welcome to {{this.username}}'s Page!</h2>
    <form method="post">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img" style="text-align: center">
            <img v-if="userInfo && userInfo.avatar" class="avatar" :src="avatarBaseUrl + '/images/' + userInfo.avatar" alt="Ash" style="width: 277.48px; height: 350px; border-radius: 10px">
            <p style="color: black; margin-top: 20px; font-weight: bold; font-size: 20px; margin-right: 43px">Username: {{this.username}}</p>
            <p style="color: black; font-size: 18px; margin-right: 43px">Post: {{this.discussions.length}}</p>
            <p style="color: black; font-size: 18px; margin-right: 43px">Booklist: {{this.booklists.length}}</p>
          </div>
        </div>

        <div class="col-md-6">
          <div class="profile-head">

            <ul class="nav nav-tabs" id="myTab" role="tablist" style="width: 500px">
              <b-tabs content-class="mt-3">

                <b-tab title="Post" style="color: black; text-align: left">
                  <b-media tag="li">
                  <div id="Postings" v-for="(discussion, index) in discussions" :key="index" style="width: 500px">
                    <div id="media">
                      <ul class="list-unstyled">
                        <b-media tag="li" style="margin-top: 15px">
                          <b-img slot="aside" v-if="discussion.file" :src="discussion.file" alt="" style="width: 180px; height: 190px" />


                          <h4 class="mt-0 mb-1" style="margin-left: 20px; font-weight: bold; width: 500px; font-size: 25px">{{discussion.title}}</h4>
                          <h6 style="margin-left: 20px; margin-top: 10px; color: gray">Book Name: {{discussion.bookname}}</h6>
                          <h6 style="margin-left: 20px; color: gray">Date: {{discussion.date.substring(0,10)}}</h6>
                          <h6 style="margin-left: 20px; color: gray">Like: {{discussion.upvotes}}</h6>
                          <h6 style="margin-left: 20px; color: gray">Collected: {{discussion.collect}}</h6>
                          <b-button variant="outline-secondary" style="margin-left: 20px; margin-top: 4px; width: 80px" v-on:click="getDiscussionIDandContent(discussion._id)">View</b-button>
                          <hr>


                        </b-media>


                      </ul>
                    </div>
                  </div>
                  </b-media>

                </b-tab>


                <b-tab title="Booklist" style="color: black">

                  <p v-show="this.booklists.length===0" style="font-size: 18px; margin-top: 25px; color: black">The User has not created any book list...</p>

                  <div id="Follow">
                    <ul class="list-unstyled" v-for="(booklist, index) in booklists" :key="index">

                      <b-media tag="li" class="my-4" style="text-align: left">
                        <h5 class="mt-0 mb-1" style="font-size: 20px">{{booklist.booklistname}}
                          <h6 class="mb-0" style="color: gray; margin-top: 12px">Created Date: {{booklist.date.substring(0,10)}}</h6>

                        </h5>

                        <b-button variant="outline-secondary" style="margin-top: 10px; width: 80px" v-on:click="upvoteforbooklist(booklist._id)">Vote({{booklist.upvotes}})</b-button>
                        <b-button variant="outline-secondary" style="margin-top: 10px; width: 80px" v-on:click="getlistID(booklist._id)">View</b-button>

                      </b-media>
                      <hr>
                    </ul>
                  </div>
                </b-tab>


              </b-tabs>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
            <p>Username: {{this.username}}</p>
            <p>SKILLS</p>
        </div>
        <div class="col-md-8">
        </div>
      </div>
    </form>
  </div>
  </div>
</template>

<script>

  import firebase from "firebase";
  import Vue from 'vue'
  import userservice from "@/services/userservice";
  import discussionservice from "@/services/discussionservice";
  import booklistdirservice from "@/services/booklistdirservice";
  import followservice from "@/services/followservice";
  import BTabs from 'bootstrap-vue/es/components/tabs/tabs'
  Vue.component('b-tabs', BTabs);
  import { baseUrl } from '../components/utils/config.js'

  export default {
    name: "OtherProfile",
    data() {
      return {
        info: [],
        discussions: [],
        booklists: [],
        username: '',
        email: '',
        followers: '',
        userid: '',
        avatar: ''
      }
    },
    created() {
      this.getUserInfo();
      this.getUserPost();
      this.getUserBooklist();
      this.getUserAvatar();
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
      this.getUserAvatar()
    },


    methods: {
      getUserInfo: function() {
        userservice.fetchOneUser(this.$route.params.id).then(response => {
          if (response) {
            console.log(response);
            this.info = response.data;
            this.username = this.info[0].username;
            this.email = this.info[0].email;
            this.followers = this.info[0].followers;
            this.userid = this.info[0]._id;
            this.avatar = this.info[0].avatar;

            console.log(this.userid);
          }
        });
      },

      getUserAvatar: function() {
        userservice.fetchOneUser(this.$route.params.id).then(response => {
          if (response) {
            this.$store.commit("SET_USERINFO", response.data[0]);
          }
        });
      },

      getUserPost: function() {
        discussionservice.fetchUserDiscussion(this.$route.params.id).then(response => {
          this.discussions = response.data;
          console.log(this.discussions);
        });
      },

      getUserBooklist: function() {
        booklistdirservice.fetchUserDir(this.$route.params.id).then(response => {
          this.booklists = response.data;
          console.log(this.booklists);
        });
      },

      upvoteforbooklist: function(bid) {
        console.log(bid);
        booklistdirservice.upvoteforBookdir(bid).then(response => {
          console.log(response.data);
          this.getUserBooklist();
        });
      },

      getDiscussionIDandContent: function(Did) {
        console.log(Did);
        if (Did) {
          this.$router.push({
            name: "Posts",
            params: {
              id: Did
            }
          });
        }
      },


      getlistID: function(bid) {
        console.log(bid);
        if (bid) {
          this.$router.push({
            name: "BooklistForView",
            params: {
              id: bid
            }
          });
        }
      }


    }
  }



</script>

<style scoped>
  body{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
  }

  #otheruserpage {
    background-image: url("https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 10px;
  }

  .emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
  }
  .profile-img{
    text-align: center;
  }
  .profile-img img{
    width: 70%;
    height: 100%;
  }
  .profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
  }
  .profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
  }
  .profile-head h5{
    color: #333;
  }
  .profile-head h6{
    color: #0062cc;
  }
  .profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
  }
  .proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
  }
  .proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
  }
  .profile-head .nav-tabs{
    margin-bottom:5%;
  }
  .profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
  }
  .profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
  }
  .profile-work{
    padding: 14%;
    margin-top: -15%;
  }
  .profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
  }
  .profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
  }
  .profile-work ul{
    list-style: none;
  }
  .profile-tab label{
    font-weight: 600;
  }
  .profile-tab p{
    font-weight: 600;
    color: #0062cc;
  }

</style>
