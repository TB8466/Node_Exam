<script>
	import {Router, Route, Link} from "svelte-navigator"
	import Catalog from "./pages/catalog.svelte";
	import Frontpage from "./pages/frontpage.svelte";
</script>

<Router>
	<Route path="/">
		<Frontpage></Frontpage>
	</Route>

	<Route path="/catalog">
		<Catalog></Catalog>
	</Route>
</Router>

<style>
	
</style>