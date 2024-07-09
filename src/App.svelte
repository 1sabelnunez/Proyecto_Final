<script>
  /* Importaciones de módulos */
  import * as d3 from "d3";
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";
  import DebugScroller from "./components/DebugScroller.svelte";

  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 5000); // 3000 ms = 3 segundos
  });

  /* Variables para el scroller1 */
  let count;
  let index = 0;
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

  /* Array de imágenes */
  let charts = [
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png"
  ];

  /* Array de miniaturas */
  let thumbnails = [
    { src: "images/debutPreview.png", url: "debut.html" },
    { src: "images/FearlessPreview.png", url: "fearless.html" },
    { src: "images/SnPreview.png", url: "sn.html" },
    { src: "images/RedPreview.png", url: "red.html" },
    { src: "images/1989Preview.png", url: "1989.html" },
    { src: "images/RepPreview.png", url: "rep.html" },
    { src: "images/LoverPreview.png", url: "lover.html" },
    { src: "images/FolkPreview.png", url: "folk.html" },
    { src: "images/EverPreview.png", url: "ever.html" },
    { src: "images/MidnPreview.png", url: "midn.html" },
    { src: "images/TtpdPreview.png", url: "ttpd.html" }
  ];

  /* Función para cambiar el índice de la imagen activa */
  function changeImage(newIndex) {
    index = newIndex;
    console.log("Nuevo índice:", index);
  }

  /* Función para redirigir al usuario */
  function redirectToPage(url) {
    window.location.href = url;
  }
</script>

<main>
  <div class="portada_container">
    <!-- Imagen de portada -->
    <img src="images/portada.png" alt="Portada" class="portada_image" />
  </div>

  <div class="thumbnails_container">
    <!-- Imágenes en miniatura -->
    {#each thumbnails as thumb, i}
      <div class="thumbnail_wrapper">
        <img 
          src={thumb.src} 
          alt="Thumbnail {i + 1}" 
          class="thumbnail_image" 
          on:click={() => redirectToPage(thumb.url)}
        />
      </div>
    {/each}
  </div>

  <div class="intro">
    <img src="images/intro.png" alt="info random">
  </div>

  <!-- Primer scroller top comics -->
  <Scroller
    top={top}
    threshold={threshold}
    bottom={bottom}
    bind:count={count}
    bind:index={index}
    bind:offset={offset}
    bind:progress={progress}
  >
    <div slot="background" class="image_container">
      <img src={charts[index]} alt="chart {index}" class="charts"/>
    </div>
    <div slot="foreground" class="foreground_container">
      <section class="step_foreground">
        <div class="epi_foreground">
          <p>Los tres cómics más vendidos de Batman</p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <p>
            El Caballero de la Noche Regresa una de las novelas gráficas más vendidas de todos los tiempos. Revolucionó a Batman 
            como un personaje oscuro y complejo, diferente al Batman más ligero de décadas anteriores. 
          </p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <p>
            La Broma Asesina es una novela gráfica famosa por su profunda exploración del Guasón y su relación con Batman.
          </p>
        </div>
      </section>
      <section class="step_foreground">
        <div class="epi_foreground">
          <p>
            La Larga Halloween es aclamada por su narrativa compleja y su exploración de los primeros años de Batman 
            como detective y aliado de Harvey Dent y Jim Gordon.
          </p>
        </div>
      </section>
    </div>
  </Scroller>

  <div class="image_container">
    <!-- Iteración sobre el array de imágenes -->
    {#each charts as chart, i}
      <img src={chart} alt="chart {i}" class="chart_image {index === i ? 'active' : ''}" />
    {/each}
  </div>
</main>

<style>
  .portada_container {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .portada_image {
    max-width: 100%;
    height: auto;
  }

  .thumbnails_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
  }

  .thumbnail_wrapper {
    flex: 1 0 9%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;
    width: 115px;
    height: 535px;
    margin: 0;
    padding: 0;
  }

  .thumbnail_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumbnail_wrapper:hover {
    transform: scale(1.1);
  }

  .foreground_container {
    pointer-events: none;
  }

  .step_foreground {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
    padding: 1em;
    margin: 0 0 2em 0;
  }

  .epi_foreground {
    padding: 20px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.95);
    text-align: center;
  }

  .epi_foreground p {
    color: #000;
  }

  .image_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh; /* Aumentar la altura */
  }

  .image_container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Asegura que la imagen se ajuste bien al contenedor */
  }

  .chart_image {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .chart_image.active {
    opacity: 1;
  }
</style>
