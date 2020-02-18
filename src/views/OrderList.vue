<template>
  <div class="order">
	<div class="order__wrapper">
		<h1 class="order__title">Страница списка заказов</h1>
		<table border="1" width="100%" cellpadding="5">
			<tr>
				<th class="sort" @click="sortById()">ID</th>
				<th class="sort" @click="sortByName()">Имя и Фамилия</th>
				<th class="sort" @click="sortByPhone()">Номер телефона</th>
				<th class="sort" @click="sortByCost()">Стоимость заказа</th>
				<th class="sort" @click="sortByProduct()">Товары заказа</th>
				<th class="sort" @click="sortByStatus()"> Статуc заказа</th>
				<th></th>	
			</tr>
			<tr v-for="(order, index) in list" :key="index">
				<th>{{order.id}}</th>
				<th>{{fullName(order)}}</th>
				<th>{{order.phone}}</th>
				<th>
					{{orderCost(order)}}
				</th>
				<th>
					<span v-for="(product, index) in order.products" :key="index">
						{{product.productName}}
					</span>
				</th>
				<th>
					{{orderStatus(order)}}
				</th>
				<th><button @click="goToDetails(order.id)">Редактировать</button></th>
			</tr>
		</table>
		<br>
		<div class="search">
			<h3 class="search__title">поиск</h3>
			<input class='search' type="text" v-model="inputStr" @keyup="sortArray">
		</div>
		
	</div>	
  </div>
</template>

<script>

import Orders from '../testData/orders.js'
import Products from '../testData/products.js'
import Statuses from '../testData/statuses.js'

export default {
  name: 'OrderList',
  components: {
    
  },
  data () {
	return {
		name: 'test',
		orders: [],
		products: [],
		statuses: [],
		inputStr: '',
		list: []
	}
  },
  created () {
	this.orders = Orders;
	this.products = Products;
	this.statuses = Statuses;
	this.list = this.orders;

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
	fullName(order) {
		return order.firstName.toUpperCase() + ' ' + order.lastName.toUpperCase();
	},
	orderCost(order){
		let value = 0;
		order.products.forEach((product) => {
			for ( let i = 0; i < this.products.length; i++){

				if ( product.productName == this.products[i].name){
					value += parseInt(this.products[i].cost);
				}
			}
		})
		return value;
	},
	orderStatus(order){

		for (let i =0; i < this.statuses.length; i++){
			if (this.statuses[i].id == order.id) {
				return this.statuses[i].status;
			}
		}
		return false;

	},
	goToDetails (proId) {
		this.$router.push({name:'order', params:{Pid:proId}})
	},
	sortById(){
		this.orders = this.orders.sort((a, b) =>{
			if(a.id > b.id) {
				return 1;
			}
			if(a.id < b.id) {
				return -1;
			}
			return 0;
		})
	},
	sortByName (){
		this.orders = this.orders.sort(function (a, b) {
			if (a.firstName > b.firstName) {
				return 1;
			}

			if (a.firstName < b.firstName) {
				return -1;
			}

			return 0;
		});
	},
	sortByPhone () {
		this.orders = this.orders.sort(function (a, b) {
			if (a.phone > b.phone) {
				return 1;
			}

			if (a.phone < b.phone) {
				return -1;
			}

			return 0;
		});
	},
	sortByCost () {

		this.orders = this.orders.sort((a, b) => {
			if (this.orderCost(a) > this.orderCost(b)){
				return 1;
			}

			if (this.orderCost(a) < this.orderCost(b)){
				return -1;
			}

			return 0;
		})
	},
	sortByProduct () {
		this.orders = this.orders.sort((a, b) => {
			if (a.products[0].productName > b.products[0].productName) {
				return 1;
			}
			if (a.products[0].productName < b.products[0].productName) {
				return -1;
			}
			if (a.products[1].productName > b.products[1].productName) {
				return 1
			}
			if (a.products[1].productName < b.products[1].productName) {
				return 1
			}
			return 0;
		})
	},
	sortByStatus () {
		this.orders = this.orders.sort((a, b) => {
			if (this.orderStatus(a) > this.orderStatus(b)) {
				return 1;
			}
			if (this.orderStatus(a) < this.orderStatus(b)) {
				return -1;
			}
			return 0;
		})
	},
	sortArray() {
	this.list = this.orders.filter(item => {
		return item.id.includes(this.inputStr) ||
			item.phone.includes(this.inputStr) ||
			item.firstName.toUpperCase().includes(this.inputStr) ||
			item.lastName.toUpperCase().includes(this.inputStr) ||
			item.firstName.toLowerCase().includes(this.inputStr) ||
			item.lastName.toLowerCase().includes(this.inputStr);
		});
	}
  }
}
</script>

<style scoped>
	.order__wrapper{
		width: 90%;
		margin: 0 auto;
	}

	table{
		border: 1px solid gray;
	}

	span{
		display: block;
	}

	.sort{
		cursor: pointer;
	}

	.search{
		width: 100%;
	}

	.search__title{
		text-align: left;
		margin-bottom: 5px;
	}
</style>