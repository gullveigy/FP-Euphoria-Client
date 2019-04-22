<template>

  <div>
    <ul>
      <li><a>
        <i class="fa fa-bookmark my-float" @click="Collect()" style="font-size: 20px">({{this.collectnumber}})</i>
      </a></li>
      <li><a>
        <i class="fa fa-thumbs-up my-float" v-on:click="Upvotefor()" style="font-size: 20px">({{this.upvotes}})</i>
      </a></li>
      <li><a>
        <i class="fa fa-arrow-up my-float" @click="GobacktoTop()" style="font-size: 20px"></i>
      </a></li>
    </ul>
  </div>
</template>

<script>

  import firebase from 'firebase'
  import discussionservice from '@/services/discussionservice'
  import collecteddiscussionservice from '@/services/collecteddiscussionservice'

  export default {
    name: "PostsNavbar",
    data() {
      return {
        discussion: [],
        upvotes: '',
        collectnumber: ''
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
              console.log(this.discussion);
              this.upvotes = this.discussion[0].upvotes;
              this.downvotes = this.discussion[0].downvotes;
              this.collectnumber = this.discussion[0].collect;

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
      },

      Collect: function () {
        discussionservice.collectDiscussion(this.$route.params.id)
          .then(response => {
            console.log(response.data);
            this.getOneDiscussion();

            if (firebase.auth().currentUser) {
              var useremail = firebase.auth().currentUser.email;

              discussionservice.fetchOneDiscussion(this.$route.params.id)
                .then(response => {

                  if (response) {
                    this.discussion = response.data;
                    console.log(this.discussion);
                    this.upvotes = this.discussion[0].upvotes;
                    this.downvotes = this.discussion[0].downvotes;
                    this.collectnumber = this.discussion[0].collect;

                    var newcollected = {
                      collectemail: useremail,
                      discussionid: this.$route.params.id,
                      author: this.discussion[0].username,
                      title: this.discussion[0].title,
                      bookname: this.discussion[0].bookname,
                      content: this.discussion[0].content,
                      file: this.discussion[0].file,
                      date: this.discussion[0].date,
                      upvotes: this.discussion[0].upvotes,
                      collect: this.discussion[0].collect

                    };

                    collecteddiscussionservice.addNewCollected(newcollected)

                  }
                });

              this.$swal({
                title: 'Collect Successfully!',
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
                }
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
          })
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
    background-color: rgba(42, 124, 99, 0.29);
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px rgba(153, 153, 153, 0.23);
    z-index:1000;
    animation: bot-to-top 2s ease-out;
  }

  ul{
    position:fixed;
    right:230px;
    top: 490px;
    padding-bottom:1px;
    bottom:80px;
    z-index:100;
    cursor: pointer;
  }

  ul li{
    list-style:none;
    margin-bottom:20px;
  }

  ul li a{
    background-color: rgba(105, 128, 117, 0.29);
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 2px 2px 3px rgba(153, 153, 153, 0.29);
    width:60px;
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
