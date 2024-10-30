<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
  import Modal from '$lib/components/modals/Modal.svelte';
    import Spoiler from '$lib/components/Spoiler.svelte';
    import type { Prisma } from '@prisma/client';
    import TimeAgo from 'javascript-time-ago';

    import en from 'javascript-time-ago/locale/en';
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const platform: Prisma.PanelPlatformSelect = $page.data.platform;

    const deletePlatform = async () => {
      const response = await fetch(`/api/panel/${$page.params.panelId}/platforms/${$page.params.providerId}/delete`).then(res => res.json());
      if (response.result == 'ok') goto(`/panel/${$page.params.panelId}/platforms`);
    };
        
</script>

<div class="page-wrapper">
  <!-- Page header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <h2 class="page-title">
            Edit platform ({platform.name})
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

            <div class="card-body">

                <div class="mb-3">
                    <label class="form-label required">Name</label>
                    <div>
                      <input type="text" class="form-control" aria-describedby="nameHelp" placeholder="Enter name" bind:value={platform.name}>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Icon</label>
                    <div class="input-group mb-2">
                        <span class="input-group-text">
                            <i class="text-[24px] {platform.icon}"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="icon name" bind:value={platform.icon}>
                    </div>
                </div>
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
          <div class="col"><a href="#" class="btn btn-danger w-100" data-bs-dismiss="modal" on:click={deletePlatform}>
              Delete client
            </a></div>
        </div>
      </div>
    </div>
  </div>
</Modal>