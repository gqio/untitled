import { html } from "lit-html";

export const story1 = () => html`
<script>
  const carousel = document.getElementById("carousel");
  const verticalSwitch = document.getElementById("vertical-switch");

  function handleBodyLoad() {
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    // REMINDER: the README says slot 3 starts in the "previous" position
    slot1.innerText = "0";
    slot2.innerText = "1";
    slot3.innerText = "-1";

    carousel.addEventListener("next", evt => {
      switch (evt.detail.newCurrent) {
        case 1:
          slot2.innerText = Number(slot1.innerText) + 1;
          break;
        case 2:
          slot3.innerText = Number(slot2.innerText) + 1;
          break;
        case 3:
          slot1.innerText = Number(slot3.innerText) + 1;
          break;
      }
    });

    carousel.addEventListener("previous", evt => {
      switch (evt.detail.newCurrent) {
        case 1:
          slot3.innerText = Number(slot1.innerText) - 1;
          break;
        case 2:
          slot1.innerText = Number(slot2.innerText) - 1;
          break;
        case 3:
          slot2.innerText = Number(slot3.innerText) - 1;
          break;
      }
    });
  }

  function handleSwitchChange(e) {
    carousel.parentElement.classList.add("fade-out");
    setTimeout(() => {
      setCarouselVerticalAttribute(verticalSwitch.checked);
      setTimeout(() => {
        carousel.parentElement.classList.remove("fade-out");
        carousel.parentElement.classList.add("fade-in");
      }, 400);
    }, 300);
  }

  function setCarouselVerticalAttribute(isVertical) {
    slot1.innerText = "0";
    slot2.innerText = "1";
    slot3.innerText = "-1";
    carousel.vertical = isVertical;
    if (isVertical) {
      const buttons = document.querySelectorAll(".hero-demo button");
      buttons[0].innerHTML = "&uarr;";
      buttons[1].innerHTML = "&darr;";
    } else {
      const buttons = document.querySelectorAll(".hero-demo button");
      buttons[0].innerHTML = "&larr;";
      buttons[1].innerHTML = "&rarr;";
    }
  }
</script>   
<main>
      <section class="hero">
        <div class="hero-demo">
          <infinite-carousel-wc id="carousel">
            <div id="slot1" slot="1"></div>
            <div id="slot2" slot="2"></div>
            <div id="slot3" slot="3"></div>
          </infinite-carousel-wc>
          <button onclick="carousel.goPrevious()">&larr;</button>
          <button onclick="carousel.goNext()">&rarr;</button>
        </div>
        <input type="checkbox" id="vertical-switch" onchange="handleSwitchChange()"></mwc-switch>
        <label for="vertical-switch">Vertical Scroll</label>
      </section>     
    </main>

`;
