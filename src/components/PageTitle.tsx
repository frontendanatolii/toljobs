import { Divider } from "./Divider";

export function PageTitle({ title }: { title: string }) {
  return (
    <div className="my-2">
      <h1 className="text-xl my-1">
        <b>{title}</b>
        <Divider />
      </h1>
    </div>
  )
}