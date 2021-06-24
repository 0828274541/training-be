'use strict';
/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
/**
 * Book Schema
 */
const bookSchema = new Schema({
  title: { type: String, required: true, default: '123' },
  description: { type: String, required: true },
  author: { type: String, required: true },
  owner: { type: Schema.ObjectId, ref: 'User', required: true },
  cover: { type: String },
});
bookSchema.plugin(paginate);

const BookSchema = mongoose.model('Book', bookSchema);

module.exports = BookSchema;
