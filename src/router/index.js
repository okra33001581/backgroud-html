import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}
import Home from "../views/home/index.vue";
// 网站管理
import qrconfig_list from "../views/hwin/site-management/qrconfig_list.vue";
import rotationconfig_list from "../views/hwin/site-management/rotationconfig_list.vue";
import systemconfig_imagelist from "../views/hwin/site-management/systemconfig_imagelist.vue";
import systemconfig_set from "../views/hwin/site-management/systemconfig_set.vue";
import floatwindowconfig_list from "../views/hwin/site-management/floatwindowconfig_list.vue";
import information_companylist from "../views/hwin/site-management/information_companylist.vue";
import information_list from "../views/hwin/site-management/information_list.vue";
import lotterygroup_sort from "../views/hwin/site-management/lotterygroup_sort.vue";
import proxyiptables_blackcontainlist from "../views/hwin/site-management/proxyiptables_blackcontainlist.vue";
import marquee_list from "../views/hwin/notice-management/marquee_list.vue";
import message_list from "../views/hwin/notice-management/message_list.vue";
import notice_list from "../views/hwin/notice-management/notice_list.vue";
import push_list from "../views/hwin/notice-management/push_list.vue";
import betlimit_list from "../views/hwin/play-management/betlimit_list.vue";
import lotteryrisk_list from "../views/hwin/play-management/lotteryrisk_list.vue";
import pgame_list from "../views/hwin/play-management/pgame_list.vue";
import proxygames_list from "../views/hwin/play-management/proxygames_list.vue";
import finance_index from "../views/hwin/report-management/finance_index.vue";
import operation_profit from "../views/hwin/report-management/operation_profit.vue";
import pgame_playlist from "../views/hwin/report-management/pgame_playlist.vue";
import preport_profit from "../views/hwin/report-management/preport_profit.vue";
import user_report from "../views/hwin/report-management/user_report.vue";
import user_infolist from "../views/hwin/user-management/user_infolist.vue";
import user_inoutcash from "../views/hwin/user-management/user_inoutcash.vue";
import user_mainlist from "../views/hwin/user-management/user_mainlist.vue";
import user_monitor from "../views/hwin/user-management/user_monitor.vue";
import user_reviewlist from "../views/hwin/user-management/user_reviewlist.vue";
import user_usercard from "../views/hwin/user-management/user_usercard.vue";
import user_userlayer from "../views/hwin/user-management/user_userlayer.vue";
import user_validuser from "../views/hwin/user-management/user_validuser.vue";
import proxycommission_list from "../views/hwin/delegate-management/proxycommission_list.vue";
import proxycommission_proxylist from "../views/hwin/delegate-management/proxycommission_proxylist.vue";
import activity_list from "../views/hwin/event-management/activity_list.vue";
import cash_orderlist from "../views/hwin/fund-management/cash_orderlist.vue";
import cash_paysetting from "../views/hwin/fund-management/cash_paysetting.vue";
import cash_rakeback from "../views/hwin/fund-management/cash_rakeback.vue";
import cash_withdrawlist from "../views/hwin/fund-management/cash_withdrawlist.vue";
import companymoney_list from "../views/hwin/fund-management/companymoney_list.vue";
import fastpaymoney_list from "../views/hwin/fund-management/fastpaymoney_list.vue";
import layerchart_index from "../views/hwin/fund-management/layerchart_index.vue";
import manualpayconfirm_list from "../views/hwin/fund-management/manualpayconfirm_list.vue";
import manualpay_save from "../views/hwin/fund-management/manualpay_save.vue";
import payaccount_list from "../views/hwin/fund-management/payaccount_list.vue";
import paygroup_list from "../views/hwin/fund-management/paygroup_list.vue";
import transferorder_list from "../views/hwin/fund-management/transferorder_list.vue";
import tripartite_list from "../views/hwin/fund-management/tripartite_list.vue";
import userbetscheck_list from "../views/hwin/fund-management/userbetscheck_list.vue";
import log_adminlog from "../views/hwin/log-management/log_adminlog.vue";
import log_domainlog from "../views/hwin/log-management/log_domainlog.vue";
import log_loginlog from "../views/hwin/log-management/log_loginlog.vue";
// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";
import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
import Main1 from '@/components/Main'

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
    {
        path: "/hwin-agentmanagent",
        redirect: "/events/events",
        component: Home,
        icon: "agentmanagent",
        name: "route.benefit_management",
        meta: {
            authRule: ["优惠活动"]
        },
        // noDropdown: true,
        children: [
            {
                path: "information_list",
                component: information_list,
                icon: "event_list",
                name: 'route.event_list',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "event_model",
                name: 'route.event_model',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "event_audit",
                name: 'route.event_audit',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "event_process",
                name: 'route.event_process',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                icon: "points_mall",
                name: 'route.points_mall',
                meta: {
                    authRule: ["hwin/information_list"]
                }
            },
            {
                path: "information_list",
                component: information_list,
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
        path: "/hwin-Userlog",
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
