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

  /* Variables para el scroller */
  let count;
  let index = 0;
  let offset;
  let progress;
  let top = 0.05;
  let threshold = 0.2;
  let bottom = 0.95;

  /* Array de gráficos con títulos */
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
          on:click={() => changeImage(i)}
        />
      </div>
    {/each}
  </div>

  <div class="intro">
    <img src="images/intro.png" alt="info random">
  </div>

  <!-- Scroller con los gráficos y sus títulos -->
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
      <img src="{charts[index].src}" alt="chart {index}" class="charts" />
    </div>
    <div slot="foreground" class="foreground_container">
      {#each charts as chart, i}
        <section class="step_foreground">
          <div class="epi_foreground">
            <p>{chart.title}</p>
          </div>
        </section>
      {/each}
    </div>
  </Scroller>
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

  /* Estilos para el scroller */
  .foreground_container {
    pointer-events: none;
    padding-left: 20%; /* Ajusta el padding para centrar los títulos */
  }

  .step_foreground {
    display: flex;
    justify-content: right ;
    align-items: center;
    height: 100vh;
    color: rgb(245, 243, 243);
    padding: 1em;
    margin: 0 0 2em 0;
  }

  .epi_foreground {
    padding: 20px;
    width: 200px;
    background-color: rgba(14, 12, 12, 0.705);
    text-align: center;
  }

  .epi_foreground p {
    color: #fdf9f9;
  }

  .image_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh; /* Ajustamos la altura del contenedor de gráficos */
    padding: 20px;
    max-width: 50%; /* Ajustamos el ancho máximo */
    border: 2px solid #070b0f;
    border-radius: 8px; /* Ajustamos el radio de las esquinas */
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .image_container img {
    max-width: 100%; /* Ajusta el ancho máximo */
    max-height: 100%; /* Ajusta el alto máximo */
    object-fit: contain; /* Ajusta la imagen sin distorsionar */
  }
</style>
