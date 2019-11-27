const isProd = process.env.NODE_ENV === 'production';
module.exports = {
    env: {
      API_URL : isProd ? 'https://zorganizovano.cz:8081/api' : 'http://localhost:8081/api',
      IMAGE_API_URL : isProd ? 'https://zorganizovano.cz:8082/img-api' : 'http://localhost:8082/img-api'
    },
  }