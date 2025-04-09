import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { BreadcrumbPostPage } from "@/components/BlogPage/Category/PostPage/BreadcrumbPostPage/BreadcrumbPostPage";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
// const builder = imageUrlBuilder(client);

// console.log("POST PAGE, projectID", projectId);
// console.log("POST PAGE, dataSet", dataset);

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// const urlFor = (source: SanityImageSource) => builder.image(source);

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //pytanei o wszytskie dane posta i tutja znowu fetchowanie categorii i to dopiero
  //do breadcrumb'a

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  // console.log("post await client fetch", post);
  // console.log("[postImage:]", postImageUrl);

  return (
    <>
      {/* <BreadcrumbPostPage /> */}
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <Link href="/blog" className="hover:underline">
            ← Back to posts
          </Link>
          {postImageUrl && (
            <img
              src={postImageUrl}
              alt={post.title}
              className="aspect-video rounded-xl"
              width="550"
              height="310"
            />
          )}
          <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
          <div className="prose">
            <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
            {Array.isArray(post.body) && <PortableText value={post.body} />}
          </div>
        </section>
      </main>
    </>
  );
}
