<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="用户名" value="0"></el-option>
                    <el-option label="所属上级" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="所属组">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="一级代理" value="0"></el-option>
                    <el-option label="代理用户" value="1"></el-option>
                    <el-option label="会员用户" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="用户状态">
                    <el-option label="全部用户" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="所属层级">
                    <el-option value="-1" label="不限"></el-option>
                    <el-option value="0" label="未分层"></el-option>
                    <el-option value="1" label="vip3"></el-option>
                    <el-option value="2" label="vip4"></el-option>
                    <el-option value="3" label="vip5"></el-option>
                    <el-option value="4" label="vip6"></el-option>
                    <el-option value="7" label="vip2"></el-option>
                    <el-option value="8" label="vip8"></el-option>
                    <el-option value="9" label="vip.7"></el-option>
                    <el-option value="10" label="vip10"></el-option>
                    <el-option value="11" label="v11"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="账户余额" value="0"></el-option>
                    <el-option label="可用余额" value="1"></el-option>
                    <el-option label="未结算金额" value="2"></el-option>
                    <el-option label="累计充值" value="2"></el-option>
                </el-select>
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
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始时间"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="在线" value="0"></el-option>
                    <el-option label="离线" value="1"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="最后在线">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="小于" value="0"></el-option>
                    <el-option label="等于" value="1"></el-option>
                    <el-option label="大于" value="2"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
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
                @sort-change="sortChange">


           <!-- 在线状态
            用户名
            所属组
            用户层级
            所属上级
            返点
            账户余额
            累计充值
            累计投注
            注册日期
            用户状态-->

            <el-table-column label="					ID		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					在线状态		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户名		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					所属组		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户层级		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					所属上级		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					返点		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					账户余额		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					累计充值		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					累计投注		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					注册日期		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户状态		" prop="id" sortable="custom" fixed></el-table-column>


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

                    <!--<button data-v-486a4262="" type="button" class="el-button el-button&#45;&#45;default el-button&#45;&#45;small">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>编辑</span></button>-->

                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<el-pagination-->
                <!--:page-size="query.limit"-->
                <!--@current-change="handleCurrentChange"-->
                <!--layout="prev, pager, next"-->
                <!--:total="total">-->
        <!--</el-pagination>-->

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentTotal">
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

                <el-form-item label="账号类型" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="0">代理</el-radio>
                        <el-radio label="1">会员</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="所属上级" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员账号" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item class="query-form-item">
                    <el-select v-model="query.status" placeholder="返点设置">
                        <el-option value="0.078" label="7.8%------1956"></el-option>
                        <el-option value="0.077" label="7.7%------1954"></el-option>
                        <el-option value="0.076" label="7.6%------1952"></el-option>
                        <el-option value="0.075" label="7.5%------1950"></el-option>
                        <el-option value="0.074" label="7.4%------1948"></el-option>
                        <el-option value="0.073" label="7.3%------1946"></el-option>
                        <el-option value="0.072" label="7.2%------1944"></el-option>
                        <el-option value="0.071" label="7.1%------1942"></el-option>
                        <el-option value="0.07" label="7.0%------1940"></el-option>
                        <el-option value="0.069" label="6.9%------1938"></el-option>
                        <el-option value="0.068" label="6.8%------1936"></el-option>
                        <el-option value="0.067" label="6.7%------1934"></el-option>
                        <el-option value="0.066" label="6.6%------1932"></el-option>
                        <el-option value="0.065" label="6.5%------1930"></el-option>
                        <el-option value="0.064" label="6.4%------1928"></el-option>
                        <el-option value="0.063" label="6.3%------1926"></el-option>
                        <el-option value="0.062" label="6.2%------1924"></el-option>
                        <el-option value="0.061" label="6.1%------1922"></el-option>
                        <el-option value="0.06" label="6.0%------1920"></el-option>
                        <el-option value="0.059" label="5.9%------1918"></el-option>
                        <el-option value="0.058" label="5.8%------1916"></el-option>
                        <el-option value="0.057" label="5.7%------1914"></el-option>
                        <el-option value="0.056" label="5.6%------1912"></el-option>
                        <el-option value="0.055" label="5.5%------1910"></el-option>
                        <el-option value="0.054" label="5.4%------1908"></el-option>
                        <el-option value="0.053" label="5.3%------1906"></el-option>
                        <el-option value="0.052" label="5.2%------1904"></el-option>
                        <el-option value="0.051" label="5.1%------1902"></el-option>
                        <el-option value="0.05" label="5.0%------1900"></el-option>
                        <el-option value="0.049" label="4.9%------1898"></el-option>
                        <el-option value="0.048" label="4.8%------1896"></el-option>
                        <el-option value="0.047" label="4.7%------1894"></el-option>
                        <el-option value="0.046" label="4.6%------1892"></el-option>
                        <el-option value="0.045" label="4.5%------1890"></el-option>
                        <el-option value="0.044" label="4.4%------1888"></el-option>
                        <el-option value="0.043" label="4.3%------1886"></el-option>
                        <el-option value="0.042" label="4.2%------1884"></el-option>
                        <el-option value="0.041" label="4.1%------1882"></el-option>
                        <el-option value="0.04" label="4.0%------1880"></el-option>
                        <el-option value="0.039" label="3.9%------1878"></el-option>
                        <el-option value="0.038" label="3.8%------1876"></el-option>
                        <el-option value="0.037" label="3.7%------1874"></el-option>
                        <el-option value="0.036" label="3.6%------1872"></el-option>
                        <el-option value="0.035" label="3.5%------1870"></el-option>
                        <el-option value="0.034" label="3.4%------1868"></el-option>
                        <el-option value="0.033" label="3.3%------1866"></el-option>
                        <el-option value="0.032" label="3.2%------1864"></el-option>
                        <el-option value="0.031" label="3.1%------1862"></el-option>
                        <el-option value="0.03" label="3.0%------1860"></el-option>
                        <el-option value="0.029" label="2.9%------1858"></el-option>
                        <el-option value="0.028" label="2.8%------1856"></el-option>
                        <el-option value="0.027" label="2.7%------1854"></el-option>
                        <el-option value="0.026" label="2.6%------1852"></el-option>
                        <el-option value="0.025" label="2.5%------1850"></el-option>
                        <el-option value="0.024" label="2.4%------1848"></el-option>
                        <el-option value="0.023" label="2.3%------1846"></el-option>
                        <el-option value="0.022" label="2.2%------1844"></el-option>
                        <el-option value="0.021" label="2.1%------1842"></el-option>
                        <el-option value="0.02" label="2.0%------1840"></el-option>
                        <el-option value="0.019" label="1.9%------1838"></el-option>
                        <el-option value="0.018" label="1.8%------1836"></el-option>
                        <el-option value="0.017" label="1.7%------1834"></el-option>
                        <el-option value="0.016" label="1.6%------1832"></el-option>
                        <el-option value="0.015" label="1.5%------1830"></el-option>
                        <el-option value="0.014" label="1.4%------1828"></el-option>
                        <el-option value="0.013" label="1.3%------1826"></el-option>
                        <el-option value="0.012" label="1.2%------1824"></el-option>
                        <el-option value="0.011" label="1.1%------1822"></el-option>
                        <el-option value="0.0099999999999999" label="1.0%------1820"></el-option>
                        <el-option value="0.0089999999999999" label="0.9%------1818"></el-option>
                        <el-option value="0.0079999999999999" label="0.8%------1816"></el-option>
                        <el-option value="0.0069999999999999" label="0.7%------1814"></el-option>
                        <el-option value="0.0059999999999999" label="0.6%------1812"></el-option>
                        <el-option value="0.0049999999999999" label="0.5%------1810"></el-option>
                        <el-option value="0.0039999999999999" label="0.4%------1808"></el-option>
                        <el-option value="0.0029999999999999" label="0.3%------1806"></el-option>
                        <el-option value="0.0019999999999999" label="0.2%------1804"></el-option>
                        <el-option value="0.00099999999999994" label="0.1%------1802"></el-option>
                        <el-option value="0" label="0------1800"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="query-form-item">
                    <el-select v-model="query.status" placeholder="最后在线">
                        <el-option value="7" label="vip2"></el-option>
                        <el-option value="1" label="vip3"></el-option>
                        <el-option value="2" label="vip4"></el-option>
                        <el-option value="3" label="vip5"></el-option>
                        <el-option value="4" label="vip6"></el-option>
                        <el-option value="8" label="vip8"></el-option>
                        <el-option value="0" label="未分层"></el-option>
                        <el-option value="9" label="vip.7"></el-option>
                        <el-option value="10" label="vip10"></el-option>
                        <el-option value="11" label="v11"></el-option>
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
