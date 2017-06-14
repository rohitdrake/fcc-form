const app = (require('express'))();
const {MongoClient, ObjectID} = require('mongodb');

let port = process.env.PORT || 3000;

MongoClient.connect(process.env.MONGOLAB_URI,  (err, db)=>{

  app.listen(port,()=>console.log('server is listening on port 3000!'));

  app.use(require('body-parser').urlencoded({ extended: false }));
  app.use(require('body-parser').json());
  app.use('/' , require('express').static('public'));

  app.post('/'  ,(req,  res)=>{
      console.log(req.body);
      let collection = db.collection('posted_data_collection');
      collection.insert(req.body);
      collection.find().toArray((err, docs)=>{
        res.send(`
              <h1>Thanks for your response</h1>
              <h2>Total number of response recieved is ${docs.length}</h2>
          `);
      });

  });


});
// 'mongodb://rohitdrake:form-data003#@ds127492.mlab.com:27492/form-data'
