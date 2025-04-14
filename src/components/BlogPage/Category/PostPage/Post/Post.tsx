import { PostDetails } from "@/types/types";

interface PostProps {
  postDetails: PostDetails;
}

export default function Post({ postDetails }: PostProps) {
  const { title } = postDetails;

  return <article className="bg-green-900"></article>;
}
