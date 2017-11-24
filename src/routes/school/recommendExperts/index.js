/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Table } from 'antd'
import formConfig from './formConfig'
import './index.less'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const RecommendExpertsManage = ({recommendExperts, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {table} = recommendExperts
  const onRecommendClick = e => {
    e.preventDefault()
    dispatch({type: 'recommendExperts/showModal', payload: 'recommend'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'recommendExperts/onFormSubmit', payload: values})
      dispatch({type: 'recommendExperts/recommend', payload: values})
      dispatch({type: 'recommendExperts/hideModal'})
    })
  }

  const columns = [
    {title: '姓名', dataIndex: 'name', key: 'name', width: 150},
    {title: '性别', dataIndex: 'gender', key: 'gender', width: 100},
    {title: '职位', dataIndex: 'position', key: 'position', width: 100},
    {title: '职称', dataIndex: 'title_of_professor', key: 'title_of_professor', width: 100},
    {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 200},
    {title: '备注', dataIndex: 'notes', key: 'notes', width: 300},
    {title: '审核情况', dataIndex: 'status', key: 'status', width: 150, fixed: 'right'},
    {title: '结果', dataIndex: 'result', key: 'result', width: 150, fixed: 'right'}
  ]
  return (
    <div className='recommend-experts'>
      <div className='recommend-experts-header'>
        <Button type='primary' className='recommend-experts-out' onClick={onRecommendClick}>推荐本校专家</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1200}}
        pagination={false} rowKey={record => record.id}
      />
      <Modal
        title={'推荐本校专家'}
        visible={recommendExperts.modal === 'recommend'}
        onCancel={() => dispatch({type: 'recommendExperts/hideModal'})}
        onOk={onModalOk}
        key={recommendExperts.modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, recommendExperts}) => ({app, recommendExperts}))(Form.create()(RecommendExpertsManage))
