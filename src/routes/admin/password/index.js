/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import * as config from './formConfig'
import { Button, Form, Icon } from 'antd'
import { connect } from 'dva'
import FormItemRender from '../../../components/FormItemRender'
const StudentInfoManage = ({app, adminInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = adminInfo
  const {user} = app

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'adminInfo/changePassword', payload: values})
    })
  }
  return (
    <div className='school-info-wrapper'>
      <Form className='school-info-form-content'>
        {
          config['password'].map(config => FormItemRender(config, getFieldDecorator, {
            formItemLayout: {}, initialValue: user[config.value]
          }))
        }
        <Button type='primary' onClick={onModalOk}> 修改密码 </Button>
      </Form>
    </div>
  )
}

export default connect(({app, adminInfo}) => ({app, adminInfo}))(Form.create()(StudentInfoManage))
