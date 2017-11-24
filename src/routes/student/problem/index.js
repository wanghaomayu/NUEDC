/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Modal, Select, Table, Tag } from 'antd'
import './index.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/index'
import { color } from '../../../utils'
const {confirm} = Modal

const ProblemManage = ({dispatch, location, studentContest, studentProblems, form: {validateFieldsAndScroll, getFieldDecorator}}) => {
  const {query} = location
  const {contest_id = ''} = query
  const {tablePass: contestTable = [], query: initQuery} = studentContest
  const {modal, modalContent, problemSelectInfo, table = []} = studentProblems
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'preview':
        confirm({
          title: '预览确认',
          content: `您确定要在新窗口预览 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'studentProblems/preview', payload: record})
          },
          onCancel () {}
        })
        break
      case 'download':
        confirm({
          title: '下载确认',
          content: `您确定要下载 ${record.title} 的附件吗？`,
          onOk () {
            dispatch({type: 'studentProblems/download', payload: record})
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
  const onAddClick = (e) => {
    e.preventDefault()
    dispatch({type: 'studentProblems/updateModalContent', payload: {modalTitle: '选定题目'}})
    dispatch({type: 'studentProblems/showModal', payload: 'add'})
  }

  const onEditClick = (e) => {
    e.preventDefault()
    dispatch({type: 'studentProblems/updateModalContent', payload: {modalTitle: '修改选题'}})
    dispatch({type: 'studentProblems/showModal', payload: 'edit'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {contest_id: contestId} = query
      const {problemId} = values
      const body = {
        contestId,
        problemId
      }
      dispatch({type: 'studentProblems/edit', payload: {body, query}})
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
          {contestTable.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
        <div>
          {problemSelectInfo.problemId === -1 ? (
            <Button type='primary' disabled={table.length === 0} onClick={onAddClick}>确认选题</Button>
          ) : (
            <Button type='primary' disabled={contest_id === 'none' || table.length === 0}
              onClick={onEditClick}>修改选题</Button>
          )}
        </div>

      </div>
      {
        contest_id !== 'none' ? (
          table.length > 0 ? (
            <div>
              <Alert
                message={(
                  <span>{problemSelectInfo.team_code ? (
                    <span>当前选题情况： {problemSelectInfo.title}</span>
                  ) : '请在规定时间内完成选题'}
                  </span>)}
                description={(
                  <span>
                    {problemSelectInfo.team_code ? (
                      <span>
                        <Tag color={color.red}> 队伍编号：{problemSelectInfo.team_code}</Tag>
                        <Tag color={color.blue}> 成绩：{problemSelectInfo.result_check}</Tag>

                      </span>
                    ) : '规定时间内未完成选题的队伍视为放弃比赛'}
                  </span>
                )}
                showIcon
              />
              <Table
                columns={columns} bordered
                dataSource={table}
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
      <Modal
        title={modalContent.modalTitle}
        visible={modal}
        onCancel={() => dispatch({type: 'studentProblems/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          <Form.Item
            label='选择题目'
            {...formItemLayout}
            extra='在选题时间结束前可以修改选题'
          >
            {getFieldDecorator('problemId', {
              rules: [{required: true, message: '请选择题目'}],
              initialValue: (problemSelectInfo.problemId === -1 ? '' : problemSelectInfo.problemId) + ''
            })(
              <Select>
                {table.map((option, i) => (
                  <Select.Option value={option.id + ''} key={option.id}>
                    {option.title}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({studentProblems, studentContest}) => ({
  studentProblems,
  studentContest
}))(Form.create()(ProblemManage))
