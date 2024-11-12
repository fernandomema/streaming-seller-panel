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

    const clientAccountStatus: Prisma.ClientAccountStatusSelect = $page.data.clientAccountStatus;
    const client: Prisma.PanelClientSelect = clientAccountStatus.client;
    const account: Prisma.PanelAccountsSelect = clientAccountStatus.account;

    const newPayment: any = {
        amount: { value: account.sellPrice, error: false },
        paymentDate: { value: new Date(), error: false },
        notes: { value: "", error: false },
    };

    const submitNewPayment = async (e) => {
        newPayment.amount.error = newPayment.amount.value.length < 1 ? true : false;

        const anyError = Object.values(newPayment).find((input: any) => input.error); 
        if (anyError) return;

        Object.keys(newPayment).forEach(key => newPayment[key].error = false);

        let response = await fetch(`/api/panel/${$page.params.panelId}/clients/${$page.params.clientId}/accounts/${$page.params.accountId}/payments/create/submit`, {
            method: "POST",
            body: JSON.stringify(newPayment),
        }).then(r => r.json());

        if (response.result == "ok") window.location.reload();
        if (response.result == "error") console.error(response.message);
    }
        
</script>

<div class="page-wrapper">
  <!-- Page header -->
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col">
          <h2 class="page-title">
            ({client.name}) {account.email}
          </h2>
        </div>
      </div>
    </div>
  </div>
  <!-- Page body -->
  <div class="page-body">
    <div class="container-xl">

        <div class="row row-cards">
            
            <div class="col-md-6 col-lg-9">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Payments</h3>
                        <div class="card-actions">
                            <a href="#" class="btn btn-primary flex gap-1" data-bs-toggle="modal" data-bs-target="#addPaymentModal">
                                <i class="i-tabler-plus text-white text-[24px]"></i>
                              Add new
                            </a>
                        </div>
                    </div>
                    <table class="table card-table table-vcenter">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each clientAccountStatus.payments as payment}
                                <tr>
                                    <td>
                                        <i class="i-tabler-calenda text-secondary"></i>
                                        <span class="text-secondary flex flex-col">
                                            <div>
                                              {payment.paymentDate.toLocaleDateString()}
                                            </div>
                                            <div>
                                              {timeAgo.format(payment.paymentDate)}
                                            </div>
                                        </span>
                                    </td>
                                    <td>
                                        <i class="i-tabler-dollar text-secondary"></i>
                                        <span class="text-secondary">
                                            {payment.amount} €
                                        </span>
                                    </td>
                                    <td>
                                        <span class="text-secondary">
                                            {payment.notes || ''}
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <div class="card card-sm">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <span class="bg-facebook text-white avatar">
                                    <i class="i-tabler-dollar text-white"></i>
                            </div>
                            <div class="col">
                                <div class="font-weight-medium">
                                    {clientAccountStatus.payments.at(-1)?.amount || 0} €
                                </div>
                                <div class="text-secondary">
                                    {clientAccountStatus.billingCycle}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-sm">
                  <div class="card-body">
                      <div class="row align-items-center">
                          <div class="col-auto">
                              <span class="bg-gray text-white avatar">
                                  <i class="{account.platform?.icon} text-3xl"></i>
                          </div>
                          <div class="col">
                              <div class="font-weight-medium">
                                  {account.platform?.name}
                              </div>
                              <div class="text-secondary">
                                  Platform
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

<Modal id="addPaymentModal" scrollable={true} modalSize="lg">
    <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">New Payment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <input type="text" class="form-control" name="example-text-input" placeholder="Your notes" bind:value={newPayment.amount.value} class:is-invalid={newPayment.amount.error}>
          </div>

          <div class="mb-3">
            <label class="form-label">Payment date</label>
            <div>
                <input type="date" class="form-control" aria-describedby="expireHelp" placeholder="Expire date" value={newPayment.paymentDate.value.toISOString().split('T')[0]}
                    on:change={(e) => newPayment.paymentDate.value = e.currentTarget.valueAsDate}
                >
            </div>
            <small class="text-xs text-gray-500 flex items-center gap-1 mt-1 ml-1">
                <i class="i-tabler-clock"></i>
                {timeAgo.format(newPayment.paymentDate.value)}
            </small>
          </div>

          <div class="mb-3">
            <label class="form-label">Notes</label>
            <textarea class="form-control" name="example-text-input" placeholder="Your notes" bind:value={newPayment.notes.value} class:is-invalid={newPayment.notes.error}></textarea>
          </div>


        </div>
        <div class="modal-footer">
          <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
            Cancel
          </a>
          <a href="#" class="btn btn-primary ms-auto" on:click={submitNewPayment}>
            <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path></svg>
            Add new payment
          </a>
        </div>
      </div>
</Modal>
