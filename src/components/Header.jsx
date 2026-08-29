import styles from "./Header.module.css";

function Header() {
  return (
    <>
          <div className={styles.container}>
              <h1>Contact App</h1>
        <p>
          <a href="#">Botostart </a>| React full coursre
        </p>
      </div>
    </>
  );
}

export default Header;
