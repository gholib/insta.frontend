<template>
    <div :key="competitionId">
        <vs-popup classContent="popup-scraper" title="Парсинг поста" :active.sync="popupActive">
            <vs-row class="flex">
                <vs-col v-for="post in posts" :key="post.postId" class="m-0 post-block" vs-w="3">
                    <vs-button type="flat" 
                            :disabled="disabledPost(post)" class="cursor-pointer p-0 m-0" 
                            @click="selectPost(post)">
                        <img :alt="post.desc | truncateWords(3)" class="FFVAD post-img" 
                            crossorigin="anonymous" decoding="auto" sizes="600px"  
                            :src="post.img">
                    </vs-button>
                </vs-col>
            </vs-row>
            <div>
                <vs-button @click="scrap" type="border" color="success" class="mr-4 mt-4">
                    Парсить
                </vs-button>
                <vs-button @click="clearSelectedPost" type="border" color="warning" class="mt-4 mr-4">
                    Сбросить
                </vs-button>
                <vs-button @click="popupActive = false" type="border" color="danger" class="mt-4">
                    Отменить
                </vs-button>
            </div>
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
            posts: [],
            selectedPost: null,
        }
    },

    watch:{
        scrapPostActive(val){
            if (val) {
                this.getPosts()
            }
        },
        popupActive(val){
            if (!val) {
               this.$emit('closedPopup', val) 
               this.clearSelectedPost()
            }
        }
    },

    methods: {
        clearSelectedPost() {
            this.selectedPost = null
        },
        openPopup(){
            this.getPosts()

            this.popupActive = true
        },
        scrap(){
            const payload = {
                postId: this.selectedPost.postId,
                competitionId: this.competitionId,
            }
            this.$vs.loading()
            this.$http.post('instagram/scrap_post', payload)
            .then(() => {
                this.popupActive = false
                this.$vs.notify({
                    title: 'Success',
                    text: 'Успешно запушен процесс вычисления данных!',
                    color: 'success',
                    time: 5000,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    position: 'top-center',
                });
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
        },
        selectPost(post) {
            this.selectedPost = post
        },
        disabledPost(post) {
            return this.selectedPost && this.selectedPost.postId !== post.postId
        }
    },
}
</script>

<style lang="scss" scoped>
    .post-img{
        width: 90%;
        height: 200px;
    }
    .con-vs-popup .vs-popup {
        width: 960px;
    }
</style>