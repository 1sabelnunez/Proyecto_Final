<script>
  /* Importaciones de módulos */
  import * as d3 from "d3";
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from "svelte";

  let visible = false;

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 5000); // 5000 ms = 5 segundos
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
    { src: "images/img1.png", title: "Canciones en el Hot 100", text: "Todas las canciones (31) de la versión titulada “The Anthology” del álbum entraron en el Billboard Hot 100, ocupando los 14 primeros puestos del mismo simultáneamente. Así se convirtió en la primera artista en la historia en alcanzar este logro." },
    { src: "images/img2.png", title: "Récords Rotos", text: "Texto adicional para Récords Rotos" },
    { src: "images/img3.png", title: "Puntaje en Metacritic", text: "Texto adicional para Puntaje en Metacritic" },
    { src: "images/img4.png", title: "Hits #1", text: "Texto adicional para Hits #1" },
    { src: "images/img5.png", title: "Premios Ganados", text: "Texto adicional para Premios Ganados" }
  ];
  let textContainerColors = [
    "#8d8477a9", // TTPD
    "#8d8477a9", // TTPD
    "#702431", // RED
    "#678794", // 1989
    "#242E47"  // Midni
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

  /* Variables para el texto dinámico */
  let cursorVisible = true;
  const typingDelay = 100;
  let charIndex = 0;

  function type() {
    if (charIndex < text.length) {
      typedText += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    }
  }

  let dynamicText = "";
  const dynamicTextContent = "Ahora que conoces sus logros, conocela a ella";
  let dynamicTextIndex = 0;

  function typeDynamicText() {
    if (dynamicTextIndex < dynamicTextContent.length) {
      dynamicText += dynamicTextContent.charAt(dynamicTextIndex);
      dynamicTextIndex++;
      setTimeout(typeDynamicText, typingDelay);
    }
  }

  /* Variables y funciones para el texto dinámico de la introducción */
  let introTypedText = "";
  const introText = "Descubre el extraordinario viaje musical de Taylor Swift a través de cada una de sus eras. Desde sus humildes comienzos en el country hasta su reinado como ícono del pop global, cada álbum marca una evolución en su arte y una conexión más profunda con sus fans. Explora cómo cada era ha moldeado su carrera y su impacto en la música contemporánea.";
  let introCharIndex = 0;

  function typeIntroText() {
    if (introCharIndex < introText.length) {
      introTypedText += introText.charAt(introCharIndex);
      introCharIndex++;
      setTimeout(typeIntroText, typingDelay);
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(type, typingDelay * 2); // Ajustar el retraso para el texto principal
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

    const dynamicObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeDynamicText, typingDelay * 2); // Ajustar el retraso para el texto dinámico
            dynamicObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    dynamicObserver.observe(document.querySelector(".dynamic-typing-container"));

    const introObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeIntroText, typingDelay * 2); // Ajustar el retraso para el texto de introducción
            introObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    introObserver.observe(document.querySelector(".intro"));
  });

  /* Función para cambiar el índice de la imagen activa */
  function changeImage(newIndex) {
    index = newIndex;
    console.log("Nuevo índice:", index);
  }

  /* Función para redirigir al usuario */
  function redirectToPage(url) {
    window.location.href = url;
  }

  function scrollToEras() {
    const erasSection = document.getElementById('eras-section');
    if (erasSection) {
      erasSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function scrollToCharts() {
    const chartsSection = document.getElementById('charts-section');
    if (chartsSection) {
      chartsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>


<main>
  <div class="portada_container">
    <!-- Imagen de portada -->
    <img src="images/portada.png" alt="Portada" class="portada_image" />
  </div>
  <!-- Contenedor para los botones -->
  <div class="button-container">
    <!-- Botón "Ver Eras" -->
    <div class="ver-eras-button">
      <button on:click={scrollToEras}>Ver Eras</button>
    </div>
    
    <!-- Botón "Ver Charts" -->
    <div class="ver-charts-button">
      <button on:click={scrollToCharts}>Ver Charts</button>
    </div>
  </div>
    <!-- Introducción a Taylor Swift y sus eras -->
    <div class="intro">
      <h2>{introTypedText}</h2>
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
          <div class="title_container {`background-color-${i}`}">
            <p>{chart.title}</p>
          </div>
          <div class="text_container {`background-color-${i}`}">
            <div class="sticky_note">
              {#if visible && index === i}
                <p>{chart.text}</p>
              {/if}
            </div>
          </div>
        </section>
      {/each}
    </div>
  </Scroller>

  <!-- Texto dinámico de la introducción -->
  <div class="dynamic-intro-container">
    <h2>{typeDynamicText}</h2>
  </div>

  <div class="dynamic-typing-container">
    <h2>{dynamicText}</h2>
  </div>

  <div id="eras-section" class="thumbnails_container">
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

  .button-container {
    display: flex;
    justify-content: space-around; /* Ajusta el espaciado entre los botones */
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .ver-eras-button,
  .ver-charts-button {
    text-align: center;
  }

  .ver-eras-button button,
  .ver-charts-button button {
    padding: 10px 20px;
    font-family: "Shadows Into Light Two", cursive;
    font-size: 110%;
    background-color: #020d1a;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .ver-eras-button button:hover,
  .ver-charts-button button:hover {
    background-color: #031830;
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

  .dynamic-typing-container {
    text-align: center;
    font-family: 'Shadows Into Light Two', cursive;
    color: #fcfcfc;
    margin-bottom: 20px;
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
    padding-top: 56.35%;
    margin: 0 0 2em 0;
  }



   /* Define clases para cada color */
   .background-color-0 {
    background-color: #8d8477a9; /* Color para el gráfico 0 */
  }
  .background-color-1 {
    background-color: #8d8477a9; /* Color para el gráfico 1 */
  }
  .background-color-2 {
    background-color: #70243198; /* Color para el gráfico 2 */
  }
  .background-color-3 {
    background-color: #67879496; /* Color para el gráfico 3 */
  }
  .background-color-4 {
    background-color: #12172493; /* Color para el gráfico 4 */
  }

  /* Otros estilos restantes */
  .text_container {
    margin-top: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 30%;
    padding: 20px;
    box-sizing: border-box;
  }

  .text_container p {
    color: #ffffff;
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: medium;
    text-align: center;
  }
  .title_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 30%;
    margin-left: -25%;
    text-align: center;
  }
  .title_container p {
    color: #ffffff;
    margin: 0;
    width: 75%;
    font-size: xx-large;
    text-align: center;
  }

  .image_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    padding: 20px;
    max-width: 50%;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #FFF8E1;
  }

  .image_container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
