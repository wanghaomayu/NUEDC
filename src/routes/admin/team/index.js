/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Modal, Select, Table } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig, passConfig } from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const ContestRecordManage = ({location, teamManage, adminContestRecord, contest, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableCount} = adminContestRecord
  const {table: tableContest = [], query: initQuery} = contest
  const {table: tableSchool = []} = login
  const {query} = location
  const dataFlag = !!JSON.stringify(query.contest_id)
  const {selected = []} = teamManage
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        dispatch({type: 'adminContestRecord/updateModalContent', payload: record})
        dispatch({type: 'adminContestRecord/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.team_name} 队伍信息吗？`,
          onOk () { dispatch({type: 'adminContestRecord/delete', payload: {record, query}}) },
          onCancel () {}
        })
        break
      case 'audit':
        record.status = '' + record.status
        dispatch({type: 'adminContestRecord/updateModalContent', payload: record})
        dispatch({type: 'adminContestRecord/showModal', payload: 'audit'})
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
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '队员1姓名', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2姓名', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3姓名', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 250},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 150},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '报名时间', dataIndex: 'created_at', key: 'created_at', width: 170},
    {title: '上次编辑时间', dataIndex: 'updated_at', key: 'updated_at', width: 170},
    {title: '报名状态', dataIndex: 'status', key: 'status', width: 100, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑队伍'
            }, {
              key: 'audit', name: '审核队伍'
            }, {
              key: 'delete', name: '删除队伍'
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
  const allChecked = () => {
    confirm({
      title: '审核确认',
      content: `您确定要将选中的队伍的审核状态更改为已通过吗？`,
      onOk () {
        dispatch({type: 'teamManage/auditAll', payload: query})
      },
      onCancel () {}
    })
  }
  const pagination = {
    pageSize: +query.size || 50,
    current: +query.page || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      let newQuery = {
        ...initQuery,
        team: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/team?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      let newQuery = {
        ...initQuery,
        team: {...query, page: current}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/team?` + urlEncode({...query, page: current})))
    },
    showTotal: () => (
      <div className='joined-teams-check'>
        <span style={{marginRight: 10}}>已选中{selected.length}个</span>
        <Button type='primary' onClick={allChecked}>批量审核</Button>
      </div>
    )
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
    },
    {
      value: '已通过',
      label: '已通过',
      color: color.blue
    }
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let selected = []
      selectedRows.map((item) => {
        selected.push(item.id)
      })
      dispatch({type: 'teamManage/selectChange', payload: selected})
    }
  }

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
                team: {
                  ...query,
                  page: undefined,
                  size: undefined,
                  contest_id: value || undefined
                }
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/team?` + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  contest_id: value || undefined
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
                team: {
                  ...query,
                  page: undefined,
                  size: undefined,
                  status: value || undefined
                }
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/team?` + urlEncode({
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
                team: {
                  ...query,
                  page: undefined,
                  size: undefined,
                  school_id: value || undefined
                }
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/team?` + urlEncode({
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
        </div>
        <Button
          type='primary'
          onClick={
            () => {
              let newQuery = {
                ...initQuery,
                team: {
                  ...query,
                  page: undefined,
                  size: undefined,
                  status: undefined,
                  result: undefined,
                  school_id: undefined
                }
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push('/admin/team?' + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  status: undefined,
                  result: undefined,
                  school_id: undefined
                })))
            }
          }>
          重置筛选
        </Button>
      </div>
      {dataFlag ? (
        table.length > 0 ? (
          <Table
            columns={columns} bordered
            rowSelection={rowSelection}
            dataSource={table} scroll={{x: 1900, y: window.screen.availHeight - 350}}
            pagination={pagination} rowKey={record => record.id}
          />
        ) : (
          <Alert
            message={(<span>暂无记录</span>)}
            description='该赛事或该筛选条件下暂无记录'
            showIcon
          />
        )
      ) : (
        <Alert
          message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
          description={(<span>请先在下拉选单里选择竞赛</span>)}
          showIcon
        />
      )}
      <Modal
        title='修改队伍信息'
        visible={modal}
        onCancel={() => dispatch({type: 'adminContestRecord/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {modal === 'audit' && passConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, contest, teamManage, login, adminContestRecord}) => ({
  app,
  login,
  loading,
  adminContestRecord,
  contest,
  teamManage
}))(Form.create()(ContestRecordManage))
