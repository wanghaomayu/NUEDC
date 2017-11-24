/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Card, Col, Collapse, Dropdown, Form, Icon, Menu, Modal, Row, Table, Tag, Tooltip } from 'antd'
import { routerRedux } from 'dva/router'
import './index.less'
import { connect } from 'dva'
import { color, newDate, urlEncode } from '../../../utils'

const Panel = Collapse.Panel
const ContestManage = ({app, studentContest, dispatch}) => {
  const {modal = false, modalContent = {}, table, alert, tableSignUp = [], tableSchoolAdmins = []} = studentContest
  const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0
  }
  const SignUpContest = (item) => {
    const {id: contest_id, title, signed} = item
    dispatch(routerRedux.push(`/student/signup?` + urlEncode({contest_id, title, signed})))
  }

  const selectProblem = (item) => {
    const {id: contest_id} = item
    dispatch(routerRedux.push(`/student/problem?` + urlEncode({contest_id})))
  }

  const onMenuClick = (key, record) => {
    const status = [{
      color: color.blue,
      value: '自动'
    }, {
      color: color.red,
      value: '关闭'
    }, {
      color: color.blue,
      value: '开启'
    }]
    switch (key) {
      case 'contestInfo':
        Modal.info({
          title: record.title,
          content: (
            <div>
              <span>
            报名状态：
            <Tag color={status[record.can_register + 1].color}>{status[record.can_register + 1].value}</Tag>
                {record.can_register === -1 && (
                  <Tooltip
                    placement='right'
                    title='自动表示按时间开启关闭'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                )}
                <p> 开始时间：{record.register_start_time} </p>
                <p> 结束时间：{record.register_end_time}</p>
              </span>
              <br />

              <span>选题状态：<Tag
                color={status[record.can_select_problem + 1].color}>{status[record.can_select_problem + 1].value}</Tag>
                {record.can_select_problem === -1 && (
                  <Tooltip
                    placement='right'
                    title='自动表示按时间开启关闭'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                )}
                <p> 开始时间：{record.problem_start_time} </p>
                <p> 结束时间：{record.problem_end_time}</p>
              </span>
              <br />
              <span>成绩状态：<Tag
                color={record.result_check === '已公布' ? color.blue : color.red}>{record.result_check}</Tag>
              </span>
            </div>
          ),
          onOk () {}
        })
        break
      case 'schoolAdmin':
        Modal.info({
          title: app.user.school_name,
          content: (
            <Table
              columns={[{
                title: '#',
                dataIndex: 'fakeId'
              }, {
                title: '姓名',
                dataIndex: 'name'
              }, {
                title: '联系方式',
                dataIndex: 'mobile'
              }]}
              dataSource={tableSchoolAdmins}
              size='small'
              rowKey={record => record.id}
              pagination={false}
            />
          ),
          onOk () {}
        })
        break
      default:
        break
    }
  }

  return (
    <div className='contest'>
      <Collapse bordered={false} defaultActiveKey={['signUp', 'canRegister']}>
        <Panel header='可报名竞赛' key='canRegister' style={customPanelStyle}>
          {table.length === 0 && (<span>暂无可报名的竞赛</span>)}
          <Row type='flex' gutter={12}>
            {table.map(item => {
              let extra
              if (item.signed) {
                extra = (<Tag color={color.green} onClick={() => SignUpContest(item)}>修改报名信息</Tag>)
              } else {
                if (item.can_register === 1) {
                  extra = (<Tag color={color.blue} onClick={() => SignUpContest(item)}>点击报名本竞赛</Tag>)
                } else if (item.can_register === -1) {
                  if (newDate(item.register_start_time) > Date.now()) {
                    extra = (<Tag>报名尚未开始</Tag>)
                  } else if (newDate(item.register_end_time) > Date.now()) {
                    extra = (<Tag color={color.blue} onClick={() => SignUpContest(item)}>点击报名本竞赛</Tag>)
                  } else {
                    extra = (<Tag disabled>报名已结束</Tag>)
                  }
                } else {
                  extra = (<Tag disabled>报名已关闭</Tag>)
                }
              }
              return (
                <Col
                  xs={{span: 24}} sm={{span: 12}} xl={{span: 8}}
                  key={'can-register-' + item.id} className='contest-item'
                >
                  <Card
                    title={<div className='contest-card-title'>{item.title}</div>}
                    extra={(
                      <a className='ant-dropdown-link' onClick={() => onMenuClick('contestInfo', item)}>
                        更多<Icon type='right' />
                      </a>
                    )}
                  >
                    <div className='contest-item-content'>
                      <p>{item.description}</p>
                    </div>
                    <div className='contest-item-footer'>
                      {extra}
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Panel>
        <Panel header='已报名竞赛' key='signUp' style={customPanelStyle}>
          {tableSignUp.length === 0 && (<span>暂未报名竞赛</span>)}
          <Row type='flex' gutter={12}>
            {tableSignUp.map(item => {
              let extra
              if (item.signUpStatus === '未审核') {
                extra = (<Tag color={color.red}>等待学校管理员审核中</Tag>)
              } else if (item.can_select_problem === 1) {
                extra = (<Tag color={color.blue} onClick={() => selectProblem(item)}>点击进行选题</Tag>)
              } else if (item.can_select_problem === -1) {
                if (newDate(item.problem_start_time) > Date.now()) {
                  extra = (<Tag>选题尚未开始</Tag>)
                } else if (newDate(item.problem_end_time) > Date.now()) {
                  extra = (<Tag color={color.blue} onClick={() => selectProblem(item)}>点击进行选题</Tag>)
                } else {
                  extra = (<Tag disabled>选题已结束</Tag>)
                }
              } else {
                extra = (<Tag disabled>选题已关闭</Tag>)
              }
              const {team_code = false} = item
              return (
                <Col xs={{span: 24}} sm={{span: 12}} xl={{span: 8}} key={'sign-up-' + item.id} className='contest-item'>
                  <Card
                    title={<div className='contest-card-title'>{item.title}</div>}
                    extra={
                      <Dropdown overlay={
                        <Menu onClick={({key}) => onMenuClick(key, item)}>
                          <Menu.Item key='contestInfo'>查看竞赛详情</Menu.Item>
                          <Menu.Item key='schoolAdmin'>查看本校管理员</Menu.Item>
                        </Menu>
                      }>
                        <a className='ant-dropdown-link'>
                          更多<Icon type='down' />
                        </a>
                      </Dropdown>
                    }
                  >
                    <div className='contest-item-content'>
                      <p>{item.description}</p>
                    </div>
                    <div className='contest-item-footer'>
                      {extra}
                      {!item.team_code ? '' : (
                        <Tooltip placement='top' title='提交作品时需要填写的编号'>
                          <Tag color={color.red}>队伍编号：{item.team_code}</Tag>
                        </Tooltip>
                      )}
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Panel>
      </Collapse>
    </div>
  )
}

export default connect(({app, loading, studentContest}) => ({
  app,
  loading,
  studentContest
}))(Form.create()(ContestManage))
