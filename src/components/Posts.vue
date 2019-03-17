<template>
  <div id="posts">
  <div class="container">
    <div class="well">
      <div class="row">
        <div class="col-md-12">

          <div class="">
            <h1  class="hidden-xs hidden-sm"> {{this.title}}</h1>
            <hr>
            <p1> Publish Date:  {{this.date}}</p1><br>
            <p1><strong> Published By:  {{this.author}}</strong></p1>
            <hr>
            <p class="text-justify">{{this.content}}</p></div>
        </div>

        <div class="col-lg-12 aboutme">
          <div class="media">
            <a class="pull-left" href="#">
              <img class="media-object dp img-circle" src="http://startupcentral.in/wp-content/uploads/2013/07/105x81xyashshah-gridle-150x115.jpg.pagespeed.ic.9W-CH38VbP.jpg" style="width: 120px;height:120px;">
            </a>
            <div class="media-body">
              <h4 class="media-heading">{{this.author}} <small> View Home Page</small></h4>
              <hr style="margin:8px auto;border-bottom: 1px solid #ccc;">

              <p style="text-align:left;">Yash Shah is co-founder of Ahmedabad-based Gridle, a cloud-based collaboration platform for small and medium businesses. The company is currently being incubated at CIIE Ahmedabad. Connect with him at LinkedIn.</p>
              <span>Postings (90)  Booklist (13)  Followers (15)</span>

            </div>
          </div>
        </div>




        <div class="container">
          <div class="row">


            <div class="col-md-12">

              <div class="widget-area no-padding blank">
                <div class="status-upload">
                  <h2 class="page-header">Add Comments</h2>
                  <form>
                    <textarea v-model="commenttext" placeholder="Say Something ?" ></textarea>
                    <button type="button" class="btn btn-success green" @click="addDiscomment()" v-b-modal="'myModal'"><i class="fa fa-share"></i> Comment</button>
                  </form>

                  <b-modal id="myModal">
                    <p>You Have Comment Successfully! </p>
                  </b-modal>

                </div><!-- Status Upload  -->
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
        <h2 class="page-header">Comments</h2>
        <section class="comment-list">
          <!-- First Comment -->
          <article class="row" v-for="(discomment, index) in discomments" :key="index">
            <div class="col-md-9 col-sm-9">

                <div class="panel-body">
                  <header class="text-left">
                    <div class="comment-user"><i class="fa fa-user"></i> {{discomment.username}}</div>
                    <time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> {{discomment.date}}</time>
                  </header>
                  <div class="comment-post">
                    <p3>
                      {{discomment.content}}
                    </p3>
                  </div>
                  <p class="text-right"><a href="#" class="btn btn-default btn-sm"><i class="fa fa-reply"></i> reply</a></p>
                </div>

            </div>
          </article>

        </section>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

  import firebase from 'firebase'
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
            title: '',
            author: '',
            date: '',
            username:'',
            content: '',
            commenttext: '',
            useremail: ''
          }
        },
        created () {
          this.getOneDiscussion();
          this.getDiscomment();
          this.addDiscomment();
        },
        methods: {
          getOneDiscussion: function () {
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
          },
          getDiscomment: function () {
            discommentservice.fetchDiscommentsNow(this.$route.params.id)
              .then(response => {
                if (response) {
                  this.discomments = response.data;
                  console.log(this.discomments)
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
    background: url("../assets/whale4.jpg")repeat fixed;
    background-size: auto 100%;
  }

  div {
    text-align: left;
    background: #fff1d2;
    color: black;
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

  .media-body {
    margin-left: 10px;
  }

  .media-object.dp.img-circle {
    margin-top: 10px;
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

</style>
