<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        value-format="yyyy-MM-dd 00:00:00" format="yyyy-MM-dd 00:00:00"
                        placeholder="开始时间">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd 23:59:59" format="yyyy-MM-dd 23:59:59">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">


                <el-button @click="getDayBetween('yesterday')">昨天</el-button>
                <el-button @click="getDayBetween('today')">今天</el-button>
                <el-button @click="getDayBetween('last_week')">上周</el-button>
                <el-button @click="getDayBetween('current_week')">本周</el-button>
                <el-button @click="getDayBetween('last_month')">上月</el-button>
                <el-button @click="getDayBetween('current_month')">本月</el-button>
                <el-button @click="getDayBetween('last_three_month')">近三月</el-button>

                <!--<el-button>昨天</el-button>-->
                <!--<el-button>上周</el-button>-->
                <!--<el-button>本周</el-button>-->
                <!--<el-button>上月</el-button>-->
                <!--<el-button>本月</el-button>-->
                <!--<el-button>近三月</el-button>-->
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.model" placeholder="模式">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="日表" value="日表"></el-option>
                    <el-option label="月表" value="月表"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.platform" placeholder="游戏平台">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="彩票" value="彩票"></el-option>
                    <el-option label="开元棋牌" value="开元棋牌"></el-option>
                    <el-option label="乐游棋牌" value="乐游棋牌"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.search_type" placeholder="数据来源">
                    <el-option label="ES" value="ES"></el-option>
                    <el-option label="MYSQL" value="MYSQL"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="handleDownload">excel</el-button>
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>-->
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
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">

            <el-table-column label="ID" prop="id" fixed></el-table-column>
            <el-table-column label="商户名称" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="日期" prop="date" fixed></el-table-column>
            <el-table-column label="平台" prop="platform" fixed></el-table-column>
            <el-table-column label="模式" prop="model" fixed></el-table-column>
            <el-table-column label="ip量" prop="ip_count" fixed></el-table-column>
            <el-table-column label="注册人数" prop="register_count" fixed></el-table-column>
            <el-table-column label="活跃数" prop="active_count" fixed></el-table-column>
            <el-table-column label="首存人数" prop="first_deposit_count" fixed></el-table-column>
            <el-table-column label="首存金额" prop="first_deposit_amount" fixed></el-table-column>
            <el-table-column label="入款人数" prop="in_people_count" fixed></el-table-column>
            <el-table-column label="入款次数" prop="in_times" fixed></el-table-column>
            <el-table-column label="出款次数" prop="out_times" fixed></el-table-column>

            <!--<el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-view" @click.native="handleForm(scope.$index, scope.row)">查看
                    </el-button>
                  &lt;!&ndash;  <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
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
                <el-form-item label="ID" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="日期" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="ip量" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="注册人数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="活跃数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="首存人数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="首存金额" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="入款人数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="入款次数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="出款次数" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
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
        userReport,
        authAdminSave,
        authAdminDelete
    } from "../../../api/report-management";

    const formJson = {
        id: "",
        username: "",
        status: "1"
    };
    export default {
        data() {
            return {
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20
                },
                tableKey: 0,
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
            handleDownload() {
                this.downloadLoading = true
                this.loading = true;
                let params = Object.assign({}, this.query, {'limit': 9999});
                userReport(params)
                    .then(response => {
                        this.excelList = response.data.list.data || response.data.list;
                            import('@/vendor/Export2Excel').then(excel => {
                                const tHeader = ['ID','商户名称', '日期', '平台', '模式', 'ip量', '注册人数', '活跃数','首存人数','首存金额','入款人数','入款次数','出款次数']
                                const filterVal = ['id','merchant_name', 'date', 'platform', 'model', 'ip_count', 'register_count', 'active_count', 'first_deposit_count', 'first_deposit_amount', 'in_people_count', 'in_times', 'out_times']
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
            getList() {
                this.loading = true;
                userReport(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list.data || response.data.list;
                        this.total = response.data.list.total || response.data.total;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
                    });
            },
            getDayBetween(flag) {
                this.query.datePeriod = flag;
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
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
