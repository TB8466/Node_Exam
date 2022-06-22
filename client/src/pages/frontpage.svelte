<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import { onMount } from "svelte";

    let username;

    onMount(async () => {
		const response = await fetch("http://localhost:3000/api/user");
		const { data } = await response.json();
		username = data;
	});

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
</script>

<main>
    <Header></Header>
        <h1>Welcome {username}</h1>
    {#await getBulletin()}
            <h1>loading...</h1>
            {:then items}         
                {#each items as item}
                    <div class="message">
                        <h1>Message of the day:</h1>
                        <h2>{item.headline}</h2>                
                        <p>{item.message}</p>
                    </div>
                    
                    <div class="message">
                        <h2>Today's expected budget:</h2>
                        <h3>{item.budget} US $</h3>
                    </div>                                                        
                {/each}
            
        {/await}
    <Footer></Footer>
</main>

<style>
    h1{
        margin: 15px;
    }
    .message{
        border: solid;
        width: 50%;
        margin: 15px;
    }


</style>