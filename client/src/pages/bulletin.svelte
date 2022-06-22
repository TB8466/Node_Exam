<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";

    let headline;
    let message;
    let budget;

    async function getBulletin(){
        const arr = [];
        const prom = await fetch("http://localhost:3000/api/bulletin")
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                arr.push(element);
            })
        })
        return arr;
    };

    async function editBulletin(){
        const head = headline.value;
        const msg = message.value;
        const bdg = Number(budget.value);
        const res = await fetch("http://localhost:3000/api/bulletin", {
			method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            
			body: JSON.stringify({
                head,
                msg,
                bdg
			})
		});
		const json = await res.json();

        alert("Message of the day updated");
        location.href="/";
    }
</script>

<main>
    <Header></Header>
    {#await getBulletin()}
            <h1>loading...</h1>
            {:then items}         
                {#each items as item}
                    <div class="container">
                        <h2>Message of the day:</h2>
                        <label for="headline">Headline:</label>
                        <input class="message" bind:this={headline} name="headline" type="text" value={item.headline}>
                        <label for="message">Message:</label>
                        <textarea class="message" bind:this={message} name="message" value={item.message}></textarea>
                    </div>
                    <div class="container">
                        <label for="budget">Today's budget:</label>
                        <input bind:this={budget} name="budget" type="number" value={item.budget}>
                    </div>
                    <button on:click={editBulletin}>Change</button>
                {/each}    
        {/await}
    <Footer></Footer>
</main>

<style>
    .container{
        border: solid;
        width: fit-content;
    }
    .message{
        width: 70%;
    }
</style>