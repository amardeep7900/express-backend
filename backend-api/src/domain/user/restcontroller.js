const express = require("express");
const asynchandler = require("../../infra/utlis/asynchandler");
const Apperror = require("../../infra/utlis/apperror");

const Post = require("../../infra/model/schema/Post");

exports.getall = asynchandler(async (req, res, next) => {
  const all = await Post.find();
  res.json(all);
});

exports.createuser = asynchandler(async (req, res, next) => {
  const create = new Post({
    title: req.body.title,
    name: req.body.name,
    age: req.body.age,
  });
  const savedpost = await create.save();
  res.json(savedpost);
});

exports.getuser = asynchandler(async (req, res, next) => {
  const getone = await Post.findById(req.params.postId);
  if (!getone) {
    return next(new Apperror("not found details of this id", 404));
  }
  res.json({ status: "success", data: getone });
});
exports.delete = asynchandler(async (req, res, next) => {
  const deleted = await Post.remove({ _id: req.params.postId });
  if (!deleted) {
    return next(new Apperror("not find details of this id", 404));
  }
  res.json(deleted);
});

exports.update = asynchandler(async (req, res) => {
  const update = await Post.updateOne(
    { _id: req.params.postId },
    { $set: { title: req.body.title } }
  );
  res.json(update);
});
