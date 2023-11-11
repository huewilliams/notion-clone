import {PropsWithChildren} from "react";

export default function Layout({children}: PropsWithChildren) {
  return (
    <>
      <div>Layout</div>
      <main>{children}</main>
    </>
  )
}
