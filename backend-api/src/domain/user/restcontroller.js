const express = require("express");;
const ErrorHandler = require("../../infra/utils/errorHandler");

const Post = require("../../infra/model/schema/Post");

async function getall(req, res, next) {
  const all = await Post.find();
  res.json(all);
}

async function create({title, name, age}) {
  const creates = new Post({ title, name, age });
  return await creates.save();
}

async function getuser(postId) {
  const getone = await Post.findById({ _id: postId });
  if (!getone) {
    return ErrorHandler.throwError({ message: "not found details of this id", code: 404 });
  }
  return { getone };
}
async function deleteted(postId) {
  const deleted = await Post.remove({ _id: postId });
  if (!deleted) {
    return ErrorHandler.throwError({ message: "not find details of this id", code: 404 });
  }
  return { message: "deleted", deleted };
}

async function update(postId, { title }) {
  const updated = await Post.findById({_id:postId});
  if (!updated) {
    return ErrorHandler.throwError({ message: "id not found", code: 400 });
  }

  updated.title = title || updated.title;
  return { updated };
}
module.exports = {
  getall,
  create,
  getuser,
  deleteted,
  update,
};
