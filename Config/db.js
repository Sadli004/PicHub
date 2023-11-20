const mangoose = require('mongoose'); 
mangoose
.connect('mongodb+srv://'+ process.env.DB_USER_PASS +'@mysocialnet.iwzla3f.mongodb.net/Mysocialnet')
.then(()=>{
    console.log('Connected to DB');
})
.catch((err)=>{
    console.log(err);
    console.log('Connection failed');
});
