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
        <vs-th sort-key="name">Номер</vs-th>
        <vs-th>Название</vs-th>
        <vs-th sort-key="category">Ссылка</vs-th>
        <vs-th>Действие</vs-th>
        <vs-th class="flex justify-end">Парсить пост</vs-th>
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

              <vs-td>
                  <vx-tooltip title="Парсить пост" class="flex justify-end pr-6">
                    <feather-icon icon="RefreshCwIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="scrapPost(tr.id)" />
                  </vx-tooltip>
              </vs-td>

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
    }
  },

  mounted () {
    this.$store.dispatch('competition/GET_COMPETITIONS', this).catch(err => { console.error(err) })
    this.isMounted = true 
  }
}
</script>