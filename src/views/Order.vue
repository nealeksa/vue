<template>
  <div class="order">
	<div class="order__wrapper">
		<h1 class="order__title">Страница заказа</h1>
	</div>

	<div class="order__item" v-for="(product, index) in orders" :key="index">
		<div class="" v-if="proId == product.id">
			<form class="order__form">
				<input type="text" class="order__input order__input--firstName" v-model="product.firstName">
				<input type="text" class="order__input order__input--lastName" v-model="product.lastName">
				<input type="text" class="order__input order__input--phone" v-model="product.phone">
				<span v-for="(item, index) in product.products" :key="index">
					<input class="order__input" type="text" v-model='item.productName'>
				</span>
				<input type="text" class="order__input" :value="currentCost(product.products)">
				<input type="text" class="order__input" v-model="statuses[product.id].status">
				<button @click.prevent="sendData">Сохранить</button>
			</form>
		</div>
	</div>

	
	<p v-if="errors.length">
		<b>Пожалуйста исправьте указанные ошибки:</b>
		<ul>
			<li v-for="(error, index) in errors" :key="index">{{ error }}</li>
		</ul>
	</p>

  </div>
</template>

<script>

import Orders from "../testData/orders.js"
import Products from '../testData/products.js'
import Statuses from '../testData/statuses.js'


export default {
  name: 'order',
  components: {
    
  },
  data () {
	return {
		orders: [],
		products: [],
		statuses: [],
		errors: [],
		proId: null
	}
  },
  created () {
	this.orders = Orders;
	this.products = Products;
	this.statuses = Statuses;
	this.proId = this.$route.params.Pid

	/*
	axios({
      baseURL: 'someurl'
      }
    }).then((res) => {
      this.orders = res.data
      
    }
    ) */
  },
	methods: {
		currentStatus(id) {
			this.statuses.forEach((status, index)=>{
				if (status.id == id){
					return index;
				}
			})
		},
		currentCost(products) {
			let value = 0;
			products.forEach((product) =>{
				for (let i = 0; i < this.products.length; i++){
					if (product.productName == this.products[i].name){
						value += parseInt(this.products[i].cost)
					}	
				}
				
			})
			return value;
		},
		checkForm (e) {
			let ind = null;
			this.orders.forEach((product, index) =>{
				if (product.id == this.proId) {
					ind = index; 
				}
			});

			if (this.orders[ind].firstName.trim()
					&& this.orders[ind].lastName.trim()
					&& this.orders[ind].phone.trim()){
				return true;
			}



			this.errors = [];

			if(!this.orders[ind].firstName.trim()){
				this.errors.push('Укажите имя');
				this.alertField(document.getElementsByClassName('order__input--firstName')[0])

			}

			if(!this.orders[ind].lastName.trim()){
				this.errors.push('Укажите фамилию');
				this.alertField(document.getElementsByClassName('order__input--lastName')[1])
			}

			if(!this.orders[ind].phone.trim()){
				this.errors.push('Укажите номер');
				this.alertField(document.getElementsByClassName('order__input--phone')[0])
			}

			e.preventDefault();
			return false;
		},
		alertField (elem) {
			elem.style.border = '1px solid red';
			setTimeout(()=>{
				elem.style.border= '1px solid black';
			}, 3000)

		},
		sendData(e){

			if (this.checkForm(e)) {

				let ind = null;
				for (let i=0; i<this.orders.length; i++){
					if (this.proId == this.orders[i].id) {
						ind = i;
					}
				}


				this.axios.post('/someurl', this.orders[ind])
				.then(function (response) {
					window.console.log(response);
				})
				.catch(function (error) {
					window.console.log(error);
				});
			}
		}
	}

}
</script>

<style>

	.order__form{
		display: flex;
		flex-direction: column;
		width: 500px;
		margin: 0 auto;
	}

	.order__form span{
		width: 100%;
	}

	.order__input{
		width: 100%;
	}

	
</style>