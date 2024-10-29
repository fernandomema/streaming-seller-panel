<script lang="ts">
    import { page } from '$app/stores';
    
    const count = $page.data.count;
</script>

<div class="page-wrapper">

    <!-- Page header -->
    <div class="page-header d-print-none">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">
              Dashboard
            </h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Page body -->
    <div class="page-body">
      <div class="container-xl">
  
        <div class="row row-cards">

            <div class="col-md-6 col-xl-3">
                <div class="card card-sm">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <span class="bg-blue text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/user -->
                                    <i class="i-tabler-user text-[24px]"></i>
                                </span>
                            </div>
                            <div class="col">
                                <div class="font-weight-medium">
                                    {count.clients} Clients
                                </div>
                                <div class="text-secondary">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
              <div class="card card-sm">
                  <div class="card-body">
                      <div class="row align-items-center">
                          <div class="col-auto">
                              <span class="bg-green text-white avatar">
                                <i class="i-tabler-lock-password text-[24px]"></i>
                              </span>
                          </div>
                          <div class="col">
                              <div class="font-weight-medium">
                                  {count.accounts} Accounts
                              </div>
                              <div class="text-secondary">
                                  {count.accountsAboutToExpire} about to expire
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

        </div>
  
  
      </div>
    </div>
  </div>