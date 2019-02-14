<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始日期"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束日期"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="日志类型">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="更新信息" value="2"></el-option>
                    <el-option label="在线会员图" value="4"></el-option>
                    <el-option label="IP限制" value="359"></el-option>
                    <el-option label="系统参数设定" value="20"></el-option>
                    <el-option label="网站图标设置" value="216"></el-option>
                    <el-option label="二维码设置" value="79"></el-option>
                    <el-option label="首页轮播设定" value="97"></el-option>
                    <el-option label="浮动窗口" value="98"></el-option>
                    <el-option label="资讯中心" value="89"></el-option>
                    <el-option label="公司简介" value="248"></el-option>
                    <el-option label="菜单排序" value="349"></el-option>
                    <el-option label="用户列表" value="22"></el-option>
                    <el-option label="会员资料" value="26"></el-option>
                    <el-option label="层级管理" value="29"></el-option>
                    <el-option label="用户银行卡管理" value="27"></el-option>
                    <el-option label="有效会员列表" value="44"></el-option>
                    <el-option label="出入款统计" value="45"></el-option>
                    <el-option label="安全信息审核" value="112"></el-option>
                    <el-option label="多账户监测" value="343"></el-option>
                    <el-option label="三方游戏" value="280"></el-option>
                    <el-option label="投注限额" value="251"></el-option>
                    <el-option label="运营报表" value="169"></el-option>
                    <el-option label="用户报表" value="312"></el-option>
                    <el-option label="财务报表" value="221"></el-option>
                    <el-option label="平台报表" value="274"></el-option>
                    <el-option label="域名统计" value="52"></el-option>
                    <el-option label="用户登入查询" value="51"></el-option>
                    <el-option label="管理员日志列表" value="50"></el-option>
                    <el-option label="活动列表" value="132"></el-option>
                    <el-option label="站内信列表" value="60"></el-option>
                    <el-option label="移动端推送" value="344"></el-option>
                    <el-option label="公告列表" value="53"></el-option>
                    <el-option label="跑马灯列表" value="236"></el-option>
                    <el-option label="支付类型管理" value="348"></el-option>
                    <el-option label="支付设定" value="158"></el-option>
                    <el-option label="入款账号管理" value="136"></el-option>
                    <el-option label="三方账号管理" value="127"></el-option>
                    <el-option label="层级状态图" value="151"></el-option>
                    <el-option label="即时稽核" value="159"></el-option>
                    <el-option label="转账记录" value="275"></el-option>
                    <el-option label="出款管理" value="165"></el-option>
                    <el-option label="人工存提" value="142"></el-option>
                    <el-option label="人工存提审核" value="141"></el-option>
                    <el-option label="公司入款记录" value="157"></el-option>
                    <el-option label="三方入款记录" value="186"></el-option>
                    <el-option label="账变列表" value="114"></el-option>
                    <el-option label="返水" value="285"></el-option>
                    <el-option label="单期盈亏报表导出" value="33"></el-option>
                    <el-option label="用户输赢排行导出" value="28"></el-option>
                    <el-option label="单期盈亏报表" value="40"></el-option>
                    <el-option label="商户游戏状态设置" value="356"></el-option>
                    <el-option label="开元平台报表" value="25"></el-option>
                    <el-option label="首存名单" value="313"></el-option>
                    <el-option label="活跃数名单" value="314"></el-option>
                    <el-option label="用户报表图表" value="315"></el-option>
                    <el-option label="支付类型管理修改" value="357"></el-option>
                    <el-option label="棋牌列表" value="353"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
            <el-input v-model="query.username" placeholder="子账号"></el-input>
        </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="IP"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="Cookies"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="日志内容(模糊)"></el-input>
            </el-form-item>

            <!--<el-select v-model="query.sort" style="width: 140px" class="filter-item" @change="handleFilter">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
            </el-select>-->
            <!--<el-form-item class="query-form-item">
                <el-select v-model="query.role_id" placeholder="角色">
                    <el-option label="全部角色" value=""></el-option>
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>-->

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <!--<el-table
            v-loading="loading"
            :data="list" stripe
            style="width: 100%;"
            max-height="500">-->
        <!--<el-table
                v-loading="loading"
                :key="tableKey"
                :data="list" stripe
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange">-->
        <el-table
                v-loading="loading"
                :key="tableKey"
                :data="list" stripe
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange">


            <!--编号
            子账号
            操作名称
            日志内容
            IP
            Cookies
            时间
-->
            <el-table-column label="					编号		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					子账号		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					操作名称		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					日志内容		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					IP		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					Cookies		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					时间		" prop="id" sortable="custom" fixed></el-table-column>


            <!--<el-table-column label="ID" prop="id" sortable="custom" align="center" width="65"></el-table-column>
            &lt;!&ndash;<el-table-column
                label="用户 ID"
                prop="id"
                sortable="custom"
                align="center"
                fixed>
                <template slot-scope="scope">

                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>&ndash;&gt;

            <el-table-column
                    label="用户名"
                    prop="username"
                    sortable="custom"
                    fixed>
            </el-table-column>

            <el-table-column
                    sortable="custom"
                    label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="登录时间"
                    with="300"
                    sortable="custom"
                    :show-overflow-tooltip="true" prop="last_login_time">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.last_login_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable="custom"
                    label="登录IP" prop="last_login_ip">
                <template slot-scope="scope">
                    <span>{{ scope.row.last_login_ip }}</span>
                </template>
            </el-table-column>-->
            <el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-view" @click.native="handleForm(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>
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
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="			编号  		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			子账号    		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			操作名称		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			日志内容		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			IP 		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			Cook		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			时间 		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">关闭</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        authAdminList,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/auth/authAdmin";

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
                authAdminList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list || [];
                        this.total = response.data.total || 0;
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
            this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
