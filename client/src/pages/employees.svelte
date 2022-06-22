<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";

    let mainContent;
    let editEmp;

    async function getEmployees(){
        const arr = [];
        const prom = await fetch("http://localhost:3000/api/employee")
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                arr.push(element);
            })
            console.log(arr);
        })
        return arr;
    };
    
    async function editEmployee(id){
        const arr = [];
        await fetch("http://localhost:3000/api/employee/"+id)
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                arr.push(element);
            })
        })
        console.log(arr);
        editEmp.classList.remove("hidden");
        mainContent.classList.add("blur");

        const inpNameLabel = document.createElement("p");
        const inpAgeLabel = document.createElement("p");
        const inpPositionLabel = document.createElement("p");
        const inpWageLabel = document.createElement("p"); 

        const inpName = document.createElement("input");
        const inpAge = document.createElement("input");
        const inpPosition = document.createElement("input");
        const inpWage = document.createElement("input");
        
        inpNameLabel.innerText = "Name: ";
        inpAgeLabel.innerText = "Age: ";
        inpPositionLabel.innerText = "Position: ";
        inpWageLabel.innerText = "Wage: ";
        
        inpName.value = arr[0].name;
        inpAge.value= arr[0].age;
        inpPosition.value = arr[0].position;
        inpWage.value = arr[0].wage;

        const exit = document.createElement("p");
        exit.innerText = "X";
        exit.onclick = function(){
            editEmp.classList.add("hidden");
            mainContent.classList.remove("blur");
            location.reload();
        }

        const submit = document.createElement("button");
        submit.innerText = "Submit";
        submit.onclick = function(){
            editEmpAPI(id,inpName.value,inpAge.value,inpPosition.value,inpWage.value);
        }

        editEmp.appendChild(exit);
        editEmp.appendChild(inpNameLabel);
        editEmp.appendChild(inpName);
        editEmp.appendChild(inpAgeLabel);
        editEmp.appendChild(inpAge);
        editEmp.appendChild(inpPositionLabel);
        editEmp.appendChild(inpPosition);
        editEmp.appendChild(inpWageLabel);
        editEmp.appendChild(inpWage);
        editEmp.appendChild(submit);
    }

    async function editEmpAPI(id, name, age, position, wage){
        age = Number(age);
        wage = Number(wage);
        const res = await fetch("http://localhost:3000/api/employee", {
			method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            
			body: JSON.stringify({
                id,
                name,
                age,
                position,
                wage
			})
		});
		const json = await res.json();

        alert("User Edited");
        location.reload();
    }

    async function deleteEmployee(id){
        if(window.confirm("Are you sure?")){
            const res = await fetch("http://localhost:3000/api/employee", {
			method: 'DELETE',
            headers: {
                "Content-Type" : "application/json"
            },
            
			body: JSON.stringify({
                id,
			})
		});
		const json = await res.json();

        alert("User Deleted");
        location.reload();
        }

    }

    async function checkEmployee(id,i){
        
        let isCheckedIn;
        const CB = document.getElementById("CB-"+id).checked;
        console.log("checkIn?",CB,"Id",id);
        if(CB){
            isCheckedIn = 1;
            for(let j = 0; j<i.children.length; j++){
                if(i.children[j].classList.contains("item"+id)){
                    i.children[j].classList.add("is-checked");
                }        
            }
        }
        else{
            isCheckedIn = 0;
            for(let j = 0; j<i.children.length; j++){
                if(i.children[j].classList.contains("item"+id)){
                    i.children[j].classList.remove("is-checked");
                }
            }
        }
        const res = await fetch("http://localhost:3000/api/employee/"+id, {
			method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            
			body: JSON.stringify({
                isCheckedIn
			})
		});
    }

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
    editEmployee(4)
</script>

<main>
    <Header></Header>
    <a href="/newEmployee">Create New Employee</a>
    <div bind:this={mainContent} class="employees">
        {#await getEmployees()}
            <h1>loading...</h1>
            {:then items}
            <ul bind:this={ul}>
                {#each items as item}                  
                        <li on:click={() => mouseOver(ul,item.id)} on:mouseleave={()=>mouseOut(ul,item.id)} class="item{item.id}">
                            {#if item.isCheckedIn===1}
                                <p>Check In
                                    <input class="is-checked" id="CB-{item.id}" type="checkbox" on:change={() => checkEmployee(item.id,ul)} checked>
                                </p>
                            {:else}
                                <p>Check In
                                    <input id="CB-{item.id}" type="checkbox" on:change={() => checkEmployee(item.id,ul)}>
                                </p>
                            {/if}
                            {item.name}
                            <p>Position: {item.position}</p>
                            <p>Age: {item.age}</p>
                            <p>Monthly Wage: {item.wage} U$D</p>
                            <button on:click={() => editEmployee(item.id)}>Edit</button>
                            <button on:click={() => deleteEmployee(item.id)}>Delete</button>
                        </li>                 
                {/each}
            </ul>
        {/await}        
    </div>
    <div bind:this={editEmp} class="edit-emp ">

    </div>
    
    <Footer></Footer>
</main>

<style>
   .employees{
        display: flex;
        
   }
   .employees li{
        display: inline-block;
        position: relative;
        width: 100px;
        height: 200px;
        overflow: auto;
        border: solid black;
        padding: 25px;
        margin: 10px;
        background-color: aliceblue;
   }
   .active{
       transition: 1s;
       transform: scale(3);
       transform-origin: top right;
       transform-origin: top left;
       font-size: 7px;
       z-index: 1;
   }
   .edit-emp{
        padding: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        border: solid black;
        transform: translate(-50%, -50%);
        z-index: 2;
        background-color: aliceblue;
   }
   .edit-emp p{
        display: flex;
        justify-content: center;
        margin: auto;
        padding: 2px;
   }

   .hidden{
       opacity: 0;
       z-index: -1;
   }
   :global(.blur){
            transition: 0.7s;
            filter: blur(8px);
            -webkit-filter: blur(8px);
        }
    .is-checked{
        background-color: #69ff12;
    }

</style>