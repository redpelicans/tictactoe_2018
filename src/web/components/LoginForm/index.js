import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Jumbotron, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { BeforeInput } from '../Widgets';

class MyForm extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  isUsernameValid = username => !!username.match(/^.{3,30}$/);
  isPasswordValid = password => !!password.match(/^.{3,30}$/);

  isFormIncomplete = () => {
    const { username, password } = this.state;

    if (this.isUsernameValid(username) === false || this.isPasswordValid(password) === false) {
      return true;
    }
    return false;
  };

  checkAuth = e => {
    const { username, password } = this.state;
    e.preventDefault();

    if (this.isFormIncomplete() === false) {
      this.props.onAuth({ username, password });
    }
  };

  checkUsername = () => {
    const { username } = this.state;

    if (this.isUsernameValid(username)) return 'success';
    else if (username.length > 30) return 'error';
    return null;
  };

  checkPassword = () => {
    const { password } = this.state;

    if (this.isPasswordValid(password)) return 'success';
    else if (password.length > 30) return 'error';
    return null;
  };

  render() {
    const { username, password } = this.state;

    return (
      <Grid>
        <Row>
          <Col md={4} xs={12} />
          <Col md={4} xs={12}>
            <Jumbotron className="content">
              <form onChange={this.handleChange} className="myForm" onSubmit={this.checkAuth}>
                <FormGroup validationState={this.checkUsername()}>
                  <InputGroup>
                    <BeforeInput glyph="user" />
                    <FormControl type="text" value={username} name="username" placeholder="username" />
                  </InputGroup>
                </FormGroup>
                <FormGroup validationState={this.checkPassword()}>
                  <InputGroup>
                    <BeforeInput glyph="lock" />
                    <FormControl type="password" value={password} name="password" placeholder="password" />
                  </InputGroup>
                </FormGroup>
                <Button type="submit" disabled={this.isFormIncomplete()}>
                  Send
                </Button>
              </form>
            </Jumbotron>
          </Col>
          <Col md={4} xs={12} />
        </Row>
      </Grid>
    );
  }
}

MyForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

export default MyForm;
