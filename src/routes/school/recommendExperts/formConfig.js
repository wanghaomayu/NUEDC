import { verify } from '../../../utils'

export default [
  {
    value: 'school',
    label: '学校',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择学校'
    }
  }, {
    value: 'major',
    label: '专业',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入专业',
      pattern: '',
      patternMessage: ''
    },
    hasFeedback: false
  }, {
    value: 'name',
    label: '姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的姓名',
      pattern: verify.chinese,
      patternMessage: '输入包含非中文字符！'
    }
  }, {
    value: 'gender',
    label: '性别',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择指导老师'
    },
    options: [{'label': '女', 'value': '女'}, {'label': '男', 'value': '男'}]
  }, {
    value: 'position',
    label: '职位',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的职位'
    }
  }, {
    value: 'title_of_professor',
    label: '职称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的职位'
    }
  }, {
    value: 'mobile',
    label: '手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的手机',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机！'
    }
  }, {
    value: 'telephone',
    label: '办公电话',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的办公电话',
      pattern: verify.mobile,
      patternMessage: '输入合法的办公电话！'
    }
  }, {
    value: 'notes',
    label: '备注',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false
    },
    hasFeedback: false
  }
]
