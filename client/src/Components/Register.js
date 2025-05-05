import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser, deleteUser } from "../Features/UserSlice";
import {Link} from "react-router-dom";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userList = useSelector((state) => state.users.value);

  // State management for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For form validation using react-hook-form
  const {
    register,
    handleSubmit:submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchemaValidation),
  });

  // Handle form submission
  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log("Form Data:", data);
      alert("Validations all good");
      dispatch(registerUser(userData));
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  return (
    <Container fluid>
      <Row className="formrow">
        <Col className="columndiv1" lg="6">
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form" onSubmit={submitForm(onSubmit)}>
            <div className="appTitle"></div>
            <section className="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name..."
                  
                  onChange={(e) => setName(e.target.value)} // Manage state
                  {...register("name")} // Validation
                />
                <p className="error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                  
                  onChange={(e) => setEmail(e.target.value)} // Manage state
                  {...register("email")} // Validation
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  
                  onChange={(e) => setPassword(e.target.value)} // Manage state
                  {...register("password")} // Validation
                />
                <p className="error">{errors.password?.message}</p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password..."
                  
                  onChange={(e) => setConfirmPassword(e.target.value)} // Manage state
                  {...register("confirmPassword")} // Validation
                />
                <p className="error">{errors.confirmPassword?.message}</p>
              </div>
              <Button color="primary" className="button">
                Register
              </Button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      <Row>
        <Col md={6}>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
