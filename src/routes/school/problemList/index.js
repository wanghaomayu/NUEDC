/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Modal, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/index'
const {confirm} = Modal

const ProblemManage = ({dispatch, location, school, schoolProblem}) => {
  const {query} = location
  const {contest_id = ''} = query
  const {problems = [], table} = schoolProblem
  const {contests, query: initQuery} = school

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'preview':
        confirm({
          title: '预览确认',
          content: `您确定要在新窗口预览 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'schoolProblem/preview', payload: record})
          },
          onCancel () {}
        })
        break
      case 'download':
        confirm({
          title: '下载确认',
          content: `您确定要下载 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'schoolProblem/download', payload: record})
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
    {title: '题目内容', dataIndex: 'content', key: 'status'},
    {
      title: '操作',
      render: (record) => {
        let menuOptions = []
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
        return (
          <DropOption
            menuOptions={menuOptions}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      width: 100,
      key: 'edit'
    }
  ]

  return (
    <div className='problem'>
      <div className='problem-header'>
        <Select
          showSearch
          style={{width: 260}}
          placeholder='选择竞赛'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value) => {
            let newQuery = {
              ...initQuery,
              problem: {...query, contest_id: value}
            }
            dispatch({type: 'studentContest/saveQuery', payload: newQuery})
            dispatch(routerRedux.push(`/student/problem?contest_id=` + value))
          }}
          value={query.contest_id || undefined}
        >
          {contests.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
        <div>

        </div>

      </div>
      {
        contest_id !== 'none' ? (
          problems.length > 0 ? (
            <div>
              <Alert
                message={(<span>题目查看页面</span>)}
                description='规定时间内未完成选题的队伍视为放弃比赛'
                showIcon
              />
              <Table
                columns={columns} bordered
                dataSource={problems}
                pagination={false} rowKey={record => record.id}
                expandedRowRender={record => (
                  <div className='expanded-row'>
                    <span>{record.add_on || '无附加说明'}</span>
                  </div>
                )}
              />
            </div>
          ) : (
            <Alert
              message={(<span>暂无题目，请题目发布后再进行选题</span>)}
              description='赛事管理员暂未添加题目'
              showIcon
            />
          )
        ) : (
          <Alert
            message={(<span>请在下拉选单中选择竞赛</span>)}
            description={(<span>如果您尚未参加过任何比赛，<Link to='/student'> 请点此参赛</Link></span>)}
            showIcon
          />
        )
      }
    </div>
  )
}

export default connect(({schoolProblemList, school, schoolProblem}) => ({
  schoolProblemList,
  school,
  schoolProblem
}))(Form.create()(ProblemManage))
