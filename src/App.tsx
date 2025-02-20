import React, { useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Modal from "components/atoms/modal/Modal";
import { usePortal } from "custom-hooks/usePortal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className={styles.app}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} portalId="modal1">
        <div className={styles.modalContent}>Hello</div>
        <button onClick={() => setIsOpen2(true)}>open another modal</button>
      </Modal>
      <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)} portalId="modal2">
        <div className={styles.modalContent2}>Hello 2</div>
      </Modal>
    </div>
  );
}

export default App;
