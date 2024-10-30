<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
  import Modal from '$lib/components/modals/Modal.svelte';
  import PhoneInput from '$lib/components/PhoneInput.svelte';
    import Spoiler from '$lib/components/Spoiler.svelte';
    import type { Prisma } from '@prisma/client';
    import TimeAgo from 'javascript-time-ago';

    import en from 'javascript-time-ago/locale/en';
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const client: Prisma.PanelClientSelect = $page.data.client;
    const linkableAccounts: Prisma.PanelAccountsSelect[] = $page.data.linkableAccounts;

    let accountsToLink: number[] = [];

    const toggleAccountToLink = async (accountId: number, checked: boolean) => {
        if (checked) {
            accountsToLink.push(accountId);
        } else {
            accountsToLink = accountsToLink.filter(id => id != accountId);
        }
        console.log(accountsToLink);
    }

    const deleteClient = async () => {
      const response = await fetch(`/api/panel/${$page.params.panelId}/clients/${$page.params.clientId}/delete`).then(res => res.json());
      console.log(response);
      if (response.result == 'ok') goto(`/panel/${$page.params.panelId}/clients`);
    };

    const linkAccounts = async () => {
        for (const accountId of accountsToLink) {
            const response = await fetch(`/api/panel/${$page.params.panelId}/clients/${$page.params.clientId}/link-account/${accountId}`).then(res => res.json());
        }
        window.location.reload();
    };

    const unlinkAccount = async (accountId: number) => {
        const response = await fetch(`/api/panel/${$page.params.panelId}/clients/${$page.params.clientId}/unlink-account/${accountId}`).then(res => res.json());
        window.location.reload();
    };

    let test = "";
        
</script>

<div class="page-wrapper">
  <!-- Page header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <h2 class="page-title">
            Edit Client ({client.name})
          </h2>
        </div>
      </div>
    </div>
  </div>
  <!-- Page body -->
  <div class="page-body">
    <div class="container-xl">

        <div class="card">

            <div class="card-header">
                <h3 class="card-title">Client</h3>
            </div>

            <div class="card-body">

                <div class="mb-3">
                    <label class="form-label required">Name</label>
                    <div>
                      <input type="text" class="form-control" aria-describedby="nameHelp" placeholder="Enter name" bind:value={client.name}>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label required">Email address</label>
                    <div>
                      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" bind:value={client.email}>
                    </div>
                </div>
                
                <div class="mb-3 w-full">
                    <label class="form-label">Phone</label>
                    <PhoneInput bind:value={client.phone}></PhoneInput> 
                </div>
                {test}

            </div>

            <div class="card-footer">
                <div class="row align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            Delete
                        </button>
                        <button class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <!-- Linked accounts -->
        <div class="card mt-4">
            <div class="card-header">
                <div>
                    <h3 class="card-title">Linked accounts</h3>
                    <small>Accounts that the user has access to</small>
                </div>
                {#if linkableAccounts && linkableAccounts.length > 0}
                    <div class="card-actions">
                        <a href="#" class="btn btn-primary flex gap-1" data-bs-toggle="modal" data-bs-target="#addAccountModal">
                            <i class="i-tabler-plus text-white text-[24px]"></i>
                            Link account
                        </a>
                    </div>
                {:else}
                    <div class="card-actions">
                        <a href="/panel/{$page.params.panelId}/accounts/" class="btn btn-primary flex gap-1">
                            <i class="i-tabler-plus text-white text-[24px]"></i>
                            Add accounts
                        </a>
                    </div>
                {/if}
            </div>
            <div class="list-group list-group-flush list-group-hoverable">
                {#each client.accounts as account}
                    <div class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <a href="/panel/{$page.params.panelId}/accounts/{account.id}/edit">
                                    <i class="{account.platform?.icon} text-[40px]"></i>
                                </a>
                            </div>
                            <div class="col text-truncate">
                                <a href="/panel/{$page.params.panelId}/accounts/{account.id}/edit" class="text-reset d-block">{account.email}</a>
                                <div class="text-secondary text-truncate mt-n1 flex gap-1 items-center text-xs">
                                    <i class="i-tabler-clock text-[15px]"></i> 
                                    {timeAgo.format(account.expiresAt)}
                                </div>
                            </div>
                            <div class="col-auto">
                                <a href="#" class="list-group-item-actions" on:click={() => unlinkAccount(account.id)}>
                                    <i class="i-tabler-unlink text-[24px] text-red-400"></i>
                                </a>
                            </div>
                        </div>
                    </div>
              {/each}
              
            </div>
        </div>

    </div>
  </div>
</div>

<Modal id="deleteModal">
  <div class="modal-content">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="modal-status bg-danger"></div>
    <div class="modal-body text-center py-4">
      <i class="i-tabler-alert-triangle text-[40px] text-red-400"></i>
      <h3>Are you sure?</h3>
      <div class="text-secondary">Do you really want to remove this client? What you've done cannot be undone.</div>
    </div>
    <div class="modal-footer">
      <div class="w-100">
        <div class="row">
          <div class="col"><a href="#" class="btn w-100" data-bs-dismiss="modal">
              Cancel
            </a></div>
          <div class="col"><a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal" on:click={deleteClient}>
              Delete client
            </a></div>
        </div>
      </div>
    </div>
  </div>
</Modal>

<Modal id="addAccountModal" scrollable={true} modalSize="lg">
    <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Link account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="list-group list-group-flush">
                {#each linkableAccounts as account}
                    <label class="list-group-item cursor-pointer">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <input type="checkbox" class="form-check-input" on:change={(e) => toggleAccountToLink(account.id, e.currentTarget.checked)}>
                            </div>
                            <div class="col-auto bg-slate-200 rounded-md flex items-center w-[40px] h-[40px] p-1">
                                <i class="{account.platform?.icon} text-[50px]"></i>
                            </div>
                            <div class="col text-truncate">
                                <span class="text-reset d-block">{account.email}</span>
                                <div class="text-secondary text-truncate mt-n1 flex gap-2">  
                                    <div class="flex items-center gap-1">
                                        <i class="i-tabler-user text-[15px]"></i>
                                        {account.clients?.length} / 5
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <i class="i-tabler-clock text-[15px]"></i>
                                        {timeAgo.format(account.expiresAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                {/each}
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={linkAccounts}>Save changes</button>
        </div>
    </div>
</Modal>