let rolls = 0;
let luckMult = 1; // The Luck Multiplier
let inventory = { Common: 0, Uncommon: 0, Rare: 0, Legendary: 0, Mythic: 0 };

const animals = {
    Common: ["Stray Cat", "Pigeon", "Rat", "Common Dog"],
    Uncommon: ["Axolotl", "Red Fox", "Emperor Penguin"],
    Rare: ["Albino Lion", "Giant Squid", "Stardust Jellyfish"],
    Legendary: ["Chronos Turtle", "Solar Serpent"],
    Mythic: ["THE GLITCH WHALE", "GALAXY BUTTERFLY"]
};

function roll() {
    rolls++;
    document.getElementById('count').innerText = rolls;

    // LUCK MATH: Higher luckMult makes low RNG numbers easier to hit
    // Formula: We divide the RNG floor by the multiplier
    let rng = Math.random() * 1000000;
    let tier = "Common";
    
    if (rng < (1 * luckMult)) tier = "Mythic";
    else if (rng < (100 * luckMult)) tier = "Legendary";
    else if (rng < (2000 * luckMult)) tier = "Rare";
    else if (rng < (50000 * luckMult)) tier = "Uncommon";

    // Add to inventory
    inventory[tier]++;
    updateUI();

    const list = animals[tier];
    const result = list[Math.floor(Math.random() * list.length)];
    const display = document.getElementById('display');
    display.innerText = result;
    display.className = tier;
    document.getElementById('rarity').innerText = `Rarity: ${tier} (Luck: ${luckMult.toFixed(1)}x)`;
}

function craftLuck() {
    // Requires 10 Commons to get +0.1 Luck
    if (inventory.Common >= 10) {
        inventory.Common -= 10;
        luckMult += 0.1;
        updateUI();
        alert("Crafted a Rabbit Foot! Luck increased!");
    } else {
        alert("Not enough Common animals! (Need 10)");
    }
}

function updateUI() {
    // Update the inventory display
    document.getElementById('inv-stats').innerText = 
        `Commons: ${inventory.Common} | Uncommons: ${inventory.Uncommon} | Rares: ${inventory.Rare}`;
}
