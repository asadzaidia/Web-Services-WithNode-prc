var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoAppApi' );
//as mongoose by default uses callbacks but we are using here promises so set promises global for mongoose

module.exports={mongoose};
//'heroku config:set PROD_MONGODB=mongodb://<asad>:<asad>@ds047945.mlab.com:47945/todoapi' ||
