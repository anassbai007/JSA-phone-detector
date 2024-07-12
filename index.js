import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.veriphone.io/v2/verify?phone=%2B"

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/submit", async(req,res) =>{
    const phoneNumber = req.body.user;
    
      
    console.log(phoneNumber)
    try {
        const result = await axios.get(API_URL+phoneNumber+"&key=D348BB0AD9E4484EAEF84100FCE5E02E");
        const dict =  JSON.stringify(result.data);
        res.render("index.ejs", {phone: result.data.phone, country: result.data.country, carrier: result.data.carrier, phone_valid:result.data.phone_valid, phone_type: result.data.phone_type});
        
        
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data)})
      };
      
    });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  