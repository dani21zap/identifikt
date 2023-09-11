<template>
    <section class="py-16 md:pt-24 md:pb-4">
        <div class="google-map">
            <gmap-map
            :center="center"
            :zoom="zoom"
            style="width: 100%; height: 400px;"
            >
            <!-- You can add markers or other components here -->
            </gmap-map>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        cards: {
            type: Array,
            default(){
                return [
                    {image: '/images/svg/WhyEcartAPI-1.svg', text: 'Shopping cart API integration with 40+ platforms at once'},
                    {image: '/images/svg/WhyEcartAPI-2.svg', text: '100+ methods to manage data from stores'},
                    {image: '/images/svg/WhyEcartAPI-3.svg', text: 'Minimize Total Ownership Cost'},
                    // {image: '/site/demos/seo/images/sections/WhyEcartAPI-1.svg', text: 'Shopping cart API integration with 40+ platforms at once'},
                    // {image: '/site/demos/seo/images/sections/WhyEcartAPI-2.svg', text: '100+ methods to manage data from stores'},
                    // {image: '/site/demos/seo/images/sections/WhyEcartAPI-3.svg', text: 'Minimize Total Ownership Cost'},
                ];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .py-16 {
        padding-top: 4rem!important;
        padding-bottom: 4rem!important;
    }
    .w-80 {
        width: 80%;
    }
    .item{
        & > div {
            background: white;
            padding: 2rem 1rem;
            box-shadow: 5px 5px 10px 0 rgba(0,0,0,0.2);
        }
    }
</style>
