<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "Добавить новую" : "Редактировать" }} конкурс</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
        <!-- NAME -->
        <vs-input label="Название" v-model="dataName" class="mt-5 w-full" name="item-name" />
        <vs-input label="Ссылка" v-model="dataLink" class="mt-5 w-full mb-3" name="item-name" />
        <label>Начало</label>
        <flat-pickr class="w-full mb-3" :config="configFromdateTimePicker" v-model="start" />
        <label>Конец</label>
        <flat-pickr class="w-full mb-3" :config="configTodateTimePicker" v-model="end" />
        <label>Время парсинга</label>
        <flat-pickr class="w-full mb-3" :config="configTimePicker" v-model="scrapTime" label="To Date" />
        <vs-input type="number" v-model="commentCoin" class="mt-1 w-full" label="Баллы за коментария" />
        <vs-input type="number" v-model="likeCoin" class="mt-5 w-full" label="Баллы за лайк" />
      </div>
      <div class="flex flex-wrap items-center p-6">
        <vs-button class="mr-6" @click="submitData">Сохранить</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Отменить</vs-button>
      </div>
    </component>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
    flatPickr
  },
  data() {
    return {
      dataImg: null,
      dataLink: null,
      dataId: null,
      dataName: "",
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      start: null,
      end: null,
      scrapTime: null,
      configFromdateTimePicker: {
        minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()),
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: new Date(),
      },
      configTimePicker: {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
      },
      commentCoin: 1.5,
      likeCoin: 5,
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      },
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },
  methods: {
    initValues() {
      if (this.data.id) return;
      this.dataId = null;
      this.dataName = "";
      this.dataLink = "";
      this.start = ''
      this.end = ''
      this.scrapTime = ''
      this.likeCoin = 5
      this.commentCoin = 1.5
    },
    submitData() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.data !== null && this.data.id >= 0) {
            this.$store
              .dispatch("competition/UPDATE_COMPETITION", this)
              .catch((err) => {
                console.error(err);
              });
          } else {
            this.$store
              .dispatch("competition/CREATE_COMPETITION", this)
              .catch((err) => {
                console.error(err);
              });
          }
          this.$emit("closeSidebar");
          this.initValues();
        }
      });
    },

    dispayError(text) {
      this.$vs.notify({
        time: 2500,
        title: 'Ошибка',
        text: text,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        position: 'top-center',
        color: 'warning'
      })
    },
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        const { id, link, name, start, end, scrapTime, likeCoin, commentCoin } = this.data
        this.dataId = id;
        this.dataName = name;
        this.dataLink = link;
        this.start = start
        this.end = end
        this.scrapTime = scrapTime
        this.likeCoin = likeCoin
        this.commentCoin = commentCoin
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
