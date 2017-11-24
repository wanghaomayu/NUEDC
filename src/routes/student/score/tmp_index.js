/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import DropOption from '../../../components/DropOption/'

const StudentProblemManage = ({studentScore, dispatch}) => {
  const {table = []} = studentScore
  console.log(studentScore)
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'view':
        dispatch({type: 'studentScore/view', payload: 'view'})
        break
      case 'download':
        dispatch({type: 'studentScore/download', payload: 'download'})
        break
      default:
        break
    }
  }
  const columns = [
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'name', key: 'name', width: 280},
    {title: '队伍信息', dataIndex: 'info', key: 'info', width: 350},
    {title: '获奖审核状态', dataIndex: 'status', key: 'status', width: 150},
    {title: '结果', dataIndex: 'result', key: 'result', width: 150},
    {title: '审核时间', dataIndex: 'audit_time', key: 'audit_time', width: 250}
  ]

  return (
    <div className='score'>
      <div className='score'>
        {/*<Select*/}
        {/*showSearch*/}
        {/*style={{width: 300}}*/}
        {/*placeholder='选择年份'*/}
        {/*// defaultValue={'' + table[0].id}*/}
        {/*>*/}
        {/*{table.map(item => <Select.Option key={'' + item} value={'' + item.id}>{item.title}</Select.Option>)}*/}
        {/*</Select>*/}
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
        // expandedRowRender={record => (
        //   <div className='expanded-row'>
        //     <span>{record.description}</span>
        //     <span>{record.description}</span>
        //   </div>
        // )}
      />
    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentProblemManage))
