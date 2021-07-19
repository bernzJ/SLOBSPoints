const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const main = ["widget"]; // to main

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  ...main.map((asset) => {
    return new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, asset),
          to: path.resolve(__dirname, ".webpack/main", asset),
        },
      ],
    });
  }),
];
