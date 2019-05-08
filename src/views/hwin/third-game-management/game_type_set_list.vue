<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
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
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleAddForm(null,null)">新增</el-button>
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
            <el-table-column prop="id" label="表单项"></el-table-column>
            <el-table-column prop="ext_column1" label="表单项"></el-table-column>
            <el-table-column prop="ext_column2" label="表单项"></el-table-column>
            <el-table-column prop="ext_column3" label="表单项"></el-table-column>
            <el-table-column prop="ext_column4" label="表单项"></el-table-column>
            <el-table-column prop="ext_column5" label="表单项"></el-table-column>
            <el-table-column prop="ext_column6" label="表单项"></el-table-column>
            <el-table-column prop="ext_column7" label="表单项"></el-table-column>
            <el-table-column prop="ext_column8" label="表单项"></el-table-column>
            <el-table-column prop="ext_column9" label="表单项"></el-table-column>
            <el-table-column prop="ext_column10" label="表单项"></el-table-column>
            <el-table-column prop="ext_column11" label="表单项"></el-table-column>
            <el-table-column prop="ext_column12" label="表单项"></el-table-column>
            <el-table-column prop="ext_column13" label="表单项"></el-table-column>
            <el-table-column prop="ext_column14" label="表单项"></el-table-column>
            <el-table-column prop="ext_column15" label="表单项"></el-table-column>
            <el-table-column prop="ext_column16" label="表单项"></el-table-column>
            <el-table-column prop="ext_column17" label="表单项"></el-table-column>
            <el-table-column prop="ext_column18" label="表单项"></el-table-column>
            <el-table-column prop="ext_column19" label="表单项"></el-table-column>
            <el-table-column prop="ext_column20" label="表单项"></el-table-column>
            <el-table-column
                    label="操作" width="350"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">添加游戏
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>

                    <el-button v-if="scope.row.status === '禁用' || scope.row.status === null" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSuccessServer(scope.$index, scope.row)">启用
                    </el-button>
                    <el-button v-if="scope.row.status === '启用'" type="primary" size="small" icon="el-icon-edit" @click.native="auditItemFailedServer(scope.$index, scope.row)">禁用
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
                :title="formAddMap[formName]"
                :visible.sync="formAddVisible"
                :before-close="hideAddForm"
                width="40%"
                top="5vh">
            <template>
                <el-form :model="formAddData" ref="formAddData" label-width="80px" class="form-dynamic">
                    <el-form-item
                            v-for="(domain, index) in formAddData.domains"
                            :label="'表单项' + (index+1)"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :rules="{required: true, message: '内容不能为空', trigger: 'blur'}">
                        <el-input v-model="domain.value"></el-input>
                        <a class="remove-item" v-show="formAddData.domains.length>1" @click.prevent="removeDomain(domain)"><i class="el-icon-close"></i></a>
                    </el-form-item>
                    <el-form-item class="submit-btn">
                        <!--<el-button type="primary" @click="submitAddForm('formAddData')">提交</el-button>-->
                        <el-button @click="addDomain">新增一项</el-button>
                        <!--<el-button @click="resetForm('formAddData')">重置</el-button>-->
                        <el-button type="primary" @click.native="formAddSubmit()" :loading="formAddLoading">提交</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="40%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm"  label-width="110px">
                <el-form-item label="plat_id" prop="plat_id">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.plat_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="plat_name" prop="plat_name">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.plat_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="name" prop="name">
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
                <el-form-item label="desc" prop="desc">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.desc" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column1 != ''" :label="formData.ext_column1" prop="plat_id">
                    <el-input v-if="formData.ext_column1 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_column1_val" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column2 != ''" :label="formData.ext_column2" prop="plat_id">
                    <el-input v-if="formData.ext_column2 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_column2_val" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="formData.ext_column3" prop="plat_id">
                    <el-input v-if="formData.ext_column3 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_column3_val" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column4 != ''" :label="formData.ext_column4" prop="plat_id">
                    <el-input v-if="formData.ext_column5 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_column4_val" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column5 != ''" :label="formData.ext_column5" prop="plat_id">
                    <el-input v-if="formData.ext_column5 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_column5_val" auto-complete="off"></el-input>
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
        gameTypeSetList,
        thirdGameTypesSubStatusSave,
        thirdGameTypesDetailSave,
        thirdBallSequence,
        thirdMerchantgameSave,
        thirdGameTypesDetailDel
    } from "../../../api/third-game-management";

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        roles: [],
        domains: [{
            value: ''
        }],
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
                formAddData: {
                    domains: [{
                        value: ''
                    }],
                },
                roles: [],
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20,
                    role_id: "",
                    sort: '+id'
                },
                tableKey: 0,
                icon: '',
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {
                    label: 'ID Descending',
                    key: '-id'
                }, {label: 'username Ascending', key: '+username'}, {
                    label: 'username Descending',
                    key: '-username'
                }, {label: 'status Ascending', key: '+status'}, {
                    label: 'status Descending',
                    key: '-status'
                }, {label: 'last_login_time Ascending', key: '+last_login_time'}, {
                    label: 'last_login_time Descending',
                    key: '-last_login_time'
                }, {label: 'last_login_ip Ascending', key: '+last_login_ip'}, {
                    label: 'last_login_ip Descending',
                    key: '-last_login_ip'
                }],
                list: [],
                total: 0,
                loading: true,
                index: null,
                formName: null,
                formAddName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formAddMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formVisible: false,
                formData: formJson,
                formRules: {},
                formAddLoading: false,
                formAddVisible: false,
                formAddRules: {},
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
            /*增加表单项*/
            addDomain() {
                // anshan
                this.formAddData.domains.push({
                    value: '',
                });
            },
            /*删除表单项*/
            removeDomain(item) {
                var index = this.formAddData.domains.indexOf(item)
                if (index !== -1) {
                    this.formAddData.domains.splice(index, 1)
                }
            },
            /*格式化表单数据*/
            formatData(data){   //动态表单生成的是一个对象数组，需要把对象数组转成一个对象
                let obj = {};
                data.forEach((item,index)=>{
                    obj['value'+(index+1)] = item.value
                });
                return obj
            },
            /*提交表单*/
            submitAddForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.formatData(this.formAddData.domains))
                    } else {
                        alert('表单项不能为空！！！');
                        return false;
                    }
                });
            },
            /*重置表单*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
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

            auditItemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '启用'
                }
                // debugger
                thirdGameTypesSubStatusSave(params).then(
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
            auditItemFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '禁用'
                }
                // debugger
                thirdGameTypesSubStatusSave(params).then(
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
            getList() {
                this.loading = true;
                gameTypeSetList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list.data || [];
                        this.total = response.data.list.total || 0;
                    })
                    .catch(() => {
                        this.loading = false;
                        this.list = [];
                        this.total = 0;
                        this.roles = [];
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
            sortByLastLoginIp(order) {
                if (order === 'ascending') {
                    this.query.sort = '+last_login_ip'
                } else {
                    this.query.sort = '-last_login_ip'
                }
                this.handleFilter()
            },
            getRoleList() {
                authAdminRoleList(this.query)
                    .then(response => {
                        this.roles = response.list || [];
                    })
                    .catch((e) => {
                        console.log(e)
                        this.roles = [];
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
            hideAddForm() {
                // 更改值
                this.formAddVisible = !this.formAddVisible;
                // 清空表单AddAdd
                this.$refs["dataAddForm"].resetFields();
                return true;
            },
            // 显示表单
            handleAddForm(index, row) {
                this.formAddVisible = true;
                this.formAddData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formAddData = Object.assign({}, row);
                }
                this.formAddData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
                this.formAddName = "add";
                this.formAddRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formAddName = "edit";
                    this.formAddRules = this.editRules;
                }
                // 清空验证信息表单
                if (this.$refs["dataAddForm"]) {
                    this.$refs["dataAddForm"].clearValidate();
                }
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
            formAddSubmit() {
                        this.formAddLoading = true;
                        let data = Object.assign({}, this.formData);
                        thirdGameTypesDetailSave(data, this.formName).then(response => {
                            this.formAddLoading = false;
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
                                this.$refs["dataAddForm"].resetFields();
                                this.formAddVisible = false;
                                if (this.formAddName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.list.unshift(resData);
                                } else {
                                    this.list.splice(this.index, 1, data);
                                }
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
            // 加载角色列表
            // this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
