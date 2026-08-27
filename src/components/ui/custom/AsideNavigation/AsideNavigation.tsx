import Link from "next/link";

import { getCategoriesNavData } from "@/utils/sanityPageData";
import { ResourceType } from "@/types/types";

interface AsideNavigationProps {
  className?: string;
  currentCategory?: string;
  resourceType: ResourceType;
}

export default async function AsideNavigation({
  className,
  currentCategory,
  resourceType,
}: AsideNavigationProps) {
  const resourceCategories = await getCategoriesNavData(resourceType);

  const filteredList = currentCategory
    ? resourceCategories.filter(
        (category) => category.categorySlug.current !== currentCategory,
      )
    : resourceCategories;

  const mainRoute = resourceType === "treatment" ? "zabiegi" : "szkolenia";

  return (
    <aside
      className={`h-full w-full ${className}`}
      data-testid="aside-navigation"
    >
      <h4 className="text-[24px]">Zobacz również:</h4>
      <ul>
        {filteredList.map((category) => (
          <li
            key={category._id}
            className="w-full border-b-1 border-[var(--gray-100)] px-[10px] py-[10px] pb-1 transition-all duration-150 hover:bg-[var(--magenta-100)] hover:text-white active:bg-[var(--magenta-100)] active:text-white"
          >
            <Link
              href={`/${mainRoute}/${category.categorySlug.current}`}
              className="block w-full"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
