<template>
	<div id="booksearch">
    <img src="../assets/booksearch.png" alt="description here" style="margin-top: 130px"/>
		<h4 style="color: darkslategray; margin-top: 0px; margin-left: auto; margin-right: auto">{{ msg }}</h4>
		 <div id='search' class="form-inline" style="margin-top: 10px; margin-left: 620px">
			 <input id='searchContent' type="text" class="form-control"/>&nbsp;
		   <button type="button" class="btn btn-primary" v-on:click="getBooks()">search</button>
		 </div>
    <ol class="row" style="margin-left: 290px">
      <li class="col-md-4" 
        style="width:130px; background: rgba(225,225,230,0.9); border-radius:5px; color: black; margin-top: 20px; margin-right: 25px" 
        v-for="(item, index) in list" 
        :key="index"
      >
        <router-link  target="_blank"  :to="{name:'Bookpreview',path:'bookPreview', query:{bookId:list[index].id}}">
          <img style="width: 127.99px; height: 170px; margin-top: 10px;" v-if="item.volumeInfo.imageLinks" v-bind:src="item.volumeInfo.imageLinks.thumbnail">
        </router-link>
        <ul class="search-result--info">
          <li class="search-result--title" style="font-weight: bold">{{ item.volumeInfo.title }}</li>

          <li v-if="item.volumeInfo.authors" class="search-result--authors">
            by {{ item.volumeInfo.authors }}
          </li>
          <b-button 
            variant="outline-dark" 
            style="width: 165px; margin-top: 10px; margin-bottom: 10px" 
            @click="openBooklistDialog(index)">Booklist</b-button>
          <router-link  target="_blank"  :to="{name:'Bookpreview',path:'bookPreview', query:{bookId:list[index].id}}">
            <b-button variant="outline-dark" style="width: 165px; margin-top: 10px; margin-bottom: 10px">Preview</b-button>
          </router-link>
          <b-button variant="outline-dark"  @click="addShoppingCar(index)" style="width: 165px; margin-top: 10px; margin-bottom: 10px">Add ShoppingCart</b-button>
          <b-button variant="outline-dark"  @click="openPayDialog(index)" style="width: 165px; margin-top: 10px; margin-bottom: 10px">Buy</b-button>
        </ul>
      </li>
			<el-dialog :visible.sync="dialogFormVisible"  id="pay-dialog" center>
			  <payment ref="payment" :book='book'></payment>
			</el-dialog>
      <el-dialog :visible.sync="BdialogFormVisible"  id="booklist-dialog" center>
        <AddBooklist ref="AddBooklist" :book='book'></AddBooklist>
      </el-dialog>
    </ol>
    <h6 style="color: white; margin-top: 400px">---Euphoria---</h6>
	</div>
</template>


<script>
import payment from '@/components/Payment.vue';
import AddBooklist from '@/components/AddBooklist.vue';
import shoppingcartservice from "@/services/shoppingcartservice";
export default {
  name: 'Booksearch',
	components: {payment,AddBooklist},
  data () {
    return {
      msg: 'Search Books Here',
      dialogFormVisible: false,
      BdialogFormVisible: false,
			book:{
				title:'',
				price:'',
				imgUrl:'',
        author:''
			},
	    list:[]
    }
  },

  computed: {
    userInfo() {
        return this.$store.state.userInfo
    },
  },
 methods:{
    openPayDialog(index){
      if(!this.userInfo) {
        this.$router.replace('login')
        return 
      }
      var title = this.list[index].volumeInfo.title;
      var imgUrl = 	this.list[index].volumeInfo.imageLinks.thumbnail;
      var price =  "No for sale!";
      if('FOR_SALE' == this.list[index].saleInfo.saleability){
            price = this.list[index].saleInfo.listPrice.amount + ' ' +this.list[index].saleInfo.listPrice.currencyCode;
      }
      this.book = {
          title:title,
          price:price,
          imgUrl:imgUrl,
          authors: this.list[index].volumeInfo.authors,
      };
      this.dialogFormVisible = true;
    },

    addShoppingCar( index ) {
      console.log( index )
      if(!this.userInfo) {
        this.$router.replace('login')
        return 
      }
      let data = {
        bookname: this.list[index].volumeInfo.title,
        bookcover: this.list[index].volumeInfo.imageLinks.thumbnail,
        authors: this.list[index].volumeInfo.authors,
        price: 'No for sale!',
        userid: this.userInfo._id
      }

      shoppingcartservice.addShppping(data)
        .then( res => {
          console.log(res);
          if( res.data.data ) {
            this.$message({
              message: 'Shopping cart has been added.',
              type: 'success'
            });
          }
        })
        .catch( err => {
          console.log(err)
        })

    },

    openBooklistDialog(index) {
      var title = this.list[index].volumeInfo.title;
      var imgUrl = 	this.list[index].volumeInfo.imageLinks.thumbnail;
      var author = this.list[index].volumeInfo.authors;
      var price =  "No for sale!";
      if('FOR_SALE' == this.list[index].saleInfo.saleability){
        price = this.list[index].saleInfo.listPrice.amount + ' ' +this.list[index].saleInfo.listPrice.currencyCode;
      }
      this.book = {
        title:title,
        author:author,
        imgUrl:imgUrl,
      };
      this.BdialogFormVisible = true;
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

  li {
    list-style: none;
  }
  .search-result--info {
    padding: 0;
  }
</style>
