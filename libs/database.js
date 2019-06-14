let client = require('mongodb').MongoClient,
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microsoft');
let db = mongoose.connection;
let uri = 'mongodb://localhost/microsoft';

db.once('open',function(){
    console.log('connected');
})

db.on('error',function(err){
    console.log(err);
});

module.exports = 
    class UsersDAO {
        
        static list() {
            return client.connect(uri , { useNewUrlParser: true }).then((client) => {
                let db = client.db('microsoft');
                return db.collection('users')
                    .find()
                    .sort({ name: 1 })
                    .toArray();

            }).catch((err) => {throw err;});
        }


        static insert(obj){
            return client.connect(uri, function(err,db){
                if(err) throw err;
                var dbo = db.db('microsoft');
                dbo.collection('users').insertOne(obj, function(err,res){
                    if(err) throw err;
                    console.log('User inserted!');
                    db.close();
                });
            });
        }

        static delete(obj){
            return client.connect(uri, (err,db)=>{
                if(err) throw err;
                var dbo = db.db('microsoft');
                //deleting an article
                dbo.collection('articles').deleteOne({"title" : obj});
            });
        }

        static find(obj){
            return client.connect(uri, (err,db)=>{
                if(err) throw err;
                var dbo = db.db('microsoft');
                //searching for an specific article
                dbo.collection('articles').find({"title" : obj}, (err,res)=>{
                    if(err) throw err;
                    console.log(obj);
                });
            });
        }



    }
