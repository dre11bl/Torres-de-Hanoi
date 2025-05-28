var selectedTower = null;

function initGame(numDisks = 5) {
    const tower1 = document.getElementById("tower-1");
    tower1.innerHTML = "";

    for (let i = numDisks; i >= 1; i--) {
        const disk = document.createElement("div");
        disk.className = "disk";
        disk.dataset.size = i;
        tower1.appendChild(disk);
    }

    document.getElementById("tower-2").innerHTML = "";
    document.getElementById("tower-3").innerHTML = "";

    selectedTower = null;
}

document.querySelectorAll(".tower").forEach(tower => {
    tower.addEventListener("click", () => {
        const towerId = tower.dataset.id;

        if (selectedTower === null) {
            if (tower.lastElementChild) {
                selectedTower = tower;
                tower.classList.add("selected");
            }
        } else {
            const fromTower = selectedTower;
            const toTower = tower;
            const diskToMove = fromTower.lastElementChild;

            if (canMoveDisk(diskToMove, toTower)) {
                toTower.appendChild(diskToMove);
                fromTower.classList.remove("selected");
                selectedTower = null;

                checkWinCondition();
            } else {
                fromTower.classList.remove("selected");
                alert("Movimiento no permitido.");
                selectedTower = null;
            }
        }
    });
});

function canMoveDisk(disk, toTower) {
    const topDisk = toTower.lastElementChild;
    return !topDisk || parseInt(disk.dataset.size) < parseInt(topDisk.dataset.size);
}

function checkWinCondition() {
    const tower3 = document.getElementById("tower-3");
    if (tower3.childElementCount === 5) {
        alert("¡Felicidades, has ganado!");
    }
}

document.getElementById("reset-button").addEventListener("click", () => {
    initGame(5); 
});
initGame();
