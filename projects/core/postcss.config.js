module.exports = (config) => {
  const environment = config.env;
  config = {
    parser: 'postcss-scss',
    map: false,
    content: [],
    theme: {
      extend: {},
    },
    plugins: {
      'tailwindcss': {
        purge: false,
      },
      'autoprefixer': {},
      'postcss-nested': {},
      'postcss-merge-rules': {},
    },
  };

  if (environment === 'production') {
    config.plugins = {
      ...config.plugins,
      cssnano: {},
    };
  }

  return config;
};
