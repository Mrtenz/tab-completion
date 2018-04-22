import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';
import { browser, node } from './common';

const production: Configuration = {
    mode: 'production',
    devtool: 'source-map'
};

export default [
    merge.smart(browser, production),
    merge.smart(node, production)
];
