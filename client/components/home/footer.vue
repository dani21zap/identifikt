<template>
    <div class="bg-black" style="box-shadow: 0px -1px 1px 0px #0d0d0d;">
        <div class="container pt-12 pb-12 text-white d-flex flex-wrap">
                <div class="col-md-3 pt-2">
                    <!-- <span class='text-landing-primary'> Contact </span> -->
                    <p class='text-gray-500 pt-2'><span class='fas fa-envelope ft-option'></span> <a href="mailto:admin@identifikt.com" class="text-gray-500">admin@identifikt.com</a></p>
                </div>                
                <div class="col-md-3 pt-2">
                    <div class="text-gray-500 d-flex flex-column">
                        <nuxt-link to="/terms-and-conditions" class="text-gray-500">Terms and Conditions</nuxt-link>
                    </div>
                </div>
                <div class="col-md-3 pt-2">
                    <a href="#"><i class="fab fa-whatsapp"></i></a>
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
        border-radius: 25px;
        background: #f44b04;
        padding: 7px;
        color: white;
        text-align: center;
        font-size: 17px;
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
