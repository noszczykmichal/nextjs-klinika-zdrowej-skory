import { client } from "@/sanity/client";
import Link from "next/link";

import { TreatmentGroup } from "@/types/types";

const TREATMENT_GROUP_QUERY = `*[_type == "treatmentGroup"]{groupSlug, title, _id}`;

const options = { next: { revalidate: 30 } };

interface TreatmentGroupsMenuProps {
  className: string;
}

export default async function TreatmentGroupsMenu({
  className,
}: TreatmentGroupsMenuProps) {
  const treatmentGroups = await client.fetch<TreatmentGroup[]>(
    TREATMENT_GROUP_QUERY,
    {},
    options
  );

  return (
    <aside className={`w-full h-full ${className}`}>
      <h4 className="text-[24px]">Zobacz również:</h4>
      <ul>
        {treatmentGroups.map((group) => (
          <li
            key={group._id}
            className="w-full py-[10px] px-[10px] border-b-1 border-[var(--gray-100)] pb-1 hover:bg-[var(--gray-100)] hover:text-white"
          >
            <Link
              href={`/zabiegi/${group.groupSlug.current}`}
              className="block w-full"
            >
              {group.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
