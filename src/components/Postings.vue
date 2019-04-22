<template>
  <div>
    <div id="postings-page">
      <div class="page-header">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="page-caption" style="height: 300px">


                <div id='search' class="form-inline">
                  <b-button variant="light" style="height: 37.99px; width: 118px; left: 5%; position: absolute"><a href="#/addpost">Write Post</a></b-button>
                  <input id='searchContent' v-model="search" type="text" placeholder="Enter Bookname" class="form-control"  style="left: 70%; position: absolute"/>&nbsp;
                  <b-button variant="secondary" v-on:click="searchpost()" style="position: absolute; left: 90%">search</b-button>
                </div>




              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.page-header-->







      <!-- news -->

      <div class="card-section">
        <div class="container">

          <div class="row" v-if="this.search === ''">
            <div class="col-md-4" v-for="(Discussion, index) in Discussions" :key="index">
              <div class="card-content" style="height: 500px; border-radius:5px;">

                <img v-if="Discussion.file" :src="Discussion.file" alt="" style="width: 350px; height: 240px">

                <div class="card-desc" style="text-align: left">
                  <h4 style="text-align: left; font-weight: bold">{{Discussion.title}}</h4>
                  <p style="font-size: 10px; color: black; text-align: left">{{Discussion.username}}, {{Discussion.date.substring(0,10)}}</p>
                  <p style="font-size: 10px; color: black; text-align: left">{{Discussion.content.substring(0,100)}}...</p>
                  <i class="fa fa-fire" style="color: black; margin-right: 25px">({{Discussion.upvotes}})</i>
                  <i class="fa fa-bookmark" style="color: black">({{Discussion.collect}})</i>
                  <b-button variant="outline-info" v-on:click="getDiscussionIDandContent(Discussion._id)" style="margin-right: 270px; width: 78px; margin-top: 10px">Read</b-button>
                </div>
              </div>
            </div>
          </div>

          <div class="row" v-else="this.search !== ''">
            <div class="col-md-4" v-for="(newDiscussion, index) in newDiscussions" :key="index">
              <div class="card-content" style="height: 500px; border-radius:5px;">

                <img v-if="newDiscussion.file" :src="newDiscussion.file" alt="" style="width: 350px; height: 240px">

                <div class="card-desc" style="text-align: left">
                  <h4 style="text-align: left; font-weight: bold">{{newDiscussion.title}}</h4>
                  <p style="font-size: 10px; color: black; text-align: left">{{newDiscussion.username}}, {{newDiscussion.date.substring(0,10)}}</p>
                  <p style="font-size: 10px; color: black; text-align: left">{{newDiscussion.content.substring(0,100)}}...</p>
                  <i class="fa fa-fire" style="color: black; margin-right: 25px">({{newDiscussion.upvotes}})</i>
                  <i class="fa fa-bookmark" style="color: black">({{newDiscussion.collect}})</i>
                  <b-button variant="outline-info" v-on:click="getDiscussionIDandContent(newDiscussion._id)" style="margin-right: 270px; width: 78px; margin-top: 10px">Read</b-button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>




    </div>

  </div>
</template>

<script>

  import firebase from 'firebase'
  import Vue from 'vue'
  import Subfooter from '@/components/Subfooter'

  import discussionservice from '@/services/discussionservice'



  export default {
    name: "Postings",
    data (){
      return {
        Discussions: [],
        newDiscussions:[],
        title: '',
        author: '',
        date: '',
        id: '',
        search: ''
      }
    },
    created (){
      this.getDiscussions();
      this.getDiscussionIDandContent();
      this.searchpost();

    },
    methods: {
      getDiscussions: function () {
        discussionservice.fetchDiscussions()
          .then(response => {

            if (response) {
              this.Discussions = response.data;
              console.log(this.Discussions);

            }
          })
      },
      searchpost: function () {
        discussionservice.fetchDiscussionsbyQuerySearch(this.search)
          .then(response => {

            if (response) {
              this.newDiscussions = response.data;
              console.log(this.newDiscussions);

            }
          })
      },

      getDiscussionIDandContent: function (Did) {
        console.log(Did);
        if (Did) {
          this.$router.push({
            name: 'Posts',
            params: {
              id: Did
            }
          })
        }
      }
    }
  }

</script>

<style scoped>
  body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; font-family: 'Overpass', sans-serif; letter-spacing: 0px; font-size: 17px; color: #8d8f90; font-weight: 400; line-height: 32px; background-color: #edefef; }
  h1, h2, h3, h4, h5, h6 { color: #25292a; margin: 0px 0px 10px 0px; font-family: 'Overpass', sans-serif; font-weight: 700; letter-spacing: -1px; line-height: 1; }
  h1 { font-size: 34px; }
  h2 { font-size: 28px; line-height: 38px; }
  h3 { font-size: 22px; line-height: 32px; }
  h4 { font-size: 20px; }
  h5 { font-size: 17px; }
  h6 { font-size: 12px; }
  p { margin: 0 0 5px; line-height: 1.7; font-size: 10px; color: black;}
  p:last-child { margin: 0px; }
  ul, ol { }
  a { text-decoration: none; color: #8d8f90; -webkit-transition: all 0.3s; -moz-transition: all 0.3s; transition: all 0.3s; }
  a:focus, a:hover { text-decoration: none; color: #f85759; }



  .page-header {
    position: relative;
  }
  .page-caption {
    padding-top: 140px;
    padding-bottom: 144px;
    background: url("../assets/whale15.jpg")repeat fixed;
  }


  .card-section { position: relative; bottom: 10px; }



  div .section-title i {
    color: black;
    padding: 10px 20px;
    cursor: pointer;
  }


  section{
    padding: 100px 0;
  }

  div .col-md-4 {
    margin-top:25px;
  }


  .card-content {
    background: #ffffff;
    border: 4px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  }

  .card-img {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    z-index: 1;
  }

  .card-img img {
    width: 100%;
    height: auto;
    display: block;
  }

  .card-img span {
    position: absolute;
    top: 10%;
    left: 12%;
    background: #648073;
    padding: 6px;
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    transform: translate(-50%,-50%);
  }
  .card-img span h4{
    font-size: 12px;
    margin:0;
    padding:10px 5px;
    line-height: 0;
  }
  .card-desc {
    padding: 1.25rem;
  }

  .card-desc h3 {
    color: #000000;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 1.3em;
    margin-top: 0;
    margin-bottom: 5px;
    padding: 0;
  }

  .card-desc p {
    color: #747373;
    font-size: 14px;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5;
    margin: 0px;
    margin-bottom: 20px;
    padding: 0;
    font-family: 'Raleway', sans-serif;
  }
  .btn-card{
    background-color: rgba(124, 70, 76, 0.75);
    color: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    padding: .84rem 2.14rem;
    font-size: .81rem;
    -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    -o-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
    margin: 0;
    border: 0;
    -webkit-border-radius: .125rem;
    border-radius: .125rem;
    cursor: pointer;
    text-transform: uppercase;
    white-space: normal;
    word-wrap: break-word;
    color: #fff;
  }
  .btn-card:hover {
    background: #7c464c;
  }
  a.btn-card {
    text-decoration: none;
    color: #fff;
  }





  #custom-search-input {
    margin:auto;
    margin-top: 25px;
    padding: 0;
    width: 600px;
    position: center;
  }

  #custom-search-input .search-query {
    padding-right: 5px;
    padding-right: 4px \9;
    padding-left: 5px;
    padding-left: 4px \9;
    /* IE7-8 doesn't have border-radius, so don't indent the padding */

    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  #custom-search-input button {
    border: 0;
    background: none;
    /** belows styles are working good */
    padding: 2px 5px;
    margin-top: 2px;
    position: relative;
    left: -28px;
    /* IE7-8 doesn't have border-radius, so don't indent the padding */
    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color: #1c221f;
  }

  .search-query:focus + button {
    z-index: 3;
  }








</style>

