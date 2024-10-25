document.addEventListener('DOMContentLoaded', function() {
    const container = document.body;
    const square = document.getElementById('square');
    const triangle = document.getElementById('triangle');
    const circle = document.getElementById('circle');

    function addFigure(num, figure) {
        for (let i = 0; i < num; i++) {
            const minSize = 30;
            const maxSize = 300;
            const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
            const x = Math.floor(Math.random() * (window.innerWidth - size));
            const y = Math.floor(Math.random() * (window.innerHeight - size));

            const newDiv = document.createElement('div');
            newDiv.className = `newDiv ${figure}`;
            newDiv.style.left = `${x}px`;
            newDiv.style.top = `${y}px`;

            if (figure === 'square' || figure === 'circle') {
                newDiv.style.width = `${size}px`;
                newDiv.style.height = `${size}px`;
            }

            newDiv.addEventListener('click', function() {
                if (figure === 'triangle') {
                    newDiv.classList.toggle('selected-triangle');
                } else {
                    newDiv.classList.toggle('selected');
                }
            });

            newDiv.addEventListener('dblclick', function() {
                newDiv.remove();
            });

            container.appendChild(newDiv);
        }
    }

    square.addEventListener('click', () => addFigure(document.getElementById('number').value, 'square'));
    triangle.addEventListener('click', () => addFigure(document.getElementById('number').value, 'triangle'));
    circle.addEventListener('click', () => addFigure(document.getElementById('number').value, 'circle'));

    window.addEventListener('resize', () => {
        document.querySelectorAll('.newDiv').forEach(newDiv => {
            const size = parseInt(newDiv.style.width || newDiv.style.borderBottom);
            const x = Math.min(Math.max(0, parseInt(newDiv.style.left)), window.innerWidth - size);
            const y = Math.min(Math.max(0, parseInt(newDiv.style.top)), window.innerHeight - size);
            newDiv.style.left = `${x}px`;
            newDiv.style.top = `${y}px`;
        });
    });

    document.getElementById('number').addEventListener('input', ({ target: t }) => {
        t.value = Math.max(t.min, Math.min(t.max, t.value));
    });
});