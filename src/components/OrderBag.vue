<style scope>
.shopping-cart {
  padding: 0 40px;
  color: #333;
  background-color: rgb(228, 228, 228);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  text-align: left;
  padding: 40px 0 0 0;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shopping-cart {
  width: 100%;
}

.shopping-list {
  width: 60%;
  justify-content: flex-start;
}

.shopping-item {
  border-bottom: 1px solid #ccc;
  padding: 25px 0;
}

.book-cover {
  width: 100px;
  border: 1px solid #eee;
}
.book-name {
  width: 200px;
  text-align: left;
  color: #000;
}
.book-num {
  cursor: pointer;
}
.num {
  width: 50px;
  height: 30px;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  margin: 0 15px;
}
.total {
  color: rgb(113, 191, 255);
  font-weight: 500;
  height: 50px;
}

.total span {
  font-size: 26px;
}

.card-detail {
  display: flex;
  justify-content: flex-end;
  width: 40%;
}
.card-detail-wrapper {
  width: 400px;
  border: 1px solid #eee;
  margin-top: 40px;
  border-radius: 15px;
  padding: 15px 30px;
  background-color: #fff;
  text-align: left;
}

.card-title {
  color: #fff;
  text-align: left;
}
.dele {
    cursor: pointer;
}
.continue {
    cursor: pointer;
}

</style>

<template>
  <div class="shopping-cart">
    <div class="shopping-list">
      <h2 class="title">Shopping Cart</h2>
      <div class>
        <div
          class="shopping-item flex-between"
          v-for="(item,index) of shoppingCart"
          :key="item._id"
        >
          <img class="book-cover" :src="item.bookcover" alt>
          <div class="book-name">{{item.bookname}}</div>
          <div class="book-num flex-between">
            <div @click="setNum(item,'minus', index)">-</div>
            <div class="num">{{item.num}}</div>
            <div @click="setNum(item,'plus', index)">+</div>
          </div>
          <div class="price">{{item.price}}</div>
          <div class="dele" @click="dele(item)">x</div>
        </div>
      </div>
      <div class="total flex-between">
        <div class="continue" @click="continues"> <i class="fa fa-long-arrow-left" aria-hidden="true"></i>Continue shopping</div>
        <div v-if="shoppingCart.length > 0">
          Subtotal:
          <span>${{totalPrice}}</span>
        </div>
      </div>
    </div>
    <div class="card-detail">
      <div class="card-detail-wrapper">
        <h5>One time payment</h5>
        <br>
        <form action="/pay" id="payment-form">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your name"
              v-model="user.username"
              required
            >
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your address"
              v-model="user.address"
              required
            >
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your email"
              v-model="user.email"
              required
            >
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter your phone"
              v-model="user.phone"
              required
            >
          </div>
          <div class="form-group">
            <label>Credit Card Info</label>
            <input
              type="text"
              class="form-control"
              placeholder="XXXXXXXXXXXXXXXX"
              v-model="card.number"
              required
            >
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="CVC" v-model="card.cvc" required>
          </div>
          <div class="form-group">
            <label>Card Expiration Date</label>
            <input type="text" class="form-control" placeholder="MM/YY" v-model="card.exp" required>
          </div>
          <button
            class="btn btn-primary btn-block"
            @click.prevent="validate"
            :disabled="stripeCheck"
          >Submit</button>
        </form>

        <b-modal id="myModal">
          <p>Purchase Successfully! You can view it in the purchased order.</p>
        </b-modal>

        <div v-show="errors">
          <br>
          <ol class="text-danger">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ol>
        </div>
        <!-- <h2 class="card-title">Card Details</h2> -->
      </div>
    </div>
  </div>
</template>
<script>
import payservice from '@/services/payservice'
import shoppingcartservice from "@/services/shoppingcartservice";
import orderservice from '@/services/orderservice'
import userservice from "@/services/userservice";
import firebase from "firebase";

export default {
  data() {
    return {
      shoppingCart: "",
      user: {
        address: "",
        phone: "",
        email: "",
        username: ""
      },
      card: {
        number: "4242424242424242",
        cvc: "1234",
        exp: "12/2020",
        currency: "USD",
        name: ""
      },
      order: '',
      stripePublishableKey: 'pk_test_L1TsC7fE3BjKNMmTShcCiwEZ00OhZ1tFfU',
      stripeCheck: false,
      errors: ''
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    totalPrice() {
      let totalPrice = 0
      for(let i = 0; i < this.shoppingCart.length; i ++) {
        if(typeof this.shoppingCart[i].price === 'number') {
          totalPrice = totalPrice + this.shoppingCart[i].price * this.shoppingCart[i].num
        }
      }
      return totalPrice;
    }
  },
  mounted() {
    this.getShoppingList();
  },
  methods: {
    continues() {
        this.$router.replace('/books')
    },
    getUserInfo() {
      var useremail = firebase.auth().currentUser.email;
      userservice.fetchOneUser(useremail).then(response => {
        if (response) {
          this.currentUserInfo = response.data[0];
        }
      });
    },

    createOrder() {
      if(!this.shoppingCart) {
        return
      }
      let vm = this
      const { number, cvc, exp, currency, name } = this.card;
      const { username, address, phone, email } = this.user;
      const { _id } = this.userInfo;
      let data = {
        username: username,
        email: email,
        phone: phone,
        address: address,
        bookList: this.shoppingCart,
        userid: _id
      };
      orderservice
        .createOrder(data)
        .then(res => {
          if (res.data.data) {
            this.order = res.data.data;
            let arr = []
            for(let i in vm.shoppingCart) {
                arr.push(vm.shoppingCart[i]._id)
            }
            let data = {
                id: arr
            };
            shoppingcartservice
                .deleShopping(data)
                .then(result => {

                    vm.shoppingCart = []
                })
                .catch(err => {
                    console.log(err);
                });
          }
        })
        .catch(err => {
          alert(err);
        });
    },

    createToken() {
      this.stripeCheck = true;
      window.Stripe.setPublishableKey(this.stripePublishableKey);
      window.Stripe.createToken(this.card, (status, response) => {
        if (response.error) {
          this.stripeCheck = false;
          this.errors.push(response.error.message);
          // eslint-disable-next-line
          console.error(response);
        } else {
          this.stripeTokenHandler(response);
        }
      });
    },
    stripeTokenHandler: function(token) {
      payservice.pay(token).then(response => {
        if (response.error) {
          this.stripeCheck = false;
          this.errors.push(response.error.message);
          console.error(response);
        } else {
          alert("Pay Success")
          console.log(response.data);
        }
      });
    },
    validate() {
      this.errors = [];
      let valid = true;

      if (!this.card.number) {
        valid = false;
        this.errors.push("Card Number is required");
      }
      if (!this.card.cvc) {
        valid = false;
        this.errors.push("CVC is required");
      }
      if (!this.card.exp) {
        valid = false;
        this.errors.push("Expiration date is required");
      }

      if (!this.user.username) {
        valid = false;
        this.errors.push('UserName is required');
      }
      if (!this.user.email) {
        valid = false;
        this.errors.push('Email is required');
      }
      if (!this.user.phone) {
        valid = false;
        this.errors.push('Phone is required');
      }
      if (!this.user.address) {
        valid = false;
        this.errors.push('Address is required');
      }
      if (valid) {
        this.createToken();
        this.createOrder();
      } else {
        alert("Please input complete information.")
      }
    },

    getShoppingList() {
      let vm = this;
      shoppingcartservice
        .getShoppingList(this.userInfo._id)
        .then(res => {
          if (res.data.data) {
            vm.shoppingCart = res.data.data;
          }
          console.log(res);
        })
        .catch(err => {});
    },

    dele(item) {
        let vm = this
        let data = {
        id: [item._id]
        };
        shoppingcartservice
        .deleShopping(data)
        .then(res => {
            let arr = vm.shoppingCart.filter(data => {
                return data._id != item._id;
            });
            vm.shoppingCart = arr;
        })
        .catch(err => {
            console.log(err);
        });
    },

    setNum(data, type, index) {
      let vm = this;
      let shopping = data;

      if (type == "plus") {
        shopping.num = shopping.num + 1;
      } else if (type == "minus") {
        shopping.num = shopping.num - 1;
        if (shopping.num <= 0) {
          let data = {
            id: [shopping._id]
          };
          shoppingcartservice
            .deleShopping(data)
            .then(res => {
              let arr = vm.shoppingCart.filter(item => {
                return item._id != shopping._id;
              });
              vm.shoppingCart = arr;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>

<style scope>
</style>
