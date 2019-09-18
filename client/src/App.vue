<template>
  <div id="app">
		<Navbar />
    <Message />
  	<div class="container">
    <router-view/>  		
  	</div>
  </div>
</template>



<script>
  import { mapActions } from 'vuex';
	import Navbar from './components/Navbar.vue';
  import Message from './components/Message.vue';

  export default {
    name:'app',
    components:{
    	Navbar,
      Message
    },
    methods:{
      ...mapActions(['postFindAll'])
    },
    created(){
      this.postFindAll();
    }
  }
</script>

<style>

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
  background: #CBC8C8;
}

.container {
	width: 95%;
	margin: 1rem auto;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}

/* list */
.list {
  width: 100%;
}

.list li {
  background: #202020;
  color: #fff;
  margin: 0.3rem 0;
  padding: 0.2rem;
  box-shadow: 3px 2px 2px #655F5F;
}
.list li a {
  font-size: 1.3rem;
  color: #fff;
  padding-left: 0.5rem;
}
.list li a:hover {
  color: #05A107;
  padding-left: 1.5rem;
}
/* Form */
.form {
  width: 100%;
  padding: 1.5rem;
  background:#959595;
}

.form-group {
  margin: 0.5rem 0;
}
.form-group label {
  display: block;
  font-size: 1.2rem;
}
.form-group input {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.3rem;
  border: 1px solid #333;
}

/* button */
.btn {
  font-size: 0.9rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid #333;
  background: #ADA9A9;
  color: #333;
}
.btn:hover {
  background: #C5BEBE;
}

.btn-dark {
  background: #3F3F3F;
  color: #fff;
}
btn-dark:hover {
  background: #565353;
}
.btn-danger {
  background:#F81A1A;
  color: #fff;
}
.btn-danger:hover {
  background:#F85757;
  color: #fff;
}


/* Progress bar */
.progress {
  width: 100%;
  background: #BCBCBC;
  height: 1rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  text-align: center;
}
.progress-bar {
  width: 50%;
  background: #0F9D08;
}
/* Table */
.table {
  width: 100%;
}
.table thead {
  background: #333;
  color: #fff;
}

.table th {
  font-size: 1.2rem;
  padding: 0.2rem 0;
}

.table td {
  font-size: 1.2rem;
  padding: 7px;
}

.table tbody tr {
  background:#8A8888;
}

/* Search */
.search input {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.3rem;
  margin: 0.3rem 0;
  border: 1px solid #333;
}

</style>
