<template>
  <div id="addposts">
    <div class="container">
  <div class="container contact-form">
    <div class="contact-image">
      <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_post"/>
    </div>
    <form method="post">
      <h3>Post Here</h3>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <input type="text" v-model="bookname" class="form-control" placeholder="Book Name *" value="" />
          </div>
          <div class="form-group">
            <input type="text" v-model="posttitle" class="form-control" placeholder="Title *" value="" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <textarea name="txtMsg" v-model="posttext" placeholder="Write down your unique opinion *" style="width: 100%; height: 200px;"></textarea>
          </div>
          <div class="form-group">

            <a class="btn btn-dark btn1" role="button" @click="addpost()" v-b-modal="'myModal'">Post New Content</a>



            <a href="#/douban" class="btn btn-dark btn1" role="button">Back to Forum</a>

          </div>

          <b-modal id="myModal">
            <p>Successfully!!  You Can See Your Post in the Forum Now.</p>
          </b-modal>

        </div>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>

  import firebase from 'firebase'
  import userservice from '@/services/userservice'
  import discussionservice from '@/services/discussionservice'

    export default {
        name: "AddPost",
      data () {
        return {
          bookname:'',
          Bookname: '',
          posttitle: '',
          posttext: '',
          info:[],
          useremail: ''
        }
      },
      created (){
          this.addpost();
      },
      methods: {
        addpost: function() {
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

            var newpost = {
              username: this.info[0].username,
              title: this.posttitle,
              bookname: this.bookname,
              content: this.posttext,
              email: this.info[0].email,
              date: '',
              upvotes: 0
            };

            discussionservice.addNewPost(newpost);
          }

        }
      }


    }
</script>

<style scoped>

  div#addposts {
    background: url("../assets/whale10.jpg")repeat fixed;
    background-size: auto 100%;
    height: 700px;
  }



  body{
    background: -webkit-linear-gradient(left, #0072ff, #00c6ff);
  }
  .contact-form{
    background: #fff;
    margin-bottom: 5%;
    width: 70%;
  }
  .contact-form .form-control{
    border-radius:1rem;
  }

  textarea {
    border-radius:1rem;
    border-color: rgba(100, 128, 115, 0.43);
  }
  .contact-image{
    text-align: center;
  }
  .contact-image img{
    border-radius: 6rem;
    width: 11%;
    margin-top: -3%;
    transform: rotate(29deg);
  }
  .contact-form form{
    padding: 14%;
  }
  .contact-form form .row{
    margin-bottom: -7%;
  }
  .contact-form h3{
    margin-bottom: 8%;
    margin-top: -10%;
    text-align: center;
    color: #1c221f;
  }
  .contact-form .btnContact {
    width: 50%;
    border: none;
    border-radius: 1rem;
    padding: 1.5%;
    background: rgba(42, 124, 99, 0.75);
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
  input.btnContact
  {
    width: 50%;
    border-radius: 1rem;
    padding: 1.5%;
    color: #fff;
    background-color: #0062cc;
    border: none;
    cursor: pointer;
  }

  p {
    font-size: 13pt;
    color: black;
  }

  a {
    margin: auto;
  }
</style>
