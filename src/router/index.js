import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import { ROUTER_MODE } from "../config/app";

import Home from "../views/home/index.vue";


// begin
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
// import floatwindowconfig_list from "../views/hwin/site-management/floatwindowconfig_list.vue";
// import information_companylist from "../views/hwin/site-management/information_companylist.vue";
// import information_list from "../views/hwin/site-management/information_list.vue";
// import lotterygroup_sort from "../views/hwin/site-management/lotterygroup_sort.vue";
// import proxyiptables_blackcontainlist from "../views/hwin/site-management/proxyiptables_blackcontainlist.vue";
// import qrconfig_list from "../views/hwin/site-management/qrconfig_list.vue";
// import rotationconfig_list from "../views/hwin/site-management/rotationconfig_list.vue";
// import systemconfig_imagelist from "../views/hwin/site-management/systemconfig_imagelist.vue";
// import systemconfig_set from "../views/hwin/site-management/systemconfig_set.vue";
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
import proxy_grouplist from "../views/hwin/merchant-management/proxy_grouplist.vue";
import proxy_memberlist from "../views/hwin/merchant-management/proxy_memberlist.vue";

// end

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


import transaction from "../views/transaction/transaction.vue";
import account from "../views/transaction/account.vue";
import platTransfer from "../views/transaction/plat-transfer.vue";
import auditType from "../views/develop/auditType.vue";
import sysSetting from "../views/develop/sysSetting.vue";
import user from "../views/user/user.vue";
import userIpAnalysis from "../views/user/userIpAnalysis.vue";
import userPrizeSet from "../views/user/userPrizeSet.vue";

import paymentplatforms from "../views/basis/payment-platforms.vue";
import paymenttypes from "../views/basis/payment-types.vue";
import terminals from "../views/basis/terminals.vue";
import thirdplats from "../views/basis/third-plats.vue";
import transactiontypes from "../views/basis/transaction-types.vue";

import riskProjects from "../views/lottery/riskProjects.vue";
import trail from "../views/lottery/trail.vue";
import projects from "../views/lottery/projects.vue";
import draw from "../views/lottery/draw.vue";
import warn from "../views/lottery/warn.vue";
import exception from "../views/lottery/exception.vue";

import issueprofits from "../views/report/issue-profits.vue";
import lotterymonthprofits from "../views/report/lottery-month-profits.vue";
import lotterywayprofits from "../views/report/lottery-way-profits.vue";
import statlotteryprofits from "../views/report/stat-lottery-profits.vue";
import statmonthprofits from "../views/report/stat-month-profits.vue";
import statprofits from "../views/report/stat-profits.vue";
import teamlotteryprofits from "../views/report/team-lottery-profits.vue";
import teamlotterywayprofits from "../views/report/team-lottery-way-profits.vue";
import teammonthprofits from "../views/report/team-month-profits.vue";
import teamprofits from "../views/report/team-profits.vue";
import terminalprofits from "../views/report/terminal-profits.vue";
import userlotteryprofits from "../views/report/user-lottery-profits.vue";
import userlotterywayprofits from "../views/report/user-lottery-way-profits.vue";
import usermonthprofits from "../views/report/user-month-profits.vue";
import userprofits from "../views/report/user-profits.vue";
import wayprofits from "../views/report/way-profits.vue";


import merchantApiLog from "../views/log/merchantApiLog.vue";
import adminLog from "../views/log/adminLog.vue";
import userManageLog from "../views/log/userManageLog.vue";

import term from "../views/setting/term.vue";
import serial from "../views/setting/serial.vue";
import lottery from "../views/setting/lottery.vue";
import prizeGroup from "../views/setting/prizeGroup.vue";
import betLimit from "../views/setting/betLimit.vue";
// import sysSetting from "../views/setting/sysSetting.vue";
import district from "../views/setting/district.vue";
import domain from "../views/setting/domain.vue";
import sysconfigs from "../views/setting/sys-configs.vue";

import bulletin from "../views/bulletin/bulletin.vue";
import bulletinType from "../views/bulletin/bulletinType.vue";

import merchant from "../views/merchant/merchant.vue";
import merchantIp from "../views/merchant/merchantIp.vue";
import merchantAccount from "../views/merchant/merchantAccount.vue";
import merchantLottery from "../views/merchant/merchantLottery.vue";

import neweventconditions from "../views/events/new-event-conditions.vue";
import neweventprizes from "../views/events/new-event-prizes.vue";
import neweventuserprizes from "../views/events/new-event-user-prizes.vue";
import newevents from "../views/events/new-events.vue";


import accounts from "../views/fund/accounts.vue";
import bankdeposits from "../views/fund/bank-deposits.vue";
import commissionsstatistics from "../views/fund/commissions-statistics.vue";
import deposits from "../views/fund/deposits.vue";
import dividends from "../views/fund/dividends.vue";
import exceptiondeposits from "../views/fund/exception-deposits.vue";
import losecommissions from "../views/fund/lose-commissions.vue";
import manualdeposits from "../views/fund/manual-deposits.vue";
import manualwithdraws from "../views/fund/manual-withdraws.vue";
import plattransferrecords from "../views/fund/plat-transfer-records.vue";
import transactions from "../views/fund/transactions.vue";
import withdrawals from "../views/fund/withdrawals.vue";


import adinfos from "../views/ad/ad-infos.vue";
import adlocations from "../views/ad/ad-locations.vue";
import adtypes from "../views/ad/ad-types.vue";

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
            {path: 'main', component: Main1, name: 'dsds', leaf: true, hidden: true,}
        ]
    },
    {
        path: "/readme",
        component: Home,
        redirect: "/readme/main",
        icon: "mainpage",
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
        icon: "delete",
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
        icon: "delete",
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
        path: "/hwin",
        redirect: "/proxyiptables/authAdmin/index",
        component: Home,
        icon: "sitemanagement",
        name: "网站管理",
        meta: {
            authRule: ["ad_manage"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxyiptables_blackcontainlist",
                component: proxyiptables_blackcontainlist,
                name: "IP限制",
                icon: "proxyiptables_blackcontainlist",
                meta: {
                    authRule: ["admin/auth_admin/index"]
                }
            },
            {
                path: "systemconfig_set",
                component: systemconfig_set,
                name: "系统参数设定",
                icon: "systemconfig_set",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "systemconfig_imagelist",
                component: systemconfig_imagelist,
                name: "网站图标设置",
                icon: "systemconfig_imagelist",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "qrconfig_list",
                component: qrconfig_list,
                name: "二维码设置",
                icon: "qrconfig_list",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "rotationconfig_list",
                component: rotationconfig_list,
                name: "首页轮播设定",
                icon: "rotationconfig_list",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "floatwindowconfig_list",
                component: floatwindowconfig_list,
                name: "浮动窗口",
                icon: "floatwindowconfig_list",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "information_list",
                component: information_list,
                name: "资讯中心",
                icon: "information_list",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "information_companylist",
                component: information_companylist,
                name: "公司简介",
                icon: "information_companylist",
                meta: {
                    authRule: ["admin/ad/index"]
                }
            },
            {
                path: "lotterygroup_sort",
                component: lotterygroup_sort,
                name: "菜单排序",
                icon: "lotterygroup_sort",
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
    },
    {
        path: "/events122",
        redirect: "/events/events",
        component: Home,
        icon: "usermanagement",
        name: "用户管理",
        meta: {
            authRule: ["develop/sysSetting/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "user_mainlist",
                component: user_mainlist,
                name: "用户列表",
                icon: "user_mainlist",
                meta: {
                    authRule: ["develop/sysSetting/index"]
                }
            },
            {
                path: "user_infolist",
                component: user_infolist,
                name: "会员资料",
                icon: "user_infolist",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_userlayer",
                component: user_userlayer,
                name: "层级管理",
                icon: "user_userlayer",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_usercard",
                component: user_usercard,
                name: "用户银行卡管理",
                icon: "user_usercard",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_validuser",
                component: user_validuser,
                name: "有效会员列表",
                icon: "user_validuser",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_inoutcash",
                component: user_inoutcash,
                name: "出入款统计",
                icon: "user_inoutcash",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_reviewlist",
                component: user_reviewlist,
                name: "安全信息审核",
                icon: "user_reviewlist",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            },
            {
                path: "user_monitor",
                component: user_monitor,
                name: "多账户监测",
                icon: "user_monitor",
                meta: {
                    authRule: ["develop/auditType/index"]
                }
            }
        ]
    },
    {
        path: "/events3",
        redirect: "/events/events",
        component: Home,
        icon: "fundmanagement",
        name: "现金管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "paygroup_list",
                component: paygroup_list,
                name: "支付类型管理",
                icon: "paygroup_list",
                meta: {
                    authRule: ["user/user/index"]
                }
            },
            {
                path: "cash_paysetting",
                component: cash_paysetting,
                name: "支付设定",
                icon: "cash_paysetting",
                meta: {
                    authRule: ["user/userIpAnalysis/index"]
                }
            },
            {
                path: "payaccount_list",
                component: payaccount_list,
                name: "入款账号管理",
                icon: "payaccount_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "tripartite_list",
                component: tripartite_list,
                name: "三方账号管理",
                icon: "tripartite_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "layerchart_index",
                component: layerchart_index,
                name: "层级状态图",
                icon: "layerchart_index",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "userbetscheck_list",
                component: userbetscheck_list,
                name: "即时稽核",
                icon: "userbetscheck_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "transferorder_list",
                component: transferorder_list,
                name: "转账记录",
                icon: "transferorder_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "cash_withdrawlist",
                component: cash_withdrawlist,
                name: "出款管理",
                icon: "cash_withdrawlist",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "manualpay_save",
                component: manualpay_save,
                name: "人工存提",
                icon: "manualpay_save",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "manualpayconfirm_list",
                component: manualpayconfirm_list,
                name: "人工存提审核",
                icon: "manualpayconfirm_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "companymoney_list",
                component: companymoney_list,
                name: "公司入款记录",
                icon: "companymoney_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "fastpaymoney_list",
                component: fastpaymoney_list,
                name: "三方入款记录",
                icon: "fastpaymoney_list",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "cash_orderlist",
                component: cash_orderlist,
                name: "账变列表",
                icon: "cash_orderlist",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            },
            {
                path: "cash_rakeback",
                component: cash_rakeback,
                name: "返水",
                icon: "cash_rakeback",
                meta: {
                    authRule: ["user/userPrizeSet/index"]
                }
            }
        ]
    },
    {
        path: "/events4",
        redirect: "/events/events",
        component: Home,
        icon: "playmanagement",
        name: "游戏管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxygames_list",
                component: proxygames_list,
                name: "三方游戏",
                icon: "proxygames_list",
                meta: {
                    authRule: ["bulletin/bulletin/index"]
                }
            },
            {
                path: "pgame_list",
                component: pgame_list,
                name: "彩票游戏",
                icon: "pgame_list",
                meta: {
                    authRule: ["bulletin/bulletinType/index"]
                }
            },
            {
                path: "betlimit_list",
                component: betlimit_list,
                name: "投注限额",
                icon: "betlimit_list",
                meta: {
                    authRule: ["bulletin/bulletinType/index"]
                }
            },
            {
                path: "lotteryrisk_list",
                component: lotteryrisk_list,
                name: "游戏风控",
                icon: "lotteryrisk_list",
                meta: {
                    authRule: ["bulletin/bulletinType/index"]
                }
            }
        ]
    },
    {
        path: "/events5",
        redirect: "/events/events",
        component: Home,
        icon: "agentmanagent",
        name: "与代理佣金",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "proxycommission_list",
                component: proxycommission_list,
                name: "代理默认配额设置",
                icon: "proxycommission_list",
                meta: {
                    authRule: ["basis/third-plats/index"]
                }
            },
            {
                path: "proxycommission_proxylist",
                component: proxycommission_proxylist,
                name: "代理推广链接",
                icon: "proxycommission_proxylist",
                meta: {
                    authRule: ["basis/transaction-types/index"]
                }
            }
        ]
    },
    {
        path: "/events6",
        redirect: "/events/events",
        component: Home,
        icon: "reportmanagent",
        name: "报表管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "operation_profit",
                component: operation_profit,
                name: "运营报表",
                icon: "operation_profit",
                meta: {
                    authRule: ["setting/term/index"]
                }
            },
            {
                path: "user_report",
                component: user_report,
                name: "用户报表",
                icon: "user_report",
                meta: {
                    authRule: ["setting/serial/index"]
                }
            }, {
                path: "finance_index",
                component: finance_index,
                name: "财务报表",
                icon: "finance_index",
                meta: {
                    authRule: ["setting/lottery/index"]
                }
            }, {
                path: "pgame_playlist",
                component: pgame_playlist,
                name: "彩票报表",
                icon: "pgame_playlist",
                meta: {
                    authRule: ["setting/lottery/index"]
                }
            }, {
                path: "preport_profit",
                component: preport_profit,
                name: "平台报表",
                icon: "preport_profit",
                meta: {
                    authRule: ["setting/lottery/index"]
                }
            }
        ]
    },
    {
        path: "/events7",
        redirect: "/events/events",
        component: Home,
        icon: "eventmanagement",
        name: "活动管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "activity_list",
                component: activity_list,
                name: "活动列表",
                icon: "activity_list",
                meta: {
                    authRule: ["lottery/projects/index"]
                }
            }
        ]
    },
    {
        path: "/events8",
        redirect: "/events/events",
        component: Home,
        icon: "noticemanagement",
        name: "公告管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "message_list",
                component: message_list,
                name: "站内信列表",
                icon: "message_list",
                meta: {
                    authRule: ["report/stat-profits/index"]
                }
            },
            {
                path: "push_list",
                component: push_list,
                name: "移动端推送",
                icon: "push_list",
                meta: {
                    authRule: ["report/issue-profits/index"]
                }
            }, {
                path: "notice_list",
                component: notice_list,
                name: "公告列表",
                icon: "notice_list",
                meta: {
                    authRule: ["report/stat-lottery-profits/index"]
                }
            }, {
                path: "marquee_list",
                component: marquee_list,
                name: "跑马灯列表",
                icon: "marquee_list",
                meta: {
                    authRule: ["report/stat-month-profits/index"]
                }
            }
        ]
    },
    {
        path: "/events9",
        redirect: "/events/events",
        component: Home,
        icon: "Userlog",
        name: "日志管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "log_domainlog",
                component: log_domainlog,
                name: "域名统计",
                icon: "log_domainlog1",
                meta: {
                    authRule: ["merchant/merchant/index"]
                }
            },
            {
                path: "log_loginlog",
                component: log_loginlog,
                name: "用户登入查询",
                icon: "log_adminlog",
                meta: {
                    authRule: ["merchant/merchantIp/index"]
                }
            },
            {
                path: "log_adminlog",
                component: log_adminlog,
                name: "管理员日志列表",
                icon: "log_adminlog",
                meta: {
                    authRule: ["merchant/merchantAccount/index"]
                }
            }
        ]
    }
];
