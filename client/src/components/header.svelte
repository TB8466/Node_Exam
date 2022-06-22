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
        await fetch("http://localhost:3000/api/logout");
		location.href = "/";
    }
</script>

<header>
    <nav>
        <span><a href="/"><img src="img/Logo.png" alt="Logo"></a></span>
        <span><a href="/employee"><h4>Employees</h4></a></span>
        <span><a href="/email"><h3>Email</h3></a></span>
        <span><a href="/bulletin"><h3>Bulletins</h3></a></span>
        <h2>{username || "Not logged in"}
            <button on:click={() => logout()}>Logout</button>
        </h2>
    </nav>
    
    
</header>

<style>
    header{
        background-color: #92d9f0;
        border: solid black;
    }
    h2{
        position: absolute;
        left: 90%;
    }
    h3{
        
    }
    span+span{
        margin-left: 50px;
        border: solid black;
        height: 105px;
        width: 170px;
    }
    span{
        font-size: 25px;
        font-weight: bold;
        text-decoration: none;
        font-family: "Arial";
        text-align: center;
        float: left;
    }
    span:hover{
        background-color: antiquewhite;
    }
    nav{
        margin: 10px;
        display: inline-block;
    }
    img{
        height: 105px;
        width: 170px;
        float: left;
    }
</style>