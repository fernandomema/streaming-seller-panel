<script lang="ts">
    import { Config } from "$lib/Config";
    import "../../app.css";

    export let data: LayoutData;
</script>

<svelte:head>
    <title>{Config.appName}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/js/tabler.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/core@1.0.0-beta17/dist/css/tabler-vendors.min.css">
</svelte:head>

<slot></slot>
