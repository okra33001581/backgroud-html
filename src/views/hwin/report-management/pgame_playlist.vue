<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">


            <el-form-item class="query-form-item">
                <el-select v-model="query.way_type" placeholder="玩法类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="官方玩法" value="官方玩法"></el-option>
                    <el-option label="信用玩法" value="信用玩法"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.lottery" placeholder="游戏名称">
                    <el-option label="全部游戏" value="0"> </el-option>
                    <el-option label="江西多乐彩(官)" value="江西多乐彩(官)"></el-option>
                    <el-option label="江西多乐彩(信)" value="江西多乐彩(信)"></el-option>
                    <el-option label="广东十一选五(官)" value="广东十一选五(官)"></el-option>
                    <!--<el-option label="广东十一选五(信)" value="4"></el-option>
                    <el-option label="十一运夺金(官)" value="5"></el-option>
                    <el-option label="新疆时时彩(官)" value="6"></el-option>
                    <el-option label="上海时时乐(官)" value="7"></el-option>
                    <el-option label="北京快乐八(官)" value="8"></el-option>
                    <el-option label="重庆时时彩(官)" value="9"></el-option>
                    <el-option label="福彩3D(官)" value="10"></el-option>
                    <el-option label="排列三、五(官)" value="11"></el-option>
                    <el-option label="江苏快三(官)" value="12"></el-option>
                    <el-option label="江苏快三(信)" value="13"></el-option>
                    <el-option label="天津时时彩(信)" value="14"></el-option>
                    <el-option label="天津时时彩(官)" value="15"></el-option>
                    <el-option label="香港六合彩(信)" value="16"></el-option>
                    <el-option label="安徽快三(官)" value="17"></el-option>
                    <el-option label="安徽快三(信)" value="18"></el-option>
                    <el-option label="一路发财(官)" value="19"></el-option>
                    <el-option label="五福临门(官)" value="20"></el-option>
                    <el-option label="十全十美(信)" value="21"></el-option>
                    <el-option label="十全十美(官)" value="22"></el-option>
                    <el-option label="北京PK拾(信)" value="23"></el-option>
                    <el-option label="重庆时时彩(信)" value="24"></el-option>
                    <el-option label="北京PK拾(官)" value="25"></el-option>
                    <el-option label="五福临门(信)" value="26"></el-option>
                    <el-option label="一路发财(信)" value="27"></el-option>
                    <el-option label="十一运夺金(信)" value="28"></el-option>
                    <el-option label="幸运飞艇(信)" value="29"></el-option>
                    <el-option label="幸运飞艇(官)" value="30"></el-option>
                    <el-option label="广西快三(官)" value="31"></el-option>
                    <el-option label="广西快三(信)" value="32"></el-option>
                    <el-option label="新加坡快三(信)" value="33"></el-option>
                    <el-option label="新加坡快三(官)" value="34"></el-option>
                    <el-option label="夏威夷快三(信)" value="35"></el-option>
                    <el-option label="夏威夷快三(官)" value="36"></el-option>
                    <el-option label="十分六合彩(信)" value="37"></el-option>
                    <el-option label="极速六合彩(信)" value="38"></el-option>
                    <el-option label="极速赛马(信)" value="39"></el-option>
                    <el-option label="极速赛马(官)" value="40"></el-option>
                    <el-option label="极速十一选五(信)" value="41"></el-option>
                    <el-option label="极速十一选五(官)" value="42"></el-option>
                    <el-option label="五分六合彩(信)" value="43"></el-option>
                    <el-option label="三分赛车(信)" value="44"></el-option>
                    <el-option label="三分赛车(官)" value="45"></el-option>
                    <el-option label="甘肃快三(信)" value="46"></el-option>
                    <el-option label="甘肃快三(官)" value="47"></el-option>
                    <el-option label="吉林快三(官)" value="48"></el-option>
                    <el-option label="吉林快三(信)" value="49"></el-option>
                    <el-option label="河北快三(信)" value="50"></el-option>
                    <el-option label="河北快三(官)" value="51"></el-option>
                    <el-option label="北京快三(信)" value="52"></el-option>
                    <el-option label="北京快三(官)" value="53"></el-option>
                    <el-option label="上海快三(官)" value="54"></el-option>
                    <el-option label="上海快三(信)" value="55"></el-option>
                    <el-option label="极速快三(信)" value="56"></el-option>
                    <el-option label="极速快三(官)" value="57"></el-option>
                    <el-option label="3D北京PK拾(信)" value="58"></el-option>
                    <el-option label="3D北京PK拾(官)" value="59"></el-option>
                    <el-option label="3D幸运飞艇(信)" value="60"></el-option>
                    <el-option label="3D幸运飞艇(官)" value="61"></el-option>
                    <el-option label="3D极速快三(官)" value="62"></el-option>
                    <el-option label="3D极速快三(信)" value="63"></el-option>
                    <el-option label="3D极速赛马(信)" value="64"></el-option>
                    <el-option label="3D极速赛马(官)" value="65"></el-option>
                    <el-option label="一分快三1(官)" value="66"></el-option>
                    <el-option label="一分快三1(信)" value="67"></el-option>
                    <el-option label="时时分分彩1(官)" value="68"></el-option>
                    <el-option label="时时分分彩1(信)" value="69"></el-option>
                    <el-option label="一分PK拾1(信)" value="70"></el-option>
                    <el-option label="一分PK拾1(官)" value="71"></el-option>
                    <el-option label="一分十一选五(官)" value="72"></el-option>
                    <el-option label="一分十一选五(信)" value="73"></el-option>
                    <el-option label="新疆时时彩(信)" value="74"></el-option>
                    <el-option label="一分六合彩(信)" value="75"></el-option>-->

                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.way" placeholder="游戏玩法">
                    <el-option label="全部" value=""></el-option>

                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.prize_status" placeholder="中奖状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未判断"  value="未判断"></el-option>
                    <el-option label="中奖" value="中奖"></el-option>
                    <el-option label="未中奖" value="未中奖"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.operate_type" placeholder="用户撤单">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常"  value="正常"></el-option>
                    <el-option label="用户撤单" value="用户撤单"></el-option>
                    <el-option label="系统撤单" value="系统撤单"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd 00:00:00" format="yyyy-MM-dd 00:00:00">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd 23:59:59" format="yyyy-MM-dd 23:59:59">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.sort" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="逆序" value="逆序"></el-option>
                    <el-option label="顺序" value="顺序"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.prize_type" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="奖金" value="奖金"></el-option>
                    <el-option label="倍数" value="倍数"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.min" placeholder="min" style="width:150px;"></el-input>
                <el-input v-model="query.max" placeholder="max" style="width:150px;"></el-input>
            </el-form-item>



            <el-form-item class="query-form-item">
                <el-select v-model="query.select_info_type" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="用户名" value="用户名"></el-option>
                    <el-option label="注单" value="注单"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.issue" placeholder="期数"></el-input>
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
                    <el-button type="primary" icon="el-icon-search" @click="handleDownload">excel</el-button>
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

            <el-table-column label="					ID		" prop="id" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="					注单		" prop="project" fixed></el-table-column>
            <el-table-column label="					用户名		" prop="uername" fixed></el-table-column>
            <el-table-column label="					时间		" prop="date" fixed></el-table-column>
            <el-table-column label="					彩种		" prop="lottery" fixed></el-table-column>
            <el-table-column label="					期数		" prop="issue_count" fixed></el-table-column>
            <el-table-column label="					开奖结果		" prop="prize_number" fixed></el-table-column>
            <el-table-column label="					玩法		" prop="way" fixed></el-table-column>
            <el-table-column label="					动态奖金		" prop="dynamic_prize" fixed></el-table-column>
            <el-table-column label="					投注内容		" prop="project_content" fixed></el-table-column>
            <el-table-column label="					倍数		" prop="multiple" fixed></el-table-column>
            <el-table-column label="					投注总金额		" prop="total_amount" fixed></el-table-column>
            <el-table-column label="					模式		" prop="mode" fixed></el-table-column>
            <el-table-column label="					返点金额		" prop="rebate_amount" fixed></el-table-column>
            <el-table-column label="					中奖金额		" prop="prize_amount" fixed></el-table-column>
            <el-table-column label="					中奖状态		" prop="prize_status" fixed></el-table-column>
            <el-table-column label="					状态		" prop="status" fixed></el-table-column>

           <!-- <el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-view" @click.native="handleForm(scope.$index, scope.row)">查看
                    </el-button>
                   &lt;!&ndash; <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>&ndash;&gt;
                </template>
            </el-table-column>-->
        </el-table>

        <el-pagination
                :page-size="query.limit"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>

        <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

        <!--表单-->
        <!--<el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="			ID		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			注单		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			用户名		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			时间		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			彩种		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			期数		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			开奖结果		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			玩法		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			动态奖金		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			投注内容		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			倍数		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			投注总金额		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			模式		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			返点金额		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			中奖金额		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			中奖状态		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="			状态		" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">关闭</el-button>
                &lt;!&ndash;<el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>&ndash;&gt;
            </div>
        </el-dialog>-->
    </div>

</template>

<script>
    import {
        pgamePlaylist,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/report-management";

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
                excelList: [],
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
            getDayBetween(flag) {
                this.query.datePeriod = flag;
            },
            handleFilter() {
                this.query.page = 1
                this.getList()
            },
            handleDownload() {
                this.downloadLoading = true
                this.loading = true;
                let params = Object.assign({}, this.query, {'limit': 9999});
                pgamePlaylist(params)
                    .then(response => {
                        this.excelList = response.data.list.data || [];
                        import('@/vendor/Export2Excel').then(excel => {
                            const tHeader = ['ID','商户名称', '注单', '用户名', '时间', '彩种', '期数', '开奖结果','玩法','动态奖金','投注内容','倍数','投注总金额','模式','返点金额','中奖金额','中奖状态','状态']
                            const filterVal = ['id','merchant_name', 'project', 'uername', 'date', 'lottery', 'issue_count', 'prize_number', 'way', 'dynamic_prize', 'project_content', 'multiple', 'total_amount', 'mode', 'rebate_amount','prize_amount','prize_status','status']
                            const excelList = this.excelList
                            const data = this.formatJson(filterVal, excelList)
                            excel.export_json_to_excel({
                                header: tHeader,
                                data,
                                filename: this.filename,
                                autoWidth: this.autoWidth
                            })
                            this.downloadLoading = false
                        })


                    })
                    .catch(() => {
                    });

                this.loading = false;
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
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
                pgamePlaylist(this.query)
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
