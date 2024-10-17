import { connect } from 'mongoose';
const mongoURI = "mongodb+srv://rajat397:oHcTfYTV8aTH1FUa@notessharingcluster.3riwc.mongodb.net/?retryWrites=true&w=majority&appName=NotesSharingCluster";

const connectToMongo =async ()=>{

    try{
        await connect(mongoURI);
        console.log("Connected to db");
    }catch(error){
        console.log(error);
    }
}

export default connectToMongo;