import Image from "next/image";

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/southern-pallet-logo.svg" alt="Southern Pallet Company Logo" width={48} height={48} className="w-full h-full object-contain" />
    </div>
  )
}
