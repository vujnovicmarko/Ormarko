import ButtonDiv from "../ButtonDiv"
import SearchBar from "../SearchBar"

export default function Toolbar() {
  return (
    <div className="toolbar">
      <div className="logo-container">
        <a href="/">
          <img className="logo" src="../public/OrmarkoLogo.png" alt="Logo"/>
        </a>
      </div>
      <SearchBar></SearchBar>
      <ButtonDiv className="toolbarbtndiv" buttons={[
        "Registracija",
        "Prijava"
      ]} btnClassName="toolbarbtn" />
    </div>
  )
}
