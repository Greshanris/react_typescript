import type { JSX } from "react"


function Card({ children }: {children: JSX.Element}) {
  return (
    <div>
      Card
      {children}
    </div>
  )
}

export default Card
