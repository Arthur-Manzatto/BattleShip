var grid_isset = false;
var main_content = document.getElementById("main_content");
var selectgrid_container = document.getElementById("select-gridsize");
var title = document.getElementById("title");
var current_player;

var placing_phase = true;
var attacking_phase = false;

var p1_nships;
var p2_nships;


function clickedPlay() {

    selectgrid_container.style.display = "flex";
    main_content.style.display = "none";
    document.getElementById("title").style.display = "none";
}

function closeBtn(container, txt) {
    container.style.display = "none";
    main_content.style.display = "flex";
}

function placingShips(water, matrix, player) {


    let index = parseInt(water.getAttribute("index"));
    let row = Math.floor(index / matrix.length); //thx for the help blackbox :)
    let col = index % matrix.length;


    if ((player === 1 && p1_nships !== 0) || (player === 2 && p2_nships !== 0)) {
        if (matrix[row][col] === 0) {
            matrix[row][col] = 1;
            water.style.background = "pink";

            if (player === 1) {

                p1_nships--;
                console.log("P1 remaining ships:", p1_nships);
                console.log(matrixP1)

                if (p1_nships === 0) {
                    document.getElementById("confirma").style.display = "block";
                }

            } else if (player === 2) {
                p2_nships--;
                console.log("P2 remaining ships:", p2_nships);
                console.log(matrixP2)

                if (p2_nships === 0) {
                    document.getElementById("confirma").style.display = "block";
                }
            }
        } else if (matrix[row][col] === 1) {
            console.log("sbfkasbflserfilaeui ")
            matrix[row][col] = 0;
            water.style.background = "blue";

            if (player === 1) {
                p1_nships++;
                console.log("P1 remaining ships:", p1_nships);
                console.log(matrixP1)
            } else if (player === 2) {
                p2_nships++;
                console.log("P2 remaining ships:", p2_nships);
                console.log(matrixP2)
            }
        }

    } else if (matrix[row][col] === 1) {
        console.log("sbfkasbflserfilaeui ")
        matrix[row][col] = 0;
        water.style.background = "blue";

        if (player === 1) {
            p1_nships++;
            console.log("P1 remaining ships:", p1_nships);
            console.log(matrixP1)
        } else if (player === 2) {
            p2_nships++;
            console.log("P2 remaining ships:", p2_nships);
            console.log(matrixP2)
        }
    }
    else {
        alert("Acabou us barcu");
    }

}

function createGrid() {
    let gridSize = document.getElementById("gridSize").value;
    let gridContainerP1 = document.getElementById("grid-p1");
    let gridContainerP2 = document.getElementById("grid-p2");

    gridContainerP2.style.display = "none";
    gridContainerP1.style.display = "grid";


    selectgrid_container.style.display = "none";
    title.style.display = "block";

    title.innerHTML = "(P1)Select the positions of your ships"




    if (gridSize == 0) {
        console.log("FAZER UM CÓDIGO PARA QUE O USUÁRIO DEFINA O TAMANHO DO GRID")  //FAZER UM CÓDIGO PARA QUE O USUÁRIO DEFINA O TAMANHO DO GRID


    } else {

        let final_gridSize = gridSize * gridSize;
        p1_nships = gridSize;
        p2_nships = gridSize;

        matrixP1 = createMatrix(gridSize, gridSize);
        matrixP2 = createMatrix(gridSize, gridSize);

        if (!grid_isset) {

            for (let i = 0; i < final_gridSize; i++) {

                // Create the "water" div for P1's grid
                const waterP1 = document.createElement("div");
                waterP1.classList.add('grid-elements');
                waterP1.setAttribute("index", i)
                waterP1.innerText = `P1 Div ${i + 1}`;

                waterP1.addEventListener('click', function (e) {

                    if (placing_phase) {
                        placingShips(waterP1, matrixP1, 1);

                    } else if (attacking_phase) {
                        attackingShips(waterP1, matrixP1, 1);
                    } else {
                        switchplayers();
                    }

                });

                // Create the "water" div for P2's grid
                const waterP2 = document.createElement("div");
                waterP2.classList.add('grid-elements');
                waterP2.setAttribute("index", i)
                waterP2.innerText = `P2 Div ${i + 1}`;

                waterP2.addEventListener('click', function (e) {


                    if (placing_phase) {
                        placingShips(waterP2, matrixP2, 2);

                    } else if (attacking_phase) {
                        attackingShips();
                    } else {
                        switchplayers();
                    }

                });

                // Append cells to their respective containers
                gridContainerP1.appendChild(waterP1);
                gridContainerP2.appendChild(waterP2);


            }

            gridContainerP1.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
            gridContainerP2.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

            grid_isset = true;
        }
    }


}


function attackingShips(water, matrix, player) {
    let index = parseInt(water.getAttribute("index"));
    let row = Math.floor(index / matrix.length); //thx for the help blackbox :)
    let col = index % matrix.length;


    if (matrix[row][col] === 1) {

    }
}


function switchplayers() {

    let gridp1 = document.getElementById("grid-p1");
    let gridp2 = document.getElementById("grid-p2");

    if (current_player == 2) {
        gridp1.style.display = "grid";
        gridp2.style.display = "none";

        current_player = 1
    } else {
        gridp1.style.display = "none";
        gridp2.style.display = "grid";

        current_player = 2;
    }
}

function confirmSelection() {
    if ((p1_nships !== 0 || p2_nships !== 0) && (p1_nships !== 0 || p2_nships !== 1)){
        alert("You must confirm your ship placement before starting the game");
    }else{
        document.getElementById("confirma").style.display = "none";
        switchplayers();

        if (p1_nships === 0 && p2_nships === 0) {
            console.log("the attack phase begins")
            placing_phase = false;
            waterP1.forEach(element => {
                element.style.background = "red";
            });
        }
    }
    
}

function createMatrix(rows, cols) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);  // Add the value 0 to all the positions
        }
        matrix.push(row);  // Add the row to the matrix
    }

    return matrix;
}

function testedogit(){
    alert("testando os comandos com o pedro")
}
