<template>
    <div v-if="results">
        <vs-table ref="table" pagination :max-items="18" search :data="results">

            <template slot="thead">
                <vs-th>Number</vs-th>
                <vs-th>Instagram nikname</vs-th>
                <!-- <vs-th sort-key="name">comments</vs-th> -->
                <vs-th sort-key="price">likes</vs-th>
                <vs-th>total coin</vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td class="sm-p-0">
                            {{tr.id + 1}}
                            <img v-if="tr.id == 0" class="crown-img ml-2" src="@/assets/images/crown.svg" />
                            <img v-if="tr.id == 1" class="crown-img ml-2" src="@/assets/images/second.svg" />
                            <img v-if="tr.id == 2" class="crown-img ml-2" src="@/assets/images/third.svg" />
                        </vs-td>
                        <vs-td class="sm-p-0">
                            {{tr.userName}}
                        </vs-td>
                        <!-- <vs-td>
                            {{tr.comments}}
                        </vs-td> -->
                        <vs-td class="sm-p-0">
                            {{tr.likes}}
                        </vs-td>
                        <vs-td class="sm-p-0">
                            {{tr.totalCoin}}
                        </vs-td>
                    </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>


<script>
export default {
    data(){
        return{
            results: null,
            commentCoin: 1.35,
            likeCount: 5
        }
    },

    methods:{
        getResults(){
            this.$vs.loading({color: 'rgb(228, 222, 37)' })
            this.$http.get('/results/' + this.$route.params.link).then(res => {
                this.filterResults(res.data)
            }).finally(() => {
                this.$vs.loading.close()
            })
        },

        filterResults(data) {
            data = data.map(el => {
                if (el.userName === 'jovid1242') {
                    return {
                        userName: '@' + el.userName,
                        likes: 0,
                        comments: 0,
                        totalCoin: 0
                    }
                }
                return {
                    userName: '@' + el.userName,
                    likes: el.likes,
                    comments: el.comments,
                    totalCoin: el.coins
                }
            })
            this.results = data.sort((a, b) => {
                if (Number(a.totalCoin) < Number(b.totalCoin)) {
                    return 1
                }
                return -1
            })
            this.results = this.results.map((el, index) => {
                return {
                    id: index,
                    userName: el.userName,
                    likes: el.likes,
                    comments: el.comments,
                    totalCoin: el.totalCoin
                }
            })
        }
    },

    mounted(){
        this.getResults()
    }
}
</script>

<style lang="scss">
    .crown-img{
        width: 25px;
        height: 25px;
    }
    @media (max-width: 1000px) {
        .sm-p-0{
            padding: 3px !important;
        }
    }
</style>