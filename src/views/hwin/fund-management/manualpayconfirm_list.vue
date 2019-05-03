<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd 00:00:00" format="yyyy-MM-dd 00:00:00">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd 23:59:59" format="yyyy-MM-dd 23:59:59">
                </el-date-picker>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-input v-model="query.min" placeholder="min" style="width:150px;"></el-input>
                <el-input v-model="query.max" placeholder="max" style="width:150px;"></el-input>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.type" placeholder="类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="普通存入" value="普通存入"></el-option>
                    <el-option label="存款存入" value="存款存入"></el-option>
                    <el-option label="活动优惠" value="活动优惠"></el-option>
                    <el-option label="人工取款" value="人工取款"></el-option>
                    <el-option label="手动申请出款" value="手动申请出款"></el-option>
                    <el-option label="公司入款误存" value="公司入款误存"></el-option>
                    <el-option label="优惠扣除" value="优惠扣除"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.audit_status" placeholder="审核状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="同意" value="同意"></el-option>
                    <el-option label="拒绝" value="拒绝"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.operate_type" placeholder="管理员类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="提交人" value="0"></el-option>
                    <el-option label="操作人" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.memo" placeholder="备注"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>-->
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

            <el-table-column label="					ID		" prop="id" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="					会员账号		" prop="account" fixed></el-table-column>
            <el-table-column label="					入款金额		" prop="in_amount" fixed></el-table-column>
            <el-table-column label="					出款金额		" prop="out_amount" fixed></el-table-column>
            <el-table-column label="					优惠金额		" prop="benefit_amount" fixed></el-table-column>
            <el-table-column label="					出/入款		" prop="out_in_amount" fixed></el-table-column>
            <el-table-column label="					出款银行卡卡号		" prop="out_bankcardnumber" fixed></el-table-column>
            <el-table-column label="					综合打码量		" prop="general_project" fixed></el-table-column>
            <el-table-column label="					常态稽核		" prop="common_audit" fixed></el-table-column>
            <el-table-column label="					申请时间		" prop="request_date" fixed></el-table-column>
            <el-table-column label="					确认时间		" prop="confirm_date" fixed></el-table-column>
            <el-table-column label="					提交人		" prop="submitor" fixed></el-table-column>
            <el-table-column label="					提交备注		" prop="request_memo" fixed></el-table-column>
            <el-table-column label="					存入类型		" prop="deposit_type" fixed></el-table-column>
            <el-table-column label="					审核人		" prop="auditor" fixed></el-table-column>
            <el-table-column label="					审核备注		" prop="audit_memo" fixed></el-table-column>
            <el-table-column label="					审核状态		" prop="status" fixed></el-table-column>

            <el-table-column
                    label="操作"
                    fixed="right">
                <template slot-scope="scope">

                    <el-button v-if="scope.row.status === '同意'" type="danger" size="small" icon="el-icon-edit" @click.native="itemFailedServer(scope.$index, scope.row)">拒绝
                    </el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="itemSuccessServer(scope.$index, scope.row)">同意
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
            <el-form :model="formData" label-width="8%" :rules="formRules" ref="dataForm">
                <el-form-item label="			ID    		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			会员账号   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			入款金额   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			出款金额   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			优惠金额   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			出/入款   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			出款银行卡卡号    		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			综合打码量  		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			常态稽核   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			申请时间   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			确认时间   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			提交人       		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			提交备注   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			存入类型   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			审核人       		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			审核备注   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			审核状态   		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>

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
        manualpayconfirmList,
        authAdminRoleList,
        authAdminSave,
        manualpayconfirmStatusSave,
        authAdminDelete
    } from "../../../api/fund-management";

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
                manualpayconfirmList(this.query)
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
            itemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '同意'
                }
                // debugger
                manualpayconfirmStatusSave(params).then(
                    function (res) {
                        // debugger
                        /*if(res.code === 1){
                            this.$message({
                                message: res.data,
                                type: 'success'
                            })
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                message: '错误信息：'+res.message,
                                type: 'error'
                            });
                        }*/
                        this.$message({
                            message: '数据处理成功',
                            type: 'success'
                        })
                        this.getList();
                    }.bind(this)
                )
            },
            itemFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '拒绝'
                }
                // debugger
                manualpayconfirmStatusSave(params).then(
                    function (res) {
                        // debugger
                        /*if(res.code === 1){
                            this.$message({
                                message: res.data,
                                type: 'success'
                            })
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                message: '错误信息：'+res.message,
                                type: 'error'
                            });
                        }*/
                        this.$message({
                            message: '数据处理成功',
                            type: 'success'
                        })
                        this.getList();
                    }.bind(this)
                )
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
