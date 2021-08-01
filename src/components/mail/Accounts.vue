<template>
    <div>
        <div class="flex mt-2">
            <vs-input placeholder="Инстаграм никнейм" v-model="userName" />
            <vs-input class="ml-3" placeholder="Пароль" v-model="password" type="password" />

            <vs-button class="ml-3" :disabled="accButtonDisabled" @click="save">
                Добавить
            </vs-button>
        </div>

        <vs-table class="mt-6" :data="accounts">
            <template slot="thead">
                <vs-th>Номер</vs-th>
                <vs-th>Логин</vs-th>
                <vs-th>Действия</vs-th>
            </template>
            
            <template slot-scope="{data}">
                <tbody>
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td>
                            {{indextr + 1}}
                        </vs-td>
                        <vs-td>
                            {{tr.userName}}
                        </vs-td>
                        <vs-td>
                            {{tr.userName}}
                        </vs-td>
                    </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
export default {
    name: 'accounts',

    data() {
        return {
            userName: null,
            password: null,
            accounts: []
        }
    },

    computed: {
        accButtonDisabled() {
            return !this.userName && !this.password
        }
    },

    methods: {
        save() {
            this.$vs.loading()
            this.$http.post('instagram/account', {
                userName: this.userName,
                password: this.password
            }).then(res => {
                this.accounts.push(res.data.account)
            }).finally(() => {
                this.$vs.loading.close()
            })
        },
        getAccounts() {
            this.$vs.loading()
            this.$http.get('instagram/accounts').then(res => {
                this.accounts = res.data.accounts
            }).finally(() => {
                this.$vs.loading.close()
            })
        }
    },

    mounted() {
        this.getAccounts()
    }
}
</script>