/**
 * Created by Pororo on 17/7/15.
 */

export default [
  {
    value: 'team_name',
    label: '队伍名称',
    formType: 0,
    contentType: 'string',
    disabled: true,
    rules: {
      required: true,
      requiredMessage: '',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'team_code',
    label: '队伍编号',
    formType: 0,
    contentType: 'string',
    disabled: true,
    rules: {
      required: true,
      requiredMessage: '',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'result',
    label: '比赛结果',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入比赛结果'
    }
  }
]
