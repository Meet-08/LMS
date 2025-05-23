import { useSelector } from "react-redux";
import { RootState } from "../hooks/hooks";
import Header from "../layouts/Header";
import { formateDate } from "../constants/dateformetter";

const Users = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const filteredUsers = users && users.filter((user) => user.role === "USER");

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Registered Users
          </h2>
        </header>

        {filteredUsers && filteredUsers.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-center">
                    No. of Books Borrowed
                  </th>
                  <th className="px-4 py-2 text-center">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.email}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role?.toLowerCase()}</td>
                    <td className="px-4 py-2 text-center">
                      {user.borrowedBooks?.length}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {formateDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">
            No registered users found in library.
          </h3>
        )}
      </main>
    </>
  );
};
export default Users;
