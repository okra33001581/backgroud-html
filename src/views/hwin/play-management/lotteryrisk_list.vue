<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="未验证" value="2"></el-option>
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
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :header-cell-style="getRowClass">

            <el-table-column label="ID" prop="game_id" fixed></el-table-column>
            <el-table-column label="游戏" prop="game" fixed></el-table-column>
            <el-table-column label="日期" prop="date" fixed></el-table-column>
            <el-table-column label="期号" prop="issue" fixed></el-table-column>
            <el-table-column label="投注人数" prop="project_people_count" fixed></el-table-column>
            <el-table-column label="中奖人数" prop="winner_people_count" fixed></el-table-column>
            <el-table-column label="中奖人数比例" prop="winner_people_count_ratio" fixed></el-table-column>
            <el-table-column label="注单数" prop="project_count" fixed></el-table-column>
            <el-table-column label="中奖注单数" prop="winner_project_count" fixed></el-table-column>
            <el-table-column label="中奖注单比例" prop="winner_project_count_ratio" fixed></el-table-column>
            <el-table-column label="下注总额" prop="project_amount" fixed></el-table-column>
            <el-table-column label="返奖总额" prop="back_award_amount" fixed></el-table-column>
            <el-table-column label="亏损比" prop="loss_ratio" fixed></el-table-column>
            <el-table-column label="状态" prop="status" fixed></el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
            <template slot-scope="scope">
                <el-button type="success" size="small" @click.native="auditRisk(scope.$index, scope.row,'pass')">通过
                </el-button>
                <el-button type="danger" size="small" @click.native="auditRisk(scope.$index, scope.row,'refuse')">拒绝
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

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="ID" prop="game_id"><el-input v-model="formData.game_id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="游戏" prop="game"><el-input v-model="formData.game" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="日期" required>
                <el-col :span="8">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="8">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
                <el-form-item label="期号" prop="issue"><el-input v-model="formData.issue" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="投注人数" prop="project_people_count"><el-input v-model="formData.project_people_count" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="中奖人数" prop="winner_people_count"><el-input v-model="formData.winner_people_count" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="中奖人数比例" prop="winner_people_count_ratio"><el-input v-model="formData.winner_people_count_ratio" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="注单数" prop="project_count"><el-input v-model="formData.project_count" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="中奖注单数" prop="winner_project_count"><el-input v-model="formData.winner_project_count" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="中奖注单比例" prop="winner_project_count_ratio"><el-input v-model="formData.winner_project_count_ratio" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="下注总额" prop="project_amount"><el-input v-model="formData.project_amount" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="返奖总额" prop="back_award_amount"><el-input v-model="formData.back_award_amount" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="亏损比" prop="loss_ratio"><el-input v-model="formData.loss_ratio" auto-complete="off"></el-input></el-form-item>

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
        lotteryriskList,
        lotteryriskStatusSave,
        lotteryriskSave,
        lotteryriskDelete
    } from "../../../api/play-management";

    const formJson = {
        id: "",
        game: "",
        date: "",
        issue: "",
        project_people_count: "",
        winner_people_count: "",
        winner_people_count_ratio: "",
        project_count: "",
        winner_project_count: "",
        winner_project_count_ratio: "",
        project_amount: "",
        back_award_amount: "",
        status: "",
        loss_ratio: ""
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
                query: {
                    merchant_name: "",
                    status: "",
                    page: 1,
                    limit: 20,
                },
                tableKey: 0,
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
                    game_id: [
                        {required: true, message: "请输入ID", trigger: "blur"}
                    ],
                    game: [
                        {required: true, message: "请输入游戏", trigger: "blur"}
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    issue: [
                        {required: true, message: "请输入期号", trigger: "blur"}
                    ],
                    project_people_count: [
                        {required: true, message: "请输入姓名投注人数", trigger: "blur"}
                    ],
                    winner_people_count: [
                        {required: true, message: "请输入中奖人数", trigger: "blur"}
                    ],
                    winner_people_count_ratio: [
                        {required: true, message: "请输入中奖人数比例", trigger: "blur"}
                    ],
                    project_count: [
                        {required: true, message: "请输入注单数", trigger: "blur"}
                    ],
                    winner_project_count: [
                        {required: true, message: "请输入中奖注单数", trigger: "blur"}
                    ],
                    winner_project_count_ratio: [
                        {required: true, message: "请输入中奖注单比例", trigger: "blur"}
                    ],
                    project_amount: [
                        {required: true, message: "请输入下注总额", trigger: "blur"}
                    ],
                    back_award_amount: [
                        {required: true, message: "请输入返奖总额", trigger: "blur"}
                    ],
                    loss_ratio: [
                        {required: true, message: "请输入亏损比", trigger: "blur"}
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
            getList() {
                this.loading = true;
                lotteryriskList(this.query)
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
          
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },

            auditRisk(index, row,type) {
                var params = {
                    id: row.id,
                    flag: type
                }
                // debugger
                lotteryriskStatusSave(params).then(
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

            // 显示表单
            handleForm(index, row) {
                this.formVisible = true;
                this.formData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formData = Object.assign({}, row);
                }
                this.formName = "add";
                this.formRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formName = "edit";
                    //this.formRules = this.editRules;
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
                        var date1 = new Date(this.formData.date1);  
                        var date2 = new Date(this.formData.date2);  
                        this.formData.date=date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();  
                        delete this.formData.date1;
                        delete this.formData.date2;
                        let data = Object.assign({}, this.formData);
                        lotteryriskSave(data).then(response => {
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
                            lotteryriskDelete(para)
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
