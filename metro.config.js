const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

const { transformer, resolver } = config

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  getTransformOptions: async () => ({
    transform: {
      // Inline requires are very useful for deferring loading of large dependencies/components.
      // For example, we use it in app.tsx to conditionally load Reactotron.
      // However, this comes with some gotchas.
      // Read more here: https://reactnative.dev/docs/optimizing-javascript-loading
      // And here: https://github.com/expo/expo/issues/27279#issuecomment-1971610698
      inlineRequires: true,
    },
  }),
}

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg", "cjs"],
}

module.exports = config
