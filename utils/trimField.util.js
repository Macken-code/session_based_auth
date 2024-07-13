const trimField = (obj) => {
    const trimmedObj = {};
    Object.keys(obj).forEach(field => {
        if (typeof obj[field] === 'string') {
            trimmedObj[field] = obj[field].trim();
        } else {
            trimmedObj[field] = obj[field];
        }
    });

    return trimmedObj;
};

module.exports = {trimField};