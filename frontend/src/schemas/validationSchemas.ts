import * as Yup from 'yup'
const passwordCheck=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
export const signUpSchema=Yup.object({
    firstName:Yup.string().min(3,"Please Enter Your First Name").required("Your First Name is Required!"),
    lastName:Yup.string().min(3,"Please Enter Your Last Name").required("Your Last Name is Required!"),
    email:Yup.string().email("Please Enter a Valid Email").required("Your Email is Required!"),
    phoneNumber:Yup.string().min(11,"Phone Number must be 11 digits").max(11,"Your Phone Number Shouldn't be longer than 11 digits").required("Phone number is required"),
    password:Yup.string().matches(passwordCheck,"your password must have a min of 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.").required("Password is Required!"),
    confrimPassword:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("You Have to Confirm Your Password"),
})
export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});