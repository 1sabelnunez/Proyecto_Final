<script>
  /* Importaciones de módulos */
  import { fade } from 'svelte/transition'; // Importa la transición de desvanecimiento
  import { fly } from 'svelte/transition';
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
    { src: "images/img1.png", title: "Canciones en el Hot 100", text: "Desde que Taylor comenzó su viaje de re-grabaciones de sus discos, la artista logró conquistar nuevo público al re-lanzar y promocionar sus primeros álbumes, alcanzando nuevos picos de popularidad y metiendo cada vez más canciones en el Hot 100." },
    { src: "images/img2.png", title: "Récords Rotos", text: "Sus dos álbumes no re-grabados más recientes, Midnights y The Tortured Poets Department, lograron conquistar a los “swifties” y a la prensa.  Con dos sonidos completamente diferentes, ambos se destacaron rompiendo récords establecidos por ella misma en el pasado, u otros que jamás nadie había alcanzado." },
    { src: "images/img3.png", title: "Puntaje en Metacritic", text: "Tanto la crítica como los fans recibieron de forma muy positiva a Red TV, convirténdolo en su álbum mejor puntuado por Metacritic, con 91 puntos. Red, en cambio, empata con Speak Now por el 9° puesto, con 77 puntos." },
    { src: "images/img4.png", title: "Hits #1", text: "Es notorio que con 1989 la carrera de Taylor alcanzó otro nivel, estableciéndola como una de las popstars con mayor renombre de la industria desde ese entonces." },
    { src: "images/img5.png", title: "Premios Ganados", text: "Nuevamente, tanto Midnights como TTPD le dieron un nuevo giro a la carrera de Swift, que no podría estar un mayor auge que el actual. A pesar de que Midnights es el álbum con más premios ganados ya que TTPD salió hace muy poco, está claro que se llevará unos cuántos." }
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
    { src: "images/debutPreview.png", url: "../debut.html" },
    { src: "images/FearlessPreview.png", url: "../fearless.html" },
    { src: "images/SnPreview.png", url: "../sn.html" },
    { src: "images/RedPreview.png", url: "../red.html" },
    { src: "images/1989Preview.png", url: "../1989.html" },
    { src: "images/RepPreview.png", url: "../rep.html" },
    { src: "images/LoverPreview.png", url: "../lover.html" },
    { src: "images/FolkPreview.png", url: "../folk.html" },
    { src: "images/EverPreview.png", url: "../ever.html" },
    { src: "images/MidnPreview.png", url: "../midn.html" },
    { src: "images/TtpdPreview.png", url: "../ttpd.html" }
  ];

  /* Variables para el texto dinámico */
  let cursorVisible = true;
  const typingDelay = 50;
  let charIndex = 0;

  function type() {
    if (charIndex < text.length) {
      typedText += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);  
    }
  }

  let dynamicText = "";
  const dynamicTextContent = "Clickeá sobre cualquier era para más información";
  let dynamicTextIndex = 0;

  function typeDynamicText() {
    if (dynamicTextIndex < dynamicTextContent.length) {
      dynamicText += dynamicTextContent.charAt(dynamicTextIndex);
      dynamicTextIndex++;
      setTimeout(typeDynamicText, typingDelay);
    }
  }

  const dynamicTextContent2 = "Scrolleá para conocer más datos sobre Taylor";
 

  /* Variables y funciones para el texto dinámico de la introducción */
  const introTypedText = "Descubrí el extraordinario viaje musical de Taylor Swift a través de cada una de sus eras. En cada álbum marca una evolución en su arte, moldeando una sólida carrera y una conexión más profunda con sus fans, aumentando su impacto en la música contemporánea cada vez más.";
  const introTypedText2= "Además de contar con más de 200 millones de discos vendidos en todo el mundo, siendo la tercer artista más escuchada en Spotify con más de 100 millones de oyentes anuales, más de 250 millones de seguidores en Instagram y más de 90 millones en twitter, un patrimonio neto de 1,3 billones de dólares y más de 260 canciones en el Billboard Hot 100, estos son algunos de los mejores hitos de la carrera de Taylor Swift"
  let introCharIndex = 0;


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
  <div class= "intro-container">
    <!-- Introducción a Taylor Swift y sus eras -->
    <div class="intro">
      <h2>{introTypedText}</h2>
    </div>
  </div>
      <!-- Contenedor para los cuadrados adicionales -->
  <div class="mas-container">
    <div class="mastexto">
      <h2>{introTypedText2}</h2>
    </div>
  </div>
  
  <div class="dynamic-typing-container">
    <h2>{dynamicTextContent2}</h2>
  </div>

  <!-- Dentro del componente Scroller en tu archivo .svelte -->
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

    <div  id= "charts-section" slot="background" class="image_container">
      <img src={charts[index].src} alt="chart {index}" class="charts" />
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

<div class="additional-images-container">
    <img src="images/erasinfo.png" alt="Imagen 1" class="additional-image" />
    <img src="images/erasinfo2.png" alt="Imagen 2" class="additional-image"/>
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
  <footer class="footer" >

    <ul class="social-icon">
      <li class="social-icon__item"><a class="social-icon__link" target="_blank" href="https://github.com/1sabelnunez/Proyecto_Final.git">
          <ion-icon name="logo-github"></ion-icon>
        </a></li>
    </ul>
    <h3 style="font-weight: bold;"> Final: Visualización de datos</h3>
    <p> Isabel Nuñez y Estanislao Ríos Zgaib</p>
    <p>Universidad Torcutato Di Tella  |  Licenciatura en Tecnología Digital</p>
   
  </footer>


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
    justify-content: center; /* Ajusta el espaciado entre los botones */
    margin-top: 8%;
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
  .intro-container {
    width: 50%;
    justify-content: center;
    text-align: center;
    margin-left: 5%;
    margin-top: 5%;
  }
  .intro{
    color: #ffffff;
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: medium;
    text-align: center;

  }

  .mas-container {
    width: 50%;
    justify-content: center;
    text-align: center;
    margin-left: 45%;
    margin-bottom: 10%;
  }
 .mastexto{
    color: #ffffff;
    margin: 0;
    width: 100%;
    height: 100%;
    font-size: medium;
    text-align: center;
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
    margin-bottom: 10%;
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
    background-color: #010a1d93; /* Color para el gráfico 4 */
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
    transition: opacity 0.5s ease; /* Animación de fade */
  }
  .image_container.show {
    opacity: 1;
  }

  .image_container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  .additional-images-container {
      text-align: center; /* Alinear al centro */
      margin: 20px 0; /* Margen superior e inferior */
      margin-bottom: 20%;
      margin-top: 20%;
}

  .additional-image {
      max-width: 45%; /* Ancho máximo de las imágenes */
      height: auto; /* Altura automática */
      margin: 10px; /* Margen entre las imágenes */
      display: inline-block; /* Mostrar en línea */
      vertical-align: top; /* Alinear en la parte superior */
}
/* FOOTER */

.footer {
    position: relative;
    min-width:100vh;
    width: 100%;
    height: 300px;
    background: #242e47;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .social-icon,
  .menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 0;

  }

  .social-icon {
    list-style-type: none; /* Para quitar el símbolo de item */
    padding: 0;
    margin: 0;
  }

  .social-icon__item {
    display: inline-block; /* Para que los elementos estén en línea */
   
  }

  .social-icon__link {
    font-size: 2rem;
    color: #09043a;
    margin: 0 10px;
    display: inline-block;
    transition: 0.5s;
  }
  .social-icon__link:hover {
    transform: translateY(-10px);
  }


  .footer p {
    color: #836ff3;
    margin: 10px 0 10px 0;
  }

  

</style>
