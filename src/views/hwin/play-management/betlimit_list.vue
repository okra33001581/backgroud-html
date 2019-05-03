<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="0"></el-option>
                    <el-option label="启用" value="1"></el-option>
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
            <el-table-column label="ID" prop="id" fixed></el-table-column>
            <el-table-column label="名称" prop="id" fixed>
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入名称" @keyup.enter.native="updateBetlimitName(scope.$index, scope.row)"
                    ></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作" width="260"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleTable(scope.$index, scope.row)">修改
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
               <el-form :model="formData" label-width="8%" :rules="formRules" ref="dataForm">
                <el-form-item label="Id" prop="id"><el-input v-model="formData.id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="名称" prop="name"><el-input v-model="formData.name" auto-complete="off"></el-input></el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表格-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="tableVisible"
                :before-close="hideTable"
                width="35%"
                top="5vh">


               <!-- <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-form-item label="Id" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="名称" prop="username"><el-input v-model="formData.username" auto-complete="off"></el-input></el-form-item>
                </el-form>-->


            <el-form :inline="true" :model="query_game" class="query-form" size="mini">
                <el-form-item class="query-form-item">
                    <el-select v-model="query_game.status" placeholder="游戏" @change="gameSelectedValue">
                        <el-option label="全部" value="0"></el-option>
                       <el-option
                          v-for="item in options"
                          :key="item.lottery_name"
                          :label="item.lottery_name"
                          :value="item.lottery_name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-search" :loading="tableLoading" @click="onSearch">查询</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>



            <template>
              <el-table
                :span-method="objectSpanMethod"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                
                <el-table-column
                  label="玩法群"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.lottery_name }}</template>
                </el-table-column>
                <el-table-column
                  prop="way_name"
                  label="玩法组"
                  width="120">
                </el-table-column>
                <!--<el-table-column
                  prop="prize_limit"
                  label="单一用户单期最高中奖金额"
                  show-overflow-tooltip>
                </el-table-column>-->
                <el-table-column label="单一用户单期最高中奖金额" prop="id">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.prize_limit" placeholder="请输入名称" @keyup.enter.native="updateBetlimitPrize(scope.$index, scope.row)"
                    ></el-input>
                </template>
                </el-table-column>
                <el-table-column 
                  type="selection"
                  width="55">
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection()">取消选择</el-button>
              </div>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideTable">取消</el-button>
                <el-button type="primary" @click.native="tableSubmit()" :loading="formLoading">保存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        betlimitList,
        betlimitOptions,
        betlimitSave,
        betlimitNameSave,
        betlimitPrizeSave,
        betlimitDelete
    } from "../../../api/play-management";

    const formJson = {
        id: "",
        name: ""
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
                    name: "",
                    status: "",
                    page: 1,
                    limit: 20
                },
                query_game:{
                    name: "",
                    status: "",
                    page: 1,
                    limit: 20
                },

                options: [],
                lottery_name: "",
                name:'',
                tableKey: 0,
                list: [],
                tableData: [],
                multipleSelection: [],
                total: 0,
                loading: true,
                index: null,
                formName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                tableLoading: false,
                formVisible: false,
                tableVisible: false,
                formData: formJson,
                formRules: {},
                addRules: {
                    name: [
                        {required: true, message: "请输入名称", trigger: "blur"}
                    ]
                },
                deleteLoading: false
            };
        },
        methods: {

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

              gameSelectedValue(val){
                //console.log(val)
                this.lottery_name = val;
              },


            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                /*if (rowIndex % 2 === 0) {
                  if (columnIndex === 0) {
                    return [1, 2];
                  } else if (columnIndex === 1) {
                    return [0, 0];
                  }
                }*/
              },

              objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                  /*if (rowIndex % 2 === 0) {
                    return {
                      rowspan: 2,
                      colspan: 1
                    };
                  } else {
                    return {
                      rowspan: 0,
                      colspan: 0
                    };
                  }*/
                }
              },




            onSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getList();
            },

            onSearch(){
                this.getTableData(this.name,this.lottery_name);
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
                betlimitList(this.query)
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

            getTableData(name='',lottery_name=''){
                this.tableLoading = true;
                if(name!=''){
                    this.query.table = name;
                }
                if(lottery_name!=''){
                    this.query.lottery_name = lottery_name;
                }
                betlimitList(this.query)
                    .then(response => {
                        this.tableLoading = false;
                        this.tableData = response.data.list || [];
                    })
                    .catch(() => {
                        this.tableLoading = false;
                        this.tableData = [];
                    });
            },

            getOptions() {
                var parms =  {
                    name: this.name,
                    status: "",
                    page: 1,
                    limit: 20
                }
                betlimitOptions(parms)
                    .then(response => {
                        this.options = response.data.list || [];
                    })
                    .catch(() => {
                        this.options = [];
                    });
            },

           //修改名字
            updateBetlimitName(index, row) {
                var params = {
                    id: row.id,
                    name: row.name
                }
                // debugger
                betlimitNameSave(params).then(
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

            //修改单一用户单期最高中奖金额值
            updateBetlimitPrize(index, row) {
                var params = {
                    id: row.id,
                    prize_limit: row.prize_limit
                }
                // debugger
                betlimitPrizeSave(params).then(
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
                        this.getTableData(this.name);
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

            // 隐藏表格
            hideTable() {
                // 更改值
                this.tableVisible = !this.tableVisible;
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

            // 显示表格
            handleTable(index, row) {
                var name = row.name;
                this.name = name;
                this.tableVisible = true;
                //加载表格数据
                this.getTableData(name);
                //加载下拉框数据
                this.getOptions();
            },
            //表单提交
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        betlimitSave(data).then(response => {
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
            //表格内容保存
            tableSubmit() {
                /*this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);     }
                });*/

                let data = this.multipleSelection;
                betlimitPrizeSave(data).then(response => {
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
                        //刷新列表
                        this.getTableData(this.name);
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
                            betlimitDelete(para)
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
