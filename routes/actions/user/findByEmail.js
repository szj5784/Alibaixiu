// 用户模块
const { User } = require('../../../model/User');

module.exports = async (req, res) => {
	// 获取用户id
	const email = req.params['email'];
	// 查询用户信息
	const user = await User.findOne({ email });
	// 响应
	const avatar = user ? user.avatar : '';
	return res.send(avatar);
};