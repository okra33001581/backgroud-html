<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户名称"></el-input>
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

            <el-table-column label="id" prop="id" fixed></el-table-column>
            <el-table-column label="排序值" prop="sequence" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="sysConfigsSequenceSave(scope.row)"
                    ></el-input>
                </template>
            </el-table-column>

            <el-table-column label="祖先ID" prop="parent_id" fixed></el-table-column>
            <el-table-column label="祖先" prop="parent" fixed></el-table-column>
            <el-table-column label="项目" prop="item" fixed></el-table-column>
            <el-table-column label="值" prop="value" fixed></el-table-column>
            <el-table-column label="默认值" prop="default_value" fixed></el-table-column>
            <el-table-column label="标题" prop="title" fixed></el-table-column>
            <el-table-column label="描述" prop="description" fixed></el-table-column>
            <el-table-column label="状态" prop="status" fixed></el-table-column>
            <el-table-column label="修改时间" prop="updated_at" fixed></el-table-column>


            <el-table-column
                    label="操作" width="360"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleSubForm(scope.$index, scope.row)">明细
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'禁用')">禁用
                    </el-button>
                    <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'启用')">启用
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
            <el-form :model="formData" label-width="14%" :rules="formRules" ref="dataForm">
                <el-form-item label="祖先ID" prop="parent_id" fixed><el-input v-model="formData.parent_id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="祖先" prop="parent" fixed><el-input v-model="formData.parent" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="项目" prop="item" fixed><el-input v-model="formData.item" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="排序" prop="sequence" fixed><el-input v-model="formData.sequence" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="值" prop="value" fixed><el-input v-model="formData.value" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="默认值" prop="default_value" fixed><el-input v-model="formData.default_value" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="标题" prop="title" fixed><el-input v-model="formData.title" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="描述" prop="description" fixed><el-input v-model="formData.description" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="启用">启用</el-radio>
                        <el-radio label="禁用">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formSubVisible"
                :before-close="hideSubForm"
                width="90%"
                top="5vh">
            <el-form :model="formSubData" :rules="formSubRules" ref="dataSubForm">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column label="id" prop="id" fixed></el-table-column>
                    <el-table-column label="排序值" prop="sequence" fixed>

                    <template scope="scope">
                        <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="sysConfigsSequenceSave(scope.row)"
                        ></el-input>
                    </template>
                    </el-table-column>

                    <el-table-column label="祖先ID" prop="parent_id" fixed></el-table-column>
                    <el-table-column label="祖先" prop="parent" fixed></el-table-column>
                    <el-table-column label="项目" prop="item" fixed></el-table-column>
                    <el-table-column label="值" prop="value" fixed></el-table-column>
                    <el-table-column label="默认值" prop="default_value" fixed></el-table-column>
                    <el-table-column label="标题" prop="title" fixed></el-table-column>
                    <el-table-column label="描述" prop="description" fixed></el-table-column>
                    <el-table-column label="状态" prop="status" fixed></el-table-column>
                    <el-table-column label="修改时间" prop="updated_at" fixed></el-table-column>


                    <el-table-column
                            label="操作" width="300"
                            fixed="right">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row,'sub')">编辑
                            </el-button>
                            <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row,'sub')">删除
                            </el-button>
                            <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'禁用','sub')">禁用
                            </el-button>
                            <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="auditItemServer(scope.row,'启用','sub')">启用
                            </el-button>
                            
                        </template>
                    </el-table-column>
                        </el-table>

                        <el-pagination
                                :page-size="query.limit"
                                @current-change="handleCurrentSubChange"
                                layout="prev, pager, next"
                                :total="totalSub">
                        </el-pagination>

                    </template>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideSubForm">关闭</el-button>
            </div>
        </el-dialog>



    </div>

</template>

<script>
    import {
        sysConfigsList,
        sysConfigsSave,
        sysConfigsSequenceSave,
        sysConfigsStatusSave,
        sysConfigsDel
    } from "../../../api/system-management";

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: ""
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
                operation:false,
                parent_id:0,
                tableKey: 0,
                tableData: [],
                pc_pic:'',
                mobile_pic:'',
                list: [],
                total: 0,
                totalSub: 0,
                loading: true,
                index: null,
                formName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formVisible: false,
                formSubVisible: false,
                formData: formJson,
                formSubData: formJson,
                formRules: {},
                formSubRules: {},
                addRules: {
                    parent: [
                        {required: true, message: "请输入祖先", trigger: "blur"}
                    ],
                    item: [
                        {required: true, message: "请输入项目", trigger: "blur"}
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
            handleCurrentSubChange(val) {
                this.query.page = val;
                this.getSubList();
            },
            handleFilter() {
                this.query.page = 1
                this.getList()
            },
            auditItemServer(row,flag,sub) {
                if(sub){
                    this.operation = true;
                }else{
                    this.operation = false;
                }

                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                sysConfigsStatusSave(params).then(
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
                        if(this.operation){
                            this.getSubList();
                        }else{
                            this.getList();
                        }
                    }.bind(this)
                )
            },
            getList() {
                this.loading = true;
                sysConfigsList(this.query)
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
            getSubList() {
                // this.loading = true;
                let params = Object.assign({}, this.query);
                params.parent_id = this.parent_id;
                sysConfigsList(params)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
            },
            sysConfigsSequenceSave(row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                sysConfigsSequenceSave(params).then(
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
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideSubForm() {
                // 更改值
                this.formSubVisible = !this.formSubVisible;
                // 清空表单
                this.$refs["dataSubForm"].resetFields();
                return true;
            },
            // 显示表单
            handleForm(index, row,sub) {
                if(sub){
                    this.operation = true;
                }else{
                    this.operation = false;
                }
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
                }
                // 清空验证信息表单
                if (this.$refs["dataForm"]) {
                    this.$refs["dataForm"].clearValidate();
                }
            },
            handleSubForm(index, row) {
                let params = Object.assign({}, this.query);
                this.parent_id = params.parent_id = row.id
                sysConfigsList(params)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
                this.formSubVisible = true;
                this.formSubData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formSubData = Object.assign({}, row);
                }
                this.formSubName = "add";
                this.formSubRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formSubName = "edit";
                    this.formSubRules = this.editRules;
                }
                // 清空验证信息表单
                if (this.$refs["dataSubForm"]) {
                    this.$refs["dataSubForm"].clearValidate();
                }
            },
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        sysConfigsSave(data, this.formName).then(response => {
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
                                    if(resData.parent_id == '' || resData.parent_id == null){
                                        this.list.unshift(resData);
                                    }
                                } else {
                                    if(this.operation){
                                        this.tableData.splice(this.index, 1, data);
                                    }else{
                                        this.list.splice(this.index, 1, data);
                                    }
                                }
                            }
                        });
                    }
                });
            },
            // 删除
            handleDel(index, row,sub) {
                if(sub){
                    this.operation = true;
                }else{
                    this.operation = false;
                }
                if (row.id) {
                    this.$confirm("确认删除该记录吗?", "提示", {
                        type: "warning"
                    })
                        .then(() => {
                            let para = {id: row.id};
                            sysConfigsDel(para)
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
                                        if(this.operation){
                                            this.tableData.splice(index, 1);
                                        }else{
                                            this.list.splice(index, 1);
                                        }
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
