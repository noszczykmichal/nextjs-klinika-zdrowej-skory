import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

import { BreadcrumbPostPage } from "@/components/BlogPage/Category/PostPage/BreadcrumbPostPage/BreadcrumbPostPage";
import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";
import { PostDetails } from "@/types/types";
import Post from "@/components/BlogPage/Category/PostPage/Post/Post";

const POST_QUERY = `*[_type == "post" && slug.current == $slug]{mainImage, title, publishedAt, category->{title, categorySlug}}[0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<PostDetails>(
    POST_QUERY,
    await params,
    options
  );

  const { mainImage, title: postTitle, category } = post;
  const postImageUrl = mainImage ? urlFor(mainImage)!.fit("max").url() : null;

  const { title: categoryTitle, categorySlug } = category;
  const publishAt = new Date(post.publishedAt).toLocaleDateString();

  return (
    <>
      <BreadcrumbPostPage
        postSlug={postTitle}
        categoryTitle={categoryTitle}
        categorySlug={categorySlug.current}
        className="w-full max-w-[1300px] flex py-[20px] px-[25px] md:px-[42px] mx-auto"
      />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <PostPageBanner
            headerText={postTitle}
            publishDate={publishAt}
            imageUrl={postImageUrl}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
            <aside className="bg-red-900"></aside>
            <Post postDetails={post} />
          </div>
        </section>
      </main>
    </>
  );
}
