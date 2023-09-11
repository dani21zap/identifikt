<template>
<div class="animate__animated animate__fadeIn">
    <home-header></home-header>
    <Nuxt keep-alive />
    <CookieControl>
        <template v-slot:bar class="cookieButtons">
            <h3 >{{ $cookies.text.barTitle }}</h3>
            <p class= "text-xs">{{ $cookies.text.barDescription }}</p>
        </template>
        <template v-slot:modal>
            <h3>Manage consent preferences</h3>
            <p class= "text-xs">Adjust your data preferences for this browser. Disabling data collection may affect your experience and the services we can offer you.</p>
        </template>
    </CookieControl>
    <home-footer></home-footer>
</div>
</template>

<script>
export default {
};
</script>

<style>
    .cookieControl button {
        border-radius: 50rem;
        font-weight: 600;
        font-size: 0.75rem;
        margin: 0.5rem !important;
    }
    .cookieControl__BarButtons{
        margin: 0!important;
        justify-content: center;
    }
    .cookieControl__ModalClose button{
        border-radius: 80rem;
    }

    .cookieControl__ModalInputWrapper {
        font-size: 0.75rem;
    }

    .cookieControl__ModalButtons {
        margin: 0;
        justify-content: center;
    }

    .cookieControl__ModalButtons button {
        width: 100%;
        padding:0.5rem;
        margin: 0.5rem !important;
    }

    .cookieControl__ModalContent h3 {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>