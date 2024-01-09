import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";

const AddProductPage = () => {
  return (
    <div>
      <form>
        <input type='text' placeholder='title' name='title' required/>
        <select>
            <option value='phone'>Phone</option>
            <option value='computer'>Computer</option>
            <option value='tv'>TV</option>
            <option value='keyboard'>Keyboard</option>
            <option value='modem'>Modem</option>
        </select>
      </form>
    </div>
  );
};

export default AddProductPage