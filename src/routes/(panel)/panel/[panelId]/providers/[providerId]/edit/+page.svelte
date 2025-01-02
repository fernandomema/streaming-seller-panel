<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Modal from '$lib/components/modals/Modal.svelte';
    import type { Prisma } from '@prisma/client';
    import TimeAgo from 'javascript-time-ago';

    import en from 'javascript-time-ago/locale/en';
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const provider: Prisma.PanelProviderSelect = $page.data.provider;
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

    const deleteProvider = async () => {
      const response = await fetch(`/api/panel/${$page.params.panelId}/providers/${$page.params.providerId}/delete`).then(res => res.json());
      if (response.result == 'ok') goto(`/panel/${$page.params.panelId}/providers`);
    };

    const linkAccounts = async () => {
        for (const accountId of accountsToLink) {
            const response = await fetch(`/api/panel/${$page.params.panelId}/providers/${$page.params.providerId}/link-account/${accountId}`).then(res => res.json());
        }
        window.location.reload();
    };

    const unlinkAccount = async (accountId: number) => {
        const response = await fetch(`/api/panel/${$page.params.panelId}/providers/${$page.params.providerId}/unlink-account/${accountId}`).then(res => res.json());
        window.location.reload();
    };
        
</script>

<div class="page-wrapper">
  <!-- Page header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <h2 class="page-title">
            Edit Provider ({provider.name})
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
                <h3 class="card-title">Provider</h3>
            </div>

            <form class="card-body" method="post" action="?/edit" id="editProviderForm">

                <div class="mb-3">
                    <label class="form-label required">Name</label>
                    <div>
                      <input type="text" class="form-control" aria-describedby="nameHelp" placeholder="Enter name" name="name" bind:value={provider.name}>
                    </div>
                </div>

                <!-- notes -->
                <div class="mb-3">
                    <label class="form-label">Notes</label>
                    <textarea class="form-control" placeholder="Your notes" name="notes" bind:value={provider.notes}></textarea>
                </div>

            </form>

            <div class="card-footer">
                <div class="row align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            Delete
                        </button>
                        <button type="submit" form="editProviderForm" class="btn btn-primary">
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
                    <h3 class="card-title">Provided accounts</h3>
                    <small>
                        Accounts provided by {provider.name}
                    </small>
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
                {#each provider.accounts as account}
                    <div class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <a href="/panel/{$page.params.panelId}/accounts/{account.id}/edit">
                                    <span class="avatar" style="background-image: url(./static/avatars/000m.jpg)"></span>
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
          <div class="col"><a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal" on:click={deleteProvider}>
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
                            <div class="col-auto">
                                <span class="avatar" style="background-image: url(./static/avatars/003f.jpg)"></span>
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