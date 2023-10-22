import { useLayoutEffect, useState } from "react";

const queries = ["(max-width: 768px)", "(min-width: 769px) and (max-width: 882px)"];

const UseMatchMedia = () => {
  const mediaQueriesLists = queries.map((query) => matchMedia(query));

  const getValues = () => mediaQueriesLists.map((mql) => mql.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueriesLists.forEach((mql) => mql.addEventListener("change", handler));

    return () => mediaQueriesLists.forEach((mql) => mql.removeEventListener("change", handler));
  });

  return ["isMobile", "isTablet"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {},
  );
};

export default UseMatchMedia;
