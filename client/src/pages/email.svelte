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
    <form method="POST" action="api/email">
        <label for="to">To:</label>
        <select bind:this={dropDown} name="to"><option>None selected</option></select>
        <label for="subject">Subject:</label>
        <input name="subject" type="text">
        
        <label for="message">Message:</label>
        <input name="message" type="text">

        <label for="name">From:</label>
        <input name="name" type="text">
        <label for="company">Company:</label>
        <input name="company" type="text">
        <label for="phone">Phonenumber:</label>
        <input name="phone" type="text">

        <input type="submit" value="Send">
    </form>
    <Footer></Footer>
</main>

<style>
   
</style>