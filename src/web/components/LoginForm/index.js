import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'react-final-form';

/* eslint-disable react/prop-types */
const MyTextField = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
);
/* eslint-disable react/prop-types */

const styles = theme => ({
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 'auto',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginForm = ({ onAuth, classes }) => {
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form
          onSubmit={({ name }) => onAuth({ name })}
          validate={validate}
          render={({ handleSubmit, reset, valid, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="name" component={MyTextField} type="text" label="Name" />
              </div>
              <div>
                <Field name="password" component={MyTextField} type="text" label="Password" />
              </div>
              <div className={classes.submit}>
                <Button color="primary" type="submit" variant="contained" disabled={!valid}>
                  Submit
                </Button>
                <Button type="button" onClick={reset} disabled={pristine}>
                  Reset
                </Button>
              </div>
            </form>
          )}
        />
      </Paper>
    </main>
  );
};

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onAuth: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginForm);
