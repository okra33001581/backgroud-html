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


import transaction from "../views/transaction/transaction.vue";
import account from "../views/transaction/account.vue";
import platTransfer from "../views/transaction/plat-transfer.vue";
import auditType from "../views/develop/auditType.vue";
import sysSetting from "../views/develop/sysSetting.vue";
import user from "../views/user/user.vue";
import userIpAnalysis from "../views/user/userIpAnalysis.vue";
import userPrizeSet from "../views/user/userPrizeSet.vue";

import basisWay from "../views/basis/basisWay.vue";
import clientTerminal from "../views/basis/clientTerminal.vue";
import lotteryCenter from "../views/basis/lotteryCenter.vue";
import lotteryType from "../views/basis/lotteryType.vue";
import lotteryWay from "../views/basis/lotteryWay.vue";
import serialLottery from "../views/basis/serialLottery.vue";
import serialWay from "../views/basis/serialWay.vue";
import terminal from "../views/basis/terminal.vue";
import transactionType from "../views/basis/transactionType.vue";
import wayGroup from "../views/basis/wayGroup.vue";
import wayGroupLottery from "../views/basis/wayGroupLottery.vue";
import wayType from "../views/basis/wayType.vue";

import riskProjects from "../views/lottery/riskProjects.vue";
import trail from "../views/lottery/trail.vue";
import projects from "../views/lottery/projects.vue";
import draw from "../views/lottery/draw.vue";
import warn from "../views/lottery/warn.vue";
import exception from "../views/lottery/exception.vue";

import day from "../views/report/day.vue";
import month from "../views/report/month.vue";
import termReport from "../views/report/termReport.vue";
import dayLottery from "../views/report/dayLottery.vue";
import monthReport from "../views/report/monthReport.vue";
import userDay from "../views/report/userDay.vue";
import userMonth from "../views/report/userMonth.vue";
import userDayLottery from "../views/report/userDayLottery.vue";
import way from "../views/report/way.vue";
import userWay from "../views/report/userWay.vue";
import merchantDay from "../views/report/merchantDay.vue";
import merchantMonth from "../views/report/merchantMonth.vue";

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

import bulletin from "../views/bulletin/bulletin.vue";
import bulletinType from "../views/bulletin/bulletinType.vue";

import merchant from "../views/merchant/merchant.vue";
import merchantIp from "../views/merchant/merchantIp.vue";
import merchantAccount from "../views/merchant/merchantAccount.vue";
import merchantLottery from "../views/merchant/merchantLottery.vue";


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
                path: "eventsa",
                component: adSite,
                name: "活动管理",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "eventsb",
                component: adSite,
                name: "活动条件",
                icon: "0",
                meta: {
                    authRule: ["events/events/index"]
                }
            },
            {
                path: "eventsc",
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
                path: "events8",
                component: wayType,
                name: "玩法类型",
                icon: "0",
                meta: {
                    authRule: ["basis/wayType/index"]
                }
            },
            {
                path: "events9",
                component: basisWay,
                name: "基础玩法",
                icon: "0",
                meta: {
                    authRule: ["basis/basisWay/index"]
                }
            },
            {
                path: "events10",
                component: lotteryType,
                name: "基础投注方式",
                icon: "0",
                meta: {
                    authRule: ["basis/lotteryType/index"]
                }
            },
            {
                path: "events11",
                component: serialWay,
                name: "系列玩法",
                icon: "0",
                meta: {
                    authRule: ["basis/serialWay/index"]
                }
            },
            {
                path: "events12",
                component: lotteryWay,
                name: "投注方式与玩法关系",
                icon: "0",
                meta: {
                    authRule: ["basis/lotteryWay/index"]
                }
            },
            {
                path: "events13",
                component: wayGroup,
                name: "玩法组",
                icon: "0",
                meta: {
                    authRule: ["basis/wayGroup/index"]
                }
            },
            {
                path: "events14",
                component: lotteryCenter,
                name: "开奖中心",
                icon: "0",
                meta: {
                    authRule: ["basis/lotteryCenter/index"]
                }
            },
            {
                path: "events15",
                component: transactionType,
                name: "账变类型",
                icon: "0",
                meta: {
                    authRule: ["basis/transactionType/index"]
                }
            },
            {
                path: "events16",
                component: terminal,
                name: "终端",
                icon: "0",
                meta: {
                    authRule: ["basis/terminal/index"]
                }
            },
            {
                path: "events17",
                component: clientTerminal,
                name: "客户终端发布",
                icon: "0",
                meta: {
                    authRule: ["basis/clientTerminal/index"]
                }
            },
            {
                path: "events18",
                component: serialLottery,
                name: "系列投注方式",
                icon: "0",
                meta: {
                    authRule: ["basis/serialLottery/index"]
                }
            },
            {
                path: "events19",
                component: wayGroupLottery,
                name: "玩法组所属投注方式",
                icon: "0",
                meta: {
                    authRule: ["basis/wayGroupLottery/index"]
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
            },{
                path: "lottery/riskProjects/index",
                component: riskProjects,
                name: "风险注单",
                icon: "0",
                meta: {
                    authRule: ["lottery/riskProjects/index"]
                }
            },{
                path: "lottery/draw/index",
                component: draw,
                name: "开奖",
                icon: "0",
                meta: {
                    authRule: ["lottery/draw/index"]
                }
            },{
                path: "lottery/warn/index",
                component: warn,
                name: "告警记录",
                icon: "0",
                meta: {
                    authRule: ["lottery/warn/index"]
                }
            },{
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
        name: "报表统计",
        meta: {
            authRule: ["events/events/index"]
        },
        // noDropdown: true,
        children: [
            {
                path: "report/day/index",
                component: day,
                name: "日投注报表",
                icon: "0",
                meta: {
                    authRule: ["report/day/index"]
                }
            },
            {
                path: "report/month/index",
                component: month,
                name: "月投注报表",
                icon: "0",
                meta: {
                    authRule: ["report/month/index"]
                }
            },{
                path: "report/termReport/index",
                component: termReport,
                name: "单期投注报表",
                icon: "0",
                meta: {
                    authRule: ["report/termReport/index"]
                }
            },{
                path: "report/dayLottery/index",
                component: dayLottery,
                name: "日彩种报表",
                icon: "0",
                meta: {
                    authRule: ["report/dayLottery/index"]
                }
            },{
                path: "report/monthReport/index",
                component: monthReport,
                name: "月彩种报表",
                icon: "0",
                meta: {
                    authRule: ["report/monthReport/index"]
                }
            },{
                path: "report/userDay/index",
                component: userDay,
                name: "用户日报表",
                icon: "0",
                meta: {
                    authRule: ["report/userDay/index"]
                }
            },{
                path: "report/userMonth/index",
                component: userMonth,
                name: "用户月报表",
                icon: "0",
                meta: {
                    authRule: ["report/userMonth/index"]
                }
            },{
                path: "report/userDayLottery/index",
                component: userDayLottery,
                name: "用户日彩种报表",
                icon: "0",
                meta: {
                    authRule: ["report/userDayLottery/index"]
                }
            },{
                path: "report/way/index",
                component: way,
                name: "投注方式报表",
                icon: "0",
                meta: {
                    authRule: ["report/way/index"]
                }
            },{
                path: "report/userWay/index",
                component: userWay,
                name: "用户投注方式报表",
                icon: "0",
                meta: {
                    authRule: ["report/userWay/index"]
                }
            },
            {
                path: "report/merchantDay/index",
                component: merchantDay,
                name: "商户日报表",
                icon: "0",
                meta: {
                    authRule: ["report/merchantDay/index"]
                }
            },{
                path: "report/merchantMonth/index",
                component: merchantMonth,
                name: "商户月报表",
                icon: "0",
                meta: {
                    authRule: ["report/merchantMonth/index"]
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
                path: "transaction/account/index",
                component: account,
                name: "账户",
                icon: "0",
                meta: {
                    authRule: ["transaction/account/index"]
                }
            },
            {
                path: "transaction/transaction/index",
                component: transaction,
                name: "账变",
                icon: "0",
                meta: {
                    authRule: ["transaction/transaction/index"]
                }
            },
            {
                path: "transaction/platTransfer/index",
                component: platTransfer,
                name: "平台转账记录",
                icon: "0",
                meta: {
                    authRule: ["transaction/platTransfer/index"]
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
                path: "events58",
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
];
