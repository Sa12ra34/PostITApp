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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePost } from "../Features/PostSlice";


const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const email = useSelector((state) => state.users.user.email);
  const handlePost = async () => {
  
    if (!postMsg.trim()) {
      alert("Post message is required."); 
      return; 
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };

    dispatch(savePost(postData));
setpostMsg(""); 

  };


  
return (
    <Container>
      <Row>
        <Col>
        <Input 
        id="share"
        name="share"
        placeholder="share your thoughts..."
        type="textarea"
        value={postMsg}
        onChange={(e) => setpostMsg(e.target.value)}/>
          
        <Button onClick={()=> handlePost()}>PostIT</Button>
        </Col>

      </Row>
    </Container>

  );
};

export default SharePosts;
