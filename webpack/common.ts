import { resolve } from 'path';
import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';

const basePath = resolve(__dirname, '..');
const sourcePath = resolve(basePath, 'src');

const common: Configuration = {
    entry: {
        tabCompletion: resolve(sourcePath, 'index.ts')
    },
    output: {
        path: resolve(basePath, 'lib'),
        library: 'TabCompletion'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            emitErrors: true,
                            failOnHint: true,
                            typeCheck: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
                exclude: /node_modules/
            }
        ]
    }
};

export const browser: Configuration = merge.smart(common, {
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js'
    }
});

export const node: Configuration = merge.smart(common, {
    target: 'node',
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].node.js'
    }
});
