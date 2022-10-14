const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Create a loader which can import `.obj` & `.mtl` (popular 3D model files (not popular enough to be part of the default config though... 😏))
const fileLoaderConfiguration = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.module.rules.push(fileLoaderConfiguration);

  console.log('WEBPACK', {config});

  // If you want to add a new alias to the config.
  //   config.resolve.alias['moduleA'] = 'moduleB';

  if (config.mode === 'development') {
    // Maybe you want to turn off compression in dev mode.
    // config.devServer.compress = false;
  }

  if (config.mode === 'production') {
    // Or prevent minimizing the bundle when you build.
    // config.optimization.minimize = false;
  }

  // Finally return the new config for the CLI to use.
  return config;
};
