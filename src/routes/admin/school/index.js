/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Table, Upload } from 'antd'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import './index.less'
import { API, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
import FormItemRender from '../../../components/FormItemRender/'
import { commonConfig, createConfig, editConfig } from './formConfig'

const {confirm} = Modal

const SchoolManage = ({location, adminSchool, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, content = [], table, tableSize, tableCount, tablePage, alert, schoolId} = adminSchool
  const {query} = location
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'adminSchool/updateModalContent', payload: {}})
    dispatch({type: 'adminSchool/showModal', payload: 'create'})
  }
  const props = {
    name: 'file',
    action: API.adminSchoolImport,
    headers: {
      token: window.localStorage.getItem('nuedcToken')
    },
    onChange (info) {
      const {response = {}} = info.file
      const {code = 1, data = []} = response
      if (code === 0) {
        const {fail = []} = data
        if (fail.length) {
          dispatch({type: 'adminSchool/saveExcelFail', payload: fail})
        } else {
          dispatch({type: 'adminSchool/saveExcelFail', payload: []})
          message.success(`文件上传成功`)
        }
        dispatch({type: 'adminSchool/showAlert'})
        dispatch({type: 'adminSchool/fetchTable', payload: query})
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}文件上传失败，稍后再试。`)
      }
    },
    data: (file) => { // 支持自定义保存文件名、扩展名支持
      console.log('uploadProps data', file)
    }
  }
  const getExcel = () => {
    dispatch({type: 'adminSchool/downloadExcel'})
  }
  const gotoAdmin = (record) => {
    confirm({
      title: '跳转确认',
      content: `您确定要跳转到 ${record.name} 的管理员列表吗？`,
      onOk () {
        const {id, name, level, principal, principal_mobile} = record
        const payload = {
          school_id: id,
          school_name: name,
          school_level: level,
          status: '1',
          name: principal,
          mobile: principal_mobile,
          from: 'school'
        }
        dispatch(routerRedux.push(`/admin/schoolAdmin?school_id=${record.id}`))
        dispatch({type: 'adminSchoolAdmin/updateModalContent', payload: payload})
      },
      onCancel () {}
    })
  }
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'adminSchool/updateModalContent', payload: record})
        dispatch({type: 'adminSchool/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除学校 ${record.name} 的记录吗？`,
          onOk () { dispatch({type: 'adminSchool/delete', payload: record}) },
          onCancel () {}
        })
        break
      case 'gotoAdmin':
        gotoAdmin(record)
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
      const {post_code, principal, principal_mobile, address, name = '', level = ''} = values
      let payload = modal === 'create' ? values : {post_code, principal, principal_mobile, address, name, level}
      dispatch({type: `adminSchool/${modal === 'edit' ? 'update' : 'create'}`, payload: payload})
    })
  }
  const columns = [
    {title: '序号', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '学校名称', dataIndex: 'name', key: 'name', width: 200},
    {title: '学校等级', dataIndex: 'level', key: 'level', width: 80},
    {title: '学校负责人', dataIndex: 'principal', key: 'principal', width: 110},
    {title: '负责人联系方式', dataIndex: 'principal_mobile', key: 'principal_mobile', width: 150},
    {title: '学校通信地址', dataIndex: 'address', key: 'address'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑学校'
            }, {
              key: 'gotoAdmin', name: '查看管理'
            }, {
              key: 'delete', name: '删除学校'
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
      dispatch(routerRedux.push(`/admin/school?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/school?page=${current}&size=${tableSize}`))
    }
  }

  return (
    <div className='school'>
      <div className='school-header'>
        <Button type='primary' onClick={onCreateClick}>添加单个学校</Button>
        <div>
          <Button type='primary' onClick={getExcel} style={{marginRight: 10}}>获取导入模板</Button>
          <Upload {...props}>
            <Button>
              <Icon type='upload' /> 导入Excel
            </Button>
          </Upload>
        </div>
      </div>
      {alert && (content.length > 0 ? ((
          <Alert
            message={(<span>以下学校导入失败（学校名与已有学校重复）,请修改后再导入以下学校</span>)}
            description={(content.map((item, index) => <div key={index}><span>队伍名称:{item[0]}</span>
            </div>))}
            type='error'
            showIcon
          />
        )) : (
          <Alert
            message={(<span>学校添加成功，可进行下一步操作</span>)}
            description={(
              <Link to={`/admin/schoolAdmin?` + urlEncode({school_id: schoolId || undefined})}>
                点此为该学校添加管理员
              </Link>
            )}
            type='success'
            closable
            showIcon
          />
        )

      )}
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1000, y: window.screen.availHeight - 350}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑学校信息' : '添加学校'}`}
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'adminSchool/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {modal === 'create' && createConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {commonConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, adminSchool}) => ({app, loading, adminSchool}))(Form.create()(SchoolManage))
