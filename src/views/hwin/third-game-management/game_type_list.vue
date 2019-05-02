<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="正常"></el-option>
                    <el-option label="隐藏" value="隐藏"></el-option>
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
            <el-table-column label="			Id				" prop="id" fixed></el-table-column>
            <el-table-column label="					排序值		" prop="id" fixed>
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="thirdGameTypesSequence(scope.$index, scope.row)"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="			类型				" prop="type" fixed></el-table-column>
            <el-table-column label="			游戏类型名				" prop="name" fixed></el-table-column>
            <el-table-column label="			游戏类型标记				" prop="identifier" fixed></el-table-column>
            <el-table-column label="			归属三方平台				" prop="plat_id" fixed></el-table-column>
            <el-table-column label="			比例确定依据				" prop="rate_basis" fixed></el-table-column>
            <el-table-column label="			创建时间				" prop="created_at" fixed></el-table-column>
            <el-table-column label="			更新时间				" prop="updated_at" fixed></el-table-column>
            <el-table-column label="			状态				" prop="status" fixed></el-table-column>

            <el-table-column
                    label="操作" width="360"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>

                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleSubForm(scope.$index, scope.row)">明细
                    </el-button>

                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>

                    <el-button v-if="scope.row.status === '禁用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSuccessServer(scope.$index, scope.row)">启用
                    </el-button>
                    <el-button v-if="scope.row.status === '启用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemFailedServer(scope.$index, scope.row)">禁用
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
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="Id" prop="id">
                    <el-input v-model="formData.id" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="排序值" prop="sequence">
                    <el-input v-model="formData.sequence" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="游戏类型名" prop="name">
                    <el-input v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>

                <!--<el-form-item label="name" prop="sequence">-->
                    <!--<el-input v-model="formData.sequence" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->

                <el-form-item label="游戏类型标记" prop="identifier">
                    <el-input v-model="formData.identifier" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="归属三方平台" prop="plat_id">
                    <el-input v-model="formData.plat_id" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="比例确定依据" prop="rate_basis">
                    <el-input v-model="formData.rate_basis" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="创建时间" prop="created_at">
                    <el-input v-model="formData.created_at" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="更新时间" prop="updated_at">
                    <el-input v-model="formData.updated_at" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-input v-model="formData.status" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>



        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formSubVisible"
                :before-close="hideSubForm"
                width="35%"
                top="5vh">
            <el-form :model="formSubData" :rules="formSubRules" ref="dataSubForm">

                <template>
                    <el-form :inline="true" :model="query" class="query-form" size="mini">
                        <el-form-item class="query-form-item">
                            <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button-group>
                                <el-button type="primary" icon="el-icon-refresh" @click="getSubList"></el-button>
                                <el-button type="primary" icon="el-icon-search" @click="onSubSubmit">查询</el-button>
                                <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>
                            </el-button-group>
                        </el-form-item>

                    </el-form>

                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="游戏名称"
                                width="180">
                        </el-table-column>

                        <!--<el-table-column label="			图标				" prop="icon">
                            <template slot-scope="scope">
                                <el-popover
                                        placement="right"
                                        title=""
                                        trigger="hover">
                                    <img src="http://192.168.36.146:8082/static/img/c367a5df-8c4f-4b7a-8703-9a88111c2a04.600d6f1.png"/>
                                    <img slot="reference" src="http://192.168.36.146:8082/static/img/c367a5df-8c4f-4b7a-8703-9a88111c2a04.600d6f1.png" :alt="icon" style="max-height: 50px;max-width: 130px">
                                </el-popover>
                            </template>

                        </el-table-column>-->


                        <el-table-column label="			图标				" prop="icon" >
                            <template slot-scope="scope">
                                <el-popover
                                        placement="right"
                                        title=""
                                        trigger="hover">
                                    <img :src="'http://apidemo.test/public/' + scope.row.icon"/>
                                    <img slot="reference" :src="'http://apidemo.test/public/' + scope.row.icon" :alt="icon" style="max-height: 50px;max-width: 130px">
                                </el-popover>
                            </template>

                        </el-table-column>


                        <el-table-column
                                prop="status"
                                label="状态">
                        </el-table-column>

                        <el-table-column
                                prop="desc"
                                label="简介">
                        </el-table-column>

                        <el-table-column
                                label="操作" width="150"
                                fixed="right">
                            <template slot-scope="scope">

                                <el-button v-if="scope.row.status === '禁用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSubSuccessServer(scope.$index, scope.row)">启用
                                </el-button>
                                <el-button v-if="scope.row.status === '启用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSubFailedServer(scope.$index, scope.row)">禁用
                                </el-button>

                                <el-checkbox v-model="checked">选择</el-checkbox>

                                <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                                </el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            :page-size="query.limit"
                            @current-change="handleCurrentSubChange"
                            layout="prev, pager, next"
                            :total="totalSub">
                    </el-pagination>

                </template>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideSubForm">取消</el-button>
                <el-button type="primary" @click.native="formSubSubmit()" :loading="formSubLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import {
        gameTypeList,
        gameTypeDetailList,
        thirdGameTypesStatusSave,
        thirdGameTypesSequence,
        thirdGameTypesSubStatusSave,
        marqueeDelete
    } from "../../../api/third-game-management";

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
                tableData: [],
                /*tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],*/
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
                totalSub: 0,
                loading: true,
                index: null,
                formName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formSubLoading: false,
                formVisible: false,
                formSubVisible: false,
                formData: formJson,
                formSubData: formJson,
                formRules: {},
                formSubRules: {},
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
            onSubSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getSubList();
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
            handleCurrentSubChange(val) {
                this.query.page = val;
                this.getSubList();
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
                gameTypeList(this.query)
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
            getSubList() {
                // this.loading = true;
                gameTypeDetailList(this.query)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        // this.list = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
            },
            sortByID(order) {
                if (order === 'ascending') {
                    this.query.sort = '+id'
                } else {
                    this.query.sort = '-id'
                }
                this.handleFilter()
            },
            thirdGameTypesSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                thirdGameTypesSequence(params).then(
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
            auditItemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '启用'
                }
                // debugger
                thirdGameTypesStatusSave(params).then(
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
            auditItemFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '禁用'
                }
                // debugger
                thirdGameTypesStatusSave(params).then(
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
            auditItemSubSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '启用'
                }
                // debugger
                thirdGameTypesSubStatusSave(params).then(
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
                        gameTypeDetailList(this.query)
                            .then(response => {
                                this.tableData = response.data.list.data || [];
                            })
                            .catch(() => {
                                this.roles = [];
                            });
                    }.bind(this)
                )
            },
            auditItemSubFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '禁用'
                }
                // debugger
                thirdGameTypesSubStatusSave(params).then(
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
                        gameTypeDetailList(this.query)
                            .then(response => {
                                this.tableData = response.data.list.data || [];
                            })
                            .catch(() => {
                                this.roles = [];
                            });

                    }.bind(this)
                )
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
            // 隐藏表单
            hideSubForm() {
                // 更改值
                this.formSubVisible = !this.formSubVisible;
                // 清空表单
                this.$refs["dataSubForm"].resetFields();
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
            },// 显示表单
            handleSubForm(index, row) {
                gameTypeDetailList(this.query)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        // this.list = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
                this.formSubVisible = true;
                this.formSubData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formSubData = Object.assign({}, row);
                }
                this.formSubData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
                this.formSubName = "add";
                this.formSubRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formSubName = "edit";
                    this.formSubRules = this.editRules;
                }
                // 清空验证信息表单
                if (this.$refs["dataSubForm"]) {
                    this.$refs["dataSubForm"].clearValidate();
                }
            },
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        marqueeSave(data, this.formName).then(response => {
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
                            marqueeDelete(para)
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
