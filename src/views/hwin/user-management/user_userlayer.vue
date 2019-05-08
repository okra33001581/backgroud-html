<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="未验证" value="未验证"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增层级</el-button><!--
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">分层</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">回归</el-button>-->
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
            <el-table-column label="ID" prop="id" fixed></el-table-column>
            <el-table-column label="层级名称" prop="level_name" fixed></el-table-column>
            <el-table-column label="优先级" prop="prior" fixed></el-table-column>
            <el-table-column label="会员人数" prop="id" fixed></el-table-column>
            <el-table-column label="备注" prop="memo" fixed></el-table-column>
            <el-table-column label="支付平台选项设定" prop="id" fixed>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.pay_setting" placeholder="支付平台选项设定" @change="updateUserlayerPaySetting(scope.row.id, scope.row.pay_setting)">
                        <el-option label="新用户层级" value="新用户层级"></el-option>
                        <el-option label="普通用户层级" value="普通用户层级"></el-option>
                        <el-option label="代理用户层级" value="代理用户层级"></el-option>
                        <el-option label="VIP" value="VIP"></el-option>
                        <el-option label="普通会员" value="普通会员"></el-option>
                        <el-option label="vip10" value="vip10"></el-option>
                        <el-option label="vip11" value="vip11"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column label="投注限额" prop="project_limit" fixed>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.project_limit" placeholder="投注限额"  @change="updateUserlayerProjectLimit(scope.row.id, scope.row.project_limit)">
                        <el-option label="彩种投注限额" value="彩种投注限额"></el-option>
                        <el-option label="新增限额" value="新增限额"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <!--<el-table-column label="加入条件" prop="id" fixed>-->
                <el-table-column label="存款次数" prop="deposit_times" fixed></el-table-column>
                <el-table-column label="存款总额" prop="deposit_amount" fixed></el-table-column>
                <el-table-column label="最大存款额度" prop="deposit_max" fixed></el-table-column>
                <el-table-column label="提款次数" prop="withdraw_times" fixed></el-table-column>
                <!--<el-table-column label="提款总额" prop="withdraw_amount" fixed></el-table-column>-->
            <!--</el-table-column>-->

            <el-table-column
                    label="操作" width="200"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
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
                width="35%"
                top="5vh">
            <el-form :model="formData" label-width="18%" :rules="formRules" ref="dataForm">
                <el-form-item label="层级名称" prop="level_name">
                    <el-input v-model="formData.level_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="存款次数" prop="deposit_times">
                    <el-input v-model="formData.deposit_times" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="存款总额" prop="deposit_amount">
                    <el-input v-model="formData.deposit_amount" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="单笔最大存款额" prop="deposit_max">
                    <el-input v-model="formData.deposit_max" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="提款次数" prop="withdraw_times">
                    <el-input v-model="formData.withdraw_times" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="提款总额" prop="withdraw_amount">
                    <el-input v-model="formData.withdraw_amount" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="优先级" prop="prior">
                    <el-input v-model="formData.prior" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="memo">
                    <el-input v-model="formData.memo" auto-complete="off"></el-input>
                </el-form-item>

                    <el-form-item label="支付设定" prop="pay_setting">
                    <el-select v-model="formData.pay_setting" placeholder="支付设定">
                        <el-option value="新用户层级" label="新用户层级" ></el-option>
                        <el-option value="普通用户层级" label="普通用户层级"></el-option>
                        <el-option value="代理用户层级" label="代理用户层级"></el-option>
                        <el-option value="VIP" label="VIP"></el-option>
                        <el-option value="普通会员" label="普通会员"></el-option>
                        <el-option value="vip10" label="vip10"></el-option>
                        <el-option value="vip11" label="vip11"></el-option>
                    </el-select>
                </el-form-item>

                    <el-form-item label="投注限额" prop="project_limit">
                    <el-select v-model="formData.project_limit" placeholder="投注限额">
                        <el-option value="彩种投注限额" label="彩种投注限额"></el-option>
                        <el-option value="新增限额" label="新增限额"></el-option>
                    </el-select>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        userUserlayer,
        authAdminRoleList,
        updateUserlayerProjectLimit,
        updateUserlayerPaySetting,
        userLevelSave,
        userlayerDelete
    } from "../../../api/user-management";

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
                userUserlayer(this.query)
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
            updateUserlayerPaySetting(val1, val2) {
                // china
                var params = {
                    id: val1,
                    pay_setting: val2
                }
                // debugger
                updateUserlayerPaySetting(params).then(
                    function (res) {
                        // debugger
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                message: '错误信息：'+res.message,
                                type: 'error'
                            });
                        }
                        this.getList();
                    }.bind(this)
                )
            },
            updateUserlayerProjectLimit(val1, val2) {
                // china
                var params = {
                    id: val1,
                    project_limit: val2
                }
                // debugger
                updateUserlayerProjectLimit(params).then(
                    function (res) {
                        // debugger
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                message: '错误信息：'+res.message,
                                type: 'error'
                            });
                        }
                        this.getList();
                    }.bind(this)
                )
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
                        userLevelSave(data, this.formName).then(response => {
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
                            userlayerDelete(para)
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
                    1: "启用",
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
