<script>
	import {Router, Route, Link} from "svelte-navigator"
	import Employee from "./pages/employees.svelte";
	import Frontpage from "./pages/frontpage.svelte";
	import Login from "./pages/login.svelte";
	import NewEmployee from "./pages/newEmployee.svelte";
	import { onMount } from "svelte";
	import Email from "./pages/email.svelte";

	let username = false;

	onMount(async () => {
		const response = await fetch("/api/user");
		const { data } = await response.json();
		username = data;
	});	
</script>

<Router>

	{#if username === false}
		<div id="loading">Loading</div>
	{:else if username}
		<Route path="/">
			<Frontpage></Frontpage>
		</Route>

		<Route path="/employee">
			<Employee></Employee>
		</Route>
	
		<Route path="/newEmployee">
			<NewEmployee></NewEmployee>
		</Route>

		<Route path="/email">
			<Email></Email>
		</Route>
	{:else}
		<Login></Login>
	{/if}

</Router>

<style>
	
</style>