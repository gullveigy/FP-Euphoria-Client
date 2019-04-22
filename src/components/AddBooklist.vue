<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-6">
            <div>
              <h5>Book Information:</h5>
              <ul>
                <li><img style="width: 127.99px; height: 170px; margin-top: 10px;" v-bind:src="book.imgUrl"></img></li>
                <li>Book Title: <em>{{book.title}}</em></li>
                <li>Author: <em>{{book.author}}</em></li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6">
            <h5>Select Booklist:</h5>

            <div v-show="booklistdirs.length===0">
              <p style="font-size: 18px; margin-top: 15px">You do not have a book list for the time being. Please go to the 'Personal' page first and create your own book lists.</p>
            </div>

            <b-list-group v-for="(booklistdir, index) in booklistdirs" :key="index">
              <b-list-group-item style="cursor: pointer" v-on:click="addBooks(booklistdir._id)">{{booklistdir.booklistname}}</b-list-group-item>
            </b-list-group>

            <div v-show="this.mark === false">
              <p style="font-size: 15px">Add Book into Selected Booklist Successfully!</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import firebase from 'firebase'
  import BListGroup from 'bootstrap-vue/es/components/list-group/list-group'
  Vue.component('b-list-group', BListGroup);
  import booklistdirservice from '@/services/booklistdirservice'
  import booklistservice from '@/services/booklistservice'

    export default {
      props: [ 'book'],
      name: "AddBooklist",
      data () {
        return {
          booklistdirs: [],
          booklistname: '',
          mark: true
        }
      },
      created () {
        this.getcurrentBooklist();
      },
      methods: {
        getcurrentBooklist: function () {
          if (firebase.auth().currentUser) {
            var useremail = firebase.auth().currentUser.email;
            booklistdirservice.fetchUserDir(useremail)
              .then(response => {
                this.booklistdirs = response.data;
                console.log(this.booklistdirs)
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
        },

        addBooks: function (bid) {
          if (firebase.auth().currentUser) {
            var booklist = {
              booklistid: bid,
              bookname: this.book.title,
              author: this.book.author,
              username: 'Agust D',
              date: ''
            };
            booklistservice.addOneBook(booklist)
              .then(response => {
                console.log(response.data);
              });

            this.mark = false;

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
        }

      }
    }
</script>

<style scoped>

</style>
