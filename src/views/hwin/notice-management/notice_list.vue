<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="公告状态">
                    <el-option label="全部(公告状态)" value=""></el-option>
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.title" placeholder="标题"></el-input>
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

            <el-table-column label="ID" prop="id" fixed></el-table-column>
            <el-table-column label="商户名称" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="排序值" prop="id" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="noticeSequence(scope.row)"
                    ></el-input>
                </template>

            </el-table-column>
            <el-table-column label="公告状态" prop="status" fixed></el-table-column>
            <el-table-column label="标题" prop="title" fixed></el-table-column>
            <el-table-column label="发送版本" prop="send_terminal" fixed></el-table-column>
            <el-table-column label="编辑日期" prop="updated_at" fixed></el-table-column>
            <el-table-column label="发布人员" prop="updater" fixed></el-table-column>
            <el-table-column label="公告类型" prop="type" fixed></el-table-column>

            <el-table-column
                    label="操作" width="270"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">查看
                    </el-button>

                    <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'禁用')">禁用
                    </el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'启用')">启用
                    </el-button>

                    <el-button v-if="scope.row.is_top === '解除置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemTopServer(scope.row,'置顶')">置顶
                    </el-button>
                    <el-button v-if="scope.row.is_top === '置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemTopServer(scope.row,'解除置顶')">解除置顶
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
            <el-form :model="formData" label-width="11%" :rules="formRules" ref="dataForm">

                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="formData.title" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="公告类型" prop="type">
                    <el-input v-model="formData.type" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="显示排序" prop="sequence">
                    <el-input v-model="formData.sequence" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="是否弹窗" prop="pop_flag">
                    <el-input v-model="formData.pop_flag" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="发送版本" prop="send_terminal">
                    <el-input v-model="formData.send_terminal" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="发送范围" prop="send_range">
                    <el-input v-model="formData.send_range" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="层级" prop="layers">
                    <el-input v-model="formData.layers" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <el-input v-model="formData.content" auto-complete="off"></el-input>
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
        noticeList,
        authAdminRoleList,
        noticeSave,
        noticeStatusSave,
        noticeTopSave,
        noticeSequence,
        noticeDelete
    } from "../../../api/notice-management";

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
            
            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                noticeStatusSave(params).then(
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
            itemTopServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                noticeTopSave(params).then(
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
            noticeSequence(row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                noticeSequence(params).then(
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
                noticeList(this.query)
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
                        noticeSave(data, this.formName).then(response => {
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
                            noticeDelete(para)
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
