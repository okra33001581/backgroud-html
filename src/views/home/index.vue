<template>
    <el-container class="wrapper">
        <el-header class="header" style="padding-left: 20px; color: white; background-color: rgb(98, 194, 252);">
        <!--<el-header class="header" style="padding-left: 20px; color: white;">-->
            <div class="header-logo">
                <img alt="element-logo" width="211px" height="42px"
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png">
                <!--<span>后台管理系统</span>-->
            </div>
            <div class="header-left">
                <div class="header-toggle" @click="menuShow = !menuShow">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="header-tabs-box">
                <div class="header-tabs">
                    <tabs-view v-on:listenChildParentMenuHide="menuShow = false"></tabs-view>
                </div>
            </div>
            <div class="header-middle">

                <!--<svg data-v-c8a70580="" data-v-29234bee="" aria-hidden="true" class="svg-icon"><use data-v-c8a70580="" xlink:href="#icon-fullscreen"></use></svg>-->
                <!--<i class="el-icon-edit"></i>-->
                <!--<i class="el-icon-share"></i>-->
                <!--<i class="el-icon-delete"></i>-->
                    <el-button plain @click="changeLanguage">{{$t('text.globalCurrency')}}</el-button>
                    <el-button type="primary" plain>主要按钮</el-button>
                    <el-button type="success" plain>成功按钮</el-button>
                    <el-button type="info" plain>信息按钮</el-button>
                    <el-button type="warning" plain>警告按钮</el-button>
                    <el-button type="danger" plain>危险按钮</el-button>
            </div>

                <div class="header-right">
                <el-dropdown trigger="click">
                    <!--<i class="el-icon-setting" style="margin-right: 15px"></i>-->
                    <span style="color: white;">{{username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><span @click="handlePassword">修改密码</span></el-dropdown-item>
                        <el-dropdown-item><span @click="loginOut">退出登录</span></el-dropdown-item>
                        <el-dropdown-item disabled divided>主题切换</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>


            <!--新增界面-->
            <el-dialog title="修改密码" :visible.sync="passwordFormVisible" width="85%" top="5vh">
                <el-form :model="passwordFormData" :rules="passwordFormDataRules" ref="passwordFormData">
                    <el-form-item label="原始密码" prop="old_password">
                        <el-input type="password" v-model="passwordFormData.old_password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_password">
                        <el-input type="password" v-model="passwordFormData.new_password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="check_new_password">
                        <el-input type="password" v-model="passwordFormData.check_new_password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="passwordFormVisible = !passwordFormVisible">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit('passwordFormData')" :loading="passwordLoading">提交</el-button>
                </div>
            </el-dialog>

        </el-header>

        <el-container class="container-box" v-bind:class="{ 'slide-in-left': menuShow,'slide-hide': isCollapse}">
            <el-aside style="background-color: rgb(238, 241, 246)" class="menu" width="">
                <div class="slide-toggle" :class="{'slide-toggle-open': isCollapse}" @click="toggleSideBar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>


                <el-menu
                        mode="vertical"
                        :show-timeout="200"
                        :default-active="$route.path"
                        :collapse="isCollapse"
                        background-color="rgb(3, 156, 252)"
                        text-color="white"
                        active-text-color="rgb(128, 255, 0)"
                >
                    <sidebar-item v-for="item in routers" :key="item.path" :item='item' style="text-color=#fff;active-text-color=#ffd04b"></sidebar-item>
                </el-menu>

                <!--<el-menu
                        :default-active="onRoutes"
                        :collapse="isCollapse"
                        class="el-menu-vertical-demo"
                        theme="dark"
                        unique-opened
                        router>
                    &lt;!&ndash;<sidebar-item :routes='routers'></sidebar-item>&ndash;&gt;
                    <sidebar-item v-for="item in routers" :key="item.path" :item='item' style="text-color=#fff;active-text-color=#ffd04b"></sidebar-item>
                </el-menu>-->




                <!--<el-menu-->
                        <!--class="menu"-->
                        <!--:default-active="onRoutes"-->
                        <!--:collapse="isCollapse"-->
                        <!--style="border: none;"-->
                        <!--background-color="#545c64"-->
                        <!--text-color="#fff"-->
                        <!--active-text-color="#ffd04b"-->
                        <!--unique-opened-->
                        <!--router>-->
                    <!--<sidebar-item v-for="item in routers" :key="item.path" :item='item' ></sidebar-item>-->
                <!--</el-menu>-->
            </el-aside>

            <el-main class="main">
                <!--遮板-->
                <div class="main-mask"
                     v-show="menuShow"
                     @click="menuShow = !menuShow"></div>


                <el-breadcrumb class="app-levelbar" separator="/">
                    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
                            <span v-if='item.redirect==="noredirect"||index==levelList.length-1'
                                  class="no-redirect">{{$t(item.name)}}</span>
                        <router-link v-else :to="item.redirect||item.path">{{$t(item.name)}}</router-link>
                    </el-breadcrumb-item>
                </el-breadcrumb>

                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>

</template>


<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem.vue";
import TabsView from "./TabsView.vue";
import { password } from "../../api/auth/login";
const viewName = 'VueI18n'

export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.passwordFormData.check_new_password !== "") {
                    this.$refs.passwordFormData.validateField(
                        "check_new_password"
                    );
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.passwordFormData.new_password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            menuShow: false,
            levelList: null,
            passwordLoading: false,
            passwordFormVisible: false,
            passwordFormData: {
                old_password: "",
                new_password: "",
                check_new_password: ""
            },
            passwordFormDataRules: {
                old_password: [
                    {
                        required: true,
                        message: "请输入原始密码",
                        trigger: "blur"
                    }
                ],
                new_password: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ],
                check_new_password: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur"
                    },
                    { validator: validatePass2, trigger: "blur" }
                ]
            }
        };
    },
    components: {
        SidebarItem,
        TabsView
    },
    computed: {
        ...mapGetters({
            routers: "routers"
        }),
        onRoutes() {
            return this.$route.path;
        },
        username() {
            let username = this.$store.state.admin.userName;
            return !username ? this.name : username;
        },
        isCollapse() {
            return this.$store.state.app.sidebar.opened;
        }
    },
    mounted() {},
    methods: {
        toggleSideBar() {
            this.$store.dispatch("ToggleSideBar");
        },
        changeLanguage () {
            if (this.$i18n.locale == 'en-us') {
                this.$i18n.locale = 'zh-cn'
            } else {
                this.$i18n.locale = 'en-us'
            }
        },
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if (first && (first.name !== "首页" || first.path !== "")) {
                matched = [{ name: "首页", path: "/" }].concat(matched);
            }
            this.levelList = matched;
        },
        loginOut() {
            this.$confirm("此操作将退出系统, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store.dispatch("loginOut").then(() => {
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "error",
                        message: "操作失败"
                    });
                });
        },

        // companymoney_list
        handleInfund() {
            window.location.href = '../events3/companymoney_list';
        },
        // cash_withdrawlist
        handleOutfund() {
            window.location.href = '../events3/cash_withdrawlist';
        },
        // lotteryrisk_list
        handleRiskfund() {
            window.location.href = '../events4/lotteryrisk_list';
        },
        // 显示修改密码界面
        handlePassword() {
            this.passwordFormVisible = true;
            this.passwordFormData = {
                old_password: "",
                new_password: "",
                check_new_password: ""
            };
        },
        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.passwordLoading = true;
                    let data = Object.assign({}, this.passwordFormData);
                    password(data)
                        .then(res => {
                            this.passwordLoading = false;
                            if (res.code) {
                                this.$message({
                                    message: res.message,
                                    type: "error"
                                });
                            } else {
                                this.$message({
                                    message: "修改成功",
                                    type: "success"
                                });
                                // 刷新表单
                                this.$refs["passwordFormData"].resetFields();
                                this.passwordFormVisible = false;
                                this.$store.dispatch("loginOut").then(() => {
                                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: "error",
                                message: "操作失败"
                            });
                        });
                }
            });
        }
    },
    created() {
        this.getBreadcrumb();
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>


<style type="text/scss" lang="scss">
@import "../../styles/mixin";

.el-header {
    background-color: #b3c0d1;
    /*background-color: #eef1f6;*/
    color: #333;
    padding: 0 10px;
}

.el-aside {
    color: #333;
}

.el-main {
    padding: 25px;
    position: relative;
}
.main-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    z-index: 100;
}

.move-enter-active,
.move-leave-active {
    transition: opacity 0.5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

.wrapper {
    height: 100%;
    overflow-y: hidden;
}

.container-box {
    height: 100%;
    transition: -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    overflow-y: auto;
}

.menu {
    width: 200px;
    padding-left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
}

/*.menu::-webkit-scrollbar{*/
/*display: none;*/
/*}*/

.header {
    position: relative;
    text-align: left;
    font-size: 12px;
}

.header .el-dropdown {
    @include fxied-center;
}

.header-logo {
    float: left;
    height: 100%;
    width: 190px;
    line-height: 60px;
    text-align: center;
    img {
        vertical-align: middle;
    }
}

.header-left {
    height: 100%;
    /*width: 10%;*/
    float: left;
    margin-right: 10px;
}

.header-tabs-box {
    height: 100%;
    max-width: 60%;
    float: left;
    overflow: hidden;
}

.header-tabs {
    overflow-y: hidden;
    overflow-x: scroll;
    width: 100%;
    float: left;
    height: 130%;
    line-height: 60px;
    @include clearfix;
}


.header-middle {
    position: absolute;
    right: 645px;
    display: flex;
    width: 80px;
    height: 100%;
    margin-left: 10px;
}

.header-right {
    position: absolute;
    right: 5px;
    display: flex;
    width: 80px;
    height: 100%;
    margin-left: 10px;
    .el-dropdown {
        display: flex;
        cursor: pointer;
    }
    span {
        display: inline-block;
        @include text-overflow;
    }
    i {
        margin-top: 2px;
    }
}

.app-levelbar {
    height: 25px;
    box-sizing: border-box;
    border-bottom: 1px solid #d8dce5;
}

/*宽屏时出现*/
.slide-toggle {
    display: block;
    border-radius: 4px;
    height: 30px;
    line-height: 30px;
    outline: none;
    width: 100%;
    z-index: 10;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 5px;
}

.slide-toggle span {
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: rgba(135, 141, 153, 0.8);
    margin-left: 5px;
}
.slide-toggle-open span {
    display: block;
    margin: 5px auto;
    width: 12px;
    height: 1px;
}
.slide-toggle-open {
    padding-top: 5px;
}

@media screen and (min-width: 768px) {
    .main-mask {
        display: none;
    }
}

.slide-hide {
    .menu {
        width: 64px !important;
    }
}

@media screen and (max-width: 768px) {
    .slide-hide {
        .menu {
            left: -64px !important;
        }
    }
    .slide-hide.slide-in-left {
        -webkit-transform: translate3d(64px, 0, 0) !important;
        transform: translate3d(64px, 0, 0) !important;
    }

    .menu {
        left: -60%;
        margin-right: 0;
        opacity: 1;
        position: absolute;
        top: 0;
        transition: opacity 0.3s;
        width: 60%;
        z-index: 10;
        padding: 0;
    }

    .slide-in-left {
        min-width: 0;
        opacity: 1;
        -webkit-transform: translate3d(60%, 0, 0);
        transform: translate3d(60%, 0, 0);
        overflow: initial;
    }

    .header-toggle {
        display: block;
        /*background-color: #26a2ff;*/
        border-radius: 4px;
        /*border: 1px solid #fff;*/
        height: 40px;
        margin: 10px 0;
        padding: 2px 6px;
        outline: none;
        width: 40px;
        z-index: 10;
    }

    .header-toggle span {
        display: block;
        width: 100%;
        height: 4px;
        margin: 5px auto;
        background-color: rgba(135, 141, 153, 0.8);
    }

    .header-logo {
        display: none;
    }
}
</style>
