import mongoose from 'mongoose'
import { UserModel } from './models/user';
import { BlueprintModel } from './models/blueprint';

export class Database
{
  dbURI = "mongodb://" + process.env.MONGO_DB_URI + "/blueprintnotincluded";

  constructor()
  {
    mongoose.connect(this.dbURI, {
      useNewUrlParser:true, 
      useUnifiedTopology: true,
      useCreateIndex: true}).catch( (reason) => {
        console.log('Mongoose connection error: ' + reason);
      });;
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to ' + this.dbURI);
      UserModel.init();
      BlueprintModel.init();


      

    });
    
    mongoose.connection.on('error', (err) => {
      console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  }


}