/**
 * Created by out_xu on 16/12/20.
 */
import { message } from 'antd'

const codeMap = {
  // all
  10001: '表单认证错误',
  10002: '手机号不合法',
  5000: '未知错误',
  // 用户'
  // 10001: '密码错误',
  // 10002: '用户不存在',
  // 10003: '手机号已注册',
  // 10004: '手机号不合法',
  // 10005: '性别不合法',
  // 10006: '用户已存在',
  // 授权
  20001: '用户不存在',
  20002: '密码错误',
  20003: '手机号已被注册，请更换手机号后尝试',
  20004: '权限不足,需要登录',
  20005: '登录过期',
  20006: '用户未激活',
  // 权限
  30001: '权限不存在',
  30002: '角色不存在',
  30003: '角色已存在',
  30004: '权限不足',
  30005: '权限已存在',
  30006: '权限不合法',
  // 学校
  40001: '该学校符合条件的队伍不存在',
  40002: '符合条件的学校队伍获奖信息不存在',
  40003: '学校不存在',
  // 验证码
  50001: '验证码错误',
  50002: '验证码超时',
  50003: '验证码发送失败',
  // Excel
  60001: '文件存储失败',
  60002: '导出失败',
  // 信息类
  70001: '新闻或通知不存在',
  // 竞赛

  80001: '竞赛报名关闭或者未开始',
  80002: '竞赛不存在',
  80003: '竞赛报名审核已通过，不能修改队伍信息',
  80004: '竞赛未开始，不能查看题目',
  80005: '报名未通过审核，无权执行此操作',
  80006: '竞赛关闭，不能选题',
  80007: '题目不存在',
  80008: '没有你的队伍注册信息',
  80009: '选题关闭或者未开始选题',
  80010: '比赛结果尚未公布',
  // 题目
  90001: '题目不存在'
}

export default (code) => {
  if (codeMap[code]) {
    message.error(codeMap[code])
  } else {
    message.error('未知错误')
  }
}
