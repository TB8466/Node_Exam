<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import {onMount} from "svelte"
    const items = ["flour", "coffee", "random crap"]
    let div;
    /* onMount(async () => {

        const prom = await fetch("http://localhost:3000/api/flower")
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                
            })
        })
    }); */
</script>

<main>
    <Header></Header>
    <div bind:this={div} class="catalog">
        {#each items as item}
            <li class="item">
                {item}
            </li>
        {/each}
    </div>
    <Footer></Footer>
</main>

<style>
   .catalog{
    display: flex;

   }
   .item{
    display: inline-block;
    width: 100px;
    height: 50px;
    border: solid black;
    padding: 25px;
    margin: 10px;
   }
</style>