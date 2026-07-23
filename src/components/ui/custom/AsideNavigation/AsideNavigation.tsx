import { client } from "@/sanity/client";
import Link from "next/link";

import { TreatmentCategory } from "@/types/types";

const TREATMENT_CATEGORY_QUERY = `*[_type == "treatmentCategory"]{categorySlug, title, _id}`;

const options = { next: { revalidate: 30 } };

interface AsideNavigationProps {
  className: string;
  currentCategory?: string;
}

export default async function AsideNavigation({
  className,
  currentCategory,
}: AsideNavigationProps) {
  const treatmentCategories = await client.fetch<TreatmentCategory[]>(
    TREATMENT_CATEGORY_QUERY,
    {},
    options,
  );

  const updatedList = currentCategory
    ? treatmentCategories.filter(
        (category) => category.categorySlug.current !== currentCategory,
      )
    : treatmentCategories;

  return (
    <aside
      className={`h-full w-full ${className}`}
      data-testid="aside-navigation"
    >
      <h4 className="text-[24px]">Zobacz również:</h4>
      <ul>
        {updatedList.map((category) => (
          <li
            key={category._id}
            className="w-full border-b-1 border-[var(--gray-100)] px-[10px] py-[10px] pb-1 transition-all duration-150 hover:bg-[var(--magenta-100)] hover:text-white active:bg-[var(--magenta-100)] active:text-white"
          >
            <Link
              href={`/zabiegi/${category.categorySlug.current}`}
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
