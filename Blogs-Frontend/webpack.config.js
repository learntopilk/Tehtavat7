const path = require('path')

/*
const config = {
  entry: './src/index.js',
  output: {
    //path: path.resolve(__dirname, 'dist'),
    path: path.resolve('/Users/Jonse/Documents/fullstack/fullstack/teht7/Tehtavat7/Blogs-Backend/build'),
    filename: 'main.js'
  },
 module: {
   rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['env', 'react']
            }
        }
     ]
 } 

}*/

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2017']
        }
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2017'

        ]
      }
    ]
  }
}

module.exports = config