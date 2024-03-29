import React, { useState } from 'react'
import vg from "../assets/vg.png"
import toast from 'react-hot-toast';
import {motion} from "framer-motion";
import { addDoc,collection } from 'firebase/firestore';
import {db} from "../firebase" 
const Contact = () => {

  const animationss={
    form:{
      initial:{
        x:"-100%",
        opacity:0,
      },
      whileInView:{
        x:0,
        opacity:1
      }
    },
    button:{
      initial:{
        y:"-100%",
        opacity:0,
      },
      whileInView:{
        y:0,
        opacity:1
      },

      transition:{
        delay:0.5,
      }
    },

  }

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [message,SetMesssage]=useState("");
  const [disablebtn , setDisablebtn]=useState(false);


const submitHandler = async (e)=>{
  e.preventDefault();// iise data ane pr page relaod nhi hota h..
  setDisablebtn(true);//gaise koi form sbmit kr de btn disable hogaye 
  console.log(name,email,message)

try {
  await addDoc(collection(db,"contacts"),{
    name,
    email,
    message,
    });
    setName("");//data sent ho gaya to empty kr do
    setEmail("");
    SetMesssage("");
    toast.success("Message Sent")
    setDisablebtn(false);//gab submit hogaya to false botton enable ho gaye ga
  
} catch (error) {
  toast.error("Error")
  console.log(error)
  setDisablebtn(false);
  
}



}

  return (
    <div id='contact'>
        <section>
            <motion.form {...animationss.form} onSubmit={submitHandler} >
                <h2>Contact Me</h2>
                <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} placeholder='Your Name' required/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your Eamil' required/>
                <input type="text" value={message} onChange={(e)=>SetMesssage(e.target.value)} placeholder='Your Message' required/>
                <motion.button  className={disablebtn?"disableBtn":""}   disabled={disablebtn}    {...animationss.form} type='submit'>Send</motion.button>

            </motion.form>
        </section>
        <aside>
            <img src={vg} alt="" />
        </aside>
    </div>
  )
}

export default Contact