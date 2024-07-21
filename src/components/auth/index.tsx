const AuthPage = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

export default AuthPage;

const Register = () => {
  return <div>Register</div>;
};

const Login = () => {
  return <div>Login</div>;
};
