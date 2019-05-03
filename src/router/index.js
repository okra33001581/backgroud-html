import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}
import Home from "../views/home/index.vue";
// 网站管理
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

import event_list from "../views/new/event/event_list.vue";
import event_lottery from "../views/new/event/event_lottery.vue";
import event_model from "../views/new/event/event_model.vue";
import event_process from "../views/new/event/event_process.vue";
import points_mall from "../views/new/event/points_mall.vue";
import prize_audit from "../views/new/event/prize_audit.vue";


import ag_log_list 	from "../views/hwin/third-game-management/ag_log_list.vue";
import ag_user_turnover_list 	from "../views/hwin/third-game-management/ag_user_turnover_list.vue";
import basketball_list 	from "../views/hwin/third-game-management/basketball_list.vue";
import football_list 	from "../views/hwin/third-game-management/football_list.vue";
import ga_user_turnover_list 	from "../views/hwin/third-game-management/ga_user_turnover_list.vue";
import game_type_list 	from "../views/hwin/third-game-management/game_type_list.vue";
import game_type_list_detail 	from "../views/hwin/third-game-management/game_type_list_detail.vue";
import third_plat_list 	from "../views/hwin/third-game-management/third_plat_list.vue";
import merchant_game_list 	from "../views/hwin/third-game-management/merchant_game_list.vue";

// 管理组相关
import adminRouter from "../views/userManage/admin/router.vue";
import authAdmin from "../views/userManage/admin/authAdmin.vue";
import authRole from "../views/userManage/admin/authRole.vue";


import department from "../views/userManage/admin/department.vue";

import authPermissionRule from "../views/userManage/admin/authPermissionRule.vue";
import Main1 from '@/components/Main'

// import information_list from "../views/new/event/event_list.vue";


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
        name: "商户管理",
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
                icon: "delete",
                meta: {
                    authRule: ["user_manage/admin_manage"]
                },
                children: [
                    {
                        path: "authAdmin",
                        component: authAdmin,
                        name: "商户管理",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_admin/index"]
                        }
                    },
                    {
                        path: "department",
                        component: department,
                        name: "部门管理",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_role/index"]
                        }
                    },
                    {
                        path: "authRole",
                        component: authRole,
                        name: "角色管理",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_role/index"]
                        }
                    },
                    {
                        path: "authPermissionRule",
                        component: authPermissionRule,
                        name: "权限管理",
                        icon: "delete",
                        meta: {
                            authRule: ["admin/auth_permission_rule/index"]
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "/hwin-sitemanagement",
        redirect: "/proxyiptables/authAdmin/index",
        component: Home,
        icon: "sitemanagement",
        name: "网站管理",
        meta: {
            authRule: ["网站管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxyiptables_blackcontainlist",
                component: proxyiptables_blackcontainlist,
                icon: "proxyiptables_blackcontainlist",
                name: 'ip限制',
                // title: 'route.externalLink',
                // meta: { title: 'route.externalLink', icon: 'list' }
                // meta: {
                //     title: "directivePermission",
                //     authRule: ["hwin/proxyiptables_blackcontainlist"]
                //     // ,
                //     // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                // }
            },
            {
                path: "systemconfig_set",
                component: systemconfig_set,
                name: "系统参数设定",
                icon: "systemconfig_set",
                meta: {
                    authRule: ["hwin/systemconfig_set"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "systemconfig_imagelist",
                component: systemconfig_imagelist,
                name: "网站图标设置",
                icon: "systemconfig_imagelist",
                meta: {
                    authRule: ["hwin/systemconfig_imagelist"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000022'] //页面需要的权限
                }
            },
            {
                path: "qrconfig_list",
                component: qrconfig_list,
                name: "二维码设置",
                icon: "qrconfig_list",
                meta: {
                    authRule: ["hwin/qrconfig_list"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "rotationconfig_list",
                component: rotationconfig_list,
                name: "首页轮播设定",
                icon: "rotationconfig_list",
                meta: {
                    authRule: ["hwin/rotationconfig_list"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "floatwindowconfig_list",
                component: floatwindowconfig_list,
                name: "浮动窗口",
                icon: "floatwindowconfig_list",
                meta: {
                    authRule: ["hwin/floatwindowconfig_list"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "information_list",
                component: information_list,
                name: "资讯中心",
                icon: "information_list",
                meta: {
                    authRule: ["hwin/information_list"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "information_companylist",
                component: information_companylist,
                name: "公司简介",
                icon: "information_companylist",
                meta: {
                    authRule: ["hwin/information_companylist"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            },
            {
                path: "lotterygroup_sort",
                component: lotterygroup_sort,
                name: "菜单排序",
                icon: "lotterygroup_sort",
                meta: {
                    authRule: ["hwin/lotterygroup_sort"]
                    // ,
                    // btnPermissions: ['admin','supper','normal', 'okra0000021'] //页面需要的权限
                }
            }
        ]
    },
    /*{
        path: "/events1",
        redirect: "/events/events",
        component: Home,
        icon: "merchantmanagement",
        name: "商户账号管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxy_grouplist",
                component: proxy_grouplist,
                name: "商户组别列表",
                icon: "proxy_grouplist",
                meta: {
                    authRule: ["events/new-event-conditions/index"]
                }
            },
            {
                path: "proxy_memberlist",
                component: proxy_memberlist,
                name: "商户成员列表",
                icon: "proxy_memberlist",
                meta: {
                    authRule: ["events/new-event-prizes/index"]
                }
            }
        ]
    },*/
    {
        path: "/hwin-usermanagement",
        redirect: "/events/events",
        component: Home,
        icon: "usermanagement",
        name: "用户管理",
        meta: {
            authRule: ["用户管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "user_mainlist",
                component: user_mainlist,
                name: "用户列表",
                icon: "user_mainlist",
                meta: {
                    authRule: ["hwin/user_mainlist"]
                }
            },
            {
                path: "user_infolist",
                component: user_infolist,
                name: "会员资料",
                icon: "user_infolist",
                meta: {
                    authRule: ["hwin/user_infolist"]
                }
            },
            {
                path: "user_userlayer",
                component: user_userlayer,
                name: "层级管理",
                icon: "user_userlayer",
                meta: {
                    authRule: ["hwin/user_userlayer"]
                }
            },
            {
                path: "user_usercard",
                component: user_usercard,
                name: "用户银行卡管理",
                icon: "user_usercard",
                meta: {
                    authRule: ["hwin/user_usercard"]
                }
            },
            {
                path: "user_validuser",
                component: user_validuser,
                name: "有效会员列表",
                icon: "user_validuser",
                meta: {
                    authRule: ["hwin/user_validuser"]
                }
            },
            {
                path: "user_inoutcash",
                component: user_inoutcash,
                name: "出入款统计",
                icon: "user_inoutcash",
                meta: {
                    authRule: ["hwin/user_inoutcash"]
                }
            },
            {
                path: "user_reviewlist",
                component: user_reviewlist,
                name: "安全信息审核",
                icon: "user_reviewlist",
                meta: {
                    authRule: ["hwin/user_reviewlist"]
                }
            },
            {
                path: "user_monitor",
                component: user_monitor,
                name: "多账户监测",
                icon: "user_monitor",
                meta: {
                    authRule: ["hwin/user_monitor"]
                }
            }
        ]
    },
    {
        path: "/hwin-fundmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "fundmanagement",
        name: "现金管理",
        meta: {
            authRule: ["现金管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "paygroup_list",
                component: paygroup_list,
                name: "支付类型管理",
                icon: "paygroup_list",
                meta: {
                    authRule: ["hwin/paygroup_list"]
                }
            },
            {
                path: "cash_paysetting",
                component: cash_paysetting,
                name: "支付设定",
                icon: "cash_paysetting",
                meta: {
                    authRule: ["hwin/cash_paysetting"]
                }
            },
            {
                path: "payaccount_list",
                component: payaccount_list,
                name: "入款账号管理",
                icon: "payaccount_list",
                meta: {
                    authRule: ["hwin/payaccount_list"]
                }
            },
            {
                path: "tripartite_list",
                component: tripartite_list,
                name: "三方账号管理",
                icon: "tripartite_list",
                meta: {
                    authRule: ["hwin/tripartite_list"]
                }
            },
            /*{
                path: "layerchart_index",
                component: layerchart_index,
                name: "层级状态图",
                icon: "layerchart_index",
                meta: {
                    authRule: ["hwin/layerchart_index"]
                }
            },*/
            {
                path: "userbetscheck_list",
                component: userbetscheck_list,
                name: "即时稽核",
                icon: "userbetscheck_list",
                meta: {
                    authRule: ["hwin/userbetscheck_list"]
                }
            },
            {
                path: "transferorder_list",
                component: transferorder_list,
                name: "转账记录",
                icon: "transferorder_list",
                meta: {
                    authRule: ["hwin/transferorder_list"]
                }
            },
            {
                path: "cash_withdrawlist",
                component: cash_withdrawlist,
                name: "出款管理",
                icon: "cash_withdrawlist",
                meta: {
                    authRule: ["hwin/cash_withdrawlist"]
                }
            },
            {
                path: "manualpay_save",
                component: manualpay_save,
                name: "人工存提",
                icon: "manualpay_save",
                meta: {
                    authRule: ["hwin/manualpay_save"]
                }
            },
            {
                path: "manualpayconfirm_list",
                component: manualpayconfirm_list,
                name: "人工存提审核",
                icon: "manualpayconfirm_list",
                meta: {
                    authRule: ["hwin/manualpayconfirm_list"]
                }
            },
            {
                path: "companymoney_list",
                component: companymoney_list,
                name: "公司入款记录",
                icon: "companymoney_list",
                meta: {
                    authRule: ["hwin/companymoney_list"]
                }
            },
            {
                path: "fastpaymoney_list",
                component: fastpaymoney_list,
                name: "三方入款记录",
                icon: "fastpaymoney_list",
                meta: {
                    authRule: ["hwin/fastpaymoney_list"]
                }
            },
            {
                path: "cash_orderlist",
                component: cash_orderlist,
                name: "账变列表",
                icon: "cash_orderlist",
                meta: {
                    authRule: ["hwin/cash_orderlist"]
                }
            },
            {
                path: "cash_rakeback",
                component: cash_rakeback,
                name: "返水",
                icon: "cash_rakeback",
                meta: {
                    authRule: ["hwin/cash_rakeback"]
                }
            }
        ]
    },
    {
        path: "/hwin-playmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "playmanagement",
        name: "游戏管理",
        meta: {
            authRule: ["游戏管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxygames_list",
                component: proxygames_list,
                name: "三方游戏",
                icon: "proxygames_list",
                meta: {
                    authRule: ["hwin/proxygames_list"]
                }
            },
            {
                path: "pgame_list",
                component: pgame_list,
                name: "彩票游戏",
                icon: "pgame_list",
                meta: {
                    authRule: ["hwin/pgame_list"]
                }
            },
            {
                path: "betlimit_list",
                component: betlimit_list,
                name: "投注限额",
                icon: "betlimit_list",
                meta: {
                    authRule: ["hwin/betlimit_list"]
                }
            },
            {
                path: "lotteryrisk_list",
                component: lotteryrisk_list,
                name: "游戏风控",
                icon: "lotteryrisk_list",
                meta: {
                    authRule: ["hwin/lotteryrisk_list"]
                }
            }
        ]
    },
    {
        path: "/hwin-agentmanagent",
        redirect: "/events/events",
        component: Home,
        icon: "agentmanagent",
        name: "与代理佣金",
        meta: {
            authRule: ["与代理佣金"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxycommission_list",
                component: proxycommission_list,
                name: "代理默认配额设置",
                icon: "proxycommission_list",
                meta: {
                    authRule: ["hwin/proxycommission_list"]
                }
            },
            {
                path: "proxycommission_proxylist",
                component: proxycommission_proxylist,
                name: "代理推广链接",
                icon: "proxycommission_proxylist",
                meta: {
                    authRule: ["hwin/proxycommission_proxylist"]
                }
            }
        ]
    },
    {
        path: "/hwin-reportmanagent",
        redirect: "/events/events",
        component: Home,
        icon: "reportmanagent",
        name: "报表管理",
        meta: {
            authRule: ["报表管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "operation_profit",
                component: operation_profit,
                name: "运营报表",
                icon: "operation_profit",
                meta: {
                    authRule: ["hwin/operation_profit"]
                }
            },
            {
                path: "user_report",
                component: user_report,
                name: "用户报表",
                icon: "user_report",
                meta: {
                    authRule: ["hwin/user_report"]
                }
            }, {
                path: "finance_index",
                component: finance_index,
                name: "财务报表",
                icon: "finance_index",
                meta: {
                    authRule: ["hwin/finance_index"]
                }
            }, {
                path: "pgame_playlist",
                component: pgame_playlist,
                name: "彩票报表",
                icon: "pgame_playlist",
                meta: {
                    authRule: ["hwin/pgame_playlist"]
                }
            }, {
                path: "preport_profit",
                component: preport_profit,
                name: "平台报表",
                icon: "preport_profit",
                meta: {
                    authRule: ["hwin/preport_profit"]
                }
            }
        ]
    },
    {
        path: "/hwin-eventmanagement",
        redirect: "/events/events",
        component: Home,
        icon: "eventmanagement",
        name: "活动管理",
        meta: {
            authRule: ["活动管理"]
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
            {
                path: "activity_list",
                component: activity_list,
                name: "活动列表",
                icon: "activity_list",
                meta: {
                    authRule: ["hwin/activity_list"]
                }
            }
        ]
    },
    {
        path: "/hwin-noticemanagement",
        redirect: "/events/events",
        component: Home,
        icon: "noticemanagement",
        name: "公告管理",
        meta: {
            authRule: ["公告管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "message_list",
                component: message_list,
                name: "站内信-推送列表",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/message_list"]
                }
            },
            /*{
                path: "push_list",
                component: push_list,
                name: "移动端推送",
                icon: "push_list",
                meta: {
                    authRule: ["hwin/push_list"]
                }
            },*/
            {
                path: "notice_list",
                component: notice_list,
                name: "公告列表",
                icon: "notice_list",
                meta: {
                    authRule: ["hwin/notice_list"]
                }
            }, {
                path: "marquee_list",
                component: marquee_list,
                name: "跑马灯列表",
                icon: "marquee_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }
        ]
    },
    {
        path: "/hwin-noticemanagement22",
        redirect: "/events/events22",
        component: Home,
        icon: "noticemanagement",
        name: "第三方游戏管理",
        meta: {
            authRule: ["公告管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "game_type_list",
                component: game_type_list,
                name: "游戏类别管理",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/message_list"]
                }
            },{
                path: "game_type_list_detail",
                component: game_type_list_detail,
                name: "游戏类别明细管理",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/message_list"]
                }
            },
            {
                path: "third_plat_list",
                component: third_plat_list,
                name: "第三方平台",
                icon: "notice_list",
                meta: {
                    authRule: ["hwin/notice_list"]
                }
            }, {
                path: "ag_user_turnover_list",
                component: ag_user_turnover_list,
                name: "AG流水",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }, {
                path: "ga_user_turnover_list",
                component: ga_user_turnover_list,
                name: "GA流水",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }, {
                path: "ag_log_list",
                component: ag_log_list,
                name: "AG日志管理",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }, {
                path: "football_list",
                component: football_list,
                name: "竞彩-足球",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }, {
                path: "basketball_list",
                component: basketball_list,
                name: "竞彩-篮球",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }, {
                path: "merchant_game_list",
                component: merchant_game_list,
                name: "商户游戏管理",
                icon: "message_list",
                meta: {
                    authRule: ["hwin/marquee_list"]
                }
            }

        ]
    },
    {
        path: "/hwin-Userlog",
        redirect: "/events/events",
        component: Home,
        icon: "Userlog",
        name: "日志管理",
        meta: {
            authRule: ["日志管理"]
        },
        // noDropdown: true,
        children: [
            {
                path: "log_domainlog",
                component: log_domainlog,
                name: "域名统计",
                icon: "log_domainlog1",
                meta: {
                    authRule: ["hwin/log_domainlog1"]
                }
            },
            {
                path: "log_loginlog",
                component: log_loginlog,
                name: "用户登入查询",
                icon: "log_adminlog",
                meta: {
                    authRule: ["hwin/log_loginlog"]
                }
            },
            {
                path: "log_adminlog",
                component: log_adminlog,
                name: "管理员日志列表",
                icon: "log_adminlog",
                meta: {
                    authRule: ["hwin/log_adminlog"]
                }
            }
        ]
    }
];
