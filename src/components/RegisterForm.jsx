import { useState } from 'react'
import BookService from './BookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, Button, Alert, Row} from 'react-bootstrap';  
import PropTypes from 'prop-types';

const RegisterForm = ({handleLogIn}) => {
  
  const [newUser, setNewUser] = useState([])
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('');

  
  const handleErrors = () => {
    const currentErrors = {}
    if(email.length < 5 ) {
      currentErrors.email = "Email must include at least 5 letters or email already exist"
    }
   
    if(name.length < 1) {
      currentErrors.name = "Name must include at least 1 letter"
    }
    if(password.length < 5) {
      currentErrors.password = "Password maust include at least 5 letetrs"
    }
    setErrors(currentErrors)
      return(
        currentErrors
      )
  }
  const handleSubmit = (event) => {
    event.preventDefault()
   
    const errors = handleErrors()
    if(Object.values(errors).length > 0) {

      console.log(errors);
      return
    }
    addUser(email, name, password)
    handleLogIn(email, password)
    const userInfo = {email:email, name:name, password:password}
    console.log(userInfo);
  }
  
  const addUser = (email, name, password) => {

    const userInfo = {
      name: name,
      email: email,
      password: password
    }
    BookService
      .create(userInfo)
       .then(returnedUser => {
       setNewUser([...newUser, returnedUser])
       setSuccessMessage('Registration Successful!');
      })
      .catch(error => {

        console.error('Error creating user:', error);
      });
  }
  
  return (
    <div className="bg">
      <Container sm={12} md={12} lg={12} xl={12} className="containerStyle">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row  className="rowStyle">
            <Form.Group sm={12} md={12} lg={12} xl={12}>
              <Form.Label >Email</Form.Label>
              <Form.Control
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              isInvalid={!!errors.email}
              />
              {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
            </Form.Group>
          </Row >
          <Row className="rowStyle">
            <Form.Group >
              <Form.Label >Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                isInvalid={!!errors.name}
                />
              {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
          <Row className="rowStyle">
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                isInvalid={!!errors.password}
                />
              {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
            <Button className="buttonSubmit" variant="success" type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  )
}

RegisterForm.propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  baseUrl: PropTypes.string,
  currentUser: PropTypes.object
};


export default RegisterForm
