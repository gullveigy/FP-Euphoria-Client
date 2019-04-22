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
}
.header-right {
  width: 280px;
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
            <div class="header-right-item-price">PRICE</div>
            <div class="header-right-item">TOTAL</div>
          </div>
        </div>
        <div class="order-item flex-between" v-for="(item, index) of filterOrder" :key="index">
            <div class="flex-between">
              <div class="book-cover">
                <img :src="item.bookcover">
              </div>
              <div class="book-info">
                <div class="book-name">{{item.bookname}}</div>
                <div>{{item.authors}}</div>
                <div>Time of purchase: {{item.createtime}}</div>
                <div>Order Status: {{item.status == '1' ? "Processed" : "Untreated"}}</div>
              </div>
            </div>
            <div class="flex-between">
              <div class="right-info">${{item.price}}</div>
              <div class="right-info">${{item.price}}</div>
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
import { close } from 'fs';

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
    filterOrder() {
      return this.orderList.map((item) => {
        item.authors = item.authors.join(' ')
        item.createtime = item.createtime.substring(0,10)
        return item
      })
    },
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
                this.orderList = res.data.data;
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

