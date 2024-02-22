import "./ProfileScreen.css"
import Nav from "../Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlansScreen from "./PlansScreen";
import { getAuth} from "firebase/auth";



export default function ProfileScreen() {

    const user = useSelector(state=>state.user);
    console.log(user);
    
    
    return (
    <div className="profileScreen">
        <Nav />

        <div className=" profileScreen__body">


            <h1>Edit Profile</h1>

            <div className="profileScreen__info">

                 {/* <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="" />  */}

                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
                
                <div className="profileScreen__details">
                   
                    <h2>{user.email}</h2>

                    <div className="profileScreen__plans">

                        <h3>Plans</h3>

                        <PlansScreen/>

                        <button onClick={()=>auth.signOut()} className="profileScreen__signOut">Sign Out</button>

                    </div>
                    


                </div>
            </div>

        </div>

    </div>);

}