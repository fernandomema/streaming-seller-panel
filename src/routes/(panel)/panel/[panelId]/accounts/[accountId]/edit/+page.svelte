<script lang="ts">
  import { goto } from '$app/navigation';
    import { page } from '$app/stores';
  import Modal from '$lib/components/modals/Modal.svelte';
    import Spoiler from '$lib/components/Spoiler.svelte';
    import type { Prisma } from '@prisma/client';
    import TimeAgo from 'javascript-time-ago';
    import CryptoJS from 'crypto-js';

    import en from 'javascript-time-ago/locale/en';
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const account: Prisma.PanelAccountsSelect = $page.data.account;
    const linkableClients: Prisma.PanelClientSelect[] = $page.data.linkableClients;
    const linkableProviders: Prisma.PanelProviderSelect[] = $page.data.linkableProviders;
    const linkablePlatforms: Prisma.PanelPlatformSelect[] = $page.data.linkablePlatforms;

    let clientsToLink: number[] = [];

    const toggleClientToLink = async (accountId: number, checked: boolean) => {
        if (checked) {
            clientsToLink.push(accountId);
        } else {
            clientsToLink = clientsToLink.filter(id => id != accountId);
        }
        console.log(clientsToLink);
    }

    const deleteAccount = async () => {
      const response = await fetch(`/api/panel/${$page.params.panelId}/accounts/${$page.params.accountId}/delete`).then(res => res.json());
      console.log(response);
      if (response.result == 'ok') goto(`/panel/${$page.params.panelId}/accounts`);
    };

    const linkClients = async () => {
        for (const clientId of clientsToLink) {
            const response = await fetch(`/api/panel/${$page.params.panelId}/accounts/${$page.params.accountId}/link-client/${clientId}`).then(res => res.json());
        }
        window.location.reload();
    };

    const unlinkAccount = async (clientId: number) => {
        const response = await fetch(`/api/panel/${$page.params.panelId}/accounts/${$page.params.accountId}/unlink-client/${clientId}`).then(res => res.json());
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
            Edit Account ({account.email})
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
                <h3 class="card-title">Account</h3>
            </div>

            <div class="card-body">

                <div class="mb-3">
                    <label class="form-label required">Email address</label>
                    <div>
                      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" bind:value={account.email}>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label required">Password</label>
                    <div>
                        <Spoiler class="w-full">
                            <input type="text" class="form-control" placeholder="Password" bind:value={account.password}>
                        </Spoiler>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label required">Expire date</label>
                    <div>
                      <input type="date" class="form-control" aria-describedby="expireHelp" placeholder="Expire date" value={account.expiresAt.toISOString().split('T')[0]}
                        on:change={(e) => account.expiresAt = e.currentTarget.valueAsDate}
                      >
                    </div>
                    <small class="flex items-center gap-1">
                        <i class="i-tabler-clock"></i>
                        {timeAgo.format(account.expiresAt)}
                    </small>
                </div>

                <!-- Providers -->
                 <div class="mb-3">
                    <label class="form-label">Provider</label>
                    <select class="form-select" aria-label="Providers" bind:value={account.providerId}>
                        {#each linkableProviders as provider}
                            <option value={provider.id}>{provider.name}</option>
                        {/each}
                    </select>
                </div>

                <!-- Platform -->
                 <div class="mb-3">
                    <label class="form-label">Platform</label>
                    <select class="form-select" aria-label="Platforms" bind:value={account.platformId}>
                        {#each linkablePlatforms as platform}
                            <option value={platform.id}>{platform.name}</option>
                        {/each}
                    </select>
                </div>

            </div>
            <div class="card-footer">
              <div class="row align-items-center">
                <div class="col"></div>
                <div class="col-auto">
                  <button class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
        </div>

        <!-- Linked users-->
        <div class="card mt-4">
            <div class="card-header">
                <div>
                    <h3 class="card-title">Linked clients</h3>
                    <small>Clients with acces to this account</small>
                </div>
                {#if linkableClients && linkableClients.length > 0}
                    <div class="card-actions">
                        <a href="#" class="btn btn-primary flex gap-1" data-bs-toggle="modal" data-bs-target="#addClientModal">
                            <i class="i-tabler-plus text-white text-[24px]"></i>
                            Link client
                        </a>
                    </div>
                {:else}
                    <div class="card-actions">
                        <a href="/panel/{$page.params.panelId}/clients/" class="btn btn-primary flex gap-1">
                            <i class="i-tabler-plus text-white text-[24px]"></i>
                            Add clients
                        </a>
                    </div>
                {/if}
            </div>
            <div class="list-group list-group-flush list-group-hoverable">
                {#each account.clients as client}
                    <div class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <a href="/panel/{$page.params.panelId}/clients/{client.id}/edit">
                                    <span class="avatar" style="background-image: url(https://www.gravatar.com/avatar/{CryptoJS.SHA256(client.email?.trim().toLowerCase()).toString()}?d=wavatar&f=y)"></span>
                                </a>
                            </div>
                            <div class="col text-truncate">
                                <a href="/panel/{$page.params.panelId}/clients/{client.id}/edit" class="text-reset d-block">{client.email}</a>
                                <div class="text-secondary text-truncate mt-n1 flex gap-1 items-center text-xs"></div>
                            </div>
                            <div class="col-auto">
                                <a href="#" class="list-group-item-actions" on:click={() => unlinkAccount(client.id)}>
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
        <div class="text-secondary">Do you really want to remove this account? What you've done cannot be undone.</div>
      </div>
      <div class="modal-footer">
        <div class="w-100">
          <div class="row">
            <div class="col"><a href="#" class="btn w-100" data-bs-dismiss="modal">
                Cancel
              </a></div>
            <div class="col"><a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal" on:click={deleteAccount}>
                Delete account
              </a></div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
  
  <Modal id="addClientModal" scrollable={true} modalSize="lg">
      <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Link client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="list-group list-group-flush">
                  {#each linkableClients as client}
                      <label class="list-group-item cursor-pointer">
                          <div class="row align-items-center">
                              <div class="col-auto">
                                  <input type="checkbox" class="form-check-input" on:change={(e) => toggleClientToLink(client.id, e.currentTarget.checked)}>
                              </div>
                              <div class="col-auto">
                                  <span class="avatar" style="background-image: url(./static/avatars/003f.jpg)"></span>
                              </div>
                              <div class="col text-truncate">
                                  <span class="text-reset d-block">{client.email}</span>
                                  <div class="text-secondary text-truncate mt-n1 flex gap-2">  
                                      
                                  </div>
                              </div>
                          </div>
                      </label>
                  {/each}
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={linkClients}>Save changes</button>
          </div>
      </div>
  </Modal>