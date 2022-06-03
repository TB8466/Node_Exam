<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";

    const items = ["flour", "coffee", "random crap"]
</script>

<main>
    <Header></Header>
    <div class="catalog">
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