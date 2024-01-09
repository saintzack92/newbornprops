import styles from "../../../adminpanel/ui/dashboard/search/search.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import img from "../../../../../public/its-over-done-meme.png";
import Pagination from "../../ui/dashboard/pagination/pagination";

const UsersPage = () => {
  return (
    <div
      className={`${styles.container} p-[20px] bg-[var(--bgSoft)] rounded-[10px] mt-[20px] `}
    >
      <div className={`${styles.top} flex items-center justify-between py-[10px]`}>
        <Search placeholder="Search for a user" />
        <Link href={"adminpanel/dashboard/users/add"}>
          <button
            className={`${styles.addButton} p-[10px] bg-[#5d57c9] text-[var(--text) rounded-[10px] border-none cursor-pointer`}
          >
            {" "}
            Add New
          </button>
        </Link>
      </div>
      <table className={`${styles.table} w-[100%] *:p-[10px]`}>
        <thead className="">
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex items-center gap-[10px] py-[10px]">
                <Image
                  src={img}
                  alt=""
                  width={40}
                  height={40}
                  className={`${styles.userImage} rounded-[50%] object-cover`}
                />
                John Doe
              </div>
            </td>
            <td>john@gmail.com</td>
            <td>13.01.2022</td>
            <td>Admin</td>
            <td>Active</td>
            <td>
              <div className={`${styles.button} flex gap-[10px]`}>
                <Link href="/">
                  <button
                    className={`${styles.button} py-[5px] px-[10px] rounded-[5px] text-[var(--text)] border-none cursor-pointer bg-[teal]`}
                  >
                    View
                  </button>
                </Link>
                <button
                  className={`${styles.button} py-[5px] px-[10px] rounded-[5px] text-[var(--text)] border-none cursor-pointer bg-[crimson]`}
                >
                  Delete
                </button>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
