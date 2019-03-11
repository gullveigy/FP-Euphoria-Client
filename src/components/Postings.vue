<template>
  <div>
  <div id = "Postings" v-for="(discussion, index) in discussions" :key="index">
  <div id = "media" >
    <ul class="list-unstyled">
      <b-media tag="li">
        <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />

        <h5 class="mt-0 mb-1">List-based media object</h5>
        <p class="mb-0">

          {{discussion.content}}
        </p>
        <div><i class="fa  fa-heart"></i></div>
        <div><i class="fa fa-pencil"></i></div>
      </b-media>


    </ul>
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
            content: '',
            discussions: []
          }
        },
        created (){
          this.fetchDiscussions()
        },
        methods: {
          fetchDiscussions: function ( ) {
             discussionservice.fetchOneDiscussion()
               .then(response => {
                 this.discussions = response.data;
                 console.log(this.discussions)
               })
          }
        }
    }
</script>

<style scoped>
#Postings
{
  width:900px;
  background:#fff;
  border-radius:5px;
  margin:30px auto 0px;
  overflow:auto;
  -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
  -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
  box-shadow: 0 8px 40px -6px #a3a5a6;
}

  #media {
    padding:30px;
    overflow:auto;
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
</style>
