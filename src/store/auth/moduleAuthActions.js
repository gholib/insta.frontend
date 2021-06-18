import router from '../../router';

export default {
    LOGOUT({commit}){
        commit('UNSET_TOKEN')
    },
    SIGNIN({commit}, context) {
        const data = {
            instaName: context.instaName,
            password: context.password,
        };
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        context.$http.post('login', data).then(response => {
            context.$vs.loading.close()
            commit('SET_TOKEN', [response.data.accessToken, response.data.user]);

            router.push('/')

            context.$vs.notify({
                position:'top-center',
                title: 'Успешный вход',
                text: 'С возвращением!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
            })

        }).catch(() => {
            context.$vs.loading.close()
            context.$vs.notify({
                time: 2500,
                title: 'Error',
                text: 'Ошибка авторизации',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                position: 'top-center',
                color: 'danger'
            });
        })
    },


    GET_AUTH(state) {
        if (state.token) {
            state.isAuthenticated = true
        }
    },

    REGISTER({commit}, context){
        const data = {
            name:context.name,
            password:context.password,
            instaName:context.instaName
        }
        context.$vs.loading({color: 'rgb(228, 222, 37)' })

        context.$http.post('register', data).then(response => {
            commit('SET_TOKEN', [response.data.token, response.data.user])
            context.$vs.loading.close()
            router.push('/')
            context.$vs.notify({
                position:'top-center',
                title: 'Успешная регистрация',
                text: '',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
            })
        }).catch(err => {
            context.$vs.loading.close()
            context.$vs.notify({
                position:'top-center',
                title: 'Ошибка',
                text: err.response.data.errors,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
        })

    },
}
