'use strict';

/**
 * Module dependencies
 */
var acl = require('acl')
const { USERS } = require('../constant/index');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Permissions
 */
acl.allow([{
    roles: [USERS.ROLE.ADMIN],
    allows: [{
        resources: '/apis/users/',
        permissions: '*'
    }, {
        resources: '/apis/users/paging',
        permissions: '*'
    }, {
        resources: '/apis/users/delete',
        permissions: '*'
    }, {
        resources: '/apis/books/',
        permissions: '*'
    }, {
        resources: '/apis/books/:_id',
        permissions: '*'
    }, {
        resources: '/apis/books/findById',
        permissions: '*'
    }, {
        resources: '/apis/books/delete',
        permissions: '*'
    }, {
        resources: '/apis/books/search',
        permissions: '*'
    }, {
        resources: '/apis/books/paging',
        permissions: '*'
    }, {
        resources: '/apis/categories/',
        permissions: '*'
    }, {
        resources: '/apis/categories/delete',
        permissions: '*'
    }]
}, {
    roles: [USERS.ROLE.CONTRIBUTOR],
    allows: [{
        resources: '/apis/books/',
        permissions: '*'
    }, {
        resources: '/apis/users/',
        permissions: ['get']
    }]
}]);

module.exports = acl;