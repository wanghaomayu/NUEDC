/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Col, Form, Icon, Row, Select, Tooltip } from 'antd'
import './index.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

const StudentScoreManage = ({studentScore, dispatch, location}) => {
  const {table, contest = []} = studentScore
  const {query} = location
  const columns = [
    {title: '竞赛名称', dataIndex: 'contestTitle', key: 'contestTitle', width: 250},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 250},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {
      title: (
        <Tooltip title='空白代表未选题'>
          <span> 所选题目 <Icon type='question-circle-o' /></span>
        </Tooltip>
      ),
      dataIndex: 'problemTitle',
      key: 'problem_selected',
      width: 250
    },
    {title: '备注', dataIndex: 'onsite_info', key: 'onsite_info', width: 300},
    {title: '获得奖项', dataIndex: 'result', key: 'result', width: 100, fixed: 'right'}
  ]
  return (
    <div className='student-score'>
      <div className='student-score-header'>
        <div className='student-score-select'>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='竞赛名称'
            onChange={(value) => {
              dispatch(routerRedux.push(`/student/score?contest_id=` + value))
            }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={query.contest_id || undefined}
          >
            {contest.map(item => (
              <Select.Option key={'' + item.id} value={'' + item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {
        query.contest_id === 'none' ? (
          <Alert
            message={(<span>请在下拉选单中选择竞赛</span>)}
            description={(<Link to='/student'> 如果您尚未参加过任何比赛</Link>)}
            showIcon
          />
        ) : (
          table.length > 0 ? (
            <div>
              <Alert
                message={(
                  <span>
                    <p> “<strong>{table[0].contestTitle}</strong>” 竞赛获奖情况为：<strong>{table[0].result ? table[0].result : '未获奖'}</strong></p>
                  </span>
                )}
                description={(
                  <Row className='student-score-description' type={'flex'}>
                    <Col  span={12}> 队伍名称：{table[0].team_name}</Col>

                    <Col span={12}> 队长电话：{table[0].contact_mobile}</Col>

                    <Col span={12}> 队长姓名：{table[0].member1}</Col>

                    <Col span={12}> 队员姓名：{table[0].member2}</Col>

                    <Col span={12}> 队员姓名：{table[0].member3}</Col>

                    <Col span={12}> 指导老师：{table[0].teacher}</Col>

                    <Col span={24}>所选题目： {table[0].problemTitle || '未选题'}</Col>

                    <Col span={24}>备注说明： {table[0].onsite_info || '无'}</Col>
                  </Row>
                )}
                showIcon
              />
            </div>
          ) : (
            <Alert
              message={(<span>比赛进行中</span>)}
              description='竞赛成绩还未发布，请耐心等待'
              showIcon
            />
          )
        )
      }
    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentScoreManage))
