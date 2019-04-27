<style scoped>
.order-page {
  color: #555;
  padding: 30px;
  background-color: rgba(238, 238, 238, 0.72);
}

h2 {
  color: #333;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-item {
  border-bottom: 1px solid #ccc;
  padding: 25px 0;
}

.book-cover img {
  width: 100px;
  height: 160px;
  border: 1px solid #ddd;
}

.book-info {
  height: 160px;
  justify-content: flex-start;
  margin-left: 100px;
  text-align: left;
}

.right-info {
  width: 140px;
  height: 160px;
  text-align: right;
  color: #555;
  font-weight: 500;

}
.order-list-header {
  border-top: 2px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 30px;
  height: 50px;
  padding: 0 2.5%;
}
.header-right {
  width: 420px;
}
.header-right-item {
  width: 140px;
  text-align: right;
}
.header-right-item-price {
  width: 140px;
  text-align: center;
}

.book-info {
  font-size: 16px;
}
.book-name {
  font-size: 18px;
  color: #000;
  font-weight: 500;
}

.order-book-list {
  padding: 15px 0;
  width: 95%;
  margin: 0 auto;
}

.quantity {
  text-align: center;
}

</style>

<template>
  <div class="order-page">
    <div v-if="orderList.length <= 0">
        <h2 v-if="!userInfo">YOU NEED TO LOGIN FIRST</h2>
        The order list is empty
    </div>
    <div v-else>
      <div class="pagination flex-between">
        <div class="count-info flex-between">
          <h2>Books Purchased</h2>
        </div>
      </div>

      <div class="order-list">
        <div class="order-list-header flex-between">
          <div>PRODUCT</div>
          <div class="header-right flex-between">
            <div class="header-right-item-price">Quantity</div>
            <div class="header-right-item-price">PRICE</div>
            <div class="header-right-item">TOTAL</div>
          </div>
        </div>
        <div class="order-item" v-for="(item, index) of orderList" :key="index">
            <div class="order-book-list flex-between" v-for="(book, ind) of item.bookList" :key="ind">
              <div class="flex-between">
                <div class="book-cover">
                  <img :src="book.bookcover">
                </div>
                <div class="book-info">
                  <div class="book-name">{{book.bookname}}</div>
                  <div>{{book.authors}}</div>
                  <div>{{item.createtime}}</div>
                  <div>Status: {{item.status == '1' ? "Processed" : "Untreated"}}</div>
                </div>
              </div>
              <div class="flex-between">
                <div class="right-info quantity">{{book.num}}</div>
                <div class="right-info">${{book.price}}</div>
                <div class="right-info">
                  ${{ typeof book.price === "number" ? book.price * 2 : book.price}}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderservice from "@/services/orderservice";
import firebase from "firebase";
import userservice from "@/services/userservice";

export default {
  name: "OrderManage",
  data() {
    return {
      orderList: [],
      currentPage: 1,
      pageSize: 100000,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    totalCount(val) {
      this.totalPage = Math.ceil(val / this.pageSize);
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {

    getOrderList() {
        this.loading = true
        orderservice.orderList(this.pageSize, this.currentPage, this.userInfo._id).then(res => {
            if (res.data.data) {
                let arr = res.data.data
                for( let i in arr ) {
                  let n_arr = arr[i].bookList
                  for(let j in n_arr) {
                    n_arr[j].authors = n_arr[j].authors.join(', ')
                  }
                  arr[i].createtime = arr[i].createtime.substring(0,10)
                }
                console.log(arr);
                this.orderList = arr
                this.totalCount = res.data.totalCount;
            }
            this.loading = false
        })
        .catch( () => {
            this.loading = false
        })
    }
  }
};
</script>

