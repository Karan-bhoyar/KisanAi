import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Leaf,
    Eye,
    EyeOff,
    Sprout
} from "lucide-react";


function Login() {


    const navigate = useNavigate();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [showPassword,setShowPassword] = useState(false);


    const [loading,setLoading] = useState(false);

    const [error,setError] = useState("");





    const handleLogin = async()=>{


        if(!email || !password){

            setError(
                "Email and Password are required"
            );

            return;

        }



        try{


            setLoading(true);

            setError("");



            const formData =
                new URLSearchParams();



            formData.append(
                "username",
                email
            );


            formData.append(
                "password",
                password
            );





            const response =
            await axios.post(

                "http://127.0.0.1:8000/auth/login",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "application/x-www-form-urlencoded"

                    }

                }

            );





            localStorage.setItem(

                "token",

                response.data.access_token

            );



            navigate("/",{
                replace:true
            });



        }


        catch(err:any){


            setError(

                err.response?.data?.detail
                ||
                "Invalid credentials"

            );


        }


        finally{


            setLoading(false);


        }



    };








    return (


<div className="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-green-900
via-green-700
to-emerald-500
flex
items-center
justify-center
px-4
">



{/* Floating circles */}


<div className="
absolute
w-72
h-72
bg-green-300/20
rounded-full
top-10
left-10
animate-pulse
"/>


<div className="
absolute
w-96
h-96
bg-white/10
rounded-full
bottom-0
right-0
animate-bounce
"/>







{/* LOGIN CARD */}


<div className="
relative
z-10
w-full
max-w-md
bg-white/20
backdrop-blur-xl
border
border-white/30
shadow-2xl
rounded-3xl
p-8
animate-[fadeIn_0.8s_ease]
">






{/* LOGO */}


<div className="
flex
justify-center
mb-6
">


<div className="
w-20
h-20
rounded-full
bg-white
flex
items-center
justify-center
shadow-xl
animate-bounce
">


<Leaf
size={40}
className="
text-green-700
"
/>


</div>


</div>







<h1 className="
text-center
text-4xl
font-bold
text-white
">

Kisan AI

</h1>



<p className="
text-center
text-green-100
mt-2
mb-8
">

Smart Farming Assistant 🌱

</p>








{/* EMAIL */}


<div className="
relative
mb-5
">


<Mail
className="
absolute
left-4
top-3.5
text-green-700
"
size={22}
/>



<input

type="email"

placeholder="Enter email"

value={email}

onChange={
(e)=>setEmail(e.target.value)
}


className="
w-full
pl-12
py-3
rounded-xl
bg-white
outline-none
focus:ring-4
focus:ring-green-300
transition
"

/>


</div>








{/* PASSWORD */}


<div className="
relative
mb-5
">


<Lock

className="
absolute
left-4
top-3.5
text-green-700
"

size={22}

/>



<input

type={
showPassword
?
"text"
:
"password"
}


placeholder="Enter password"


value={password}


onChange={
(e)=>setPassword(e.target.value)
}


className="
w-full
pl-12
pr-12
py-3
rounded-xl
bg-white
outline-none
focus:ring-4
focus:ring-green-300
transition
"

/>



<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-4
top-3.5
text-gray-500
"

>


{
showPassword
?
<EyeOff size={22}/>
:
<Eye size={22}/>
}


</button>



</div>









{
error &&

<p className="
bg-red-100
text-red-700
p-3
rounded-lg
mb-4
text-sm
">

{error}

</p>

}









<button

onClick={handleLogin}

disabled={loading}


className="
w-full
bg-white
text-green-700
font-bold
py-3
rounded-xl
shadow-lg
hover:scale-105
transition
flex
items-center
justify-center
gap-2
disabled:opacity-50
"

>


<Sprout size={22}/>


{

loading
?
"Logging in..."
:
"Login to Farm AI"

}


</button>








<p className="
text-center
text-green-100
text-sm
mt-6
">

Powered by AI 🌾

</p>




</div>




</div>


    );

}


export default Login;