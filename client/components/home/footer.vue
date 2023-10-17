<template>
    <div class="bg-primary">
        <div class="justify-content-between align-content-center container pt-12 pb-12 text-white d-flex flex-wrap">
                <div class="flex-md-column pt-3">
                    <span class='text-landing-primary'>Contacténos </span>
                    <p class='pt-2'>
                        <span class='fas fa-envelope ft-option'></span> <a href="mailto:admin@identifikt.com" class="text-gray-500">admin@identifikt.com</a>
                    </p>
                    <p class='pt-2'>
                        <span class='fas fa-solid fa-phone ft-option'></span> <a href="tel:62-7523-4595" class="text-gray-500">62-7523-4595</a>
                    </p>
                </div>                
                <div class="flex-md-column pt-3">
                    <span class='text-landing-primary'>Páginas</span>
                    <!-- <div class="text-gray-500 d-flex flex-column"> -->
                        <p class='pt-2'><nuxt-link to="/terms-and-conditions" class="text-gray-500">Terms and Conditions</nuxt-link></p>
                    <!-- </div7> -->
                </div>
                <div class="flex-md-column pt-2">
                    
                </div>
            </div>
        <hr>
        <div class="col-md p-3">
            <p class="text-md mb-1 text-center text-gray-500">Copyrights © {{$dayjs().format('YYYY')}} All Rights Reserved by IDENTIFIKT.com</p>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .ft-option{
        color: white;
        text-align: center;
        font-size: 17px;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }
    .links{
        a{
			color: $primary;
            font-size: 18px;
        }
    }
    .social-links{
        font-size: 24px;
        a{
			color: $primary;
            display: inline-block;
            margin-left: 10px;
        }
    }
</style>
