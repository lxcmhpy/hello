<template>
  <!-- 左菜单 -->
  <div>
    <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" @select="changeMenu">
      <template v-for="item in currentSlideMenu">
        <el-submenu :index="item.name" :key="item.id" v-if="item.children.length!=0">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="subItem.name" v-for="subItem in item.children" :key="subItem.id" @click="clicSubmenu">
            {{subItem.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.name" :key="item.id" v-if="item.children.length==0" >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </template>
        </el-menu-item>

      </template>
    </el-menu>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
  export default {
    name: "backSubmenu",
    data() {
      return {
        allMenuList: null,
        currentSlideMenu: [],
        isCollapse: false,
      };
    },
    props: {
      selectedHeadMenu: String
    },
    methods: {
      //切换菜单
      changeMenu(key, keyPath) {
          // debugger;
        //   debugger;
        this.$store.commit('SET_ACTIVE_INDEX_STO', key);
        this.$router.push({name: key});
        // if(this.$store.state.system.activeIndexSto.indexOf(key)==-1){
        //   this.$store.commit('SET_ACTIVE_INDEX_STO', key);
        //   this.$router.push({name: key});
        // }
      },
      //展开菜单
      handleOpen(key, keyPath) {
      },
      //收起菜单
      handleClose(key, keyPath) {
      },
      clicSubmenu() {
        // debugger
        this.$store.commit("setCaseNumber", '');
      },
      //获取侧边栏菜单
      getSlideMenu(val) {
          // debugger;
        this.currentSlideMenu = [];
        let _this = this
        if(this.allMenuList){
          for(let i =0;i<this.allMenuList.length;i++) {
            let item = this.allMenuList[i];
            // let key = val.split(/(-menu-)/gi);
            // if (item.name == key[0]) {
            if (item.name == val||(item.path == val)) {
                if (item.children && item.children.length) {
                    item.children.forEach(item2 => {
                        _this.currentSlideMenu.push(item2);
                    })
                }
            }
          }
        }

//      console.log('currentSlideMenu',this.currentSlideMenu)
      }
    },
    mounted() {
        // debugger;
        this.allMenuList=this.menu;
        // console.log('mounted this.allMenuList',this.allMenuList)
        this.getSlideMenu(this.headActiveNav); //默认加载案件办理的二级菜单
    },
    created() {
    },
    computed: {
        ...mapGetters(['menu','headActiveNav'])
    },
    activated(){
      this.allMenuList=this.menu;
      this.getSlideMenu(this.headActiveNav);
    },
    watch: {
      selectedHeadMenu: function (val, oldVal) {
          // debugger;
          this.getSlideMenu(val);
      },
      //监听menu
      menu(val){
          // debugger;
        this.allMenuList=this.menu;
        this.getSlideMenu(this.headActiveNav); //默认加载案件办理的二级菜单
      }
    }
  };
</script>
<style lang="scss">
.el-menu {
  .el-submenu {
    .el-menu {
      li {
        padding-left: 54px !important;
      }
    }
    .el-submenu__title {
      .el-submenu__icon-arrow {
        border: 6px solid;
        border-color: #9FA3AF transparent transparent transparent;
        font-size: 0;
        margin-top: -1px;
        -webkit-transform: rotateZ(-90deg);
        -ms-transform: rotate(-90deg);
        transform: rotateZ(-90deg);
        transform-origin: 50% 25%;
      }
    }
  }
}
//菜单展开
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
  -webkit-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  transform: rotateZ(0deg);
}
</style>
<style lang="scss" src="@/assets/css/main.scss"></style>
