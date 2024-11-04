import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <img className="logo" src="../public/OrmarkoLogo.png" alt="Logo" />
    </Link>
  );
}
