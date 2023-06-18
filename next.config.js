/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};




/*
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr"); 
const withImages = require('next-images');


module.exports = withPlugins([
    withSvgr, 
    // your other plugins here
    {
        experimental: {
            serverActions: true
        }
    }
]);

*/

