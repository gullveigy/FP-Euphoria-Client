<template>
  <div>

    <profilecard style="margin-left: 120px"></profilecard>

    <postsnavbar></postsnavbar>

    <div id="posts">
      <div class="container">
        <div class="well">
          <div class="row">


            <div class="col-md-11">

              <div class="">
                <h1  class="hidden-xs hidden-sm"> {{this.title}}</h1>
                <hr>
                <p1 style="font-weight: bold"> Book Name:  {{this.bookname}}</p1><br>
                <p1 style="font-weight: bold"> Publish Date:  {{this.date.substring(0,10)}}</p1><br>
                <hr>

                <p class="detail-text" v-html="text">{{this.text}}</p>
                <hr>
              </div>
            </div>


            <div class="container">
              <div class="row">


                <div class="col-md-12">

                  <div class="widget-area no-padding blank">

                    <form>
                      <textarea v-model="commenttext" placeholder="Say Something ?" style="width: 100%; height: 150px; border-color: darkslategray; border-radius: 10px"></textarea>
                      <b-button variant="outline-success" @click="addDiscomment()" v-b-modal="'myModal'"><i class="fa fa-share"></i> Comment</b-button>
                    </form>

                    <b-modal id="myModal">
                      <p>You Have Commented Successfully! </p>
                    </b-modal>


                  </div><!-- Widget Area -->
                </div>

              </div>
            </div>




          </div>

        </div>
      </div>


      <div class="container">


        <div class="row">

          <div class="col-md-12">

            <hr>
            <h2 class="page-header">Comments</h2>

            <div v-show="discomments.length===0">
              <p style="font-size: 18px; margin-top: 15px">No Comments Right Now! Waiting For You to Add ...</p>
              <h6 style="color: rgba(255,255,255,0); font-size: 5pt; margin-top: 25px; margin-bottom: 0px; text-align: center">-----Euphoria-----</h6>
            </div>

            <section class="comment-list">
              <!-- First Comment -->
              <article class="row" v-for="(discomment, index) in discomments" :key="index">
                <div class="col-md-9 col-sm-9">

                  <div class="panel-body" style="background-color: gainsboro; width: 593px">
                    <header class="text-left" style="background-color: gainsboro">
                      <div class="comment-user" style="font-size: 18px; background-color: gainsboro; margin-left: 10px"><i class="fa fa-user"></i> {{discomment.username}}</div>
                      <time class="comment-date" datetime="16-12-2014 01:05" style="font-size: 18px; margin-left: 10px"><i class="fa fa-clock-o"></i> {{discomment.date.substring(0,10)}}</time>
                    </header>
                    <div class="comment-post" style="background-color: gainsboro">
                      <p style="margin-top: 8px; font-size: 15px; margin-left: 20px">
                        {{discomment.content}}
                      </p>
                      <i class="fa fa-thumbs-up" style="margin-left: 10px; margin-right: 20px; cursor: pointer" v-on:click="UpvoteforDiscomment(discomment._id)">({{discomment.upvotes}})</i>
                      <i class="fa fa-thumbs-down" style="cursor: pointer" v-on:click="DownvoteforDiscomment(discomment._id)">({{discomment.downvotes}})</i>
                      <i class="fa fa-trash" v-show="CCurrentuser === discomment.username" style="margin-left: 20px; cursor: pointer" v-on:click="deletediscomment(discomment._id)"></i>
                    </div>

                  </div>


                  <h6 style="color: rgba(255,255,255,0); font-size: 5pt; margin-top: 15px; margin-bottom: 0px; text-align: center">-----Euphoria-----</h6>

                </div>



              </article>

            </section>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import firebase from 'firebase'
  import ProfileCard from '@/components/ProfileCard'
  import PostsNavbar from '@/components/PostsNavbar'
  import discussionservice from '@/services/discussionservice'
  import discommentservice from '@/services/discommentservice'
  import userservice from '@/services/userservice'

  export default {
    name: "Forum",
    data () {
      return {
        discussion: [],
        discomments: [],
        info:[],
        userinfo: [],
        title: '',
        author: '',
        date: '',
        username:'',
        content: '',
        text: '',
        commenttext: '',
        useremail: '',
        file: '',
        replytext: '',
        currentuser: firebase.auth().currentUser,
        CCurrentuser: ''
      }
    },
    created () {
      this.getOneDiscussion();
      this.getDiscomment();
      this.addDiscomment();
      this.getCuserInfo();
    },
    components: {
      'profilecard': ProfileCard,
      'postsnavbar': PostsNavbar
    },

    methods: {
      getCuserInfo:function (){
        var useremail = firebase.auth().currentUser.email;
        // console.log(useremail);
        userservice.fetchOneUser(useremail).then(response => {
          if (response) {
            console.log(response);
            this.info = response.data;
            this.CCurrentuser = this.info[0].username;
            this.email = this.info[0].email;
            this.signature = this.info[0].signature;
            this.followers = this.info[0].followers;
            this.userid = this.info[0]._id;
            this.avatar = this.info[0].avatar;

            console.log(this.CCurrentuser);
          }
        });
      },
      getOneDiscussion: function () {
        discussionservice.fetchOneDiscussion(this.$route.params.id)
          .then(response => {

            if (response) {
              this.discussion = response.data;
              this.title = this.discussion[0].title;
              this.date = this.discussion[0].date;
              this.bookname = this.discussion[0].bookname;
              this.author = this.discussion[0].username;
              this.file = this.discussion[0].file;
              this.content = this.discussion[0].content;
              this.text = this.discussion[0].content.replace(/\n/gm,"<br/>");

            }
          })
      },
      getDiscomment: function () {
        discommentservice.fetchDiscommentsNow(this.$route.params.id)
          .then(response => {
            if (response) {
              this.discomments = response.data;
              console.log(this.discomments);
              console.log(this.downvotes)
            }

          })
      },

      UpvoteforDiscomment: function (dcid) {
        discommentservice.upvotefor(dcid)
          .then(response => {
            console.log(response.data);
            this.getDiscomment();

          })
      },

      DownvoteforDiscomment: function (dcid) {
        discommentservice.downvotefor(dcid)
          .then(response => {
            console.log(response.data);
            this.getDiscomment();

          })
      },


      deletediscomment: function (id) {
        this.$swal({
          title: 'Are you totaly sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK Delete it',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value);
          if (result.value === true) {
            discommentservice.deleteDiscomment(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.getDiscomment();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this comment ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error);
                console.log(error)
              })
          } else {
            console.log('SWAL Else Result : ' + result.value);
            this.$swal('Cancelled', 'Your Comment still Counts!', 'info')
          }
        })
      },


      addDiscomment: function () {
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

          var discomment = {
            username: this.info[0].username,
            discussionid: this.$route.params.id,
            content: this.commenttext,
            date: '',
            upvotes: 0,
            downvotes: 0
          };
          discommentservice.addOneDiscomment(discomment)
            .then(response => {
              console.log(response.data);
              this.getDiscomment()
            });

        } else {
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
              this.$router.replace('/login')
            } else this.$router.replace('/')
          })
        }

      }
    }
  }
</script>

<style scoped>

  #posts {

    background-size: auto 100%;
    height: 800px;
  }

  div {
    text-align: left;
    background: #ffffff;
    color: black;
  }

  div .container {
    width: 850px;
    margin-right: 190px;
  }

  h1 {
    margin-top: 35px;
  }

  div .media {
    margin-top: 35px;
    margin-bottom: 25px;
  }

  h4  {
    margin-top: 15px;
  }

  span {
    float: right;
  }

  small {
    float: right;
    font-size: 12pt;
    margin-top:15px;
    margin-right: 5px;
  }




  div .col-md-9.col-md-9 {
    margin-left: 35px;
  }


  img {
    margin-left: 10px;
  }


  div .comment-user {
    margin-top: 10px;
    font-size: 13pt;
  }

  time {
    margin-top: 10px;
    font-size: 11pt;
  }

  p3 {
    margin-top: 25px;
    font-size: 11pt;
  }

  p {
    font-size: 13pt;
    color: black
  }



  h2 {
    margin-top: 30px;
  }









  .btn-circle {
    width: 30px;
    height: 30px;
    text-align: center;
    padding: 6px 0;
    font-size: 12px;
    line-height: 1.428571429;
    border-radius: 15px;
  }
  .btn-circle.btn-lg {
    width: 50px;
    height: 50px;
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 25px;
  }
  .btn-circle.btn-xl {
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    font-size: 24px;
    line-height: 1.33;
    border-radius: 35px;
  }







  body .no-padding {
    padding: 0;
  }
  .widget-area {
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -ms-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -o-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    float: left;
    margin-top: 30px;
    padding: 25px 30px;
    position: relative;
    width: 100%;
  }
  .status-upload {
    background: none repeat scroll 0 0 #f5f5f5;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    float: left;
    width: 100%;
  }
  .status-upload form {
    float: left;
    width: 100%;
  }
  .status-upload form textarea {
    background: none repeat scroll 0 0 #fff;
    border: medium none;
    -webkit-border-radius: 4px 4px 0 0;
    -moz-border-radius: 4px 4px 0 0;
    -ms-border-radius: 4px 4px 0 0;
    -o-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
    color: #777777;
    float: left;
    font-family: Lato;
    font-size: 14px;
    height: 142px;
    letter-spacing: 0.3px;
    padding: 20px;
    width: 100%;
    resize:vertical;
    outline:none;
    border: 1px solid #F2F2F2;
  }

  .status-upload ul {
    float: left;
    list-style: none outside none;
    margin: 0;
    padding: 0 0 0 15px;
    width: auto;
  }
  .status-upload ul > li {
    float: left;
  }
  .status-upload ul > li > a {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    color: #777777;
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin: 10px 0 10px 10px;
    text-align: center;
    -webkit-transition: all 0.4s ease 0s;
    -moz-transition: all 0.4s ease 0s;
    -ms-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
    width: 30px;
    cursor: pointer;
  }
  .status-upload ul > li > a:hover {
    background: none repeat scroll 0 0 #606060;
    color: #fff;
  }
  .status-upload form button {
    border: medium none;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    float: right;
    font-family: Lato;
    font-size: 14px;
    letter-spacing: 0.3px;
    margin-right: 9px;
    margin-top: 9px;
    padding: 6px 15px;
  }
  .dropdown > a > span.green:before {
    border-left-color: #2dcb73;
  }
  .status-upload form button > i {
    margin-right: 7px;
  }



  body {
    background: #F1F3FA;
  }

  /* Profile container */
  .profile {
    margin: 20px 0;
  }

  /* Profile sidebar */
  .profile-sidebar {
    padding: 20px 0 10px 0;
    background: #fff;
  }

  .profile-userpic img {
    float: none;
    margin: 0 auto;
    width: 50%;
    height: 50%;
    -webkit-border-radius: 50% !important;
    -moz-border-radius: 50% !important;
    border-radius: 50% !important;
  }

  .profile-usertitle {
    text-align: center;
    margin-top: 20px;
  }

  .profile-usertitle-name {
    color: #5a7391;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 7px;
  }

  .profile-usertitle-job {
    text-transform: uppercase;
    color: #5b9bd1;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .profile-userbuttons {
    text-align: center;
    margin-top: 10px;
  }

  .profile-userbuttons .btn {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
    padding: 6px 15px;
    margin-right: 5px;
  }

  .profile-userbuttons .btn:last-child {
    margin-right: 0px;
  }

  .profile-usermenu {
    margin-top: 30px;
  }

  .profile-usermenu ul li {
    border-bottom: 1px solid #f0f4f7;
  }

  .profile-usermenu ul li:last-child {
    border-bottom: none;
  }

  .profile-usermenu ul li a {
    color: #93a3b5;
    font-size: 14px;
    font-weight: 400;
  }

  .profile-usermenu ul li a i {
    margin-right: 8px;
    font-size: 14px;
  }

  .profile-usermenu ul li a:hover {
    background-color: #fafcfd;
    color: #5b9bd1;
  }

  .profile-usermenu ul li.active {
    border-bottom: none;
  }

  .profile-usermenu ul li.active a {
    color: #5b9bd1;
    background-color: #f6f9fb;
    border-left: 2px solid #5b9bd1;
    margin-left: -2px;
  }

  /* Profile Content */
  .profile-content {
    padding: 20px;
    background: #fff;
    min-height: 460px;
  }
</style>

