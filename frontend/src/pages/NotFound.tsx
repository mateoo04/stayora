import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold">404</h1>
      <p>This page does not exist</p>
      <Link to="/">Go home</Link>
    </div>
  )
}
