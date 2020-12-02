import "./App.css";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import FriendsScreen from "./screens/FriendsScreen";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import SearchScreen from "./screens/SearchScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/friends" component={FriendsScreen} />
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/search" component={SearchScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
