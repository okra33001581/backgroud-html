<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.name" placeholder="平台名"></el-input>
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
            <el-table-column label="排序值" prop="id" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="thirdPlatsSequence(scope.$index, scope.row)"
                    ></el-input>
                </template>

            </el-table-column>
            <el-table-column label="平台唯一标识" prop="identity" fixed></el-table-column>
            <el-table-column label="平台名" prop="name" fixed></el-table-column>
            <el-table-column label="平台分配的标识" prop="plat_identity" fixed></el-table-column>
            <el-table-column label="密钥" prop="params_key" fixed></el-table-column>
            <el-table-column label="唯一密钥" prop="key" fixed></el-table-column>
            <el-table-column label="请求地址" prop="iframe_url" fixed></el-table-column>
            <el-table-column label="推送数据url" prop="data_url" fixed></el-table-column>
            <el-table-column label="状态" prop="status" fixed></el-table-column>
            <el-table-column label="查询启用" prop="query_enabled" fixed></el-table-column>
            <el-table-column label="数据url" prop="free_data_url" fixed></el-table-column>

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
                width="40%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm" label-width="120px">
                <el-form-item label="Id" prop="id">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.id" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="平台唯一标识" prop="identity">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.identity" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="平台名" prop="name">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>

                    <el-form-item label="平台分配的标识" prop="plat_identity">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.plat_identity" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="密钥" prop="params_key">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.params_key" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="唯一密钥" prop="key">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.key" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="请求地址" prop="iframe_url">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.iframe_url" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="推送数据url" prop="data_url">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.data_url" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="状态" prop="status">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.status" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="查询启用" prop="query_enabled">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.query_enabled" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="数据url" prop="free_data_url">
                        <el-input style="width:550px;max-width:100%;" v-model="formData.free_data_url" auto-complete="off"></el-input>
                    </el-form-item>

                <el-form-item label="排序值" prop="terminal">
                    <el-input style="width:550px;max-width:100%;" v-model="formData.terminal" auto-complete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>


        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formSubVisible"
                :before-close="hideSubForm"
                width="85%"
                top="5vh">
            <el-form :model="formSubData" label-width="5%" :rules="formRules" ref="dataForm">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column label="Id" prop="id" fixed></el-table-column>
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
                                <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleTable(scope.$index, scope.row)">编辑
                                </el-button>
                                <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleTableDel(scope.$index, scope.row)">删除
                                </el-button>
                                <el-button type="primary" size="small" icon="el-icon-edit" @click.native="selItemSuccessServer(scope.$index, scope.row)">选择
                                </el-button>
                                <el-button v-if="scope.row.status === '启用'" type="danger" size="small" icon="el-icon-edit" @click.native="auditItemSubServer(scope.row,'禁用')">禁用
                                </el-button>
                                <el-button v-else type="primary" size="small" icon="el-icon-edit" @click.native="auditItemSubServer(scope.row,'启用')">启用
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
        </el-dialog>






        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formSubDetailVisible"
                :before-close="hideSubDetailForm"
                width="40%"
                top="5vh">
            <el-form :model="formSubDetailData" :rules="formRules" ref="dataForm"  label-width="110px">
                <el-form-item label="平台id" prop="plat_id">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.plat_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="平台名称" prop="plat_name">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.plat_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="游戏名称" prop="name">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="icon">
                    <el-upload
                            action="http://apidemo.test/api/event/fileSave?table=eventPic1"
                            list-type="picture-card"
                            :on-success="handlePic1Success"
                            :beforeUpload="beforeAvatarUpload"
                            :on-remove="handleRemove">
                        <img :src="'http://apidemo.test/public/' + formSubDetailData.icon" width="200px" height="150px"/>
                    </el-upload>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.desc" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column1 != '' && formSubDetailData.ext_column1 !=null" :label="formSubDetailData.ext_column1" prop="ext_field1">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column2 != '' && formSubDetailData.ext_column2 !=null" :label="formSubDetailData.ext_column2" prop="ext_field2">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column3 != '' && formSubDetailData.ext_column3 !=null" :label="formSubDetailData.ext_column3" prop="ext_field3">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field3" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column4 != '' && formSubDetailData.ext_column4 !=null" :label="formSubDetailData.ext_column4" prop="ext_field4">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field4" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column5 != '' && formSubDetailData.ext_column5 !=null" :label="formSubDetailData.ext_column5" prop="ext_field5">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field5" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column6 != '' && formSubDetailData.ext_column6 !=null" :label="formSubDetailData.ext_column6" prop="ext_field6">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field6" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column7 != '' && formSubDetailData.ext_column7 !=null" :label="formSubDetailData.ext_column7" prop="ext_field7">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field7" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column8 != '' && formSubDetailData.ext_column8 !=null" :label="formSubDetailData.ext_column8" prop="ext_field8">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field8" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column9 != '' && formSubDetailData.ext_column9 !=null" :label="formSubDetailData.ext_column9" prop="ext_field9">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field9" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column10 != '' && formSubDetailData.ext_column10 !=null" :label="formSubDetailData.ext_column10" prop="ext_field10">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field10" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column11 != '' && formSubDetailData.ext_column11 !=null" :label="formSubDetailData.ext_column11" prop="ext_field11">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field11" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column12 != '' && formSubDetailData.ext_column12 !=null" :label="formSubDetailData.ext_column12" prop="ext_field2">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column13 != '' && formSubDetailData.ext_column13 !=null" :label="formSubDetailData.ext_column13" prop="ext_field13">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field13" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column14 != '' && formSubDetailData.ext_column14 !=null" :label="formSubDetailData.ext_column14" prop="ext_field14">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field14" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column15 != '' && formSubDetailData.ext_column15 !=null" :label="formSubDetailData.ext_column15" prop="ext_field15">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field15" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column16 != '' && formSubDetailData.ext_column16 !=null" :label="formSubDetailData.ext_column16" prop="ext_field16">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field16" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column17 != '' && formSubDetailData.ext_column17 !=null" :label="formSubDetailData.ext_column17" prop="ext_field17">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field17" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column18 != '' && formSubDetailData.ext_column18 !=null" :label="formSubDetailData.ext_column18" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column19 != '' && formSubDetailData.ext_column19 !=null" :label="formSubDetailData.ext_column19" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-show="formSubDetailData.ext_column20 != '' && formSubDetailData.ext_column20 !=null" :label="formSubDetailData.ext_column20" prop="ext_field18">
                    <el-input style="width:550px;max-width:100%;" v-model="formSubDetailData.ext_field18" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubDetailSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>





    </div>

</template>

<script>
    import {
        thirdPlatList,
        thirdPlatsDel,
        thirdPlatsStatusSave,
        thirdGameTypesSubStatusSave,
        thirdGameTypesDetailSave,
        thirdPlatsSequence,
        gameTypeDetailList,
        thirdGameTypesDetailDel,
        thirdMerchantgameSave,
        thirdPlatsSave
    } from "../../../api/third-game-management";

    const formJson = {
        id: "",
        username: "",
        status: "1"
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
                tableData: [],
                tableKey: 0,
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
                formSubDetailVisible: false,
                formData: formJson,
                formSubData: formJson,
                formSubDetailData: formJson,
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
            onIframeLoad (event) {
                const iframe = event.target
                window.addEventListener('message', this.handleMessage)
                iframe.contentWindow.eval(`
              $('.some-element').attr('id', ${this.some_id})
              $('.title').click(function () {
                window.parent.postMessage({
                  cmd: 'xxx',
                  params: {
                    yyy: $('.title').attr('name')
                  }
                })
              })
            `)
            },
            handleMessage (event) {
                const data = event.data
                switch (data.cmd) {
                    case 'xxx':
                        // do something
                        break
                }
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
            handlePic1Success(response, file, fileList) {
                //response这个
                this.formData.icon = response.data;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
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
            getList() {
                this.loading = true;
                thirdPlatList(this.query)
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
                gameTypeDetailList(this.query)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        // this.list = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
            },
            thirdPlatsSequence(index, row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                thirdPlatsSequence(params).then(
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
            auditItemServer(row,flag) {
                var params = {
                    id: row.id,
                    flag: flag
                }
                // debugger
                thirdPlatsStatusSave(params).then(
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
            auditItemSubServer(row,flag) {
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
                        this.getSubList();
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
            // 隐藏明细
            hideSubForm() {
                // 更改值
                this.formSubVisible = !this.formSubVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            hideSubDetailForm() {
                // 更改值
                this.formSubDetailVisible = !this.formSubDetailVisible;
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
            handleTable(index, row) {
                this.formSubDetailVisible = true;
                this.formSubDetailData = Object.assign({}, row);
                //this.formSubDetailData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
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

            //显示明细
            handleSubForm(index, row) {
                this.formSubVisible = true;
                let param = {identity:row.identity};
                gameTypeDetailList(param)
                    .then(response => {
                        this.tableData = response.data.list.data || [];
                        // this.list = response.data.list.data || [];
                        this.totalSub = response.data.list.total || 0;
                    })
                    .catch(() => {
                    });
                this.formSubData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formSubData = Object.assign({}, row);
                }
                //this.formSubData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
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
                        thirdPlatsSave(data, this.formName).then(response => {
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
            formSubDetailSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formSubDetailData);
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
                                // this.tableData.unshift(res)
                                // 刷新表单
                                this.$refs["dataForm"].resetFields();
                                this.formSubDetailVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.tableData.unshift(resData);
                                } else {
                                    this.tableData.splice(this.index, 1, data);
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
                            thirdPlatsDel(para)
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
            },

            // 删除
            handleTableDel(index, row) {
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
                                    this.tableData.splice(index, 1);
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
