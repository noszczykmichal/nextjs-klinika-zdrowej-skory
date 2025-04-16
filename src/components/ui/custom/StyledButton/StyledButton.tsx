import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StyledButtonProps {
  href: string;
  text: string;
}

export default function StyledButton({ href, text }: StyledButtonProps) {
  return (
    <Link href={href}>
      <Button className="px-1 xxs:px-6 bg-transparent border-1 border-[var(--black-100)] text-[(--black-100)] rounded-[var(--medium-border-radius)] rounded-bl-none rounded-tr-none before:content-[''] before:w-[14px] before:bg-[var(--black-100)] before:h-[1px] hover:text-white hover:before:bg-white hover:cursor-pointer transition-all duration-75">
        « {text}
      </Button>
    </Link>
  );
}
