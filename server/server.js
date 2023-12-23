import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
  });



app.use(express.static("public"));
app.use(express.json());

app.post("/completion", (req,res) => {
  console.log(req.body.message);

});


