export default function Item({ content }) {
  var maintext = content[0]
  var subtext = content[1]
  var image = content[2]

  return (
    <div className="item">
      <img className="itemimg" src={image} />
      <p className="maintext">{maintext}</p>
      <p className="subtext">{subtext}</p>
    </div>
  )
}
