const express = require('express');
const { isLogined } = require('../middleware/accountLogin');
const models = require('../src/db/models');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize').Sequelize;

const router = express.Router();
router.get('/feed', isLogined, async (req, res, next) => {
  return res.status(400).json({ message: 'API 확인바람' });
});

router.get('/feed/:feedId', isLogined, async (req, res, next) => {
  try {
    /**
     * ! GET
     * @params feedId
     */

    const targetFeedId = parseInt(req.params.feedId, 10) || null;
    const loginedUserId = req.loginedUserId;
    console.log('좋아용~', { targetFeedId, loginedUserId });
    if (!targetFeedId)
      return res.status(400).json({ message: 'invalidRequest' });
    const liker = await models.User.findOne({ where: { id: loginedUserId } });
    if (!liker) return res.status(403).json({ message: 'noPermission' });
    const feed = await models.Feed.findOne({ where: { id: targetFeedId } });
    await feed.addFeedLike(liker);
    if (!feed) return res.status(403).json({ message: 'notExistFeed ' });
    const result = await models.UserFeed.findOne({
      where: { feedId: targetFeedId, userId: loginedUserId },
      attributes: ['id', 'userId'],
    });
    if (!result) return res.status(400).json({ message: 'failure' });
    return res.status(200).json({
      message: 'success',
      result,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.delete('/feed/:feedId', isLogined, async (req, res, next) => {
  try {
    /**
     * ! DELETE
     * @params feedId
     */

    console.log('잉ㅇ?ㅇ??');
    const targetFeedId = parseInt(req.params.feedId, 10) || null;
    const loginedUserId = req.loginedUserId;
    if (!targetFeedId)
      return res.status(400).json({ message: 'invalidRequest' });
    const liker = await models.User.findOne({ where: { id: loginedUserId } });
    if (!liker) return res.status(403).json({ message: 'noPermission' });
    const feed = await models.Feed.findOne({ where: { id: targetFeedId } });
    if (!feed) return res.status(403).json({ message: 'notExistFeed ' });
    const result = await models.UserFeed.destroy({
      where: { feedId: targetFeedId, userId: loginedUserId },
    });
    if (!result) return res.status(400).json({ message: 'failure' });
    return res.status(200).json({
      message: 'success',
      userId: loginedUserId,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get('/comment', isLogined, async (req, res, next) => {
  try {
    /**
     * ! GET
     * ? /like/comment?id=33&feedId=180
     * @query id commentId
     * @query feedId
     */

    const targetCommentId = parseInt(req.query.id, 10) || null;
    const loginedUserId = req.loginedUserId;
    if (!targetCommentId)
      return res.status(400).json({ message: 'invalidRequest' });
    const liker = await models.User.findOne({ where: { id: loginedUserId } });
    if (!liker) return res.status(403).json({ message: 'noPermission' });
    const feed = await models.Feed.findOne({ where: { id: targetCommentId } });
    await feed.addFeedLike(liker);
    if (!feed) return res.status(403).json({ message: 'notExistFeed ' });
    const result = await models.UserFeed.findOne({
      where: { commentId: targetCommentId, userId: loginedUserId },
      attributes: ['id', 'userId'],
    });
    if (!result) return res.status(400).json({ message: 'failure' });
    return res.status(200).json({
      message: 'success',
      result,
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

router.delete('/comment', isLogined, async (req, res, next) => {
  try {
    /**
     * ! DELETE
     * ? /like/comment?commentId=33&feedId=180
     * @query commentId
     * @query feedId
     */
    console.log('잉ㅇ?ㅇ??');
    const targetCommentId = parseInt(req.params.commentId, 10) || null;
    const loginedUserId = req.loginedUserId;
    if (!targetCommentId)
      return res.status(400).json({ message: 'invalidRequest' });
    const liker = await models.User.findOne({ where: { id: loginedUserId } });
    if (!liker) return res.status(403).json({ message: 'noPermission' });
    const feed = await models.Feed.findOne({
      where: { id: targetCommentId },
    });
    if (!feed) return res.status(403).json({ message: 'notExistFeed ' });
    const result = await models.UserFeed.destroy({
      where: { commentId: targetCommentId, userId: loginedUserId },
    });
    if (!result) return res.status(400).json({ message: 'failure' });
    return res.status(200).json({
      message: 'wip',
    });
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = router;
