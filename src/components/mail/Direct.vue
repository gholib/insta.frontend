<template>
    <div class="mt-3">
        <div class="w-1/2">
            <vs-alert color="warning" icon="new_releases" active="true" class="mt-5">
                <p>
                    Введите аккаунты конкурентов
                </p>
            </vs-alert>

            <vs-chips color="rgb(145, 32, 159)" class="mt-3"
                placeholder="Инстаграм никнейм" v-model="accounts" icon-pack="feather" 
                remove-icon="icon-trash-2">
                <vs-chip
                :key="chip"
                @click="remove(chip)"
                v-for="chip in accounts"
                closable
                icon-pack="feather"
                close-icon="icon-trash-2">
                {{ chip }}
                </vs-chip>
            </vs-chips>

             <vs-textarea class="mt-3" label="Сообщение рассылки" v-model="message" />

             <vs-button :disabled="disabled" @click="start">
                Запустить рассылку
             </vs-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'direct',

    data() {
        return {
            instaName: '',
            accounts: [],
            message: ''
        }
    },

    computed: {
        disabled() {
            return this.message == '' || this.accounts.length < 1
        }
    },

    methods: {
        remove (item) {
            this.accounts.splice(this.accounts.indexOf(item), 1)
        },

        start() {
            this.$vs.loading()
            this.$http.post('instagram/direct/mail', {
                accounts: this.accounts,
                message: this.message
            }).then(() => {
                this.$displaySuccess('Рассылка запущена')
            }).finally(() => {
                this.$vs.loading.close()
            })
        }
    }
}
</script>