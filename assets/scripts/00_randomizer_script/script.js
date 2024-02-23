let parts = {
  tail: {},
  body: {},
  pawsAndClaws: {},
  ears: {},
  head: {},
  eyes: {},
};

// Function to clear the canvas
function clearCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to draw an image on the canvas at a specified vertical offset.
function drawImageOnCanvas(imagePath, yOffset) {
  const image = new Image();
  image.src = imagePath;
  image.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    if (!canvas.width || !canvas.height) {
      canvas.width = canvas.height = 400;
    }
    ctx.drawImage(image, (400 - image.width) / 2, yOffset);
  };
}

// Function to construct the file path for a random animal part.
function loadRandomAnimalPart(partName, folderPath) {
  const partNumber = Math.floor(Math.random() * 3) + 1;
  return `${folderPath}/${partName}${partNumber}.svg`;
}

// Function to load and display all parts of the animal.
function loadRandomAnimal() {
  clearCanvas(); // Clears the canvas before drawing new parts
  const partsInfo = {
    head: {
      folder: "assets/img/00_randomizer_images/00_head",
      yOffset: -50,
    },
    eyes: { folder: "assets/img/00_randomizer_images/01_eyes", yOffset: 20 },
    body: { folder: "assets/img/00_randomizer_images/02_body", yOffset: 250 },
    ears: { folder: "assets/img/00_randomizer_images/03_ears", yOffset: 300 },
    tail: { folder: "assets/img/00_randomizer_images/04_tail", yOffset: 350 },
    pawsAndClaws: {
      folder: "assets/img/00_randomizer_images/05_pawsAndClaws",
      yOffset: 375,
    },
    // Add more parts as needed.
  };

  Object.entries(partsInfo).forEach(([part, { folder, yOffset }]) => {
    const path = loadRandomAnimalPart(part, folder);
    parts[part] = { path: path, yOffset: yOffset };
    drawImageOnCanvas(path, yOffset);
  });
}

// Converts the canvas content to an image and triggers a download.
function downloadCanvas() {
  const canvas = document.getElementById("canvas");
  const image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  const link = document.createElement("a");
  link.download = "my-random-animal-chimera.png";
  link.href = image;
  link.click();
}

// Function to populate selectors with options and apply random styles.
function populateSelectors() {
  const partNames = ["head", "eyes", "body", "ears", "tail", "pawsAndClaws"];
  partNames.forEach((part) => {
    const selector = document.getElementById(`${part}Selector`);
    for (let i = 1; i <= 3; i++) {
      const option = document.createElement("option");
      option.value = option.text = `${part}${i}`;
      selector.appendChild(option);
    }

    selector.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
    selector.style.color = `#${Math.floor(Math.random() * 16777215).toString(
      16
    )}`;
  });
}

// Function to load a specific animal part based on selection.
function loadSelectedPart(partName, folderPath, yOffset) {
  clearCanvas(); // Clears the canvas before drawing a new part
  const selector = document.getElementById(`${partName}Selector`);
  const selectedOption = selector.value;
  const path = `${folderPath}/${selectedOption}.svg`;
  //const path = folderPath + "/" + selectedOption + ".svg";
  parts[partName] = { path: path, yOffset: yOffset };

  drawImageOnCanvas(path, yOffset);

  Object.entries(parts).forEach(([key, part]) => {
    if (!part.path.includes(partName)) {
      drawImageOnCanvas(part.path, part.yOffset);
    }
  });
}

// Setup actions when the window loads.
window.onload = function () {
  populateSelectors(); // Populate and style the selectors

  // Event listeners for the randomize button and each selector
  document.getElementById("randomizeButton").onclick = loadRandomAnimal;
  document.getElementById("downloadButton").onclick = downloadCanvas;
  document.getElementById("headSelector").onchange = () =>
    loadSelectedPart("head", "assets/img/00_randomizer_images/00_head", -50);
  document.getElementById("eyesSelector").onchange = () =>
    loadSelectedPart("eyes", "assets/img/00_randomizer_images/01_eyes", 20);
  document.getElementById("bodySelector").onchange = () =>
    loadSelectedPart("body", "assets/img/00_randomizer_images/02_body", 250);
  document.getElementById("earsSelector").onchange = () =>
    loadSelectedPart("ears", "assets/img/00_randomizer_images/03_ears", 300);
  document.getElementById("tailSelector").onchange = () =>
    loadSelectedPart("tail", "assets/img/00_randomizer_images/04_tail", 350);
  document.getElementById("pawsAndClawsSelector").onchange = () =>
    loadSelectedPart(
      "pawsAndClaws",
      "assets/img/05_randomizer_images/00_pawsAndClaws",
      375
    );
  // Add onchange events for other selectors if needed.
};

/* 
let animalParts = {};

function preload() {
    // Chargement des images pour chaque partie de l'animal
    const partsInfo = {
        head: { folder: 'assets/img/00_randomizer_images/00_head', count: 3, yOffset: 50 },
        eyes: { folder: 'path/to/eyes/folder', count: 3, yOffset: 150 },
        body: { folder: 'path/to/body/folder', count: 3, yOffset: 250 },
        ears: { folder: 'path/to/ears/folder', count: 3, yOffset: 300 },
        tail: { folder: 'path/to/tail/folder', count: 3, yOffset: 350 },
        pawsAndClaws: { folder: 'path/to/pawsAndClaws/folder', count: 3, yOffset: 375 }
        // Ajoutez d'autres parties si nécessaire
    };

    for (const part in partsInfo) {
        animalParts[part] = [];
        for (let i = 1; i <= partsInfo[part].count; i++) {
            let imagePath = `${partsInfo[part].folder}/${part}${i}.svg`;
            animalParts[part].push({ image: loadImage(imagePath), yOffset: partsInfo[part].yOffset });
        }
    }
}

function setup() {
    createCanvas(400, 400);
    noLoop(); // Pas besoin de boucle de dessin continue
    loadRandomAnimal();
}

// Dessine une partie spécifique de l'animal
function drawPart(partArray) {
    let part = partArray[Math.floor(Math.random() * partArray.length)];
    image(part.image, (width - part.image.width) / 2, part.yOffset);
}

// Charge et affiche toutes les parties de l'animal
function loadRandomAnimal() {
    background(255); // Efface le canvas
    for (const part in animalParts) {
        drawPart(animalParts[part]);
    }
}

// Fonction pour télécharger le canvas
function downloadCanvas() {
    saveCanvas('animal-composition', 'png');
}

// Remplir les sélecteurs et appliquer des styles aléatoires (similaire à votre fonction populateSelectors)

// Charger une partie spécifique de l'animal basée sur la sélection (similaire à votre fonction loadSelectedPart)
 */
