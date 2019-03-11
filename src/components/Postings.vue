<template>
  <div id="postings-page">
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="page-caption">
            <h1 class="page-title">Forum - Find the Same Soul</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.page-header-->
  <!-- news -->
  <div class="card-section">
    <div class="container"  v-for="(Discussion, index) in Discussions" :key="index">
      <div class="row">
        <div class="col-md-4">
          <div class="card-content">
            <div class="card-img">
              <img src="https://placeimg.com/380/230/nature" alt="">
              <span><h4>heading</h4></span>
            </div>
            <div class="card-desc">
              <h3>{{Discussion.title}}</h3>
              <p>{{Discussion.author}}</p>
              <a href="#" class="btn-card">Read</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-content">
            <div class="card-img">
              <img src="https://placeimg.com/380/230/animals" alt="">
              <span><h4>heading2</h4></span>
            </div>
            <div class="card-desc">
              <h3>{{Discussion.title}}</h3>
              <p>{{Discussion.author}}</p>
              <a href="#" class="btn-card">Read</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-content">
            <div class="card-img">
              <img src="https://placeimg.com/380/230/tech" alt="">
              <span><h4>heading3</h4></span>
            </div>
            <div class="card-desc">
              <h3>{{Discussion.title}}</h3>
              <p>{{Discussion.author}}</p>
              <a href="#" class="btn-card">Read</a>
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

  import discussionservice from '@/services/discussionservice'


    export default {
        name: "Postings",
        data (){
          return {
              Discussions: [],
              title: '',
              author: '',
              date: ''
          }
        },
        created (){
          this.getDiscussions();

        },
        methods: {
          getDiscussions: function () {
            discussionservice.fetchDiscussions()
              .then(response => {

                if (response) {
                  this.Discussions = response.data;
                  console.log(this.Discussions)
                }
              })
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



  .page-header { background: url(https://easetemplate.com/free-website-templates/hike/images/pageheader.jpg)no-repeat; position: relative; background-size: cover; }
  .page-caption { padding-top: 140px; padding-bottom: 144px; }
  .page-title { font-size: 46px; line-height: 1; color: #fff; font-weight: 600; text-align: center; }

  .card-section { position: relative; bottom: 60px; }
  .card-block { padding: 50px; }
  .section-title { padding: 2px; }


  div.card-block {
    width: 350px;
    height:250px;
    margin-top: 5px;
  }

  div .section-title {
    width: 250px;
    height: 150px;
  }

  div .section-title i {
    color: black;
    padding: 10px 20px;
    cursor: pointer;
  }





  section{
    padding: 100px 0;
  }

  div .col-md-4 {
    margin-top:10px;
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
    top: 15%;
    left: 12%;
    background: #1ABC9C;
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
    background-color: #1ABC9C;
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
    background: orange;
  }
  a.btn-card {
    text-decoration: none;
    color: #fff;
  }



</style>
