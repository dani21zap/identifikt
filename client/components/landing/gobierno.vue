<template>
    <div class="bg-gray-200 py-16">
        <div class="container">
            <h2 class="text-brand font-weight-bold align-items-center fs-36px md:text-5xl text-center mb-5">"Las organizaciones son grandes en la medida que los agremiados luchen y defiendan lo que por derecho les pertenece por eso IDENTIFI-K-T es grande."</h2>
            <!-- <p class="text-2xl text-center">
                - Andres Manuel Lopez Obrador
            </p> -->
            <!-- <ul class="row list mt-5">
                <li class="col-md-4 mb-2" v-for="item in items" :key="item.text">{{item.text}}</li>
            </ul> -->
        </div>
       <!--  <div class="svg-border-rounded text-light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor">
                <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
            </svg>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            items: [
                {text: 'Shipping and Fulfillment'},
                {text: 'Chatbots'},
                {text: 'Marketing Solutions'},
                {text: 'Order and Inventory Management'},
                {text: 'Warehouse Management'},
                {text: 'Payment Gateways'},
                {text: 'Repricing and Price Optimization'},
                {text: 'Point of Sale'},
                {text: 'Localization Software'},
                {text: 'Product Information Management'},
                {text: 'Product Catalog'},
                {text: 'Innovations for Ecommerce'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .list{
        font-size: 20px;
        padding-left: 5px;
        list-style: none;
        > li {
            &::before{
				color: $brand;
                content: '\2022';
                font-weight: bold;
                display: inline-block;
                width: 1rem;
                font-size: 2rem;
            }
        }
    }
    .logo{
        // height: 16px;
        height: 30px;
        @include media-breakpoint-up(md){
        }
    }
</style>
<style type="text/css">
    .py-16 {
        padding-top: 4rem!important;
        padding-bottom: 4rem!important;
    }
    .text-5xl {
        font-size: 3rem!important;
        line-height: 1!important;
    }
    .text-3xl {
        font-size: 1.875rem!important;
        line-height: 2.25rem!important;
    }
    .text-2xl {
        font-size: 1.5rem!important;
        line-height: 2rem!important;
    }
</style>