<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">

            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.select_user_type" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="用户名" value="用户名"></el-option>
                    <el-option label="所属上级" value="所属上级"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.username" type="textarea" placeholder="用户名(支持批量查询,逗号间隔)"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.group" placeholder="所属组">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="一级代理" value="一级代理"></el-option>
                    <el-option label="代理用户" value="代理用户"></el-option>
                    <el-option label="会员用户" value="会员用户"></el-option>
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
                <el-select v-model="query.user_level" placeholder="所属层级">
                    <el-option value="" label="不限"></el-option>
                    <el-option value="未分层" label="未分层"></el-option>
                    <el-option value="vip3" label="vip3"></el-option>
                    <el-option value="vip4" label="vip4"></el-option>
                    <el-option value="vip5" label="vip5"></el-option>
                    <el-option value="vip6" label="vip6"></el-option>
                    <el-option value="vip2" label="vip2"></el-option>
                    <el-option value="vip8" label="vip8"></el-option>
                    <el-option value="vip7" label="vip7"></el-option>
                    <el-option value="vip10" label="vip10"></el-option>
                    <el-option value="v11" label="v11"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.select_type_amount" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="账户余额" value="账户余额"></el-option>
                    <el-option label="可用余额" value="可用余额"></el-option>
                    <el-option label="未结算金额" value="未结算金额"></el-option>
                    <el-option label="累计充值" value="累计充值"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-input v-model="query.min" placeholder="min" style="width:150px;"></el-input>
                <el-input v-model="query.max" placeholder="max" style="width:150px;"></el-input>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-date-picker
                        v-model="query.beginDate"
                        type="date"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd 00:00:00" format="yyyy-MM-dd 00:00:00">
                </el-date-picker>
                <el-date-picker
                        v-model="query.endDate"
                        type="date"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd 23:59:59" format="yyyy-MM-dd 23:59:59">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="query-form-item">
                <el-select v-model="query.online_status" placeholder="状态">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="在线" value="在线"></el-option>
                    <el-option label="离线" value="离线"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-select v-model="query.select_operate_type" placeholder="最后在线">
                    <el-option label="不限" value=""></el-option>
                    <el-option label="小于" value="小于"></el-option>
                    <el-option label="等于" value="等于"></el-option>
                    <el-option label="大于" value="大于"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item class="query-form-item">
                <el-input v-model="query.days" placeholder="天前"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增用户</el-button>
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">批量查询</el-button>-->
                    <el-button type="primary" icon="el-icon-search" @click="handleDownload">excel</el-button>

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

            <!--<el-table-column label="					ID		" prop="id" fixed></el-table-column>-->
            <el-table-column label="			商户名称				" prop="merchant_name" fixed></el-table-column>
            <el-table-column label="					在线状态		" prop="online_status" fixed></el-table-column>
            <el-table-column label="					用户名		" prop="username" fixed></el-table-column>
            <el-table-column label="					所属组		" prop="group" fixed></el-table-column>
            <el-table-column label="					用户层级		" prop="user_level" fixed></el-table-column>
            <el-table-column label="					所属上级		" prop="top_level" fixed></el-table-column>
            <el-table-column label="					返点		" prop="rake_setting" fixed></el-table-column>
            <el-table-column
                    label="操作" width="500"
                    fixed="right">
                <template slot-scope="scope">

                    <!--<button data-v-486a4262="" type="button" class="el-button el-button&#45;&#45;default el-button&#45;&#45;small">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>编辑</span></button>-->

                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>-->
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleLockForm(scope.$index, scope.row)">冻结</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleAdjustForm(scope.$index, scope.row)">调点</el-button>
                    <!--<el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleProject(scope.$index, scope.row)">下注记录</el-button>-->
                    <!--<el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleBankCardLockForm(scope.$index, scope.row)">锁卡</el-button>-->
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleQuotaForm(scope.$index, scope.row)">配额设置</el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleEditParentForm(scope.$index, scope.row)">修改上级</el-button>
                    <!--<el-button type="primary" size="small" icon="el-icon-delete" @click.native="handleBankCardUnLockForm(scope.$index, scope.row)">解锁</el-button>-->


                    <el-button v-if="scope.row.status === '0'" type="primary" size="small" icon="el-icon-edit" @click.native="itemSuccessServer(scope.$index, scope.row)">锁卡
                    </el-button>
                    <el-button v-if="scope.row.status === '1'" type="primary" size="small" icon="el-icon-edit" @click.native="itemFailedServer(scope.$index, scope.row)">解锁
                    </el-button>
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
                width="65%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">
                <el-tabs type="border-card">
                    <el-tab-pane label="基本资料修改">
                        <table width="1000" border=1px cellpadding=0 cellspacing=0 class="ui-jqgrid-htable ui-common-table table table-bordered" style="margin-top: 35px" aria-labelledby="gbox_table_list"  role="presentation">
                            <tr>
                                <td width="324" class="center">所属上级</td>
                                <td width="521" class="center"><el-input style="width:550px;" v-model="formData.top_level" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">用户账号</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.account" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">昵称</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.nickname" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">邮箱</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.email" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">手机号码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.tel" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">联系QQ</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.qq" auto-complete="off"></el-input></td>
                            </tr>
                            <!--<tr>
                                <td class="center">重复数</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.username" auto-complete="off"></el-input></td>
                            </tr>-->
                            <tr>
                                <td class="center">微信号</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.weixin" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">备注</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.memo" auto-complete="off"></el-input></td>
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
                                <td class="center"><el-input style="width:550px;" v-model="formData.password" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">再次输入密码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.password_new" auto-complete="off"></el-input></td>
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
                                <td class="center"><el-input style="width:550px;" v-model="formData.fund_password" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">再次输入密码</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.fund_password_new" auto-complete="off"></el-input></td>
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
                                <td class="center"><el-input style="width:550px;" v-model="formData.realname" auto-complete="off"></el-input></td>
                            </tr>
                            <tr>
                                <td class="center">真实姓名修改</td>
                                <td class="center"><el-input style="width:550px;" v-model="formData.realname" auto-complete="off"></el-input><p>真实姓名修改会连动到用户银行卡姓名修改</p></td>
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
                width="45%"
                top="5vh">
            <el-form :model="formData" label-width="9%" :rules="formRules" ref="dataForm">

                <el-form-item label="冻结范围" prop="lock_range">
                    <el-radio-group v-model="formData.lock_range">
                        <el-radio label="仅冻结此用户不冻结其下级">仅冻结此用户不冻结其下级</el-radio>
                        <el-radio label="冻结此用户和所有下级">冻结此用户和所有下级</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="冻结方式" prop="lock_type">
                    <el-radio-group v-model="formData.lock_type">
                        <el-radio label="完全冻结">完全冻结</el-radio>
                        <el-radio label="可登录，查看帮助中心，不可投注，不可充提">可登录，查看帮助中心，不可投注，不可充提</el-radio>
                        <el-radio label="不可投注，可充提，查看用户列表和报表、帮助中心">不可投注，可充提，查看用户列表和报表、帮助中心</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="在线客服"  prop="online_qq">
                    <el-checkbox v-model="formData.online_qq">允许访问在线客服</el-checkbox>
                </el-form-item>

                <el-form-item label="冻结原因" prop="lock_reason">
                    <el-input v-model="formData.lock_reason" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideLockForm">取消</el-button>
                <el-button type="primary" @click.native="formUserLockSubmit()" :loading="formLockLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formAdjustVisible"
                :before-close="hideAdjustForm"
                width="65%"
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
                        <td width="521" class="center"><el-input style="width:350px;" v-model="formData.top_level" auto-complete="off"></el-input></td>
                        <td width="157" class="center">返点级别</td>
                        <td width="178" class="center" id="free2"><el-input style="width:150px;" v-model="formData.rake_setting" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">当前账号</td>
                        <td class="center"><el-input style="width:350px;" v-model="formData.realname" auto-complete="off"></el-input></td>
                        <td class="center">返点级别</td>
                        <td class="center"><el-input style="width:150px;" v-model="formData.rake_setting" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">下级账号</td>
                        <td class="center"><el-input style="width:350px;" v-model="formData.realname" auto-complete="off"></el-input></td>
                        <td class="center">返点级别</td>
                        <td class="center"><el-input style="width:150px;" v-model="formData.rake_setting" auto-complete="off"></el-input></td>
                    </tr>
                    <tr>
                        <td class="center">调整用户返点为</td>
                        <td class="center">
                            <el-select v-model="formData.rake_setting" placeholder="10.0%------2000">
                                <el-option value="10.0%------2000" label="10.0%------2000"></el-option>
                                <el-option value="11.0%------3000" label="11.0%------3000"></el-option>
                                <el-option value="12.0%------4000" label="12.0%------4000"></el-option>
                                <el-option value="13.0%------5000" label="13.0%------5000"></el-option>
                                <el-option value="14.0%------6000" label="14.0%------6000"></el-option>
                                <el-option value="15.0%------7000" label="15.0%------7000"></el-option>
                                <el-option value="16.0%------8000" label="16.0%------8000"></el-option>
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
                <el-button type="primary" @click.native="formEditRebateSubmit()" :loading="formAdjustLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formBankCardLockVisible"
                :before-close="hideBankCardLockForm"
                width="35%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <el-form-item label="账号类型" prop="status">
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
                width="35%"
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
                width="35%"
                top="5vh">
            <el-form :model="formData" label-width="16%" :rules="formRules" ref="dataForm">
                <el-form-item label="当前上级账号" prop="top_level">
                    <el-input v-model="formData.top_level" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="返点级别" prop="rake_setting">
                    <el-input v-model="formData.rake_setting" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="修改上级账号" prop="top_parent_new">
                    <el-select v-model="formData.top_parent_new" placeholder="修改上级账号">
                        <el-option value="user0001" label="user0001"></el-option>
                        <el-option value="user0002" label="user0002"></el-option>
                        <el-option value="user0003" label="user0003"></el-option>
                        <el-option value="user0004" label="user0004"></el-option>
                        <el-option value="user0005" label="user0005"></el-option>
                        <el-option value="user0006" label="user0006"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideEditParentForm">取消</el-button>
                <el-button type="primary" @click.native="formEditLevelSubmit()" :loading="formEditParentLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--表单-->
        <el-dialog
                :title="formMap[formName]"
                :visible.sync="formQuotaVisible"
                :before-close="hideQuotaForm"
                width="85%"
                top="5vh">
            <el-form :model="model" :rules="formRules" ref="dataForm">
                <!--<el-form-item label="用户编号" prop="user_id">
                    <el-input v-model="model.user_id" :data="model.user_id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="model.username" :data="model.username" auto-complete="off"></el-input>
                </el-form-item>-->
                <template>
                    <el-table
                            :data="model.tableData"
                            stripe
                            style="width: 100%">

                        // dalian
                       <!-- <el-table-column label="					排序值		" v-model="formData.abc" prop="tableData.date" fixed>
                            <template scope="scope">
                                <el-input size="small" placeholder="请输入排序值"
                                ></el-input>
                            </template>
                        </el-table-column>-->

                        <!--<el-table-column   label="印鉴保管人职务"   align="center">
                            <template slot-scope="scope">
                                <el-form-item  :prop="'evidenceTemplateList.' + scope.$index + '.sealKeeperJob'">
                                    <el-input  v-model="scope.row.sealKeeperJob" size="small"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>-->
                        <!--:prop="'formData.tableData.' + scope.$index + '.address'"-->
                        <el-table-column
                                width="240"
                                label="返点等级">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.rebate_level'" >
                                    <el-input style="width:80px"  v-model="scope.row.rebate_level" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="topallen拥有数量">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.topallen_valid_count'" >
                                    <el-input style="width:80px"  v-model="scope.row.topallen_valid_count" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="topallen剩余数量">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.topallen_left_count'" >
                                    <el-input style="width:80px"  v-model="scope.row.topallen_left_count" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="修改剩余数量">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.left_count'" >
                                    <el-input style="width:80px"  v-model="scope.row.left_count" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="您的配额">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.quota'" >
                                    <el-input style="width:80px"  v-model="scope.row.quota" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>

                        <!--<el-table-column   label="印鉴保管人部门"   align="center">
                            <template slot-scope="scope">
                                &lt;!&ndash;<el-input  v-model="scope.row" size="small" :maxlength="30" ></el-input>&ndash;&gt;
                                <el-form-item  :prop="'tableData123.' + scope.$index + '.address'">
                                     <el-input  v-model="scope.row.address" size="small" :maxlength="30" ></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>-->


                        <!--<el-table-column
                                v-model="formData.abc"
                                prop="tableData.date"
                                label="返点等级"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tableData.name"
                                label="topallen拥有数量"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tableData.address"
                                label="topallen剩余数量">
                        </el-table-column>
                        <el-table-column
                                prop="tableData.address"
                                label="修改剩余数量">
                        </el-table-column>
                        <el-table-column
                                prop="tableData.address"
                                label="您的配额">
                        </el-table-column>-->
                    </el-table>
                </template>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="hideQuotaForm">取消</el-button>
                <el-button type="primary" @click.native="formQuotaSubmit()" :loading="formQuotaLoading">提交</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import {
        userMainlist,
        authAdminRoleList,
        userSave,
        userStatusSave,
        userQuotaSave,
        userTopParentSave,
        userRebateSave,
        getUserQuota,
        userLockSave,
        authAdminDelete
    } from "../../../api/user-management";
    import { parseTime } from '@/utils';

    const formJson = {
        id: "",
        password: "",
        username: "",
        checkPassword: "",
        status: "1",
        roles: [],
        tableData: [],
    };
    // const modelJson = {
    //     input: "",
    // };
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
                formData:{
                    tableData:[{
                        input:"123",
                        name:"",
                        supplier:"",
                        goodstatus:"",
                        producedate:{
                            start:""
                        },
                        expireddate:{
                            start:""
                        }
                    },{
                        input:"456",
                        name:"",
                        supplier:"",
                        goodstatus:"",
                        producedate:{
                            start:""
                        },
                        expireddate:{
                            start:""
                        }
                    }]
                },
                model:{
                    user_id:"",
                    username:"",
                    rules: {
                        name:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                        input:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                        supplier:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                        goodstatus:{ type:"string",required:true,message:"必填字段",trigger:"change"},
                        "producedate.start":{ type:"string",required:true,message:"必填字段",trigger:"change"},
                        "expireddate.start":{ type:"string",required:true,message:"必填字段",trigger:"change"}
                    },
                    tableData:[]
                },
                tableData123: [{
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
                excelList: [],
                tableData:[],
                total: 0,
                loading: true,
                index: null,
                formName: null,
                formMap: {
                    add: "新增",
                    edit: "编辑"
                },
                formLoading: false,
                formLockLoading: false,
                formLockLoadingformLoading: false,
                formEditParentLoading: false,
                formAdjustLoading: false,
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

                // formData: formJson,
                // model: modelJson,
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
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
            },
            getUserQuotaList() {
                // this.loading = true;
                // chaoyang
                getUserQuota(this.model.user_id)
                // huangqiu
                    .then(response => {
                        this.model.tableData = response.data.list || [];
                    })
                    .catch(() => {
                        this.model.tableData = [];
                    });
            },
            handleCurrentChange(val) {
                this.query.page = val;
                this.getList();
            },
            handleFilter() {
                this.query.page = 1
                this.getList()
            },
            handleDownload() {
                this.downloadLoading = true
                this.loading = true;
                let params = Object.assign({}, this.query, {'limit': 9999});
                userMainlist(params)
                    .then(response => {
                        this.excelList = response.data.list.data || [];
                        import('@/vendor/Export2Excel').then(excel => {
                            const tHeader = ['商户名称', '在线状态', '用户名', '所属组', '用户层级', '所属上级', '返点']
                            const filterVal = ['merchant_name', 'online_status', 'username', 'group', 'user_level', 'top_level', 'rake_setting']
                            const excelList = this.excelList
                            const data = this.formatJson(filterVal, excelList)
                            excel.export_json_to_excel({
                                header: tHeader,
                                data,
                                filename: this.filename,
                                autoWidth: this.autoWidth
                            })
                            this.downloadLoading = false
                         })
                    })
                    .catch(() => {
                    });

                this.loading = false;
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
                userMainlist(this.query)
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
            itemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: 1
                }
                // debugger
                userStatusSave(params).then(
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
                    flag: 0
                }
                // debugger
                userStatusSave(params).then(
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
                // anshan
                this.model.user_id = row.id;
                this.model.username = row.realname;
                this.getUserQuotaList(this.model.user_id);
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
                        userSave(data, this.formName).then(response => {
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
            formEditLevelSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formEditParentLoading = true;
                        let data = Object.assign({}, this.formData);
                        userTopParentSave(data, this.formName).then(response => {
                            this.formEditParentLoading = false;
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
                                this.formEditParentVisible = false;
                                this.getList();
                                // if (this.formName === "add") {
                                //     // 向头部添加数据
                                //     let resData = response.data || {};
                                //     this.list.unshift(resData);
                                // } else {
                                //     this.list.splice(this.index, 1, data);
                                // }
                            }
                        });
                    }
                });
            },
            formUserLockSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formLockLoading = true;
                        let data = Object.assign({}, this.formData);
                        userLockSave(data, this.formName).then(response => {
                            this.formLockLoading = false;
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
                                this.formLockVisible = false;
                                this.getList();
                                // 向头部添加数据
                                // this.list.unshift(res)
                                // 刷新表单
                                /*this.$refs["dataForm"].resetFields();
                                this.formVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.list.unshift(resData);
                                } else {
                                    this.list.splice(this.index, 1, data);
                                }*/
                            }
                        });
                    }
                });
            },
            formEditRebateSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formAdjustLoading = true;
                        let data = Object.assign({}, this.formData);
                        userRebateSave(data, this.formName).then(response => {
                            this.formAdjustLoading = false;
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
                                this.formAdjustVisible = false;
                               /* this.$refs["dataForm"].resetFields();
                                this.formVisible = false;
                                if (this.formName === "add") {
                                    // 向头部添加数据
                                    let resData = response.data || {};
                                    this.list.unshift(resData);
                                } else {
                                    this.list.splice(this.index, 1, data);
                                }*/
                            }
                        });
                    }
                });
            },
            formQuotaSubmit() {
                this.$refs["dataForm"].validate(valid => {
                    if (valid) {
                        this.formQuotaLoading = true;
                        let data = Object.assign({}, this.model);
                        userQuotaSave(data, this.formName).then(response => {
                            this.formQuotaLoading = false;
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

                                this.formQuotaVisible = false;

                                /*// 向头部添加数据
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
                                }*/
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
</style>
