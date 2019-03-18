<template>

  <div>
    <ul>
      <li><a>
        <i class="fa fa-thumbs-up my-float" v-on:click="Upvotefor()">({{this.upvotes}})</i>
      </a></li>
      <li><a>
        <i class="fa fa-arrow-up my-float" @click="GobacktoTop()"></i>
      </a></li>
    </ul>
  </div>
</template>

<script>

  import discussionservice from '@/services/discussionservice'

    export default {
      name: "PostsNavbar",
      data() {
        return {
          discussion: [],
          upvotes: ''
        }
      },
      created() {
        this.getOneDiscussion();

        this.GobacktoTop();
      },
      methods: {
        getOneDiscussion: function () {
          discussionservice.fetchOneDiscussion(this.$route.params.id)
            .then(response => {

              if (response) {
                this.discussion = response.data;
                this.upvotes = this.discussion[0].upvotes;
                this.downvotes = this.discussion[0].downvotes;

              }
            })
        },
        Upvotefor: function () {
          discussionservice.upvoteforDiscussion(this.$route.params.id)
            .then(response => {
              console.log(response.data);
              this.getOneDiscussion();

            })
        },
        GobacktoTop: function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0
        }
      }
    }
</script>

<style scoped>

  *{padding:0;margin:0;}

  body{
    font-family:Verdana, Geneva, sans-serif;
    background-color:#CCC;
    font-size:12px;
  }

  .float{
    position:fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    background-color: #2a7c63;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    z-index:1000;
    animation: bot-to-top 2s ease-out;
  }

  ul{
    position:fixed;
    right:70px;
    top: 570px;
    padding-bottom:1px;
    bottom:80px;
    z-index:100;
    cursor: pointer;
  }

  ul li{
    list-style:none;
    margin-bottom:10px;
  }

  ul li a{
    background-color: #698075;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px #999;
    width:90px;
    height:60px;
    display:block;
  }

  ul:hover{
    visibility:visible!important;
    opacity:1!important;
  }


  .my-float{
    font-size:24px;
    margin-top:18px;
  }

</style>
