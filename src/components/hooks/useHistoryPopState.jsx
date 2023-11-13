import { useEffect } from "react";

const useHistoryPopState = (func) => {
  useEffect(() => {
    const popState = () => {
      func();
    };
    window.addEventListener("popstate", popState);
    return () => {
      window.removeEventListener("popstate", popState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHistoryPopState;
