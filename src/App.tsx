import type { Component } from 'solid-js';
import HeaderComp from "./components/header/Header";

import styles from './App.module.css';
import Collaborator from "./components/collab/Collaborator";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <HeaderComp />
        <main>
            <Collaborator />
        </main>
    </div>
  );
};

export default App;
