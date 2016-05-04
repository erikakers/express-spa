import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

/*
    Webpack Factory Exports Object
    This will configre Webpack for builds and development based on the options
    object.
 */
module.exports = (options) => {
    return {
        entry: entry(options),
        resolve: resolve(options),
        output: output(options),
        plugins: plugins(options),
        module: {
            preLoaders: preloaders(options),
            loaders: loaders(options)
        },
        postcss: postcss(),
        sassLoader: sassLoader(options)
    };
};

/*
 Entry Files for the Webpack configuation
 Additional Entry Files can be defined in the Files Array
 */
function entry(options) {
    const files = [
        './client/index',
        './client/app.scss'
    ];

    if (options.env === 'development') {
        files.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&reload=true');
    }

    return files;
}

/*
    Returns Webpack Resolve Object configuation
    Resolves any directory that is in the client directory so they can be imported
    without '../' or `./`. This only works for children directories inside the
    client directory.
 */
function resolve(options) {
    const alias = {};
    const extensions = ['', '.js', '.jsx', '.css', '.scss'];
    const directories = getDirectories('./client');

    if (options.typescript) {
        extensions.push('.ts');
        extensions.push('.tsx');
    }

    if (directories.length > 0) {
        directories.forEach((directory) => {
            alias[directory] = path.join(__dirname, 'client', directory);
        });
    }

    return {
        alias,
        extensions
    };
}

/*
    Returns Webpack's Output Object Configuation
 */
function output(options) {
    if (options.env === 'production') {
        return {
            path: path.join(__dirname, 'public', 'assets'),
            filename: 'app.js'
        };
    } else { // eslint-disable-line
        return {
            path: path.join(__dirname, 'public'),
            filename: 'app.js',
            publicPath: '/assets/'
        };
    }
}

/*
    Return Plugins based on Environment
 */
function plugins(options) {
    const plugins = []; // eslint-disable-line

    plugins.push(new ExtractTextPlugin('styles.css'));
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'));
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.DefinePlugin({
        DEV: options.env === 'development'
    }));

    if (options.env === 'development') {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (options.env === 'production') {
        plugins.push(new webpack.optimize.DedupePlugin());
    }

    return plugins;
}

/*
    Returns Preloaders Array
 */
function preloaders(options) {
    const preloaders = []; // eslint-disable-line

    if (!options.typescript) {
        preloaders.push({
            test: /\.js(x)?$/,
            loader: 'eslint',
            exclude: /node_modules/
        });
    }

    return preloaders;
}

/*
    Returns Loaders Array
    Typescript is enabled by default
    Babel Presets are defined in the package.json file.
 */
function loaders(options) {
    const loaders = []; // eslint-disable-line

    if (!options.typescript) {
        loaders.push({
            test: /\.js(x)?$/,
            loader: 'babel',
            exclude: /node_modules/
        });
    } else {
        loaders.push({
            test: /\.ts(x)?$/,
            loader: 'babel!ts',
            exclude: /node_modules/
        });
    }

    loaders.push({
        test: /\.(s)?css$/,
        loader: ExtractTextPlugin.extract('style', [
            'css',
            'postcss',
            'sass'
        ].join('!'))
    });

    return loaders;
}

/*
    PostCSS Loader
    Autoperfixes any CSS, project browser support must be defined.
    Also allows the use of CSSNext. http://cssnext.io/ with plain
    CSS files.
 */
function postcss() {
    return {
        defaults: [precss, autoprefixer],
        cleaner: [autoprefixer({
            browsers: []
        })]
    };
}

/*
    SASS Loader
    Defines the environement variable from the .env as a SASS variable
    that can be used. Looks in the sytling directory to resolve any
    import statements.
 */
function sassLoader(options) {
    return {
        data: '$env: ' + options.env + ';',
        includePaths: [
            path.resolve(__dirname, 'styling')
        ]
    };
}

/*
    Util Functions
 */
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
