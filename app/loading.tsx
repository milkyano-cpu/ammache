import Image from "next/image"

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Loading..."
        width={64}
        height={64}
        className="animate-pulse"
        priority
      />
    </div>
  )
}