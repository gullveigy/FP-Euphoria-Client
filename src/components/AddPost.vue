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
                <textarea name="txtMsg" v-model="posttext" placeholder="Write down your unique opinion *" style="width: 100%; height: 200px"></textarea>
              </div>




              <div class="form-group">


                <el-upload style="width: 80%; margin: auto; margin-bottom: 10px"
                           action=""
                           ref="upload"
                           list-type="picture" :auto-upload="false" :multiple="false" :limit="1">
                  <el-button slot="trigger" size="small" type="warning" style="background-color: gray; border-color: grey; width: 154.93px; height: 37.29px">Add Post Cover</el-button>
                </el-upload>


                <a class="btn btn-dark btn1" role="button" @click="addpost()" v-b-modal="'myModal'">Post New Content</a>


              </div>

              <b-modal id="myModal">
                <p>Successfully!!  You Can See Your Post in the Forum Now.</p>
              </b-modal>

            </div>
          </div>
        </form>
      </div>
    </div>

    <h6 style="color: rgba(255,255,255,0); font-size: 5pt; margin-bottom: 0px; margin-top: 15px; text-align: center">-----Euphoria-----</h6>

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
        useremail: '',
        uploadFiles: [],
        addinfo:''
      }
    },
    created (){
      this.addpost();
    },
    methods: {
      addpost: function() {
        let that = this;
        let reader = new FileReader();
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
            upvotes: 0,
            collect: 0,
            file: ''
          };

          reader.readAsDataURL(this.$refs.upload.uploadFiles[0].raw);
          reader.onload = function (e) {
            newpost.file = this.result;

            discussionservice.addNewPost(newpost);
          }
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
              this.$router.replace('login')
            } else this.$router.replace('/addpost')
          })
        }

      }
    }


  }
</script>

<style scoped>

  div#addposts {
    background: url("../assets/whale10.jpg")repeat fixed;
    background-size: auto 100%;
    height: 900px;
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

