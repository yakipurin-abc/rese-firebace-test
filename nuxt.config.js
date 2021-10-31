export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'reserve-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['modern-css-reset'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/my-filter.js',
    '@/plugins/dateformat',
    { src: '@/plugins/vee-validate.js' },

    //datepicker用に追加
    { src: '~/plugins/vuejs-datepicker.js', mode: 'client', ssr: false },
    //datepicker用追加終わり
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    
    ['@nuxtjs/moment', ['ja']],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {proxy: true,},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost:8000',
        token: {
          maxAge: 60 * 60
        },
        refreshToken: {
         maxAge: 20160 * 60
        }
      },
      //管理画面用に追加
      local: {
        endpoints: {
          login: { url: '/api/auth/m_login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/muser', method: 'get', propertyName: 'user' }
        }
      },
      //追加終わり
      
    },
  },
  mauth:{
    redirect: {
      login: '/Signin',
      logout: '/',
      callback: '/login',
      home: '/TopAfterLogin'
    },
    localStorage: false,
    //strategiesの中身に認証ロジックを書いていく
    strategies:{
      //localという認証方法を使う場合
      local:{
        tokenType:'bearer',
	//axiosでアクセスする際の設定
        endpoints: {
          login: { url: '/api/auth/m_login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/muser', method: 'get', propertyName: 'user' }
        }
      },
    },
  },

  
}
