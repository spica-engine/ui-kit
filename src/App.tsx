import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Modal from "components/atoms/modal/Modal";

function App() {
  return (
    <div className={styles.app}>
      <button
        style={{ position: "absolute", top: "10px", width: "200px", backgroundColor: "red" }}
        onClick={() => {
          alert("Modal opened");
        }}
      ></button>
      <Modal
        overflow={false}
        style={{ marginTop: "100px" }}
        onClose={() => console.log("Modal closed")}
        animation="growFromCenter"
      >
        <Modal.Body>
          <div>
            <img src={logo} className={styles.logo} alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className={styles.link}
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
          <div>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis necessitatibus esse
              nulla, tenetur quae voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam
              deleniti, accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae
              voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti,
              accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae voluptas
              molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti, accusantium saepe
              quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Omnis necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit
              iste itaque adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam
              temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit iste itaque
              adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam temporibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis necessitatibus esse
              nulla, tenetur quae voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam
              deleniti, accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae
              voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti,
              accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae voluptas
              molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti, accusantium saepe
              quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Omnis necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit
              iste itaque adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam
              temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit iste itaque
              adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam temporibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis necessitatibus esse
              nulla, tenetur quae voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam
              deleniti, accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae
              voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti,
              accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae voluptas
              molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti, accusantium saepe
              quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Omnis necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit
              iste itaque adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam
              temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit iste itaque
              adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam temporibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis necessitatibus esse
              nulla, tenetur quae voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam
              deleniti, accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae
              voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti,
              accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae voluptas
              molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti, accusantium saepe
              quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Omnis necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit
              iste itaque adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam
              temporibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
              necessitatibus esse nulla, tenetur quae voluptas molestiae ea, impedit iste itaque
              adipisci qui quibusdam deleniti, accusantium saepe quis dicta laboriosam temporibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis necessitatibus esse
              nulla, tenetur quae voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam
              deleniti, accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae
              voluptas molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti,
              accusantium saepe quis dicta laboriosam temporibus. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Omnis necessitatibus esse nulla, tenetur quae voluptas
              molestiae ea, impedit iste itaque adipisci qui quibusdam deleniti, accusantium saepe
              quis dicta laboriosam temporibus.
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
