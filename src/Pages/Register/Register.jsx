import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxisoSecure from "../../Hooks/useAxiosSecure.jsx";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import Swal from "sweetalert2";

const Register = () => {
    //axios secure hook
    const axiosPublic = useAxiosPublic()
    const {setUser, userCreate, updateUser, userSignIn, googleSignIn} = useContext(AuthContext)
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    
   

    const password = watch('password'); // Watch the password field
    
    const onSubmit = (data) => {
        
        console.log(data);
        //creating a new user
        userCreate(data.email, data.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            //adding name and profile pic
            updateUser(data.fullName, data.photo)
            .then(()=>{
                console.log('photo and name added')
                setUser(user)
                //after updating the user login the user automatically
                userSignIn(data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setUser(user)
                    // ...
                    //sending user info to the data base
                    const userInfo = {
                        name: data.fullName,
                        email: data.email,
                        role:'student', photo:data.photo
                    }
                    
                    axiosPublic.post('/user', userInfo)
                    .then(res=>{
                        console.log(res.data)
                        if(res.data.insertedId){
                            Swal.fire({
                                position: "middle-middle",
                                icon: "success",
                                title: "Registration successful",
                                showConfirmButton: false,
                                timer: 1500
                              });
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                    
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                  });
            }).catch((err)=>{
                console.log(err)
            })
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });

    };

    //google signin function
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then((result) => {
            
            const user = result.user;
            setUser(user)
            //sending user data to the database
            const userInfo = {name:user.displayName,email:user.email ,
                role:'student', photo:user.photoURL}
            axiosPublic.post('/user',userInfo)
            .then(res=>{
                console.log(res.data)
               
                    Swal.fire({
                        position: "middle-middle",
                        icon: "success",
                        title: "Registration successful",
                        showConfirmButton: false,
                        timer: 1500
                      });
               
            }).catch(err=>{
                console.log(err)
            })
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ...
          });
    }

    return (
        <div>
            <div className="bg-[url('https://i.postimg.cc/65JH39bw/abstract-green-texture-background-free-vector.jpg')] bg-no-repeat bg-center bg-cover min-h-screen flex flex-col bg-red-400">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            {...register('fullName', { required: true })}
                        />
                        {errors.fullName?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide full name</p>}
                        
                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide email address</p>}
                        
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="photo"
                            placeholder="Photo URL"
                            {...register('photo', { required: true })}
                        />
                        {errors.photo?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must provide photo URL</p>}
                        
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            {...register('password', { 
                                required: true, 
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
                            })}
                        />
                        {errors.password?.type === 'required' && <p role="alert" className="text-red-500 font-bold">You must input password</p>}
                        {errors.password?.type === 'pattern' && <p role="alert" className="text-red-500 font-bold">Your password must be 8 characters long and must include an uppercase letter</p>}
                        
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', { 
                                required: 'Confirm Password is required', 
                                validate: value => value === password || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p role="alert" className="text-red-500 font-bold">{errors.confirmPassword.message}</p>}
                        
                        <Button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                            gradientMonochrome="success"
                        >
                            Create Account
                        </Button>
                        
                        <Button onClick={handleGoogleSignIn} className="w-full bg-none" outline gradientDuoTone="greenToBlue">
                            <span className="py-2 flex gap-1 justify-center items-center"><FaGoogle /> Continue with Google</span>
                        </Button>
                        
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Terms of Service</a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">Privacy Policy</a>.
                        </div>
                    </form>
                    
                    <div className="text-white mt-6">
                        Already have an account?
                        <a className="no-underline border-b border-blue text-white" href="../login/">
                            <Link to={'/login'}>Log in</Link>
                        </a>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;