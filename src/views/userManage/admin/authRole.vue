<template>
    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.name" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="禁用" value="禁用"></el-option>
                    <el-option label="启用" value="启用"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">{{$t('page.search')}}</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">{{$t('page.add')}}</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
       <!-- <el-table
            v-loading="loading"
            :data="list" stripe
            style="width: 100%;"
            max-height="500">-->
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
            <el-table-column
                :label="$t('page.roleId')"
                prop="id"
                sortable="custom">
            </el-table-column>
            <el-table-column
                :label="$t('page.roleName')"
                prop="name"
                sortable="custom">
            </el-table-column>
            <el-table-column
                :label="$t('page.status')"
                sortable="custom">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('page.desc')"
                sortable="custom"
                :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('page.operate')"
                fixed="right"
                width="500">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-share" size="small" @click.native="handleAuth(scope.row.id)">{{$t('page.audit')}}</el-button>
                    <el-button type="primary" icon="el-icon-view" size="small" @click.native="handleAuthByUser(scope.row.id)">{{$t('page.view')}}</el-button>
                    <el-button type="primary" icon="el-icon-edit" size="small" @click.native="handleForm(scope.$index, scope.row)">{{$t('page.edit')}}</el-button>
                    <el-button type="primary" icon="el-icon-add" size="small" @click.native="copyGroupServer(scope.$index, scope.row)">{{$t('page.copyGroup')}}</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" @click.native="handleDel(scope.$index, scope.row)" :loading="deleteLoading">{{$t('page.del')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            :page-size="query.limit"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>

        <!--授权界面-->
        <el-dialog
            title="授权"
            :visible.sync="authFormVisible"
            :close-on-click-modal="false"
            class="dialog">
            <el-tree
                style="max-height: 75vh;overflow-y: auto;"
                :data="authList"
                show-checkbox=""
                default-expand-all=""
                node-key="id"
                ref="tree"
                :props="defaultProps"
                :default-checked-keys="authDefaultCheckedKeys">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="authFormVisible = !authFormVisible">取消</el-button>
                <el-button type="primary" @click.native="authSubmit()" :loading="authLoading">提交
                </el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
            :title="formMap[formName]"
            :visible.sync="formVisible"
            :before-close="hideForm"
            width="85%"
            top="5vh">
            <el-form :model="formData" label-width="5%" :rules="formRules" ref="dataForm">
                <el-form-item :label="$t('page.roleName')" prop="name">
                    <el-input v-model="formData.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('page.sort')" prop="listorder">
                    <el-input type="" v-model="formData.listorder" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('page.status')" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="禁用">{{$t('page.forbid')}}</el-radio>
                        <el-radio label="启用">{{$t('page.regular')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('page.desc')">
                    <el-input type="textarea" v-model="formData.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">{{$t('page.cancel')}}</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">{{$t('page.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import {
    authRoleList,
    authRoleAuthList,
    authRoleAuthListByUser,
    authRoleAuth,
    authRoleSave,
    copyGroup,
    authRoleDelete
} from "../../../api/auth/authRole";
const formJson = {
    id: "",
    name: "",
    status: "",
    remark: "",
    listorder: 999
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
            tableKey: 0,
            list: [],
            total: 0,
            loading: true,
            authList: [],
            defaultProps: {
                children: "children",
                label: "title"
            },
            authLoading: false,
            authFormVisible: false,
            authFormData: {
                role_id: "",
                auth_rules: []
            },
            authDefaultCheckedKeys: [],
            index: null,
            formName: null,
            formMap: {
                add: "新增",
                edit: "编辑"
            },
            formLoading: false,
            formVisible: false,
            formData: formJson,
            formRules: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "请选择状态", trigger: "change" }
                ]
            },
            deleteLoading: false
        };
    },
    methods: {

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
        sortByID(order) {
            if (order === 'ascending') {
                this.query.sort = '+id'
            } else {
                this.query.sort = '-id'
            }
            this.handleFilter()
        },

        onSubmit() {
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
            authRoleList(this.query)
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
        copyGroupServer(index, row) {
            var params = {
                id: row.id,
            }
            // debugger
            copyGroup(params).then(
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
        // 显示授权界面
        handleAuth(roleId) {
            this.authFormData.role_id = roleId;
            this.authFormData.auth_rules = [];
            this.authList = [];
            authRoleAuthList({ id: roleId })
                .then(response => {
                    if (response.code) {
                        this.authFormVisible = false;
                        this.$message({
                            message: response.message,
                            type: "error"
                        });
                        return;
                    }
                    this.authFormVisible = true;
                    this.authList = response.data.auth_list || [];
                    const checkedKeys = response.data.checked_keys || [];
                    let tempCheckedKeys = [];
                    let id = null;
                    let node = null;
                    let getTreeNode = function(arr, id) {
                        for (let i in arr) {
                            let tempNode = arr[i];
                            if (tempNode.id === id) {
                                // 找到了，就不找了
                                node = tempNode;
                            }
                            // 如果还有子节点，再继续找
                            getTreeNode(tempNode.children, id);
                        }
                    };
                    for (let i in checkedKeys) {
                        id = checkedKeys[i];
                        getTreeNode(this.authList, id);
                        if (node && node.children.length <= 0) {
                            // 如果下面没有子节点，则加入
                            tempCheckedKeys.push(id);
                        }
                    }
                    this.authDefaultCheckedKeys = [];
                    this.authDefaultCheckedKeys = tempCheckedKeys;
                    this.$refs.tree.setCheckedKeys([1]);
                    tempCheckedKeys[33] = 1;
                    // this.$refs.tree.setCheckedKeys(tempCheckedKeys);

                    // this.$refs.tree.setCurrentNode({
                    //     id:12,
                    //     label:'产品简介'
                    // })

                    // this.$refs.tree.setChecked('305890105',true,false)
                })
                .catch(() => {});
        },
        // 显示授权界面
        handleAuthByUser(roleId) {
            this.authFormData.role_id = roleId;
            this.authFormData.auth_rules = [];
            this.authList = [];
            authRoleAuthListByUser({ id: roleId })
                .then(response => {
                    if (response.code) {
                        this.authFormVisible = false;
                        this.$message({
                            message: response.message,
                            type: "error"
                        });
                        return;
                    }
                    this.authFormVisible = true;
                    this.authList = response.data.auth_list || [];
                    const checkedKeys = response.data.checked_keys || [];
                    let tempCheckedKeys = [];
                    let id = null;
                    let node = null;
                    let getTreeNode = function(arr, id) {
                        for (let i in arr) {
                            let tempNode = arr[i];
                            if (tempNode.id === id) {
                                // 找到了，就不找了
                                node = tempNode;
                            }
                            // 如果还有子节点，再继续找
                            getTreeNode(tempNode.children, id);
                        }
                    };
                    for (let i in checkedKeys) {
                        id = checkedKeys[i];
                        getTreeNode(this.authList, id);
                        if (node && node.children.length <= 0) {
                            // 如果下面没有子节点，则加入
                            tempCheckedKeys.push(id);
                        }
                    }
                    this.authDefaultCheckedKeys = [];
                    this.authDefaultCheckedKeys = tempCheckedKeys;
                    this.$refs.tree.setCheckedKeys([33]);
                })
                .catch(() => {});
        },
        authSubmit() {
            this.authLoading = true;
            let getNodeParents = function(node) {
                let arr = [];
                let id = node.data.id || null;
                if (id) {
                    arr.push(node.data.id);
                }
                if (node.parent) {
                    arr = arr.concat(getNodeParents(node.parent));
                }
                return arr;
            };
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            let arr = [];
            for (let checkedKey of checkedKeys) {
                let node = this.$refs.tree.getNode(checkedKey);
                arr = arr.concat(getNodeParents(node));
            }
            let setArr = new Set(arr);
            this.authFormData.auth_rules = [...setArr];
            if (!this.authFormData) {
                this.$alert("请至少选择一个权限", "提示", {
                    confirmButtonText: "确定"
                });
                return false;
            }
            authRoleAuth(this.authFormData)
                .then(res => {
                    this.authLoading = false;
                    if (res.code) {
                        this.$message({
                            message: res.message,
                            type: "error"
                        });
                    } else {
                        this.$message({
                            message: "授权成功",
                            type: "success"
                        });
                        // 刷新表单
                        this.authFormVisible = false;
                    }
                })
                .catch(() => {
                    this.editLoading = false;
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
                    authRoleSave(data, this.formName)
                        .then(response => {
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
                                this.$refs["dataForm"].resetFields();
                                this.formVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    this.list.unshift(response.data);
                                } else {
                                    this.list.splice(this.index, 1, data);
                                }
                            }
                        })
                        .catch(() => {
                            this.formLoading = false;
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
                        this.deleteLoading = true;
                        let para = { id: row.id };
                        authRoleDelete(para)
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
                '禁用': "gray",
                '启用': "success"
            };
            return statusMap[status];
        },
        statusFilterName(status) {
            const statusMap = {
                "禁用": "禁用",
                "启用": "启用"
            };
            return statusMap[status];
        }
    },
    mounted() {},
    created() {
        // 加载表格数据
        this.getList();
    }
};
</script>

<style type="text/scss" lang="scss">
</style>
