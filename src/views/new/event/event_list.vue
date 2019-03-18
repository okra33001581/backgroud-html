<template>

    <div>
        <el-form :inline="true" :model="query" class="query-form" size="mini">
            <el-form-item class="query-form-item">
                <el-input v-model="query.event_name" :placeholder="$t('page.event_name')"></el-input>
            </el-form-item>
            <el-form-item class="query-form-item">
                <el-select v-model="query.event_object" :placeholder="$t('page.event_object')">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="充值赠送" value="9"></el-option>
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
                <el-select v-model="query.status" :placeholder="$t('page.status')">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="停用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-refresh" @click="getList"></el-button>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">{{$t('page.search')}}</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click.native="handleForm(null,null,0)">{{$t('page.add')}}</el-button>
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
                @sort-change="sortChange"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :header-cell-style="getRowClass"
                @selection-change="selsChange" @expand-change="rowExpand">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%">
                            <el-table-column
                                    :label="$t('page.merchant_name')"
                                    prop="merchant_name" >
                            </el-table-column>
                            <el-table-column
                                    :label="$t('page.event_name')"
                                    prop="event_name" >
                            </el-table-column>
                            <el-table-column
                                    :label="$t('page.event_object')"
                                    prop="event_object" >
                            </el-table-column>
                            <el-table-column
                                    :label="$t('page.creator')"
                                    prop="creator" >
                            </el-table-column>
                            <el-table-column
                                    :label="$t('page.updated_at')"
                                    prop="updated_at" >
                            </el-table-column>

                            <!--<el-table-column
                                    :label="$t('page.status')"
                                    prop="status" >
                            </el-table-column>-->

                            <el-table-column
                                    prop="status"
                                    sortable="custom"
                                    :label="$t('page.status')" >
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    :label="操作" width="350"
                                    fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row)">{{$t('page.edit')}}
                                    </el-button>
                                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">{{$t('page.del')}}
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    :label="$t('page.merchant_name')"
                    prop="merchant_name">
            </el-table-column>
            <el-table-column
                    :label="$t('page.event_name')"
                    prop="event_name">
            </el-table-column>
            <el-table-column
                    :label="$t('page.event_object')"
                    prop="event_object">
            </el-table-column>
            <el-table-column
                    :label="$t('page.creator')"
                    prop="creator">
            </el-table-column>
            <el-table-column
                    :label="$t('page.updated_at')"
                    prop="updated_at">
            </el-table-column>
            <el-table-column
                    prop="status"
                    :label="$t('page.status')" >
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilterType">{{scope.row.status | statusFilterName}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column
                    :label="$t('page.operate')" width="450"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row, 0)">{{$t('page.edit')}}
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleForm(scope.$index, scope.row, 1)">{{$t('page.add')}}
                    </el-button>
                  <!--  <el-button type="primary" size="small" icon="el-icon-edit" @click.native="handleObjectSetForm(scope.$index, scope.row)">{{$t('page.qualification_set')}}
                    </el-button>-->
                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native="handleDel(scope.$index, scope.row)">{{$t('page.del')}}
                    </el-button>

                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="auditItemSuccessServer(scope.$index, scope.row)">{{$t('page.enable')}}
                    </el-button>
                    <el-button type="primary" size="small" icon="el-icon-delete" @click.native="auditItemFailedServer(scope.$index, scope.row)">{{$t('page.disable')}}
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

            <el-tabs type="border-card">
                <el-tab-pane label="活动内容">
                    <el-form :model="formData" :rules="formRules" ref="dataForm" label-width="100px">


                        <!--<el-input v-model="formData.addSubFlage" style="width: 440px; max-width: 100%;" auto-complete="off"></el-input>

                        <el-form-item :label="$t('page.addSubFlage')" prop="addSubFlage">
                            <el-select v-model="formData.addSubFlage" placeholder="下级活动" style="width: 440px; max-width: 100%;">
                                <el-option label="下级活动" value="1"></el-option>
                                <el-option label="无下级" value="0"></el-option>
                            </el-select>
                        </el-form-item>-->

                        <el-form-item :label="$t('page.event_name')" prop="event_name">
                            <el-input v-model="formData.event_name" style="width: 440px; max-width: 100%;" maxlength="50" auto-complete="off" suffix-icon="el-icon-message"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('page.datePeriod')" prop="datePeriod">
                            <el-date-picker
                                    v-model="formData.range_begin"
                                    type="datetime"
                                    placeholder="开始时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" suffix-icon="el-icon-date">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="formData.range_end"
                                    type="datetime"
                                    placeholder="结束时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" suffix-icon="el-icon-date">
                            </el-date-picker>
                        </el-form-item>


                        <el-form-item :label="$t('page.event_object')" prop="event_object">
                            <el-select v-model="formData.event_object" placeholder="活动模型" style="width: 440px; max-width: 100%;">
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

                        <el-form-item :label="$t('page.send_type')" prop="send_type">
                            <el-checkbox-group
                                    v-model="formData.send_type"
                                    :min="1"
                                    :max="4">
                                <el-checkbox v-for="item in sendType" :label="item.key" :key="item.key" >
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="$t('page.terminal_display')" prop="terminal_display">
                            <el-checkbox-group
                                    v-model="formData.terminal_display"
                                    :min="1"
                                    :max="4">
                                <el-checkbox v-for="item in terminalDisplay" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>

                        <el-form-item :label="$t('page.audit_mode')" prop="audit_mode">
                            <el-checkbox-group
                                    v-model="formData.audit_mode"
                                    :min="1">
                                <el-checkbox v-for="item in auditMode" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>

                        <el-form-item :label="$t('page.frequency')" prop="frequency">
                            <el-input-number v-model="formData.frequency" style="width: 440px; max-width: 100%;" :min="1" :max="58"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.times')" prop="times">
                            <el-input-number v-model="formData.times" style="width: 440px; max-width: 100%;" :min="1" :max="58"
                                             size="small" number></el-input-number>
                        </el-form-item>


                        <el-form-item :label="$t('page.event_desc')" prop="event_desc">
                            <el-input type="textarea" v-model="formData.event_desc" style="width: 440px; max-width: 100%;" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('page.bannerPc')" prop="bannerPc">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave?table=eventPic1"
                                    list-type="picture-card"
                                    :on-success="handlePic1Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic1" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.bannerApp')" prop="bannerApp">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave"
                                    list-type="picture-card"
                                    :on-success="handlePic2Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic2" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.picturePc')" prop="picturePc">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave"
                                    list-type="picture-card"
                                    :on-success="handlePic3Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic3" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.pictureApp')" prop="pictureApp">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave"
                                    list-type="picture-card"
                                    :on-success="handlePic4Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic4" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.forePC')" prop="forePC">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave"
                                    list-type="picture-card"
                                    :on-success="handlePic5Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic5" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.foreApp')" prop="foreApp">
                            <el-upload
                                    action="http://apidemo.test/api/event/fileSave"
                                    list-type="picture-card"
                                    :on-success="handlePic6Success"
                                    :on-remove="handleRemove">
                                <img :src="formData.pic6" class="el-upload el-upload--picture-card"/>
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.termial_display')" prop="termial_display">

                            <el-checkbox-group
                                    v-model="formData.termial_display"
                                    :min="1">
                                <el-checkbox v-for="item in terminalDisplay" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>

                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="规则设置">
                    <el-form :model="formData" :rules="formRules" ref="dataForm"  label-width="130px">
                        <el-form-item :label="$t('page.minus_profit')" prop="plus_profit">
                            <el-input-number v-model="formData.plus_profit" style="width: 440px; max-width: 100%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.minus_profit')" prop="minus_profit">
                            <el-input-number v-model="formData.minus_profit" style="width: 440px; max-width: 100%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.deposit')" prop="deposit">
                            <el-input-number v-model="formData.deposit" style="width: 440px; max-width: 100%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.benefit_ratio')" prop="benefit_ratio">
                            <el-input-number v-model="formData.benefit_ratio" style="width: 440px; max-width: 100%;" :min="0.01" :max="100"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.benefitMoneyPeriod')" prop="benefitMoneyPeriod">
                            <el-input-number v-model="formData.benefit_min" style="width: 440px; max-width: 46%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                            <el-input-number v-model="formData.benefit_max" style="width: 440px; margin-left: 11px; max-width: 46%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.userLevel')" prop="userLevel">
                            <el-checkbox-group
                                    v-model="formData.user_layers"
                                    :min="1">
                                <el-checkbox v-for="item in userLayerOptions" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="$t('page.domain')" prop="domain">
                            <el-input v-model="formData.register_domain" style="width: 440px; max-width: 100%;" maxlength="50" auto-complete="off"  suffix-icon="el-icon-message">
                                <template slot="prepend">Http://</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item :label="$t('page.date_range')" prop="date_range">
                            <el-date-picker
                                    v-model="formData.register_domain_begin"
                                    type="datetime"
                                    placeholder="开始时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" >
                            </el-date-picker>
                            <el-date-picker
                                    v-model="formData.register_domain_end"
                                    type="datetime"
                                    placeholder="结束时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item :label="$t('page.turnover')" prop="turnover">
                            <el-input-number v-model="formData.turnover" style="width: 440px; max-width: 100%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.withdraw_range')" prop="withdraw_range">
                            <el-input-number v-model="formData.withdraw_min" style="width: 440px; max-width: 46%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                            <el-input-number v-model="formData.withdraw_max" style="width: 440px; margin-left: 11px; max-width: 46%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.user_ids')" prop="user_ids">
                            <el-input type="textarea" v-model="formData.user_ids" style="width: 440px; max-width: 100%;" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('page.import_user')" prop="import_user">
                            <el-upload
                                    class="upload-demo"
                                    action="http://apidemo.test/api/event/fileSave"
                                    :http-request="upload"
                                    :on-success="handleUserIdsSuccess"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <img  :src="formData.user_ids" width="0%" height="0%"/>
                                <el-button size="small" type="primary">点击上传</el-button>
                                <!--<div slot="tip" class="el-upload__tip">不超过500kb</div>-->
                            </el-upload>
                        </el-form-item>

                        <el-form-item :label="$t('page.history_deposit')" prop="history_deposit">
                            <el-input-number v-model="formData.history_deposit" style="width: 440px; max-width: 100%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>

                        <el-form-item :label="$t('page.date_range')" prop="history_deposit_begin">
                            <el-date-picker
                                    v-model="formData.history_deposit_begin"
                                    type="datetime"
                                    placeholder="开始时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
                            </el-date-picker>
                            <el-date-picker
                                    v-model="formData.history_deposit_end"
                                    type="datetime"
                                    placeholder="结束时间"
                                    value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm">
                            </el-date-picker>
                        </el-form-item>
                      <!--  <el-form-item :label="$t('page.verify_task')" prop="verify_task">
                        </el-form-item>-->
                        <!--<el-checkbox v-model="formData.bind_bankcard_flag">绑银行卡</el-checkbox>-->
                        <el-form-item label="绑银行卡" prop="绑银行卡">
                            <el-checkbox v-model="formData.bind_bankcard_flag"></el-checkbox>
                            <el-input-number v-model="formData.bind_bankcard_benefit" style="width: 440px; margin-left:11px;max-width: 90%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>
                        <el-form-item label="完善姓名" prop="完善姓名">
                            <el-checkbox v-model="formData.perfect_username_flag"></el-checkbox>
                            <el-input-number v-model="formData.perfect_username_benefit" style="width: 440px; margin-left:11px;max-width: 90%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>
                        <el-form-item label="验证邮箱" prop="验证邮箱">
                            <el-checkbox v-model="formData.verify_email_flag"></el-checkbox>
                            <el-input-number v-model="formData.verify_email_benefit" style="width: 440px; margin-left:11px;max-width: 90%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>
                        <el-form-item label="验证手机" prop="验证手机">
                            <el-checkbox v-model="formData.verify_phone_flag"></el-checkbox>
                            <el-input-number v-model="formData.verify_phone_benefit" style="width: 440px; margin-left:11px;max-width: 90%;" :min="0.01" :max="10000000"
                                             size="small" number></el-input-number>
                        </el-form-item>
                        <!--<el-checkbox v-model="formData.perfect_username_flag">完善姓名</el-checkbox>
                        赠送金额<el-input v-model="formData.perfect_username_benefit" style="left: 10px; width: 430px;" auto-complete="off"></el-input>
                        <el-checkbox v-model="formData.verify_email_flag">验证邮箱</el-checkbox>
                        赠送金额<el-input v-model="formData.verify_email_benefit" style="left: 10px; width: 430px;" auto-complete="off"></el-input>
                        <el-checkbox v-model="formData.verify_phone_flag">验证手机</el-checkbox>
                        赠送金额<el-input v-model="formData.verify_phone_benefit" style="left: 10px; width: 430px;" auto-complete="off"></el-input>-->

                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="高级设置">
                    <el-form :model="formData" :rules="formRules" ref="dataForm"  label-width="90px">

                        <el-form-item :label="$t('page.restrictPlatform')" prop="restrictPlatform">
                        </el-form-item>
                        <el-form-item :label="$t('page.whitelist')" prop="whitelist">
                        <el-checkbox-group
                                v-model="formData.platform_whitelist"
                                :min="1">
                            <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                                {{ item.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                            </el-form-item>
                            <el-form-item :label="$t('page.blacklist')" prop="blacklist">
                            <el-checkbox-group
                                    v-model="formData.platform_blacklist"
                                >
                                <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                            </el-form-item>
                        <!--</el-form-item>-->

                        <el-form-item :label="$t('page.restrictGame')" prop="restrictGame">
                        </el-form-item>
                        <el-form-item :label="$t('page.whitelist')" prop="whitelist">
                            <el-checkbox-group
                                    v-model="formData.game_whitelist"
                                    :min="1">
                                <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>

                        <el-form-item :label="$t('page.blacklist')" prop="blacklist">
                            <el-checkbox-group
                                    v-model="formData.game_blacklist"
                                    :min="1">
                                <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>


                        <el-form-item :label="$t('page.pay_account')" prop="pay_account">
                            <el-checkbox-group
                                    v-model="formData.pay_account"
                                    :min="1">
                                <el-checkbox v-for="item in payAccountOptions" :label="item.key" :key="item.key">
                                    {{ item.name }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item :label="$t('page.rakeback')" prop="rakeback">
                            <template>
                                <el-switch
                                        v-model="formData.rakeback"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </template>

                        </el-form-item>

                        <el-form-item :label="$t('page.rescue_gold')" prop="rescue_gold">
                            <template>
                                <el-switch
                                        v-model="formData.rescue_gold"
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
        activitySubList,
        eventSave,
        eventStatusSave,
        eventDelete
    } from "../../../api/event-management";
    const sendType = [
        { key: '自动发放', name: '自动发放' },
        { key: '手动领取', name: '手动领取' }
    ];
    const terminalDisplay = [
        { key: '移动端', name: '移动端' },
        { key: 'PC端', name: 'PC端' }
    ];
    const auditMode = [
        { key: '不需审核', name: '不需审核' },
        { key: '需审核', name: '需审核' }
    ];

    const viewName = 'VueI18n';

    const formJson = {
        id : "",
        merchant_name : "",
        event_id : "",
        event_name : "",
        begin_date : "",
        end_date : "",
        event_object : "",
        receive_type : [],
        event_desc : "",
        pic1 : "",
        pic2 : "",
        pic3 : "",
        pic4 : "",
        pic5 : "",
        pic6 : "",
        terminal_display : [],
        send_type : [],
        audit_mode : [],
        frequency : "",
        times : "",
        deposit : "",
        benefit_ratio : "",
        benefit : "",
        benefit_min : "",
        benefit_max : "",
        turnover : "",
        deposit_request : "",
        range_begin : "",
        range_end : "",
        platform_whitelist : [],
        platform_blacklist : [],
        game_whitelist : [],
        game_blacklist : [],
        pay_account : "",
        rakeback : "",
        rescue_gold : "",
        status : "",
        bind_bankcard_flag : "",
        bind_bankcard_benefit : "",
        creator : "",
        created_at : "",
        updator : "",
        updated_at : "",
        perfect_username_flag : "",
        perfect_username_benefit : "",
        verify_email_flag : "",
        verify_email_benefit : "",
        verify_phone_flag : "",
        verify_phone_benefit : "",
        history_deposit : "",
        history_deposit_begin : "",
        history_deposit_end : "",
        withdraw_min : "",
        withdraw_max : "",
        user_ids : [],
        user_layers : [],
        register_domain : "",
        register_domain_begin : "",
        register_domain_end : "",
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
                platformsOptions: [
                    { key: '彩票', name: '彩票' },
                    { key: '开源棋牌', name: '开源棋牌' },
                    { key: 'AG', name: 'AG' },
                    { key: 'BBIN', name: 'BBIN' },
                    { key: 'PT', name: 'PT' },
                ],
                userLayerOptions: [
                    { key: 'VIP1', name: 'VIP1' },
                    { key: 'VIP2', name: 'VIP2' },
                    { key: 'VIP3', name: 'VIP3' },
                    { key: 'VIP4', name: 'VIP4' },
                    { key: '普通会员', name: '普通会员' },
                ],
                payAccountOptions: [
                    { key: '支付宝', name: '支付宝' },
                    { key: '微信', name: '微信' },
                ],
                sendType,
                terminalDisplay,
                selectedOption:{},
                auditMode,
                value5: [],
                value11: [],
                tableData: [],
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
                   /* username: [
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
                    ]*/
                },
                editRules: {
                    /*username: [
                        {required: true, message: "请输入姓名", trigger: "blur"}
                    ],
                    status: [
                        {required: true, message: "请选择状态", trigger: "change"}
                    ]*/
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
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (rowIndex == 0) {
                    return 'background:#F2F2F2'
                } else {
                    return ''
                }
            },
            // 展开父表格数据 并查询该数据下的子数据
            rowExpand(row, expandedRows) {
                // 打印父任务内容
                console.log(row)
                let vm = this;
                let params = {
                    taskId: row.id
                };

                // activityList(this.query)
                //     .then(response => {
                //         this.loading = false;
                //         this.list = response.data.list || [];
                //         this.total = response.data.total || 0;
                //     })
                //     .catch(() => {
                //         this.loading = false;
                //         this.list = [];
                //         this.total = 0;
                //         this.roles = [];
                //     });

                activitySubList(params).then(res => {
                    this.tableData = res.data.list;
                });
                //如果展开行数大于1
                if (expandedRows.length > 1) {
                    expandedRows.shift();
                }
            },
            handlePic1Success(response, file, fileList) {
                //response这个
                this.formData.pic1 = response.data;
            },
            handlePic2Success(response, file, fileList) {
                //response这个
                this.formData.pic2 = response.data;
            },
            handlePic3Success(response, file, fileList) {
                //response这个
                this.formData.pic3 = response.data;
            },
            handlePic4Success(response, file, fileList) {
                //response这个
                this.formData.pic4 = response.data;
            },
            handlePic5Success(response, file, fileList) {
                //response这个
                this.formData.pic5 = response.data;
            },
            handlePic6Success(response, file, fileList) {
                //response这个
                this.formData.pic6 = response.data;
            },
            handleUserIdsSuccess(response, file, fileList) {
                //response这个
                this.formData.user_ids = response.data;
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
                        this.selectedOption = [0, 1];
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
                this.$refs["dataObjectSetForm"].resetFields();
                return true;
            },
            // 显示表单
            handleForm(index, row, addSubFlage) {
                this.formVisible = true;
                this.formData = Object.assign({}, formJson);
                if (row !== null) {
                    this.formData = Object.assign({}, row);
                }
                this.formData.status += ""; // 转为字符串（解决默认选中的时候字符串和数字不能比较的问题）
                this.formName = "add";
                this.formData.addSubFlage = addSubFlage;
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
                        eventSave(data, this.formName).then(response => {
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
                                this.getList();
                                /* if (this.formName === "add") {
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
            auditItemSuccessServer(index, row) {
                var params = {
                    id: row.id,
                    flag: 1
                }
                // debugger
                eventStatusSave(params).then(
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
            auditItemFailedServer(index, row) {
                var params = {
                    id: row.id,
                    flag: 0
                }
                // debugger
                eventStatusSave(params).then(
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
            // 删除
            handleDel(index, row) {
                if (row.id) {
                    this.$confirm("确认删除该记录吗?", "提示", {
                        type: "warning"
                    })
                        .then(() => {
                            let para = {id: row.id};
                            eventDelete(para)
                                .then(response => {
                                    this.deleteLoading = false;
                                    if (response.code) {
                                        this.$message({
                                            message: response.message,
                                            type: "error"
                                        });
                                        window.location.reload();
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
