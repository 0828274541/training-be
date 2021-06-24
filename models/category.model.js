'use strict';
/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
/**
 * Category Schema
 */
const categorySchema = new Schema({
  title: { type: String, required: true },
});
categorySchema.plugin(paginate);

mongoose.model('Category', categorySchema).createCollection();

const CategorySchema = mongoose.model('Category', categorySchema);

module.exports = CategorySchema;
