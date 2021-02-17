import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://moises:<password>@cluster0.c1lqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : true,
    useCreateIndex : true,
})
.then(db => console.log('Db is connect'))
.catch(error => console.log(error))