const path = require('path')

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

}
module.exports = config