import { type FC } from "react";

import { api } from "~/utils/api";
import { usePlaces } from "~/utils/usePlaces";
import Map from "../Map";
import { Search } from "../Search";

const HomeLayout: FC = () => {
  const { place } = usePlaces();

  const summary = api.summary.prompt.useQuery(
    { destination: place?.name ?? "" },
    {
      enabled: !!place?.name,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  return (
    <div className="relative flex h-screen w-full">
      <div className="absolute left-0 z-10 h-screen w-72 bg-slate-50">
        <h1 className="p-4 text-xl font-bold text-gray-700 dark:text-blue-100">
          {summary.data
            ? summary.data.generalInfo.history
            : "No place selected"}
        </h1>
      </div>

      <div className="centered absolute top-10 z-10">
        <Search />
      </div>

      <Map />
    </div>
  );
};

export default HomeLayout;
