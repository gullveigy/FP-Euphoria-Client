<style scoped>
.order-page {
  color: #555;
  padding: 30px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  cursor: pointer;
}

.count-info input {
  width: 120px;
  margin-right: 10px;
  border: 1px solid #eee;
  height: 30px;
  outline: none;
}

.target-page {
  margin-right: 30px;
}
.target-page input {
  width: 50px;
  margin-right: 10px;
  text-align: center;
  outline: none;
  height: 30px;
  border: 1px solid #eee;
}
.pagination-item {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #eee;
  margin: 0 5px;
  border-radius: 3px;
}

.pagination-item:hover {
  background-color: #eee;
}

.order-table {
  margin-top: 30px;
  width: 100%;
}

.status-box {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin: 0 auto;
  cursor: pointer;
}

.status-finish {
  border: 1px solid rgb(90, 156, 248);
  background-color: rgb(90, 156, 248);
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  text-align: center;
}

.detail-btn {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  color: #555;
  cursor: pointer;
  box-shadow: 2px 0 7px 2px #eee;
  border: 1px solid #eee;
  margin: 5px;
}
.detail-btn:hover {
  box-shadow: 0px 0 3px 2px rgba(90, 156, 248, 0.5);
  color: rgb(90, 156, 248);
}

.information {
  position: relative;
}

.bookcover {
  position: absolute;
  right: 10px;
  top: 0px;
  border: 1px solid #eee;
  width: 120px;
}

.information-item {
  display: flex;
  font-size: 16px;
  margin: 10px auto;
}

.information-item div:nth-child(1) {
  width: 140px;
  text-align: left;
  color: #333;
  font-weight: bold;
  font-size: 18px;
}
.information-item div:nth-child(2) {
  width: 270px;
  text-align: left;
  border: 1px solid #eee;
  padding: 5px 10px;
}
.book-cover {
  border: 1px solid #eee;
  display: block;
  margin: 0 auto;
  width: 70px;
}
.order-detail {
  text-align: left;
}
.order-detail-item {
  width: 100%;
  height: 100%;
}

.detail-image {
  width: 150px;
  display: block;
  margin: 0 auto;
}
.detail-name {
  color: #000;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
}
.detail-box {
  margin-top: 15px;
}
.next-icon {
  margin: 0 auto;
  text-align: center;
  font-size: 30px;
}
.top-icon {
  margin-bottom: 20px;
}
.n-box {
  overflow: hidden;
  position: relative;
}
.order-detail-wrapper {
  position: absolute;
  overflow: hidden;
  transition: all 0.5s;
}
.detail-authors {
  margin-top: 15px;
  color: #333;
}

.n-dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-content: center;
  justify-content: center;

}

.order-detail-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  min-height: 450px;
  padding: 20px;
}

</style>

<template>
  <div class="order-page">
    <div class="pagination flex-between">
      <div class="count-info flex-between">
        <input type="text" v-model="keyword" placeholder="select items">
        <div>{{totalCount}} order found</div>
      </div>

      <div class="flex-between">
        <div class="target-page flex-between">
          <input type="number" v-model="userInputPageNum" :placeholder="currentPage">
          <div class @click="goPage">per page</div>
        </div>
        <div class="flex-between">
          <div class="pagination-item" @click="goPage('pre')">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="pagination-item">{{currentPage}}</div>
          <div>of {{totalPage}}</div>
          <div class="pagination-item" @click="goPage('next')">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="order-list">
      <el-table
        v-loading="loading"
        :header-cell-style="{background:'rgb(80,74,68)',color:'#fff'}"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)"
        class="order-table"
        stripe
        :data="orderList"
        :default-sort="{prop: 'createtime', order: 'descending'}"
        border
      >
        <el-table-column prop="status" label width="70" :render-header="renderHeader" fixed="left">
          <template slot-scope="scope">
            <div
              class="status-box status-finish"
              @click="upDateStatus(scope.$index, 0)"
              v-if="scope.row.status == 1"
            >
              <i class="el-icon-check"></i>
            </div>
            <div class="status-box" @click="upDateStatus(scope.$index, 1)" v-else></div>
          </template>
        </el-table-column>
        <el-table-column prop="bookList.length" label="Quantity" width="90"></el-table-column>
        <el-table-column prop="orderid" label="Order Id" width="160"></el-table-column>
        <el-table-column prop="status" label="Status" width="120">
          <template slot-scope="scope">
            <div>{{scope.row.status == '1' ? "Processed" : "Untreated"}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="bookList[0].bookname" label="Book Name" width="160"></el-table-column>
        <el-table-column prop="bookcover" label="Bookcover" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.bookcover" class="book-cover">
          </template>
        </el-table-column>
        <el-table-column prop="bookList[0].authors" label="Authors" width="120"></el-table-column>
        <el-table-column prop="bookList[0].price" label="Price" width="120"></el-table-column>
        <el-table-column prop="createtime" resizable label="Modiffied" width="120"></el-table-column>
        <el-table-column prop="username" label="Name of buyer" width="160"></el-table-column>
        <el-table-column prop="address" label="Buyer address" width="200"></el-table-column>
        <el-table-column prop="email" label="Buyer e-mail" width="140"></el-table-column>
        <el-table-column prop="phone" label="Phone" width="120"></el-table-column>
        <el-table-column label="Action" width="120" fixed="right">
          <template slot-scope="scope">
            <div
              class="detail-btn"
              @click="deleteRow(scope.$index, orderList)"
              type="params"
              size="small"
            >Detail</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="n-dialog" v-if="dialogVisible" @click.self="dialogVisible = false; bookIndex = 1">
      <div class="order-detail-container">
        <div class="next-icon top-icon" @click="bookIndex = bookIndex - 1" v-if="bookIndex > 0">
          <i class="fa fa-angle-double-up" aria-hidden="true"></i>
        </div>
        <div class="n-box">
            <img class="detail-image" :src="currentOrder.bookList[bookIndex].bookcover" alt>
            <div class="detail-name">{{currentOrder.bookList[bookIndex].bookname}}</div>
            <div class="detail-box">
              <div>Quantity: {{currentOrder.bookList[bookIndex].num}}</div>
              <div>Cost: {{currentOrder.bookList[bookIndex].price}}</div>
              <div>Status: {{currentOrder.status == '1' ? "Processed" : "Untreated"}}</div>
            </div>
            <div class="detail-authors">
              <span v-for="(author, index) of currentOrder.bookList[bookIndex].authors" :key="index">{{author}}</span>
            </div>
        </div>
        <div
          class="next-icon"
          @click="setBookIndex"
          v-if="currentOrder.bookList && currentOrder.bookList.length - 1 > bookIndex"
        >
          <i class="fa fa-angle-double-down"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderservice from "@/services/orderservice";
import firebase from "firebase";
import userservice from "@/services/userservice";
import { close } from "fs";

export default {
  name: "OrderManage",
  data() {
    return {
      orderList: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
      currentOrder: "",
      dialogVisible: false,
      userInputPageNum: "",
      loading: false,
      currentUserInfo: "",
      keyword: "",
      bookIndex: 0
    };
  },
  watch: {
    totalCount(val) {
      this.totalPage = Math.ceil(val / this.pageSize);
    },
    keyword(val) {
      this.fuzzySearch(val);
      if ((val = "")) {
        this.getOrderList();
      }
    },
    dialogVisible(val) {
      if (!val) {
        this.bookIndex = 0;
      }
    }
  },

  mounted() {
    this.getUserInfo();
  },
  methods: {
    setBookIndex() {
      if (this.bookIndex < this.currentOrder.bookList.length - 1) {
        this.bookIndex = this.bookIndex + 1;
      }
    },

    getAuthors(data) {
      console.log(data, typeof data);
      return data[0].bookname;
    },

    getUserInfo() {
      let vm = this;
      if (!firebase.auth().currentUser) {
        this.$message("YOU NEED TO LOGIN FIRST");
        return;
      }
      let useremail = firebase.auth().currentUser.email;
      userservice.fetchOneUser(useremail).then(response => {
        if (response) {
          this.currentUserInfo = response.data[0];
          vm.getOrderList();
        }
      });
    },

    goPage(page) {
      if (page == "pre") {
        if (this.currentPage <= 1) {
          this.$message("It's page one.");
          return;
        } else {
          this.currentPage = this.currentPage - 1;
          if (this.keyword.length > 0) {
            this.fuzzySearch();
          } else {
            this.getOrderList();
          }
        }
      } else if (page == "next") {
        if (this.currentPage >= this.totalPage) {
          this.$message("It's the last page.");
          return;
        } else {
          this.currentPage = this.currentPage + 1;
          if (this.keyword.length > 0) {
            this.fuzzySearch();
          } else {
            this.getOrderList();
          }
        }
      } else {
        if (
          1 <= this.userInputPageNum &&
          this.userInputPageNum <= this.totalPage
        ) {
          this.currentPage = this.userInputPageNum;
          if (this.keyword.length > 0) {
            this.fuzzySearch();
          } else {
            this.getOrderList();
          }
          this.userInputPageNum = "";
        } else {
          alert("Invalid page number");
        }
      }
    },

    deleteRow(index, rows) {
      this.currentOrder = rows[index];
      this.dialogVisible = true;
    },

    upDateStatus(index, status) {
      let data = {
        order_id: this.orderList[index]._id,
        status: status
      };

      orderservice.setOrderStatus(data).then(res => {
        console.log(res);
      });
      this.$set(this.orderList[index], "status", status);
    },

    getOrderList() {
      this.loading = true;

      orderservice
        .orderList(this.pageSize, this.currentPage)
        .then(res => {
          if (res.data.data) {
            let arr = res.data.data;
            for (let i in arr) {
              arr[i].bookcover = arr[i].bookList[0] ? arr[i].bookList[0].bookcover : "";
            }
            this.orderList = arr;
            console.log('arr', this.orderList);
            this.totalCount = res.data.totalCount;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          alert("qwe")
          this.loading = false;
        });
    },

    fuzzySearch(keyword) {
      this.loading = true;

      orderservice
        .ordersearch(this.pageSize, 1, keyword)
        .then(res => {
          if (res.data.data) {
            let arr = res.data.data;
            for (let i in arr) {
              arr[i].bookcover = arr[i].bookList[0] ? arr[i].bookList[0].bookcover : "";
            }
            this.orderList = arr;
            this.totalCount = res.data.totalCount;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    renderHeader(h, { column }) {
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-caret-bottom",
          style: "color:#fff;margin-left:5px;"
        })
      ]);
    }
  }
};
</script>

