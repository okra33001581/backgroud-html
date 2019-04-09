<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.merchant_name" placeholder="商户名称"></el-input>
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
                    <!--<el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null)">新增</el-button>-->
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
                style="width: 100%"
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass"
                >
            <el-table-column label="			Id				" prop="id" fixed></el-table-column>
            <el-table-column label="			商户名称				" prop="merchant_name" fixed></el-table-column>
            <!--<el-table-column label="			Name				" prop="id" fixed></el-table-column>-->
            <el-table-column label="			状态				" prop="status" fixed></el-table-column>
            <el-table-column label="			创建时间				" prop="created_at" fixed></el-table-column>
            <el-table-column label="			更新时间				" prop="updated_at" fixed></el-table-column>

            <!--<el-table-column label="ID" prop="id" align="center" width="65"></el-table-column>
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
                    label="操作" width="100"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">编辑
                    </el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">删除
                    </el-button>-->
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
                width="85%"
                top="5vh">
            <el-form :model="formData" :rules="formRules" ref="dataForm">

                <!--<td>
                    &lt;!&ndash;<el-input v-model="formData.username" auto-complete="off"></el-input>&ndash;&gt;
                    <el-input style="width:550px;" v-model="formData.web_title" placeholder="请输入" background-color="rgba(255, 255, 255, 0.8)"></el-input>
                </td>-->


                <!--<el-input v-model="formData.is_login" auto-complete="off"></el-input>-->

                <table  border=1 cellspacing=0 cellpadding=0  class="ui-jqgrid-htable ui-common-table table table-bordered bgcol-white" role="presentation" aria-labelledby="gbox_table_list">
                    <thead>
                    <tr class="ui-jqgrid-labels" role="row">
                        <th width="166">分类</th>
                        <th width="155">名称</th>
                        <th width="393">设置</th>
                        <th width="407">参数描述</th>
                    </tr>
                    </thead>



                    <tbody><tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="7">前端页面设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>打开首页是否需要登录</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.is_login"
                                    active-text="是"
                                    inactive-text="否">
                                </el-switch>
                            </template>
                        </td>
                        <td>如果设置为是，则只有登入之后才能查看首页，及游戏等</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>网页标题</td>
                        <td>
                            <!--<el-input v-model="formData.username" auto-complete="off"></el-input>-->
                            <el-input style="width:550px;" v-model="formData.web_title" placeholder="请输入" background-color="rgba(255, 255, 255, 0.8)"></el-input>
                        </td>
                        <td>前台网页标签显示标题</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>网页关键词</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.web_keyword" auto-complete="off"></el-input>
                        </td>
                        <td>前台网页keywords关键词</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>网页描述</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.web_desc" auto-complete="off"></el-input>
                        </td>
                        <td>前台网页description描述</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>平台名称</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.platform_name" auto-complete="off"></el-input>
                        </td>
                        <td>平台网站及APP名称</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>免费试玩</td>
                        <td>
                            <template>

                                <el-checkbox-group
                                        v-model="formData.free_play"
                                        :min="1"
                                        :max="6">
                                    <el-checkbox label="pc端"></el-checkbox>
                                    <el-checkbox label="移动端"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </td>
                        <td>选择不同终端启用免费试玩功能</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>节日皮肤</td>
                        <td>
                            <template>
                                <el-select v-model="formData.favorite_skin" clearable placeholder="请选择">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="禁用" value="0"></el-option>
                                    <el-option label="正常" value="1"></el-option>
                                </el-select>
                            </template>
                        </td>
                        <td>选择pc端展示的节日皮肤</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="3">维护设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>是否开启前台维护</td>
                        <td>
                            <template>
                               <!-- <el-radio v-model="formData.username" label="1">是</el-radio>
                                <el-radio v-model="formData.username" label="2">否</el-radio>-->
                                <el-switch
                                        v-model="formData.is_maintain"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>是否开启公司前台维护</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>前台维护描述</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.maintain_desc" auto-complete="off"></el-input>
                        </td>
                        <td>填写维护原因将显示在前台</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>前台维护时间</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.maintain_date" auto-complete="off"></el-input>
                        </td>
                        <td>前台客户看的维护时间，如：2015年03月22日 17:42 到 2015年03月22日 21:00</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="11">注册设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>是否开放网页版注册</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.is_web_register"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>是否显示网页版注册按钮，让用户注册</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>网页版注册默认代理</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.register_default_agent" auto-complete="off"></el-input>
                        </td>
                        <td>选择一个一级代理作为网页版注册的默认代理（默认为:pc001）</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>网页版注册默认返点</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.register_default_rebate" auto-complete="off"></el-input>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>最大投注返点设定</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.max_rebate" auto-complete="off"></el-input>
                        </td>
                        <td>该返点以上的用户无法投注(例如：返点 7.8%，填写 0.078)</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>推广返点设定</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.spread_rebate" auto-complete="off"></el-input>
                        </td>
                        <td>小于该返点时不受配额限制(例如：返点 7.0%，填写 0.070)</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>是否开放手机版注册</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.is_mobile_register"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>是否显示手机版注册按钮，让用户注册</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>APP注册代理设定</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.mobile_default_agent" auto-complete="off"></el-input>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>APP注册代理返点</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.mobile_register_rebate" auto-complete="off"></el-input>
                        </td>
                        <td>例如：返点 7.8%，填写 0.078</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>自主注册默认用户类型</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.autoregister_usertype"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>平台自身的注册链接及代理开放的注册链接将受此参数影响</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>是否允许代理开设同返点下级</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.can_set_rebate"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>是否允许前台代理用户增加或调整下级账号与自身返点相同</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>免费试玩用户默认返点</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.free_play_rebate" auto-complete="off"></el-input>
                        </td>
                        <td>免费试玩用户的返点(例如：返点 7.0%，填写 0.070)</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="2">会员资料设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>用户自主注册需要填写的信息</td>
                        <td>
                            <template>

                                <el-checkbox-group
                                        v-model="formData.user_register_column"
                                        :min="1"
                                        :max="6">
                                    <el-checkbox label="真实姓名"></el-checkbox>
                                    <el-checkbox label="手机号码"></el-checkbox>
                                    <el-checkbox label="QQ"></el-checkbox>
                                    <el-checkbox label="微信"></el-checkbox>
                                    <el-checkbox label="邮件"></el-checkbox>
                                    <el-checkbox label="邀请码"></el-checkbox>
                                </el-checkbox-group>
                                <!--<el-checkbox-group v-model="formData.user_register_column">
                                    <el-checkbox label="真实姓名"></el-checkbox>
                                    <el-checkbox label="手机号码"></el-checkbox>
                                    <el-checkbox label="QQ"></el-checkbox>
                                    <el-checkbox label="微信"></el-checkbox>
                                    <el-checkbox label="邮件"></el-checkbox>
                                    <el-checkbox label="邀请码"></el-checkbox>
                                </el-checkbox-group>-->
                            </template>
                        <td>用户自主注册需要填写的信息,默认不要求额外信息</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>代理开设下级需要填写的用户信息</td>
                        <td>
                            <template>


                                <el-checkbox-group
                                        v-model="formData.lower_register_column"
                                        :min="1"
                                        :max="6">
                                    <el-checkbox label="真实姓名"></el-checkbox>
                                    <el-checkbox label="手机号码"></el-checkbox>
                                    <el-checkbox label="QQ"></el-checkbox>
                                    <el-checkbox label="微信"></el-checkbox>
                                    <el-checkbox label="邮件"></el-checkbox>
                                    <el-checkbox label="邀请码"></el-checkbox>
                                </el-checkbox-group>


                               <!-- <el-checkbox-group
                                        v-model="formData.lower_register_column"
                                        :min="1"
                                        :max="6">
                                    <el-checkbox label="真实姓名"></el-checkbox>
                                    <el-checkbox label="手机号码"></el-checkbox>
                                    <el-checkbox label="QQ"></el-checkbox>
                                    <el-checkbox label="微信"></el-checkbox>
                                    <el-checkbox label="邮件"></el-checkbox>
                                </el-checkbox-group>-->
                            </template>
                        </td>
                        <td>代理开设下级需要填写的用户信息,默认不要求填写额外信息</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="9">出入款设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>单次人工出款上限</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.withdraw_max" auto-complete="off"></el-input>
                        </td>
                        <td>允许最高的单笔人工出款，对所有子账户生效(注:默认不限额度, 厅主也不限额度)。</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>单次人工存入上限</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.deposit_max" auto-complete="off"></el-input>
                        </td>
                        <td>允许最高的单笔人工存入，对所有子账户生效(注:默认不限额度, 厅主也不限额度)。</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>充值金额是否自动添加小数点</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.can_deposit_decimal_point"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>添加小数点为了更好识别是谁入的款项</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>出款开启风控审核</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.withdraw_risk_audit" auto-complete="off"></el-input>
                        </td>
                        <td>设定多少金额以上需要进行风控审核</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>银行卡绑定上限</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.bankcard_bind_max" auto-complete="off"></el-input>
                        </td>
                        <td>个人银行卡可以绑定的个数(未设定则为0张)</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>新增绑定首张银行卡在XX分钟之内不允许提款</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.withdraw_minutes" auto-complete="off"></el-input>
                        </td>
                        <td>绑定首张银行卡在XX分钟之内不允许提款（设置为0或者为空即绑定后即可提款，只针对绑定首张银行卡情况下）</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>是否启用快速充值链接</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.fast_deposit_link_flag"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>设定是否启用快速充值功能</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>快速充值链接</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.fast_deposit_link" auto-complete="off"></el-input>
                        </td>
                        <td>请输入快速充值链接，例如:http://www.baidu.com</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>允许出款时间</td>
                        <td>
                            <template>
                                <el-date-picker
                                        v-model="formData.withdraw_date_begin"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="开始时间"
                                        :picker-options="pickerOptions0">
                                </el-date-picker>
                                <el-date-picker
                                        v-model="formData.withdraw_date_end"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="结束时间"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </template>
                        </td>
                        <td>每天在指定的时间段内，允许用户申请出款，超出时间段，则不允许申请出款</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="3">登入设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>密码输错几次冻结账号</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.login_times" auto-complete="off"></el-input>
                        </td>
                        <td>设定输错多少次冻结账号</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>同个IP一天内允许登入多少个账号</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.ip_account_login_count" auto-complete="off"></el-input>
                        </td>
                        <td>防止同一个IP登入非常多的账号来判断</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>谷歌动态验证码登录</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.google_login_flag"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>是否启用谷歌动态验证码登录</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="6">其他设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>有效投注达到多少视为有效会员</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.valid_user_turnover" auto-complete="off"></el-input>
                        </td>
                        <td>多少元以上的会员，视为有效会员</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>同一账号一人在线</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.login_onetime_flag"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>只允许同一账号一人登录</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>在线客服链接</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.help_link" auto-complete="off"></el-input>
                        </td>
                        <td>在线客服链接, 设定后将在首页展示给客户使用</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>在线QQ客服链接</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.qq_link" auto-complete="off"></el-input>
                        </td>
                        <td>在线QQ客服链接, 设定后将在首页展示给客户使用</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>客服热线电话</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.help_tel" auto-complete="off"></el-input>
                        </td>
                        <td>商户热线电话，设定后将在首页展示</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>QQ客服链接开关</td>
                        <td>
                            <template>
                                <el-switch
                                        v-model="formData.qq_help_flag"
                                        active-text="是"
                                        inactive-text="否">
                                </el-switch>
                            </template>
                        <td>启用或不启用QQ在线客服链接</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="3">风控提醒参数设定</td>
                        <!-- 子集配置第一条 start -->
                        <td>中奖人数比例</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.winner_rato" auto-complete="off"></el-input>
                        </td>
                        <td>中奖人数比例=中奖人数/投注人数*100%；中奖比例不会超过100%，比例越小则说明中奖人数越少。输入范围（0～100）</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>中奖注单比例</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.winner_project_rato" auto-complete="off"></el-input>
                        </td>
                        <td>中奖注单比例=中奖注单单数/注单数*100%；中奖注单比例不会超过100%，比例越大则说明中奖注单数越多。输入范围（0～100）</td>
                    </tr>
                    <tr>
                        <!--  隐藏PC端前台充值处“hot”图标显示位置  -->
                        <td>亏损比</td>
                        <td>
                            <el-input style="width:550px;" v-model="formData.risk_rato" auto-complete="off"></el-input>
                        </td>
                        <td>亏损比=（返奖总额-投注总额）/投注总额；亏损值为负数值则表示当期平台赚钱，亏损值为正数值则表示当期平台亏钱。输入范围（0～200）</td>
                    </tr>
                    <!-- 子集配置循环 end  -->
                    <tr>
                        <!-- 顶级配置 -->
                        <td class="center" rowspan="1">游戏转账</td>
                        <!-- 子集配置第一条 start -->
                        <td>前台转账方式</td>
                        <td>
                            <template>

                                <el-checkbox-group
                                        v-model="formData.transfer_type">
                                    <el-checkbox label="自动"></el-checkbox>
                                    <el-checkbox label="手动"></el-checkbox>
                                </el-checkbox-group>
                            </template>
                        <td>前台供用户选择转账方式</td>
                        <!-- 名称第一条 end -->
                    </tr>

                    <!-- 其他子集配置循环 start  -->
                    <!-- 子集配置循环 end  -->
                    </tbody></table>

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
        systemconfiglist,
        authAdminRoleList,
        systemConfigSave,
        authAdminDelete
    } from "../../../api/site-management";

    const accountType = [
        { key: '真实姓名', name: '自动发放' },
        { key: '手机号码', name: '手动领取' },
        { key: 'QQ', name: '手动领取' },
        { key: '微信', name: '手动领取' },
        { key: '邮件', name: '手动领取' },
        { key: '邀请码', name: '手动领取' }
    ];

    const formJson = {
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
                accountType,
                value3: true,
                value4: true,
                value2: new Date(2016, 9, 10, 18, 40),
                value3: new Date(2016, 9, 10, 18, 40),
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
            //设置表格第一行的颜色
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
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
                systemconfiglist(this.query)
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
                        systemConfigSave(data, this.formName).then(response => {
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
            // // 加载角色列表
            // this.getRoleList();
        }
    };
</script>

<style type="text/scss" lang="scss">
</style>
