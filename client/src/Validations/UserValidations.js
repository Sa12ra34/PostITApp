import * as yup from "yup";
export const UserSchemaValidation =yup.object().shape({
    name:yup.string().required("Name is required"),
    email:yup.string().email("Not valid email format"),
    password:yup.string().min(4).max(20).required("password is required"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),null],"password Don't match").required(),
});
