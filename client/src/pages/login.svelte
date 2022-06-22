<script>
    import Footer from "../components/footer.svelte";
    import io from "socket.io-client";

    let mainContent;
    let overlay;

    let username;
    let password;

    let newEmail;
    let newUsername;
    let newPassword;
    let result = null;

    const socket = io();


    function login(name){
        socket.emit("loggedIn", {username : name})
    }
    socket.on("login", ({ username }) => {
        
        alert("Welcome "+username);
        location.reload();
    })


    async function signIn(){
        const res = await fetch("http://localhost:3000/api/user/login", {
			method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
			body: JSON.stringify({
				username,
				password
			})
		})
		result = await res.json();        

        if(result){
            login(username);
        }
        if(!result){
            alert("Wrong username/password");
        }
        if(result.Result == 404){
            alert("User not found");
        }
	};

    function createUserOverlay(){
        mainContent.setAttribute("class","blur");
        overlay.classList.remove("hidden")
    }
    function hideOverlay(){
        mainContent.classList.remove("blur");
        overlay.classList.add("hidden");
    }

    async function createUser(){
        const res = await fetch("http://localhost:3000/api/user", {
			method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
			body: JSON.stringify({
                newEmail,
				newUsername,
				newPassword
			})
		});
		const json = await res.json()
		result = JSON.stringify(json)

        alert("User created")
        hideOverlay();
    }
</script>

<main>
    
        <div bind:this={mainContent} id="main-content">
            <div id="login">
                <h1>Welcome to superportal</h1>
                <h2>Login or sign-up:</h2>
                <label for="username">Username:</label>
                <input required id="username" type="text" bind:value={username}>
                <label for="password">Password:</label>
                <input required id="password" type="password" bind:value={password}>
                <ul>
                    <li><button type="button" on:click={signIn}>Sign-in</button></li>
                    <li><button on:click={createUserOverlay}>No account? Click here to create new account</button></li>
                </ul>
            </div>
        </div>
        <div bind:this={overlay} class="hidden">
            <div id="create-user">
                <span class="close" on:click={hideOverlay}>&times</span>
                <h1>Create new user:</h1>
                <label for="crt-email">Email:</label>
                <input required id="crt-email" type="email" bind:value={newEmail}>
                <label for="crt-username">Username:</label>
                <input required id="crt-username" type="text" bind:value={newUsername}>
                <label for="crt-password">Password:</label>
                <input required id="crt-password" type="password" bind:value={newPassword}>
                <button type="button" on:click={createUser}>Create</button>
            </div>
        </div>
    <Footer></Footer>
</main>

<style>
   :global(.blur){
            transition: 0.7s;
            filter: blur(8px);
            -webkit-filter: blur(8px);
        }
        .hidden{
            display: none;
            
        }
        #create-user, #login{
            position: absolute;
            top: 50%;
            left: 50%;
            border: solid black;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
        .close {
            color: gray;
            float: right;
            font-size: 50px;
            font-weight: bold;
        }

        .close:hover,.close:focus {
            color: black;
            cursor: pointer;
        }
</style>