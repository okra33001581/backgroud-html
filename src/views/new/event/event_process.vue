<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.username" :placeholder="$t('page.username')"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" :placeholder="$t('page.event_object')">
                    <el-option label="充值赠送" value=""></el-option>
                    <el-option label="彩金红包" value="0"></el-option>
                    <el-option label="首充赠送" value="1"></el-option>
                    <el-option label="注册送彩金" value="2"></el-option>
                    <el-option label="反水" value="3"></el-option>
                    <el-option label="盈亏赠送" value="4"></el-option>
                    <el-option label="投注赠送" value="5"></el-option>
                    <el-option label="救援金" value="6"></el-option>
                    <el-option label="抽奖" value="7"></el-option>
                    <el-option label="签到" value="8"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        :placeholder="$t('page.begin_date')"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        :placeholder="$t('page.end_date')"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="$t('page.status')">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">{{$t('page.search')}}</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">{{$t('page.batch')}}</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>


        <template v-if="this.$i18n.locale == 'en-us'">
              <split-table :headData="headDataEn" :bodyData="bodyData" @multipleData="multipleData" @editData="editData" :tableEditFlag="false" :checkFlag="false">
            <template slot="operate" slot-scope="props">
                <span @click="splitEdit(props.rowData)">{{$t('page.refresh')}}</span>
                <!--<span @click="splitAdd(props.rowData)">关闭</span>
                <span @click="splitDel(props.rowData)">删除</span>-->
            </template>
        </split-table>
        </template>
        <template v-else>
              <split-table :headData="headData" :bodyData="bodyData" @multipleData="multipleData" @editData="editData" :tableEditFlag="false" :checkFlag="false">
            <template slot="operate" slot-scope="props">
                <span @click="splitEdit(props.rowData)">{{$t('page.refresh')}}</span>
                <!--<span @click="splitAdd(props.rowData)">关闭</span>
                <span @click="splitDel(props.rowData)">删除</span>-->
            </template>
        </split-table>
        </template>

       <!-- <template>
            <split-table :headData="headData" :bodyData="bodyData" @multipleData="multipleData" @editData="editData" :tableEditFlag="false" :checkFlag="false">
                <template slot="operate" slot-scope="props">
                    <span @click="splitEdit(props.rowData)">{{$t('page.refresh')}}</span>
                    &lt;!&ndash;<span @click="splitAdd(props.rowData)">关闭</span>
                    <span @click="splitDel(props.rowData)">删除</span>&ndash;&gt;
                </template>
            </split-table>
        </template>-->

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

                <el-form-item label="$t('page.begin_date')" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="$t('page.end_date')" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="$t('page.sort')" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="PC端 Banner" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="PC端 活动详情" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="移动端 Banner" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="移动端 活动类型" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="移动端 活动详情" prop="username">
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
        activityList,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/event-management";

    import SplitTable from 'vue-split-table';

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        roles: []
    };
    export default {
        components: { SplitTable },
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
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                headData: ["活动组" ,"进度","用户名称", "活动名称", "存款", "赠送", "流水进度", "申请时间", "状态"],
                headDataEn: ["event_group" ,"process","username", "event_name", "deposit", "benefit", "turnover_process", "request_date", "status"],
                bodyData: [
                    // { city: "活动组#A001", '85%',food: "user001", fun: ["随机红包", "存送100%", "常态存款"], fun1: ["0", "100", "100"], fun2: ["20", "100", "0"], fun3: ["2018-05-12 11:11:11", "2018-05-12 11:11:11", "2018-05-12 11:11:11"], fun4: ["2018-05-12 11:11:11", "2018-05-12 11:11:11", "2018-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]},
                    {
                        city: "活动组#A0001",city1: "22%",food: ["user0001"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["0", "100", "100"], fun2: ["20", "100", "0"], fun3: ["20%", "11%", "2%"], fun4: ["2018-05-12 11:11:11", "2018-05-12 11:11:11", "2018-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0002",city1: "33%",food: ["user0002"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["10", "33", "44"], fun2: ["55", "66", "77"], fun3: ["11%", "22%", "3%"], fun4: ["2012-1-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0003",city1: "33%",food: ["user0003"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["11", "34", "44"], fun2: ["55", "66", "77"], fun3: ["22%", "33%", "44%"], fun4: ["2012-2-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0004",city1: "33%",food: ["user0004"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["13", "35", "44"], fun2: ["55", "66", "77"], fun3: ["33%", "44%", "55%"], fun4: ["2012-3-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0005",city1: "33%",food: ["user0005"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["14", "13", "44"], fun2: ["55", "66", "77"], fun3: ["44%", "55%", "66%"], fun4: ["2012-4-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0006",city1: "33%",food: ["user0006"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["15", "14", "44"], fun2: ["55", "66", "77"], fun3: ["55%", "66%", "77%"], fun4: ["2012-5-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0007",city1: "33%",food: ["user0007"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["16", "15", "44"], fun2: ["55", "66", "77"], fun3: ["66%", "77%", "88%"], fun4: ["2012-6-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    },
                    {
                        city: "活动组#A0008",city1: "33%",food: ["user0008"],fun: ["随机红包", "存送100%", "常态存款"], fun1: ["17", "16", "44"], fun2: ["55", "66", "77"], fun3: ["77%", "88%", "99%"], fun4: ["2012-7-12 11:11:11", "2013-05-12 11:11:11", "2014-05-12 11:11:11"], fun5: ["进行中", "进行中", "进行中"]
                    }

        ],
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
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
            },
            arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 1) {
                    // 合并第二行
                    if (columnIndex === 1) {
                        // 从第二列开始
                        return [1, 2]
                        // 这里返回的是行和列的合并数量,可以返回一个数组,也可以返回一个对象,效果一样
                        // 这里rowspan为2是行有两行合并,colspan为3是列有3列合并,你要合并几行几列就写上相应的数字
                        // 这个判断是把第一行的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
                   /* } else if (columnIndex === 2 || columnIndex === 3) {
                        return [0, 0]*/
                    }
                }
                /*else if (rowIndex === 2 && (columnIndex === 1 || columnIndex === 2 || columnIndex === 3)) {
                    // 第二行的第2个数,第3个数,第4个数都要省略
                    return [0, 0]
                }*/
            },
            splitEdit(rowData) {
                console.log("rowData值为", rowData);
            },
            editData(data) {
                console.log("编辑所在行的值为", data);
            },
            splitAdd(data) {
                console.log("新增所在行的值为", data);
            },
            splitDel(data) {
                console.log("删除所在行的值为", data);
            },
            multipleData(data) {
                console.log("复选框选择的值为", data);
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
                activityList(this.query)
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
        watch: {
            tableData() {
                this.spanArr = [];
                this.getSpanArr(this.tableData);

            }
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
