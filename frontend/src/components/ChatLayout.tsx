import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    Leaf,
    Sprout,
    ShieldCheck,
    CloudSun
} from "lucide-react";

import { motion } from "framer-motion";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

import {
    sendMessage,
    getChatHistory
} from "../API/chatApi";


interface Message {
    role:string;
    text:string;
}



function ChatLayout(){


const [messages,setMessages] =
useState<Message[]>([
{
    role:"ai",
    text:"🙏 Namaste kisaan bhai 🌾 Main Kisan AI hoon. Aap kheti, fasal, rog aur government schemes ke baare me puch sakte hain."
}
]);


const [loading,setLoading] =
useState(false);


const chatEndRef =
useRef<HTMLDivElement|null>(null);





useEffect(()=>{

const token =
localStorage.getItem("token");


if(token){

    loadHistory();

}


},[]);





useEffect(()=>{


chatEndRef.current?.scrollIntoView({

    behavior:"smooth"

});


},[messages,loading]);







const loadHistory = async()=>{


try{


const data =
await getChatHistory();



const history =
data.reverse().flatMap((chat:any)=>[

{
    role:"user",
    text:chat.message
},

{
    role:"ai",
    text:chat.response
}

]);



setMessages(prev=>[

...prev,

...history

]);



}

catch(error){

console.log(error);

}


};









const handleSend = async(

message:string,

language:string

)=>{


if(!message.trim())
return;



setMessages(prev=>[

...prev,

{
role:"user",
text:message
}

]);



setLoading(true);





try{


const data =
await sendMessage(

message,

language

);




setMessages(prev=>[

...prev,

{

role:"ai",

text:data.response

}

]);



}


catch(error){


setMessages(prev=>[

...prev,

{

role:"ai",

text:"❌ Server response nahi aaya."

}

]);


}


finally{


setLoading(false);


}



};







return (



<div

className="

relative

h-[calc(100vh-150px)]

overflow-hidden

bg-gradient-to-br

from-green-100

via-white

to-emerald-100

p-3

md:p-5

"

>






{/* Animated Background */}


<div

className="

absolute

top-10

left-10

w-60

h-60

bg-green-300

rounded-full

blur-3xl

opacity-30

animate-pulse

"

/>



<div

className="

absolute

bottom-10

right-10

w-60

h-60

bg-emerald-300

rounded-full

blur-3xl

opacity-30

animate-pulse

"

/>







<div

className="

relative

grid

grid-cols-1

lg:grid-cols-12

gap-4

h-full

"

>







{/* LEFT PANEL */}



<motion.div


initial={{

opacity:0,

x:-30

}}


animate={{

opacity:1,

x:0

}}



className="


hidden

lg:block


lg:col-span-3


h-[72vh]


rounded-3xl


p-5


text-white



bg-gradient-to-br

from-green-700

via-emerald-600

to-green-500



shadow-xl


"

>


<div

className="

flex

items-center

gap-3

"

>


<div

className="

w-12

h-12

rounded-xl

bg-white/20

flex

items-center

justify-center

"

>


<Leaf size={28}/>


</div>




<div>


<h1 className="

text-2xl

font-bold

">

Kisan AI

</h1>



<p className="

text-green-100

text-sm

">

Smart Farming

</p>



</div>


</div>







<p

className="

mt-6

text-green-100

text-sm

"

>

AI powered farming assistant for farmers 🌱

</p>







<div

className="

mt-6

space-y-3

"

>


<button

className="

w-full

flex

items-center

gap-3

bg-white/20

p-3

rounded-xl

hover:bg-white/30

transition

"

>


<Sprout size={20}/>

Crop Recommendation


</button>






<button

className="

w-full

flex

items-center

gap-3

bg-white/20

p-3

rounded-xl

hover:bg-white/30

transition

"

>


<ShieldCheck size={20}/>

Government Schemes


</button>






<button

className="

w-full

flex

items-center

gap-3

bg-white/20

p-3

rounded-xl

hover:bg-white/30

transition

"

>


<CloudSun size={20}/>

Weather Updates


</button>


</div>



</motion.div>












{/* CHAT PANEL */}



<motion.div


initial={{

opacity:0,

scale:.96

}}


animate={{

opacity:1,

scale:1

}}


className="


lg:col-span-9



h-[72vh]



bg-white/80



backdrop-blur-xl



rounded-3xl



shadow-xl



border



flex



flex-col



overflow-hidden


"

>









{/* HEADER */}



<div

className="

p-4

bg-gradient-to-r

from-green-700

to-emerald-500

text-white

flex

items-center

gap-3

"

>


<div

className="

w-10

h-10

rounded-xl

bg-white/20

flex

items-center

justify-center

"

>

🤖

</div>




<div>


<h2 className="

text-xl

font-bold

">

AI Farming Assistant

</h2>


<p className="

text-green-100

text-sm

">

● Online Ready

</p>


</div>



</div>









{/* MESSAGE AREA */}



<div

className="

flex-1

overflow-y-auto

p-4

space-y-3

bg-gray-50

"

>


{

messages.map((msg,index)=>(


<motion.div


key={index}


initial={{

opacity:0,

y:15

}}


animate={{

opacity:1,

y:0

}}


>


<MessageBubble

role={msg.role}

text={msg.text}

/>



</motion.div>


))


}






{

loading &&

<div

className="

bg-white

shadow

rounded-xl

px-4

py-2

w-fit

animate-pulse

"

>

🤖 Kisan AI typing...

</div>


}




<div ref={chatEndRef}/>


</div>









{/* INPUT */}



<div

className="

border-t

bg-white

"

>


<ChatInput

onSend={handleSend}

/>


</div>






</motion.div>





</div>



</div>


);


}



export default ChatLayout;