<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Medallero from "./components/Medallero.svelte";
  import DebugScroller from "./components/DebugScroller.svelte";
  import Loremipsum from "./components/Loremipsum.svelte";

 
  /* Variables para el scroller1 */
  let count;
  let index;
  let offset;
  let progress;
  let top = 0.1;
  let threshold = 0.5;
  let bottom = 0.9;

  /* Variables para el scroller 2 */
  let count2;
  let index2;
  let offset2;
  let progress2;
  let top2 = 0.1;
  let threshold2 = 0.5;
  let bottom2 = 0.9;

    /* Charts */
    let charts = [
    "img1.png",
    "img2.png",
    "img3.png",
    "img4.png",
    "img5.png"
  ];

  /* Variable para el index */
  //let index = 0; // Índice inicial para las imágenes

  /* Función para cambiar el índice */
  function changeImage(newIndex) {
    index = newIndex;
  }
</script>

<main>
  <div class="image_container">
    <img src="{charts[index]}" alt="Chart {index + 1}" class="chart_image" />
  </div>

  <div class="button_container">
    <button on:click={() => changeImage(0)}>Imagen 1</button>
    <button on:click={() => changeImage(1)}>Imagen 2</button>
    <button on:click={() => changeImage(2)}>Imagen 3</button>
    <button on:click={() => changeImage(3)}>Imagen 4</button>
    <button on:click={() => changeImage(4)}>Imagen 5</button>
  </div>

</main>
<style>
  .image_container {
    text-align: center;
    margin-top: 20px;
  }

  .chart_image {
    max-width: 100%;
    height: auto;
  }

  .button_container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
