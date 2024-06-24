<script>
  /* Importaciones de módulos */
  import { onMount } from "svelte";
  import * as d3 from "d3";

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

  /* Función para cambiar el índice de la imagen activa */
  function changeImage(newIndex) {
    index = newIndex;
    console.log("Nuevo índice:", index);
  }

</script>

<main>
  <div class="portada_container">
    <!-- Imagen de portada -->
    <img src="images/portada.png" alt="Portada" class="portada_image" />
  </div>

  <div class="button_container">
    <!-- Botones para cambiar las imágenes -->
    {#each charts as chart, i}
      <button on:click={() => changeImage(i)}>Imagen {i + 1}</button>
    {/each}
  </div>

  <div class="image_container">
    <!-- Iteración sobre el array de imágenes -->
    {#each charts as chart, i}
      <img src={chart} alt="Chart {i + 1}" class="chart_image {index === i ? 'active' : ''}" />
    {/each}
  </div>
</main>
<style>
    .portada_container {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 60px;
    }

    .portada_image {
      max-width: 90%;
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
      background-color: #070b0f;
      color: #fff;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s ease-in-out;
    }

    button:hover {
      background-color: #000000;
    }

  .image_container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 800px; /* Fijar altura del contenedor */
  margin: 20px auto;
  background-color: #ffffff; /* Fondo blanco para el contenedor de imágenes */
  border: 2px solid #070b0f;
  border-radius: 16px;
  box-shadow: 4 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center; /* Centrar contenido verticalmente */
  justify-content: center; /* Centrar contenido horizontalmente */
}


.chart_image {
  position:absolute;
  max-width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.chart_image.active {
      opacity: 1;
}
</style>
