<template>
	<div id="booksearch">
		<h4>{{ msg }}</h4>
		 <div id='search' class="form-inline">
			 <input id='searchContent' type="text" class="form-control"/>&nbsp;
		     <button type="button" class="btn btn-primary" v-on:click="getBooks()">search</button>
		 </div>
    <ol class="row" style="margin-left: 290px">
      <li class="col-md-4" style="width:130px; background: rgba(225,225,230,0.9); border-radius:5px; color: black; margin-top: 20px; margin-right: 25px" v-for="(item, index) in list">
        <router-link  target="_blank"  :to="{name:'Bookpreview',path:'bookPreview', query:{bookId:list[index].id}}">
          <img style="width: 127.99px; height: 170px; margin-top: 10px;" v-bind:src="item.volumeInfo.imageLinks.thumbnail"></img>
        </router-link>

        <ul class="search-result--info">
          <li class="search-result--title" style="font-weight: bold">{{ item.volumeInfo.title }}</li>

          <li v-if="item.volumeInfo.authors" class="search-result--authors">
            by {{ item.volumeInfo.authors }}
          </li>

          <li v-if="item.volumeInfo.publishedDate" class="search-result--published">
            <span>Published </span> {{ item.volumeInfo.publishedDate }}
          </li>
        </ul>
      </li>
    </ol>
    <h6>Euphoria</h6>
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



  h6 {
    margin-bottom: 0px;
    margin-top: 10px;
    color: black;
  }





</style>
