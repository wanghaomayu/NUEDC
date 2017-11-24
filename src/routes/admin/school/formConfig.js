/**
 * Created by out_xu on 17/6/28.
 */

import { verify } from '../../../utils'
const commonConfig = [
  {
    value: 'post_code',
    label: '邮编',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入邮编',
      pattern: verify.postCode,
      patternMessage: '请输入合法的邮编'
    },
    hasFeedback: false
  }, {
    value: 'principal',
    label: '负责人姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入负责人姓名',
      pattern: verify.chinese,
      patternMessage: '请不要输入非中文字符'
    }
  }, {
    value: 'principal_mobile',
    label: '负责人手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入负责人手机号',
      pattern: verify.mobile,
      patternMessage: '请输入合法的手机号'
    }
  }, {
    value: 'address',
    label: '学校通信地址',
    formType: 0,
    type: 'textarea',
    contentType: 'array',
    rules: {
      required: false,
      requiredMessage: '亲输入学校通信地址'
    }
  }
]

const createConfig = [
  {
    value: 'name',
    label: '学校名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入学校名称'
    },
    hasFeedback: false
  }, {
    value: 'level',
    label: '学校等级',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择学校等级'
    },
    options: [
      {
        value: '本科',
        label: '本科'
      }, {
        value: '高职',
        label: '高职'
      }
    ]
  }
]
const editConfig = [
  {
    value: 'name',
    label: '学校名称',
    formType: 0,
    contentType: 'string',
    disabled: false,
    rules: {
      required: true,
      requiredMessage: '请输入学校名称'
    },
    hasFeedback: false
  },  {
    value: 'level',
    label: '学校等级',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择学校等级'
    },
    options: [
      {
        value: '本科',
        label: '本科'
      }, {
        value: '高职',
        label: '高职'
      }
    ]
  }
]

export { commonConfig, createConfig, editConfig }
