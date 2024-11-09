export default function Item({ content }) {
  const { title, img, category, season, howCasual, mainColor, sideColor, descript } = content || {};

  if (!content) {
        return <div>Invalid item data</div>;
  }
  return (
        <div className="item">
          <img src={`data:image/png;base64,${img}`} alt={title} />
          <h3>{title}</h3>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Season:</strong> {season}</p>
          <p><strong>Style:</strong> {howCasual}</p>
          <p><strong>Main Color:</strong> {mainColor}</p>
          <p><strong>Accent Color:</strong> {sideColor}</p>
          <p><strong>Description:</strong> {descript}</p>
        </div>
      );
}
