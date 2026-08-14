import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/validationSchemas";
import axiosInstance from "../../api/axiosConfig";
import toast from 'react-hot-toast';

export default function LoginForm(){
    const navigate = useNavigate();
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema:loginSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axiosInstance.post('/Auth/login', values);
            const token = response.data.accessToken; 
            if (token) {
                localStorage.setItem('token', token);
                toast.success("Welcome Back!")
                navigate('/home'); 
            } else {
                toast.error("Something Went Wrong, Please Try Again!")
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setFieldError('email', 'Wrong Email or Password');
        } finally {
            setSubmitting(false);
        }
    }
    })
    return(
        <div>
            <h2>Login Page</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                        {formik.touched.email && formik.errors.email? 
                            (<div style={{ color: 'red' }}>{formik.errors.email}</div>):
                            null
                        }        
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                        {formik.touched.password && formik.errors.password? 
                            (<div style={{ color: 'red' }}>{formik.errors.password}</div>):
                            null
                        }
                </div>
                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Login'}
                </button>      
            </form>
        </div>
    )
}