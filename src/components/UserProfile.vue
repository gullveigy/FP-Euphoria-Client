<template>
  <div id="userpage">
    <h6 style="color: rgba(255,255,255,0)">---Euphoria---</h6>

    <div id="twitterwidget">
      <div id="userprofile">
        <div v-if="this.username === 'YOU NEED TO LOGIN FIRST'">
          <img class="avatar" src="../assets/whale6.jpg" alt="Ash">
          <h2>Please Login First!</h2>
        </div>
        <div v-else>
          <img v-if="avatar" class="avatar" :src="avatarBaseUrl + '/images/' + avatar" alt="Ash">
          <img v-else class="avatar" src="../assets/whale6.jpg" alt="Ash">
          <h2>
            Welcome! {{this.username}}
            <a>@{{this.email}}</a>
            <el-upload
              class="upload-demo"
              action="http://localhost:3000/uploadavatarurl"
              name="avatar"
              :data="userId"
              :beforeUpload="beforeAvatarUpload"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :show-file-list="false"
              :auto-upload="true">
              <el-button class="upload-demo-btn" slot="trigger" size="small" type="primary">Change the Avatar</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button> -->
            </el-upload>

            <!-- <button @click="uploadAvatar">Change the Avatar</button> -->
          </h2>
        </div>
      </div>

      <div id="info">
        <div v-if="this.username === 'YOU NEED TO LOGIN FIRST'">
          <div>
            ?
            <span>Postings</span>
          </div>
          <div>
            ?
            <span>Following</span>
          </div>
          <div>
            ?
            <span>Followers</span>
          </div>
        </div>
        <div v-if="this.username !== 'YOU NEED TO LOGIN FIRST'">
          <div>
            {{this.discussions.length}}
            <span>Postings</span>
          </div>
          <div>
            {{this.booklistdirs.length}}
            <span>Booklists</span>
          </div>
          <div>
            {{this.followers}}
            <span>Followers</span>
          </div>
        </div>
      </div>
    </div>

    <div id="UserCardsProfile">
      <b-card no-body>
        <b-tabs card>
          <b-tab no-body title="Postings Of">
            <div id="Postings" v-for="(discussion, index) in discussions" :key="index">
              <div id="media">
                <ul class="list-unstyled">
                  <b-media tag="li">
                    <b-img slot="aside" v-if="discussion.file" :src="discussion.file" alt="" style="width: 200px; height: 160px" />


                    <h4 class="mt-0 mb-1" style="margin-left: 20px; font-weight: bold">{{discussion.title}}</h4>
                    <h6 style="margin-left: 20px; margin-top: 15px">Book Name: {{discussion.bookname}}</h6>
                    <h6 style="margin-left: 20px">Date: {{discussion.date.substring(0,10)}}</h6>
                    <h6 style="margin-top: 15px">
                      <i class="fa  fa-heart">({{discussion.upvotes}})</i>
                      <i class="fa fa-pencil" v-on:click="getDiscussionIDandContent(discussion._id)" style="cursor: pointer"></i>
                      <i class="fa fa-trash" @click="deleteposting(discussion._id)" style="cursor: pointer"></i>
                    </h6>


                  </b-media>


                </ul>
              </div>
            </div>
          </b-tab>

          <b-tab no-body title="Booklist">
            <div id="addmodal">
              <b-button v-b-modal.modalPut>Create New</b-button>
              <b-modal
                id="modalPut"
                ref="modal"
                title="A New Booklist"
                @ok="handleOk"
                @shown="clearName"
              >
                <form @submit.stop.prevent="handleSubmit">
                  <p>Booklist Name:</p>
                  <b-form-input
                    type="text"
                    placeholder="Enter booklist name"
                    v-model="booklistname"
                  />
                </form>
              </b-modal>
            </div>

            <div id="booklistdir">
              <ul class="list-unstyled" v-for="(booklistdir, index) in booklistdirs" :key="index">
                <b-media tag="li" class="my-4">
                  <h5 class="mt-0 mb-1" style="font-size: 20px">{{booklistdir.booklistname}}</h5>

                  <p class="mb-0">Created Date: {{booklistdir.date.substring(0,10)}}</p>

                  <i
                    class="fa fa-heart"
                    @click="upvotefor(booklistdir._id)"
                    style="font-size: 16px"
                  >({{booklistdir.upvotes}})</i>
                  <i class="fa fa-pencil" @click="getlistID(booklistdir._id)" style="font-size: 16px"></i>
                  <i class="fa fa-trash" @click="deletebooklist(booklistdir._id)" style="font-size: 16px"></i>
                </b-media>
              </ul>
            </div>
          </b-tab>

          <b-tab title="Post Collection">
            <div id="CollectedPostings" v-for="(collected, index) in collecteddis" :key="index">
              <div id="Collectedmedia">
                <ul class="list-unstyled">
                  <b-media tag="li">
                    <b-img slot="aside" v-if="collected.file" :src="collected.file" alt="" style="width: 200px; height: 160px" />

                    <h4 class="mt-0 mb-1" style="font-weight: bold; margin-left: 20px">{{collected.title}}</h4>
                    <h6 style="margin-left: 20px; margin-top: 10px">Book Name: {{collected.bookname}}</h6>
                    <h6 style="margin-left: 20px">Author: {{collected.author}}</h6>
                    <h6 style="margin-left: 20px">Collect Date: {{collected.date.substring(0,10)}}</h6>
                    <h6 style="margin-top: 10px">
                      <i class="fa fa-eye" v-on:click="getDiscussionIDandContent(collected.discussionid)" style="cursor: pointer"></i>
                      <i class="fa fa-trash" @click="deletecollected(collected._id)" style="cursor: pointer"></i>
                    </h6>

                  </b-media>


                </ul>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

    <h6
      style="color: rgba(255,255,255,0); font-size: 5pt; margin-bottom: 0px; margin-top: 163px; text-align: center"
    >-----Euphoria-----</h6>
  </div>
</template>

<script>
import firebase from "firebase";
import userservice from "@/services/userservice";
import discussionservice from "@/services/discussionservice";
import booklistdirservice from "@/services/booklistdirservice";
import collecteddiscussionservice from "@/services/collecteddiscussionservice";
import Subfooter from "./Subfooter";
import { baseUrl } from './utils/config.js'

export default {
  name: "UserPrefile",
  components: { Subfooter },
  data() {
    return {
      username: "YOU NEED TO LOGIN FIRST",
      useremail: "",
      userdisemail: "",
      content: "",
      discussions: [],
      booklistdirs: [],
      collecteddis: [],
      info: [],
      name: "",
      upvotes: "",
      signature: "",
      booklistname: "",
      followers: "",
      userid: "",
      headers: {
        'Content-type': "multipart/form-data"
      },
      avatar: ''
    };
  },
  computed: {
    userId() {
      return {
        id: this.userid
      }
    },

    avatarBaseUrl() {
      return baseUrl
    }
  },
  created() {
    this.showUserInfo();
    this.fetchUserDis();
    this.fetchUserBooklistdir();
    this.fetchCollected();
    this.getlistID();
    this.upvotefor();
  },
  methods: {

    beforeAvatarUpload(file) {
      let extension = this.extension(file.name);

      if (!extension) {
        this.$notify({
            title: "Upload failure",
            message: "Only upload files in png, jpg, JPEG and BMP formats",
            type: "warning"
        });
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$notify({
          message: "Upload file size should not exceed 1MB!",
          type: "warning"
        });
        return false;
      }
      return true;
    },

    /**
     * @descripton: upload error
     * @param {type}
     * @return:
     */
    uploadError() {
      this.$notify({
        title: "Upload failure",
        message: "Please Try Again",
        type: "error"
      });
    },

    uploadSuccess(data) {
      let vm = this;

      if(data.data) {
        this.avatar = data.data.avatar
        this.$store.commit("SET_USERINFO", data.data);

        vm.$notify({
          title: "Upload success",
          type: "success"
        });
      }


    },

    /**
     * @descripton: determine the file type
     * @param {String} fileName
     * @return:
     */
    extension(fileName) {
      let fileType = ["png", "jpg", "jpeg", "bmp"];
      let testmsg = fileName.substring(fileName.lastIndexOf(".") + 1);
      return fileType.find(item => item === testmsg);
    },

    showUserInfo: function() {
      var useremail = firebase.auth().currentUser.email;
      // console.log(useremail);
      userservice.fetchOneUser(useremail).then(response => {
        if (response) {
          console.log(response);
          this.info = response.data;
          this.username = this.info[0].username;
          this.email = this.info[0].email;
          this.signature = this.info[0].signature;
          this.followers = this.info[0].followers;
          this.userid = this.info[0]._id;
          this.avatar = this.info[0].avatar;

          console.log(this.userid);
        }
      });
    },
    fetchUserDis: function() {
      var useremail = firebase.auth().currentUser.email;
      discussionservice.fetchUserDiscussion(useremail).then(response => {
        this.discussions = response.data;
        console.log(this.discussions);
      });
    },

    getDiscussionIDandContent: function(Did) {
      console.log(Did);
      if (Did) {
        this.$router.push({
          name: "Posts",
          params: {
            id: Did
          }
        });
      }
    },

    deleteposting: function(id) {
      this.$swal({
        title: "Are you totaly sure?",
        text: "You can't Undo this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "OK Delete it",
        cancelButtonText: "Cancel",
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then(result => {
        console.log("SWAL Result : " + result.value);
        if (result.value === true) {
          discussionservice
            .deleteDiscussion(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data;
              console.log(this.message);
              this.fetchUserDis();
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal(
                "Deleted",
                "You successfully deleted this Posting " +
                  JSON.stringify(response.data, null, 5),
                "success"
              );
            })
            .catch(error => {
              this.$swal(
                "ERROR",
                "Something went wrong trying to Delete " + error,
                "error"
              );
              this.errors.push(error);
              console.log(error);
            });
        } else {
          console.log("SWAL Else Result : " + result.value);
          this.$swal("Cancelled", "Your Posting still Counts!", "info");
        }
      });
    },

    fetchUserBooklistdir: function() {
      var useremail = firebase.auth().currentUser.email;
      booklistdirservice.fetchUserDir(useremail).then(response => {
        this.booklistdirs = response.data;
        console.log(this.booklistdirs);
      });
    },

    fetchCollected: function() {
      var useremail = firebase.auth().currentUser.email;
      collecteddiscussionservice
        .fetchCollectedDiscussion(useremail)
        .then(response => {
          this.collecteddis = response.data;
          console.log(this.collecteddis);
        });
    },

    upvotefor: function(bid) {
      console.log(bid);
      booklistdirservice.upvoteforBookdir(bid).then(response => {
        console.log(response.data);
        this.fetchUserBooklistdir();
      });
    },

    deletebooklist: function(id) {
      this.$swal({
        title: "Are you totaly sure?",
        text: "You can't Undo this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "OK Delete it",
        cancelButtonText: "Cancel",
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then(result => {
        console.log("SWAL Result : " + result.value);
        if (result.value === true) {
          booklistdirservice
            .deleteBooklistdir(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data;
              console.log(this.message);
              this.fetchUserBooklistdir();
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal(
                "Deleted",
                "You successfully deleted this Booklist " +
                  JSON.stringify(response.data, null, 5),
                "success"
              );
            })
            .catch(error => {
              this.$swal(
                "ERROR",
                "Something went wrong trying to Delete " + error,
                "error"
              );
              this.errors.push(error);
              console.log(error);
            });
        } else {
          console.log("SWAL Else Result : " + result.value);
          this.$swal("Cancelled", "Your Booklist still Counts!", "info");
        }
      });
    },

    deletecollected: function(id) {
      this.$swal({
        title: "Are you totaly sure?",
        text: "You can't Undo this action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "OK Delete it",
        cancelButtonText: "Cancel",
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then(result => {
        console.log("SWAL Result : " + result.value);
        if (result.value === true) {
          collecteddiscussionservice
            .deleteCollectedDiscussion(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data;
              console.log(this.message);
              this.fetchCollected();
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal(
                "Deleted",
                "You successfully deleted this CollectedPost " +
                  JSON.stringify(response.data, null, 5),
                "success"
              );
            })
            .catch(error => {
              this.$swal(
                "ERROR",
                "Something went wrong trying to Delete " + error,
                "error"
              );
              this.errors.push(error);
              console.log(error);
            });
        } else {
          console.log("SWAL Else Result : " + result.value);
          this.$swal("Cancelled", "Your Collected still Counts!", "info");
        }
      });
    },

    clearName() {
      this.booklistname = "";
    },

    handleOk(evt) {
      evt.preventDefault();
      if (!this.booklistname) {
        alert("Please enter booklist name");
      } else {
        this.handleSubmit();
      }
    },

    handleSubmit() {
      this.addBooklist();
      this.clearName();
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    addBooklist: function() {
      if (firebase.auth().currentUser) {
        var useremail = firebase.auth().currentUser.email;
        console.log(useremail);
        userservice.fetchOneUser(useremail).then(response => {
          if (response) {
            this.info = response.data;
            console.log(this.info);
          }
        });

        var newbooklist = {
          booklistname: this.booklistname,
          username: this.info[0].username,
          email: this.info[0].email
        };
        booklistdirservice.addOneBooklist(newbooklist).then(response => {
          console.log(response.data);
          this.fetchUserBooklistdir();
        });
      }
    },

    getlistID: function(bid) {
      console.log(bid);
      if (bid) {
        this.$router.push({
          name: "Booklist",
          params: {
            id: bid
          }
        });
      }
    },

    ChangeAvatar: function(uid) {
      console.log(uid);
      if (uid) {
        this.$router.push({
          name: "Avatar",
          params: {
            id: uid
          }
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}

body {
  background: #eaeced;
  font-family: arial;
}

#userpage {
  background-image: url("https://hdwallsource.com/img/2014/9/blur-26347-27038-hd-wallpapers.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
}

#twitterwidget {
  width: 900px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 50px auto 0px;
  overflow: auto;
  -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
  -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
  box-shadow: 0 8px 40px -6px #a3a5a6;
}
#userprofile {
  padding: 30px;
  overflow: auto;
}

#userprofile div p {
  color: antiquewhite;
  font-size: 1em;
}

p style {
  color: black;
  font-size: 15pt;
}

#userprofile img {
  width: 150px;
  height: 150px;
  display: block;
  float: left;
  border-radius: 5px;
  overflow: auto;
}

h2 {
  color: antiquewhite;
  padding: 30px 40px;
  float: left;
  font-size: 2em;
  text-align: left;
}
h2 a {
  text-decoration: none;
  color: #fc4400;
  font-size: 16px;
  display: block;
  padding: 5px 0px 0px 0px;
}

#info div div {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-radius: 5px;
  float: left;
  padding: 5px 0px;
  width: 300px;
  text-align: center;
  font-size: 1.8em;
  color: white;
  font-weight: bold;
}
#info div:first-child {
  border-left: none;
}

#info div span {
  display: block;
  font-size: 0.4em !important;
  font-weight: normal !important;
  text-transform: uppercase;
  color: white;
}

h5 {
  overflow: auto;
  font-size: 20pt;
  color: black;
}

p {
  overflow: auto;
  font-size: 10pt;
  color: black;
}

#media div {
  float: right;
  color: #2a2c2d;
  padding: 10px 20px;
}

#Collectedmedia div {
  float: right;
  color: #2a2c2d;
  padding: 10px 20px;
}

#UserCardsProfile {
  width: 900px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  margin: 40px auto 0px;
  overflow: auto;
  -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
  -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
  box-shadow: 0 8px 40px -6px #a3a5a6;
}

#booklistdir {
  border-radius: 5px;
  width: 900px;
  margin: 40px auto 40px;
  overflow: auto;
  -webkit-box-shadow: 0 8px 40px -6px #a3a5a6;
  -moz-box-shadow: 0 8px 40px -6px #a3a5a6;
  box-shadow: 0 8px 40px -6px #a3a5a6;
}

#booklistdir i {
  color: black;
  padding: 10px 20px;
  cursor: pointer;
}

p6 {
  color: black;
  text-align: left;
}

h4 {
  text-align: left;
  font-size: 13pt;
}

h6 {
  text-align: left;
}

h6 i {
  padding: 5px 20px;
}

button {
  padding: 5px 20px;
  margin-top: 10px;
  float: right;
  margin-right: 10px;
}

#addmodal {
  color: black;
  float: right;
  margin-right: 40px;
  margin-top: 0px;
  margin-bottom: 20px;
}

#addmodal form p {
  margin-bottom: 0px;
  margin-top: 10px;
  float: left;
}

.upload-demo-btn {
  outline: none;
  height: 40px;
  margin-top: 15px;
  padding: 0 10px;
}
</style>
