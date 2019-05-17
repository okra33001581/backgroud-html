<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.table_name" placeholder="表名称"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.es_name" placeholder="ES表名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
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
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">

            <el-table-column label="id" prop="id" fixed></el-table-column>
            <el-table-column label="表名称" prop="table_name" fixed></el-table-column>
            <el-table-column label="内容" prop="table_desc" fixed></el-table-column>
            <el-table-column label="记录数量" prop="table_record_count" fixed></el-table-column>
            <el-table-column label="ES表名称" prop="es_name" fixed></el-table-column>
            <el-table-column label="内容" prop="es_desc" fixed></el-table-column>
            <el-table-column label="记录数量" prop="es_record_count" fixed></el-table-column>

            <!--<el-table-column
                    label="操作" width="100"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">清除ES
                    </el-button>
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
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="40%"
                top="5vh">
            <el-form :model="formData" label-width="14%" :rules="formRules" ref="dataForm">
                <el-form-item label="id" prop="id" fixed><el-input v-model="formData.id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="表名称" prop="table_name" fixed><el-input v-model="formData.table_name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="内容" prop="table_desc" fixed><el-input v-model="formData.table_desc" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="记录数量" prop="table_record_count" fixed><el-input v-model="formData.table_record_count" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="ES表名称" prop="es_name" fixed><el-input v-model="formData.es_name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="内容" prop="es_desc" fixed><el-input v-model="formData.es_desc" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="记录数量" prop="es_record_count" fixed><el-input v-model="formData.es_record_count" auto-complete="off"></el-input></el-form-item>
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
        systemMonitorList,
        systemMonitorClear,
        transactionTypeStatusSave,
        transactionTypeDel
    } from "../../../api/system-management";

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1"
    };
    export default {
        data() {
            return {
                query: {
                    table_name: "",
                    es_name: "",
                    page: 1,
                    limit: 20
                },
                tableKey: 0,
                pc_pic:'',
                mobile_pic:'',
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
                    table_name: [
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    es_name: [
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
            auditItemSubServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                transactionTypeStatusSave(params).then(
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
                systemMonitorList(this.query)
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
            beforeAvatarUpload(file) {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                const isLt2M = file.size / 1024 / 1024 < 10
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }  return extension || extension2 && isLt2M
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePic1Success(response, file, fileList) {
                //response这个
                this.formData.pc_pic = response.data;
            },
            handlePic2Success(response, file, fileList) {
                //response这个
                this.formData.mobile_pic = response.data;
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
            transactionTypeStatusSave(row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                transactionTypeStatusSave(params).then(
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
                        transactionTypeSave(data, this.formName).then(response => {
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
                    this.$confirm("确认清除该记录吗?", "提示", {
                        type: "warning"
                    })
                        .then(() => {
                            let para = {id: row.id};
                            systemMonitorClear(para)
                                .then(response => {
                                    this.deleteLoading = false;
                                    // debugger
                                    if(response.code === 1){
                                        this.$message({
                                            message: response.message,
                                            type: 'success'
                                        })
                                        this.getList();
                                    }else{
                                        this.$message({
                                            message: '错误信息：'+response.message,
                                            type: 'error'
                                        });
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
                    1: "启用",
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
