import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../Features/UserSlice";
import { Button, Container, Row, Col } from "reactstrap";

const UpdateUser = () => {
  const { user_email, user_name, user_password } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [name, setName] = useState(user_name || "");
  const [email] = useState(user_email || ""); 
  const [password, setPassword] = useState(user_password || "");


  const handleUpdate = () => {
    const userData = {
      email: email, 
      name: name,
      password: password,
    };

    dispatch(updateUser(userData));
    alert("User updated successfully!");

 
    navigate("/register");
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col lg="6">
          <h2 className="text-center">Update User</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input type="email" className="form-control" value={email} disabled />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button color="primary" className="mt-3" onClick={handleUpdate}>
            Update User
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;
