<template>
  <div id="data-list-list-view" class="data-list-container">

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="competitions">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ACTION - DROPDOWN -->
          <!-- <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Действия</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span @click="deleteSelected">Удалить</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>

          </vs-dropdown> -->

          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Создать конкурс</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th>Номер</vs-th>
        <vs-th>Название</vs-th>
        <vs-th>Ссылка</vs-th>
        <vs-th>Инстаграм никнейм</vs-th>
        <vs-th>Начало</vs-th>
        <vs-th>Конец</vs-th>
        <vs-th>Время парсинга</vs-th>
        <vs-th>дата создания</vs-th>
        <vs-th>Парсить пост</vs-th>
        <vs-th>Действие</vs-th>
      </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <p class="product-name font-medium truncate">{{ indextr + 1 }}</p>
              </vs-td>

              <vs-td class="img-container">
                <p class="product-category">{{ tr.name }}</p>
              </vs-td>

              <vs-td> 
                <vx-tooltip title="Ссылка на конкурс">
                  <a :href="'instagram/' + tr.link" target="blank">
                    {{ tr.link }}
                  </a>
                </vx-tooltip>
              </vs-td>

              <vs-td class="img-container">
                <p class="product-category">@{{ tr.instaName }}</p>
              </vs-td>
              
              <vs-td class="img-container">
                <p class="product-category">{{ tr.start | datetime}}</p>
              </vs-td>
              
              <vs-td class="img-container">
                <p class="product-category">{{ tr.end | datetime}}</p>
              </vs-td>
              
              <vs-td class="img-container">
                <p class="product-category">{{ tr.scrapTime | onlytime}}</p>
              </vs-td>
              
              <vs-td class="img-container">
                <p class="product-category">{{ tr.createdAt | datetime}}</p>
              </vs-td>          

              <vs-td>
                  <vx-tooltip title="Парсить пост">
                    <feather-icon icon="RefreshCwIcon" 
                      svgClasses="w-5 h-5 hover:text-primary stroke-current" 
                        @click.stop="scrapPost(tr.id)" />
                  </vx-tooltip>
              </vs-td>

              <vs-td class="whitespace-no-wrap flex">
                <div class="flex">
                  <vx-tooltip title="Изменить конкурс">
                    <feather-icon class="ml-3" icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                  </vx-tooltip>
                  <vx-tooltip title="Удалить конкурс">
                    <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-3" @click.stop="openConfirm(tr.id)" />
                  </vx-tooltip>
                </div>
              </vs-td>

              <template class="expand-user" slot="expand">
                <div class="con-expand-users w-full border-active-color">
                  <div class="w-full" 
                    v-for="post in tr.Post" :key="post.postShortcode">
                    <div v-if="refreshedPostId !== post.id" class="con-btns-user flex items-center justify-between mt-2">
                      <div class="con-userx flex items-center justify-start">
                        <a :href="'https://www.instagram.com/p/' +  post.postShortcode" target="_blank" 
                          rel="noopener noreferrer">
                          <span class="mr-6">{{ 'https://www.instagram.com/p/' +  post.postShortcode }}</span>
                        </a>
                      </div>
                      <div>
                        <vx-tooltip title="Дата вычисления активности">
                          <span class="ml-6">{{ post.createdAt | fromNow }}</span>
                        </vx-tooltip>
                      </div>
                      <div class="flex">
                        <vx-tooltip title="Заново вычислить активность поста">
                          <vs-button type="border" size="small" @click="refreshSrapPost(post)"
                          icon-pack="feather" icon="icon-refresh-cw" 
                            color="danger"/>
                        </vx-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
    <scrap-post @closedPopup="scrapPostActive=false" :scrapPostActive="scrapPostActive" :competitionId="competitionId" />
  </div>
</template>

<script>
import DataViewSidebar from '../../components/competition/CompetitionSidebar'
import { mapGetters } from 'vuex'
import ScrapPost from '../../components/competition/ScrapPost.vue'

export default {
  components: {
    DataViewSidebar,
    ScrapPost
  },
  data () {
    return {
      selected: [],
      selectedId:[],
      itemsPerPage: 4,
      isMounted: false,
      scrapPostActive: false,
      competitionId: null,

      addNewDataSidebar: false,
      sidebarData: {},
      deletedId:null,
      refreshPost: null,
      refreshedPostId: null
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    ...mapGetters({
      competitions: 'competition/getCompetitions'
    })
  },
  methods: {
    openConfirm(id) {
      this.deletedId = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Подтвердите удаления`,
        text: 'Безвозвратное удаление конкурса.',
        accept: this.deleteData,
        acceptText: "Подтвердить",
        cancelText: "Отменить"
      })
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    deleteData () {
      this.$store.dispatch('competition/DELETE_COMPETITION', this).catch(err => { console.error(err) })
    },
    editData (data) {
      this.sidebarData = data      
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    deleteSelected() {
      this.selectedId = this.selected.map(el => {
        return el.id
      })
    },
    scrapPost(id){
        this.competitionId = id
        this.scrapPostActive = true
    },
    refreshSrapPost(post) {
      this.refreshPost = post
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Внимание`,
        text: 'Вычисленные данные поста будут удалены и заново будут вычислятся. Вы уверены ?',
        accept: this.refreshScrap,
        acceptText: "Уверен",
        cancelText: "Отменить"
      })
    },
    refreshScrap() {
      this.$vs.loading()
      this.$http.post('instagram/refresh_scrap_post', {
        postShortcode: this.refreshPost.postShortcode,
        competitionId: this.refreshPost.competitionId
      }).then(() => {
        this.refreshedPostId = this.refreshPost.id
        this.$vs.notify({
                time: 2500,
                title: 'Success',
                text: 'Успешно запущено перевычисление!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                position: 'top-center',
                color: 'success'
            });
      }).finally(() => {
        this.$vs.loading.close()
      })
    }
  },

  mounted () {
    this.$store.dispatch('competition/GET_COMPETITIONS', this).catch(err => { console.error(err) })
    this.isMounted = true 
  }
}
</script>

<style lang="scss">
  .border-active-color{
    background: #31333d;;
  }
</style>