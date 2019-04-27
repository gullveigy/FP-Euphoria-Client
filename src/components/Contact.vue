<template>
  <body>
  <section class="contact pt-100 pb-100" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 mx-auto text-center">
          <div class="section-title mb-100">
            <h4>Contact Us</h4>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-8">
          <form action="#" class="contact-form">
            <div class="row">

              <div class="col-xl-12">
                <input type="text" v-model="Ctitle" placeholder="title">
              </div>
              <div class="col-xl-12">
                <input type="text" v-model="Ctelephone" placeholder="telephone">
              </div>
              <div class="col-xl-12">
                <textarea v-model="Cmessage" placeholder="message" cols="30" rows="10"></textarea>
                <input type="button" value="send message" v-on:click="addcontact()">
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <div class="single-contact">
            <i class="fa fa-map-marker"></i>
            <h5>Address</h5>
            <p>Lacken Wood, Waterford, Ireland</p>
          </div>
          <div class="single-contact">
            <i class="fa fa-phone"></i>
            <h5>Phone</h5>
            <p>(+1) 517 397 7100</p>
          </div>
          <div class="single-contact">
            <i class="fa fa-envelope"></i>
            <h5>Email</h5>
            <p>1804094745@qq.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script>

  import firebase from 'firebase'
  import userservice from '@/services/userservice'
  import contactservice from '@/services/contactservice'

    export default {
      name: "Contact",
      data() {
        return {
          Ctelephone:'',
          title: '',
          Cmessage: '',
          info:[],
          useremail: '',
          username: '',
          Ctitle: ''
        }
      },
      methods: {
        addcontact: function () {

          if (firebase.auth().currentUser) {
            var useremail = firebase.auth().currentUser.email;
            console.log(useremail);
            userservice.fetchOneUser(useremail)
              .then(response => {
                if (response) {
                  this.info = response.data;
                  console.log(this.info);

                  var newcontact = {
                    username: this.info[0].username,
                    title: this.Ctitle,
                    phonenumber: this.Ctelephone,
                    content: this.Cmessage,
                    email: this.info[0].email,
                    date: ''
                  };
                  contactservice.addContact(newcontact);

                }
              });


            this.$swal({
              title: 'Send Message Successfully!',
              text: 'Go Back to Home Page?',
              type: 'success',
              showCancelButton: true,
              confirmButtonText: 'OK, Go',
              cancelButtonText: 'No, thx',
              showCloseButton: true
              // showLoaderOnConfirm: true
            }).then((result) => {
              if (result.value === true) {
                this.$router.replace('/')
              } else this.$router.replace('/contact')
            })

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
              } else this.$router.replace('/')
            })
          }
        }

      }
    }
</script>

<style scoped>
  .pb-100 {
    padding-bottom: 100px;
  }
  .pt-100 {
    padding-top: 100px;
  }
  .mb-100 {
    margin-bottom: 100px;
  }
  a {
    text-decoration: none;
    color: #333;
    -webkit-transition: .4s;
    transition: .4s;
  }
  .section-title {
    position: relative;
  }
  .section-title p {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 400;
  }
  .section-title h4 {
    font-size: 40px;
    font-weight: 600;
    text-transform: capitalize;
    position: relative;
    padding-bottom: 20px;
    display: inline-block;
  }
  .section-title h4::before {
    position: absolute;
    content: "";
    width: 80px;
    height: 2px;
    background-color: #d8d8d8;
    bottom: 0;
    left: 50%;
    margin-left: -40px;
  }
  .section-title h4::after {
    position: absolute;
    content: "";
    width: 50px;
    height: 2px;
    background-color: #FF7200;
    left: 0;
    bottom: 0;
    left: 50%;
    margin-left: -25px;
  }
  .contact {
    background-image: url("../assets/whale10.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    z-index: 2;
    color: #fff;
  }
  .contact-form input,
  textarea {
    width: 100%;
    border: 1px solid #555;
    padding: 5px 10px;
    text-transform: capitalize;
    margin-top: 15px;
    background-color: transparent;
    color: #fff;
  }
  .contact:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #333;
    z-index: -1;
    opacity: .85;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=85)";
  }
  .single-contact {
    text-align: left;
    position: relative;
    padding-left: 70px;
    margin-bottom: 50px;
    margin-top: 10px;
  }
  .single-contact i.fa {
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: #FF7200;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
  }
  .single-contact h5 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .single-contact p {
    font-size: 15px;
    font-weight: 400;
  }
  .contact-form input[type="button"] {
    background-color: #FF7200;
    border: 0px;
    cursor: pointer;
    font-size: 16px;
    -webkit-transition: .4s;
    transition: .4s
  }
  .contact-form input[type="submit"]:hover {
    background-color: #CC5B00
  }
  .contact-form input:focus, textarea:focus {
    border-color: #CC5B00
  }
</style>
