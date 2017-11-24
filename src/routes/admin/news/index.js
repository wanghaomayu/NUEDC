/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Modal, Table } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig } from './formConfig'
import { urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const NewsManage = ({location, adminNews, contest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminNews
  const {query, pathname} = location
  const {query: initQuery} = contest
  const isNews = pathname === '/admin/news'
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch(routerRedux.push(`/admin/` + ( isNews ? 'news' : 'notices') + '/edit?id=' + record.id))
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除新闻 ${record.title} ？`,
          onOk () { dispatch({type: 'adminNews/delete', payload: record}) },
          onCancel () {}
        })
        break
      case 'preview':
        confirm({
          title: '跳转确认',
          content: `您确定在新窗口预览 ${record.title}？`,
          onOk () { dispatch({type: 'adminNews/preview', payload: {query, record}}) },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'adminNews/update', payload: values})
    })
  }
  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '标题', dataIndex: 'title', key: 'team_name'},
    {title: '创建于', dataIndex: 'created_at', key: 'school_name', width: 170},
    {title: '更新于', dataIndex: 'updated_at', key: 'contest_id', width: 170},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑'
            }, {
              key: 'preview', name: '预览'
            }, {
              key: 'delete', name: '删除'
            }]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 80,
      key: 'edit'
    }
  ]
  const pagination = {
    pageSize: +tableSize || 50,
    current: +tablePage || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      let newQuery = pathname === '/admin/notices' ? {
        ...initQuery,
        notices: {...query, page: current, size: pageSize}
      } : {
        ...initQuery,
        news: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(pathname + '?' + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      let newQuery = pathname === '/admin/notices' ? {
        ...initQuery,
        notices: {...query, page: current, size: pageSize}
      } : {
        ...initQuery,
        news: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(pathname + '?' + urlEncode({...query, page: current})))
    }
  }

  return (
    <div className='news-manage'>
      <div className='news-manage-header'>
        {isNews ? '新闻管理' : '通知管理'}
        <Button
          type='primary'
          onClick={ () => dispatch(routerRedux.push(`/admin/` + ( isNews ? 'news' : 'notices') + '/edit'))}>
          发布{isNews ? '新闻' : '通知'}</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table}
        scroll={{x: 768, y: window.screen.availHeight - 350}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title='修改队伍信息'
        visible={modal === 'edit'}
        onCancel={() => dispatch({type: 'adminNews/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, contest, login, adminNews}) => ({
  app,
  loading,
  adminNews,
  contest
}))(Form.create()(NewsManage))
