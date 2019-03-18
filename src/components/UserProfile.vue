<template>
  <div>
    <div id="twitterwidget">
      <div id="userprofile">

        <div v-if="this.username === 'YOU NEED TO LOGIN FIRST'">
          <img class="avatar" src="../assets/whale6.jpg" alt="Ash" />
          <h2>Please Login First! </h2>
        </div>
        <div v-else="this.username !== 'YOU NEED TO LOGIN FIRST'">
          <img class="avatar" src="../assets/whale5.jpg" alt="Ash" />
          <h2>{{this.username}}<a>@{{this.email}}</a></h2>
        </div>

      </div>


      <div id="info" >
        <div v-if="this.username === 'YOU NEED TO LOGIN FIRST'">
          <div>?<span>Postings</span></div>
          <div>?<span>Following</span></div>
          <div>?<span>Followers</span></div>
        </div>
        <div v-if="this.username !== 'YOU NEED TO LOGIN FIRST'">
          <div>90<span>Postings</span></div>
          <div>90<span>Following</span></div>
          <div>90<span>Followers</span></div>
        </div>
      </div>

    </div>

    <div id = "UserCardsProfile">
      <b-card no-body>
        <b-tabs card>
          <b-tab no-body title="Postings Of">
            <div id = "Postings" v-for="(discussion, index) in discussions" :key="index">
              <div id = "media" >
                <ul class="list-unstyled">
                  <b-media tag="li">
                    <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />

                    <h4 class="mt-0 mb-1">{{discussion.title}}</h4>
                    <h6>{{discussion.date}}</h6>
                    <h6>
                      <i class="fa  fa-heart"></i>
                      <i class="fa fa-pencil"></i>
                    </h6>

                  </b-media>


                </ul>
              </div>
            </div>
          </b-tab>

          <b-tab no-body title="Booklist">

            <div id = "addmodal">
              <b-button v-b-modal.modalPut>Create New</b-button>
              <b-modal
                id="modalPut"
                ref="modal"
                title="A New Booklist"
                @ok="handleOk"
                @shown="clearName"
              >
                <form @submit.stop.prevent="handleSubmit">
                  <p>Booklist Name:</p>
                  <b-form-input type="text" placeholder="Enter booklist name" v-model="booklistname" />
                </form>
              </b-modal>
            </div>

            <div id = "booklistdir">

              <ul class="list-unstyled" v-for="(booklistdir, index) in booklistdirs" :key="index">

                <b-media tag="li" class="my-4">
                  <h5 class="mt-0 mb-1">{{booklistdir.booklistname}}

                  </h5>

                  <p class="mb-0">
                    {{booklistdir.date}}
                  </p>


                  <i class="fa  fa-heart" @click="upvotefor(booklistdir._id)"> ({{booklistdir.upvotes}})</i>
                  <i class="fa fa-comment"></i>
                  <i class="fa fa-pencil" @click="getlistID(booklistdir._id)"></i>


                </b-media>

              </ul>
            </div>


          </b-tab>

          <b-tab title="Followers">
            <h5>This tab does not have the <code>no-body</code> prop set</h5>
            Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
            consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
            mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit
            elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure.
          </b-tab>
        </b-tabs>
      </b-card>
    </div>



  </div>


</template>

<script>

  import firebase from 'firebase'
  import userservice from '@/services/userservice'
  import discussionservice from '@/services/discussionservice'
  import booklistdirservice from '@/services/booklistdirservice'
  import Subfooter from "./Subfooter";


    export default {

        name: "UserPrefile",
      components: {Subfooter},
      data (){
          return {
            username: 'YOU NEED TO LOGIN FIRST',
            useremail: '',
            userdisemail:'',
            content: '',
            discussions: [],
            booklistdirs: [],
            info: [],
            name: '',
            upvotes: '',
            signature: '',
            booklistname: ''


          }
        },
        created (){
          this.showUserInfo();
          this.fetchUserDis();
          this.fetchUserBooklistdir();
          this.getlistID();
          this.upvotefor();

        },
        methods: {

          showUserInfo: function () {
            var useremail = firebase.auth().currentUser.email;
            console.log(useremail);
            userservice.fetchOneUser(useremail)
              .then(response => {

                if (response) {
                  this.info = response.data;
                  this.username = this.info[0].username;
                  this.email = this.info[0].email;
                  this.signature = this.info[0].signature;
                  console.log(this.username);

                }
              })
          },
          fetchUserDis: function ( ) {
            var useremail = firebase.auth().currentUser.email;
            discussionservice.fetchUserDiscussion(useremail)
              .then(response => {
                this.discussions = response.data;
                console.log(this.discussions);
              })
          },
          fetchUserBooklistdir: function ( ) {
            var useremail = firebase.auth().currentUser.email;
            booklistdirservice.fetchUserDir(useremail)
              .then(response => {
                this.booklistdirs = response.data;
                console.log(this.booklistdirs)
              })
          },
          upvotefor: function (bid){
            console.log(bid);
            booklistdirservice.upvoteforBookdir(bid)
             .then(response => {
               console.log(response.data);
               this.fetchUserBooklistdir();

            })
          },

          clearName() {
            this.booklistname  = '';
          },

          handleOk(evt) {
            evt.preventDefault();
            if (!this.booklistname) {
              alert('Please enter booklist name')
            } else {
              this.handleSubmit()
            }
          },

          handleSubmit() {
            this.addBooklist();
            this.clearName();
            this.$nextTick(( ) => {
              this.$refs.modal.hide()
            })
          },
          addBooklist: function () {
            if (firebase.auth().currentUser) {

              var useremail = firebase.auth().currentUser.email;
              console.log(useremail);
              userservice.fetchOneUser(useremail)
                .then(response => {

                  if (response) {
                    this.info = response.data;
                    console.log(this.info);

                  }
                });

              var newbooklist = {
                booklistname: this.booklistname,
                username: this.info[0].username,
                email: this.info[0].email
              };
              booklistdirservice.addOneBooklist(newbooklist)
                .then(response => {
                  console.log(response.data);
                  this.fetchUserBooklistdir();
                });
            }
          },

          getlistID: function(bid) {
            console.log(bid);
            if (bid) {
              this.$router.push({
                name: 'Booklist',
                params: {
                  id: bid
                }
              })
            }


          }
        }
    }


</script>

<style scoped>
  *
  {
    padding:0px;
    margin:0px;
  }

  body
  {
    background: #eaeced;
    font-family:arial;
  }

  #twitterwidget
  {
    width:900px;
    background:rgba(0,0,0,0.3);
    border-radius:5px;
    margin:50px auto 0px;
    overflow:auto;
    -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
    -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
    box-shadow: 0 8px 40px -6px #a3a5a6;
  }
  #userprofile
  {
    padding:30px;
    overflow:auto;

  }

  #userprofile div p {
    color:antiquewhite;
    font-size: 1em;
  }

  p style {
    color:black;
    font-size: 15pt;
  }

  #userprofile img
  {
    width:150px;
    height:150px;
    display:block;
    float:left;
    border-radius:5px;
    overflow:auto;
  }

  h2
  {
    color:antiquewhite;
    padding: 30px 40px;
    float:left;
    font-size: 2em;
    text-align: left;
  }
  h2 a {
    text-decoration: none;
    color: #fc4400;
    font-size: 16px;
    display: block;
    padding: 5px 0px 0px 0px;
  }


  #info div div
  {
    border-top:1px solid black;
    border-left:1px solid black;
    border-right:1px solid black;
    border-radius:5px;
    float:left;
    padding:5px 0px;
    width:300px;
    text-align:center;
    font-size: 1.8em;
    color:white;
    font-weight:bold;
    cursor:pointer;
  }
  #info div:first-child
  {
    border-left:none;
  }

  #info div span
  {
    display: block;
    font-size: 0.4em!important;
    font-weight: normal!important;
    text-transform:uppercase;
    color:white;
  }

  h5 {
    overflow:auto;
    font-size:20pt;
    color: black;
  }

  p {
    overflow:auto;
    font-size:10pt;
    color: black;
  }

  #media div {
    float:right;
    color:#2a2c2d;
    padding:10px 20px;
  }

  #UserCardsProfile {
    width:900px;
    background:rgba(255,255,255,1.0);
    border-radius:5px;
    margin:40px auto 0px;
    overflow:auto;
    -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
    -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
    box-shadow: 0 8px 40px -6px #a3a5a6;
  }


  #booklistdir {
    border-radius:5px;
    width: 900px;
    margin:40px auto 40px;
    overflow:auto;
    -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
    -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
    box-shadow: 0 8px 40px -6px #a3a5a6;
  }


  #booklistdir i {
    color: black;
    padding: 10px 20px;
    cursor: pointer;
  }


  p6 {
    color: black;
    text-align: left;
  }


  h4  {
    text-align: left;
    font-size: 13pt;
  }

  h6 {
    text-align: left;
  }

  h6 i {
    padding:5px 20px;
  }



  button {
    padding: 5px 20px;
    margin-top: 10px;
    float: right;
    margin-right: 10px;
  }


  #addmodal {
    color:black;
    float: right;
    margin-right: 40px;
    margin-top: 0px;
    margin-bottom: 20px;
  }




  #addmodal form p{
    margin-bottom: 0px;
    margin-top: 10px;
    float: left;
  }


</style>
