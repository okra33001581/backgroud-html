import Vue from "vue";
import VueRouter from "vue-router";

if (process.env.NODE_ENV === "development") {
    Vue.use(VueRouter);
}

import {ROUTER_MODE} from "../config/app";

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
                path: "events/new-event-conditions/index",
                component: neweventconditions,
                name: "活动条件",
                icon: "0",
                meta: {
                    authRule: ["events/new-event-conditions/index"]
                }
            },
            {
                path: "events/new-event-prizes/index",
                component: neweventprizes,
                name: "活动奖励",
                icon: "0",
                meta: {
                    authRule: ["events/new-event-prizes/index"]
                }
            },
            {
                path: "events/new-events/index",
                component: newevents,
                name: "活动内容",
                icon: "0",
                meta: {
                    authRule: ["events/new-events/index"]
                }
            },
            {
                path: "events/new-event-user-prizes/index",
                component: neweventuserprizes,
                name: "活动会员奖励",
                icon: "0",
                meta: {
                    authRule: ["events/new-event-user-prizes/index"]
                }
            }
        ]
    },
    {
        path: "/events122",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "开发管理",
        meta: {
            authRule: ["develop/sysSetting/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "develop/sysSetting/index",
                component: sysSetting,
                name: "系统设置",
                icon: "0",
                meta: {
                    authRule: ["develop/sysSetting/index"]
                }
            },
            {
                path: "develop/auditType/index",
                component: auditType,
                name: "审核类型",
                icon: "0",
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
        icon: "guanggao",
        name: "用户管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "user/user/index",
                component: user,
                name: "用户管理",
                icon: "0",
                meta: {
                    authRule: ["user/user/index"]
                }
            },
            {
                path: "user/userIpAnalysis/index",
                component: userIpAnalysis,
                name: "用户登录IP分析",
                icon: "0",
                meta: {
                    authRule: ["user/userIpAnalysis/index"]
                }
            },
            {
                path: "user/userPrizeSet/index",
                component: userPrizeSet,
                name: "用户奖金组",
                icon: "0",
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
        icon: "guanggao",
        name: "公告管理",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "bulletin/bulletin/index",
                component: bulletin,
                name: "公告",
                icon: "0",
                meta: {
                    authRule: ["bulletin/bulletin/index"]
                }
            },
            {
                path: "bulletin/bulletinType/index",
                component: bulletinType,
                name: "公告类型",
                icon: "0",
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
        icon: "guanggao",
        name: "核心",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "basis/third-plats/index",
                component: thirdplats,
                name: "第三方平台",
                icon: "0",
                meta: {
                    authRule: ["basis/third-plats/index"]
                }
            },
            {
                path: "basis/transaction-types/index",
                component: transactiontypes,
                name: "账变类型",
                icon: "0",
                meta: {
                    authRule: ["basis/transaction-types/index"]
                }
            },
            {
                path: "basis/payment-platforms/index",
                component: paymentplatforms,
                name: "支付平台",
                icon: "0",
                meta: {
                    authRule: ["basis/payment-platforms/index"]
                }
            },
            {
                path: "basis/terminals/index",
                component: terminals,
                name: "终端",
                icon: "0",
                meta: {
                    authRule: ["basis/terminals/index"]
                }
            },
            {
                path: "events12",
                component: paymenttypes,
                name: "Payment Type",
                icon: "0",
                meta: {
                    authRule: ["basis/payment-types/index"]
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
                path: "setting/term/index",
                component: term,
                name: "奖期",
                icon: "0",
                meta: {
                    authRule: ["setting/term/index"]
                }
            },
            {
                path: "setting/serial/index",
                component: serial,
                name: "系列",
                icon: "0",
                meta: {
                    authRule: ["setting/serial/index"]
                }
            }, {
                path: "setting/lottery/index",
                component: lottery,
                name: "彩种",
                icon: "0",
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
        icon: "guanggao",
        name: "投注",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "lottery/projects/index",
                component: projects,
                name: "注单",
                icon: "0",
                meta: {
                    authRule: ["lottery/projects/index"]
                }
            },
            {
                path: "lottery/trail/index",
                component: trail,
                name: "追号",
                icon: "0",
                meta: {
                    authRule: ["lottery/trail/index"]
                }
            }, {
                path: "lottery/riskProjects/index",
                component: riskProjects,
                name: "风险注单",
                icon: "0",
                meta: {
                    authRule: ["lottery/riskProjects/index"]
                }
            }, {
                path: "lottery/draw/index",
                component: draw,
                name: "开奖",
                icon: "0",
                meta: {
                    authRule: ["lottery/draw/index"]
                }
            }, {
                path: "lottery/warn/index",
                component: warn,
                name: "告警记录",
                icon: "0",
                meta: {
                    authRule: ["lottery/warn/index"]
                }
            }, {
                path: "lottery/exception/index",
                component: exception,
                name: "开奖异常处理",
                icon: "0",
                meta: {
                    authRule: ["lottery/exception/index"]
                }
            }
        ]
    },
    {
        path: "/events8",
        redirect: "/events/events",
        component: Home,
        icon: "guanggao",
        name: "报表",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "report/stat-profits/index",
                component: statprofits,
                name: "日盈亏报表",
                icon: "0",
                meta: {
                    authRule: ["report/stat-profits/index"]
                }
            },
            {
                path: "report/issue-profits/index",
                component: issueprofits,
                name: "单期盈亏记录",
                icon: "0",
                meta: {
                    authRule: ["report/issue-profits/index"]
                }
            }, {
                path: "report/stat-lottery-profits/index",
                component: statlotteryprofits,
                name: "日彩种盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/stat-lottery-profits/index"]
                }
            }, {
                path: "report/stat-month-profits/index",
                component: statmonthprofits,
                name: "月盈亏统计",
                icon: "0",
                meta: {
                    authRule: ["report/stat-month-profits/index"]
                }
            }, {
                path: "report/lottery-month-profits/index",
                component: lotterymonthprofits,
                name: "月彩种盈亏统计",
                icon: "0",
                meta: {
                    authRule: ["report/lottery-month-profits/index"]
                }
            }, {
                path: "report/team-profits/index",
                component: teamprofits,
                name: "团队盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/team-profits/index"]
                }
            }, {
                path: "report/user-profits/index",
                component: userprofits,
                name: "用户盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/user-profits/index"]
                }
            }, {
                path: "report/user-month-profits/index",
                component: usermonthprofits,
                name: "月用户盈亏报表",
                icon: "0",
                meta: {
                    authRule: ["report/user-month-profits/index"]
                }
            }, {
                path: "report/team-month-profits/index",
                component: teammonthprofits,
                name: "月团队盈亏报表",
                icon: "0",
                meta: {
                    authRule: ["report/team-month-profits/index"]
                }
            }, {
                path: "report/user-lottery-profits/index",
                component: userlotteryprofits,
                name: "用户日彩种盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/user-lottery-profits/index"]
                }
            },
            {
                path: "report/team-lottery-profits/index",
                component: teamlotteryprofits,
                name: "团队日彩种盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/team-lottery-profits/index"]
                }
            }, {
                path: "report/way-profits/index",
                component: wayprofits,
                name: "投注方式盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/way-profits/index"]
                }
            }, {
                path: "report/lottery-way-profits/index",
                component: lotterywayprofits,
                name: "彩种投注方式盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/lottery-way-profits/index"]
                }
            }, {
                path: "report/user-lottery-way-profits/index",
                component: userlotterywayprofits,
                name: "用户彩种投注方式盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/user-lottery-way-profits/index"]
                }
            }, {
                path: "report/team-lottery-way-profits/index",
                component: teamlotterywayprofits,
                name: "团队彩种投注方式盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/team-lottery-way-profits/index"]
                }
            }, {
                path: "report/terminal-profits/index",
                component: terminalprofits,
                name: "终端盈亏",
                icon: "0",
                meta: {
                    authRule: ["report/terminal-profits/index"]
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
                path: "merchant/merchant/index",
                component: merchant,
                name: "商户列表",
                icon: "0",
                meta: {
                    authRule: ["merchant/merchant/index"]
                }
            },
            {
                path: "merchant/merchantIp/index",
                component: merchantIp,
                name: "商户IP白名单",
                icon: "0",
                meta: {
                    authRule: ["merchant/merchantIp/index"]
                }
            },
            {
                path: "merchant/merchantAccount/index",
                component: merchantAccount,
                name: "商户账户",
                icon: "0",
                meta: {
                    authRule: ["merchant/merchantAccount/index"]
                }
            },
            {
                path: "merchant/merchantLottery/index",
                component: merchantLottery,
                name: "商户关闭彩种",
                icon: "0",
                meta: {
                    authRule: ["merchant/merchantLottery/index"]
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
                path: "setting/district/index",
                component: district,
                name: "地区",
                icon: "0",
                meta: {
                    authRule: ["setting/district/index"]
                }
            },
            {
                path: "setting/domain/index",
                component: domain,
                name: "域名管理",
                icon: "0",
                meta: {
                    authRule: ["setting/domain/index"]
                }
            }
            /*,
            {
                path: "events45",
                component: adSite,
                name: "文件上传信息",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events46",
                component: adSite,
                name: "实时通知设置",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            }*/
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
                path: "events47",
                component: adSite,
                name: "管理员列表",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events48",
                component: adSite,
                name: "创建管理员",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events49",
                component: adSite,
                name: "修改密码",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events50",
                component: adSite,
                name: "管理员角色",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events51",
                component: adSite,
                name: "创建管理员角色",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "events52",
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
                path: "fund/accounts/index",
                component: accounts,
                name: "账户",
                icon: "0",
                meta: {
                    authRule: ["fund/accounts/index"]
                }
            },
            {
                path: "fund/transactions/index",
                component: transactions,
                name: "账变",
                icon: "0",
                meta: {
                    authRule: ["fund/transactions/index"]
                }
            },
            {
                path: "fund/deposits/index",
                component: deposits,
                name: "充值记录（第三方）",
                icon: "0",
                meta: {
                    authRule: ["fund/deposits/index"]
                }
            },
            {
                path: "fund/bank-deposits/index",
                component: bankdeposits,
                name: "充值记录（支付宝）",
                icon: "0",
                meta: {
                    authRule: ["fund/bank-deposits/index"]
                }
            }
            ,
            {
                path: "fund/exception-deposits/index",
                component: exceptiondeposits,
                name: "异常充值记录",
                icon: "0",
                meta: {
                    authRule: ["fund/exception-deposits/index"]
                }
            }
            ,
            {
                path: "fund/withdrawals/index",
                component: withdrawals,
                name: "Withdrawals",
                icon: "0",
                meta: {
                    authRule: ["fund/withdrawals/index"]
                }
            }
            ,
            {
                path: "fund/manual-deposits/index",
                component: manualdeposits,
                name: "手动充值",
                icon: "0",
                meta: {
                    authRule: ["fund/manual-deposits/index"]
                }
            }
            ,
            {
                path: "fund/manual-withdraws/index",
                component: manualwithdraws,
                name: "手动提现",
                icon: "0",
                meta: {
                    authRule: ["fund/manual-withdraws/index"]
                }
            }
            ,
            {
                path: "fund/dividends/index",
                component: dividends,
                name: "分红",
                icon: "0",
                meta: {
                    authRule: ["fund/dividends/index"]
                }
            }
            ,
            {
                path: "fund/lose-commissions/index",
                component: losecommissions,
                name: "输值佣金",
                icon: "0",
                meta: {
                    authRule: ["fund/lose-commissions/index"]
                }
            }
            ,
            {
                path: "fund/commissions-statistics/index",
                component: commissionsstatistics,
                name: "佣金统计发放记录",
                icon: "0",
                meta: {
                    authRule: ["fund/commissions-statistics/index"]
                }
            }
            ,
            {
                path: "fund/plat-transfer-records/index",
                component: plattransferrecords,
                name: "Plat Transfer Record",
                icon: "0",
                meta: {
                    authRule: ["fund/plat-transfer-records/index"]
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
                path: "setting/prizeGroup/index",
                component: prizeGroup,
                name: "奖金组",
                icon: "0",
                meta: {
                    authRule: ["setting/prizeGroup/index"]
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
                path: "setting/betLimit/index",
                component: betLimit,
                name: "投注限额",
                icon: "0",
                meta: {
                    authRule: ["setting/betLimit/index"]
                }
            },
            {
                path: "setting/sys-configs/index",
                component: sysconfigs,
                name: "系统设置",
                icon: "0",
                meta: {
                    authRule: ["setting/sys-configs/index"]
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
                path: "log/merchantApiLog/index",
                component: merchantApiLog,
                name: "商户api记录",
                icon: "0",
                meta: {
                    authRule: ["log/merchantApiLog/index"]
                }
            },
            {
                path: "log/adminLog/index",
                component: adminLog,
                name: "管理员日志",
                icon: "0",
                meta: {
                    authRule: ["log/adminLog/index"]
                }
            },
            {
                path: "log/userManageLog/index",
                component: userManageLog,
                name: "用户管理日志",
                icon: "0",
                meta: {
                    authRule: ["log/userManageLog/index"]
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
                path: "events62",
                component: adSite,
                name: "更新奖期列表缓存",
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
        name: "广告",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "ad/ad-types/index",
                component: adtypes,
                name: "广告类型",
                icon: "0",
                meta: {
                    authRule: ["ad/ad-types/index"]
                }
            },{
                path: "ad/ad-locations/index",
                component: adlocations,
                name: "广告位",
                icon: "0",
                meta: {
                    authRule: ["ad/ad-locations/index"]
                }
            },{
                path: "ad/ad-infos/index",
                component: adinfos,
                name: "广告内容",
                icon: "0",
                meta: {
                    authRule: ["ad/ad-infos/index"]
                }
            }
        ]
    }
];
