# Helix-Deploy plugin for webpack

> Helix Deploy - Webpack Plugin

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-deploy-plugin-webpack.svg)](https://codecov.io/gh/adobe/helix-deploy-plugin-webpack)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/adobe/helix-deploy-plugin-webpack/main.yaml)](https://github.com/adobe/helix-deploy-plugin-webpack/actions/workflows/main.yaml)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-deploy-plugin-webpack.svg)](https://github.com/adobe/helix-deploy-plugin-webpack/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-deploy-plugin-webpack.svg)](https://github.com/adobe/helix-deploy-plugin-webpack/issues)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install @adobe/helix-deploy-plugin-webpack
```

## Usage

This plugin replaces the formerly built-in support in [@adobe/helix-deploy](https://github.com/@adobe/helix-deploy) for webpack bundles. To use it, specify the plugin name and CommonJS output format on the command line as follows:
```
$ npx hedy --plugin=@adobe/helix-deploy-plugin-webpack --esm=false ...
```

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
