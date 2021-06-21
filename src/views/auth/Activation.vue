<template>
    <div class="h-screen flex w-full bg-img" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Активация аккаунта</h4>
                                    <p>Пожалуйста введите активационный ключ.</p>
                                </div>
                                <vs-input
                                    name="instaName"
                                    label="Ключ активации"
                                    v-model="activationKey"
                                    class="w-full no-icon-border"/>

                                <vs-button
                                           class="vs-con-loading__container mt-4"
                                           @click="activate"
                                           :disabled="!activationKey">
                                    Активировать
                                </vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'activation',

    data() {
        return {
            loading: false,
            activationKey: null
        }
    },

    methods: {
        activate() {
            this.$vs.loading()         
            this.$http.post('users/activation', {activationKey: this.activationKey}).then(() => {
                this.$store.commit('auth/UNSET_TOKEN')
                this.$router.push('/login')
            }).finally(() => {
                this.$vs.loading.close()
            })
        }
    }
}
</script>
