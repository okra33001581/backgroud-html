<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="三方类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="入款" value="0"></el-option>
                    <el-option label="出款" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="支付类型">
                    <el-option value="-1" label="全部"></el-option>
                    <el-option value="1" label="网银"></el-option>
                    <el-option value="2" label="支付宝"></el-option>
                    <el-option value="3" label="微信支付"></el-option>
                    <el-option value="4" label="手机网银"></el-option>
                    <el-option value="5" label="支付宝WAP"></el-option>
                    <el-option value="6" label="微信支付WAP"></el-option>
                    <el-option value="7" label="QQ钱包"></el-option>
                    <el-option value="8" label="QQ钱包WAP"></el-option>
                    <el-option value="9" label="银联"></el-option>
                    <el-option value="10" label="京东"></el-option>
                    <el-option value="11" label="百度"></el-option>
                    <el-option value="12" label="支付宝H5"></el-option>
                    <el-option value="13" label="微信支付H5"></el-option>
                    <el-option value="14" label="银联WAP"></el-option>
                    <el-option value="15" label="银联H5"></el-option>
                    <el-option value="16" label="QQH5"></el-option>
                    <el-option value="17" label="京东WAP"></el-option>
                    <el-option value="18" label="京东H5"></el-option>
                    <el-option value="19" label="百度WAP"></el-option>
                    <el-option value="20" label="百度H5"></el-option>
                    <el-option value="21" label="快捷支付"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="三方公司"></el-input>
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
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增入款</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增出款</el-button>
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


            <!--三方类型
            商户代称
            支付类型
            三方公司
            商户号
            启用层级
            当前额度
            启用状态
            操作人
-->
            <el-table-column label="					序号		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					三方类型		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					商户代称		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					支付类型		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					三方公司		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					商户号		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					启用层级		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					当前额度		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					启用状态		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					操作人		" prop="id" sortable="custom" fixed></el-table-column>

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
                    label="操作" width="650"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">启用</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">停用</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">置顶</el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">解除置顶</el-button>
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
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="" prop="username">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="formData.isCheck1">全部层级</el-checkbox>
                    </template>
                </el-form-item>

                <el-form-item label="" prop="username">
                    <template slot-scope="scope">
                        <el-checkbox  v-model="formData.isCheck1">vip2</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck2">vip3</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip4</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip5</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip6</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip8</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip7</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">vip10</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">v11</el-checkbox>
                    </template>
                </el-form-item>


                <el-form-item label="三方公司" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="支付类型" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="小数点" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="入款类型" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="最小限额" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="最大限额" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="额度" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="强制查询后上分" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户代称" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户号" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="商户秘钥" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="三方公钥" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="支付域名" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="状态" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
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
