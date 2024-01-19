import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import img from "../../../../../../public/7.jpg";
import Image from "next/image";

const AddProductPage = () => {
  return (
    <div
      className={`${styles.container} bg-[var(--bgSoft)] p-[20px] rounded-[10px] mt-[20px]`}
    >
      <form className={`${styles.form} flex has-[a]:bg-red-500 `}>
        <input type="text" placeholder="title" name="title" required />
        <select name="cat" id="cat" className={`${styles.formChild}`}>
          <option value="general">Choose a Category</option>
          <option value="computer">Computer</option>
          <option value="tv">TV</option>
          <option value="keyboard">Keyboard</option>
          <option value="modem">Modem</option>
        </select>
        <input
          type="number"
          placeholder="price"
          name="price"
          required
          className={`${styles.formChild}`}
        />
        <input
          type="number"
          placeholder="stock"
          name="stock"
          required
          className={`${styles.formChild}`}
        />
        <input
          type="text"
          placeholder="color"
          name="color"
          required
          className={`${styles.formChild}`}
        />
        <input
          type="text"
          placeholder="size"
          name="size"
          required
          className={`${styles.formChild}`}
        />
        <textarea
          name="desc"
          id="desc"
          rows="16"
          placeholder="description"
          className={`${styles.formChild}`}
        ></textarea>
        <button type="submit"></button>
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
            <span class="group-hover/edit:text-yellow-700 group-hover/edit:font-bold">Call</span>
            <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-red-500 group-hover/edit:bg-[yellow]">
            </svg>
          </a>
        </li>
        {`/each`}
      </ul>
    </div>
  );
};

export default AddProductPage;
