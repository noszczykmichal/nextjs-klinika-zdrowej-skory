import { PostDetails } from "@/types/types";
import PostCard from "./PostCard/PostCard";

interface PostsListProps {
  postsDetails: PostDetails[];
}

function PostsList({ postsDetails }: PostsListProps) {
  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[50px]">
      {postsDetails.map((post) => (
        <PostCard key={post._id} postData={post} />
      ))}
    </ul>
  );
}

export default PostsList;
