<template>
    <div>
        <div class="demo-alignment">
            <div v-if="!animationActive">
                <vs-button @click="startRandomizer" type="border" color="success">
                    Запустить
                </vs-button>
            </div>
            <div v-show="animationActive" class="fill-row-loading">
                <div :id="[`loading-${type}`]" class="vs-con-loading__container loading-example">
                </div>
            </div>
            <div class="w-full">
                <vs-alert v-if="activeUser" active="true" title="Победитель" color="rgb(231, 154, 23)">
                    {{activeUser.username}}
                </vs-alert>
            </div>
        </div>
        <vs-table ref="table" pagination :max-items="10" search :data="comFollowers">

            <template slot="thead">
                <vs-th>Number</vs-th>
                <vs-th>Instagram nikname</vs-th>
                <vs-th>
                    picture
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <tbody>
                    <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td class="sm-p-0">
                            {{tr.id}}
                        </vs-td>
                        <vs-td class="sm-p-0">
                            {{tr.username}}
                        </vs-td>
                        <vs-td>
                            <img crossorigin class="user-picture ml-2" :src="tr.picture" />
                        </vs-td>
                    </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>


<script>
export default {
    name: 'randomizer',

    data() {
        return {
            followers: [],
            type: 'radius',
            animationActive: false,
            activeUser: null
        }
    },

    computed:{
        comFollowers() {
            if (this.activeUser) {
                return [this.activeUser]
            }
            return this.followers
        }
    },

    methods: {
        getFollowers() {
            this.$vs.loading()
            this.$http.get('instagram/user/followers').then(res => {
                this.followers = res.data.collector
                this.followers = this.followers.map((el, index) => {
                    return {
                        id: index + 1,
                        username: el.username,
                        picture: el.profile_pic_url
                    }
                })
            }).finally(() => {
                this.$vs.loading.close()
            }) 
        },
        animate() {
            this.$vs.loading({
                container: `#loading-${this.type}`,
                type: this.type,
                color: 'success'
            })
        },
        startRandomizer() {
            this.animationActive = true

            setTimeout(() => {
                const id = this.getRandomArbitrary(1, this.followers.length)
                this.setActiveUser(id)
                this.animationActive = false
            }, 5000);
        },
        getRandomArbitrary(min, max) {
            let number = Math.random() * (max + 1 - min) + min
            return Math.floor(number)
        },
        setActiveUser(id) {
            const index = this.followers.findIndex(el => el.id === id)
            
            if (index !== -1) {
                this.activeUser = this.followers[index]

                setTimeout(() => {
                    this.activeUser = null
                }, 10000);
            }
        },
    },

    mounted() {
        this.getFollowers()
        this.animate()
    }
}
</script>

<style lang="scss">
    .user-picture{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .fill-row-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .loading-example {
    width: 120px;
    float: left;
    height: 120px;
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.05);
      transform: translate(0, 4px);
    }
    h4 {
      z-index: 40000;
      position: relative;
      text-align: center;
      padding: 10px;
    }
    &.activeLoading {
      opacity: 0 !important;
      transform: scale(0.5);
    }
  }
}
</style>