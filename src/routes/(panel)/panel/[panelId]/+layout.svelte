<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import "../../../../app.css";

    export let data: LayoutData;
</script>

<div class="page">
    <Header user={data.tokenData} panelId={data.panelId} />

    <slot></slot>
</div>
