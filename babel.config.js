module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@assets": "./assets",
            "@services": "./services",
            "@storages": "./storages",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
