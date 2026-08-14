import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/validationSchemas";
import axiosInstance from "../../api/axiosConfig";
import axios from "axios";
interface SignUpFormProps {
    onSignUpSuccess: (email: string) => void;
}
export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            role: 2
        },
        validationSchema: signUpSchema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const response = await axiosInstance.post('/Auth/register', values); 
                console.log(response.data);
                // We pass the email from Formik's values out of the component!
                onSignUpSuccess(values.email);
            } catch (error){
                if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
            } else {
            setFieldError('email', 'signup was unsuccessful, try again'); 
            }
            } 
            else {
                setFieldError('email', 'An unexpected error occurred');
            }
            } finally {
            setSubmitting(false);
            }
        }
    })

    return (
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
                        name="lastName"
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
                        type="tel"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div style={{ color: 'red' }}>{formik.errors.phone}</div>
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
                <div className="full-width" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" disabled={formik.isSubmitting} style={{ width: "40%" }}>
                        {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    )
}