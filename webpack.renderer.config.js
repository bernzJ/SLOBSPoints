const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.(ttf|otf|eot|svg|png|ico|icns|woff2|woff)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[path][name].[ext]",
        publicPath: "../",
      },
    },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
