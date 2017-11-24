/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

const editConfig = [
  {
    value: 'team_name',
    label: '队伍名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队伍名称',
      pattern: '',
      patternMessage: '！'
    }
  }, {
    value: 'member1',
    label: '队长姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队长的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member2',
    label: '成员1',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入成员1的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member3',
    label: '成员2',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入成员2的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'teacher',
    label: '指导老师',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入指导教师姓名'
    }
  }, {
    value: 'contact_mobile',
    label: '队长手机号',
    formType: 0,
    contentType: 'string',
    extra: '作为学生登录账号，默认密码：NUEDC2017',
    rules: {
      required: true,
      requiredMessage: '请输入队伍队长的手机号',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机！'
    }
  }, {
    value: 'email',
    label: '邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队伍队长的邮箱',
      pattern: verify.mail,
      patternMessage: '输入合法的邮箱！'
    }
  }
]

const passConfig = [{
  value: 'record_check',
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