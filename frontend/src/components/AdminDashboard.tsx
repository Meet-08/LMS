import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { RootState, useAuth } from "../hooks/hooks";
import { useSelector } from "react-redux";
import { useFetchAllBooksQuery } from "../store/api/bookApi";
import { useGetAllBorrowedBooksQuery } from "../store/api/borrowApi";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";
import Header from "../layouts/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const { users } = useSelector((state: RootState) => state.user);
  const { data: books } = useFetchAllBooksQuery();
  const { data: allBorrowedBooks } = useGetAllBorrowedBooksQuery();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users?.filter((user) => user.role === "USER").length;
    let numberOfAdmin = users?.filter((user) => user.role === "ADMIN").length;

    setTotalUsers(numberOfUsers || 0);
    setTotalAdmin(numberOfAdmin || 0);

    let totalBorrowed = allBorrowedBooks?.filter(
      (book) => !book.returned
    ).length;

    let totalReturned = allBorrowedBooks?.filter(
      (book) => book.returned
    ).length;

    setTotalBorrowedBooks(totalBorrowed || 0);
    setTotalReturnedBooks(totalReturned || 0);
    setTotalBooks(books?.length || 0);
  }, [users, allBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3E3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:items-center xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-[4] flex items-end w-full content-center">
            <Pie
              data={data}
              options={{ cutout: 0 }}
              className="mx-auto lg:mx-0 w-full h-auto"
            />
          </div>
          <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
            <img
              src={logo}
              alt="logo"
              className="w-auto xl:flex-1 rounded-lg"
            />
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#3D3E3D]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#151619]"></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-[4] flex-col gap-7 lg:py-5 justify-center xl:min-h-[85.5vh]">
          <div className="flex flex-col-reverse lg:flex-row gap-7 flex-[4]">
            <div className="flex flex-col flex-1 gap-5">
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                <span className="min-w-20 flex justify-center items-center rounded-lg bg-gray-300 h-20">
                  <img src={usersIcon} alt="usersIcon" className="size-8" />
                </span>
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl">{totalUsers}</h4>
                  <p className="font-light text-gray-700 text-sm">
                    Total Users
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                <span className="min-w-20 flex justify-center items-center rounded-lg bg-gray-300 h-20">
                  <img src={bookIcon} alt="bookIcon" className="size-8" />
                </span>
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl">{totalBooks}</h4>
                  <p className="font-light text-gray-700 text-sm">Total Book</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                <span className="min-w-20 flex justify-center items-center rounded-lg bg-gray-300 h-20">
                  <img src={adminIcon} alt="adminIcon" className="size-8" />
                </span>
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-black text-3xl">{totalAdmin}</h4>
                  <p className="font-light text-gray-700 text-sm">
                    Total Admin
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row flex-1">
              <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
                <div className="bg-white p-5 rounded-lg shadow-lg h-full flex flex-col justify-center items-center gap-4">
                  <img
                    src={(user && user.avatarUrl) || ""}
                    alt="avatar"
                    className="rounded-full size-32 object-cover"
                  />
                  <h2 className="text-xl 2xl:text-2xl font-semibold text-center">
                    {user && user.name}
                  </h2>
                  <p className="text-gray-600 text-sm 2xl:text-base text-center">
                    Welcome to your admin dashboard. Here you can manage all
                    settings and monitor the statistics
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] justify-center items-center rounded-2xl">
            <h4 className="overflow-y-hidden">
              "Embark on the journey of reading fosters personal growth,
              nurturing a path towards excellence and the refinement of
              character."
            </h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[75px] bottom-[10px]">
              ~BookWorm Team
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default AdminDashboard;
