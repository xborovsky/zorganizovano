require('@babel/register')({
	extends: './.babel-rc'
})

const Sitemap = require('react-router-sitemap').default;
const router = require('./src/sitemap-routes').default;

(
    new Sitemap(router)
        .build('http:/zorganizovano.cz')
        .save('./public/sitemap.xml')
);