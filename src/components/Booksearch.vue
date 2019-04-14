<template>
	<div id="booksearch">
    <img src="../assets/booksearch.png" alt="description here" style="margin-top: 130px"/>
		<h4 style="color: gainsboro; margin-top: 0px; margin-left: auto; margin-right: auto">{{ msg }}</h4>
		 <div id='search' class="form-inline" style="margin-top: 10px; margin-left: 620px">
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
          <b-button variant="outline-dark" style="width: 82.88px; margin-top: 10px; margin-bottom: 10px">Booklist</b-button>
          <router-link  target="_blank"  :to="{name:'Bookpreview',path:'bookPreview', query:{bookId:list[index].id}}">
          <b-button variant="outline-dark" style="margin-top: 10px; margin-bottom: 10px">Preview</b-button>
          </router-link>
          <b-button variant="outline-dark"  @click="openPayDialog(index)" style="width: 82.88px; margin-top: 10px; margin-bottom: 10px">Buy</b-button>
        </ul>
      </li>
			<el-dialog :visible.sync="dialogFormVisible"  id="pay-dialog" center>
			  <payment ref="payment" :book='book'></payment>
			</el-dialog>
    </ol>
    <h6 style="color: white; margin-top: 400px">---Euphoria---</h6>
	</div>
</template>


<script>
import payment from '@/components/Payment.vue';
export default {
  name: 'Booksearch',
	components: {payment},
  data () {
    return {
      msg: 'Search Books Here',
      dialogFormVisible: false,
			book:{
				title:'',
				price:'',
				imgUrl:''
			},
	    list:[]
    }
  },
 methods:{
	 openPayDialog(index){
		 var title = this.list[index].volumeInfo.title;
		 var imgUrl = 	this.list[index].volumeInfo.imageLinks.thumbnail;
		 var price =  "No for sale!";
		 if('FOR_SALE' == this.list[index].saleInfo.saleability){
		 			 price = this.list[index].saleInfo.listPrice.amount + ' ' +this.list[index].saleInfo.listPrice.currencyCode;
		 }
		 this.book = {title:title,
				price:price,
				imgUrl:imgUrl
			};
		 this.dialogFormVisible = true;
	 },
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

  #booksearch {
    background-image: url("../assets/whale16.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    z-index: 2;
    color: #fff;
  }

  #booksearch:before {
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
