<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import { onMount } from "svelte";


    let dropDown;
    onMount(async () => {
        
        const prom = await fetch("http://localhost:3000/api/employee")
        .then(res => res.json())
        .then(data => {
            data.forEach((element) => {
                const option = document.createElement("option");
                option.innerText = element.name;
                option.value = element.email;
                dropDown.appendChild(option);
            })
        })
	});
</script>

<main>
    <Header></Header>
    <div class="email-content">
        <h2>Send email to employee:</h2>
        <form method="POST" action="api/email">
            <label for="to">To:</label>
            <select bind:this={dropDown} name="to"><option>None selected</option></select>
            <label for="subject">Subject:</label>
            <input name="subject" type="text">
            
            <label for="message">Message:</label>
            <input name="message" type="text">

            <label for="name">From:</label>
            <input name="name" type="text">
            <label for="department">Department:</label>
            <input name="department" type="text">
            <label for="phone">Phonenumber:</label>
            <input name="phone" type="text">

            <input type="submit" value="Send">
        </form>
    </div>
    <Footer></Footer>
</main>

<style>
   .email-content{
        background-color: antiquewhite;
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        border: solid black;
        transform: translate(-50%, -50%);
        z-index: 2;
   }
   label{
       font-weight: bold;
   }
</style>