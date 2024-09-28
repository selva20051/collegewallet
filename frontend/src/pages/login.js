import { useState } from "react";
// import { login } from "../actions/action";
import '../css/login.css'
import { useNavigate } from "react-router-dom";

function Login() {
    const [detail, setdetail] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    function handleChange(e) {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const body = { username: detail.username, password: detail.password };
            console.log(body)
            
            if (body.username === "admin" && body.password === "pass") {
                localStorage.setItem('isAuthenticated', 'true');
                setTimeout(() => {
                    alert('Login successful!');
                    navigate("/")
                }, 500); 

                
            } else {
                alert('Invalid credentials. Please try again.');
                
            }
        } catch (err) {
            console.log(err);
            alert('An error occurred. Please try again later.');
        }

    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className='wrap-login100'>
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title">
                            Member Login
                        </span>

                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input className="input100" type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;