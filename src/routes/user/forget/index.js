/**
 * Created by out_xu on 17/7/16.
 */
import React from 'react'
import { connect } from 'dva'
import CountUp from 'react-countup'
import { Button, Col, Form, Input, Row } from 'antd'
import { config, verify } from '../../../utils'
import './index.less'

const FormItem = Form.Item

const Forget = ({login, dispatch, form: {getFieldDecorator, getFieldValue, validateFieldsAndScroll}}) => {
  const {counter, loading} = login
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {newPassword, mobile, code} = values
      const payload = {newPassword, mobile, code}
      dispatch({type: 'login/findPassword', payload: payload})
    })
  }
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }
  const counterStart = (e) => {
    e.preventDefault()
    const data = {
      type: 2,
      mobile: getFieldValue('mobile')
    }
    dispatch({type: 'login/getVerifyCode', payload: data})
    dispatch({type: 'login/counterStart'})
    setTimeout(() => {
      dispatch({type: 'login/counterReset'})
    }, 60000)
  }
  return (
    <div className='register-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name} · 忘记密码</span>
        </div>
        <Form>

          <FormItem hasFeedback label='手机号'>
            {getFieldDecorator('mobile', {
              rules: [{
                pattern: verify.identifier, message: '请输入有效的手机号'
              }, {
                required: true, message: '请输入手机号'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem hasFeedback label='新密码'>
            {getFieldDecorator('newPassword', {
              rules: [{
                pattern: verify.password, message: '请输入有效的密码（6-18位）'
              }, {
                required: true, message: '请输入密码！'
              }]
            })(
              <Input type='password' />
            )}
          </FormItem>
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
              <Input type='password' />
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
                  <Input size='large' onPressEnter={handleOk} />
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
            点击提交
          </Button>

        </Form>
      </div>
    </div>
  )
}

export default connect(({login}) => ({login}))(Form.create()(Forget))
