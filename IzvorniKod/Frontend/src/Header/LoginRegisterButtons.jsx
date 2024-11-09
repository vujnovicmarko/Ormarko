import { Link } from "react-router-dom";

export default function LoginRegisterButtons({
  className,
  buttons,
  btnClassName,
}) {
  const buttonRoutes = {
    Registracija: "/register",
    Prijava: "/login",
  };
  return (
    <div className={className}>
      {buttons.map((btnText, index) => (
        <Link to={buttonRoutes[btnText]} key={index}>
          <button className={btnClassName} key={index}>
            {btnText}
          </button>
        </Link>
      ))}
    </div>
  );
}
