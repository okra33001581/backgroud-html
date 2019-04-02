<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="未验证" value="2"></el-option>
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
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>
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


            <!--编号-->
            <!--名称-->

            <el-table-column label="			编号				" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="			名称				" prop="id" :formatter="formatSex" sortable="custom" fixed></el-table-column>

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
                width="70%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <div class="ibox-content" style="padding: 10px;">
                    <div class="jqGrid_wrapper">
                        <div class="ui-jqgrid " id="gbox_table_list" dir="ltr" style="width: 100%">
                            <div class="jqgrid-overlay ui-overlay" id="lui_table_list"></div>
                            <div class="ui-jqgrid-view table-responsive" role="grid" id="gview_table_list">
                                <div class="ui-jqgrid-hdiv">
                                    <div class="ui-jqgrid-hbox">
                                        <table border=1 cellspacing=0 cellpadding=0 class="ui-jqgrid-htable ui-common-table table table-bordered" aria-labelledby="gbox_table_list"  role="presentation" width="161">
                                            <thead>
                                            <tr class="ui-jqgrid-labels">
                                                <th>名称</th>
                                            </tr>
                                            </thead>
                                            <tr>
                                                <td class="center">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.name" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                        </table>
                                        <table width="1200" border=1 cellspacing=0 cellpadding=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                                            <thead>
                                            <tr class="ui-jqgrid-labels">
                                                <th colspan="4" >出款手续费</th>
                                            </tr>
                                            </thead>
                                            <tr>
                                                <td width="324" class="center">达到有效投注额是否免手续费</td>
                                                <template>
                                                    <el-radio v-model="formData.no_project_flag" label="1">是</el-radio>
                                                    <el-radio v-model="formData.no_project_flag" label="2">否</el-radio>
                                                </template>
                                                <td width="157" class="center">每天免手续费次数</td>
                                                <td width="178" class="center" id="free">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.no_charge_times" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">手续费<span id="withdraw_chargemax" >                                    </span></td>
                                                <td class="center">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.fee" auto-complete="off"></el-input>
                                                    </template>
                                                    %
                                                    <label>
                                                        <input type="radio" name="withdraw_chargetype" v-model="formData.fee_type" value="0" checked="checked">
                                                        百分比 </label>
                                                    <label>
                                                        <input type="radio" name="withdraw_chargetype" v-model="formData.fee_type" value="1" >
                                                        固定金额 </label>
                                                    <span id="withdraw_chargemax2" >&nbsp;&nbsp;每笔手续费上限：
                                                        <template>
                                                        <el-input style="width:149px;" v-model="formData.withdraw_min" auto-complete="off"></el-input>
                                                    </template>
  </span></td>
                                                <td class="center">每天可出款次数</td>
                                                <td class="center">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.withdraw_times" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">出款上限</td>
                                                <td class="center">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.withdraw_max" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                                <td class="center">出款下限</td>
                                                <td class="center">
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.withdraw_min" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                        </table>

                                        <table  border=1 cellspacing=0 cellpadding=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                                            <thead>
                                            <tr class="ui-jqgrid-labels" role="row">
                                                <th>入款设定</th>
                                                <th>线上入款</th>
                                                <th>公司入款</th>
                                            </tr>
                                            </thead>
                                            <tr>
                                                <td class="center">存款优惠</td>
                                                <td>
                                                    <template>
                                                        <el-radio v-model="formData.web_deposit_benefit" label="1">首次</el-radio>
                                                        <el-radio v-model="formData.web_deposit_benefit" label="2">每次</el-radio>
                                                        <el-radio v-model="formData.web_deposit_benefit" label="2">无优惠</el-radio>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-radio v-model="formData.company_deposit_benefit" label="1">首次</el-radio>
                                                        <el-radio v-model="formData.company_deposit_benefit" label="2">每次</el-radio>
                                                        <el-radio v-model="formData.company_deposit_benefit" label="2">无优惠</el-radio>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">优惠标准（元）</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_benefit_standard" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_benefit_standard" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">优惠百分比(%)</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_benefit_ratio" auto-complete="off"></el-input>
                                                    </template>
                                                    %负数为手续费
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_benefit_ratio" auto-complete="off"></el-input>
                                                    </template>
                                                    %负数为手续费
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">优惠上限金额</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_benefit_max" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_benefit_max" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">入款上限</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_max" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_max" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">入款下限</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_min" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_min" auto-complete="off"></el-input>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">综合额度流水审核</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_general_turnover_audit" auto-complete="off"></el-input>
                                                    </template>
                                                    <template>
                                                        <el-radio v-model="formData.web_general_turnover_audit" label="1">是</el-radio>
                                                        <el-radio v-model="formData.web_general_turnover_audit" label="2">否</el-radio>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_general_turnover_audit" auto-complete="off"></el-input>
                                                    </template>
                                                    <template>
                                                        <el-radio v-model="formData.company_general_turnover_audit" label="1">是</el-radio>
                                                        <el-radio v-model="formData.company_general_turnover_audit" label="2">否</el-radio>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">常态性流水审核</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_turnover_audit" auto-complete="off"></el-input>
                                                    </template>%
                                                    <template>
                                                        <el-radio v-model="formData.web_turnover_audit_flag" label="1">是</el-radio>
                                                        <el-radio v-model="formData.web_turnover_audit_flag" label="2">否</el-radio>
                                                    </template>
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_turnover_audit" auto-complete="off"></el-input>
                                                    </template>%
                                                    <template>
                                                        <el-radio v-model="formData.company_turnover_audit_flag" label="1">是</el-radio>
                                                        <el-radio v-model="formData.company_turnover_audit_flag" label="2">否</el-radio>
                                                    </template>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">常态性流水放宽额度</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_turnover_quota" auto-complete="off"></el-input>
                                                    </template>%
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_turnover_quota" auto-complete="off"></el-input>
                                                    </template>%
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="center">常态性流水审核行政费率</td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.web_turnover_managefee_ratio" auto-complete="off"></el-input>
                                                    </template>
                                                    %
                                                </td>
                                                <td>
                                                    <template>
                                                        <el-input style="width:149px;" v-model="formData.company_turnover_managefee_ratio" auto-complete="off"></el-input>
                                                    </template>
                                                    %
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
        cashPaysetting,
        authAdminRoleList,
        paysettingSave,
        paysettingDelete
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
                cashPaysetting(this.query)
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
            formatSex: function (row, column) {
                return "代理用户层级" + row.id
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
                        paysettingSave(data, this.formName).then(response => {
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
                            paysettingDelete(para)
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
