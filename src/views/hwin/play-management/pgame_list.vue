<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item" style="color:#666">
                彩票类别：
                <el-select v-model="query.lottery_name" placeholder="彩种类别">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="其他" value="0"></el-option>
                    <el-option label="时时彩" value="1"></el-option>
                    <el-option label="11选5" value="2"></el-option>
                    <el-option label="快乐彩" value="2"></el-option>
                    <el-option label="PK拾" value="2"></el-option>
                    <el-option label="快三" value="2"></el-option>
                    <el-option label="六合彩" value="2"></el-option>
                    <el-option label="3D彩" value="2"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item" style="color:#666">
                玩法:
                <el-select v-model="query.way_type" placeholder="玩法">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="官方" value="0"></el-option>
                    <el-option label="信用" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="请输入商户名称"></el-input>
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
                fit
                @expand="rowExpand"
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">

           


           <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table
                                :data="listChildren"
                                border
                                style="width: 100%">
                            <el-table-column label="游戏" prop="props.row.way_type" fixed></el-table-column>
                            <el-table-column label="类型" prop="type" fixed></el-table-column>
                            <el-table-column label="周期（天）" prop="period_day" fixed></el-table-column>
                            <el-table-column label="周期（秒）" prop="period_second" fixed></el-table-column>
                            <el-table-column label="销售时间（开始）" prop="sales_begin" fixed></el-table-column>
                            <el-table-column label="销售时间（结束）" prop="sales_end" fixed></el-table-column>
                            <el-table-column label="状态" prop="status" fixed></el-table-column>
                            <el-table-column label="排序值" prop="sequence" fixed>

                                <template scope="scope">
                                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值"
                                    ></el-input>
                                </template>

                            </el-table-column>
                    <el-table-column label="属性" prop="id" fixed >
                        <!--<template slot-scope="scope">
                            <h1 v-if="scope.row.hot.includes('热门') > 0">
                                <el-checkbox checked  @click.native="updateLotteryGroupPropertySave(scope.row.id, '-热门','','')">热门</el-checkbox>
                            </h1>
                            <h1 v-else>
                                <el-checkbox @click.native="updateLotteryGroupPropertySave(scope.row.id, '+热门','','')">热门</el-checkbox>
                            </h1>
                            <h1 v-if="scope.row.recommand.includes('推荐') > 0">
                                <el-checkbox checked  @click.native="updateLotteryGroupPropertySave(scope.row.id,'', '-推荐', '')">推荐</el-checkbox>
                            </h1>
                            <h1 v-else>
                                <el-checkbox @click.native="updateLotteryGroupPropertySave(scope.row.id,'', '+推荐', '')">推荐</el-checkbox>
                            </h1>
                            <h1 v-if="scope.row.new.includes('新上') > 0">
                                <el-checkbox checked  @click.native="updateLotteryGroupPropertySave(scope.row.id,'','', '-新上')">新上</el-checkbox>
                            </h1>
                            <h1 v-else>
                                <el-checkbox @click.native="updateLotteryGroupPropertySave(scope.row.id,'','','+新上')">新上</el-checkbox>
                            </h1>
                        </template>-->
                    </el-table-column>
                            <el-table-column
                                    label="操作" width="600"
                                    fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                                    </el-button>
                                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleWayGroupForm(scope.$index, scope.row)">玩法群组
                                    </el-button>
                                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handlePrizeForm(scope.$index, scope.row)">奖金设定
                                    </el-button>
                                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handlePrizePeriodForm(scope.$index, scope.row)">奖金期间
                                    </el-button>
                                    <el-button type="danger" size="small" @click.native="handleDel(scope.$index, scope.row)">停售</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>




            <el-table-column label="游戏" prop="lottery_name" fixed></el-table-column>
            <el-table-column label="类型" fixed></el-table-column>
            <el-table-column label="周期（天）" fixed></el-table-column>
            <el-table-column label="周期（秒）" fixed></el-table-column>
            <el-table-column label="销售时间（开始）" fixed></el-table-column>
            <el-table-column label="销售时间（结束）" fixed></el-table-column>
            <el-table-column label="状态" fixed></el-table-column>
            <el-table-column label="排序值" fixed></el-table-column>
            <el-table-column label="操作" width="600" fixed="right"></el-table-column>
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

                <el-form-item label="ID     " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="游戏    " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="类型    " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="周期（天）  " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="周期（秒）  " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="销售时间（开始）" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="销售时间（结束）" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="状态    " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="排序    " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="属性    " prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formWayGroupVisible"
                :before-close="hideWayGroupForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">


            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="玩法群"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="显示排序"
                            width="180">
                        <template slot-scope="scope">
                            <el-input v-model="formData.username" auto-complete="off"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="默认显示">
                        <template slot-scope="scope">
                            <el-radio label="默认"></el-radio>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

              <!--  <el-form-item label="整合" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                    <el-radio label="0">默认显示</el-radio>
                </el-form-item>

                <el-form-item label="三字" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                    <el-radio label="0">默认显示</el-radio>
                </el-form-item>

                <el-form-item label="双面盘" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                    <el-radio label="0">默认显示</el-radio>
                </el-form-item>

                <el-form-item label="龙虎斗" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                    <el-radio label="0">默认显示</el-radio>
                </el-form-item>-->


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideWayGroupForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formPrizePeriodVisible"
                :before-close="hidePrizePeriodForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <template>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="游戏"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="开奖周期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="销售开始时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="第一期截止时间">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="销售截止时间">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="开奖周期(秒)">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="允许录入号码时间(秒)">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="状态">
                        </el-table-column>
                    </el-table>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hidePrizePeriodForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formPrizeVisible"
                :before-close="hidePrizeForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <template>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="玩法组"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="玩法名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="奖金等级"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="修改确认">
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.isKey== 1"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="最低奖金">
                            <template slot-scope="scope">
                                <el-input v-model="formData.username" auto-complete="off"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="总利润">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="修改确认">
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.isKey== 1"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="最高返点">
                            <template slot-scope="scope">
                                <el-input v-model="formData.username" auto-complete="off"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="最高奖金">
                            <template slot-scope="scope">
                                <el-input v-model="formData.username" auto-complete="off" readonly="readonly"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="公司抽水">
                            <template slot-scope="scope">
                                <el-input v-model="formData.username" auto-complete="off" readonly="readonly"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="保存确认">
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.isKey== 1"/>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hidePrizeForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>


    </div>

</template>

<script>
    import {
        pgameList,
        authAdminRoleList,
        authAdminSave,
        updateLotteryGroupPropertySave,
        authAdminDelete
    } from "../../../api/play-management";

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1"
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
                tableData: [{
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
                }],
                query: {
                    merchant_name: "",
                    lottery_name: "",
                    way_type: "",
                    page: 1,
                    limit: 20
                },
                tableKey: 0,
                list: [],
                listChildren: [],
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
                formWayGroupLoading: false,
                formPrizePeriodLoading: false,
                formPrizeLoading: false,

                formWayGroupVisible: false,
                formPrizePeriodVisible: false,
                formPrizeVisible: false,

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
            rowExpand:function(row){
                this.listChildren = row.children;
            },
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

            updateLotteryGroupPropertySave(index, hot, recommand, newVal) {
                var params = {
                    id: index,
                    hot: hot,
                    recommand: recommand,
                    new: newVal
                }
                // debugger
                updateLotteryGroupPropertySave(params).then(
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

            getList() {
                this.loading = true;
                pgameList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list || [];
                        this.total = response.data.total || 0;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
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
           
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },

            // 隐藏表单
            hideWayGroupForm() {
                // 更改值
                this.formWayGroupVisible = !this.formWayGroupVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hidePrizePeriodForm() {
                // 更改值
                this.formPrizePeriodVisible = !this.formPrizePeriodVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hidePrizeForm() {
                // 更改值
                this.formPrizeVisible = !this.formPrizeVisible;
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
            // 显示表单
            handleWayGroupForm(index, row) {
                this.formWayGroupVisible = true;
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
            // 显示表单
            handlePrizePeriodForm(index, row) {
                this.formPrizePeriodVisible = true;
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
            // 显示表单
            handlePrizeForm(index, row) {
                this.formPrizeVisible = true;
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
            // this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
