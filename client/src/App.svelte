<script>
	import {Router, Route, Link} from "svelte-navigator"
	import Employee from "./pages/employees.svelte";
	import Frontpage from "./pages/frontpage.svelte";
	import Login from "./pages/login.svelte";
	import NewEmployee from "./pages/newEmployee.svelte";
</script>

<Router>
	<Route path="/">
		<Frontpage></Frontpage>
	</Route>

	<Route path="/employee">
		<Employee></Employee>
	</Route>

	<Route path="/login">
		<Login></Login>
	</Route>

	<Route path="/newEmployee">
		<NewEmployee></NewEmployee>
	</Route>
</Router>

<style>
	
</style>