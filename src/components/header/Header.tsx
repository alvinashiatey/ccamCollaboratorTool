import type { Component } from "solid-js/types/server";
import styles from "./Header.module.css";
import { onMount, createSignal } from "solid-js";
import { mapRange } from "../../utils/utils";

const Header: Component = () => {
  let span1Ref: HTMLSpanElement = undefined as unknown as HTMLSpanElement;
  let span2Ref: HTMLSpanElement = undefined as unknown as HTMLSpanElement;
  let span3Ref: HTMLSpanElement = undefined as unknown as HTMLSpanElement;
  let span4Ref: HTMLSpanElement = undefined as unknown as HTMLSpanElement;
  // let svgContainerRef: HTMLDivElement = undefined as unknown as HTMLDivElement;
  // const [path, setPath] = createSignal<string>("");

  // const handleSVGPath = (): string => {
  //   const svgContainerBounds = svgContainerRef?.getBoundingClientRect();
  //   const span1Bounds = span1Ref.getBoundingClientRect();
  //   const span2Bounds = span2Ref.getBoundingClientRect();
  //   const span3Bounds = span3Ref.getBoundingClientRect();
  //   const span4Bounds = span4Ref.getBoundingClientRect();
  //   return `${span1Bounds.width}
  //       ${span1Bounds.bottom / 2}
  //       ${span2Bounds.width}
  //       ${(span1Bounds.bottom / 2) * 3}
  //       ${svgContainerBounds.width - span3Bounds.width}
  //       ${span1Bounds.bottom / 2}
  //       ${svgContainerBounds.width - span4Bounds.width}
  //       ${(span1Bounds.bottom / 2) * 3}
  //       ${span1Bounds.width} ${span1Bounds.bottom / 2}`;
  // };

  // onMount(() => {
  //   setPath(handleSVGPath());
  //   window.addEventListener("resize", () => {
  //     setPath(handleSVGPath());
  //   });
  // });

  return (
    <header class={styles.Header}>
      {/* <div ref={svgContainerRef} class={styles.svg__container}>
                <svg class={styles.svg__element} width="100%" xmlns="http://www.w3.org/2000/svg">
                    <polygon points={path()} stroke="grey" stroke-width="2" fill="none"/>
                </svg>
            </div> */}
      <h1 class={styles.title}>
        <span class={styles.title__section}>
          <span ref={span1Ref}>CCAM</span>{" "}
          <span ref={span3Ref}>Collaborator</span>
        </span>
        <span class={styles.title__section}>
          <span ref={span2Ref}>Connector</span> <span ref={span4Ref}>Tool</span>
        </span>
      </h1>
    </header>
  );
};

export default Header;
