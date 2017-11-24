/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import * as config from './formConfig'
import { Button, Form, Icon, Modal } from 'antd'
import { connect } from 'dva'
import FormItemRender from '../../../components/FormItemRender'
const SchoolInfoManage = ({app, schoolInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = schoolInfo
  const {user} = app

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      if (values.oldPassword) {
        dispatch({type: 'schoolInfo/changePassword', payload: values})
      } else {
        dispatch({type: 'schoolInfo/edit', payload: values})
      }
      console.log(values)
    })
  }
  const schoolInfoForm = (item) => {
    const {label, value, disabled = false} = item
    return (
      <div className='school-info-item' key={value}>
        <span className='school-info-label'>{label}</span>
        <span>：{user[value]} {!disabled &&
        <Icon onClick={() => dispatch({type: 'schoolInfo/showModal', payload: value})} style={{fontSize: 16}}
          type='edit' />}</span>
      </div>
    )
  }
  return (
    <div className='school-info-wrapper'>
      {config.showConfig.map((item, index) => schoolInfoForm(item))}
      <Button
        type='primary' className='school-info-button'
        onClick={() => {dispatch({type: 'schoolInfo/showModal', payload: 'password'})}}>
        修改密码
      </Button>

      <Modal
        title='修改信息'
        visible={modal}
        onCancel={() => dispatch({type: 'schoolInfo/hideModal'})}
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

export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(Form.create()(SchoolInfoManage))
