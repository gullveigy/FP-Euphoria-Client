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
      </div>
    </div>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="page-header">Comments</h2>
        <section class="comment-list">
          <!-- First Comment -->
          <article class="row">
            <div class="col-md-2.5 col-sm-2.5 hidden-xs">
              <figure class="thumbnail">
                <img class="img-responsive" src="https://s.tcdn.co/e78/90b/e7890b10-1c4c-3cd4-a176-4e1010807ace/192/1.png" />
              </figure>
            </div>
            <div class="col-md-9 col-sm-9">

                <div class="panel-body">
                  <header class="text-left">
                    <div class="comment-user"><i class="fa fa-user"></i> That Guy</div>
                    <time class="comment-date" datetime="16-12-2014 01:05"><i class="fa fa-clock-o"></i> Dec 16, 2014</time>
                  </header>
                  <div class="comment-post">
                    <p3>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

  import discussionservice from '@/services/discussionservice'

    export default {
        name: "Forum",
        data () {
          return {
            discussion: [],
            title: '',
            author: '',
            date: '',
            content: ''
          }
        },
        created () {
          this.getOneDiscussion();
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
          }
        }
    }
</script>

<style scoped>

  #posts {
    background: url("../assets/whale7.jpg")repeat fixed;
    background-size: auto 100%;
  }

  div {
    text-align: left;
    background: rgba(240, 248, 255, 0.42);
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

</style>
