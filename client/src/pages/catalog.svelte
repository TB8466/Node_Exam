<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";

    async function getCatalog(){
        const arr = [];
        const prom = await fetch("http://localhost:3000/api/catalog")
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                arr.push(element);
            })
            console.log(arr);
        })
        return arr;
    };
    let ul;
    function mouseOver(i,id){
        for(let j = 0; j<i.children.length; j++){
            if(i.children[j].classList.contains("item"+id)){
                i.children[j].classList.add("active");
            }
        }
    }
    function mouseOut(i,id){
        for(let j = 0; j<i.children.length; j++){
            if(i.children[j].classList.contains("item"+id)){
                i.children[j].classList.remove("active");
            }
        }
        
    }
        
    
    let active = false;
</script>

<main>
    <Header></Header>   
    <div  class="catalog">
        {#await getCatalog()}
            <h1>loading...</h1>
            {:then items}
            <ul bind:this={ul}>
                {#each items as item}
                    
                        <li on:click={() => mouseOver(ul,item.id)} on:mouseleave={()=>mouseOut(ul,item.id)} class="item{item.id}">
                            {item.name}
                            <p>{item.description}</p>
                            <p>Amount left:{item.amount}</p>
                        </li>
                    
                {/each}
            </ul>
        {/await}        
    </div>
    <Footer></Footer>
</main>

<style>
   .catalog{
        display: flex;
        
   }
   .catalog li{
        display: inline-block;
        position: relative;
        width: 100px;
        height: 200px;
        overflow: auto;
        border: solid black;
        padding: 25px;
        margin: 10px;
   }
   .active{
       transition: 1s;
       transform: scale(3);
       transform-origin: top right;
       transform-origin: top left;
       background-color: cyan;
       font-size: 7px;
       z-index: 3;
   }
   .hidden{
       opacity: 0;
   }
</style>