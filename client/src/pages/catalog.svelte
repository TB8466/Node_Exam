<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import io from "socket.io-client";

    const socket = io();

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
    let count;
    socket.on("updateCart", ({ wares }) => {
        console.log(typeof wares, wares);
        console.log();
        div.innerText = wares[0].itemId;
    });
    function updateCount(value){
        socket.emit("countUpdated",{ data : count+value});
    };
    let div;
    socket.on("updateCount", ({ data }) => {
        count = data;
    });
    function updateCart(id){
        let amount = document.getElementById(id+"count").value;
        
        socket.emit("cartUpdated", { id : id, amount : amount });
    };
    
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
                            <div class="count">
                                <input id="{item.id}count" type="number" min="0">
                                <button on:click={() => updateCart(item.id)}>Add to cart</button>
                            </div>
                        </li>                 
                {/each}
            </ul>
        {/await}        
    </div>
    <div bind:this={div} class="shopping-cart">
        {count}
    </div>
    <div>
        <button>To shopping cart</button>
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
   .count{
    display: flex;
    
   }
   li:focus{
    font-size: 50px;
   }
</style>