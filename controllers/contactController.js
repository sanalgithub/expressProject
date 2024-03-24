const asyncHandler = require("express-async-handler")
const Contact  = require('../models/contactModel')


//@desc Getallcontacts
//@route get/api/contacts
//@access public

const getAllContact = 
asyncHandler(async (req,res)=>{
     const contact = await Contact.find()
            res.status(200).json({message:'contacts',contact})
    }
)

//@desc GetContactsById
//@route get/api/contacts
//@access public

const getContactById = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(contact){
        res.status(200).json({message:"Contact by id fetched successfully",contact})
    }
    res.status(400)
    throw new Error("contact not found")
})

//@desc CreateCOntact
//@route POST post/api/contacts
//@access public


const createContact = asyncHandler(async (req,res)=>{
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error('All fields are mandotry')
    }
    res.status(200).json({message:"contact created"})

}) 



//@desc UpdateContact
//@route PUT put/api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Contact updated", updatedContact });
});



module.exports = {getAllContact,createContact,updateContact,getContactById}
