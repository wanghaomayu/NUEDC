/**
 * Created by out_xu on 17/6/28.
 */
import { verify } from '../../../utils'
const commonConfig = [
  {
    value: 'title',
    label: '竞赛标题',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入竞赛标题'
    },
    hasFeedback: false
  }, {
    value: 'description',
    label: '竞赛描述',
    formType: 0,
    contentType: 'string',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入竞赛描述'
    }
  }, {
    value: 'prefix',
    label: '参赛编号前缀',
    formType: 0,
    contentType: 'string',
    extra: '用于生成参赛编号',
    rules: {
      required: true,
      requiredMessage: '请输入参赛编号前缀',
      pattern: /^[A-Za-z]$/,
      patternMessage: '用于生成参赛编号，仅限一位英文字符'
    },
    hasFeedback: false
  }, {
    value: 'registerTimes',
    label: '竞赛报名时间',
    formType: 3,
    extra: '时间具体到小时',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择报名时间'
    }
  }, {
    value: 'problemTimes',
    label: '竞赛选题时间',
    extra: '时间具体到小时',
    formType: 3,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择选题时间'
    }
  }
]
const statusConfig = [
  {
    value: 'can_register',
    label: '报名开启状态',
    formType: 2,
    contentType: 'string',
    extra: '自动表示按设置的时间执行',
    rules: {
      required: true,
      requiredMessage: '请选择报名开启状态'
    },
    options: [{
      value: '-1',
      label: '自动'
    }, {
      value: '0',
      label: '关闭'
    }, {
      value: '1',
      label: '开启'
    }]
  }, {
    value: 'can_select_problem',
    label: '选题开启状态',
    formType: 2,
    contentType: 'string',
    extra: '自动表示按设置的时间执行',
    rules: {
      required: true,
      requiredMessage: '请选择选题开启状态'
    },
    options: [{
      value: '-1',
      label: '自动'
    }, {
      value: '0',
      label: '关闭'
    }, {
      value: '1',
      label: '开启'
    }]
  },
]
const resultCheckConfig = [
  {
    value: 'result_check',
    label: '成绩公布状态',
    formType: 1,
    contentType: 'string',
    extra: '成绩未公布时，赛事成绩将无法查询',
    rules: {
      required: true,
      requiredMessage: '请选择成绩公布状态'
    },
    options: [{
      value: '未公布',
      label: '未公布'
    }, {
      value: '已公布',
      label: '已公布'
    }]
  }, {
    value: 'password',
    label: '登录密码',
    formType: 0,
    contentType: 'string',
    type: 'password',
    rules: {
      required: true,
      requiredMessage: '请输入您的密码',
      pattern: verify.password,
      patternMessage: '6-18位数字、英文字母或者下划线'
    }
  }
]

export { commonConfig, statusConfig, resultCheckConfig }
