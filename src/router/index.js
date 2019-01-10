import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
import Main1 from '@/components/Main'

// 上传相关
import tinymce from "../views/components/tinymce-demo.vue";
import upload from "../views/components/upload-demo.vue";

// 广告管理
import adSite from "../views/adManage/adSite.vue";
import ad from "../views/adManage/ad.vue";

// Vue.use(VueRouter);

const err401 = r =>
    require.ensure([], () => r(require("../views/error/err401.vue")), "home");
const err404 = r =>
    require.ensure([], () => r(require("../views/error/err404.vue")), "home");
const login = r =>
    require.ensure([], () => r(require("../views/login/index.vue")), "home");
const main = r =>
    require.ensure([], () => r(require("../views/home/main.vue")), "home");

// 注意 权限字段 authRule （严格区分大小写）
export const constantRouterMap = [
    {
        path: "*",
        component: err404,
        hidden: true
    },
    {
        path: "/401",
        component: err401,
        name: "401",
        hidden: true
    },
    {
        path: "/404",
        component: err404,
        name: "404",
        hidden: true
    },
    {
        path: "/500",
        component: err404,
        name: "500",
        hidden: true
    },
    {
        path: "/login",
        component: login,
        name: "登录",
        hidden: true
    },
    {
        path: "/",
        component: Home,
        redirect: "/readme",
        name: "首页",
        hidden: true,
        children: [
            { path: 'main', component: Main1 , name: 'dsds',leaf:true,hidden:true,}
        ]
    },
    {
        path: "/readme",
        component: Home,
        redirect: "/readme/main",
        icon: "shouye",
        name: "控制台",
        noDropdown: true,
        children: [
            {
                path: "main",
                component: main
            }
        ]
    },
    {
        path: "/components",
        redirect: "/components/uploadList",
        component: Home,
        name: "components",
        icon: "tongyong",
        children: [
            {
                path: "uploadList",
                name: "上传图片的展示",
                component: r =>
                    require.ensure(
                        [],
                        () => r(require("../views/components/uploadList.vue")),
                        "home"
                    )
            },
            {
                path: "tinymce",
                name: "tinymce富文本编辑器",
                component: tinymce
            },
            {
                path: "upload",
                name: "上传的demo",
                component: upload
            }
        ]
    }
];

export default new VueRouter({
    mode: 'history', //后端支持可开
    // mode: ROUTER_MODE,
    routes: constantRouterMap,
    strict: process.env.NODE_ENV !== "production"
});

export const asyncRouterMap = [
    {
        path: "/userManage",
        redirect: "/userManage/adminManage/index",
        component: Home,
        icon: "guanliyuan1",
        name: "用户管理",
        meta: {
            authRule: ["user_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "/userManage/adminManage",
                component: adminRouter,
                redirect: "/userManage/authAdmin/index",
                name: "管理组",
                icon: "0",
                meta: {
                    authRule: ["user_manage/admin_manage"]
                },
                children: [
                    {
                        path: "authAdmin",
                        component: authAdmin,
                        name: "商户管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth_admin/index"]
                        }
                    },
                    {
                        path: "authRole",
                        component: authRole,
                        name: "角色管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth_role/index"]
                        }
                    },
                    {
                        path: "authPermissionRule",
                        component: authPermissionRule,
                        name: "权限管理",
                        icon: "0",
                        meta: {
                            authRule: ["admin/auth_permission_rule/index"]
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "/adManage",
        redirect: "/adManage/adSite",
        component: Home,
        icon: "guanggao",
        name: "广告相关",
        meta: {
            authRule: ["ad_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "adSite",
                component: adSite,
                name: "广告位管理",
                icon: "0",
                meta: {
                    authRule: ["admin/ad_site/index"]
                }
            },
            {
                path: "ad",
                component: ad,
                name: "广告管理",
                icon: "0",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            }
        ]
    },
    {
        path: "/events1",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "活动相关",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "活动管理",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "活动条件",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "活动奖励",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "eventsUserPrize",
                component: ad,
                name: "奖励管理",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events2",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "开发管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "系统设置",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "审核类型",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events3",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "用户管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "用户管理",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "用户登录IP分析",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "用户奖金组",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events4",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "公告管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "公告",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "公告类型",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events5",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "核心",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "玩法类型",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "基础玩法",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "基础投注方式",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "系列玩法",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "投注方式与玩法关系",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "玩法组",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "开奖中心",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "账变类型",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "终端",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "客户终端发布",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "系列投注方式",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "玩法组所属投注方式",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events6",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "彩种",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "奖期",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "系列",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }, {
                path: "events",
                component: adSite,
                name: "彩种",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events7",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "投注",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "注单",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "追号",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }, {
                path: "events",
                component: adSite,
                name: "风险注单",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events8",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "报表统计",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "日投注报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "月投注报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "单期投注报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "日彩种报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "风险注单",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "月彩种报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "用户日报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "用户月报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "用户日彩种报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "投注方式报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "用户投注方式报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "商户日报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },{
                path: "events",
                component: adSite,
                name: "商户月报表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events9",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "商户管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "商户列表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "商户IP白名单",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "商户账户",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "商户关闭彩种",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events10",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "基础信息",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "地区",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "域名管理",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "文件上传信息",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "实时通知设置",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events11",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "管理员",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "管理员列表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "创建管理员",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "修改密码",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "管理员角色",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "创建管理员角色",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "管理员角色分配",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events12",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "资金",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "账户",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "账变",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "平台转账记录",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events13",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "奖金设置",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "奖金组",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events14",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "系统设置",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "投注限额",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "系统设置",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events15",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "日志管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "商户api记录",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "管理员日志",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events",
                component: adSite,
                name: "用户管理日志",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
    {
        path: "/events16",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "系统维护",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "events",
                component: adSite,
                name: "更新奖期列表缓存",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }
        ]
    },
];
