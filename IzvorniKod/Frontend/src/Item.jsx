export default function Item({ content }) {
  const [title, category, image] = content;

  return (
    <div className="item">
      <img className="itemimg" src={image} />
      <p className="maintext">{maintext}</p>
      <p className="subtext">{subtext}</p>
    </div>
  );
}
