import * as merge from 'webpack-merge';
import { Configuration } from 'webpack';
import { browser, node } from './common';

const development: Configuration = {
    mode: 'development',
    devtool: 'eval'
};

export default [
    merge.smart(browser, development),
    merge.smart(node, development)
];
