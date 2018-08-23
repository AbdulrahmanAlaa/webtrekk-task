let env = {
    baseUrl:`http://localhost:${process.env.PORT || 8080}`
};
switch (process.env.NODE_ENV) {
    case 'development':
        env.databaseUrl = 'mongodb://localhost:27017/webtrekk';
        break;
    default:
        env.databaseUrl = 'mongodb://admin:admin123@ds147180.mlab.com:47180/webtrekk';
        break;
}
module.exports = env