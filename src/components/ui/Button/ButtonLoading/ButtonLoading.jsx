import Loader from "../../Loader/Loader";
import LoaderWrapper from "../../LoaderWrapper/LoaderWrapper";
const ButtonLoading = ({ loading }) => {
  return (
    <LoaderWrapper center>
      <Loader height={"18"} width={"18"} visible={loading} />
    </LoaderWrapper>
  );
};
export default ButtonLoading;
