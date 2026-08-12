import * as Yup from 'yup'
const passwordCheck=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
export const signUpSchema=Yup.object({
    fullname:Yup.string().min(3,"Please Enter Your Full Name").required("Your Full Name is Required!"),
    email:Yup.string().email("Please Enter a Valid Email").required("Your Email is Required!"),
    password:Yup.string().matches(passwordCheck,"The Password Must Have a Minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.").required("Password is Required!"),
    confrimPassword:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("You Have to Confirm Your Password"),
})
export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});