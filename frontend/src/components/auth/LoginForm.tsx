import React, { useState } from "react"
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/validationSchemas";

export default function LoginForm(){
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema:loginSchema,
        onSubmit: (values) => {
        console.log("Form Values:", values);
    },
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
                    >
                        {formik.touched.email && formik.errors.email? 
                            (<div style={{ color: 'red' }}>{formik.errors.email}</div>):
                            null
                        }        
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {formik.touched.password && formik.errors.password? 
                            (<div style={{ color: 'red' }}>{formik.errors.password}</div>):
                            null
                        }
                    </input>
                </div>
                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Login'}
                </button>      
            </form>
        </div>
    )
}