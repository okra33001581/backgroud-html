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

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>
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

            <el-table-column label="id" prop="id" fixed></el-table-column>


            <el-table-column label="排序值" prop="sequence" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="transactionTypeStatusSave(scope.row)"
                    ></el-input>
                </template>

            </el-table-column>


            <!--<el-table-column label="merchant_id" prop="merchant_id" fixed></el-table-column>
            <el-table-column label="merchant_name" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="parent_id" prop="parent_id" fixed></el-table-column>
            <el-table-column label="parent" prop="parent" fixed></el-table-column>-->
            <el-table-column label="资金流" prop="fund_flow_id" fixed></el-table-column>
            <el-table-column label="账变类型" prop="description" fixed></el-table-column>
            <el-table-column label="中文标题" prop="cn_title" fixed></el-table-column>
            <el-table-column label="余额" prop="balance" fixed></el-table-column>
            <el-table-column label="可用余额" prop="available" fixed></el-table-column>
            <el-table-column label="冻结金额" prop="frozen" fixed></el-table-column>
            <el-table-column label="可提现余额" prop="withdrawable" fixed></el-table-column>
            <el-table-column label="不可提现金额" prop="prohibit_amount" fixed></el-table-column>
            <el-table-column label="收入" prop="credit" fixed></el-table-column>
            <el-table-column label="支出" prop="debit" fixed></el-table-column>
            <el-table-column label="关联注单" prop="project_linked" fixed></el-table-column>
            <el-table-column label="关联追号" prop="trace_linked" fixed></el-table-column>
            <el-table-column label="反向类型" prop="reverse_type" fixed></el-table-column>
            <el-table-column label="创建时间" prop="created_at" fixed></el-table-column>
            <el-table-column label="更新时间" prop="updated_at" fixed></el-table-column>


            <el-table-column
                    label="操作" width="300"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>

                    <el-button v-if="scope.row.status === '禁用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSubServer(scope.row,'启用')">启用
                    </el-button>
                    <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemSubServer(scope.row,'禁用')">禁用
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
                width="40%"
                top="5vh">
            <el-form :model="formData" label-width="12%" :rules="formRules" ref="dataForm">

                <el-form-item label="资金流" prop="fund_flow_id" fixed><el-input v-model="formData.fund_flow_id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="账变类型" prop="description" fixed><el-input v-model="formData.description" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="中文标题" prop="cn_title" fixed><el-input v-model="formData.cn_title" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="余额" prop="balance" fixed><el-input v-model="formData.balance" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="可用余额" prop="available" fixed><el-input v-model="formData.available" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="冻结金额" prop="frozen" fixed><el-input v-model="formData.frozen" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="可提现余额" prop="withdrawable" fixed><el-input v-model="formData.withdrawable" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="不可提现金额" prop="prohibit_amount" fixed><el-input v-model="formData.prohibit_amount" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="收入" prop="credit" fixed><el-input v-model="formData.credit" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="支出" prop="debit" fixed><el-input v-model="formData.debit" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="关联注单" prop="project_linked" fixed><el-input v-model="formData.project_linked" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="关联追号" prop="trace_linked" fixed><el-input v-model="formData.trace_linked" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="反向类型" prop="reverse_type" fixed><el-input v-model="formData.reverse_type" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="创建时间" prop="created_at" fixed><el-input v-model="formData.created_at" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="更新时间" prop="updated_at" fixed><el-input v-model="formData.updated_at" auto-complete="off"></el-input></el-form-item>

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
        transactionTypeList,
        authAdminRoleList,
        transactionTypeSave,
        transactionTypeStatusSave,
        transactionTypeDel
    } from "../../../api/site-management";

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
                pc_pic:'',
                mobile_pic:'',
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
            auditItemSubServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                transactionTypeStatusSave(params).then(
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
            getList() {
                this.loading = true;
                transactionTypeList(this.query)
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
            beforeAvatarUpload(file) {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = file.size / 1024 / 1024 < 10
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }  return extension || extension2 && isLt2M
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePic1Success(response, file, fileList) {
                //response这个
                this.formData.pc_pic = response.data;
            },
            handlePic2Success(response, file, fileList) {
                //response这个
                this.formData.mobile_pic = response.data;
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
            transactionTypeStatusSave(row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                transactionTypeStatusSave(params).then(
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
                        transactionTypeSave(data, this.formName).then(response => {
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
                            transactionTypeDel(para)
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
