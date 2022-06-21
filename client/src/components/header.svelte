<script>
    import io from "socket.io-client";
    import { onMount } from "svelte";
    let username;

    const socket = io();

    onMount(async () => {
		const response = await fetch("http://localhost:3000/api/user");
		const { data } = await response.json();
		username = data;
	});
    async function logout(){
        console.log("logout");
        await fetch("http://localhost:3000/api/logout");
		location.href = "/";
    }
</script>

<header>
    <nav>
        <span><a href="/"><img src="img/Logo.png" alt="Logo"></a></span>
        <span><a href="/employee">Employees</a></span>
        <span><a href="/email">Email</a></span>
    </nav>
    <h2>{username || "Not logged in"}</h2>
    <button on:click={() => logout()}>Logout</button>
</header>

<style>
    header{
        border: solid black;
    }
    h2{
        position: relative;
        left: 90%;
    }
    span+span{
        margin-left: 50px;
    }
    span{
        font-size: 25px;
        font-weight: bold;
        text-decoration: none;
        font-family: "Arial";
    }
    nav{
        display: inline-block;
    }
    img{
        height: 80px;
        width: 100px;
        
    }
</style>