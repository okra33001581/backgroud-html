<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item" style="color:#666">
                彩票类别：
                <!--<el-select v-model="query.lottery_name" placeholder="彩种类别">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="其他" value="0"></el-option>
                    <el-option label="时时彩" value="1"></el-option>
                    <el-option label="11选5" value="2"></el-option>
                    <el-option label="快乐彩" value="3"></el-option>
                    <el-option label="PK拾" value="4"></el-option>
                    <el-option label="快三" value="5"></el-option>
                    <el-option label="六合彩" value="6"></el-option>
                    <el-option label="3D彩" value="7"></el-option>
                </el-select>-->
                <el-select v-model="query.lottery_name" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in lotteryNameList"
                      :key="item.lottery_name"
                      :label="item.lottery_name"
                      :value="item.lottery_name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item" style="color:#666">
                玩法:
                <el-select v-model="query.way_type" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                      v-for="item in wayTypeList"
                      :key="item.way_type"
                      :label="item.way_type"
                      :value="item.way_type">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="请输入商户名称"></el-input>
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
                fit
                @expand-change="rowExpand"
                highlight-current-row
                style="width: 100%;"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">
           <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table
                                :data="listChildren"
                                border
                                style="width: 100%">
                            <el-table-column width="150" prop="way_type" fixed></el-table-column>
                            <el-table-column width="150" prop="type" fixed></el-table-column>
                            <el-table-column width="100" prop="period_day" fixed></el-table-column>
                            <el-table-column width="120" prop="period_second" fixed></el-table-column>
                            <el-table-column width="180" prop="sales_begin" fixed></el-table-column>
                            <el-table-column width="180" prop="sales_end" fixed></el-table-column>
                            <el-table-column width="120" prop="status" fixed></el-table-column>
                            <el-table-column  prop="sequence" fixed>

                                <template scope="scope">
                                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="updatePgameSequence(scope.$index, scope.row)"
                                    ></el-input>
                                </template>

                            </el-table-column>
                            <el-table-column  prop="id" fixed >
                                <template scope="scope">
                                    <el-checkbox-group v-model="scope.row.properties">
                                        <el-checkbox style="margin-left:0;" v-for="property in properties" :label="property" :key="property"  @click.native="updatePgamePropertySave(scope.row.lottery_name,scope.row.id,property,scope.row.properties.includes(property))" >{{property}}</el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    width="200"
                                    fixed="right">
                                <template slot-scope="scope">
                                    <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                                    </el-button>-->
                                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleKillRateForm(scope.$index, scope.row)">杀率
                                    </el-button>
                                    <el-button type="danger" size="small" @click.native="handleDel(scope.$index, scope.row)">
                                    <div v-if="scope.row.status == '停止销售'">
                                        开售
                                    </div>
                                    <div v-else>
                                        停售
                                    </div>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column label="游戏" width="150" prop="lottery_name" fixed></el-table-column>
            <el-table-column label="类型" width="150" fixed></el-table-column>
            <el-table-column label="周期(天)" width="100" fixed></el-table-column>
            <el-table-column label="周期(秒)" width="120" fixed></el-table-column>
            <el-table-column label="销售时间(开始)" width="180" fixed></el-table-column>
            <el-table-column label="销售时间(结束)" width="180" fixed></el-table-column>
            <el-table-column label="状态" width="120" fixed></el-table-column>
            <el-table-column label="排序值"  fixed></el-table-column>
            <el-table-column label="属性"  fixed></el-table-column>
            <el-table-column label="操作" width="200" fixed="right"></el-table-column>
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
            <el-form :model="formData" label-width="17%" :rules="formRules" ref="dataForm">

                <el-form-item label="ID" prop="lottery_id"><el-input v-model="formData.lottery_id" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="游戏" prop="lottery_name"><el-input v-model="formData.lottery_name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="类型" prop="type"><el-input v-model="formData.type" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="周期(天)" prop="period_day"><el-input v-model="formData.period_day" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="周期(秒)" prop="period_second"><el-input v-model="formData.period_second" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="销售时间(开始)" prop="sales_begin"><el-input v-model="formData.sales_begin" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="销售时间(结束)" prop="sales_end"><el-input v-model="formData.sales_end" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="状态" prop="status"><el-input v-model="formData.status" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="排序" prop="sequence"><el-input v-model="formData.sequence" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="属性" prop="property"><el-input v-model="formData.property" auto-complete="off"></el-input></el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formKillRateVisible"
                :before-close="hideKillRateForm"
                width="15%"
                top="5vh">
            <el-form :model="formKillRate" :rules="formRules" ref="dataForm">
                <el-form-item class="query-form-item">
                    <el-input v-model="formKillRate.kill_rate" placeholder="请输入游戏杀率"  class="input-with-select">
                        <el-button slot="append">%</el-button>
                    </el-input>

                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideKillRateForm">取消</el-button>
                <el-button type="primary" @click.native="formKillRateSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        pgameList,
        pgameSave,
        pgamePropertySave,
        pgameSequenceSave,
        pgameKillRateSave,
        pgameSearchList,
        pgameStatusSave
    } from "../../../api/play-management";

    const formJson = {
        id: "",
        lottery_id: "",
        lottery_name: "",
        type: "",
        period_day: "",
        period_second: "",
        sales_begin: "",
        sales_end: "",
        sequence: "",
        property: "",
        status: "1"
    };

    const propertyOptions = ['热门', '推荐', '新上'];

    export default {
        data() {
            return {
                checkedProperty: ['热门', '推荐'],
                properties: propertyOptions,
                query: {
                    merchant_name: "",
                    lottery_name: "",
                    way_type: "",
                    page: 1,
                    limit: 20
                },
                tableKey: 0,
                list: [],
                wayTypeList: [],
                lotteryNameList: [],
                listChildren: [],
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
                formWayGroupLoading: false,
                formKillRateLoading: false,
                formPrizeLoading: false,
                formKillRateVisible: false,
                formKillRate:{},
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
            getChildrenList(lottery_name=''){
                let params = {
                    lottery_name: lottery_name,
                    act:'childrenlist'
                }
                this.loading = true;
                pgameList(params)
                    .then(response => {
                        this.loading = false;
                        this.listChildren = response.data.list || [];
                    })
                    .catch(() => {
                        this.loading = false;
                        this.listChildren = [];
                    });
            },
            //修改排序值
            updatePgameSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                pgameSequenceSave(params).then(
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
                        //this.getList();
                    }.bind(this)
                )
            },

            rowExpand:function(row,expandedRows){
                this.listChildren = row.children;
                //如果展开行数大于1
                  if(expandedRows.length>1){
                    //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
                    expandedRows.shift();
                  }   
            },
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
            

            updatePgamePropertySave(lottery_name,index,property_name,property_value) {
                var params = {
                    id: index,
                    property_name: property_name,
                    property_value: property_value
                }
                // debugger
                pgamePropertySave(params).then(
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
                        //this.getChildrenList(lottery_name);
                    }.bind(this)
                )
            },

            getList() {
                this.loading = true;
                pgameList(this.query)
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

            getSearchList() {
                this.loading = true;
                pgameSearchList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.wayTypeList = response.data.wayTypeList || [];
                        this.lotteryNameList = response.data.lotteryNameList || [];
                    })
                    .catch(() => {
                        this.loading = false;
                        this.wayTypeList = [];
                        this.lotteryNameList = [];
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
            // 隐藏表单
            hideKillRateForm() {
                // 更改值
                this.formKillRateVisible = !this.formKillRateVisible;
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
           
            // 显示表单
            handleKillRateForm(index, row) {
                this.formKillRateVisible = true;
                this.formKillRate = Object.assign({}, row);
                this.formRules = this.addRules;
                if (index !== null) {
                    this.index = index;
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
                        pgameSave(data, this.formName).then(response => {
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

            formKillRateSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formKillRate);
                        let lottery_name = data.lottery_name;
                        pgameKillRateSave(data).then(response => {
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
                                
                                // 刷新表单
                                //this.$refs["dataForm"].resetFields();
                                this.formKillRateVisible = false;
                                this.getChildrenList(lottery_name);
                            }
                        });
                    }
                });
            },
            // 删除
            handleDel(index, row) {
                //if (row.id) {
                    //this.$confirm("确认停售吗?", "提示", {
                    //    type: "warning"
                    //})
                       // .then(() => {
                            let para = {id: row.id,status:row.status};
                            var lottery_name = row.lottery_name;
                            pgameStatusSave(para)
                                .then(response => {
                                    this.deleteLoading = false;
                                    if (response.code) {
                                        this.$message({
                                            message: response.message,
                                            type: "error"
                                        });
                                    } else {
                                        this.$message({
                                            message: "成功",
                                            type: "success"
                                        });
                                        // 刷新数据
                                        //this.list.splice(index, 1);
                                        this.getChildrenList(lottery_name);
                                    }
                                })
                                .catch(() => {
                                    this.deleteLoading = false;
                                });
                       // })
                        /*.catch(() => {
                            this.$message({
                                type: "info",
                                message: "取消操作"
                            });
                        });
                }*/
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
            // 加载玩法列表
            this.getSearchList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
