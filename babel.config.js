module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        root: ['./src/'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@constants': './src/constants',
          '@pages': './src/helpers',
          '@store': './src/store',
          '@utils': './src/utils',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
