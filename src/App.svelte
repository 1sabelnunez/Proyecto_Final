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
    { src: "images/img1.png", title: "Canciones en el Hot 100" },
    { src: "images/img2.png", title: "Récords Rotos" },
    { src: "images/img3.png", title: "Puntaje en Metacritic" },
    { src: "images/img4.png", title: "Hits #1" },
    { src: "images/img5.png", title: "Premios Ganados" }
  ];

  /* Array de miniaturas */
  let thumbnails = [
    { src: "images/debutPreview.png", url: "debut.html" },
    { src: "images/FearlessPreview.png", url: "fearless.html" },
    { src:  "images/SnPreview.png", url: "sn.html" },
    { src:  "images/RedPreview.png", url: "red.html" },
    { src: "images/1989Preview.png", url: "1989.html" },
    { src:  "images/RepPreview.png", url: "rep.html" },
    { src:  "images/LoverPreview.png", url: "lover.html" },
    { src:  "images/FolkPreview.png", url: "folk.html" },
    { src:  "images/EverPreview.png", url: "ever.html" },
    { src:  "images/MidnPreview.png", url: "midn.html" },
    { src:  "images/TtpdPreview.png", url: "ttpd.html" }
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

  <div class="button_container">
    <!-- Botones para cambiar las imágenes -->
    {#each charts as chart, i}
      <button on:click={() => changeImage(i)}>{chart.title}</button>
    {/each}
  </div>

  <div class="image_container">
    <!-- Iteración sobre el array de imágenes -->
    {#each charts as chart, i}
      <img src={chart.src} alt="{chart.title}" class="chart_image {index === i ? 'active' : ''}" />
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
    flex-wrap: wrap; /* Permite que las miniaturas se ajusten a la siguiente línea si es necesario */
    justify-content: space-between;
    margin: 20px 0;
  }

  .thumbnail_wrapper {
    flex: 1 0 9%; /* Aproximadamente 1/11 del ancho, ajusta si es necesario */
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease; /* Añadir transición para el efecto de escala */
    width: 115px; /* Ajusta el ancho de las miniaturas */
    height: 535px; /* Ajusta la altura de las miniaturas */
    margin: 0; /* Elimina los márgenes */
    padding: 0; /* Elimina el relleno */
  }

  .thumbnail_image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Recorta la imagen para que se ajuste al contenedor */
  }

  .thumbnail_wrapper:hover {
    transform: scale(1.1); /* Aumentar el tamaño al pasar el mouse */
  }

  .button_container {
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #111622;
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
    height: 650px; /* Fijar altura del contenedor */
    margin: 20px auto;
    background-color: #ffffff; /* Fondo blanco para el contenedor de imágenes */
    border: 2px solid #070b0f;
    border-radius: 16px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center; /* Centrar contenido verticalmente */
    justify-content: center; /* Centrar contenido horizontalmente */
  }

  .chart_image {
    position: absolute;
    max-width: 90%;
    height: auto;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .chart_image.active {
    opacity: 1;
  }
</style>
