<template>
    <div :key="competitionId">
        <vs-popup classContent="popup-example" title="Instagram scraper" :active.sync="popupActive" fullscreen>
            <vs-row class="flex">
                <vs-col v-for="post in posts" :key="post.postId" class="m-3 post-block" vs-w="3">
                    <span class="cursor-pointer" @click="scrap(post.postId)">
                        <img :alt="post.desc" class="FFVAD post-img" crossorigin="anonymous" decoding="auto" sizes="600px"  :src="post.img">
                    </span>
                </vs-col>
            </vs-row>
        </vs-popup>
    </div>
</template>


<script>
export default {
    props: ['competitionId', 'scrapPostActive'],
    data() {
        return {
            popupActive: false,
            postId: null,
            posts: []
        }
    },

    watch:{
        // competitionId(){
        //     this.getPosts()
        // },
        scrapPostActive(val){
            if (val) {
                this.getPosts()
            }
        },
        popupActive(val){
            if (!val) {
               this.$emit('closedPopup', val) 
            }
        }
    },

    methods: {
        openPopup(){
            this.getPosts()

            this.popupActive = true
        },
        scrap(postId){
            this.$vs.loading()
            this.$http.post('scrap', {postId, competitionId: this.competitionId})
            .then(res => {
                console.log('ddd', res.data);
                this.popupActive = false
            }).finally(() => {
                this.popupActive = false
                this.$vs.loading.close()
            })
        },
        getPosts(){
            if (this.posts.length === 0) {
                this.$vs.loading()
                this.$http.get('instagram/user/posts')
                .then(res => {
                    this.posts = res.data.collector.map(el => {
                        return {
                            img: el.display_url,
                            postId: el.shortcode,
                            desc: el.description
                        }
                    })

                    this.popupActive = true
                }).finally(() => {
                    this.$vs.loading.close()
                })
            }else{
                this.popupActive = true
            }
        }
    },
}
</script>

<style lang="scss">
    .post-img{
        width: 100%;
        height: 100%;
    }
</style>