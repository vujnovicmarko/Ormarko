export default function SearchBar() {
  return (
    <form className="searchbar" action="">
      <input className="searchinput" type="text" />
      <button className="searchbtn" type="submit">
        <img src="../public/SearchIcon.svg" />
      </button>
    </form>
  );
}
