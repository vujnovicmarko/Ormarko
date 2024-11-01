import Logo from "./Logo"
import ButtonDiv from "./ButtonDiv"
import SearchBar from "./SearchBar"

export default function Toolbar() {
  return (
    <div className="toolbar">
      <Logo></Logo>
      <SearchBar></SearchBar>
      <ButtonDiv className="toolbarbtndiv" buttons={[
        "Registracija",
        "Prijava"
      ]} btnClassName="toolbarbtn" />
    </div>
  )
}
