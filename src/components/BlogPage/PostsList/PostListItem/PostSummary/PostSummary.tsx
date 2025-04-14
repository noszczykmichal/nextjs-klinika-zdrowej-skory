import { PostDetails, CategoryDetails } from "@/types/types";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface PostSummaryProps {
  postData: PostDetails;
  categoryData: CategoryDetails;
}

export default function PostSummary({
  postData,
  categoryData,
}: PostSummaryProps) {
  const { title, summary, slug } = postData;
  const { categorySlug } = categoryData;

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-[17px] lg:text-[22px] font-medium">{title}</h3>
      <p className="text-justify text-[15px]">{summary}</p>
      <StyledButton
        href={`/blog/${categorySlug.current}/${slug.current}`}
        text="Więcej"
      />
    </div>
  );
}
