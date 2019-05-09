<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
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
            <el-table-column label="Id" prop="id" fixed></el-table-column>
            <!--<el-table-column label="排序值" prop="id" fixed>
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="marqueeSequence(scope.$index, scope.row)"
                    ></el-input>
                </template>
            </el-table-column>-->
            <el-table-column label="商户名称 " prop="merchant_name" fixed></el-table-column>
            <el-table-column label="id " prop="id" fixed></el-table-column>
            <el-table-column label="日期 " prop="date" fixed></el-table-column>
            <el-table-column label="用户编号 " prop="user_id" fixed></el-table-column>
            <el-table-column label="终端" prop="terminal_id" fixed></el-table-column>
            <el-table-column label="彩种编号" prop="lottery_id" fixed></el-table-column>
            <el-table-column label="游戏类别" prop="game_type" fixed></el-table-column>
            <el-table-column label="游戏名称" prop="game_code" fixed></el-table-column>
            <el-table-column label="代理" prop="is_agent" fixed></el-table-column>
            <el-table-column label="测试账号" prop="is_tester" fixed></el-table-column>
            <el-table-column label="用户等级" prop="user_level" fixed></el-table-column>
            <el-table-column label="用户名" prop="username" fixed></el-table-column>
            <el-table-column label="余额" prop="ga_balance" fixed></el-table-column>
            <el-table-column label="投注金额" prop="turnover" fixed></el-table-column>
            <el-table-column label="中奖金额 " prop="prize" fixed></el-table-column>
            <!--<el-table-column label="折扣金额" prop="discount_amount " fixed></el-table-column>
            <el-table-column label="原始奖金" prop="origin_prize " fixed></el-table-column>
            <el-table-column label="输赢额度 " prop="profit" fixed></el-table-column>
            <el-table-column label="资金使用" prop="fund_used" fixed></el-table-column>
            <el-table-column label="创建时间" prop="created_at" fixed></el-table-column>
            <el-table-column label="更新时间" prop="updated_at" fixed></el-table-column>-->
            <el-table-column
                    label="操作" width="100"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">查看
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
                width="40%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm"  label-width="100px">
                <el-form-item label="商户名称" prop="merchant_name" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.merchant_name" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="id" prop="id" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.id" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="日期" prop="date" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.date" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="用户编号" prop="user_id" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.user_id" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="终端" prop="terminal_id" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.terminal_id" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="彩种编号" prop="lottery_id" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.lottery_id" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="游戏类别" prop="game_type" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.game_type" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="游戏名称" prop="game_code" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.game_code" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="代理" prop="is_agent" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.is_agent" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="测试账号" prop="is_tester" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.is_tester" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="用户等级" prop="user_level" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.user_level" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="用户名" prop="username" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.username" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="余额" prop="ga_balance" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.ga_balance" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="投注金额" prop="turnover" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.turnover" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="中奖金额" prop="prize" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.prize" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="折扣金额" prop="discount_amount" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.discount_amount" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="原始奖金" prop="origin_prize" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.origin_prize" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="输赢额度" prop="profit" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.profit" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="资金使用" prop="fund_used" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.fund_used" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="创建时间" prop="created_at" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.created_at" auto-complete="off"></el-input> </el-form-item>
                <el-form-item label="更新时间" prop="updated_at" fixed> <el-input style="width:550px;max-width:100%;" v-model="formData.updated_at" auto-complete="off"></el-input> </el-form-item>

                <el-form-item v-show="formData.ext_column1 != '' && formData.ext_column1 !=null" :label="formData.ext_column1" prop="ext_field1">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column2 != '' && formData.ext_column2 !=null" :label="formData.ext_column2" prop="ext_field2">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column3 != '' && formData.ext_column3 !=null" :label="formData.ext_column3" prop="ext_field3">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field3" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column4 != '' && formData.ext_column4 !=null" :label="formData.ext_column4" prop="ext_field4">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field4" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column5 != '' && formData.ext_column5 !=null" :label="formData.ext_column5" prop="ext_field5">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field5" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column6 != '' && formData.ext_column6 !=null" :label="formData.ext_column6" prop="ext_field6">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field6" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column7 != '' && formData.ext_column7 !=null" :label="formData.ext_column7" prop="ext_field7">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field7" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column8 != '' && formData.ext_column8 !=null" :label="formData.ext_column8" prop="ext_field8">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field8" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column9 != '' && formData.ext_column9 !=null" :label="formData.ext_column9" prop="ext_field9">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field9" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column10 != '' && formData.ext_column10 !=null" :label="formData.ext_column10" prop="ext_field10">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field10" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column11 != '' && formData.ext_column11 !=null" :label="formData.ext_column11" prop="ext_field11">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field11" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column12 != '' && formData.ext_column12 !=null" :label="formData.ext_column12" prop="ext_field2">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column13 != '' && formData.ext_column13 !=null" :label="formData.ext_column13" prop="ext_field13">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field13" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column14 != '' && formData.ext_column14 !=null" :label="formData.ext_column14" prop="ext_field14">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field14" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column15 != '' && formData.ext_column15 !=null" :label="formData.ext_column15" prop="ext_field15">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field15" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column16 != '' && formData.ext_column16 !=null" :label="formData.ext_column16" prop="ext_field16">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field16" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column17 != '' && formData.ext_column17 !=null" :label="formData.ext_column17" prop="ext_field17">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field17" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column18 != '' && formData.ext_column18 !=null" :label="formData.ext_column18" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column19 != '' && formData.ext_column19 !=null" :label="formData.ext_column19" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formData.ext_column20 != '' && formData.ext_column20 !=null" :label="formData.ext_column20" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">关闭</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        gaUserTurnoverList,
        marqueeSave,
        marqueeSequence,
        marqueeDelete
    } from "../../../api/third-game-management";

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
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20
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
            getList() {
                this.loading = true;
                gaUserTurnoverList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list.data || [];
                        this.total = response.data.list.total || 0;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
                    });
            },
            marqueeSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                marqueeSequence(params).then(
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
                        marqueeSave(data, this.formName).then(response => {
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
                            marqueeDelete(para)
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
