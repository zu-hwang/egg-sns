const express = require('express');
const router = express.Router();

const models = require('../src/db/models');
const { isLogined } = require('../middleware/accountLogin');

router.post('/create', isLogined, async (req, res, next) => {
  // POST /comment/create
  try {
    if (!req.body || !req.body.content || !req.body.feedId)
      return res.status(400).json({ message: 'requiredEmpty' });
    const loginedUserId = req.loginedUserId;
    const { content, feedId } = req.body;
    const feed = await models.Feed.findOne({ where: { id: feedId } });
    const Author = await models.User.findOne({
      where: { id: loginedUserId },
      attributes: ['id', 'userName'],
    });
    const newComment = await models.Comment.create({
      content,
      authorId: loginedUserId,
      feedId: feedId,
    }).then((result) => {
      return {
        id: result.id,
        Author,
        content: result.content,
        createdAt: result.createdAt,
        CommentLike: [],
      };
    });
    return res.status(200).json({ message: 'success', newComment });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.delete('/:feedId/:commentId', isLogined, async (req, res, next) => {
  // DELETE /comment/123/2
  try {
    // 쿼리파라미터
    console.log(req.params);
    if (!req.params || !req.params.feedId || !req.params.commentId)
      return res.status(400).json({ message: 'requiredEmpty' });
    const loginedUserId = req.loginedUserId;
    const feedId = parseInt(req.params.feedId);
    const commentId = parseInt(req.params.commentId);
    console.log({ loginedUserId, feedId, commentId });
    const comment = await models.Comment.destroy({
      where: { id: commentId, feedId: feedId, authorId: loginedUserId },
    });
    if (!comment) return res.status(403).json({ message: 'noPermission' });
    return res.status(200).json({ message: 'success', feedId, commentId });
  } catch (error) {
    console.log(error);
    next();
  }
});
// "id": 14,
// "content": "😛날씨 오지궁",
// "createdAt": "2020-09-14 15:36:02",
// "updatedAt": "2020-09-16 03:37:54",
// "AuthorId": 6,
// "feedId": 185,
// "authorId": 6

router.post('/update', isLogined, async (req, res, next) => {
  // POST /update
  try {
    if (!req.body || !req.body.content || !req.body.commentId)
      return res.status(400).json({ message: 'requiredEmpty' });
    let feedId = 0;
    const loginedUserId = req.loginedUserId;
    const { content, commentId } = req.body;
    const where = { id: commentId, authorId: loginedUserId };
    const result = await models.Comment.update({ content }, { where });
    const updatedComment = await models.Comment.findOne({
      where,
      include: [
        { model: models.User, as: 'Author', attributes: ['id', 'userName'] },
      ],
    }).then((result) => {
      feedId = result.feedId;
      return {
        id: result.id,
        Author: result.Author,
        content: result.content,
        createdAt: result.createdAt,
        CommentLike: [],
      };
    });
    console.log({ result });
    if (!result[0]) return res.status(403).json({ message: 'feilure' });
    return res.status(200).json({ message: 'success', feedId, updatedComment });
  } catch (error) {
    console.log(error);
    next();
  }
});
module.exports = router;
