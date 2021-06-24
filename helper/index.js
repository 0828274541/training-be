function getSort(condition) {
    var sort = (condition.sort_direction === '-') ? condition.sort_direction : '';
    return sort + condition.sort_column;
};

function getLimit(condition) {
    return parseInt(condition.limit || 10, 10);
};

export {
    getSort,
    getLimit
};
