/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Icon, Modal, Select, Table, Upload } from 'antd'
import './index.less'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { commonConfig, extra } from './formConfig'
import { API } from '../../../utils'
import DropOption from '../../../components/DropOption/index'
const {confirm} = Modal

const ProblemManage = ({app, dispatch, contest, location, adminProblems, form: {validateFieldsAndScroll, getFieldDecorator}}) => {
  const {query} = location
  const {contest_id = ''} = query
  const {modal, modalContent, table = []} = adminProblems
  const {table: contestTable = []} = contest
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        dispatch({
          type: 'adminProblems/updateModalContent', payload: {
            ...record,
            modalTitle: '编辑竞赛题目'
          }
        })
        dispatch({type: 'adminProblems/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.title} 吗？`,
          onOk () { dispatch({type: 'adminProblems/delete', payload: {query, record}}) },
          onCancel () {}
        })
        break
      case 'preview':
        confirm({
          title: '预览确认',
          content: `您确定要在新窗口预览 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'adminProblems/preview', payload: record})
          },
          onCancel () {}
        })
        break
      case 'download':
        confirm({
          title: '下载确认',
          content: `您确定要下载 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'adminProblems/download', payload: record})
          },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '题目标题', dataIndex: 'title', key: 'title', width: 250},
    {title: '题目内容', dataIndex: 'content', key: 'content'},
    {
      title: '操作',
      render: (record) => {
        let menuOptions = [{key: 'edit', name: '编辑题目'}]
        if (record.attach_path) {
          menuOptions = [
            ...menuOptions,
            {
              key: 'preview', name: '附件预览'
            }, {
              key: 'download', name: '附件下载'
            }
          ]
        } else {
          menuOptions = [
            ...menuOptions,
            {
              key: 'none', name: '无附件'
            }
          ]
        }
        menuOptions = [
          ...menuOptions,
          {
            key: 'delete', name: '删除题目'
          }
        ]
        return (
          <DropOption
            menuOptions={menuOptions}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      width: 80,
      key: 'edit'
    }
  ]
  const onAddClick = (e) => {
    e.preventDefault()
    dispatch({type: 'adminProblems/updateModalContent', payload: {modalTitle: '添加竞赛题目'}})
    dispatch({type: 'adminProblems/showModal', payload: 'add'})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {title, content, add_on = '', upload} = values
      const body = {
        title, content, add_on, contest_id,
      }
      if (upload) {
        body.attach_path = upload[0].response.data.path
      }
      if (modal === 'edit') {
        dispatch({type: 'adminProblems/edit', payload: {body, query}})
      } else if (modal === 'add') {
        dispatch({type: 'adminProblems/add', payload: {body, query}})
      }
    })
  }
  const normFile = (e) => {
    return e && e.fileList
  }
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16}
    }
  }
  return (
    <div className='problem'>
      <div className='problem-header'>
        <Select
          showSearch
          style={{width: 260}}
          placeholder='选择竞赛'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value) => {
            dispatch(routerRedux.push(`/admin/problem?contest_id=` + value))
          }}
          value={query.contest_id || undefined}
        >
          {contestTable.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
        <Button type='primary' disabled={contest_id.length < 1} onClick={onAddClick}>添加题目</Button>
      </div>
      {
        contest_id !== 'none' ? (
          table.length > 0 ? (
            <Table
              columns={columns} bordered
              dataSource={table}
              pagination={false} rowKey={record => record.id}
              expandedRowRender={record => (
                <div className='expanded-row'>
                  <span>{record.add_on}</span>
                </div>
              )}
            />
          ) : (
            <Alert
              message={(<span>暂无题目，请添加</span>)}
              description='请点击右上角按钮添加题目'
              showIcon
            />
          )) : (
          <Alert
            message={(<span>暂无记录</span>)}
            description={(<span>请前往赛事管理中添加竞赛</span>)}
            showIcon
          />
        )
      }

      <Modal
        title={modalContent.modalTitle}
        visible={modal}
        onCancel={() => dispatch({type: 'adminProblems/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal && commonConfig.map(config => FormItemRender(config, getFieldDecorator, {
            initialValue: modalContent[config.value] || '' + ''
          }))}
          <Form.Item
            {...formItemLayout}
            label='附件上传'
            extra={
              modal === 'edit' ? '如果不需要更改附件，请勿上传文件' : '用于上传题目相关的附件或者pdf，一道题仅能上传一个附件，请勿上传多个'
            }
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile
            })(
              <Upload
                name='upload' action={API.uploadPrivateFile}
                accept='.pdf'
                headers={{'token': window.localStorage.getItem('nuedcToken')}}
              >
                <Button>
                  <Icon type='upload' /> 点击上传附件
                </Button>
              </Upload>
            )}
          </Form.Item>
          {modal && FormItemRender(extra, getFieldDecorator, {
            initialValue: modalContent[extra.value] || '' + ''
          })}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, contest, adminProblems}) => ({app, contest, adminProblems}))(Form.create()(ProblemManage))
