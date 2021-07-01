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
        resources: '/apis/users/:_id',
        permissions: '*'
    }, {
        resources: '/apis/books/',
        permissions: '*'
    }, {
        resources: '/apis/books/search',
        permissions: '*'
    }, {
        resources: '/apis/categories/',
        permissions: '*'
    }, {
        resources: '/apis/categories/:_id',
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