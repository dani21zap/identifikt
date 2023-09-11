<template>
    <div class="bg-black carousel-benefits">
        <div class="container">
            <vue-slick-carousel v-bind="config" class="default-arrows">
                <template #prevArrow>
                    <button>
                        <i class="fas fa-caret-left"></i>
                    </button>
                </template>
                <template #nextArrow>
                    <button>
                        <i class="fas fa-caret-right"></i>
                    </button>
                </template>
                <div class="item">
                    Get benefits from <site-logo class="d-inline" height="32px" variant="blanco"></site-logo> partnership
                </div>
                <div class="item">
                    Sign up for free on <site-logo class="d-inline" height="32px" variant="blanco"></site-logo> <a class="bg-brand pt-2 pb-2 pr-3 pl-3 rounded-pill text-white text-sm mx-2" href="/register">Click Here</a>
                </div>
            </vue-slick-carousel>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
    components: {
        VueSlickCarousel,
    },
    data(){
        return {
            config: {
                arrows: true,
                dots: false,
            },
        }
    }
}
</script>

<style lang="scss" scoped>
    .item{
		font-size: 1.875rem/* 30px */;
    	line-height: 2.25rem/* 36px */;
        padding: 4rem 1rem;
        text-align: center;
        color: $white;
        font-weight: 500;
        a{
            display: inline-block;
        }

    }
</style>

<style lang="scss">
    .default-arrows{
        &.slick-slider{
            .slick-arrow{
                font-size: 1rem;
                box-shadow: 0 0 0 2px $white inset;
                border-radius: 50%;
                color: white;
                width: 30px;
                height: 30px;
                &::before{
                    display: none !important;
                }
                z-index: 999;
            }
            .slick-prev{
                left: -30px;
            }
            .slick-next{
                right: -30px;
            }
        }

        @include media-breakpoint-down(sm){
            &.slick-slider{
                .slick-slide{
                    padding: 0 30px;
                }
                .slick-prev{
                    left: 0;
                }
                .slick-next{
                    right: 0;
                }
            }
        }
    }
</style>
