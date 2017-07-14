const path = require('path');
const glob = require('glob');

module.exports = {
  webpack: (config, { dev }) => {
    const rule1 = {
      test: /\.(css|scss)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    };
    const rule2 = {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    };
    const rule3 = {
      test: /\.s(a|c)ss$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader',
        { loader: 'sass-loader',
          options: {
            includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), []),
          },
        },
      ],
    };
    config.module.rules.push(rule1);
    config.module.rules.push(rule2);
    config.module.rules.push(rule3);
    return config;
  },
};
