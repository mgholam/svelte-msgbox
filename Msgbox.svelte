<script>
  // import { createEventDispatcher } from "svelte";
  import { fly, fade, scale } from "svelte/transition";
  import Button from "./Button.svelte";

  export let node = "";
  export let show = false;
  export let color = "#999";

  $: if (color !== "#999") {
    // console.log(color);
    document.documentElement.style.setProperty(
      "--mb-colordark20",
      LightenDarkenColor(color, -30)
    );
    document.documentElement.style.setProperty(
      "--mb-colordark10",
      LightenDarkenColor(color, -10)
    );
     document.documentElement.style.setProperty(
      "--mb-color", color
    );
    document.documentElement.style.setProperty(
      "--mb-colorlight10",
      LightenDarkenColor(color, 10)
    );
    document.documentElement.style.setProperty(
      "--mb-colorlight20",
      LightenDarkenColor(color, 20)
    );
  }
  else{
    document.documentElement.style.setProperty("--mb-colordark20", "#666");
    document.documentElement.style.setProperty("--mb-colordark10", "#777");
    document.documentElement.style.setProperty("--mb-color", "#999");
    document.documentElement.style.setProperty("--mb-colorlight10", "#ccc");
    document.documentElement.style.setProperty("--mb-colorlight20", "#eee");
  }

  let Msg = "";
  let Title = "";
  let showok = false;
  let okf = null;
  let txtclose = "Cancel";
  let txtok = "OK";
  let style = "";

  let inputmode = false;
  let inputline;
  let inpval = "";
  let inpplaceholder = "";
  let multline = false;

  let modaldiv;
  let md = false;
  let allowmmove = false;
  let mi = null;

  let minheight = 180;
  let minwidth = 300;

  export function Ok(message, title) {
    Msg = message;
    Title = title;
    style = "background-color: white;";
    txtclose = "OK";
  }

  export function OkCancel(message, title, okfunc) {
    Msg = message;
    Title = title;
    showok = true;
    okf = okfunc;
  }

  export function YesNo(message, title, okfunc) {
    Msg = message;
    Title = title;
    showok = true;
    txtclose = "No";
    txtok = "Yes";
    okf = okfunc;
  }

  export function Input(initial, title, placeholder, multiline, okfunc) {
    inputmode = true;
    inpval = initial;
    inpplaceholder = placeholder;
    multline = multiline;
    Title = title;
    showok = true;
    minheight = 346;
    okf = okfunc;
  }

  function chkclose() {
    allowmmove = false;
    md = false;
    //if (inputmode == false) close();
  }

  function close() {
    show = false;
    setTimeout(() => {
      document.body.removeChild(node);
    }, 1000);
  }

  function okclick() {
    if (okf) {
      if (inputmode) {
        if (inpval !== "") {
          okf(inpval);
          close();
          return;
        } else return;
      }
      okf();
    }

    close();
  }

  function mdown(e) {
    if (allowmmove) {
      md = true;
      var r = modaldiv.getBoundingClientRect();
      mi = {
        X: e.pageX - (r.left + r.width / 2),
        Y: e.pageY - (r.top + r.height / 2)
      };
      document.documentElement.addEventListener("mousemove", mmove, false);
      document.documentElement.addEventListener("mouseup", mup, false);
    }
  }

  function mup(e) {
    allowmmove = false;
    md = false;
    document.documentElement.removeEventListener("mousemove", mmove, false);
    document.documentElement.removeEventListener("mouseup", mup, false);
  }

  function mmove(e) {
    if (md && allowmmove) {
      modaldiv.style.left = e.pageX - mi.X;
      modaldiv.style.top = e.pageY - mi.Y;
    }
  }

  // resizer code
  var startX, startY, startWidth, startHeight;

  function rdown(e) {
    startX = e.clientX;
    startY = e.clientY;
    var m = document.defaultView.getComputedStyle(modaldiv);

    startWidth = parseInt(m.width, 10);
    startHeight = parseInt(m.height, 10);
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    var h = startHeight + e.clientY - startY;
    var w = startWidth + e.clientX - startX;
    if (w >= minwidth) modaldiv.style.width = w + "px";
    // if (h >= minheight) modaldiv.style.height = h + "px";
    e.stopPropagation();
    e.cancelBubble = true;
  }

  function stopDrag(e) {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }

  function LightenDarkenColor(col, amt) {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
</script>

<style>
  :global(:root) {
    --mb-colordark20: #666;
    --mb-colordark10: #777;
    --mb-color: #999;
    --mb-colorlight10: #ccc;
    --mb-colorlight20: #eee;
    --mb-colorwhite: #fff;
  }
  .txt {
    width: 100%;
    resize: none;
    font-size: large;
    padding: 10px;
    border: 1px solid var(--mb-colorlight10);
    border-radius: 5px;
    border-style: solid;
    background-color: var(--mb-colorwhite);
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.55);
    z-index: auto;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 30vw;
    padding: 10px;
    /* background-color: var(--mb-colorlight20); */
    background-color: #eee;
    border-radius: 15px;
    z-index: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.96);
    transform: translate(-50%, -50%);
  }

  .ok {
    margin-right: 20px;
    display: inline;
  }

  .msg {
    font-size: x-large;
  }
  h1 {
    text-align: center;
    margin: 0;
    border-bottom: 1px solid var(--mb-colorlight10);
    cursor: grab;
  }

  .content {
    text-align: center;
    padding: 1rem;
  }

  footer {
    align-content: center;
    text-align: center;
    font-size: large;
    padding: 1rem;

    /* position: absolute;
    width : 90%;
    bottom: 0; */
  }

  .resizer {
    width: 15px;
    height: 15px;
    background-color: var(--mb-colordark10);
    position: absolute;
    cursor: se-resize;
    right: 0;
    bottom: 0;
  }

  .actionbutton {
    min-width: 100px;
    font-size: large;
    background: var(--mb-color);
    background-image: linear-gradient(
      to bottom,
      var(--mb-color),
      var(--mb-colordark20)
    );
    border-radius: 15px;
    color: var(--mb-colorwhite);
    padding: 15px;
    border: solid var(--mb-colorlight10) 1px;
    margin-bottom: 5px;
  }

  .actionbutton:hover {
    background-image: linear-gradient(
      to bottom,
      var(--mb-colorlight20),
      var(--mb-colordark20)
    );
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  .outline {
    background: var(--mb-colorwhite);
    color: var(--mb-colordark20);
  }
  .outline:hover {
    background-image: linear-gradient(
      to bottom,
      var(--mb-colorwhite),
      var(--mb-colorlight10)
    );
    box-shadow: none;
  }
</style>

<svelte:options accessors={true} />

{#if show}
  <div transition:fade class="modal-backdrop" />
  <div
    transition:scale={{ y: 300, duration: 200 }}
    class="modal"
    {style}
    on:mousedown={mdown}
    bind:this={modaldiv}>
    <h1 on:mouseover={() => (allowmmove = true)}>{Title}</h1>
    <div class="content">
      {#if inputmode}
        {#if multline}
          <textarea
            class="txt"
            rows="10"
            placeholder={inpplaceholder}
            bind:value={inpval} />
        {:else}
          <input class="txt" placeholder={inpplaceholder} bind:value={inpval} />
        {/if}
      {:else}
        <label class="msg">{Msg}</label>
      {/if}
    </div>
    <footer>
      <div>
        <slot name="footer">
          {#if showok}
            <div class="ok">
              <!-- <Button mode="success" on:click={okclick}>{txtok}</Button> -->
              <button class="actionbutton" on:click={okclick}>{txtok}</button>
            </div>
          {/if}
          <!-- <Button mode="outline" on:click={close}>{txtclose}</Button> -->
          <button class="actionbutton outline" on:click={close}>
            {txtclose}
          </button>
        </slot>
      </div>
    </footer>
    {#if inputmode}
      <div class="resizer" on:mousedown={rdown} />
    {/if}
  </div>
{/if}
