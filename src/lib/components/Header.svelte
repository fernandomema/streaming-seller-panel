<script lang="ts">
    import CryptoJS from 'crypto-js';

    export let user;
    export let panelId;
</script>

<div class="bg-white">
<header class="navbar navbar-expand-md d-print-none border-b border-b-gray-200">
    <div class="container-xl">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <a href="/panel/{panelId}">
          Panel
        </a>
      </div>
      <div class="navbar-nav flex-row order-md-last">
        <div class="nav-item dropdown">
          <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
            <span class="avatar avatar-sm" style="background-image: url(https://www.gravatar.com/avatar/{CryptoJS.MD5(user.email?.trim().toLowerCase()).toString()}?d=identicon)"></span>
            <div class="d-none d-xl-block ps-2">
              <div>{user.email}</div>
              <div class="mt-1 small text-secondary">Admin</div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="#" class="dropdown-item">Status</a>
            <a href="./profile.html" class="dropdown-item">Profile</a>
            <a href="#" class="dropdown-item">Feedback</a>
            <div class="dropdown-divider"></div>
            <a href="./settings.html" class="dropdown-item">Settings</a>
            <a href="/logout" class="dropdown-item">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </header>


  <header class="navbar-expand-md">
    <div class="navbar-collapse collapse visible" id="navbar-menu">
      <div class="navbar">
        <div class="container-xl">
          <div class="row flex-fill align-items-center">
            <div class="col">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="/panel/{panelId}/">
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path></svg>
                    </span>
                    <span class="nav-link-title">
                      Home
                    </span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/panel/{panelId}/clients">
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/checkbox -->
                        <span class="i-tabler-user text-[20px]"></span>
                    </span>
                    <span class="nav-link-title">
                      Clients
                    </span>
                  </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/panel/{panelId}/accounts">
                      <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/checkbox -->
                        <span class="i-tabler-lock-password text-[20px]"></span>
                      </span>
                      <span class="nav-link-title">
                        Accounts
                      </span>
                    </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/panel/{panelId}/providers">
                    <span class="nav-link-icon d-md-none d-lg-inline-block">
                      <span class="i-tabler-user-dollar text-[20px]"></span>
                    </span>
                    <span class="nav-link-title">
                      Providers
                    </span>
                  </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/panel/{panelId}/platforms">
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <span class="i-tabler-world text-[20px]"></span>
                  </span>
                  <span class="nav-link-title">
                    Platforms
                  </span>
                </a>
              </li>
              </ul>
            </div>
            <div class="col-2 d-none d-xxl-block">
              <div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                <form action="./" method="get" autocomplete="off" novalidate="">
                  <div class="input-icon">
                    <span class="input-icon-addon">
                      <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path><path d="M21 21l-6 -6"></path></svg>
                    </span>
                    <input type="text" value="" class="form-control" placeholder="Search…" aria-label="Search in website">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</div>