import React from "react";

import "./App.css";

class App extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    accept: false,
    errors: {
      username: false,
      email: false,
      password: false,
      accept: false
    },
    correct: false,
    form_correct: "Formularz uzupełniony poprawnie"
  };
  messages = {
    username_incorrect:
      "Nazwa musi być składać sie z 4 do 10 znaków. Nie może zawierać spacji",
    email_incorrect: "Brak @ w emailu",
    password_incorrect: "Hasło musi mieć 8 znaków",
    accept_incorrect: "Należy zapoznać sie z regulaminem"
  };
  handleChange = e => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({ [name]: value });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({ [name]: checked });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const validation = this.formValidation();
    if (validation.correct) {
      this.setState({
        username: "",
        email: "",
        password: "",
        accept: false,
        errors: {
          username: false,
          email: false,
          password: false,
          accept: false
        }
      });
      console.log(`Wysłany!!`);
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept
        }
      });
    }
  };
  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;
    if (
      this.state.username.length >= 4 &&
      this.state.username.length <= 10 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.password.length === 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
      this.setState({ correct });
    }
    return { correct, username, email, password, accept };
  };
  componentDidUpdate() {
    if (this.messages.form_correct !== "" && this.state.correct) {
      console.log("Coś");
      setTimeout(
        () =>
          this.setState({
            form_correct: "",
            correct: false
          }),
        3000
      );
    }
  }
  render() {
    const {
      username,
      email,
      password,
      accept,
      errors,
      correct,
      form_correct
    } = this.state;
    const {
      username_incorrect,
      email_incorrect,
      password_incorrect,
      accept_incorrect
    } = this.messages;

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="user">
            {`Nazwa: `}
            <input
              type="text"
              id="user"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {errors.username && <span>{username_incorrect}</span>}
          </label>

          <label htmlFor="email">
            {`Email: `}
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {errors.email && <span>{email_incorrect}</span>}
          </label>

          <label htmlFor="password">
            {`Hasło: `}
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {errors.password && <span>{password_incorrect}</span>}
          </label>
          <label htmlFor="accept">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              checked={accept}
              onChange={this.handleChange}
            />
            {`Zapoznałem się z regulaminem`}
            <br />
            {errors.accept && <span>{accept_incorrect}</span>}
          </label>
          <button>Zapisz się</button>
          {correct && <h3>{form_correct}</h3>}
        </form>
        {}
      </div>
    );
  }
}

export default App;
