<script>
    import io from "socket.io-client";
    import { onMount } from "svelte";
    let username;

    const socket = io();

    /* socket.on("login", ({ username }) => {
        displayedUsername = username;
    });
    console.log(displayedUsername); */
    onMount(async () => {
		const response = await fetch("http://localhost:3000/api/user");
		const { data } = await response.json();
		username = data;
	});	
</script>

<header>
    <nav>
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
    </nav>
    <h2>{username || "Not logged in"}</h2>
    
</header>

<style>
    header{
        border: solid black;
    }
    h2{
        position: relative;
        left: 90%;
    }
</style>