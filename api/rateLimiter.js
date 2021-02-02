const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const moment = require('moment');

module.exports = (req, res, next) => {
  redisClient.exists(req.ip, (err, reply) => {
    if (err) {
      console.log('Redis not working...');
      system.exit(0);
    }
    if (reply === 1) {
      // check wifi ip address
      redisClient.get(req.ip, (err, reply) => {
        let data = JSON.parse(reply);
        let currentTime = moment().unix();
        let difference = (currentTime - data.startTime) / 60;
        if (difference >= 1) {
          let body = {
            count: 1,
            startTime: moment().unix(),
          };
          redisClient.set(req.ip, JSON.stringify(body));
          // allow the request
          next();
        }
        // check the number of requests
        if (difference < 1) {
          if (data.count > 10) {
            return res
              .status(429)
              .send('You have exceeded your request limit, try again later.');
          }
          data.count++;
          redisClient.set(req.ip, JSON.stringify(data));
          next();
        }
      });
    } else {
      let body = {
        count: 1,
        startTime: moment().unix(),
      };
      redisClient.set(req.ip, JSON.stringify(body));
      // allow request
      next();
    }
  });
};
