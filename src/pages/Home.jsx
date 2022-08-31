import React from "react";
import Context from "../contexts/UserContext";
import LoginForm from "../components/LoginForm";
import TokenService from "../services/token-service";

class LoginPage extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  static contextType = Context;

  componentWillUnmount() {
    const { handleToken } = this.context;
    handleToken();
  }

  handleLoginSuccess = () => {
    const userId = TokenService.getUserId();
    console.log(userId)
    const { handleUpdateUserThings } = this.context;
    handleUpdateUserThings(userId);
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <section className="login-page">
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    );
  }
}

export default LoginPage;
