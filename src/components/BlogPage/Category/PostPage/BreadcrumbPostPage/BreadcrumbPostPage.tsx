import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbPostPageProps {
  className: string;
  postSlug: string;
  categoryTitle: string;
  categorySlug: string;
}

export function BreadcrumbPostPage({
  className,
  postSlug,
  categoryTitle,
  categorySlug,
}: BreadcrumbPostPageProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="breadcrumb-list__post-page">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Klinika</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/blog/${categorySlug}`}
            className="whitespace-nowrap"
          >
            {categoryTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="breadcrumb__post-page max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap">
            {postSlug}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
