/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Button, Form, Icon, Modal, Select, Table, Tooltip } from 'antd'
import './index.less'
import { Link, routerRedux } from 'dva/router'
import { newDate, urlEncode } from '../../../utils'
import { connect } from 'dva'

const confirm = Modal.confirm

const SchoolProblem = ({location, schoolProblem, dispatch, school, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, failed = [], modalContent, tableCount, alert, status = '未审核', selects, problems} = schoolProblem
  const {query} = location
  const {contests, query: initQuery} = school
  let contest = {
    can_select_problem: +'',
    problem_start_time: +''
  }
  if (query.contest_id !== 'none') {
    const contestArr = contests.map(item => item.id)
    const index = contestArr.indexOf(+query.contest_id)
    if (index !== -1) {
      contest = contests[index]
    }
  }
  const {can_select_problem = +'', problem_start_time = +''} = contest

  const onMenuClick = (key, record) => {
    if (key === 'submit') {
      dispatch({type: 'schoolProblem/updateModalContent', payload: record})
      confirm({
        title: '提交确认',
        content: (
          <span>
            <p>当前提交状态为 {record.problem_submit} ，您确定要登记该参赛队伍作品提交状态为已提交吗？</p>
            <p>提交后无法撤回！</p>
          </span>
        ),
        onOk () {
          dispatch({type: 'schoolProblem/submit', payload: {record, query}})
        },
        onCancel () {}
      })
    } else {
      dispatch({type: 'schoolProblem/updateModalContent', payload: record})
      dispatch({type: 'schoolProblem/showModal', payload: 'edit'})
    }
  }
  const allChecked = () => {
    confirm({
      title: '提交确认',
      content: (
        <span>
          <p>您确定要登记所选中的参赛队伍作品提交状态为已提交吗？</p>
          <p>提交后无法撤回！</p>
        </span>

      ),
      onOk () {
        dispatch({type: 'schoolProblem/submitAll', payload: query})
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
        problem: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'school/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/school/problem?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      let newQuery = {
        ...initQuery,
        problem: {...query, page: current}
      }
      dispatch({type: 'school/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/school/problem?` + urlEncode({...query, page: current})))
    },
    showTotal: () => (
      <div className='joined-teams-check'>
        <span style={{marginRight: 10}}>已选中 {selects.length} 支队伍</span>
        <Button type='primary' onClick={allChecked}>批量提交</Button>
      </div>
    )
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const body = {
        id: modalContent.id,
        problemId: values.problemId
      }
      let payload = {
        body,
        query
      }
      dispatch({type: `schoolProblem/${modal}`, payload: payload})
    })
  }

  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '参赛编号', dataIndex: 'team_code', key: 'team_code', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 200},
    {
      title: (
        <Tooltip title='空白代表未选题'>
          <span> 所选题目 <Icon type='question-circle-o' /></span>
        </Tooltip>
      ),
      dataIndex: 'title',
      key: 'problem_selected',
      width: 250
    },
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 80},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 80},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 80},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 150},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '提交状态', dataIndex: 'problem_submit', key: 'status', width: 80, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <span>
            <a onClick={() => onMenuClick('submit', record)}
              disabled={record.problem_submit === '已提交' || !record.team_code }>
            提交
            </a>
            <span className='ant-divider' />
            <a onClick={() => onMenuClick('edit', record)} disabled={record.problem_submit === '已提交'}>
            修改选题
            </a>
          </span>
        )
      },
      width: 120,
      fixed: 'right',
      key: 'edit'
    }
  ]
  const formItemLayout = {}
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let checks = selectedRows.map((item) => {
        return {
          record_id: item.id,
          problem_submit: '已提交'
        }
      })
      dispatch({type: 'schoolProblem/updateSelects', payload: checks})
    }
  }
  return (
    <div className='joined-teams'>
      <div className='joined-teams-header'>
        <Select
          showSearch
          style={{width: 250, marginRight: 10}}
          placeholder='选择竞赛'
          value={query.contest_id || undefined}
          onChange={(value) => {
            let newQuery = {
              ...initQuery,
              page: undefined,
              size: undefined,
              problem: {
                ...query, contest_id: value
              }
            }
            dispatch({type: 'school/saveQuery', payload: newQuery})
            dispatch(routerRedux.push(`/school/problem?` + urlEncode({
                ...query, contest_id: value
              })))
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
        </Select>
        <span />
      </div>
      <div>
        {
          ((can_select_problem && can_select_problem === 1) || newDate(problem_start_time) < Date.now()) ? (
            <Alert
              message={(
                <span className='joined-teams-header'>
                  <span>登记参赛队伍作品提交现场评审状态</span> 登记截止日期：{contest.submit_end_time || ''}
                </span>)}
              description={(<p>只有确认并登记过队伍作品提交状态的队伍才能被评定成绩，是否确认提交将影响后续的成绩评定及参赛相关问题，请校管理员慎重对待。</p>)}
              showIcon
            />
          ) : (
            <Alert
              message={(<span>登记参赛队伍作品提交尚未开始</span>)}
              description={(<p>只有确认并登记过队伍作品提交状态的队伍才能被评定成绩，是否确认提交将影响后续的成绩评定及参赛相关问题，请校管理员慎重对待。</p>)}
              showIcon
            />
          )
        }

        {alert && (
          <Alert
            message={(<span>以下队伍提交失败（未选题）,请修改选题后再提交以下队伍</span>)}
            description={(failed.map((item, index) => <div key={index}><span>队伍名称:{item}</span>
            </div>))}
            type='error'
            showIcon
          />
        )}
        <Table
          columns={columns} bordered
          dataSource={table} scroll={{x: 1400}}
          rowSelection={rowSelection}
          pagination={pagination} rowKey={record => record.id}
        />
      </div>
      <Modal
        title={modalContent.modalTitle || '编辑队伍选题'}
        visible={!!modal}
        onCancel={() => dispatch({type: 'schoolProblem/hideModal'})}
        onOk={onModalOk}
        key={modal}
      >
        <Form className='form-content'>
          <Form.Item
            label='选择题目'
            {...formItemLayout}
            extra='在选题时间结束前可以修改选题'
          >
            {getFieldDecorator('problemId', {
              rules: [{required: true, message: '请选择题目'}],
              initialValue: (modalContent.problem_selected === -1 ? '' : modalContent.problem_selected) + ''
            })(
              <Select>
                {problems.map((option, i) => (
                  <Select.Option value={option.id + ''} key={option.id}>
                    {option.title}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item
          >
            <Link onClick={() => confirm({
              title: '跳转确认',
              content: `您确定要跳转到竞赛 ${contest.title} 的题目列表吗？`,
              onOk () {
                dispatch({type: 'schoolProblem/hideModal'})
                dispatch(routerRedux.push('/school/problemList?contest_id=' + query.contest_id))
              },
              onCancel () {}
            })}> 点击查看竞赛 {contest.title} 的题目列表</Link>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({schoolProblem, school}) => ({schoolProblem, school}))(Form.create()(SchoolProblem))
