<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-select v-model="query.plat_name" placeholder="分类">

                    <el-option
                      v-for="item in typesList"
                      :key="item.type"
                      :label="item.type"
                      :value="item.type">
                    </el-option>

                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.name" placeholder="游戏名称"></el-input>
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
            <el-table-column label="Id" prop="id" fixed></el-table-column>
            <el-table-column label="游戏分类" prop="plat_name" fixed></el-table-column>
            <el-table-column prop="name" label="游戏名称" width="180"></el-table-column>
            <el-table-column label="图标" prop="icon" >
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            title=""
                            trigger="hover">
                        <img :src="'http://apidemo.test/public/' + scope.row.icon"/>
                        <img slot="reference" :src="'http://apidemo.test/public/' + scope.row.icon" :alt="icon" style="max-height: 50px;max-width: 130px">
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="desc" label="简介"></el-table-column>
            <el-table-column
                    label="操作" width="350"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="selItemSuccessServer(scope.$index, scope.row)">选择
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
            <el-form :model="formData" :rules="formRules" ref="dataForm"  label-width="110px">
                <el-form-item label="属性模版" prop="set_id">
                    <el-select v-model="formData.set_id" placeholder="状态" @change="addDomain">
                        <el-option
                          v-for="item in typesList"
                          :key="item.type"
                          :label="item.type"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="平台id" prop="plat_id">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.plat_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台名称" prop="plat_name">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.plat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="游戏名称" prop="name">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="icon">
                    <el-upload
                            action="http://apidemo.test/api/event/fileSave?table=eventPic1"
                            list-type="picture-card"
                            :on-success="handlePic1Success"
                            :beforeUpload="beforeAvatarUpload"
                            :on-remove="handleRemove">
                        <img :src="'http://apidemo.test/public/' + formData.icon" width="200px" height="150px"/>
                    </el-upload>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.desc" auto-complete="off"></el-input>
                </el-form-item>

                <!--:rules="{required: true, message: '内容不能为空', trigger: 'blur'}"-->
                <template v-for="(domain, index) in formAddData.domains">
                    <el-form-item
                            :label="domain.val1"
                            :key="domain.key"
                            >
                        <el-input v-if="index != 0" @change="inputValue(index,$event)"  style="width:550px;max-width:100%;" :v-model="'domains.' + index + '.value'"></el-input>
                    </el-form-item>
                </template>


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
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        gameTypeDetailList,
        gameTypeSetList,
        gameTypesList,
        thirdGameTypesSubStatusSave,
        thirdGameTypesDetailSave,
        thirdBallSequence,
        thirdMerchantgameSave,
        thirdGameTypesDetailDel
    } from "../../../api/third-game-management";

    const formJson = {
        id: "",
        plat_id: "",
        plat_name: "",
        name: "",
        icon: "",
        desc: "",
        ext_field1: "",
        ext_field2: "",
        ext_field3: "",
        ext_field4: "",
        ext_field5: "",
        ext_field6: "",
        ext_field7: "",
        ext_field8: "",
        ext_field9: "",
        ext_field10: "",
        ext_field11: "",
        ext_field12: "",
        ext_field13: "",
        ext_field14: "",
        ext_field15: "",
        ext_field16: "",
        ext_field17: "",
        ext_field18: "",
        ext_field19: "",
        ext_field20: "",
        status: ""
    };
    export default {
        data() {
            return {
                query: {
                    name: "",
                    status: "",
                    page: 1,
                    limit: 20
                },
                formAddData: {
                    domains: [{
                    }],
                },
                tableKey: 0,
                icon:'',
                list: [],
                typesList: [],
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
                    name: [
                        {required: true, message: "请输入名称", trigger: "blur"}
                    ],
                    plat_name: [
                        {required: true, message: "请输入平台名", trigger: "blur"}
                    ],
                    plat_id: [
                        {required: true, message: "请输入平台id", trigger: "change"}
                    ],
                    set_id: [
                        {required: true, message: "请选择模板", trigger: "change"}
                    ],
                    
                },
                deleteLoading: false
            };
        },
        methods: {
            inputValue(index,value){
                var ext_field = 'this.formData.ext_field'+index;
                eval(ext_field+'='+value)
                console.log(this.formData)
            },
            onSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getList();
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
                this.formData.icon = response.data;
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

            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                thirdGameTypesSubStatusSave(params).then(
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
            selItemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    type: 'game_type_list_detail'
                }
                // debugger
                thirdMerchantgameSave(params).then(
                    function (res) {
                        // debugger
                        if(res.code === '1'){
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
                        /*this.$message({
                            message: '数据处理成功',
                            type: 'success'
                        })*/
                    }.bind(this)
                )
            },

            getList() {
                this.loading = true;
                gameTypeDetailList(this.query)
                    .then(response => {
                        this.loading = false;
                        // haicheng
                        this.list = response.data.list.data || [];
                        this.total = response.data.list.total || 0;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
                    });
            },
            getTypesList(){
                this.loading = true;
                gameTypesList({})
                    .then(response => {
                        this.loading = false;
                        // haicheng
                        this.typesList = response.data.list || [];
                    })
                    .catch(() => {
                        this.loading = false;
                        this.typesList = [];
                    });
            },
            thirdBallSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                thirdBallSequence(params).then(
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
            /*增加表单项*/
            addDomain(val) {
                if(this.formName=='edit'){
                    for(var x in this.formData) {
                        if(x.indexOf("ext_column")>-1){
                            delete this.formData[x];                          
                        }

                        if(x.indexOf("ext_field")>-1){
                            delete this.formData[x];                          
                        }
                    }
                    console.log(this.formData)
                }
                let param = {id:val}
                var data = [];
                gameTypeSetList(param)
                    .then(response => {
                        this.loading = false;
                        // haicheng
                        data = response.data.list.data[0] || [];
                        var index = 0;
                        var temp = [];
                        for(var x in data) {
                            if(x.indexOf("ext_column")>-1 && data[x]!=''){
                                temp[index] = {val1:data[x]};
                                index++;
                            }
                        }
                        this.formAddData.domains = temp;
                        this.formAddData.domains.unshift({});
                    })
                    .catch(() => {
                        this.loading = false;
                        data = [];
                    });
                
            },
            /*删除表单项*/
            removeDomain(item) {
                var index = this.formAddData.domains.indexOf(item)
                if (index !== -1) {
                    this.formAddData.domains.splice(index, 1)
                }
            },
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                //this.$refs["dataForm"].resetFields();
                this.formAddData.domains=[];
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
                        thirdGameTypesDetailSave(data, this.formName).then(response => {
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
                                //this.$refs["dataForm"].resetFields();
                                this.formVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    //let resData = response.data || {};
                                    //this.list.unshift(resData);
                                    this.getList();
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
                            thirdGameTypesDetailDel(para)
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
        selectItemSuccessServer(index, row) {
            alert('ddddddddddddddddddddd');
            var params = {
                id: row.id,
                type: 'game_type_list_detail'
            }
            // debugger
            thirdMerchantgameSave(params).then(
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
            //加载类型数据
            this.getTypesList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
