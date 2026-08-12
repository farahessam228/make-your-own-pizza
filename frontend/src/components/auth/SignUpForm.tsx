import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/validationSchemas";
export default function SignUpForm(){
    const formik=useFormik({
        initialValues: {
            fullname:'',
            email:'',
            password:'',
            confirmPassword:'',
        },
    validationSchema: signUpSchema, 
    onSubmit: (values) => {
        console.log("Form Values:", values);
    },
    })
    
    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullname}
                    >
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <div style={{ color: 'red' }}>{formik.errors.fullname}</div>
                        ) : null}
                    </input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    >
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{ color: 'red' }}>{formik.errors.email}</div>
                        ) : null}
                    </input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    >
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{ color: 'red' }}>{formik.errors.password}</div>
                        ) : null}
                    </input>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        >
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                        ) : null}           
                        </input>
                </div>
                </div>
                <button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>         
            </form>
        </div>
    )
}