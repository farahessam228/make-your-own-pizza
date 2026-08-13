import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/validationSchemas";
import axiosInstance from "../../api/axiosConfig";

interface SignUpFormProps {
    onSignUpSuccess: () => void;
}
export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps){
    const formik=useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email:'',
            phoneNumber:'',
            password:'',
            confirmPassword:'',
            role:2
        },
    validationSchema: signUpSchema, 
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
        try {
            const response = await axiosInstance.post('/auth/register', values); //auth/register place holder lhd m elbackend yb3t el api
            console.log( response.data);
            onSignUpSuccess();

        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message); 
            } else {
                alert("signup was unsuccessful, try again");//hattbdl b setFieldError
            }
        } finally {
            setSubmitting(false);
        }
    }
    })
    
    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit} className="signup-form-grid">
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                        ) : null}
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lasttName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                        ) : null}
                </div>
                <div className="full-width">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{ color: 'red' }}>{formik.errors.email}</div>
                        ) : null}
                </div>
                <div className="full-width">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div style={{ color: 'red' }}>{formik.errors.phoneNumber}</div>
                        ) : null}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{ color: 'red' }}>{formik.errors.password}</div>
                        ) : null}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                        ) : null}           
                </div>
                <div className="role-selector full-width">
                    <button
                        type="button" 
                        className={`role-btn ${formik.values.role === 2 ? 'active' : ''}`}
                        onClick={() => formik.setFieldValue('role', 2)}
                    >
                        Customer
                    </button>
                    
                    <button
                        type="button"
                        className={`role-btn ${formik.values.role === 0 ? 'active' : ''}`}
                        onClick={() => formik.setFieldValue('role', 0)}
                    >
                        Delivery
                    </button>
                </div>
                <div className="full-width" style={{display:"flex",justifyContent:"center", alignItems:"center"}}>    
                    <button type="submit" disabled={formik.isSubmitting} style={{width:"40%"}}>
                        {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                </div>         
            </form>
        </div>
    )
}