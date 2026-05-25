import React, { useCallback } from "react";
import { useBim } from "./bim-context";
import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
const useFinder = () => {
  const { isFragmentLoader, components } = useBim();
  const [finder, setFinder] = React.useState<OBC.ItemsFinder | null>(null);
  const init = React.useCallback(async () => {
    if (!components) return;
    const finder = components.get(OBC.ItemsFinder);
    finder.create("Walls & Slabs", [{ categories: [/WALL/, /SLAB/] }]);
    finder.create("Masonry Walls", [
      {
        categories: [/WALL/],
        attributes: { queries: [{ name: /Name/, value: /Masonry/ }] },
      },
    ])
    const entryLevel: FRAGS.ItemsQueryParams = {
      categories: [/BUILDINGSTOREY/],
      attributes: { queries: [{ name: /Name/, value: /Entry/ }] },
    };

    // Next, we retrieve all columns that are related
    // to any item matching the entryLevel query under the
    // relation named ContainedInStructure.
    finder.create("First Level Columns", [
      {
        categories: [/COLUMN/],
        relation: { name: "ContainedInStructure", query: entryLevel },
      },
    ]);
    setFinder(finder);
  }, [components]);

  
  
  const getResult = React.useCallback(async (name: string) => {
    console.log(finder?.list.keys())
        const hider = components?.get(OBC.Hider);

    const finderQuery = finder?.list.get(name);
    console.log(finderQuery)
    if (!finderQuery) return {};
    const result = await finderQuery.test();
    console.log(result);
    hider?.isolate(result);
    return result;
  }, [finder]);



  return { getResult, init };

}

export default useFinder;