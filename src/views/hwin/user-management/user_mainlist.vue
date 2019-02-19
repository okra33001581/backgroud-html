<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="用户名" value="0"></el-option>
                    <el-option label="所属上级" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="所属组">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="一级代理" value="0"></el-option>
                    <el-option label="代理用户" value="1"></el-option>
                    <el-option label="会员用户" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="用户状态">
                    <el-option label="全部用户" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="所属层级">
                    <el-option value="-1" label="不限"></el-option>
                    <el-option value="0" label="未分层"></el-option>
                    <el-option value="1" label="vip3"></el-option>
                    <el-option value="2" label="vip4"></el-option>
                    <el-option value="3" label="vip5"></el-option>
                    <el-option value="4" label="vip6"></el-option>
                    <el-option value="7" label="vip2"></el-option>
                    <el-option value="8" label="vip8"></el-option>
                    <el-option value="9" label="vip.7"></el-option>
                    <el-option value="10" label="vip10"></el-option>
                    <el-option value="11" label="v11"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="账户余额" value="0"></el-option>
                    <el-option label="可用余额" value="1"></el-option>
                    <el-option label="未结算金额" value="2"></el-option>
                    <el-option label="累计充值" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="min"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="max"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始时间"
                        :picker-options="pickerOptions0">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="在线" value="0"></el-option>
                    <el-option label="离线" value="1"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.status" placeholder="最后在线">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="小于" value="0"></el-option>
                    <el-option label="等于" value="1"></el-option>
                    <el-option label="大于" value="2"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-input v-model="query.username" placeholder="用户名"></el-input>
            </el-form-item>

            <!--<el-select v-model="query.sort" style="width: 140px" class="filter-item" @change="handleFilter">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
            </el-select>-->
            <!--<el-form-item class="query-form-item">
                <el-select v-model="query.role_id" placeholder="角色">
                    <el-option label="全部角色" value=""></el-option>
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>-->

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增用户</el-button>-->
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">批量查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">导出</el-button>
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
                v-loading="loading"
                :key="tableKey"
                :data="list" stripe
                border
                fit
                highlight-current-row
                style="width: 100%;"
                @sort-change="sortChange">


           <!-- 在线状态
            用户名
            所属组
            用户层级
            所属上级
            返点
            账户余额
            累计充值
            累计投注
            注册日期
            用户状态-->

            <el-table-column label="					ID		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					在线状态		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户名		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					所属组		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户层级		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					所属上级		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					返点		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					账户余额		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					累计充值		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					累计投注		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					注册日期		" prop="id" sortable="custom" fixed></el-table-column>
            <el-table-column label="					用户状态		" prop="id" sortable="custom" fixed></el-table-column>


            <!--<el-table-column label="ID" prop="id" sortable="custom" align="center" width="65"></el-table-column>
            &lt;!&ndash;<el-table-column
                label="用户 ID"
                prop="id"
                sortable="custom"
                align="center"
                fixed>
                <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                </template>
            </el-table-column>&ndash;&gt;

            <el-table-column
                    label="用户名"
                    prop="username"
                    sortable="custom"
                    fixed>
            </el-table-column>

            <el-table-column
                    sortable="custom"
                    label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="登录时间"
                    with="300"
                    sortable="custom"
                    :show-overflow-tooltip="true" prop="last_login_time">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.last_login_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    sortable="custom"
                    label="登录IP" prop="last_login_ip">
                <template slot-scope="scope">
                    <span>{{ scope.row.last_login_ip }}</span>
                </template>
            </el-table-column>-->
            <el-table-column
                    label="操作" width="850"
                    fixed="right">
                <template slot-scope="scope">

                    <!--<button data-v-486a4262="" type="button" class="el-button el-button&#45;&#45;default el-button&#45;&#45;small">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>编辑</span></button>-->

                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>-->
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleLockForm(scope.$index, scope.row)">冻结</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleAdjustForm(scope.$index, scope.row)">调点</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleProject(scope.$index, scope.row)">下注记录</el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleBankCardLockForm(scope.$index, scope.row)">锁卡</el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleQuotaForm(scope.$index, scope.row)">配额设置</el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleEditParentForm(scope.$index, scope.row)">修改上级</el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleBankCardUnLockForm(scope.$index, scope.row)">解锁</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<el-pagination-->
                <!--:page-size="query.limit"-->
                <!--@current-change="handleCurrentChange"-->
                <!--layout="prev, pager, next"-->
                <!--:total="total">-->
        <!--</el-pagination>-->

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentTotal">
        </el-pagination>


        <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />-->

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formVisible"
                :before-close="hideForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-tabs type="border-card">
                    <el-tab-pane label="基本资料修改">
                        <table width="1200" border=1px cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                            <tr>
                                <td width="324" class="center">所属上级</td>
                                <td width="521" class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">用户账号</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">昵称</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">邮箱</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">手机号码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">联系QQ</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">重复数</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">微信号</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">备注</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="登录密码修改">
                        <table width="1200" border=1 cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                            <tr>
                                <td width="324" class="center">用户账号</td>
                                <td width="521" class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">密码修改</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">再次输入密码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="资金密码修改">
                        <table width="1200" border=1 cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                            <tr>
                                <td width="324" class="center">用户账号</td>
                                <td width="521" class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">资金密码修改</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">再次输入密码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="真实姓名修改">
                        <table width="1200" border=1 cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                            <tr>
                                <td width="324" class="center">用户账号</td>
                                <td width="521" class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">真实姓名</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">真实姓名修改</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input><p>真实姓名修改会连动到用户银行卡姓名修改</p></td>
                            </tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="投注统计">
                        <template>
                            <el-table
                                    :data="tableData"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="平台"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="常玩游戏"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="注单数">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="排名">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-tab-pane>
                </el-tabs>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formLockVisible"
                :before-close="hideLockForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="会员名称" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="冻结范围" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="0">仅冻结此用户不冻结其下级</el-radio>
                        <el-radio label="1">冻结此用户和所有下级</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="冻结方式" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="0">完全冻结</el-radio>
                        <el-radio label="1">可登录，查看帮助中心，不可投注，不可充提</el-radio>
                        <el-radio label="1">不可投注，可充提，查看用户列表和报表、帮助中心</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="在线客服"  prop="status">
                    <el-checkbox v-model="checked">允许访问在线客服</el-checkbox>
                </el-form-item>

                <el-form-item label="冻结原因" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideLockForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLockLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formAdjustVisible"
                :before-close="hideAdjustForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <table width="1200" border=1 cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                    <thead>
                    <tr class="ui-jqgrid-labels">
                        <th colspan="4" >调点</th>
                    </tr>
                    </thead>
                    <tr>
                        <td width="324" class="center">上级账号</td>
                        <td width="521" class="center"><el-input style="width:350px;" v-model="formData.username" auto-complete="off"></el-input></td>
                        <td width="157" class="center">返点级别</td>
                        <td width="178" class="center" id="free2"><el-input style="width:150px;" v-model="formData.username" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">当前账号</td>
                        <td class="center"><el-input style="width:350px;" v-model="formData.username" auto-complete="off"></el-input></td>
                        <td class="center">返点级别</td>
                        <td class="center"><el-input style="width:150px;" v-model="formData.username" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">下级账号</td>
                        <td class="center"><el-input style="width:350px;" v-model="formData.username" auto-complete="off"></el-input></td>
                        <td class="center">返点级别</td>
                        <td class="center"><el-input style="width:150px;" v-model="formData.username" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">调整用户返点为</td>
                        <td class="center">
                            <el-select v-model="query.status" placeholder="10.0%------2000">
                                <el-option value="7" label="10.0%------2000"></el-option>
                            </el-select>
                        </td>
                        <td class="center">&nbsp;</td>
                        <td class="center">&nbsp;</td>
                    </tr>
                </table>


                <!-- <el-form-item label="上级账号" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item label="返点级别" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item label="当前账号" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item label="返点级别" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item label="下级账号" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item label="返点级别" prop="username">
                     <el-input v-model="formData.username" auto-complete="off"></el-input>
                 </el-form-item>

                 <el-form-item class="query-form-item" label="调整用户返点为">

                 </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideAdjustForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formAdjustLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formBankCardLockVisible"
                :before-close="hideBankCardLockForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="账号类型handleBankCardLockForm" prop="status">
                    <el-radio-group v-model="formData.status">
                        <el-radio label="0">代理</el-radio>
                        <el-radio label="1">会员</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="所属上级" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item class="query-form-item">
                    <el-select v-model="query.status" placeholder="返点设置">
                        <el-option value="0.078" label="7.8%------1956"></el-option>
                        <el-option value="0.077" label="7.7%------1954"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="query-form-item">
                    <el-select v-model="query.status" placeholder="最后在线">
                        <el-option value="7" label="vip2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideBankCardLockForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLockLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formBankCardUnLockVisible"
                :before-close="hideBankCardUnLockForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="用户账号" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="第一步：
第一步绑定银行卡信息" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="第二步：
账户余额" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="第三步：
近期登录信息" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>


                <el-form-item label="第四步：
最近充值所使用的银行卡信息" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>





            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideBankCardUnLockForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formLockLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formEditParentVisible"
                :before-close="hideEditParentForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="当前上级账号" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="返点级别" prop="username">
                    <el-input v-model="formData.username" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="修改上级账号" class="query-form-item">
                    <el-select v-model="query.status" placeholder="修改上级账号">
                        <el-option value="7" label="vip2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideEditParentForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formEditParentLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formQuotaVisible"
                :before-close="hideQuotaForm"
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <template>
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="返点等级"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="topallen拥有数量"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="topallen剩余数量">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="修改剩余数量">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="您的配额">
                        </el-table-column>
                    </el-table>
                </template>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideQuotaForm">取消</el-button>
                <el-button type="primary" @click.native="formSubmit()" :loading="formQuotaLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import {
        authAdminList,
        authAdminRoleList,
        authAdminSave,
        authAdminDelete
    } from "../../../api/auth/authAdmin";

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
                roles: [],
                query: {
                    username: "",
                    status: "",
                    page: 1,
                    limit: 20,
                    role_id: "",
                    sort: '+id'
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
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
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formLockLoadingformLoading: false,
                formBankCardLockLoadingformLoading: false,
                formBankCardUnLockLoadingformLoading: false,
                formAdjustLoadingformLoading: false,
                formEditParentformLoading: false,
                formQuotaLoading: false,

                formVisible: false,
                formLockVisible: false,
                formBankCardLockVisible: false,
                formBankCardUnLockVisible: false,
                formAdjustVisible: false,
                formEditParentVisible: false,
                formQuotaVisible: false,

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
        methods: {
            onSubmit() {
                this.$router.push({
                    path: "",
                    query: this.query
                });
                this.getList();
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
                authAdminList(this.query)
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
            hideLockForm() {
                // 更改值
                this.formLockVisible = !this.formLockVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideAdjustForm() {
                // 更改值
                this.formAdjustVisible = !this.formAdjustVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideBankCardLockForm() {
                // 更改值
                this.formBankCardLockVisible = !this.formBankCardLockVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideBankCardUnLockForm() {
                // 更改值
                this.formBankCardUnLockVisible = !this.formBankCardUnLockVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideQuotaForm() {
                // 更改值
                this.formQuotaVisible = !this.formQuotaVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },
            // 隐藏表单
            hideEditParentForm() {
                // 更改值
                this.formEditParentVisible = !this.formEditParentVisible;
                // 清空表单
                this.$refs["dataForm"].resetFields();
                return true;
            },




            // 显示表单

            // formMap[formName]

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
            handleLockForm(index, row) {
                this.formLockVisible = true;
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
            handleBankCardLockForm(index, row) {
                this.formBankCardLockVisible = true;
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
            handleBankCardUnLockForm(index, row) {
                this.formBankCardUnLockVisible = true;
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
            handleEditParentForm(index, row) {
                this.formEditParentVisible = true;
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
            handleAdjustForm(index, row) {
                this.formAdjustVisible = true;
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
            handleQuotaForm(index, row) {
                this.formQuotaVisible = true;
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

            // companymoney_list
            handleProject() {
                window.location.href = '../events6/pgame_playlist';
            },
           /* // cash_withdrawlist
            handleOutfund() {
                window.location.href = '../events3/cash_withdrawlist';
            },
            // lotteryrisk_list
            handleRiskfund() {
                window.location.href = '../events4/lotteryrisk_list';
            },*/
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
            this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
