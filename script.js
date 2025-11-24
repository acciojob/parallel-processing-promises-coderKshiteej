const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

// ---- Promise to download a single image ----
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load: ${url}`);

    img.src = url;
  });
}

// ---- Main function using Promise.all ----
function downloadImages() {
  // Clear previous output
  output.innerHTML = "";
  errorDiv.innerText = "";
  loading.style.display = "block";

  const urls = images.map(obj => obj.url);

  Promise.all(urls.map(url => downloadImage(url)))
    .then(imgElements => {
      loading.style.display = "none";

      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = "none";
      errorDiv.innerText = err;
    });
}

// ---- Attach event listener ----
btn.addEventListener("click", downloadImages);
