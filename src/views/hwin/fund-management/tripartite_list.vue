<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户名称"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.third_type" placeholder="三方类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="入款" value="入款"></el-option>
                    <el-option label="出款" value="出款"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.pay_type" placeholder="支付类型">
                    <el-option value="" label="全部"></el-option>
                    <el-option value="网银" label="网银"></el-option>
                    <el-option value="支付宝" label="支付宝"></el-option>
                    <el-option value="微信支付" label="微信支付"></el-option>
                    <el-option value="手机网银" label="手机网银"></el-option>
                    <el-option value="支付宝WAP" label="支付宝WAP"></el-option>
                    <el-option value="微信支付WAP" label="微信支付WAP"></el-option>
                    <el-option value="QQ钱包" label="QQ钱包"></el-option>
                    <el-option value="QQ钱包WAP" label="QQ钱包WAP"></el-option>
                    <el-option value="银联" label="银联"></el-option>
                    <el-option value="京东" label="京东"></el-option>
                    <el-option value="百度" label="百度"></el-option>
                    <el-option value="支付宝H5" label="支付宝H5"></el-option>
                    <el-option value="微信支付H5" label="微信支付H5"></el-option>
                    <el-option value="银联WAP" label="银联WAP"></el-option>
                    <el-option value="银联H5" label="银联H5"></el-option>
                    <el-option value="QQH5" label="QQH5"></el-option>
                    <el-option value="京东WAP" label="京东WAP"></el-option>
                    <el-option value="京东H5" label="京东H5"></el-option>
                    <el-option value="百度WAP" label="百度WAP"></el-option>
                    <el-option value="百度H5" label="百度H5"></el-option>
                    <el-option value="快捷支付" label="快捷支付"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.third_company" placeholder="三方公司"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增入款</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增出款</el-button>
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

            <el-table-column label="					序号		" prop="id" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="					三方类型		" prop="third_type" fixed></el-table-column>
            <el-table-column label="					商户代称		" prop="merchant_alias" fixed></el-table-column>
            <el-table-column label="					支付类型		" prop="pay_type" fixed></el-table-column>
            <el-table-column label="					三方公司		" prop="third_company" fixed></el-table-column>
            <el-table-column label="					商户号		" prop="merchant_code" fixed></el-table-column>
            <el-table-column label="					启用层级		" prop="layers" fixed></el-table-column>
            <el-table-column label="					当前额度		" prop="quota" fixed></el-table-column>
            <el-table-column label="					启用状态		" prop="status" fixed></el-table-column>
            <el-table-column label="					操作人		" prop="operator" fixed></el-table-column>

            <el-table-column
                    label="操作" width="650"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>


                    <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="itemFailedServer(scope.$index, scope.row)">禁用
                    </el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="itemSuccessServer(scope.$index, scope.row)">启用
                    </el-button>
                    

                    <el-button v-if="scope.row.is_top === '解除置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemIsTopSuccessServer(scope.$index, scope.row)">置顶
                    </el-button>
                    <el-button v-if="scope.row.is_top === '置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemIsTopFailedServer(scope.$index, scope.row)">解除置顶
                    </el-button>

                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">启用</el-button>-->
                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">停用</el-button>-->

                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">置顶</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">解除置顶</el-button>-->
                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">停用</el-button>-->
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
                width="40%"
                top="5vh">
            <el-form :model="formData" label-width="16%" :rules="formRules" ref="dataForm">

                <el-form-item label="" prop="layers">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="formData.layers">全部层级</el-checkbox>
                    </template>
                </el-form-item>

                <el-form-item label="" prop="layers">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="formData.layers">vip2</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip3</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip4</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip5</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip6</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip8</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip7</el-checkbox>
                        <el-checkbox  v-model="formData.layers">vip10</el-checkbox>
                        <el-checkbox  v-model="formData.layers">v11</el-checkbox>
                    </template>
                </el-form-item>


                <el-form-item label="三方公司" prop="third_company">
                    <el-input v-model="formData.third_company" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="是否移动端显示" prop="mobile_display_flag">
                    <el-input v-model="formData.mobile_display_flag" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="支付类型" prop="pay_type">
                    <el-input v-model="formData.pay_type" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="小数点" prop="decimal_flag">
                    <el-input v-model="formData.decimal_flag" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="入款类型" prop="deposit_type">
                    <el-input v-model="formData.deposit_type" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="最小限额" prop="min">
                    <el-input v-model="formData.min" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="最大限额" prop="max">
                    <el-input v-model="formData.max" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="额度" prop="quota">
                    <el-input v-model="formData.quota" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="强制查询后上分" prop="query_flag">
                    <el-input v-model="formData.query_flag" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户代称" prop="merchant_code">
                    <el-input v-model="formData.merchant_code" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户号" prop="merchant_id">
                    <el-input v-model="formData.merchant_id" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户秘钥" prop="private_key">
                    <el-input v-model="formData.private_key" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="三方公钥" prop="public_key">
                    <el-input v-model="formData.public_key" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="支付域名" prop="pay_domain">
                    <el-input v-model="formData.pay_domain" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="网关地址" prop="gateway">
                    <el-input v-model="formData.gateway" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="查单地址" prop="query_url">
                    <el-input v-model="formData.query_url" auto-complete="off"></el-input>
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
        tripartiteList,
        authAdminRoleList,
        thirdAccountSave,
        thirdAccountStatusSave,
        thirdAccountIsTopSave,
        tripartiteDelete
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
                tripartiteList(this.query)
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
                        thirdAccountSave(data, this.formName).then(response => {
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
            itemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '启用'
                }
                // debugger
                thirdAccountStatusSave(params).then(
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
                    flag: '禁用'
                }
                // debugger
                thirdAccountStatusSave(params).then(
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
            itemIsTopSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '置顶'
                }
                // debugger
                thirdAccountIsTopSave(params).then(
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
            itemIsTopFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '解除置顶'
                }
                // debugger
                thirdAccountIsTopSave(params).then(
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
            // 删除
            handleDel(index, row) {
                if (row.id) {
                    this.$confirm("确认删除该记录吗?", "提示", {
                        type: "warning"
                    })
                        .then(() => {
                            let para = {id: row.id};
                            tripartiteDelete(para)
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
