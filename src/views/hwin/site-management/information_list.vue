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

            <el-form-item class="query-form-item">
                <el-select v-model="query.type" placeholder="资讯类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="新闻" value="新闻"></el-option>
                    <el-option label="技巧" value="技巧"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>
                    <!--<el-button type="primary" icon="el-icon-search" @click="handleDownload">excel</el-button>-->

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
                :header-cell-style="getRowClass"
                @selection-change="selsChange"
                >

            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column label="ID" prop="id" fixed></el-table-column>

            <el-table-column prop="tableName" :label="$t('text.globalCurrency')" width="100" align="center"></el-table-column>
            <!--<el-table-column label="商户名称" prop="title" fixed></el-table-column>-->

            <el-table-column label="商户" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="排序值" prop="sequence" fixed>

                <template scope="scope">
                    <el-input size="small" v-model="scope.row.sequence" placeholder="请输入排序值" @keyup.enter.native="updateInformationSequence(scope.row)"
                    ></el-input>
                </template>

            </el-table-column>
            <el-table-column label="状态" prop="status" fixed></el-table-column>
            <el-table-column label="资讯类型" prop="type" fixed></el-table-column>
            <el-table-column label="资讯标题" prop="title" fixed></el-table-column>
            <el-table-column label="最后更新时间" prop="updated_at" fixed></el-table-column>
            <el-table-column label="管理员" prop="updater" fixed></el-table-column>

            <el-table-column label="状态" prop="id" fixed></el-table-column>

            <el-table-column
                    label="操作" width="300"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">置顶</el-button>-->
                    <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">解除置顶</el-button>-->

                    <el-button v-if="scope.row.status === '解除置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemSuccessServer(scope.$index, scope.row)">置顶
                    </el-button>
                    <el-button v-if="scope.row.status === '置顶'" type="primary" size="small" icon="el-icon-edit" @click.native="itemFailedServer(scope.$index, scope.row)">解除置顶
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
            <el-form :model="formData" label-width="8%" :rules="formRules" ref="dataForm">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="formData.title" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="排序" prop="sequence">
                    <el-input v-model="formData.sequence" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="状态"  prop="status">
                    <el-select v-model="formData.status" placeholder="状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="禁用" value="禁用"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="分类" prop="type">
                    <el-radio-group v-model="formData.type" label="分类">
                        <el-radio label="新闻">新闻</el-radio>
                        <el-radio label="技巧">技巧</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" v-model="formData.content" auto-complete="off"></el-input>
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
        informationList,
        authAdminRoleList,
        informationSave,
        informationIsTopSave,
        updateInformationSequence,
        informationDelete
    } from "../../../api/site-management";
    import { parseTime } from '@/utils';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'

    import Upload from '@/components/Upload/singleImage3'


    import MDinput from '@/components/MDinput'


    import VueCropper from 'vue-cropperjs'

    // import local from '../../i18n-demo/local'
    // const viewName = 'VueI18n'
    // import VueCookies from 'vue-cookies'
    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        display_time: undefined, // 前台展示时间
        content_short: '', // 文章摘要
        roles: [],
        // loginUser:$cookies.get('ADMIN-ID')
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
                content: '',
                defaultSrc: './site-management/img.jpg',
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                editorOption: {
                    placeholder: 'Hello World'
                },
                chartData: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
                        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
                        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
                        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
                        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
                        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
                    ]
                },
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
        components: {
            quillEditor,
            VueCropper,
            MDinput,
            Upload
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
            // 全选单选多选
            selsChange(sels) {
                this.sels = sels
            },
            onEditorBlur(editor){//失去焦点事件
            },
            onEditorFocus(editor){//获得焦点事件
            },
            onEditorChange({editor,html,text}){//编辑器文本发生变化
                //this.content可以实时获取到当前编辑器内的文本内容
                console.log(this.content);
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
            getList() {

                if (this.hasPerm('article:add')) {
                    // continue;
                }

                this.loading = true;
                informationList(this.query)
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
            updateInformationSequence(row) {
                var params = {
                    id: row.id,
                    sequence: row.sequence
                }
                // debugger
                updateInformationSequence(params).then(
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
            itemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: '置顶'
                }
                // debugger
                informationIsTopSave(params).then(
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
            itemFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag:  '解除置顶'
                }
                // debugger
                informationIsTopSave(params).then(
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
            changeLanguage () {
                if (this.$i18n.locale == 'en-us') {
                    this.$i18n.locale = 'zh-cn'
                } else {
                    this.$i18n.locale = 'en-us'
                }
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
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                    const filterVal = ['id', 'id', 'id', 'id', 'id']
                    const list = this.list
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            setImage(e) {
                const file = e.target.files[0]
                if (!file.type.includes('image/')) {
                    return
                }
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.dialogVisible = true
                    this.imgSrc = event.target.result
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
                }
                reader.readAsDataURL(file)
            },
            cropImage() {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
            },
            cancelCrop() {
                this.dialogVisible = false
                this.cropImg = this.defaultSrc
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError() {
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                })
            },
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        informationSave(data, this.formName).then(response => {
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
                            informationDelete(para)
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
            // 加载角色列表
            // this.getRoleList();
            this.cropImg = this.defaultSrc;
            // if (!this.$i18n.getLocaleMessage('en')[viewName]) {
            //     this.$i18n.mergeLocaleMessage('en', local.en)
            //     this.$i18n.mergeLocaleMessage('zh', local.zh)
            // }
        },
        computed: {
            contentShortLength() {
                return this.formData.content_short.length
            }
            // lang: {
            //     get() {
            //         return this.$store.state.app.language
            //     },
            //     set(lang) {
            //         this.$i18n.locale = lang
            //         this.$store.dispatch('setLanguage', lang)
            //     }
            // }
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>

<style scoped>g
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
