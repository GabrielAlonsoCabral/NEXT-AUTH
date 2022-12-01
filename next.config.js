/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
    ],
  },
  reactStrictMode: true,  
  swcMinify: false, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc
  i18n:{
    locales:['pt','en'],
    defaultLocale:'pt',
    localeDetection:true    
  }
};
