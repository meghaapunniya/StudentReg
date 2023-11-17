
  
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const Student = require("./Schema/student-schema");
  const { MongoClient, ServerApiVersion } = require('mongodb');
  var fs = require('fs');
  var path = require('path');
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
 
var multer = require('multer');

const uri = "mongodb+srv://meghaapu:UKc2OpFSNnMpU6vM@cluster0.orccwir.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 //run().catch(console.dir);

 mongoose.connect('mongodb+srv://meghaapu:UKc2OpFSNnMpU6vM@cluster0.orccwir.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

  
  // API endpoint to save student qualification
  app.post('/save-student', upload.single('pic'),(req, res,next) => {
      
      
      const newStudent = new Student({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        regNo:req.body.roll,
        email:req.body.email,
        phone:req.body.phone,
        skills:req.body.skills,
        qualification:req.body.qualifications,
        Images: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.originalname)),
            contentType: req.file.mimetype
        }
      })
  
      newStudent.save()
      .then((response)=>{
        res.status(200).json({studentData:response})
       console.log("resp",response)
      })
      .catch((err)=>{

      })

      
  });
  
  // API endpoint to retrieve student qualifications
  // app.get('/get-student', (req, res) => {
  //     Qualification.find({}, (err, qualifications) => {
  //         if (err) {
  //             res.status(500).json({ error: 'Error fetching data from MongoDB' });
  //         } else {
  //             res.status(200).json(qualifications);
  //         }
  //     });
  // });

 
  
  app.listen(3000, () => {
      console.log('Server is running on port 3000');
  });
  