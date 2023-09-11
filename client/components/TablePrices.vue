<template>
    <div :class="$style.wrapper" class="shadow">
        <header :class="$style.header"><slot name="header"></slot></header>
        <div :class="$style.content"><slot></slot></div>

    </div>
</template>

<style lang="scss" module>
    .wrapper{
		border-radius: $border-radius;
		background: white;
    }
    .header{
		text-align: center;
		color: white;
		background: $brand;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-top-left-radius: 0.25rem/* 4px */;
    	border-top-right-radius: 0.25rem/* 4px */;
        height: 8rem;
    }
    .content{
        ul{
			list-style: none;
			margin-bottom: 0;
			padding-left: 0;
            li{
				padding: 1rem;
				text-align: center;
            }
            li:not(:last-child){
                border-bottom: 1px solid $gray-200;
            }
            .fa-check-circle{
				color: $brand;
            }
        }
    }
</style>
