import './App.css';

function App() {
  return (
    <div className="initialScreen">
      <h1>Welcome!</h1>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="loginInput" className="label__userlog">
            who are u
          </label>
        </h2>
        <input
          placeholder="username"
          type="text"
          id="loginInput"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <div>
        <input
          placeholder="password"
          type="text"
          id="loginInput"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        </div>
        <div>
        <button type="submit" className="btn btn__primary btn__lg">
          Login
        </button>
        </div>
      </form>
    </div>
  );
}

export default App;
