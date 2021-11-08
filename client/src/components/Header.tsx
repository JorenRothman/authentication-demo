import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";

export default function Header() {
  return (
    <header className="flex px-8 py-4 bg-white fixed w-full top-0 left-0">
      <img
        src={Logo}
        alt="Site Logo"
        width="120"
        height="30"
        className="max-h-7"
      />
      <nav className="ml-auto flex gap-4 text-indigo-600">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/protected">Protected</Link>
      </nav>
    </header>
  );
}
