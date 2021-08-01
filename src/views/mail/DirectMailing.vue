<template>
    <div>
        <vx-card>
            <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
                <p>
                    Прежде чем запустить рассылку, сначало добавьте аккаунты с которых хотите отправить сообщение
                </p>
            </vs-alert>
            <vs-tabs>
                <vs-tab label="Аккаунты">
                    <accounts />
                </vs-tab>
                <vs-tab label="Рассылка">
                    <direct />
                </vs-tab>
            </vs-tabs>
        </vx-card>
    </div>
</template>

<script>
import Accounts from '../../components/mail/Accounts.vue'
import Direct from '../../components/mail/Direct.vue'
export default {
  components: { Accounts, Direct },
    name: 'direct-mailing'
}
</script>