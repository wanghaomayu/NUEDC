/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

export default [
  {
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
    initialValue: '计算机科学与技术',
    hasFeedback: false
  }, {
    value: 'stuId',
    label: '学号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的学号',
      pattern: verify.stuId,
      patternMessage: '输入包含非数字字符！'
    }
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
    value: 'qq',
    label: 'QQ号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的QQ号',
      pattern: verify.qq,
      patternMessage: '输入合法的QQ号！'
    }
  }, {
    value: 'guide',
    label: '指导老师',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择指导老师'
    },
    options: [{'label': '柏禄一', 'value': '柏禄一'}, {'label': '程绍辉', 'value': '程绍辉'}, {
      'label': '方淼',
      'value': '方淼'
    }, {'label': '高齐新', 'value': '高齐新'}, {'label': '管莹', 'value': '管莹'}, {
      'label': '韩来权',
      'value': '韩来权'
    }, {'label': '李峰', 'value': '李峰'}, {'label': '李佳音', 'value': '李佳音'}, {
      'label': '刘杰民',
      'value': '刘杰民'
    }, {'label': '刘星', 'value': '刘星'}, {'label': '吕艳霞', 'value': '吕艳霞'}, {
      'label': '马海涛',
      'value': '马海涛'
    }, {'label': '曲荣欣', 'value': '曲荣欣'}, {'label': '沈哲', 'value': '沈哲'}, {
      'label': '史闻博',
      'value': '史闻博'
    }, {'label': '万聪', 'value': '万聪'}, {'label': '王聪', 'value': '王聪'}, {
      'label': '王翠荣',
      'value': '王翠荣'
    }, {'label': '王和兴', 'value': '王和兴'}, {'label': '王鑫', 'value': '王鑫'}, {
      'label': '徐长明',
      'value': '徐长明'
    }, {'label': '于长永', 'value': '于长永'}, {'label': '张冬丽', 'value': '张冬丽'}, {
      'label': '张旭',
      'value': '张旭'
    }, {'label': '赵媛', 'value': '赵媛'}, {'label': '周扬', 'value': '周扬'}, {'label': '朱方', 'value': '朱方'}]
  }, {
    value: 'title',
    label: '毕业设计题目',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入毕业设计题目',
      pattern: '',
      patternMessage: ''
    },
    hasFeedback: false,
    placeholder: '如果已经跟导师确定题目，则填入，否则可以为空'
  }
]
