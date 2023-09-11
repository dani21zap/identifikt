<template>
    <div class="bg-gray-200 pt-2 pb-24 pt-5">
        <div class="container">
            <h2 class="text-3xl md:text-5xl text-weight-bold text-center mb-8 md:mb-12">Data You Can Work With</h2>
            <div class="row justify-content-start">
                <div class="col-md-4 col-my d-flex flex-row justify-content-start align-items-center" v-for="item in items" :key="item.img">
                    <img class="d-inline-block mr-3" :src="item.img" :alt="item.text">
                    <span class="text-weight-bold text-2xl md:text-xl">{{item.text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            items: [
                {img: '/images/svg/Icon-Shipments.svg', text: 'Shipments'},
                {img: '/images/svg/Icon-Products.svg', text: 'Products'},
                {img: '/images/svg/Icon-Customers.svg', text: 'Customers'},
                {img: '/images/svg/Icon-Orders.svg', text: 'Orders'},
                {img: '/images/svg/Icon-ProductVariants.svg', text: 'Product variants'},
                {img: '/images/svg/Icon-Prices.svg', text: 'Prices'},
                {img: '/images/svg/Icon-OrderStatus.svg', text: 'Order status'},
                {img: '/images/svg/Icon-Categories.svg', text: 'Categories'},
                {img: '/images/svg/Icon-Taxes.svg', text: 'Taxes'},
                {img: '/images/svg/Icon-AbandonedOrders.svg', text: 'Abandoned orders'},
                {img: '/images/svg/Icon-Images.svg', text: 'Images'},
                {img: '/images/svg/Icon-Coupons.svg', text: 'Coupons'},
                {img: '/images/svg/Icon-Reviews.svg', text: 'Reviews'},
                {img: '/images/svg/Icon-Atributes.svg', text: 'Attributes'},
                {img: '/images/svg/Icon-LiveShippingRates.svg', text: 'Live shipping rates'},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .bg-match-gray {
        background-color: #e5e7eb!important;
    }
    img{
        width: 30px;
        @include media-breakpoint-up(md){
            width: 50px;
        }
    }
</style>

<style type="text/css">
    .text-5xl {
        font-size: 3rem!important;
        line-height: 1!important;
    }
    .text-3xl {
        font-size: 1.875rem!important;
        line-height: 2.25rem!important;
    }
</style>
