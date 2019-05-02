<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="代理账号" value="0"></el-option>
                    <el-option label="绑定域名" value="1"></el-option>
                    <el-option label="邀请码" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.info" placeholder=""></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.count" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="注册人数" value="0"></el-option>
                    <el-option label="访问量" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.begin_count"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-input v-model="query.end_count"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.type" placeholder="开户类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="代理" value="0"></el-option>
                    <el-option label="会员" value="1"></el-option>
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
            <el-table-column label="ID" prop="merchant_id" fixed></el-table-column>
            <el-table-column label="商户名称" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="代理账号" prop="delegate_account" fixed></el-table-column>
            <el-table-column label="邀请码" prop="invite_code" fixed></el-table-column>
            <el-table-column label="绑定域名" prop="bind_domain" fixed></el-table-column>
            <el-table-column label="访问量" prop="visit_count" fixed></el-table-column>
            <el-table-column label="返点" prop="rebate" fixed></el-table-column>
            <el-table-column label="注册人数" prop="register_people_count" fixed></el-table-column>
            <el-table-column label="开户类型" prop="open_account_type" fixed></el-table-column>
            <el-table-column label="生成时间" prop="generated_at" fixed></el-table-column>
            <el-table-column label="备注" prop="memo" fixed></el-table-column>
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

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" label-width="16%" :rules="formRules" ref="dataForm">
                <el-form-item label="代理账号" prop="delegate_account">
                    <el-input v-model="formData.delegate_account" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="绑定域名" prop="bind_domain">
                    <el-input v-model="formData.bind_domain" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示邀请码" prop="invite_code">
                    <el-select v-model="formData.invite_code" placeholder="是否显示邀请码">
                        <el-option value="不显" label="不显"></el-option>
                        <el-option value="显示" label="显示"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开户类型" prop="open_account_type">
                    <el-select v-model="formData.open_account_type" placeholder="开户类型">
                        <el-option value="会员" label="会员"></el-option>
                        <el-option value="代理" label="代理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推广链接返点设置" prop="rebate">
                    <el-input v-model="formData.rebate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                    <el-input v-model="formData.memo" auto-complete="off"></el-input>
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
        proxycommissionProxylist,
        proxycommissionProxySave,
        proxycommissionProxyDelete
    } from "../../../api/delegate-management";

    const formJson = {
        id: "",
        bind_domain: "",
        invite_code: "",
        open_account_type: "",
        rebate: "",
        memo: ""
    };
    export default {
        data() {
            
            return {
                query: {
                    status: "",
                    count: "",
                    type: "",
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
                    delegate_account: [
                        {required: true, message: "代理账号", trigger: "blur"}
                    ],
                    bind_domain: [
                        {required: true, message: "请输入绑定域名", trigger: "blur"}
                    ],
                    invite_code: [
                        {required: true, message: "请输入邀请码", trigger: "blur"}
                    ],
                    rebate: [
                        {required: true, message: "请输入返点", trigger: "blur"}
                    ],
                    open_account_type: [
                        {required: true, message: "请选择开户类型", trigger: "blur"}
                    ]
                },
                editRules: {
        
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
                proxycommissionProxylist(this.query)
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
            // 显示表单
            handleForm(index, row) {
                this.formVisible = true;
                this.formData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formData = Object.assign({}, row);
                }
                //this.formData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
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
                        proxycommissionProxySave(data).then(response => {
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
                            proxycommissionProxyDelete(para)
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
