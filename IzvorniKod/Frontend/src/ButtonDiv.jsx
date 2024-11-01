export default function ButtonDiv({ className, buttons, btnClassName }) {
  return (
    <div className={className}>
      {buttons.map((btnText, index) => (
        <button className={btnClassName} key={index}>{btnText}</button>
      ))}
    </div>
  )
}

