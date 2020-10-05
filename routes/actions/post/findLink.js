// 用户模块
const { Post, validatePost } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 查询用户信息
	const posts = await Post.find().select('-content -meta');
	// 响应
	res.send(posts);
}