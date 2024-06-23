<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import Medallero from "./components/Medallero.svelte";
  import DebugScroller from "./components/DebugScroller.svelte";
  import Loremipsum from "./components/Loremipsum.svelte";

 
  /* Variables para el scroller1 */
  let count;
  let index=0;
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
  "images/img1.png",
  "images/img2.png",
  "images/img3.png",
  "images/img4.png",
  "images/img5.png"
];

/* Función para cambiar el índice */
function changeImage(newIndex) {
  index = newIndex;
  console.log("Nuevo índice:", index);
}
</script>

<main>
  <div class="image_container">
    {#each charts as chart, i}
      <img src={chart} alt="Chart {i + 1}" class="chart_image {index === i ? 'active' : ''}" />
    {/each}
  </div>

  <div class="button_container">
    {#each charts as chart, i}
      <button on:click={() => changeImage(i)}>Imagen {i + 1}</button>
    {/each}
  </div>
</main>


<style>
  .image_container {
    position: relative; /* Contenedor relativo para posicionamiento absoluto de las imágenes */
    text-align: center;
    margin-top: 100px;
  }

  .chart_image {
    position: absolute; /* Imágenes posicionadas absolutamente dentro del contenedor */
    top: 50;
    left: 5;
    width: 50%;
    height: auto;
    opacity: 0; /* Inicialmente ocultas */
    transition: opacity 0.5s ease-in-out; /* Transición suave de opacidad */
  }

  .chart_image.active {
    opacity: 1; /* Mostrar la imagen activa */
  }

  .button_container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
