import { useLoader } from "../store";

const useFetcher = () => {
  const [_, setLoader] = useLoader();
  const requestInitiator = async (cb) => {
    setLoader(true);
    const response = cb();
    setTimeout(() => {
      setLoader(false);
    }, 500);
    return response;
  };

  return {
    requestInitiator,
  };
};

export default useFetcher();
