import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert, Row } from 'react-bootstrap';  

const UserLoginForm = ({handleLogIn, currentUser}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('');

  const handleErrors = () => {
    const currentErrors = {}
    if(email.length < 5) {
      currentErrors.email = "Email must include at least 5 letters"
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
      // do not anything if found errors
      console.log(errors);
      return
    } else {

      handleLogIn(email, password)
      const userInfo = {email:email, password:password}
      console.log(userInfo);
      setSuccessMessage('Welcome ');
    }

  } 
  return (
    <div className="bg">
    <Container   className="containerStyle">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row  className="rowStyle" >
            <Form.Group sm={12} md={12} lg={12} xl={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                isInvalid={!!errors.email}
                />
              {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
            </Form.Group >
          </Row>
          <Row className="rowStyle">
            <Form.Group >
              <Form.Label >Password</Form.Label>
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
            <Button className="buttonSubmit" variant="success" type="submit"  >
              Submit
            </Button>
        </Form>
    </Container>
  </div>

  )
}




export default UserLoginForm