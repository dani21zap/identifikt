<template>
<div class="app-content">

    <b-form>
        <h3>Store Setup</h3>
        <div class="box">
            <div class="row">
                <div class="col-md">
                    <b-form-group
                    label="Store name"
                    >
                        <b-form-input></b-form-input>
                    </b-form-group>
                    <b-form-group
                    label="Store URL"
                    >
                        <b-form-input></b-form-input>
                    </b-form-group>
                </div>
                <div class="col-md-auto">
                    <div class="col-lg-auto order-lg-2 text-center">
                        <img class="border rounded" width="200" src="https://via.placeholder.com/250">
                    </div>
                </div>
            </div>
        </div>

        <h4>Store credentials</h4>
        <div class="box">
            <b-form-group label="Token" class="mb-0">
                <b-form-input></b-form-input>
            </b-form-group>
        </div>

        <h4>Store Access Token</h4>
        <div class="box">
            <b-form-group class="mb-0">
                <b-input-group>
                    <template #append>
                        <b-button variant="primary"><i class="fas fa-clipboard"></i></b-button>
                    </template>
                    <b-form-input></b-form-input>
                </b-input-group>
            </b-form-group>
        </div>

        <div class="d-flex justify-content-end">
            <b-button variant="light" class="text-danger mr-3">Delete Store</b-button>
            <b-button variant="primary" v-wave>

                Save
            </b-button>
        </div>
    </b-form>
</div>

</template>
