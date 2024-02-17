import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import avatar from "../../../../../../public/its-over-done-meme.png";
import Image from "next/image";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/adminpanel/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/adminpanel/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/adminpanel/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/adminpanel/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/adminpanel/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/adminpanel/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/adminpanel/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/adminpanel/dashboard/settings",
        icon: <MdOutlineSettings />,
      },

      {
        title: "Help",
        path: "/adminpanel/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.user} flex items-center gap-[20px] mb-20px`}>
        <Image
          src={avatar}
          className="rounded-full"
          alt=""
          width="50"
          height="50"
        />
        <div className={`${styles.userDetail} flex flex-col object-cover`}>
          <span className={`${""} font-[500]`}>Jaenudin Ngaciro</span>
          <span className={`${""} text-[12px] text-[var(--textSoft)]`}>
            Administrator
          </span>
        </div>
      </div>
      <ul className="pt-2 list-none">
        {menuItems.map((item) => {
          return (
            <li key={item.title}>
              <span
                className={`${styles.cat} text-[var(--textSoft)] font-bold text-[13px]`}
              >
                {item.title}
              </span>
              {item.list.map((items) => {
                return <MenuLink item={items} key={items.title} className="" />;
              })}
            </li>
          );
        })}
      </ul>
      <button className="flex p-[20px] w-[100%] mt-[5px] items-center cursor-pointer rounded-[10px] gap-[10px] hover:bg-[#2e374a]">
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
