const path = require('path')

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/_globals.sass'),
      ],
    })
}

module.exports = {
  // 預防build的時候 window is not defined
  configureWebpack: { output: { globalObject: 'this' } },
  // use sass --------------
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    // or if you use scss
    // types.forEach(type => {
    //   addStyleResource(config.module.rule('scss').oneOf(type))
    // })
  },
  // -----------------------
  siteName: 'Gridsome',
  siteDescription: 'A WordPress starter for Gridsome',

  templates: {


    // 這裡能不能自己改:year? 因為路徑會和 WordPressCategory相同格式，第二個是動態參數 他會以為是要去第一個模板page
    WordPressPost: '/thailand/:year/:slug', // :title_raw //adds route for "post" post type (Optional) :year/:month/:day 

    WordPressCategory: '/thailand/:title', // adds route for "category" post type (Optional)

    mdCategory: '/frontend/:id',
    // WordPressPost: '/:categories',
    // WordPressPostTag: '/tag/:slug' // adds route for "post_tag" post type (Optional)
  },

  plugins: [
    {
      use: '@gridsome/source-wordpress',
      options: {
        baseUrl: 'https://yayanotes.com/', // required
        typeName: 'WordPress', // GraphQL schema name (Optional)
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'frontend/**/*.md',
        typeName: 'mdPost',
        refs: {
          // 根據 mdPost 的tags 屬性 建立 mdCategory template
          tags:
          {
            typeName: 'mdCategory',
            create: true
          }
        },
        remark: {
          // remark options
        }
      }
    }, {
      use: 'gridsome-plugin-pug',
      options: {
        pug: { /* Options for `pug-plain-loader` */ },
        pugLoader: { /* Options for `pug-loader` */ }
      }
    }, {
      use: '@zefman/gridsome-source-instagram',
      options: {
        username: 'thaiskrthai' // Instagram username
        // typeName: 'InstagramPhoto' // The GraphQL type you want the photos to be added under. Defaults to InstagramPhoto
      }
    }
  ], transformers: {
    remark: {
      // global remark options
    }
  }
}
