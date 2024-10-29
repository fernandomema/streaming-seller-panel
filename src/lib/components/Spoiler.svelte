<script lang="ts">
  import { clickOutside } from "$lib/directives/clickOutside";

    export let isOpen = false;

	const toggleSpoiler = (open?: boolean) => {
        if (open === undefined) {
            isOpen = !isOpen;
        } else {
            isOpen = open;
        }
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click="{toggleSpoiler}" class="spoiler rounded-md overflow-hidden w-fit {$$props.class}" class:spoiler-open="{isOpen}" use:clickOutside on:click_outside="{() => toggleSpoiler(true)}" on:click_outside="{() => toggleSpoiler(false)}">
    <slot></slot>
</div>

<style>
    .spoiler {
        position: relative;
    }

    .spoiler::after {
        content: "";
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(155, 155, 155, 1);
    }

    .spoiler-open::after {
        content: none;
    }
</style>
