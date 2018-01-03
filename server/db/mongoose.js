var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoAppApi');
//as mongoose by default uses callbacks but we are using here promises so set promises global for mongoose

module.exports={mongoose};
