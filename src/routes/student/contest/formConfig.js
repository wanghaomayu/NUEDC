/**
 * Created by out_xu on 17/6/28.
 */

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
    value: 'registerTimes',
    label: '竞赛报名时间',
    formType: 3,
    extra: '请不要忘记选择具体时分秒',
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择报名时间'
    }
  }, {
    value: 'problemTimes',
    label: '竞赛选题时间',
    extra: '请不要忘记选择具体时分秒',
    formType: 3,
    contentType: 'array',
    rules: {
      required: true,
      requiredMessage: '请选择选题时间'
    }
  }
  // , {
  //   value: 'add_on',
  //   label: '附加说明',
  //   formType: 0,
  //   type: 'textarea',
  //   contentType: 'string',
  //   rules: {
  //     required: false,
  //     requiredMessage: ''
  //   }
  // }
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

export {commonConfig,statusConfig}
