const getters = {
  accessToken: state => state.user.accessToken,
  loginName: state => state.user.loginName,
  mobile: state => state.user.mobile,
  userId: state => state.user.userId,
  bindCard: state => state.user.bindCard,
  bindAddress: state => state.user.bindAddress,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  goldPrice: state => state.user.goldPrice
}
export default getters
