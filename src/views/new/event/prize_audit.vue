<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-select v-model="query.event_object" :placeholder="$t('page.event_object')">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="充值赠送" value="9"></el-option>
                    <el-option label="彩金红包" value="0"></el-option>
                    <el-option label="首充赠送" value="1"></el-option>
                    <el-option label="注册送彩金" value="2"></el-option>
                    <el-option label="返水" value="3"></el-option>
                    <el-option label="盈亏赠送" value="4"></el-option>
                    <el-option label="投注赠送" value="5"></el-option>
                    <el-option label="救援金" value="6"></el-option>
                    <el-option label="抽奖" value="7"></el-option>
                    <el-option label="签到" value="8"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.event_name" :placeholder="$t('page.event_name')" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" :placeholder="$t('page.username')" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        :placeholder="$t('page.begin_date')"
                        value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        :placeholder="$t('page.end_date')"
                        value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" :placeholder="$t('page.status')">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
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
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">{{$t('page.search')}}</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="auditSuccessServer()">{{$t('page.batch_success')}}</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="auditFailedServer()">{{$t('page.batch_reject')}}</el-button>
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
                @sort-change="sortChange"
                :element-loading-text="$t('page.loading')"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass"
                @selection-change="selsChange" @row-click="handleChange">
            <!--排序值
            活动名称
            开始时间
            结束时间
            显示终端
            编辑时间
            操作人员
            活动状态
-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column :label="					$t('page.id')		" prop="id" fixed></el-table-column>
            <el-table-column :label="			$t('page.user_id')				" prop="user_id" fixed></el-table-column>
            <el-table-column :label="			$t('page.username')				" prop="username" fixed></el-table-column>
            <el-table-column :label="			$t('page.merchant_name')				" prop="merchant_name" fixed></el-table-column>
            <el-table-column :label="					$t('page.event_name')		" prop="event_name" fixed></el-table-column>
            <el-table-column :label="					$t('page.deposit')		" prop="deposit" fixed></el-table-column>
            <el-table-column :label="					$t('page.benefit')		" prop="benefit" fixed></el-table-column>
            <el-table-column :label="					$t('page.auditor')		" prop="auditor" fixed></el-table-column>
            <el-table-column :label="					$t('page.request_date')		" prop="request_date" fixed></el-table-column>
            <el-table-column :label="					$t('page.audit_date')		" prop="audit_date" fixed></el-table-column>
            <el-table-column
                    prop="status"
                    :label="$t('page.status')" >
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>

            <!--<el-table-column label="ID" prop="id" align="center" width="65"></el-table-column>
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
                    :label="$t('page.operate')" width="300"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">{{$t('page.detail')}}
                    </el-button>

                    <el-button v-if="scope.row.status === '同意'"  type="danger" size="small" icon="el-icon-delete" @click.native="auditItemServer( scope.row,'拒绝')">{{$t('page.reject')}}
                    </el-button>
                    <el-button v-else  type="primary" size="small" icon="el-icon-delete" @click.native="auditItemServer( scope.row,'同意')">{{$t('page.success')}}
                    </el-button>
                    
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


                <el-form-item :label="$t('page.id')" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.user_id')" prop="user_id"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.username')" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.merchant_name')" prop="merchant_name"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.event_name')" prop="event_name"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.deposit')" prop="deposit"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.benefit')" prop="benefit"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.auditor')" prop="auditor')"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.request_date')" prop="request_date"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.audit_date')" prop="audit_date"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item :label="$t('page.status')" prop="status"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">{{$t('page.close')}}</el-button>
                <!--<el-button type="primary" @click.native="formSubmit()" :loading="formLoading">{{$t('page.audit')}}</el-button>-->
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        eventUserPrizeList,
        eventUserPrizeStatusSave
    } from "../../../api/event-management";

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
                sels:[],
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
            selsChange(sels) {
                this.sels = sels
            },

            handleChange(row, event, column) {
                this.$refs.multipleTable.toggleRowSelection(row)
            },
            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                eventUserPrizeStatusSave(params).then(
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
            auditSuccessServer () {
                var servids = this.sels.map(item => item.id).join(",")
                var params = {
                    id:servids,
                    flag:1
                }
                // debugger
                eventUserPrizeStatusSave(params).then(
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
            auditFailedServer () {
                var servids = this.sels.map(item => item.id).join(",")
                var params = {
                    id:servids,
                    flag:0
                }
                // debugger
                eventUserPrizeStatusSave(params).then(
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
            toggleSelection(){
                this.$refs.multipleTable.clearSelection();
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
                eventUserPrizeList(this.query)
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
                            eventUserPrizeStatusSave(para)
                                .then(response => {
                                    this.deleteLoading = false;
                                    if (response.code) {
                                        this.$message({
                                            message: response.message,
                                            type: "error"
                                        });
                                        window.location.reload();
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
                    "": "gray",
                    "同意": "success",
                    '拒绝': "danger"
                };
                return statusMap[status];
            },
            statusFilterName(status) {
                const statusMap = {
                    '拒绝': "拒绝",
                    '同意': "通过",
                    '': "未处理"
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
