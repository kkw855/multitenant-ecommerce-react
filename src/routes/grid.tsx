import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/grid')({
  component: Grid,
})

function Grid() {
  return (
    <div className="grid grid-cols-3">
      <div className="item">A</div>
      <div className="item">B</div>
      <div className="item">C</div>
      <div className="item">D</div>
      <div className="item">E</div>
      <div className="item">F</div>
      <div className="item">G</div>
      <div className="item">H</div>
      <div className="item">I</div>
    </div>
  )
}
