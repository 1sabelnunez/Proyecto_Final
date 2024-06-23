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

  /* Cargar datos al montar el componente */
  onMount(() => {
    d3.csv("./data/deportistas.csv", d3.autoType).then((data) => {
      // Procesar datos CSV si es necesario
    });
  });
</script>

<main style="background-color: #242E47;">
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
  /* Estilos para el contenedor de botones */
  .button_container {
    margin-top: 0px;
    display: flex; /* Utilizar flexbox */
    justify-content: center; /* Centrar contenido horizontalmente */
  }

  /* Estilos para los botones */
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

  /* Estilos para botones al pasar el mouse */
  button:hover {
    background-color: #000000;
  }

  /* Estilos para el contenedor de imágenes */
  .image_container {
    position: relative;
    width: 600px; /* Ancho fijo para el contenedor de imágenes */
    height: 600px; /* Altura fija para el contenedor de imágenes */
    margin: 0 auto; /* Centrar horizontalmente */
    margin-top: 10px; /* Espacio superior */
  }

  /* Estilos para las imágenes */
  .chart_image {
    position: absolute; /* Posición absoluta para superponer imágenes */
    top: 0;
    left: 0;
    width: 100%; /* Ancho al 100% del contenedor */
    height: auto; /* Altura automática para mantener proporciones */
    opacity: 0; /* Inicialmente ocultas */
    transition: opacity 0.5s ease-in-out; /* Transición de opacidad */
  }

  /* Estilos para la imagen activa */
  .chart_image.active {
    opacity: 1; /* Mostrar la imagen activa */
  }
</style>
