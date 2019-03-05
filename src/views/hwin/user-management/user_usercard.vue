<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="银行卡状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="删除" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="卡号" value="0"></el-option>
                    <el-option label="用户名" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="卡号/用户名"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="真实姓名"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="min"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="max"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="是否为黑名单">
                    <el-option label="全部类型" value=""></el-option>
                    <el-option label="正常卡" value="0"></el-option>
                    <el-option label="黑名单" value="1"></el-option>
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
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>-->
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
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">


            <!--ID
            状态
            账号名
            一代名称
            银行
            省市
            卡号
            支行名称
            真实姓名
            是否黑名单
            累计金额
            增加时间
-->
            <el-table-column label="					ID		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					状态		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					账号名		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					一代名称		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					银行		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					省市		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					卡号		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					支行名称		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					真实姓名		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					是否黑名单		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					累计金额		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					增加时间		" prop="id" sortable="custom" fixed></el-table-column>


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
                    label="操作" width="350"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleForm(scope.$index, scope.row)">设为黑名单</el-button>
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

                <el-form-item label="账号名" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item prop="username" label="银行" >
                    <el-select v-model="query.status" placeholder="银行">
                        <el-option value="1" selected="" label="中国工商银行"></el-option>
                        <el-option value="3" label="中国建设银行"></el-option>
                        <el-option value="4" label="中国招商银行"></el-option>
                        <el-option value="5" label="中国民生银行"></el-option>
                        <el-option value="6" label="中国邮政储蓄银行"></el-option>
                        <el-option value="7" label="中国银行"></el-option>
                        <el-option value="8" label="中国交通银行"></el-option>
                        <el-option value="9" label="中国兴业银行"></el-option>
                        <el-option value="10" label="中国光大银行"></el-option>
                        <el-option value="11" label="中信银行"></el-option>
                        <el-option value="12" label="华夏银行"></el-option>
                        <el-option value="13" label="浦发银行"></el-option>
                        <el-option value="14" label="广发银行"></el-option>
                        <el-option value="15" label="北京银行"></el-option>
                        <el-option value="16" label="平安银行"></el-option>
                        <el-option value="21" label="广州银行"></el-option>
                        <el-option value="22" label="广州农商银行"></el-option>
                        <el-option value="23" label="顺德农商银行"></el-option>
                        <el-option value="24" label="北京农商银行"></el-option>
                        <el-option value="25" label="杭州银行"></el-option>
                        <el-option value="26" label="温州银行"></el-option>
                        <el-option value="27" label="上海农商银行"></el-option>
                        <el-option value="28" label="上海银行"></el-option>
                        <el-option value="29" label="尧都农商银行"></el-option>
                        <el-option value="30" label="渤海银行"></el-option>
                        <el-option value="31" label="浙商银行"></el-option>
                        <el-option value="32" label="浙江稠州商业银行"></el-option>
                        <el-option value="33" label="晋商银行"></el-option>
                        <el-option value="34" label="晋城银行"></el-option>
                        <el-option value="35" label="汉口银行"></el-option>
                        <el-option value="36" label="东莞银行"></el-option>
                        <el-option value="37" label="东莞农村商业银行"></el-option>
                        <el-option value="38" label="宁波银行"></el-option>
                        <el-option value="39" label="南京银行"></el-option>
                        <el-option value="40" label="邯郸银行"></el-option>
                        <el-option value="41" label="郑州银行"></el-option>
                        <el-option value="42" label="九江银行"></el-option>
                        <el-option value="43" label="盛京银行"></el-option>
                        <el-option value="44" label="安徽农信社"></el-option>
                        <el-option value="45" label="甘肃银行"></el-option>
                        <el-option value="46" label="甘肃农村信用社"></el-option>
                        <el-option value="47" label="锦州银行"></el-option>
                        <el-option value="48" label="齐鲁银行"></el-option>
                        <el-option value="49" label="贵州银行"></el-option>
                        <el-option value="50" label="bea东亚银行"></el-option>
                        <el-option value="51" label="厦门银行"></el-option>
                        <el-option value="52" label="洛阳银行"></el-option>
                        <el-option value="53" label="深圳农商银行"></el-option>
                        <el-option value="54" label="贵阳银行"></el-option>
                        <el-option value="55" label="广西农村信用社"></el-option>
                        <el-option value="56" label="哈尔滨银行"></el-option>
                        <el-option value="57" label="昆山农村商业银行"></el-option>
                        <el-option value="58" label="浙江民泰商业银行"></el-option>
                        <el-option value="59" label="广东农村信用社"></el-option>
                        <el-option value="60" label="河南信用社"></el-option>
                        <el-option value="61" label="成都银行"></el-option>
                        <el-option value="62" label="山东农村信用社"></el-option>
                        <el-option value="63" label="江苏农村信用社"></el-option>
                        <el-option value="64" label="江西农村信用社"></el-option>
                        <el-option value="65" label="贵州农村信用社"></el-option>
                        <el-option value="66" label="青海农村信用社"></el-option>
                        <el-option value="67" label="超级银行"></el-option>
                        <el-option value="101" label="微信支付"></el-option>
                        <el-option value="102" label="支付宝支付"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="username" label="省市" >
                    <el-select v-model="query.status" placeholder="省市">
                        <el-option value="1" selected="" label="北京"></el-option>
                        <el-option value="2" label="上海"></el-option>
                        <el-option value="3" label="天津"></el-option>
                        <el-option value="4" label="重庆"></el-option>
                        <el-option value="5" label="内蒙古"></el-option>
                        <el-option value="6" label="山西"></el-option>
                        <el-option value="7" label="河北"></el-option>
                        <el-option value="8" label="辽宁"></el-option>
                        <el-option value="9" label="吉林"></el-option>
                        <el-option value="10" label="黑龙江"></el-option>
                        <el-option value="11" label="江苏"></el-option>
                        <el-option value="12" label="安徽"></el-option>
                        <el-option value="13" label="山东"></el-option>
                        <el-option value="14" label="浙江"></el-option>
                        <el-option value="15" label="江西"></el-option>
                        <el-option value="16" label="福建"></el-option>
                        <el-option value="17" label="湖南"></el-option>
                        <el-option value="18" label="湖北"></el-option>
                        <el-option value="19" label="河南"></el-option>
                        <el-option value="20" label="广东"></el-option>
                        <el-option value="21" label="海南"></el-option>
                        <el-option value="22" label="广西"></el-option>
                        <el-option value="23" label="贵州"></el-option>
                        <el-option value="24" label="四川"></el-option>
                        <el-option value="25" label="云南"></el-option>
                        <el-option value="26" label="陕西"></el-option>
                        <el-option value="27" label="甘肃"></el-option>
                        <el-option value="28" label="宁夏"></el-option>
                        <el-option value="29" label="青海"></el-option>
                        <el-option value="30" label="新疆"></el-option>
                        <el-option value="31" label="西藏"></el-option>
                        <el-option value="32" label="香港"></el-option>
                        <el-option value="33" label="澳门"></el-option>
                        <el-option value="34" label="台湾"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="卡号" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="支行名称" prop="username">
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
        userUsercard,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
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
                userUsercard(this.query)
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
