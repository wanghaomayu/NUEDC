/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

const commonConfig = [
  {
    value: 'teamName',
    res: 'team_name',
    label: '队伍名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队伍名称',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'name',
    res: 'name',
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
    res: 'member2',
    label: '成员1',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member3',
    res: 'member3',
    label: '成员2',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'teacher',
    res: 'teacher',
    label: '指导教师姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入指导教师姓名'
    }
  }, {
    value: 'mobile',
    res: 'contact_mobile',
    label: '队长手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的手机号',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机号！'
    }
  }, {
    value: 'email',
    res: 'email',
    label: '队长邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的邮箱',
      pattern: verify.email,
      patternMessage: '输入合法的邮箱！'
    }
  }
]

const userConfig =[
  {
    value: 'teamName',
    res: 'team_name',
    label: '队伍名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队伍名称',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'name',
    res: 'name',
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
    res: 'member2',
    label: '成员1',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member3',
    res: 'member3',
    label: '成员2',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'teacher',
    res: 'teacher',
    label: '指导教师姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入指导教师姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'mobile',
    res: 'contact_mobile',
    label: '队长手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的手机号',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机号！'
    }
  }, {
    value: 'email',
    res: 'email',
    label: '队长邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的邮箱',
      pattern: verify.email,
      patternMessage: '输入合法的邮箱！'
    }
  }
]

export { commonConfig, userConfig }