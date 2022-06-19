<script>
    import io from "socket.io-client";

    let displayedUsername;

    /* const socket = io();

    socket.on("login", ({ username }) => {
        displayedUsername = username;
    }); */

</script>

<header>
    <nav>
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        <a href="/login">Login</a>
    </nav>
    <h2>{displayedUsername || "Not logged in"}</h2>
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