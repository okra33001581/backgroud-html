<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.type" placeholder="日志类型">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="更新信息" value="更新信息"></el-option>
                    <el-option label="在线会员图" value="在线会员图"></el-option>
                    <el-option label="IP限制" value="IP限制"></el-option>
                    <el-option label="系统参数设定" value="系统参数设定"></el-option>
                    <el-option label="网站图标设置" value="网站图标设置"></el-option>
                    <el-option label="二维码设置" value="二维码设置"></el-option>
                    <el-option label="首页轮播设定" value="首页轮播设定"></el-option>
                    <el-option label="浮动窗口" value="浮动窗口"></el-option>
                    <el-option label="资讯中心" value="资讯中心"></el-option>
                    <el-option label="公司简介" value="公司简介"></el-option>
                    <el-option label="菜单排序" value="菜单排序"></el-option>
                    <el-option label="用户列表" value="用户列表"></el-option>
                    <el-option label="会员资料" value="会员资料"></el-option>
                    <el-option label="层级管理" value="层级管理"></el-option>
                    <el-option label="用户银行卡管理" value="用户银行卡管理"></el-option>
                    <el-option label="有效会员列表" value="有效会员列表"></el-option>
                    <el-option label="出入款统计" value="出入款统计"></el-option>
                    <el-option label="安全信息审核" value="安全信息审核"></el-option>
                    <el-option label="多账户监测" value="多账户监测"></el-option>
                    <el-option label="三方游戏" value="三方游戏"></el-option>
                    <el-option label="投注限额" value="投注限额"></el-option>
                    <el-option label="运营报表" value="运营报表"></el-option>
                    <el-option label="用户报表" value="用户报表"></el-option>
                    <el-option label="财务报表" value="财务报表"></el-option>
                    <el-option label="平台报表" value="平台报表"></el-option>
                    <el-option label="域名统计" value="域名统计"></el-option>
                    <el-option label="用户登入查询" value="用户登入查询"></el-option>
                    <el-option label="管理员日志列表" value="管理员日志列表"></el-option>
                    <el-option label="活动列表" value="活动列表"></el-option>
                    <el-option label="站内信列表" value="站内信列表"></el-option>
                    <el-option label="移动端推送" value="移动端推送"></el-option>
                    <el-option label="公告列表" value="公告列表"></el-option>
                    <el-option label="跑马灯列表" value="跑马灯列表"></el-option>
                    <el-option label="支付类型管理" value="支付类型管理"></el-option>
                    <el-option label="支付设定" value="支付设定"></el-option>
                    <el-option label="入款账号管理" value="入款账号管理"></el-option>
                    <el-option label="三方账号管理" value="三方账号管理"></el-option>
                    <el-option label="层级状态图" value="层级状态图"></el-option>
                    <el-option label="即时稽核" value="即时稽核"></el-option>
                    <el-option label="转账记录" value="转账记录"></el-option>
                    <el-option label="出款管理" value="出款管理"></el-option>
                    <el-option label="人工存提" value="人工存提""></el-option>
                    <el-option label="人工存提审核" value="人工存提审核"></el-option>
                    <el-option label="公司入款记录" value="公司入款记录"></el-option>
                    <el-option label="三方入款记录" value="三方入款记录"></el-option>
                    <el-option label="账变列表" value="账变列表"></el-option>
                    <el-option label="返水" value="返水"></el-option>
                    <el-option label="单期盈亏报表导出" value="单期盈亏报表导出"></el-option>
                    <el-option label="用户输赢排行导出" value="用户输赢排行导出"></el-option>
                    <el-option label="单期盈亏报表" value="单期盈亏报表"></el-option>
                    <el-option label="商户游戏状态设置" value="商户游戏状态设置"></el-option>
                    <el-option label="开元平台报表" value="开元平台报表"></el-option>
                    <el-option label="首存名单" value="首存名单"></el-option>
                    <el-option label="活跃数名单" value="活跃数名单"></el-option>
                    <el-option label="用户报表图表" value="用户报表图表"></el-option>
                    <el-option label="支付类型管理修改" value="支付类型管理修改"></el-option>
                    <el-option label="棋牌列表" value="棋牌列表"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
            <el-input v-model="query.sub_account" placeholder="子账号"></el-input>
        </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.ip" placeholder="IP"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.cookies" placeholder="Cookies"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.content" placeholder="日志内容(模糊)"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="loading"
                :key="tableKey"
                :data="list" stripe
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">

            <el-table-column label="					编号		" prop="id" fixed></el-table-column>
            <el-table-column label="					子账号		" prop="sub_account" fixed></el-table-column>
            <el-table-column label="					商户名称		" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="					操作名称		" prop="operate_name" fixed></el-table-column>
            <el-table-column label="					日志内容		" prop="log_content" fixed></el-table-column>
            <el-table-column label="					IP		" prop="ip" fixed></el-table-column>
            <el-table-column label="					cookies		" prop="cookies" fixed></el-table-column>
            <el-table-column label="					origin		" prop="origin" fixed></el-table-column>
            <el-table-column label="					referer		" prop="referer" fixed></el-table-column>
            <el-table-column label="					user_agent		" prop="user_agent" fixed></el-table-column>
            <el-table-column label="					时间		" prop="date" fixed></el-table-column>
           <!-- <el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-view" @click.native="handleForm(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>-->
        </el-table>

        <el-pagination
                :page-size="query.limit"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>

        <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="			编号  		" prop="id"><el-input v-model="formData.id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			子账号    		" prop="sub_account"><el-input v-model="formData.sub_account" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			商户    		" prop="merchant_name"><el-input v-model="formData.merchant_name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			操作名称		" prop="operate_name"><el-input v-model="formData.operate_name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			日志内容		" prop="log_content"><el-input v-model="formData.log_content" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			IP 		" prop="ip"><el-input v-model="formData.ip" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			Cook		" prop="cookies"><el-input v-model="formData.cookies" type="textarea" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			origin		" prop="origin"><el-input v-model="formData.origin" type="textarea" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			referer		" prop="cookies"><el-input v-model="formData.referer" type="textarea" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			user_agent		" prop="user_agent"><el-input v-model="formData.user_agent" type="textarea" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			时间 		" prop="date"><el-input v-model="formData.date" auto-complete="off"></el-input></el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">关闭</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        logAdminlog,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/log-management";

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        roles: []
    };
    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.formData.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                roles: [],
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20,
                    role_id: "",
                    sort: '+id'
                },
                tableKey: 0,
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {
                    label: 'ID Descending',
                    key: '-id'
                }, {label: 'username Ascending', key: '+username'}, {
                    label: 'username Descending',
                    key: '-username'
                }, {label: 'status Ascending', key: '+status'}, {
                    label: 'status Descending',
                    key: '-status'
                }, {label: 'last_login_time Ascending', key: '+last_login_time'}, {
                    label: 'last_login_time Descending',
                    key: '-last_login_time'
                }, {label: 'last_login_ip Ascending', key: '+last_login_ip'}, {
                    label: 'last_login_ip Descending',
                    key: '-last_login_ip'
                }],
                list: [],
                total: 0,
                loading: true,
                index: null,
                formName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formVisible: false,
                formData: formJson,
                formRules: {},
                addRules: {
                    username: [
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: validatePass, trigger: "blur"}
                    ],
                    checkPassword: [
                        {
                            required: true,
                            message: "请再次输入密码",
                            trigger: "blur"
                        },
                        {validator: validatePass2, trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "请选择状态", trigger: "change"}
                    ]
                },
                editRules: {
                    username: [
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "请选择状态", trigger: "change"}
                    ]
                },
                deleteLoading: false
            };
        },
        methods: {
            onSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getList();
            },
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
            },
            handleCurrentChange(val) {
                this.query.page = val;
                this.getList();
            },
            handleFilter() {
                this.query.page = 1
                this.getList()
            },
            sortChange: function (column) {
                // console.log(column)
                // console.log(prop)
                // console.log(order)
                const {prop, order} = column
                if (prop === 'id') {
                    this.sortByID(order)
                } else if (prop === 'username') {
                    this.sortByUserName(order)
                } else if (prop === 'status') {
                    this.sortByStatus(order)
                } else if (prop === 'last_login_time') {
                    this.sortByLastLoginTime(order)
                } else if (prop === 'last_login_ip') {
                    this.sortByLastLoginIp(order)
                }
            },
            getList() {
                this.loading = true;
                logAdminlog(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list.data || [];
                        this.total = response.data.list.total || 0;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
                        this.roles = [];
                    });
            },
            /*sortChange2(data) {
                const { prop, order } = data
                if (prop === 'id') {
                    this.sortByID(order)
                }
            },*/

            sortByID(order) {
                if (order === 'ascending') {
                    this.query.sort = '+id'
                } else {
                    this.query.sort = '-id'
                }
                this.handleFilter()
            },


            sortByUserName(order) {
                if (order === 'ascending') {
                    this.query.sort = '+username'
                } else {
                    this.query.sort = '-username'
                }
                this.handleFilter()
            },
            sortByStatus(order) {
                if (order === 'ascending') {
                    this.query.sort = '+status'
                } else {
                    this.query.sort = '-status'
                }
                this.handleFilter()
            },
            sortByLastLoginTime(order) {
                if (order === 'ascending') {
                    this.query.sort = '+last_login_time'
                } else {
                    this.query.sort = '-last_login_time'
                }
                this.handleFilter()
            },
            sortByLastLoginIp(order) {
                if (order === 'ascending') {
                    this.query.sort = '+last_login_ip'
                } else {
                    this.query.sort = '-last_login_ip'
                }
                this.handleFilter()
            },
            getRoleList() {
                authAdminRoleList(this.query)
                    .then(response => {
                        this.roles = response.list || [];
                    })
                    .catch((e) => {
                        console.log(e)
                        this.roles = [];
                    });
            },
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 显示表单
            handleForm(index, row) {
                this.formVisible = true;
                this.formData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formData = Object.assign({}, row);
                }
                this.formData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
                this.formName = "add";
                this.formRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formName = "edit";
                    this.formRules = this.editRules;
                }
                // 清空验证信息表单
                if (this.$refs["dataForm"]) {
                    this.$refs["dataForm"].clearValidate();
                }
            },
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        authAdminSave(data, this.formName).then(response => {
                            this.formLoading = false;
                            if (response.code) {
                                this.$message({
                                    message: response.message,
                                    type: "error"
                                });
                            } else {
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                // 向头部添加数据
                                // this.list.unshift(res)
                                // 刷新表单
                                this.$refs["dataForm"].resetFields();
                                this.formVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.list.unshift(resData);
                                } else {
                                    this.list.splice(this.index, 1, data);
                                }
                            }
                        });
                    }
                });
            },
            // 删除
            handleDel(index, row) {
                if (row.id) {
                    this.$confirm("确认删除该记录吗?", "提示", {
                        type: "warning"
                    })
                        .then(() => {
                            let para = {id: row.id};
                            authAdminDelete(para)
                                .then(response => {
                                    this.deleteLoading = false;
                                    if (response.code) {
                                        this.$message({
                                            message: response.message,
                                            type: "error"
                                        });
                                    } else {
                                        this.$message({
                                            message: "删除成功",
                                            type: "success"
                                        });
                                        // 刷新数据
                                        this.list.splice(index, 1);
                                    }
                                })
                                .catch(() => {
                                    this.deleteLoading = false;
                                });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "取消删除"
                            });
                        });
                }
            }
        },
        filters: {
            statusFilterType(status) {
                const statusMap = {
                    0: "gray",
                    1: "success",
                    2: "danger"
                };
                return statusMap[status];
            },
            statusFilterName(status) {
                const statusMap = {
                    0: "禁用",
                    1: "正常",
                    2: "未验证"
                };
                return statusMap[status];
            }
        },
        mounted() {
        },
        created() {
            // 将参数拷贝进查询对象
            let query = this.$route.query;
            this.query = Object.assign(this.query, query);
            this.query.limit = parseInt(this.query.limit);
            // 加载表格数据
            this.getList();
            // 加载角色列表
            // this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
