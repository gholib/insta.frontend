export default{
    async GET_COMPETITIONS({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        await context.$http.get('competitions').then(response => {
            context.$vs.loading.close()
            commit('SET_COMPETITIONS', response.data.competitions)
        }).finally(() => {
            context.$vs.loading.close()
        })
    },
    CREATE_COMPETITION({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        let formData = {
            name: context.dataName,
            link: context.dataLink
        }
        context.$http.post('competition', formData).then(response => {
            commit('SET_COMPETITION', response.data.competition)            
            context.$vs.loading.close()
        }).catch(err => {
            context.$vs.loading.close()
            context.$vs.notify({
                time: 2500,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                position: 'top-center',
                color: 'danger'
            });
        })
    },
    UPDATE_COMPETITION({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        let formData = {
            name: context.dataName,
            link: context.dataLink
        }
        context.$http.put(`competition/${context.data.id}`, formData).then(() => {
            commit('UPDATE_COMPETITION', {id: context.data.id, ...formData})
            context.$vs.loading.close()
        }).catch(err => {            
            context.$vs.loading.close()
            context.$vs.notify({
                time: 2500,
                title: 'Error',
                text: err.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                position: 'top-center',
                color: 'danger'
            });
        })
    },
    DELETE_COMPETITION({commit}, context){
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        context.$http.delete(`competition/${context.deletedId}`).then(() => {
            commit('DELETE_COMPETITION', context.deletedId)
            context.$vs.loading.close()
        })
    },
}