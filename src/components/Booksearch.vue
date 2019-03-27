<template>
	<div>
		<h4>{{ msg }}</h4>
		 <div id='search' class="form-inline">
			 <input id='searchContent' type="text" class="form-control"/>&nbsp;
		     <button type="button" class="btn btn-primary" v-on:click="getBooks()">search</button>
		 </div>
		 <div style="height: 500px" class="text-center form-inline">
				<div v-for="(item, index) in list" class="content">
				   <router-link  target="_blank"  :to="{name:'Bookpreview',path:'bookPreview', query:{bookId:list[index].id}}">
						 <img style="width: 127.99px; height: 170px" v-bind:src="item.volumeInfo.imageLinks.thumbnail"></img>
					 </router-link>
				</div>
		 </div>
	</div>
</template>

<script>
export default {
  name: 'Booksearch',
  data () {
    return {
      msg: 'Search Books Here',
	  list:[]
    }
  },
 methods:{
   getBooks(){
	   var searchContent = $("#searchContent").val();
	   if(searchContent == ''){
		   alert('Pls enter book info!');
		   return;
	   }
	   var api = "https://www.googleapis.com/books/v1/volumes?q="+searchContent;
	   console.log(api);
	   this.$http.get(api).then(function (response) {
		 var books = JSON.parse(response.body);
		 console.log(books);
		 this.list = books.items;
	   },function (err) {
		 console.log(err);
	   })
   }
 },
}
</script>

<style>
	.content{
		margin :5px;
	}

  #search.form-inline {
    margin-left: 600px;
    margin-top: 40px;
  }

  h4 {
    margin-top: 53px;
    font-size: 30pt;
  }
</style>
