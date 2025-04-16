import { ParagraphContent } from "@/types/types";

interface ParagraphProps {
  paragraphData: ParagraphContent;
}

export default function Paragraph({ paragraphData }: ParagraphProps) {
  const { paragraphTitle, content } = paragraphData;

  return (
    <>
      <h4 className="font-semibold pb-[16px]">{paragraphTitle}</h4>
      <p className="pb-[16px]">{content}</p>
    </>
  );
}
