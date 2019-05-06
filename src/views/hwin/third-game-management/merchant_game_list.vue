<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户名称"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.type" placeholder="游戏分类"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.plat_name" placeholder="游戏平台"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.sub_game_name" placeholder="游戏明细"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="启用"></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                </el-select>
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
            <el-table-column label="排序值" prop="id" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="thirdMerchantGameSequence(scope.$index, scope.row)"
                    ></el-input>
                </template>

            </el-table-column>
            <el-table-column label="商户名称" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="游戏分类" prop="type" fixed></el-table-column>
            <el-table-column label="游戏平台" prop="plat_name" fixed></el-table-column>
            <el-table-column label="游戏明细" prop="sub_game_name" fixed></el-table-column>

            <el-table-column label="图标" prop="sub_game_icon" >
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            title=""
                            trigger="hover">
                        <img :src="'http://apidemo.test/public/' + scope.row.sub_game_icon"/>
                        <img slot="reference" :src="'http://apidemo.test/public/' + scope.row.sub_game_icon" :alt="sub_game_icon" style="max-height: 50px;max-width: 130px">
                    </el-popover>
                </template>

            </el-table-column>
            <el-table-column label="游戏费用" prop="id" fixed>
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.fee" placeholder="请输入排序值" @keyup.enter.native="thirdMerchantGameFee(scope.$index, scope.row)"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column label="游戏明细费用" prop="id" fixed>
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sub_fee" placeholder="请输入排序值" @keyup.enter.native="thirdMerchantGameSubFee(scope.$index, scope.row)"
                    ></el-input>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>-->
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>

                    <el-button v-if="scope.row.status === '禁用' || scope.row.status === null" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'启用')">启用
                    </el-button>
                    <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'禁用')">禁用
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
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="Id" prop="id">
                    <el-input v-model="formData.id" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="排序值" prop="sequence">
                    <el-input v-model="formData.sequence" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="商户名称" prop="merchant_name">
                    <el-input v-model="formData.merchant_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="游戏分类" prop="type">
                    <el-input v-model="formData.type" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="游戏平台" prop="plat_name">
                    <el-input v-model="formData.plat_name" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="游戏明细" prop="sub_game_name">
                    <el-input v-model="formData.sub_game_name" auto-complete="off"></el-input>
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
        merchantGameList,
        thirdMerchantGameStatusSave,
        thirdMerchantGameSequence,
        thirdMerchantGameFee,
        thirdMerchantGameSubFee,
        thirdMerchantgameDel
    } from "../../../api/third-game-management";

    const formJson = {
        id: "",
        sequence: "",
        merchant_name: "",
        type: "",
        plat_name: "1",
        sub_game_name: "1"
    };
    export default {
        data() {
            return {
                query: {
                    merchant_name: "",
                    status: "",
                    page: 1,
                    limit: 20,
                    plat_name: '',
                    sub_game_name: "",
                    type: ''
                },
                tableKey: 0,
                sub_game_icon:'',
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
            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                thirdMerchantGameStatusSave(params).then(
                    function (res) {
                        // debugger
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.dialogFormVisible = false
                        }else{
                            this.$message({
                                message: '错误信息：'+res.message,
                                type: 'error'
                            });
                        }
                        this.getList();
                    }.bind(this)
                )
            },
            getList() {
                this.loading = true;
                merchantGameList(this.query)
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
            thirdMerchantGameSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                thirdMerchantGameSequence(params).then(
                    function (res) {
                        this.$message({
                            message: '数据处理成功',
                            type: 'success'
                        })
                        this.getList();
                    }.bind(this)
                )
            },
            thirdMerchantGameFee(index, row) {
                var params = {
                    fee: row.fee,
                    type: row.type,
                    plat_name: row.plat_name
                }
                // debugger
                thirdMerchantGameFee(params).then(
                    function (res) {
                        this.$message({
                            message: '数据处理成功',
                            type: 'success'
                        })
                        this.getList();
                    }.bind(this)
                )
            },
            thirdMerchantGameSubFee(index, row) {
                var params = {
                    id: row.id,
                    sub_fee: row.sub_fee
                }
                // debugger
                thirdMerchantGameSubFee(params).then(
                    function (res) {
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
                            thirdMerchantgameDel(para)
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
