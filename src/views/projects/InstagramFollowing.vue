<template>
<div class="layout--main">
    <div class="content-wrapper">

        <div class="router-view">
          <div class="router-content">
            <div class="content-area__content">
              <transition mode="out-in">
                <div id="profile-page">
                    <div class="profile-header">
                        <div class="relative">
                            <div class="cover-container rounded-t-lg">
                                <img :src="user_info.cover_img" alt="user-profile-cover" class="responsive header-img block">
                            </div>
                            <div class="profile-img-container pointer-events-none">
                                <div>
                                    <vs-avatar class="user-profile-img" :src="user_info.profile_img" size="85px" />
                                </div>
                                <div class="profile-actions pointer-events-auto flex">
                                    <!-- <vs-button icon-pack="feather" radius icon="icon-edit-2"></vs-button>
                                    <vs-button icon-pack="feather" radius icon="icon-settings" class="ml-2 lg:ml-4"></vs-button> -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- COL AREA -->
                    <div class="vx-row mt-5">
                        <div class="vx-col w-full lg:w-1/4">
                            <vx-card title="" class="mt-base">
                                <p class="text-white">
                                    Подпишитесь на мой инстаграм аккаунт
                                     <a href="https://www.instagram.com/n.daler20/" target="_blank">@n.daler20</a>
                                     и введите свой никнейм чтобы скачать чек-лист
                                </p>
                                <vs-input placeholder="инстаграм никнейм" class="w-full mb-3 mt-6" v-model="instaName">

                                </vs-input>

                                <vs-button :disabled="!instaName" @click="download">
                                    Скачать
                                </vs-button>
                            </vx-card>
                        </div>
                    </div>

                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      user_info: {
        profile_img: require('@/assets/images/projects/ava.png'),
        cover_img: require('@/assets/images/projects/header.png')
      },
      instaName: null,
    }
  },
  methods: {
      download(){
          this.$vs.loading()
          this.$http.post('/projects/download-checklist', {instaName: this.instaName.toLowerCase()}).then(res => {
              this.instaName = null
              const anchor = document.createElement('a')
                anchor.href = res.data.fileLink;
				anchor.setAttribute("download", 'digitalist.pdf')
				anchor.style.display = "none"
				document.body.appendChild(anchor)
				setTimeout(function() {
					anchor.click()
					document.body.removeChild(anchor)
				}, 66)
              this.$vs.notify({
                title: 'Успешно',
                text: 'Через несколько секунд начнется скачивание',
                color: 'success',
                time: 3000,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                position: 'top-center',
            });
          }).finally(() => {
              this.$vs.loading.close()
          })
      }
  },
}

</script>
<style lang="scss">
@import "@/assets/scss/vuexy/pages/profile.scss";

@media (max-width: 1000px) {
    .header-img{
        width: 100%;
    }
}
</style>
