function Card({ name, count = 2}: {name: string, count: number}) {
  return (
    <div>
      Card
      {count}
      {name}
    </div>
  )
}

export default Card
