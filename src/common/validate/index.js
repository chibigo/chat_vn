import Regex from '../regex/index'
export const RULE_INPUT_FROM = {
  required: (val) => {
    return (val && val.length > 0) || 'Vui lòng điền thông tin'
  },
  diffPassword: (val) => {
    const val2 = email.value
    return (val && val === val2) || 'Mật khẩu không khớp'
  },
  short: (val) => {
    return (val && val.length >= 6) || 'Giá trị nhập vào phải lớn hơn 6 ký tự'
  },
  isEmail: (val) => {
    return Regex.isEmail.test(val) || 'Email không đúng định dạng'
  }
}
