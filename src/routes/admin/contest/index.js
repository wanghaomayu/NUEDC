/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, DatePicker, Form, Input, Modal, Table, Tag } from 'antd'
import { commonConfig, resultCheckConfig, statusConfig } from './formConfig'
import './index.less'
import { Link, routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
import moment from 'moment'
import { color, urlEncode } from '../../../utils'
const {confirm} = Modal
const ContestManage = ({contest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, alert, contestId} = contest
  const onMenuClick = (key, record) => {
    let payload = {}
    switch (key) {
      case 'update':
        const {
          register_start_time,
          register_end_time,
          problem_start_time,
          problem_end_time,
          submit_end_time
        } = record
        payload = {
          ...record,
          modalTitle: '更新竞赛-' + record.title,
          registerTimes: [
            moment(register_start_time, 'YYYY-MM-DD HH:mm:ss'),
            moment(register_end_time, 'YYYY-MM-DD HH:mm:ss')
          ],
          problemTimes: [
            moment(problem_start_time, 'YYYY-MM-DD HH:mm:ss'),
            moment(problem_end_time, 'YYYY-MM-DD HH:mm:ss')
          ],
          submit_end_time: moment(submit_end_time, 'YYYY-MM-DD HH:mm:ss')
        }
        dispatch({type: 'contest/updateModalContent', payload: payload})
        dispatch({type: 'contest/showModal', payload: 'update'})
        break
      case 'delete':
        confirm({
          title: `删除确认`,
          content: (
            <Input
              type='password' placeholder='请输入你的密码'
              onChange={(e) => dispatch({type: 'contest/onInputChange', payload: e.target.value})}
            />
          ),
          onOk () { dispatch({type: 'contest/delete', payload: record}) },
          onCancel () {}
        })
        break
      case 'gotoProblem':
        confirm({
          title: `跳转确认`,
          content: `你确定要跳转到 ${record.title} 题目列表吗？`,
          onOk () { dispatch(routerRedux.push(`/admin/problem?` + urlEncode({contest_id: record.id}))) },
          onCancel () {}
        })
        break
      case 'status':
        payload = {
          ...record,
          modalTitle: '更新状态-' + record.title
        }
        dispatch({type: 'contest/updateModalContent', payload: payload})
        dispatch({type: 'contest/showModal', payload: 'status'})
        break
      case 'resultCheck':
        payload = {
          ...record,
          modalTitle: '发布成绩-' + record.title
        }
        dispatch({type: 'contest/updateModalContent', payload: payload})
        dispatch({type: 'contest/showModal', payload: 'resultCheck'})
        break
      default:
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'contest/updateModalContent', payload: {modalTitle: '创建竞赛'}})
    dispatch({type: 'contest/showModal', payload: 'create'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        title = '', description = '', add_on = '', registerTimes = [], problemTimes = '', can_register = '',
        can_select_problem = '', submit_end_time = '', prefix = ''
      } = values
      let payload = {}

      if (modal === 'status') {
        payload = {
          can_register: +can_register,
          can_select_problem: +can_select_problem
        }
      } else if (modal === 'resultCheck') {
        payload = values
      } else {
        payload = {
          title: title,
          description,
          add_on,
          prefix,
          register_start_time: registerTimes[0].format('YYYY-MM-DD HH:00:00'),
          register_end_time: registerTimes[1].format('YYYY-MM-DD HH:00:00'),
          problem_start_time: problemTimes[0].format('YYYY-MM-DD HH:00:00'),
          problem_end_time: problemTimes[1].format('YYYY-MM-DD HH:00:00'),
          submit_end_time: submit_end_time.format('YYYY-MM-DD HH:00:00')
        }
      }
      dispatch({type: `contest/${modal}`, payload: payload})
    })
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
  const status = [{
    color: color.green,
    value: '自动'
  }, {
    color: color.red,
    value: '关闭'
  }, {
    color: color.blue,
    value: '开启'
  }]
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '赛事名称', dataIndex: 'title', key: 'title'},
    {
      title: '报名',
      render: record => (
        <Tag color={status[record.can_register + 1].color}>{status[record.can_register + 1].value}</Tag>
      ),
      key: 'can_register',
      width: 50
    }, {
      title: '选题',
      render: record => (
        <Tag color={status[record.can_select_problem + 1].color}>{status[record.can_select_problem + 1].value}</Tag>
      ),
      key: 'can_select_problem',
      width: 50
    }, {
      title: '成绩',
      render: ({result_check}) => (
        <Tag color={result_check === '未公布' ? color.red : color.blue}>{result_check}</Tag>
      ),
      key: 'result_check',
      width: 50
    },
    {title: '参赛编号前缀', dataIndex: 'prefix', key: 'prefix', width: 100},

    {title: '报名开始时间', dataIndex: 'register_start_time', key: 'register_start_time', width: 170},
    {title: '报名结束时间', dataIndex: 'register_end_time', key: 'register_end_time', width: 170},
    {title: '选题开始时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 170},
    {title: '选题结束时间', dataIndex: 'problem_end_time', key: 'problem_end_time', width: 170},
    {title: '作品提交截止时间', dataIndex: 'submit_end_time', key: 'submit_end_time', width: 170},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'update', name: '编辑竞赛'
            }, {
              key: 'status', name: '修改状态'
            }, {
              key: 'gotoProblem', name: '查看题目'
            }, {
              key: 'resultCheck', name: '发布成绩'
            }, {
              key: 'delete', name: '删除竞赛'
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

  return (
    <div className='contest'>

      <div className='contest-header'>
        <span>所有竞赛列表</span>
        <Button type='primary' onClick={onCreateClick}>创建比赛</Button>
      </div>
      {alert && (
        <Alert
          message={(<span>竞赛添加成功，可进行下一步操作</span>)}
          description={(<Link to={'/admin/problem?contest_id=' + contestId}>点此为本次竞赛添加题目</Link>)}
          type='success'
          closable
          showIcon
        />
      )}
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1600}}
        pagination={false} rowKey={record => record.id}
        expandedRowRender={record => (
          <div className='expanded-row'>
            <span>{record.description}</span>
          </div>
        )}
      />
      <Modal
        title={modalContent.modalTitle}
        visible={!!modal}
        onCancel={() => dispatch({type: 'contest/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {
            (modal === 'update' || modal === 'create') && commonConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))
          }
          {(modal === 'update' || modal === 'create') && (
            <Form.Item
              label='提交截止时间'
              {...formItemLayout}
              key='submit_end_time'
              extra='用于控制最后的作品提交确认时间'
            >
              {getFieldDecorator('submit_end_time', {
                rules: [{required: true, message: '请选择'}],
                initialValue: modalContent['submit_end_time']
              })(
                <DatePicker
                  style={{width: '100%'}}
                  showTime={{format: 'HH:00'}}
                  format='YYYY-MM-DD HH:00'
                  renderExtraFooter={() => 'extra footer'}
                />
              )}
            </Form.Item>
          )}
          {modal === 'status' && statusConfig.map(config => FormItemRender(config, getFieldDecorator, {
            initialValue: '' + modalContent[config.value]
          }))}
          {modal === 'resultCheck' && resultCheckConfig.map(config => FormItemRender(config, getFieldDecorator, {
            initialValue: modalContent[config.value] || ''
          }))}
        </Form>
      </Modal>
    </div>
  )
}

// 下面的函数就是connect的参数，大下面的写法只是简洁而已，实际与下面的函数mapStateToProps没啥区别
// function mapStateToProps (app){
//   return {
//     app: state.app
//   }
// }

export default connect(({app, loading, contest}) => ({app, loading, contest}))(Form.create()(ContestManage))
