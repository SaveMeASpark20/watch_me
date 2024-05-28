import { Suspense, lazy } from "react"
import Upload from "../Components/Upload"

const Videos = lazy(() => import('../Videos'));

export const Admin = () => {
  return (
  <div>
    <Upload />
    <Suspense fallback={<div>Loading...</div>}>
    <Videos />
    </Suspense>
  </div>
  )
}

