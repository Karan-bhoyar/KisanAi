import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    LogOut,
    Leaf,
    User
} from "lucide-react";


function Navbar(){


    const location = useLocation();

    const [menuOpen,setMenuOpen] = useState(false);



    const navItems=[

        {
            name:"AI Chat",
            path:"/chat"
        },

        {
            name:"Disease Detection",
            path:"/disease"
        },

        {
    name: "Weather",
    path: "/weather",
},
 {
        name: "Market Prices",
        path: "/market-price",
    },
        {
            name:"History",
            path:"/disease/history"
        }

    ];



    const logout=()=>{

        localStorage.removeItem("token");

        window.location.href="/login";

    };



    const active=(path:string)=>{

        return location.pathname===path;

    };





    return(


<header className="
sticky
top-0
z-50
overflow-hidden
shadow-xl
">


{/* Animated Gradient Background */}

<div className="
absolute
inset-0
bg-gradient-to-r
from-green-100
via-emerald-50
to-green-200
animate-gradient
">
</div>



{/* Glow */}

<div className="
absolute
-top-10
left-1/3
w-40
h-40
bg-green-400/30
rounded-full
blur-3xl
animate-pulse
">
</div>





<div className="
relative
h-16
px-4
md:px-8
flex
items-center
justify-between
backdrop-blur-xl
bg-white/60
border-b
border-white/40
">







{/* LOGO */}


<Link

to="/chat"

className="
flex
items-center
gap-3
group
"

>


<div className="
relative
w-10
h-10
rounded-xl
bg-gradient-to-br
from-green-700
to-emerald-400
flex
items-center
justify-center
shadow-lg
group-hover:scale-110
transition
duration-300
">


<div className="
absolute
inset-0
rounded-xl
bg-green-400
blur-md
opacity-40
animate-pulse
">
</div>



<Leaf

size={23}

className="
relative
text-white
"

/>


</div>





<div>


<h1 className="
text-xl
font-extrabold
bg-gradient-to-r
from-green-700
to-emerald-500
bg-clip-text
text-transparent
">

Kisan AI

</h1>


<p className="
hidden
md:block
text-[11px]
text-gray-600
">

Smart Farming Assistant 🌱

</p>


</div>



</Link>










{/* DESKTOP MENU */}


<nav className="
hidden
lg:flex
absolute
left-1/2
-translate-x-1/2
gap-3
">


{

navItems.map((item)=>(


<Link

key={item.path}

to={item.path}

className={`
px-5
py-2
rounded-xl
text-sm
font-semibold
transition-all
duration-300

${
active(item.path)

?

"bg-gradient-to-r from-green-700 to-emerald-500 text-white shadow-lg scale-105"

:

"text-gray-700 hover:bg-white/70 hover:text-green-700"
}

`}

>


{item.name}


</Link>


))


}



</nav>









{/* RIGHT */}


<div className="
hidden
lg:flex
items-center
gap-3
">





<Link

to="/profile"

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-white/70
hover:bg-green-100
text-gray-700
font-semibold
text-sm
shadow-sm
transition
hover:scale-105
"

>


<User size={17}/>

Profile


</Link>






<button

onClick={logout}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-gradient-to-r
from-red-500
to-red-600
text-white
font-semibold
text-sm
shadow-lg
hover:scale-105
transition
"


>


<LogOut size={17}/>

Logout


</button>



</div>









{/* MOBILE BUTTON */}


<button

onClick={()=>setMenuOpen(!menuOpen)}

className="
lg:hidden
p-2
rounded-xl
bg-white/70
shadow
"

>


{

menuOpen

?

<X size={25}/>

:

<Menu size={25}/>

}



</button>




</div>









{/* MOBILE MENU */}


{

menuOpen && (


<div className="
lg:hidden
relative
bg-white/90
backdrop-blur-xl
p-4
shadow-xl
animate-slide
">


{

navItems.map((item)=>(


<Link

key={item.path}

to={item.path}

onClick={()=>setMenuOpen(false)}

className={`
block
px-4
py-3
rounded-xl
mb-2
font-medium

${
active(item.path)

?

"bg-green-600 text-white"

:

"hover:bg-green-50"
}

`}

>


{item.name}


</Link>


))


}





<Link

to="/profile"

className="
flex
gap-2
px-4
py-3
rounded-xl
hover:bg-green-50
"

>

<User size={18}/>

Profile

</Link>





<button

onClick={logout}

className="
w-full
mt-2
flex
justify-center
gap-2
bg-red-500
text-white
py-3
rounded-xl
"

>

<LogOut size={18}/>

Logout


</button>


</div>


)

}



</header>


    );

}


export default Navbar;