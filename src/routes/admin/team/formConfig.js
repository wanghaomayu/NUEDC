/**
 * Created by out_xu on 17/6/28.
 */

import { verify } from '../../../utils'

const editConfig = [
  {
    value: 'team_name',
    label: '队名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入队伍名称',
      pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
      patternMessage: '2-20位英文字母、汉字、数字'
    }
  }, {
    value: 'member1',
    label: '成员1姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入成员1姓名',
      pattern: verify.chinese,
      patternMessage: '请勿输入非中文字符'
    },
    hasFeedback: false
  }, {
    value: 'member2',
    label: '成员2姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入成员2姓名',
      pattern: verify.chinese,
      patternMessage: '请勿输入非中文字符'
    },
    hasFeedback: false
  }, {
    value: 'member3',
    label: '成员3姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入成员3姓名',
      pattern: verify.chinese,
      patternMessage: '请勿输入非中文字符'
    },
    hasFeedback: false
  }, {
    value: 'teacher',
    label: '指导老师',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入指导老师姓名',
      pattern: verify.chinese,
      patternMessage: '请勿输入非中文字符'
    },
    hasFeedback: false
  }, {
    value: 'contact_mobile',
    label: '联系电话',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入手机',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机号码'
    }
  }, {
    value: 'email',
    label: '联系邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入邮箱',
      pattern: verify.mail,
      patternMessage: '输入合法的邮箱'
    }
  }
]
const passConfig = [{
  value: 'status',
  label: '审核状态',
  formType: 1,
  contentType: 'string',
  rules: {
    required: true,
    requiredMessage: '请选择审核状态'
  },
  options: [
    {
      value: '未通过',
      label: '未通过'
    }, {
      value: '已通过',
      label: '已通过'
    }
  ]
}]

export { editConfig, passConfig }
