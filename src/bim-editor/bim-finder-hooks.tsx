import React, { useCallback } from "react";
import { useBim } from "./bim-context";
import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
const useFinder = () => {
  const { isFragmentLoader, components } = useBim();
  const [finder, setFinder] = React.useState<OBC.ItemsFinder | null>(null);
  const [hider, setHider] = React.useState<OBC.Hider | null>(null);
  const init = React.useCallback(async () => {
    if (!components) return;
    const finder = components.get(OBC.ItemsFinder);
    const hider = components.get(OBC.Hider);
    setHider(hider);
    setFinder(finder);
  }, [components]);

  
  
  const getResult = React.useCallback(async (name: string) => {
    console.log(finder?.list.keys())
    const dynamicRegex = new RegExp(name, "i");
    finder?.create(name,[{
      categories:[dynamicRegex,new RegExp(`IFC${name.trim().toUpperCase()}`, "i") ]
    }])
    const finderQuery = finder?.list.get(name);
    console.log(finderQuery)
    if (!finderQuery) return {};
    const result = await finderQuery.test();
    console.log(result);
    hider?.isolate(result);
    // finder?.list.clear()
    return result;
  }, [finder]);



  return { getResult, init,finder };

}

export default useFinder;