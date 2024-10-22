import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/operations/AdminApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import Loader from "../common/Loader";
import { User } from "../Types/types";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (token) {
          const usersResponse = await dispatch(getAllUsers(token));
          setUsers(usersResponse.allUsers);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token, dispatch]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (!users.length) {
    return <div>No Users Found</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Profile
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Name
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Enrollment No
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User, index: number) => (
              <tr
                key={user.collegeEnrollNo}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-6">
                  <img
                    src={user.profileImage}
                    alt={`${user.name}'s Profile`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-3 px-6 text-gray-700">{user.name}</td>
                <td className="py-3 px-6 text-gray-700">
                  {user.collegeEnrollNo}
                </td>
                <td className="py-3 px-6 text-gray-700">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
