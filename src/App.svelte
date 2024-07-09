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
  { src: "images/img1.png", title: "Canciones en el Hot 100", text: "Texto adicional para Canciones en el Hot 100" },
  { src: "images/img2.png", title: "Récords Rotos", text: "Texto adicional para Récords Rotos" },
  { src: "images/img3.png", title: "Puntaje en Metacritic", text: "Texto adicional para Puntaje en Metacritic" },
  { src: "images/img4.png", title: "Hits #1", text: "Texto adicional para Hits #1" },
  { src: "images/img5.png", title: "Premios Ganados", text: "Texto adicional para Premios Ganados" }
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

  // Variables para el texto dinámico
  let typedText = "";
  let cursorVisible = true;
  const text = "A continuación vamos a hacer un viaje a través de las eras de Taylor Swift <3";
  const typingDelay = 100;
  let charIndex = 0;

  function type() {
    if (charIndex < text.length) {
      typedText += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(type, typingDelay);
            setInterval(() => {
              cursorVisible = !cursorVisible;
            }, 500);
            observer.unobserve(entry.target); // Dejar de observar una vez que se ha disparado
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(document.querySelector(".typing-container"));
  });
</script>

<main>
  <div class="portada_container">
    <!-- Imagen de portada -->
    <img src="images/portada.png" alt="Portada" class="portada_image" />
  </div>

  <!-- Texto dinámico -->
  <div class="typing-container">
    <span class="typed-text">{typedText}</span>
    <span class:hidden={!cursorVisible}>|</span>
  </div>

<!-- Dentro del componente Scroller en tu archivo .svelte -->
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
        <div class="title_container">
          <p>{chart.title}</p>
        </div>
        <div class="text_container">
          <p>{chart.text}</p>
        </div>
      </section>
    {/each}
  </div>
</Scroller>

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

  .typing-container {
    text-align: center;
    font-family: 'Shadows Into Light Two', cursive;
    color: #fcfcfc;
    margin-bottom: 20px;
  }

  .typed-text {
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
  }

  .hidden {
    opacity: 0;
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

/* Estilos para el scroller */
.foreground_container {
  pointer-events: none;
  padding-left: 20%; /* Ajusta el padding para centrar los títulos */
}

.step_foreground {
  display: flex;
  justify-content: space-between;  /*Alinear los elementos secundarios */
  align-items: center;
  height: 100vh;
  color: rgb(245, 243, 243);
  padding: 1em;
  margin: 0 0 2em 0;
}

.title_container {
  justify-content: start;
  display: flex;
  flex-direction: column; /* Alinear elementos verticalmente */
  align-items: left; /* Alinear elementos a la izquierda */
  width: 20%; /* Ancho del contenedor ajustable según necesidad */
  padding: 20px;
  background-color: rgba(14, 12, 12, 0.705);
  text-align: center; /* Alinear texto al centro dentro de los contenedores */
  margin-left: -260px;
}
.text_container{
  justify-content: right;
  display: flex;
  flex-direction: column; /* Alinear elementos verticalmente */
  align-items: flex-start; /* Alinear elementos a la izquierda */
  width: 20%; /* Ancho del contenedor ajustable según necesidad */
  padding: 20px;
  background-color: rgba(14, 12, 12, 0.705);
  text-align: center; /* Alinear texto al centro dentro de los contenedores */
}

.title_container p, .text_container p {
  color: #fdf9f9;
  margin: 0; /* Eliminar márgenes por defecto */
}

  .image_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    padding: 20px;
    max-width: 50%;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    background-image: url('images/paper.png'); /* Ruta de tu imagen de fondo */
    background-size: cover; /* Ajusta el tamaño de la imagen para cubrir el contenedor */
    background-position: center; /* Posición centrada de la imagen */
  }

  .image_container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
