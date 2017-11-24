/**
 * Created by out_xu on 17/7/16.
 */
import React from 'react'
import { connect } from 'dva'
import CountUp from 'react-countup'
import { Button, Col, Form, Input, Row } from 'antd'
import { config } from '../../../utils'
import './index.less'
import FormItemRender from '../../../components/FormItemRender'
import formConfig from './formConfig'

const FormItem = Form.Item

const Register = ({login, dispatch, form: {getFieldDecorator, getFieldValue, validateFieldsAndScroll}}) => {
  const {counter, loading, table: schools} = login
  const schoolOptions = schools.map(config => {
    return {
      value: config.id + '',
      label: config.name,
      level: config.level
    }
  })
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      let schoolName = ''
      schoolOptions.forEach(item => {
        if (item.value === values.schoolId) {
          schoolName = item.label
        }
      })
      values = {
        ...values,
        schoolName,
        passwordConfirmation: undefined
      }
      dispatch({type: 'login/register', payload: values})
    })
  }
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }
  const counterStart = (e) => {
    e.preventDefault()
    const data = {
      mobile: getFieldValue('mobile')
    }
    dispatch({type: 'login/getCode', payload: data})
    dispatch({type: 'login/counterStart'})
    setTimeout(() => {
      dispatch({type: 'login/counterReset'})
    }, 60000)
  }
  const extra = {
    formItemLayout: {
      labelCol: {span: 24},
      wrapperCol: {span: 24}
    }
  }

  return (
    <div className='register-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name} · 参赛队伍注册</span>
        </div>
        <Form>
          {
            FormItemRender({
              value: 'schoolId',
              label: '学校',
              formType: 2,
              contentType: 'string',
              rules: {
                required: true,
                requiredMessage: '请选择您所在的学校',
              },
              options: schoolOptions
            }, getFieldDecorator, extra)
          }
          {formConfig.map(config => FormItemRender(config, getFieldDecorator, extra))}
          <FormItem
            label='确认密码'
            hasFeedback
            key='register-check-password'
          >
            {getFieldDecorator('passwordConfirmation', {
              rules: [{
                required: true, message: '与上一次密码不一致'
              }, {
                validator: checkPassword
              }]
            })(
              <Input type='password' />,
            )}
          </FormItem>
          <FormItem
            label='验证码'
          >
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [{required: true, message: '请输入你获取到的验证码'}]
                })(
                  <Input size='large' />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size='large' disabled={counter}
                  onClick={counterStart}>
                  {counter ? (
                    <CountUp
                      start={60}
                      end={0}
                      useEasing={false}
                      duration={60}
                    />
                  ) : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <Button type='primary' size='large' onClick={handleOk} loading={loading}>
            注册
          </Button>

        </Form>
      </div>
    </div>
  )
}

export default connect(({login}) => ({login}))(Form.create()(Register))
