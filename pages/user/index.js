import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/Routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className='text-center p-5 mb-4 '>User Dashboard</h1>
    </UserRoute>
  );
};

export default UserIndex;
