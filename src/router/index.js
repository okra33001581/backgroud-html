import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}
import Home from "../views/home/index.vue";
// 网站管理


import event_list from "../views/new/event/event_list.vue";
import event_lottery from "../views/new/event/event_lottery.vue";
import event_model from "../views/new/event/event_model.vue";
import event_process from "../views/new/event/event_process.vue";
import points_mall from "../views/new/event/points_mall.vue";
import prize_audit from "../views/new/event/prize_audit.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
import Main1 from '@/components/Main'

import information_list from "../views/new/event/event_list.vue";


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
        name: "route.mainpage",
        hidden: true,
        children: [
            {path: 'main', component: Main1, name: 'dsds', leaf: true, hidden: true,}
        ]
    },
    {
        path: "/readme",
        component: Home,
        redirect: "/readme/main",
        icon: "mainpage",
        name: "route.dashboard",
        noDropdown: true,
        children: [
            {
                path: "main",
                component: main
            }
        ]
    },
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
        icon: "delete",
        name: "route.privilege_management",
        meta: {
            authRule: ["user_manage"]
        },
        // noDropdown: true,
        // children: [
        //     {
        //         path: "/userManage/adminManage",
        //         component: adminRouter,
        //         redirect: "/userManage/authAdmin/index",
        //         name: "route.manage_group",
        //         icon: "delete",
        //         meta: {
        //             authRule: ["user_manage/admin_manage"]
        //         },
                children: [
                    {
                        path: "authAdmin",
                        component: authAdmin,
                        name: "route.member_management",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_admin/index"]
                        }
                    },
                    {
                        path: "authRole",
                        component: authRole,
                        name: "route.role_management",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_role/index"]
                        }
                    },
                    {
                        path: "authPermissionRule",
                        component: authPermissionRule,
                        name: "route.privilege_management",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_permission_rule/index"]
                        }
                    }
                ]
            // }
    },
    {
        path: "/hwin-sitemanagement",
        redirect: "/proxyiptables/authAdmin/index",
        component: Home,
        icon: "sitemanagement",
        name: "route.user_management",
        meta: {
            authRule: ["用户管理"]
        },
        // noDropdown: true,
        children: [
           {
                path: "information_list",
                component: information_list,
                icon: "user_list",
                name: 'route.user_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "layer_list",
                name: 'route.layer_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "vip_list",
                name: 'route.vip_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "bankcard_list",
                name: 'route.bankcard_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "account_monitor",
                name: 'route.account_monitor',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },

        ]
    },
    {
        path: "/hwin-usermanagement",
        redirect: "/events/events",
        component: Home,
        icon: "usermanagement",
        name: "route.game_management",
        meta: {
            authRule: ["用户管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "verdor_list",
                name: 'route.verdor_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "game_type_list",
                name: 'route.game_type_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "game_list",
                name: 'route.game_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "game_risk",
                name: 'route.game_risk',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },

        ]
    },
    {
        path: "/hwin-fundmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "fundmanagement",
        name: "route.fund_management",
        meta: {
            authRule: ["现金管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "online_recharge",
                name: 'route.online_recharge',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "transfer_fund",
                name: 'route.transfer_fund',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "withdraw_audit",
                name: 'route.withdraw_audit',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "pay_out",
                name: 'route.pay_out',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "manual_adjust",
                name: 'route.manual_adjust',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "transaction_list",
                name: 'route.transaction_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "paymethod_list",
                name: 'route.paymethod_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "financial_set",
                name: 'route.financial_set',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },

        ]
    },
    {
        path: "/hwin-playmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "playmanagement",
        name: "route.report_management",
        meta: {
            authRule: ["游戏管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "operation",
                name: 'route.operation',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "user",
                name: 'route.user',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "platform",
                name: 'route.platform',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "financial",
                name: 'route.financial',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "delegate",
                name: 'route.delegate',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
/*    event_list.vue
    event_lottery.vue
    event_model.vue
    event_process.vue
    points_mall.vue
    prize_audit.vue*/
    {
        path: "/hwin-agentmanagent",
        redirect: "/events/events",
        component: Home,
        icon: "benefit_management",
        name: "route.benefit_management",
        meta: {
            authRule: ["优惠活动"]
        },
        // noDropdown: true,
        children: [
            {
                path: "event_list",
                component: event_list,
                icon: "event_list",
                name: 'route.event_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "event_model",
                component: event_model,
                icon: "event_model",
                name: 'route.event_model',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "prize_audit",
                component: prize_audit,
                icon: "event_audit",
                name: 'route.event_audit',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "event_process",
                component: event_process,
                icon: "event_process",
                name: 'route.event_process',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "points_mall",
                component: points_mall,
                icon: "points_mall",
                name: 'route.points_mall',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "event_lottery",
                component: event_lottery,
                icon: "lottery",
                name: 'route.lottery',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
    {
        path: "/hwin-reportmanagent",
        redirect: "/events/events",
        component: Home,
        icon: "reportmanagent",
        name: "route.operate_analysis",
        meta: {
            authRule: ["运营分析"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "user_trend",
                name: 'route.user_trend',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "event_assess",
                name: 'route.event_assess',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "key_monitor",
                name: 'route.key_monitor',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "multi_search",
                name: 'route.multi_search',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
    {
        path: "/hwin-eventmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "eventmanagement",
        name: "route.template_management",
        meta: {
            authRule: ["前端排版"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "template",
                name: 'route.template',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "common_module",
                name: 'route.common_module',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "custom_set",
                name: 'route.custom_set',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
    {
        path: "/hwin-noticemanagement",
        redirect: "/events/events",
        component: Home,
        icon: "noticemanagement",
        name: "route.system_management",
        meta: {
            authRule: ["系统管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "basis_set",
                name: 'route.basis_set',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "register_login",
                name: 'route.register_login',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "delegate_set",
                name: 'route.delegate_set',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "ip_restrict",
                name: 'route.ip_restrict',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "sys_warn",
                name: 'route.sys_warn',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "user_log",
                name: 'route.user_log',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "operate_log",
                name: 'route.operate_log',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
    {
        path: "/hwin-Userlog",
        redirect: "/events/events",
        component: Home,
        icon: "Userlog",
        name: "route.privilege_management",
        meta: {
            authRule: ["权限管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "department",
                name: 'route.department',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "job",
                name: 'route.job',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "member",
                name: 'route.member',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    },
    {
        path: "/hwin-Userlog1",
        redirect: "/events/events",
        component: Home,
        icon: "Userlog",
        name: "route.telecomm",
        meta: {
            authRule: ["内容通讯"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "site_message",
                name: 'route.site_message',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "chat",
                name: 'route.chat',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "notice",
                name: 'route.notice',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },{
                path: "information_list",
                component: information_list,
                icon: "push_message",
                name: 'route.push_message',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },{
                path: "information_list",
                component: information_list,
                icon: "article",
                name: 'route.article',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
        ]
    }
];
