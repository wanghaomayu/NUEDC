import { verify } from '../../../utils'
const showConfig = [
  {
    value: 'name',
    label: '用户名',
    disabled: false,
    rules: {
      required: true,
      requiredMessage: '请输入新的用户名'
    }
  }, {
    value: 'email',
    label: '邮箱',
    disabled: false,
    rules: {
      required: true,
      requiredMessage: '请输入新的邮箱'
    }
  }, {
    value: 'mobile',
    label: '手机号',
    disabled: true
  }, {
    value: 'school_name',
    label: '学校名称',
    disabled: true
  }, {
    value: 'sex',
    label: '性别',
    disabled: false
  }, {
    value: 'add_on',
    label: '备注信息',
    disabled: true
  }
]

const password = [
  {
    value: 'oldPassword',
    label: '旧密码',
    formType: 0,
    contentType: 'string',
    type: 'password',
    rules: {
      required: true,
      requiredMessage: '请输入您的旧密码',
      pattern: verify.password,
      patternMessage: '6-18位数字、英文字母或者下划线'
    }
  }, {
    value: 'newPassword',
    label: '新密码',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的新密码',
      pattern: verify.password,
      patternMessage: '6-18位数字、英文字母或者下划线'
    }
  }
]

const email = [
  {
    value: 'email',
    label: '邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入邮箱',
      pattern: verify.mail,
      patternMessage: '请输入合法的邮箱',
    },
    hasFeedback: false
  }
]

const name = [{
  value: 'name',
  label: '用户名',
  formType: 0,
  contentType: 'string',
  rules: {
    required: true,
    requiredMessage: '请输入您的用户昵称',
    pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
    patternMessage: '2-20位英文字母、汉字、数字'
  }
}]

const sex = [
  {
    value: 'sex',
    label: '性别',
    formType: 1,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择性别'
    },
    options: [{'label': '男', 'value': '男'}, {'label': '女', 'value': '女'}]
  }
]

export { showConfig, password, email, name, sex }