/**
 * Created by out_xu on 17/7/24.
 */

const commonConfig = [
  {
    value: 'title',
    label: '题目标题',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入竞赛标题'
    },
    hasFeedback: false
  }, {
    value: 'content',
    label: '题目内容',
    formType: 0,
    contentType: 'string',
    extra: '题目内容简述，100字以内',
    type: 'textarea',
    rules: {
      required: true,
      requiredMessage: '请输入题目内容'
    }
  }
]

const extra = {
  value: 'add_on',
  label: '附加信息',
  formType: 0,
  contentType: 'string',
  type: 'textarea',
  extra: '附加信息用于题目的特殊说明',
  rules: {
    required: false,
    requiredMessage: ''
  }
}

export { commonConfig, extra }
