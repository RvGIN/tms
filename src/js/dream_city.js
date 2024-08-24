const mainGrid = document.getElementById('mainGrid');
const popup = document.getElementById('popup');
const popupGrid = document.getElementById('popupGrid');
let currentCell;
const usedNumbers = new Set();
const cellMap = new Map();

const images = [
    'src/img/dreams/angel.png',
    'src/img/dreams/bed.png',
    'src/img/dreams/clock.png',
    'src/img/dreams/mirror.png',
    'src/img/dreams/piano.png',
    'src/img/dreams/sofa.png',
    'src/img/dreams/treasure.png',
    'src/img/dreams/trumpet.png',
    'src/img/dreams/wardrobe.png'
]

// 創建主九宮格
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => showPopup(cell));
    mainGrid.appendChild(cell);
}

// 創建彈出式九宮格
for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    // cell.textContent = i;
    cell.style.backgroundImage = `url(${images[i-1]})`
    cell.style.backgroundSize = 'cover'
    cell.style.backgroundPosition = 'center'
    cell.addEventListener('click', () => selectNumber(i));
    popupGrid.appendChild(cell);
}

function showPopup(cell) {
    currentCell = cell;
    popup.style.display = 'block';
    updatePopupGrid();
}

function selectNumber(num) {
    if (!currentCell.textContent || confirm('確定要更換數字嗎？')) {
        if (currentCell.textContent) {
            // 移除舊數字
            const oldNum = parseInt(currentCell.textContent);
            usedNumbers.delete(oldNum);
            cellMap.delete(oldNum);
        }

        // 如果新選擇的數字已經在其他格子中，清空該格子
        if (cellMap.has(num)) {
            const oldCell = cellMap.get(num);
            oldCell.textContent = '';
            oldCell.style.backgroundImage = null
        }

        // 設置新數字
        currentCell.textContent = num;
        currentCell.style.color = "rgba(0, 0, 0, 0)"
        currentCell.style.backgroundImage = `url(${images[num-1]})`
        currentCell.style.backgroundSize = 'cover'
        currentCell.style.backgroundPosition = 'center'
        usedNumbers.add(num);
        cellMap.set(num, currentCell);
        popup.style.display = 'none';
        updatePopupGrid();
    }
}

function updatePopupGrid() {
    popupGrid.childNodes.forEach((cell, index) => {
        if (usedNumbers.has(index + 1)) {
            cell.classList.add('disabled');
        } else {
            cell.classList.remove('disabled');
        }
    });
}

// 點擊空白處關閉彈出窗
document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !mainGrid.contains(e.target)) {
        popup.style.display = 'none';
    }
});

// 按下空格鍵顯示彈出窗
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && popup.style.display !== 'block') {
        e.preventDefault();
        const emptyCells = Array.from(mainGrid.children).filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            showPopup(emptyCells[0]);
        }
    }
});
