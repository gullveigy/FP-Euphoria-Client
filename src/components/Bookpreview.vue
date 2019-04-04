<template>
	<div>
		<h4>{{ msg }}</h4>
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

  h4 {
    margin-top: 40px;
    font-size: 37pt;
  }

  div {
    margin-left: auto;
    margin-right: auto;
  }

</style>
