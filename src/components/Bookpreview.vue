<template>
	<div id="bookpreview">
    <img src="../assets/bookpreview.png" alt="description here" style="margin-top: 45px"/>
		<h4 style="color: gainsboro; margin-top: 5px; margin-bottom: 55px; margin-top: 0px">{{ msg }}</h4>
		<div><img v-if="loading" src="../assets/loading1.gif"></div>
		<div id="viewerCanvas" style="width: 900px; height: 750px; margin-left:auto; margin-right:auto" ></div>
	</div>
</template>
<script>
export default {
  name: 'Bookpreview',
  data () {
    return {
      msg: 'Book Preview',
			loading: true
    }
  },
  methods:{
		getBookPreview(){
				var bookId = this.$route.query.bookId;
				google.books.load();
				google.books.setOnLoadCallback(this.initialize());

		},
		initialize() {
			let vm = this
			var bookId = this.$route.query.bookId;
			google.books.load();
			setTimeout(() => {
				console.log("init..." +bookId);
				var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
				viewer.load(bookId);
				this.loading = false;
			}, 6000)
		},
  },
  created(){
		google.books.load();
		google.books.setOnLoadCallback(this.initialize());
  }
};
</script>

<style>

  #bookpreview {
    background-image: url("../assets/whale16.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    z-index: 2;
    color: #fff;
  }

  #bookpreview:before {
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

  h4 {
    margin-top: 40px;
    font-size: 37pt;
  }

  div {
    margin-left: auto;
    margin-right: auto;
  }

</style>
