const {initilizationData}=require("./db/db.connect");
const Hotel=require("./model/hotel.model")
initilizationData();
const express = require("express");
const app=express();
app.use(express.json());


const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };

async function createHotel(newHotel){
    try{
        const hotel = new Hotel(newHotel);
        const saveHotel= await hotel.save();
        return saveHotel

    }catch(error){
        throw error;
    }
}
// createHotel(newHotel)

//LESSON BE: BE4.2_HW2
app.post("/hotels",async(req,res)=>{
    try{
  const savedHotel=await createHotel(req.body);
  console.log(savedHotel)
  res.status(200).json({message:"Added Successfully",hotel:savedHotel})
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})

//BE2.4_HW2 Question 1:deleteHotelById 
async function deleteHotelById (hotelId){
    try{
  const deleteById = await Hotel.findByIdAndDelete(hotelId);
  return deleteById
    }catch(error){
        throw error;
    }
}
// deleteHotelById ("689f247009d888d186c7f9ec");

//LESSON BE: BE4.3_HW2
app.delete("/hotels/:hotelId",async(req,res)=>{
    try{
  const deleteId = await deleteHotelById (req.params.hotelId);
  if(deleteId){
    res.status(200).json({message:"Delete Successfully"})
  }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//deleteHotelByPhoneNumber Question :2
async function deleteHotelByPhoneNumber (hotelPhone){
    try{  
  const deletePhone = await Hotel.findOneAndDelete({phoneNumber:hotelPhone});
  console.log(deletePhone)
    }catch(error){
        throw error;
    }
}
deleteHotelByPhoneNumber ("+1234555890")

//Question 3:

async function readAllHotel() {
    try{
       const hotel=await Hotel.find();
       return hotel
    }catch(error){
        throw error;
    }
}
// readAllHotel()
app.get("/hotels",async(req,res)=>{
    try{
   const hotel=await readAllHotel();
   if(hotel){
    res.json(hotel)
   }else{
    res.status(404).json({error:"Not Found"})
   }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//Question 4:

async function readName(nameHotel){
    try{
      const name=await Hotel.findOne({name:nameHotel})
      return name
    }catch(error){
        throw error;
    }
}
// readName("Lake View");
app.get("/hotels/:hotelName",async(req,res)=>{
    try{
   const hotel=await readName(req.params.hotelName);
   if(hotel){
    res.json(hotel)
   }else{
    res.status(404).json({error:"Not found"})
   }
    }catch(error){
        res.status(500).json({error:"Failed"});
    }
})

//Question 5:

async  function readAllDetails(){
  try{
  const details=await Hotel.find({isParkingAvailable:true});
  console.log(details)
  }catch(error){
    throw error;
  }
}
// readAllDetails()
//Question 6:

async function readAllResturant(){
    try{
   const resturant = await Hotel.find({isRestaurantAvailable:true})
   console.log(resturant)
    }catch(error){
        throw error;
    }
}
// readAllResturant();
//question 7:
async function readAllRange(categoryNmae ){
    try{
   const category = await Hotel.findOne({category:categoryNmae})
   return category
    }catch(error){
        throw error;
    }
}
// readAllRange("Mid-Range");
app.get( "/hotels/category/:hotelCategory",async(req,res)=>{
    try{  
   const hotel = await readAllRange(req.params.hotelCategory);
   if(hotel){
    res.json(hotel)
   }else{
    res.status(404).json({error:"Not found"})
   }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//Question 8:
async function readAllRange(price){
    try{
    const range=await Hotel.findOne({priceRange:price});
    console.log(range)
    }catch(error){
        throw error;
    }
}
// readAllRange("$$$$ (61+)");
//question 9:
async function readAllRange(range){
    try{
    const readRange=await Hotel.findOne({rating:range});
    return readRange;
    }catch(error){
        throw error;
    }
}
// readAllRange(4.0);
app.get("/hotels/rating/:hotelRating",async(req,res)=>{
    try{
   const hotel = await readAllRange(req.params.hotelRating);
   if(hotel){
    res.json(hotel)
   }else{
    res.status(404).json({error:"Not FOund"})
   }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//Question 10:
async function readAllPhone(number){
    try{
    const phone=await Hotel.findOne({phoneNumber:number});
    return phone;
    }catch(error){
        throw error
    }
}
// readAllPhone("+1299655890");
app.get("/hotels/directory/:phoneNumber",async(req,res)=>{
    try{
  const hotel=await readAllPhone(req.params.phoneNumber);
  if(hotel){
    res.json(hotel)
  }else{
    res.status(404).json({error:"Not found"})
  }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//BE2.4_HW1 Question 1:
async function deleteRestaurantById (resturantId){
    try{
  const deleteId = await Resturant.findByIdAndDelete(resturantId)
    }catch(error){
        throw error;
    }
}
// deleteRestaurantById ("689f1bd941d73d55370dc73e");

//Question 2:deleteRestaurantByName 
// async function deleteRestaurantByName (resturantName){
//     try{
//   const deleteName = await Resturant.findOneAndDelete({name:resturantName});
//   console.log(deleteName)
//     }catch(error){
//         throw error;
//     }
// }
// deleteRestaurantByName ("Som Sarovar")

//Hw2 Question 1:
async function updateHotel(hotelId,updateValue){
    try{
  const update = await Hotel.findByIdAndUpdate(hotelId,updateValue,{new:true});
  return update
    }catch(error){
        throw error;
    }
}
//  updateHotel("689f247009d888d186c7f9ec",{checkOutTime:"11 Am"})

//LESSON BE: BE4.4_HW2
app.post("/hotels/:hotelId",async(req,res)=>{
    try{
   const update =await updateHotel(req.params.hotelId,req.body);
   if(update){
    res.status(200).json({message:"Updated Successfully",update:update})
   }else{
    res.status(404).json({error:"Not Found"})
   }
    }catch(error){
        res.status(500).json({error:"Failed"})
    }
})
//Question 2:
async function updateByName(hotelName,updateRating){
   try{
  const update = await Hotel.findOneAndUpdate({name:hotelName},updateRating,{new:true});
  console.log(update);
   }catch(error){
    throw error;
   }
}
// updateByName("Sunset Resort",{rating:4.2});
//Question 3:
async function updatePhone(hotelPhone,updatePhone){
    try{
   const update= await Hotel.findOneAndUpdate({phoneNumber:hotelPhone},updatePhone,{new:true});
   console.log(update)
    }catch(error){
        throw error;
    }
}
// updatePhone("+1299655890",{phoneNumber:"+1997687392"})

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("Server running on port",PORT)
})