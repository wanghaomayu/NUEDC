import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Select, Table, Tooltip, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import recordConfig from './formConfig'
import { resultCheckConfig } from '../contest/formConfig'
import { API, urlEncode } from '../../../utils'

const RecordingManage = ({location, recording, contest, adminContestRecord, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableCount} = adminContestRecord
  const {table: tableContest = [], query: initQuery} = contest
  const {contestInfo, alert, content = []} = recording
  const {query} = location
  const {table: schools = []} = login
  const {contest_id} = query
  const dataFlag = contest_id && contest_id !== 'none'
  const props = {
    name: 'data',
    action: API.adminContestRecordExcelImport,
    headers: {
      token: window.localStorage.getItem('nuedcToken')
    },
    onChange (info) {
      const {response = {}} = info.file
      const {code = 1, data = []} = response
      if (code === 0) {
        const {fail = []} = data
        if (fail.length) {
          dispatch({type: 'recording/saveExcelFail', payload: fail})
          dispatch({type: 'recording/showAlert'})
        } else {
          dispatch({type: 'recording/saveExcelFail', payload: []})
          message.success(`文件上传成功`)
        }
        dispatch({type: 'adminContestRecord/fetchTable', payload: query})
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败，稍后再试。`)
      }
    },
    data: (file) => { // 支持自定义保存文件名、扩展名支持
      console.log('uploadProps data', file)
    }
  }
  const onClickCheck = () => {
    const payload = {
      ...contestInfo,
      modalTitle: '发布成绩-' + contestInfo.title
    }
    dispatch({type: 'adminContestRecord/updateModalContent', payload: payload})
    dispatch({type: 'adminContestRecord/showModal', payload: 'resultCheck'})
  }
  const getExcel = () => {
    dispatch({type: 'recording/downloadExcel', payload: query})
  }
  const onMenuClick = (record) => {
    record.id = '' + record.id
    record.modalTitle = `修改队伍 ${record.team_name} 的比赛结果`
    dispatch({type: 'adminContestRecord/updateModalContent', payload: record})
    dispatch({type: 'adminContestRecord/showModal', payload: 'edit'})

  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (modal === 'edit') {
          const {result} = values
          const body = {
            results: [
              {
                record_id: modalContent.id,
                result,
                result_info: '已通过'
              }
            ]
          }
          dispatch({type: 'recording/checkRecording', payload: {body, query}})
        } else {
          dispatch({type: `contest/updateModalContent`, payload: contestInfo})
          dispatch({type: `contest/resultCheck`, payload: values})
          dispatch({type: 'adminContestRecord/hideModal'})
          let infoNow = {
            ...contestInfo,
            result_check: values.result_check
          }
          dispatch({type: 'recording/saveContestInfo', payload: infoNow})
        }
      }
    })
  }
  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {
      title: (
        <Tooltip placement='bottom' title='空白代表队伍尚未选题'>
          <span> 参赛编号 <Icon type='question-circle-o' /></span>
        </Tooltip>
      ),
      dataIndex: 'team_code',
      key: 'team_code',
      width: 90
    },
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 80},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 150},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher'},
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
    {title: '提交评审', dataIndex: 'problem_submit', key: 'problem_submit', width: 80, fixed: 'right'},
    {title: '比赛结果', dataIndex: 'result', key: 'result', width: 80, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <a onClick={() => onMenuClick(record)}>
            编辑
          </a>
        )
      },
      width: 100,
      fixed: 'right',
      key: '9'
    }
  ]
  const alertRender = (contestInfo) => {
    return (
      <Alert
        message={(<span>当前竞赛成绩公布情况：{contestInfo.result_check}</span>)}
        description={(<span><a onClick={onClickCheck}>点击修改</a>竞赛公布情况，成绩未公布时，赛事成绩将无法查询</span>)}
        showIcon
      />
    )
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
        recording: {...query, page: current, size: pageSize}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/recording?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      let newQuery = {
        ...initQuery,
        recording: {...query, page: current}
      }
      dispatch({type: 'contest/saveQuery', payload: newQuery})
      dispatch(routerRedux.push(`/admin/recording?` + urlEncode({...query, page: current})))
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
                recording: {
                  ...query,
                  page: undefined,
                  size: undefined,
                  contest_id: value || undefined
                }
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/recording?` + urlEncode({
                    ...query,
                    page: undefined,
                    size: undefined,
                    contest_id: value || undefined
                  }
                )))
            }}
            value={query.contest_id}
          >
            {tableContest.map(item => (
              <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 200}}
            placeholder='学校'
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => {
              let newQuery = {
                ...initQuery,
                recording: {...query, page: undefined, size: undefined, school_id: value || undefined}
              }
              dispatch({type: 'contest/saveQuery', payload: newQuery})
              dispatch(routerRedux.push(`/admin/recording?` + urlEncode({
                  ...query,
                  page: undefined,
                  size: undefined,
                  school_id: value || undefined
                })))
            }}
            allowClear
            value={query.school_id || undefined}
          >
            {schools.map(item => (
              <Select.Option key={'contest-school-' + item.id} value={item.id + ''}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={() => {
            let newQuery = {
              ...initQuery,
              recording: {
                ...query,
                result: undefined,
                school_id: undefined
              }
            }
            dispatch({type: 'contest/saveQuery', payload: newQuery})
            dispatch(routerRedux.push('/admin/recording?' + urlEncode({
                ...query,
                status: undefined,
                result: undefined,
                school_id: undefined
              })))
          }}>
            重置筛选
          </Button>
        </div>
        <div>
          <Tooltip placement='bottom' title='导出模板中的队伍为已确认提交过作品的队伍'>
            <Button type='primary' onClick={getExcel} disabled={!dataFlag} style={{marginRight: 10}}>获取导入模板</Button>
          </Tooltip>
          <Upload {...props}>
            <Button disabled={!dataFlag}>
              <Icon type='upload' /> 导入Excel
            </Button>
          </Upload>
        </div>
      </div>
      {
        contest_id !== 'none' ? (
          table.length > 0 ? (
            <div>
              {(alert && content.length > 0) && (
                <Alert
                  message={(<span>以下队伍成绩导入失败,请修改后再导入以下学校</span>)}
                  description={(content.map((item, index) => <div key={index}><span>队伍名称:{item[0]}</span>
                  </div>))}
                  type='error'
                  showIcon
                />
              )}
              {!alert && alertRender(contestInfo)}
              <Table
                columns={columns} bordered
                dataSource={table} scroll={{x: 1500, y: window.screen.availHeight - 250}}
                pagination={pagination} rowKey={record => record.id}
              />
            </div>
          ) : (
            <Alert
              message={(<span>暂无记录</span>)}
              description='该赛事暂无记录'
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
        title={modalContent.modalTitle}
        visible={!!modal}
        onCancel={() => dispatch({type: 'adminContestRecord/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && recordConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
          {modal === 'resultCheck' && resultCheckConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, adminContestRecord, login, loading, contest, recording}) => ({
  app,
  adminContestRecord,
  loading,
  login,
  recording,
  contest
}))(Form.create()(RecordingManage))
