/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import * as config from './formConfig'
import { Button, Form, Icon, Modal } from 'antd'
import { connect } from 'dva'
import FormItemRender from '../../../components/FormItemRender'
const StudentInfoManage = ({app, studentInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = studentInfo
  const {user} = app

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      if (values.oldPassword) {
        dispatch({type: 'studentInfo/changePassword', payload: values})
      } else {
        dispatch({type: 'studentInfo/edit', payload: values})
      }
      console.log(values)
    })
  }
  const infoFormRender = (item) => {
    const {label, value, disabled = false} = item
    return (
      <div className='school-info-item' key={value}>
        <span className='school-info-label'>{label}</span>
        <span>：{user[value]} {!disabled &&
        <Icon onClick={() => dispatch({type: 'studentInfo/showModal', payload: value})} style={{fontSize: 16}}
          type='edit' />}</span>
      </div>
    )
  }
  return (
    <div className='school-info-wrapper'>
      {config.showConfig.map((item, index) => infoFormRender(item))}
      <Button
        type='primary' className='school-info-button'
        onClick={() => {dispatch({type: 'studentInfo/showModal', payload: 'password'})}}>
        修改密码
      </Button>

      <Modal
        title='修改信息'
        visible={modal}
        onCancel={() => dispatch({type: 'studentInfo/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {
            modal && config[modal].map(config => FormItemRender(config, getFieldDecorator, {initialValue: user[config.value]}))
          }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, studentInfo}) => ({app, studentInfo}))(Form.create()(StudentInfoManage))
