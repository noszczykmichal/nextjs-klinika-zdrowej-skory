import { PostDetails } from "@/types/types";
import PostListItem from "./PostListItem/PostListItem";

interface PostsListProps {
  postsDetails: PostDetails[];
}

function PostsList({ postsDetails }: PostsListProps) {
  return (
    <ul className="w-full max-w-[500px] md:max-w-none mx-auto ">
      {postsDetails.map((post) => (
        <PostListItem key={post._id} postData={post} />
      ))}
    </ul>
  );
}

export default PostsList;
