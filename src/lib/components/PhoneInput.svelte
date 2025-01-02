<script lang="ts">
    import { countries, type CountryInterface } from "country-codes-flags-phone-codes";
    import PhoneNumberUtil from 'google-libphonenumber'; 
    import { onMount } from "svelte";

    const phoneUtil = PhoneNumberUtil.PhoneNumberUtil.getInstance();

    export let value: string = "";
    export let phone: string = "";
    export let country: string = "ES";
    export let selectedCountry: CountryInterface|undefined = countries.find(country => country.dialCode === "+34");
    export let valid: boolean = true;
    export let error: boolean = false;

    let lastCountries: CountryInterface[] = [];

    const setSelectedCountry = (newSelectedCountry: CountryInterface) => {
        selectedCountry = newSelectedCountry;
        country = selectedCountry.code;
        const selectedCountryHistory = JSON.parse(localStorage.getItem("selectedCountryHistory") || "[]");
        localStorage.setItem("selectedCountryHistory", JSON.stringify([selectedCountry, ...selectedCountryHistory.filter(country => country.code !== selectedCountry.code)]));
        updateValue();
    }

    const updateValue = () => {
        value = country + phone;
        valid = !phone ? false : phoneUtil.isValidNumber(phoneUtil.parse(phone, country));
        error = !valid;
    }

    onMount(() => {
        if (value) setValue(value);
        lastCountries = JSON.parse(localStorage.getItem("selectedCountryHistory") || "[]");
    })

    const setValue = (newValue: string) => {
        const newCountryCode = newValue.substring(0, 2);
        const newPhoneNumber = newValue.substring(2);
        country = newCountryCode;
        phone = newPhoneNumber;
        selectedCountry = countries.find(country => country.code === newCountryCode);
        updateValue();
    }

    if (value) setValue(value);

</script>

<div class="input-group">
    <button data-bs-toggle="dropdown" type="button" class="btn dropdown-toggle dropdown-toggle-split" aria-expanded="false">
        <div class="mr-1">
            {selectedCountry?.flag}{selectedCountry?.dialCode}
        </div>
    </button> 
    <input type="text" class="form-control" bind:value={phone} placeholder="Phone number" on:keyup={updateValue} class:is-invalid={!valid}>
    <div class="dropdown-menu dropdown-menu-start max-h-[250px] overflow-y-scroll" style="">
        {#if lastCountries && lastCountries.length > 0}
            {#each lastCountries as country}
                <button type="button" class="dropdown-item" on:click="{() => setSelectedCountry(country)}">
                    {country.flag} {country.name}
                </button>
            {/each}
            <hr>
        {/if}
        {#each countries as country}
            
            <button type="button" class="dropdown-item" on:click="{() => setSelectedCountry(country)}">
                {country.flag} {country.name}
            </button>
        {/each}
    </div>
</div>