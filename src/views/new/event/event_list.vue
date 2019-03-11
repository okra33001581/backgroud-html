<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="活动名称"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="活动模型">
                    <el-option label="充值赠送" value=""></el-option>
                    <el-option label="彩金红包" value="0"></el-option>
                    <el-option label="首充赠送" value="1"></el-option>
                    <el-option label="注册送彩金" value="2"></el-option>
                    <el-option label="反水" value="3"></el-option>
                    <el-option label="盈亏赠送" value="4"></el-option>
                    <el-option label="投注赠送" value="5"></el-option>
                    <el-option label="救援金" value="6"></el-option>
                    <el-option label="抽奖" value="7"></el-option>
                    <el-option label="签到" value="8"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
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
        <!--<el-table
            v-loading="loading"
            :data="list" stripe
            style="width: 100%;"
            max-height="500">-->
        <!--<el-table
                v-loading="loading"
                :key="tableKey"
                :data="list" stripe
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange">-->
        <el-table
                :data="tableData5"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="商户名称"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="活动名称"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="活动模型"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="操作人"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="更新时间"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    prop="name" >
                            </el-table-column>
                            <el-table-column
                                    label="操作" width="350"
                                    fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                                    </el-button>
                                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商户名称"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="活动名称"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="活动模型"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="操作人"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="更新时间"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="desc">
            </el-table-column>

            <el-table-column
                    label="操作" width="550"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">新增
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleObjectSetForm(scope.$index, scope.row)">资格设置
                    </el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">启用
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">停用
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
                :title="formObjectSetMap[formObjectSetName]"
                :visible.sync="formObjectSetVisible"
                :before-close="hideObjectSetForm"
                width="35%"
                top="5vh">
            <el-form :model="formObjectSetData" :rules="formObjectSetRules" ref="dataForm">

                <el-form-item label="指定用户" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="导入用户名单" prop="username">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="用户层级" prop="username">
                    <el-checkbox v-model="checked">VIP1</el-checkbox>
                    <el-checkbox v-model="checked">VIP2</el-checkbox>
                    <el-checkbox v-model="checked">VIP3</el-checkbox>
                    <el-checkbox v-model="checked">VIP4</el-checkbox>
                    <el-checkbox v-model="checked">普通会员</el-checkbox>
                </el-form-item>

                <el-form-item label="限制平台" prop="username">
                </el-form-item>
                <el-form-item label="白名单" prop="username">
                    <el-checkbox-group
                            v-model="checkedCities1"
                            :min="1"
                            :max="2"
                            style="margin-left: 75px;"
                        >
                        <el-checkbox  v-model="formData.isCheck1">彩票</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck2">开源棋牌</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">AG</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck2">BBIN</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">PT</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="黑名单" prop="username">
                    <el-checkbox-group
                            v-model="checkedCities1"
                            :min="1"
                            style="margin-left: 75px;"
                            :max="2">
                        <el-checkbox  v-model="formData.isCheck1">彩票</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck2">开源棋牌</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">AG</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck2">BBIN</el-checkbox>
                        <el-checkbox  v-model="formData.isCheck3">PT</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="注册域名" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="时间区间" prop="username">
                    <el-date-picker
                            v-model="formData.beginDate"
                            type="date"
                            placeholder="开始时间"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                    <el-date-picker
                            v-model="formData.endDate"
                            type="date"
                            placeholder="结束时间"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideObjectSetForm">取消</el-button>
                <el-button type="primary" @click.native="formObjectSetSubmit()" :loading="formObjectSetLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="35%"
                top="5vh">

            <el-tabs type="border-card">
                <el-tab-pane label="活动内容">
                    <el-form :model="formData" :rules="formRules" ref="dataForm">

                        <el-form-item label="活动名称" prop="username">
                            <el-input v-model="formData.username" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="时间区间" prop="username">
                            <el-date-picker
                                    v-model="formData.beginDate"
                                    type="date"
                                    placeholder="开始时间"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="formData.endDate"
                                    type="date"
                                    placeholder="结束时间"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>


                        <el-form-item label="活动对象" prop="username">
                            <el-select v-model="formData.status" placeholder="活动模型">
                                <el-option label="充值赠送" value=""></el-option>
                                <el-option label="彩金红包" value="0"></el-option>
                                <el-option label="首充赠送" value="1"></el-option>
                                <el-option label="注册送彩金" value="2"></el-option>
                                <el-option label="反水" value="3"></el-option>
                                <el-option label="盈亏赠送" value="4"></el-option>
                                <el-option label="投注赠送" value="5"></el-option>
                                <el-option label="救援金" value="6"></el-option>
                                <el-option label="抽奖" value="7"></el-option>
                                <el-option label="签到" value="8"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="领取方式" prop="username">
                            <el-select
                                    v-model="value11"
                                    multiple
                                    collapse-tags
                                    placeholder="领取端点">
                                <el-option label="移动端" value="0"></el-option>
                                <el-option label="PC端" value="1"></el-option>
                            </el-select>

                            <el-select
                                    v-model="value11"
                                    multiple
                                    collapse-tags
                                    placeholder="领取模式">
                                <el-option label="不需审核" value="0"></el-option>
                                <el-option label="需审核" value="1"></el-option>
                                </el-option>
                            </el-select>

                        </el-form-item>

                        <el-form-item label="活动介绍" prop="username">
                            <el-input type="textarea" v-model="formData.username" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="Banner(PC)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="Banner(APP)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                            <el-form-item label="活动小图(PC)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            </el-form-item>
                                <el-form-item label="活动小图(APP)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                                </el-form-item>
                                    <el-form-item label="活动封面图(PC)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                                    </el-form-item>
                                        <el-form-item label="活动封面图(APP)" prop="username">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    style="margin-left: 140px;"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                                        </el-form-item>

                        </el-form-item>

                        <el-form-item label="前端显示" prop="username">
                            <el-checkbox-group
                                    v-model="checkedCities1"
                                    :min="1"
                                    :max="2">
                                <el-checkbox  v-model="formData.isCheck2">移动端</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">PC端</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>


                <el-tab-pane label="规则设置">
                    <el-form :model="formData" :rules="formRules" ref="dataForm">

                        <el-form-item label="首充最低金额" prop="username">
                            <el-input v-model="formData.username" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="赠送比例" prop="username">
                            <el-input v-model="formData.username" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="赠送金额范围" prop="username">
                            <el-date-picker
                                    v-model="formData.beginDate"
                                    type="date"
                                    placeholder="最小值"
                                    :picker-options="pickerOptions0">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="formData.endDate"
                                    type="date"
                                    placeholder="最大值"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="流水任务" prop="username">
                            <el-input v-model="formData.username" auto-complete="off"></el-input>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="高级设置">
                    <el-form :model="formData" :rules="formRules" ref="dataForm">

                        <el-form-item label="限制平台" prop="username">
                        </el-form-item>
                            <el-form-item label="白名单" prop="username">
                            <el-checkbox-group
                                    v-model="checkedCities1"
                                    :min="1"
                                    :max="2"
                                    style="margin-left: 78px;"
                                >
                                <el-checkbox  v-model="formData.isCheck1">彩票</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck2">开源棋牌</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">AG</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck2">BBIN</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">PT</el-checkbox>
                            </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="黑名单" prop="username">
                            <el-checkbox-group
                                    v-model="checkedCities1"
                                    :min="1"
                                    :max="2"
                                    style="margin-left: 78px;"
                                >
                                <el-checkbox  v-model="formData.isCheck1">彩票</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck2">开源棋牌</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">AG</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck2">BBIN</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">PT</el-checkbox>
                            </el-checkbox-group>
                            </el-form-item>
                        <!--</el-form-item>-->

                        <el-form-item label="限制游戏" prop="username">
                             <el-select
                                v-model="value11"
                                multiple
                                collapse-tags
                                placeholder="白名单">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                             <el-select
                                v-model="value11"
                                multiple
                                collapse-tags
                                placeholder="黑名单">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        </el-form-item>

                        <el-form-item label="支付账号" prop="username">
                            <el-select
                                    v-model="value11"
                                    multiple
                                    collapse-tags
                                    placeholder="请选择">
                                <el-checkbox  v-model="formData.isCheck3">支付宝</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck2">微信</el-checkbox>
                                <el-checkbox  v-model="formData.isCheck3">支付宝</el-checkbox>
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="返水" prop="username">
                            <template>
                                <el-switch
                                        style="margin-left: 25px;"
                                        v-model="formData.value2"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </template>

                        </el-form-item>

                        <el-form-item label="救援金" prop="username">
                            <template>
                                <el-switch
                                        style="margin-left: 13px;"
                                        v-model="formData.value2"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>

            </el-tabs>


            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {
        activityList,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/event-management";
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        roles: []
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
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                checkedCities1: ['上海', '北京'],
                cities: cityOptions,
                value5: [],
                value11: [],
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }],
                tableData5: [{
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }],
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
                formObjectSetName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formObjectSetMap: {
                    add: "新增",
                        edit: "编辑"
                },
                formLoading: false,
                formVisible: false,
                formData: formJson,
                formRules: {},
                    formObjectSetLoading: false,
                formObjectSetVisible: false,
                formObjectSetData: formJson,
                formObjectSetRules: {},
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
            onSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getList();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
            },
            // 显示表单
            handleObjectSetForm(index, row) {
                this.formObjectSetVisible = true;
                this.formObjectSetData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formObjectSetData = Object.assign({}, row);
                }
                this.formObjectSetData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
                this.formObjectSetName = "add";
                this.formObjectSetRules = this.addRules;
                if (index !== null) {
                    this.index = index;
                    this.formObjectSetName = "edit";
                    this.formObjectSetRules = this.editRules;
                }
                // 清空验证信息表单
                if (this.$refs["dataForm"]) {
                    this.$refs["dataForm"].clearValidate();
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
            getList() {
                this.loading = true;
                activityList(this.query)
                    .then(response => {
                        this.loading = false;
                        this.list = response.data.list || [];
                        this.total = response.data.total || 0;
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
            hideObjectSetForm() {
                // 更改值
                this.formObjectSetVisible = !this.formObjectSetVisible;
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
            formSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLoading = true;
                        let data = Object.assign({}, this.formData);
                        authAdminSave(data, this.formName).then(response => {
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
                            authAdminDelete(para)
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>
