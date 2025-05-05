import {Label,Input,Container,Row,Col,Button,Form,FormGroup } from "reactstrap";
import logo from"../Images/logo-t.png";
import {Link} from "react-router-dom";
import { useState } from "react";
import { login } from "../Features/UserSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const user =useSelector((state)=> state.users.user);
  const isSuccess =useSelector((state)=> state.users.isSuccess);
  const isError = useSelector((state)=>state.users.isError);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };
  
    dispatch(login(userData))
  };
  useEffect(()=>{
    if (isError){
      navigate("/Login");
    }
    if(isSuccess){
      navigate("/");
    }else{
      navigate("/Login");
    }
  },[user,isSuccess,isError]);
  
 
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md={3}>
            <img src={logo}></img>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
            <FormGroup>
              <Label for ="email">Email</Label>
              <Input
              id="email"
              name="email"
              placeholder="Enter Emaile...."
              type="email"
              onChange={(e)=> setemail(e.target.value)}
              ></Input>
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
            <FormGroup>
              <Label for ="password">Password</Label>
              <Input
              id="password"
              name="password"
              placeholder="Enter Password...."
              type="password"
              onChange={(e)=> setpassword(e.target.value)}
              ></Input>
            </FormGroup>
            <FormGroup>
              <div className="side">
                <Input
                id="remember"
                name="remember"
                type="checkbox"
                className="checkbox"
                >
                  <Label for="remember" className="smalltext">Remember Me</Label>
                </Input>
              </div>
              <div className="smalltext side">
                <a href="">Forget Password</a>
              </div>
            </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>

            <Button
            onClick={()=>handleLogin()}
            >Login</Button>
            </Col>
          </Row>
        </Form>
        <p className="smalltext">
          No Account?<Link to="/Register">Sing Up Now..</Link>
        </p>
      </Container>
    </div>
  );
};

export default Login;
