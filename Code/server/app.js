const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const CORS = require('cors')
const { Socket } = require('dgram')
const {MongoClient,ObjectId} = require('mongodb')
const { type } = require('os')
const exp = require('constants')

const url = "mongodb+srv://jokerdeva18:CtCjfgyTyxNagxCm@cluster0.31bwl.mongodb.net/"
const client = new MongoClient(url);

const PORT = process.env.PORT || 8082
const server = http.createServer(app)
const io = new Server(server,{
  cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST']
  }
});


app.use(CORS())
app.use(express.json())

let db_instance = null;

const connectDB = async()=>{
  if(!db_instance){
    try{
       await client.connect()
       db_instance = await client.db('complainte')
       console.log('Connected')
    }
    catch{
      console.log('failed')
    }
  }
  else{
    console.log('DB Already exists')
  }

  return db_instance
}

const InsertionRecord = async(record,collection_name)=>{
   const db = await connectDB();
   const collection = db.collection(collection_name);

   const res = await collection.insertOne(record);
   if(res?.acknowledged){
      console.log('inserted')
      return {type:'insert',status:true}
   }
   else{
      console.log('fail')
      return {type:'insert',status:false}
   }
}
const UpdateRecord = async(filter,update,collection_name)=>{
   const db = await connectDB();
   const collection = db.collection(collection_name);

   const res = await collection.updateOne(filter,update);
   if(res?.acknowledged){
      console.log('updated')
      return {type:'updated',status:true}
   }
   else{
      console.log('fail')
      return {type:'update',status:false}
   }
}

const FindRecord = async (query, collection_name, n = 1,projection={},sort) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collection_name);
      // Convert string _id to ObjectId
    if (query._id && typeof query._id === 'string') {
      try {
        query._id = ObjectId.createFromHexString(query._id)
        console.log(query)
      } catch (err) {
        return { status: false, message: 'Invalid ObjectId format' };
      }
    }

    console.log(query)

    let res;

    if (n !== 1) {
      res = await collection.find(query,{projection:projection}).sort(sort).toArray(); // find multiple
    } else {
      res = await collection.findOne(query); // find one
    }

    if (res && (Array.isArray(res) ? res.length > 0 : true)) {
      console.log('Found');
      return { type: 'find', status: true, records: res };
    } else {
      console.log('Not found');
      return { type: 'find', status: false, records: [] };
    }
  } catch (err) {
    console.error('Error finding records:', err);
    return { type: 'find', status: false, error: err.message };
  }
};


io.on("connection",(socket)=>{
  console.log("User connected:",socket.id)

  socket.on("join_room", (roomId) => {
  socket.join(roomId);
  console.log(`Socket ${socket.id} joined room ${roomId}`);
});

  //recived msg
  socket.on("send_message",async (data)=>{
    console.log("Message received:",data)

    const {compId ,from,messages} = data;

    await InsertionRecord({
      compId,
      from,
      messages,
      timestamp:new Date()
    },'message')

    //broadcast to people in to the room compId
    socket.to(compId).emit('receive_message',data)

  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

})

// FindRecord({name:'yesh'},'test',{_id:false}).then(console.log)

app.get('/',(req,res)=>{
  res.json({'message':'working'}),200
})


app.post('/login',async (req, res) => {
  const { type, user, pwd } = req.body;

  if(type==='users'){
      console.log('user')
      const result = await FindRecord({user:user,pwd:pwd},'users')
      if(result.status){
          return res.status(200).json({status:true,user:user,id:result.records._id})
      }
      else{
        return res.status(401).json({status:false})
      }
  }
  else if(type==='agent'){
      console.log('agent')
      const result = await FindRecord({user:user,pwd:pwd},'agent')
      if(result.status){
          return res.status(200).json({status:true,user:user,id:result.records._id})
      }  
      else{
        return res.status(401).json({status:false})
      }
  }
  else if(type==='admin'){
      console.log('admin')
      const result = await FindRecord({user:user,pwd:pwd},'admin')
      if(result.status){
          return res.status(200).json({status:true,user:user,id:result.records._id})
      }  
      else{
        return res.status(401).json({status:false})
      }
  }
});


app.post('/signup',async (req, res) => {
  const { type, user, pwd , email } = req.body;
  const result = await FindRecord({user:user},type)

  if(result.status){
      console.log('Already exists')
      return res.status(401).json({type:'already',status:false})
   }

  if(type==='users'){
    const result = await InsertionRecord({user:user,pwd:pwd,email:email},type);
    return res.status(200).json(result)
  }
  else if(type==='agent'){      
    const result = await InsertionRecord({user:user,pwd:pwd,email:email},type);
    return res.status(401).json(result) 
  }
});
app.post('/create',async (req, res) => {
  const { user, userId, email, complaint } = req.body;

  const result = await InsertionRecord(
    {
      complaint:complaint,
      user:user,
      userId:userId,
      contact:email,
      agent:'',
      agentId:'',
      status:'pending'
    }
    ,'complaint')

  if(result.status){
      console.log('Complain Created')
      return res.status(200).json({type:'created',status:true})
   }
  else{
    return res.status(304).json({type:'create failed',status:false})
  }

});

app.post('/complaints',async (req, res) => {
  const { type ,user, userId } = req.body;

  if(type === 'user' | type === 'agent'){
    const result = await FindRecord({user:user,userId:userId},'complaint',2)
    if(result.status){
            return res.status(200).json({status:true,data:result.records})
    }  
    else{
          return res.status(301).json({status:false})
    }
  }
  else{
    const result = await FindRecord({},'complaint',2)
    if(result.status){
            return res.status(200).json({status:true,data:result.records})
    }  
    else{
          return res.status(301).json({status:false})
    }

  }

  
});
app.post('/update',async (req, res) => {
  const { type, find , update } = req.body;

  const st = await FindRecord(find,type)
  
  if(!st.status) return res.status(301).json({status:true,payload:'not'})
    console.log(type,find,update)

  const result = await UpdateRecord(find,{$set:update},type)
  if(result.status){
      return res.status(200).json({status:true,payload:'new',data:result.records})
  }  
  else{
        return res.status(301).json({status:false})
  }
});

app.post('/find',async(req,res)=>{
  const {type,find} = req.body;
  console.log('find')

  const result = await FindRecord(find,type,2)
  if(result.status){
            return res.status(200).json({status:true,data:result.records})
    }  
    else{
          return res.status(301).json({status:false})
    }

})

app.post('/msg',async(req,res)=>{
  const {compId} = req.body;
  
  const result = await FindRecord({compId},'message',2,{},{timestamp:1})
  if(result.status){
     return res.status(200).json({status:true,data:result.records})
  }  
  else{
      return res.status(301).json({status:false})
    }
})


server.listen(PORT,(err)=>{
  if(err) console.log("Error Occured In Listening...!")
  else console.log("Server Listening On Port:",PORT)
})