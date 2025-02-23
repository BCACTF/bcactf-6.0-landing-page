class Leaf {
    constructor(xPos, speed, element) {
        this.xPos = xPos;
        // Start at the top of the viewport
        this.yPos = 0;
        this.speed = speed;
        this.element = element;

        // Optionally, adjust z-index based on speed for depth effect
        this.element.style.zIndex = speed > 1 ? "1" : "0";
        this.element.style.left = xPos + "px";
        // Random initial rotation for variety
        this.rotation = Math.random() * 360;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
    }

    move() {
        // Fall down by increasing yPos
        this.yPos += this.speed;
        this.element.style.top = this.yPos + "px";

        // Optionally, add a slow rotation animation while falling
        this.rotation += this.speed * 0.5;
        this.element.style.transform = `rotate(${this.rotation}deg)`;

        // Remove the leaf if it moves off the bottom of the viewport
        if (this.yPos > window.innerHeight) {
            const index = leaves.indexOf(this);
            if (index !== -1) {
                leaves.splice(index, 1);
                this.element.remove();
            }
        }
    }
}

const leavesDiv = document.querySelector(".leaves");
// You can adjust these colors or add more shades to match your jungle theme.
const leavesColors = ["#76b852", "#8DC26F", "#6DAA4D", "#5A9C3F"];
let leaves = [];
let leafLoop;

function createLeaf() {
    let div = document.createElement("div");
    div.classList.add("leaf");
    leavesDiv.appendChild(div);

    // Random width between 15 and 30px, and height roughly double that to simulate a leaf
    const width = Math.floor(Math.random() * 15 + 15);
    const height = width * 2;
    div.style.width = width + "px";
    div.style.height = height + "px";

    // Optionally, choose a random green hue from leavesColors for variation
    const color = leavesColors[Math.floor(Math.random() * leavesColors.length)];
    div.style.background = color;

    // Position at the top
    div.style.top = "0px";
    return div;
}

function createLeaves() {
    // Create a new leaf at a random horizontal position
    const leaf = new Leaf(
        Math.floor(Math.random() * (window.innerWidth - 40)) + 20,
        Math.random() + 0.5, // random falling speed
        createLeaf()
    );
    leaves.push(leaf);

    // Only create more leaves when the page is visible
    if (!document.hidden) setTimeout(createLeaves, Math.random() * 800);
}

function updateLeaves() {
    leaves.forEach((leaf) => {
        leaf.move();
    });
}

// Start the animation
createLeaves();
leafLoop = setInterval(updateLeaves, 10);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(leafLoop);
    } else {
        setTimeout(createLeaves, Math.random() * 1000);
        leafLoop = setInterval(updateLeaves, 10);
    }
});
