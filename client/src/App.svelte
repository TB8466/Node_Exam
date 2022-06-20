<script>
	import {Router, Route, Link} from "svelte-navigator"
	import Catalog from "./pages/catalog.svelte";
	import Frontpage from "./pages/frontpage.svelte";
	import Login from "./pages/login.svelte";
</script>

<Router>
	<Route path="/">
		<Frontpage></Frontpage>
	</Route>

	<Route path="/catalog">
		<Catalog></Catalog>
	</Route>

	<Route path="/login">
		<Login></Login>
	</Route>
</Router>

<style>
	
</style>