<script>
    import Footer from "../components/footer.svelte";
    import Header from "../components/header.svelte";
    import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui'


</script>

<main>
    <Header></Header>
    Frontpage
    <Menu>
        <MenuButton>Hello</MenuButton>
        <MenuItems>
            <MenuItem let:active>
      <a href="/account-settings" class={`${active ? "active" : "inactive"}`}
        >Account settings</a
      >
    </MenuItem>
            <MenuItem>Something 2</MenuItem>
        </MenuItems>
    </Menu>
    <Footer></Footer>
</main>

<style>

.active{
    background-color: red;
}

</style>