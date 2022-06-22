<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";

    let name;
    let age;
    let position;
    let wage;
    let email;

    async function createEmployee(){
        const res = await fetch("http://localhost:3000/api/employee", {
			method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
			body: JSON.stringify({
                name,
				age,
				position,
                wage,
                email
			})
		});
		const json = await res.json()
        
        alert("Employee created")
    }
    
</script>

<main>
    <Header></Header>
    <div class="create-employee">
        <h2>Create new employee:</h2>
        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={name}>
        <label for="age">Age:</label>
        <input id="age" type="number" bind:value={age}>
        <label for="position">Position:</label>
        <input id="position" type="text" bind:value={position}>
        <label for="wage">Monthly wage:</label>
        <input id="wage" type="number" bind:value={wage}>
        <label for="email">Email address:</label>
        <input id="email" type="text" bind:value={email}>
        <button type="button" on:click={createEmployee}>Create</button>
    </div>
    <Footer></Footer>
</main>

<style>
   .create-employee{
            padding: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            border: solid black;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
</style>