<template>
<div id="booklistpage">
  <div>

    <div class="backtotop">
      <ul>
        <li><a>
          <i class="fa fa-arrow-up my-float" @click="GobacktoTop()"></i>
        </a></li>
      </ul>
    </div>

    <div id = "listboard">

      <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i> {{this.messagetitle}}</h3>
      <div id="pdfDom">
        <div id="app1">
          <v-client-table :columns="columns" :data="booklists" :options="options">
            <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteBook(props.row._id)"></a>
          </v-client-table>
        </div>
      </div>
      <div id = "addmodal">
        <b-button v-b-modal.modalPut>Add Comments</b-button>
        <b-button v-b-modal.modalPrevent>Add Books</b-button>
        <b-button v-on:click="getPdf()">Export PDF</b-button>
        <b-modal
          id="modalPrevent"
          ref="modal"
          title="Book Details"
          @ok="handleOk"
          @shown="clearName"
        >
          <form @submit.stop.prevent="handleSubmit">
            <p>Book Name:</p>
            <b-form-input type="text" placeholder="Enter book name" v-model="bookname" />
            <p>Book Author:</p>
            <b-form-input type="text" placeholder="Enter book author" v-model="author" />
          </form>
        </b-modal>

        <b-modal
          id="modalPut"
          ref="modal"
          title="Add Comments For"
          @ok="handlethisOK"
          @shown="clearComment"
        >
          <form @submit.stop.prevent="handleSubmitCo">

            <p>Your Comment:</p>
            <b-form-textarea type="area" placeholder="Enter comment here" v-model="comment" />
          </form>
        </b-modal>
      </div>

    </div>


    <div class="comment-body">
    <h5 style="margin-top: 159px">Comment For {{this.messagetitle}}</h5>

    <div v-show="Bcomments.length===0">
      <p style="font-size: 15px; margin-top: 30px">No Comments Right Now! Waiting For You to Add ...</p>
    </div>

    <div id="comment" v-for="(Bcomment, index) in Bcomments" :key="index">
      <div id="card">
      <b-card>
        <b-card-text>
          {{Bcomment.comment}}
        </b-card-text>
        <sub-title>By  {{Bcomment.username}} at {{Bcomment.date}}</sub-title>

        <i class="fa fa-trash" @click="deleteBcomment(Bcomment._id)"></i>
        <i class="fa fa-heart" @click="upvoteBcomment(Bcomment._id)"> ({{Bcomment.upvotes}})</i>
      </b-card>
      </div>
    </div>

    </div>

  </div>

  <h6 style="color: rgba(255,255,255,0); font-size: 5pt; margin-bottom: 0px; margin-top: 80px; text-align: center">-----Euphoria-----</h6>

</div>

</template>

<script>

  import firebase from 'firebase'
  import userservice from '@/services/userservice'
  import booklistservice from '@/services/booklistservice'
  import booklistdirservice from '@/services/booklistdirservice'
  import booklistcommentservice from '@/services/booklistcommentservice'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'
  import { Card } from 'bootstrap-vue/es/components'
  import BCard from 'bootstrap-vue/es/components/card/card'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});
  Vue.use(Card);
  Vue.component('b-card', BCard);

  export default {
      name: "Booklist",
      data () {
        return {
          messagetitle: ' Book List ',
          bookname:'',
          author: '',
          date:'',
          booklistid: '',
          booklistname: '',
          username: '',
          currentusername: '',
          email: '',
          comment: '',
          useremail: '',
          info: '',
          booklists: [],
          Bcomments: [],
          info: [],
          props: ['_id'],
          errors: [],
          columns: ['_id', 'bookname', 'author','date', 'remove'],
          options: {
            perPage: 10,
            filterable: ['bookname', 'author'],
            sortable:['date'],
            headings: {
              _id: 'ID',
              bookname: 'Book Name',
              author: 'Author',
              date: 'Date'
            }
          }
        }
      },
    created () {
      this.loadBooklists();
      this.getMessageTitle();
      this.upvoteBcomment();
      this.getBdirComment();
      this.GobacktoTop();
    },
    methods: {
      getMessageTitle: function () {
        booklistdirservice.fetchOneBooklistdir(this.$route.params.id)
          .then(response => {

            if (response) {
              this.info = response.data;
              this.messagetitle = this.info[0].booklistname;

              console.log('id='+ this.$route.params.id)
            }
          })
      },
      clearName() {
         this.bookname  = '';
         this.author = '';
      },
      clearComment() {
         this.comment = '';
      },
      handleOk(evt) {
        evt.preventDefault();
        if (!this.bookname) {
          alert('Please enter book name')
        } else {
          this.handleSubmit()
        }
      },
      handlethisOK(evt) {
        evt.preventDefault();
        if (!this.comment) {
          alert('Please enter comment!')
        } else {
          this.handleSubmitCo()
        }
      },
      handleSubmitCo() {
        this.addComments();
        this.clearComment();
        this.$nextTick(( ) => {
          this.$refs.modal.hide()
        })
      },
      handleSubmit() {
        this.addBooks();
        this.clearName();
        this.$nextTick(( ) => {
          this.$refs.modal.hide()
        })
      },
      addBooks: function () {
        if (firebase.auth().currentUser) {
          var booklist = {
            booklistid: this.$route.params.id,
            bookname: this.bookname,
            author: this.author,
            username: 'Agust D',
            date: ''
          };
          booklistservice.addOneBook(booklist)
            .then(response => {
              console.log(response.data);
              this.loadBooklists();
            });
        }
      },
      addComments: function () {
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

          var Bcomment = {
            username: this.info[0].username,
            booklistname: this.messagetitle,
            booklistid: this.$route.params.id,
            comment: this.comment,
            date: '',
            upvotes: 0
          };
          booklistcommentservice.addOneBcomment(Bcomment)
            .then(response => {
              console.log(response.data);
              this.getBdirComment();
            });
        }
      },
      deleteBcomment: function (id) {
        this.$swal({
          title: 'Are you totaly sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK Delete it',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value);
          if (result.value === true) {
            booklistcommentservice.deleteOneBooklistcomment(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.getBdirComment();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this comment ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error);
                console.log(error)
              })
          } else {
            console.log('SWAL Else Result : ' + result.value);
            this.$swal('Cancelled', 'Your Comment still Counts!', 'info')
          }
        })
      },
      getCurrentUserInfo: function (){
        var useremail = firebase.auth().currentUser.email;
        console.log(useremail);
        userservice.fetchOneUser(useremail)
          .then(response => {

            if (response) {
              this.info = response.data;
              this.username = this.info[0].username;
              this.email = this.info[0].email;
              console.log(this.username);

            }
          })
      },
      getBdirComment: function () {
        booklistcommentservice.fetchBdirComment(this.$route.params.id)
          .then(response => {
            this.Bcomments = response.data;
            console.log(this.Bcomments)
          })
      },
      upvoteBcomment: function (bcid) {
        console.log(bcid);
        booklistcommentservice.upvote(bcid)
          .then(response => {
            console.log(response.data);
            this.getBdirComment();

          })
      },
      loadBooklists: function () {
        booklistservice.fetchOneBooklists(this.$route.params.id)
          .then(response => {
            // JSON responses are automatically parsed.
            this.booklists = response.data;
            console.log(this.booklists)
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      deleteBook: function (id) {
        this.$swal({
          title: 'Are you totaly sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK Delete it',
          cancelButtonText: 'Cancel',
          showCloseButton: true
          // showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result.value);
          if (result.value === true) {
            booklistservice.deleteBook(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.loadBooklists();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'You successfully deleted this Book ' + JSON.stringify(response.data, null, 5), 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
                this.errors.push(error);
                console.log(error)
              })
          } else {
            console.log('SWAL Else Result : ' + result.value);
            this.$swal('Cancelled', 'Your Book still Counts!', 'info')
          }
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

  #booklistpage {
    background-image: url("../assets/whale16.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    z-index: 2;
    color: #fff;
    margin-top: 0px;
  }

  #booklistpage:before {
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

  #app1 {
    width: 60%;
    margin: 0 auto;
    border-radius:5px;
    border-color: gray;

  }

  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
    color: black;
  }

  #listboard {
    width: 1200px;
    background:rgba(225,225,230,0.93);
    border-radius:5px;
    margin:0px auto 40px auto;
    overflow:auto;
    -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
    -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
    box-shadow: 0 8px 40px -6px #a3a5a6;



  }

  #addmodal {
    color:black;
    float: right;
    margin-right: 40px;
    margin-top: 0px;
    margin-bottom: 20px;
  }




  #addmodal form p{
    margin-bottom: 0px;
    margin-top: 10px;
    float: left;
  }


  h5 {
    font-size: 20pt;
    margin-top: 35px;
  }

  h6 {
    margin-top: 55px;
  }

  #comment {
    width: 900px;
    background:rgba(225,225,230,0.9);
    border-radius:5px;
    margin:40px auto 40px;
    overflow:auto;
    -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
    -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
    box-shadow: 0 8px 40px -6px #a3a5a6;
  }

  #card {

    color: black;
    overflow: auto;
    text-align:left;
    width: 900px;
  }

  #card div  {
    width: 890px;
  }



  #card i {
    padding: 10px;
    float: right;
    cursor: pointer;
  }

  #card sub-title {
    color: gray;
    margin-left:30px;
  }

  #card p{
    margin-left:20px;
    margin-top:15px;
  }


 div .comment-body {
   margin-bottom: 15px;
 }



  ul{
    position:fixed;
    right:40px;
    top: 650px;
    padding-bottom:1px;
    bottom:60px;
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
    width:60px;
    height:60px;
    display:block;
  }

  .my-float{
    font-size:24px;
    margin-top:18px;
  }


  p{
    margin-top: 25px;
  }






</style>
