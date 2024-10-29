<script lang="ts">
    export let status: boolean = false;
    export let id: string = "exampleModal";
    export let title: string = "Modal title";
    export let modalSize: 'sm'|'lg'|'xl' = 'sm';
    export let centered: boolean = true;
    export let scrollable: boolean = false;

    export const toggle = (open: boolean|undefined) => {
        if (typeof open === 'undefined') open = !status;
        status = open;
        if (status) {
            document.getElementById(id)?.classList.add('show');
        } else {
            document.getElementById(id)?.classList.remove('show');
        }
    } 
</script>
  
<div class="modal modal-blur fade" id={id} tabindex="-1">
    <div class="modal-dialog" role="document" 
        class:modal-xl={modalSize === 'xl'} class:modal-lg={modalSize === 'lg'} class:modal-sm={modalSize === 'sm'}
        class:modal-dialog-centered={centered} class:modal-dialog-scrollable={scrollable}
    >
        <slot></slot>
    </div>
</div>