import { client } from "@/sanity/client";
import { PostDetails, CategoryDetails } from "@/types/types";
import ImageCard from "./ImageCard/ImageCard";
import PostSummary from "./PostSummary/PostSummary";

interface PostListItemProps {
  postData: PostDetails;
}

const CATEGORY_QUERY = (searchCategoryRef: string) =>
  `*[_type=="category" && _id=="${searchCategoryRef}"][0]{title, categorySlug}`;

const options = { next: { revalidate: 30 } };

export default async function PostListItem({ postData }: PostListItemProps) {
  const { category: postCategory } = postData;

  const categoryDetails = await client.fetch<CategoryDetails>(
    CATEGORY_QUERY(postCategory._ref),
    {},
    options
  );

  return (
    <li className="grid gap-[50px] lg:gap-[100px] md:grid-cols-[1fr_2fr] place-items-start border-b-1 border-[var(--gray-75)] py-[50px]">
      <ImageCard postData={postData} categoryData={categoryDetails} />
      <PostSummary postData={postData} categoryData={categoryDetails} />
    </li>
  );
}
