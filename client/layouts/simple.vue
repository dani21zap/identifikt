<template>
    <div class="layout-simple">
        <Nuxt />
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