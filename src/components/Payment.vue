<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <div class="row">
          <div class="col-sm-6">
            <div>
              <h5>You are buying:</h5>
              <ul>
								<li><img style="width: 127.99px; height: 170px; margin-top: 10px;" v-bind:src="book.imgUrl"></img></li>
                <li>Book Title: <em>{{book.title}}</em></li>
                <li>Price: <em>{{book.price}}</em></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <h5>One time payment</h5>
            <br>
            <form action="/pay" id="payment-form">
							 <div class="form-group">
							  <label>Name</label>
							  <input type="text"
							         class="form-control"
							         placeholder="Enter your name"
											 v-model="user.username"
							         required>
							</div>
							<div class="form-group">
							  <label>Address</label>
							  <input type="text"
							         class="form-control"
							         placeholder="Enter your address"
											 v-model="user.address"
							         required>
							</div>
							<div class="form-group">
							  <label>Email</label>
							  <input type="text"
							         class="form-control"
							         placeholder="Enter your email"
											 v-model="user.email"
							         required>
							</div>
								<div class="form-group">
							  <label>Phone</label>
							  <input type="text"
							         class="form-control"
							         placeholder="Enter your phone"
											 v-model="user.phone"
							         required>
							</div>
              <div class="form-group">
							<label>Credit Card Info</label>
							<input type="text"
										 class="form-control"
										 placeholder="XXXXXXXXXXXXXXXX"
										 v-model="card.number"
										 required>
						</div>
						<div class="form-group">
							<input type="text"
										 class="form-control"
										 placeholder="CVC"
										 v-model="card.cvc"
										 required>
						</div>
						<div class="form-group">
							<label>Card Expiration Date</label>
							<input type="text"
										 class="form-control"
										 placeholder="MM/YY"
										 v-model="card.exp"
										 required>
						</div>
            <button class="btn btn-primary btn-block"  @click.prevent="validate" :disabled="stripeCheck" >Submit</button>
            </form>
						<div v-show="errors">
							<br>
							<ol class="text-danger">
								<li v-for="(error, index) in errors" :key="index">
									{{ error }}
								</li>
							</ol>
						</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import payservice from '@/services/payservice'
import orderservice from '@/services/orderservice'
import userservice from "@/services/userservice";
import firebase from "firebase";

export default {
  props: [ 'book'],
  data() {
  return {
			user: {
				address:'',
				phone: '',
				email: '',
				username: ''
			},
			card: {
				number: '4242424242424242',
				cvc: '1234',
				exp: '12/2020',
				currency:'USD',
				name:''
			},
			errors: [],
			stripePublishableKey: 'pk_test_L1TsC7fE3BjKNMmTShcCiwEZ00OhZ1tFfU',
			stripeCheck: false,
			currentUserInfo: '',
			order: ''
		};
	},

	mounted() {
		this.getUserInfo()
	},

  methods: {
		getUserInfo() {
      var useremail = firebase.auth().currentUser.email;
      userservice.fetchOneUser(useremail).then(response => {
        if (response) {
					this.currentUserInfo = response.data[0]
					console.log( this.currentUserInfo)
        }
      });
    },

		createOrder() {
			const { authors, price, title, imgUrl } = this.book
			const { number, cvc, exp, currency, name } = this.card
			const { username,address, phone, email } = this.user
			const { _id } = this.currentUserInfo

			let bookList = [{
				authors: authors,
				price: price,
				bookname: title,
				bookcover: imgUrl,
				num: 1
			}]

			let data = {
				username: username,
				email: email,
				phone: phone,
				address: address,
				bookList: bookList,
				userid: _id
			}

			orderservice.createOrder(data)
			.then( res => {
				console.log( res );
				if(res.data.data) {
					this.order = res.data.data
					this.createToken();
				} else {
					console.log(res.data.errmsg);
					alert(res.data.message);
				}
			})
			.catch(err => {
				alert(res.data.message);
			})
		},

    createToken () {
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
    stripeTokenHandler: function (token) {
      payservice.pay(token)
        .then(response => {
          if (response.error) {
            this.stripeCheck = false;
            this.errors.push(response.error.message);
            console.error(response);
          } else {
            alert(response.data.message);
            console.log(response.data);
          }
        });
    },
		validate() {
				this.errors = [];
				let valid = true;

				if (!this.card.number) {
					valid = false;
					this.errors.push('Card Number is required');
				}
				if (!this.card.cvc) {
					valid = false;
					this.errors.push('CVC is required');
				}
				if (!this.card.exp) {
					valid = false;
					this.errors.push('Expiration date is required');
				}
				if (valid) {
					this.createOrder();
				}
		},
  },
  watch: {
    number () { this.update() },
    expiry () { this.update() },
    cvc () { this.update() }
  }
}
</script>

<style>
.credit-card-inputs.complete {
  border: 2px solid green;
}
</style>
