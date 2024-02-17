import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import img from "../../../../../../public/7.jpg";
import Image from "next/image";

const AddUserPage = () => {
  return (
    <div
      className={`${styles.container} bg-[var(--bgSoft)] p-[20px] rounded-[10px] mt-[20px] `}
    >
      <form  
      action=""
      className={`${styles.form} flex flex-wrap justify-between`}>
        <input
          type="text"
          placeholder="username"
          name="username"
          required
          className={`${styles.formChild} ${styles.formChildInput} `}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          className={`${styles.formChild} ${styles.formChildInput} `}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          className={`${styles.formChild} ${styles.formChildInput} `}
        />
        <input
          type="phone"
          placeholder="phone"
          name="phone"
          className={`${styles.formChild} ${styles.formChildInput} `}
        />
        <select name="isAdmin" id="isAdmin" className={`${styles.formChild} ${styles.formChildInput}`}>
          <option value={false} selected>Is Admin?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive" className={`${styles.formChild} ${styles.formChildInput}`}>
          <option value={false} selected>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        
        <textarea
          name="address"
          id="address"
          rows="16"
          placeholder="Address"
          className={`${styles.formChild} w-[100%] p-[30px]`}
        ></textarea>
        <button type="submit" className={` w-[100%] p-[30px] !bg-[teal] !text-[var(--text)] !rounded-[5px] cursor-pointer ${styles.formChild}`}>
          Submit
        </button>
      </form>
      <ul role="list">
        <li class="group/item hover:bg-indigo-100 ...">
          <Image src={img} alt="" width={40} height={40} />
          <div className="text-[green]">
            <a href="{person.url}">{`person.name`}</a>
            <p>{`person.title`}</p>
          </div>
          <a
            class="group/edit invisible hover:bg-indigo-200 group-hover/item:visible group-hover/item:rounded-[50px] flex group-hover/item:scale-[80%] group-hover/item:duration-[2000ms] group-hover/item:ease-out group-hover/item:infinite"
            href="tel:bambang"
          >
            <span class="group-hover/edit:text-yellow-700 group-hover/edit:font-bold">
              Call
            </span>
            <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-red-500 group-hover/edit:bg-[yellow]"></svg>
          </a>
        </li>
        {`/each`}
      </ul>
    </div>
  );
};

export default AddUserPage;
