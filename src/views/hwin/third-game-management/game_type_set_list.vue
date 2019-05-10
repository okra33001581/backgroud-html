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
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass">
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="type" label="type"></el-table-column>
            <el-table-column prop="ext_column1" label="表单项1"></el-table-column>
            <el-table-column prop="ext_column2" label="表单项2"></el-table-column>
            <el-table-column prop="ext_column3" label="表单项3"></el-table-column>
            <el-table-column prop="ext_column4" label="表单项4"></el-table-column>
            <el-table-column prop="ext_column5" label="表单项5"></el-table-column>
            <el-table-column prop="ext_column6" label="表单项6"></el-table-column>
            <el-table-column prop="ext_column7" label="表单项7"></el-table-column>
            <el-table-column prop="ext_column8" label="表单项8"></el-table-column>
            <el-table-column prop="ext_column9" label="表单项9"></el-table-column>
            <el-table-column prop="ext_column10" label="表单项10"></el-table-column>
            <el-table-column prop="ext_column11" label="表单项11"></el-table-column>
            <el-table-column prop="ext_column12" label="表单项12"></el-table-column>
            <el-table-column prop="ext_column13" label="表单项13"></el-table-column>
            <el-table-column prop="ext_column14" label="表单项14"></el-table-column>
            <el-table-column prop="ext_column15" label="表单项15"></el-table-column>
            <el-table-column prop="ext_column16" label="表单项16"></el-table-column>
            <el-table-column prop="ext_column17" label="表单项17"></el-table-column>
            <el-table-column prop="ext_column18" label="表单项18"></el-table-column>
            <el-table-column prop="ext_column19" label="表单项19"></el-table-column>
            <el-table-column prop="ext_column20" label="表单项20"></el-table-column>
            <el-table-column
                    label="操作" width="440"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleAddForm(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">添加游戏
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
                :title="formAddMap[formName]"
                :visible.sync="formAddVisible"
                :before-close="hideAddForm"
                width="40%"
                top="5vh">
            <template>
                <el-form :model="formAddData" ref="formAddData" label-width="80px" class="form-dynamic">


                    <el-form-item label="类别" prop="id">
                        <el-select v-model="formAddData.type" placeholder="类别">
                            <el-option label="AG" value="AG"></el-option>
                            <el-option label="GA" value="GA"></el-option>
                            <el-option label="竞彩" value="竞彩"></el-option>
                            <el-option label="开元棋牌 " value="开元棋牌"></el-option>
                            <el-option label="爱棋牌" value="爱棋牌"></el-option>
                            <el-option label="龙城棋牌 " value="龙城棋牌"></el-option>
                            <el-option label="FG棋牌" value="FG棋牌"></el-option>
                            <el-option label="JDB棋牌" value="JDB棋牌"></el-option>
                            <el-option label="CQ9棋牌" value="CQ9棋牌"></el-option>
                            <el-option label="FG捕鱼" value="FG捕鱼"></el-option>
                            <el-option label="JDB捕鱼" value="JDB捕鱼"></el-option>
                            <el-option label="AG捕鱼王 " value="AG捕鱼王"></el-option>
                            <el-option label="CQ9捕鱼" value="CQ9捕鱼"></el-option>
                            <el-option label="AQP捕鱼" value="AQP捕鱼"></el-option>
                            <el-option label="JDB老虎机" value="JDB老虎机 "></el-option>
                            <el-option label="CQ9电子" value="CQ9电子"></el-option>
                            <el-option label="MG电子" value="MG电子"></el-option>
                            <el-option label="FG老虎机 " value="FG老虎机"></el-option>
                            <el-option label="AG电子" value="AG电子"></el-option>
                            <el-option label="JDB街机游戏" value="JDB街机游戏"></el-option>
                            <el-option label="CQ9街机游戏" value="CQ9街机游戏"></el-option>
                            <el-option label="FG街机游戏" value="FG街机游戏"></el-option>
                            <el-option label="JDB电子彩票" value="JDB电子彩票"></el-option>
                            <el-option label="视讯" value="视讯"></el-option>
                            <el-option label="泛亚电竞 " value="泛亚电竞"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                            v-for="(domain, index) in formAddData.domains"
                            :label="'表单项' + (index+1)"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :rules="{required: true, message: '内容不能为空', trigger: 'blur'}">
                        <el-input style="width:550px;max-width:100%;" v-model="domain.value"></el-input>
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
                <el-form-item label="平台ID" prop="plat_id">
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

                <el-form-item v-if="formData.ext_column1 != ''" :label="formData.ext_column1" prop="plat_id">
                    <el-input v-if="formData.ext_column1 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field1" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column2 != ''" :label="formData.ext_column2" prop="plat_id">
                    <el-input v-if="formData.ext_column2 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field2" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item :label="formData.ext_column3" prop="plat_id">
                    <el-input v-if="formData.ext_column3 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field3" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column4 != ''" :label="formData.ext_column4" prop="plat_id">
                    <el-input v-if="formData.ext_column4 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field4" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column6 != ''" :label="formData.ext_column6" prop="plat_id">
                    <el-input v-if="formData.ext_column6 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field6" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column7 != ''" :label="formData.ext_column7" prop="plat_id">
                    <el-input v-if="formData.ext_column7 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field7" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column8 != ''" :label="formData.ext_column8" prop="plat_id">
                    <el-input v-if="formData.ext_column8 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field8" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column9 != ''" :label="formData.ext_column9" prop="plat_id">
                    <el-input v-if="formData.ext_column9 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field9" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item v-if="formData.ext_column10 != ''" :label="formData.ext_column10" prop="plat_id">
                    <el-input v-if="formData.ext_column10 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field10" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item v-if="formData.ext_column11 != ''" :label="formData.ext_column11" prop="plat_id">
                    <el-input v-if="formData.ext_column11 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field11" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column12 != ''" :label="formData.ext_column12" prop="plat_id">
                    <el-input v-if="formData.ext_column12 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field12" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item v-if="formData.ext_column13 != ''" :label="formData.ext_column13" prop="plat_id">
                    <el-input v-if="formData.ext_column13 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field13" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item v-if="formData.ext_column14 != ''" :label="formData.ext_column14" prop="plat_id">
                    <el-input v-if="formData.ext_column14 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field14" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column15 != ''" :label="formData.ext_column15" prop="plat_id">
                    <el-input v-if="formData.ext_column15 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field15" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column16 != ''" :label="formData.ext_column16" prop="plat_id">
                    <el-input v-if="formData.ext_column16 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field16" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column17 != ''" :label="formData.ext_column17" prop="plat_id">
                    <el-input v-if="formData.ext_column17 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field17" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item v-if="formData.ext_column18 != ''" :label="formData.ext_column18" prop="plat_id">
                    <el-input v-if="formData.ext_column18 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column19 != ''" :label="formData.ext_column19" prop="plat_id">
                    <el-input v-if="formData.ext_column19 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field19" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item v-if="formData.ext_column20 != ''" :label="formData.ext_column20" prop="plat_id">
                    <el-input v-if="formData.ext_column20 != ''" style="width:550px;max-width:100%;" v-model="formData.ext_field20" auto-complete="off"></el-input>
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
        thirdGameSetStatusSave,
        thirdGameSetSave,
        thirdBallSequence,
        thirdMerchantgameSave,
        thirdGameTypesDetailSave,
        thirdGameSetDel
    } from "../../../api/third-game-management";

    const formJson = {
        id: "",
        //status: "1",
        domains: [{
            value: ''
        }]
    };
    export default {
        data() {
            return {
                formAddData: {
                    domains: [{
                        value: ''
                    }],
                },
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20
                },
                tableKey: 0,
                icon: '',
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
                //this.$refs[formName].resetFields();
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
            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                thirdGameSetStatusSave(params).then(
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
            // 隐藏表单
            hideForm() {
                // 更改值
                this.formVisible = !this.formVisible;
                // 清空表单
                //this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideAddForm() {
                // 更改值
                this.formAddVisible = !this.formAddVisible;
                // 清空表单AddAdd
                //this.$refs["dataAddForm"].resetFields();
                return true;
            },
            // 显示表单
            handleAddForm(index, row) {
                this.formAddVisible = true;
                this.formAddData = Object.assign({}, formJson);
                if (row !== null) {
                    var index = 0;
                    var temp = [];
                    for(var x in row) {
                        if(x.indexOf("ext_column")>-1 && row[x]!=''){
                            temp[index] = {value:row[x]};
                            index++;
                        }
                    }
                    //console.log(temp)
                    var data = {};
                    data.domains = temp;
                    data.id = row.id;
                    this.formAddData = Object.assign({}, data);

                }
                //this.formAddData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
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
                this.formData.set_id = this.formData.id;
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
                        let data = Object.assign({}, this.formAddData);
                        thirdGameSetSave(data).then(response => {
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
                                //this.$refs["dataAddForm"].resetFields();
                                this.formAddVisible = false;
                                if (this.formAddName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.list.unshift(resData);
                                } else {
                                    this.getList();
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
                            thirdGameSetDel(para)
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
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
