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

            <form class="card-body" method="post" action="?/edit" id="editPlatformForm">

                <div class="mb-3">
                    <label class="form-label required">Name</label>
                    <div>
                        <div class="input-group mb-2">
                            <div class="dropdown">
                                <a href="#" class="btn dropdown-toggle w-full justify-start" data-bs-toggle="dropdown">
                                    <i class="text-[24px] {platform.icon}"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <button on:click={() => platform.icon = 'i-tabler-device-unknown-filled text-gray'} class="dropdown-item" href="#">
                                      <i class="text-[24px] i-tabler-device-unknown-filled text-gray"></i> Other
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-spotify text-green'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-spotify text-green"></i> Spotify
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-amazon text-orange'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-amazon text-orange"></i> Amazon
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-netflix text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-netflix text-red"></i> Netflix
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-apple text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-apple text-red"></i> Apple
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-google text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-google text-red"></i> Google
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-youtube text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-youtube text-red"></i> Youtube
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-discord text-purple'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-discord text-purple"></i> Discord
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-twitch text-purple'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-twitch text-purple"></i> Twitch
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-vimeo text-blue'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-vimeo text-blue"></i> Vimeo
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-twitter text-blue'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-twitter text-blue"></i> Twitter
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-facebook text-blue'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-facebook text-blue"></i> Facebook
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-disney text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-disney text-red"></i> Disney+
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-deezer text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-deezer text-red"></i> Deezer
                                    </button>
                                    <button on:click={() => platform.icon = 'i-tabler-brand-steam text-red'} class="dropdown-item" href="#">
                                        <i class="text-[24px] i-tabler-brand-steam text-red"></i> Steam
                                    </button>
                                </div>
                            </div>
                            <input type="hidden" name="icon" value={platform.icon}>
                            <input type="text" class="form-control" aria-describedby="nameHelp" placeholder="Enter name" name="name" bind:value={platform.name}>
                        </div>
                    </div>
                </div>

            </form>

            <div class="card-footer">
                <div class="row align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            Delete
                        </button>
                        <button type="submit" form="editPlatformForm" class="btn btn-primary">
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