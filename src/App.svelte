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
    { src: "images/DebutF.png", preview: "images/debutPreview.png", url: "debut.html" },
    { src: "images/FearlessF.png", preview: "images/FearlessPreview.png", url: "fearless.html" },
    { src: "images/SnF.png", preview: "images/SnPreview.png", url: "sn.html" },
    { src: "images/RedF.png", preview: "images/RedPreview.png", url: "red.html" },
    { src: "images/1989F.png", preview: "images/1989Preview.png", url: "1989.html" },
    { src: "images/RepF.png", preview: "images/RepPreview.png", url: "rep.html" },
    { src: "images/LoverF.png", preview: "images/LoverPreview.png", url: "lover.html" },
    { src: "images/FolkF.png", preview: "images/FolkPreview.png", url: "folk.html" },
    { src: "images/EverF.png", preview: "images/EverPreview.png", url: "ever.html" },
    { src: "images/MidnF.png", preview: "images/MidnPreview.png", url: "midn.html" },
    { src: "images/TtpdF.png", preview: "images/TtpdPreview.png", url: "ttpd.html" }
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

  let previewImage = '';

  function showPreview(previewSrc) {
    previewImage = previewSrc;
  }

  function hidePreview() {
    previewImage = '';
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
          on:mouseover={() => showPreview(thumb.preview)}
          on:mouseout={() => hidePreview()}
        />
      </div>
    {/each}
  </div>

  <div class="preview_container">
    {#if previewImage}
      <img src={previewImage} alt="Vista previa" class="preview_image" />
    {/if}
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
  flex-wrap: nowrap; /* Evita que las miniaturas se desborden a la siguiente línea */
  justify-content: space-between;
  margin: 20px 0;
  overflow-x: auto; /* Permite el desplazamiento horizontal si es necesario */
}
.thumbnail_wrapper {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 10px;
    transition: transform 0.3s ease; /* Añadir transición para el efecto de escala */
  }
.thumbnail_image {
  flex: 0 0 auto; /* Mantén las miniaturas en una sola fila */
  max-width: 130px; /* Ajusta el ancho según tus necesidades */
  height: auto;
}
.intro {
    text-align: center; /* Centra el contenido horizontalmente */
    margin-top: 20px; /* Espacio superior opcional */
  }

  h1 {
    font-family: 'Times New Roman', Times, serif; /* Fuente específica para el título */
    font-size: 24px; /* Tamaño del título */
    margin-bottom: 10px; /* Espacio inferior del título */
  }

  img {
    max-width: 60%; /* Ajusta el tamaño máximo de la imagen */
    height: auto; /* Mantiene la proporción original de la imagen */
    margin-top: 20px; /* Espacio superior opcional */
  }
/*.thumbnails_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
  }

  .thumbnail_image {
    flex: 1 0 9%; /* Aproximadamente 1/11 del ancho, ajusta si es necesario 
    max-width: 130px;
    height: auto;
  }
*/
.thumbnail_wrapper:hover {
    transform: scale(1.2); /* Aumentar el tamaño al pasar el mouse */
  }

  .preview_container {
    position: absolute;
    top: calc(100% + 10px); /* Posiciona la vista previa debajo de las miniaturas */
    left: 50%; /* Centra horizontalmente la vista previa */
    transform: translateX(-50%); /* Ajusta la posición horizontal */
    z-index: 1000;
    pointer-events: none; /* Evita que la vista previa bloquee eventos */
    display: none; /* Inicialmente oculta la vista previa */
  }

  .preview_container img {
    max-width: 200px; /* Ajusta el tamaño de la vista previa según tus necesidades */
    height: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    pointer-events: none; /* Evita que la vista previa bloquee eventos */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5); /* Inicialmente reduce el tamaño y la opacidad */
  }

  .thumbnail_wrapper:hover .preview_container {
    display: block; /* Muestra la vista previa al pasar el mouse */
  }

  .thumbnail_wrapper:hover .preview_container img {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1); /* Cambia las propiedades de transformación según sea necesario */
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
  box-shadow: 4 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center; /* Centrar contenido verticalmente */
  justify-content: center; /* Centrar contenido horizontalmente */
}


.chart_image {
  position:absolute;
  max-width: 90%;
  height: auto;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.chart_image.active {
      opacity: 1;
}
</style>

