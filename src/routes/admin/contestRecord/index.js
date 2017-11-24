/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Icon, Modal, Select, Table, Tooltip } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig } from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const ContestRecordManage = ({location, adminContestRecord, contest, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminContestRecord
  const {table: tableContest = [], query: initQuery} = contest
  const {table: tableSchool = []} = login
  const {query} = location

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        let {problem_selected} = record
        const payload = {
          ...record,
          problem_selected: problem_selected + ''
        }
        dispatch({type: 'adminContestRecord/updateModalContent', payload: payload})
        dispatch({type: 'adminContestRecord/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.team_name} 队伍记录？`,
          onOk () { dispatch({type: 'adminContestRecord/delete', payload: {query, record}}) },
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
      dispatch({type: 'adminContestRecord/update', payload: {query, values}})
    })
  }
  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {
      title: (
        <Tooltip placement='bottom' title='空白代表队伍尚未选题'>
          <span> 参赛编号 <Icon type='question-circle-o' /> </span>
        </Tooltip>
      ),
      dataIndex: 'team_code',
      key: 'team_code',
      width: 100
    },
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 90},
    {title: '队员1姓名', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2姓名', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3姓名', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 250},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 150},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 200},
    {
      title: (
        <Tooltip title='-1 代表未选题'>
          <span> 选题情况 <Icon type='question-circle-o' /></span>
        </Tooltip>
      ),
      dataIndex: 'title',
      key: 'problem_selected',
      width: 250
    },
    {title: '报名状态', dataIndex: 'status', key: 'status', width: 80},
    {title: '比赛结果', dataIndex: 'result', key: 'result', width: 100},
    // {title: '审核状态', dataIndex: 'result_info', key: 'result_info', width: 100},
    {title: '现场赛附加信息', dataIndex: 'onsite_info', key: 'onsite_info', width: 200},
    {title: '选题时间', dataIndex: 'problem_selected_at', key: 'problem_selected_at', width: 150},
    {title: '评奖时间', dataIndex: 'result_at', key: 'result_at', width: 150},
    {title: '报名时间', dataIndex: 'created_at', key: 'created_at', width: 150},
    {title: '上次编辑时间', dataIndex: 'updated_at', key: 'updated_at', width: 150},
    {title: '提交评审', dataIndex: 'problem_submit', key: 'problem_submit', width: 80, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑'
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
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      let newQuery = {
        ...initQuery,
        contestRecord: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      let newQuery = {
        ...initQuery,
        contestRecord: {...query, page: current}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, page: current})))
    }
  }

  const statusArr = [
    {
      value: '未审核',
      label: '未审核',
      color: color.red
    }, {
      value: '未通过',
      label: '未通过',
      color: color.red
    }, {
      value: '已通过',
      label: '已通过',
      color: color.blue
    }
  ]

  return (
    <div className='contest-record'>
      <div className='contest-record-header'>
        <div>
          <Select
            showSearch
            style={{width: 260}}
            placeholder='选择竞赛'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => {
              let newQuery = {
                ...initQuery,
                contestRecord: {...query, page: undefined, size: undefined, contest_id: value}
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  contest_id: value
                })))
            }}
            value={query.contest_id || undefined}
          >
            {tableContest.map(item => (
              <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 100}}
            placeholder='报名状态'
            onChange={(value) => {
              let newQuery = {
                ...initQuery,
                contestRecord: {...query, page: undefined, size: undefined, status: value || undefined}
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  status: value || undefined
                })))
            }}
            allowClear
            value={query.status || undefined}
          >
            {statusArr.map(item => (
              <Select.Option key={'contest-status-' + item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>

          <Select
            showSearch
            style={{width: 260}}
            placeholder='学校'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => {
              let newQuery = {
                ...initQuery,
                contestRecord: {...query, page: undefined, size: undefined, school_id: value || undefined}
              }
              dispatch({type: 'admin/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  school_id: value || undefined
                })))
            }}
            allowClear
            value={query.school_id || undefined}
          >
            {tableSchool.map(item => (
              <Select.Option key={'contest-school-' + item.id} value={item.id + ''}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={() => {
            let newQuery = {
              ...initQuery,
              contestRecord: {
                contest_id: query.contest_id
              }
            }
            dispatch({type: 'contest/saveQuery', payload: newQuery})
            dispatch(routerRedux.push('/admin/contestRecord?' + urlEncode({
                contest_id: query.contest_id
              })))
          }
          }>重置筛选</Button>

        </div>
        <Button type='primary'
          onClick={() => dispatch({type: 'adminContestRecord/downloadExcel', payload: query})}>
          导出记录
        </Button>
      </div>
      {
        query.contest_id !== 'none' ? (
          table.length > 0 ? (
            <div>
              <Table
                columns={columns} bordered
                dataSource={table} scroll={{x: 2800, y: window.screen.availHeight - 350}}
                pagination={pagination} rowKey={record => record.id}
              />
            </div>
          ) : (
            <Alert
              message={(<span>暂无记录</span>)}
              description='该赛事或当前筛选情况下暂无记录'
              showIcon
            />
          )
        ) : (
          <Alert
            message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
            description={(<span>请先在下拉选单里选择竞赛</span>)}
            showIcon
          />
        )
      }
      <Modal
        title='修改队伍信息'
        visible={modal === 'edit'}
        onCancel={() => dispatch({type: 'adminContestRecord/hideModal'})}
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

export default connect(({app, loading, contest, login, adminContestRecord}) => ({
  app,
  login,
  loading,
  adminContestRecord,
  contest
}))(Form.create()(ContestRecordManage))
