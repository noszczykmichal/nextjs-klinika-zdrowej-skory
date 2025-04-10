import { PostDetails } from "@/types/types";
import PostCard from "./PostCard/PostCard";

interface PostsListProps {
  postsDetails: PostDetails[];
}

function PostsList({ postsDetails }: PostsListProps) {
  return (
    <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-[50px] lg:gap-[20px]">
      {postsDetails.map((post) => (
        <PostCard key={post._id} postData={post} />
      ))}
    </ul>
  );
}

export default PostsList;
