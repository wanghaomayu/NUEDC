/**
 * Created by out_xu on 17/5/4.
 */

export default {
  mobile: /^1[3|4|5|7|8][0-9]\d{8}$/,
  identifier: /(^1[3|4|5|7|8][0-9]\d{8}$)|(^admin$)/,
  password: /^\w{6,18}$/,
  mail: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  qq: /[1-9][0-9]{4,}/,
  number: /^[0-9]\d*$/,
  age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
  height: /^[0-2][0-9]{2}$/,
  chinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
  stuId: /^\d{7}$/,
  postCode: /^\d{6}$/,
  ID: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
}
