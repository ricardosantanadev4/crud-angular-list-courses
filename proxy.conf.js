// sempre que for feito um /api no angular automaticamente vai direcionar para http://localhost:8081/ como fica no mesmo dominido da back-end
const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;