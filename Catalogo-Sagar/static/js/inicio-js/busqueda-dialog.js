function search() {
            const query = document.getElementById('to-search').value.trim().toLowerCase();
            const dialog = document.getElementById('main-dialog-busqueda');
            const resultsContainer = document.getElementById('dialog-div-img');
            resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

            if (query === '') {
                alert('Por favor, ingrese un término de búsqueda.');
                return;
            }

            // Obtener todas las tarjetas de productos
            const tarjetas = document.querySelectorAll('.tarjeta-producto');

            let resultadosEncontrados = 0;

            tarjetas.forEach(tarjeta => {
                const descripcion = tarjeta.querySelector('.p-descripcion').textContent.toLowerCase();
                if (descripcion.includes(query)) {
                    const clonTarjeta = tarjeta.cloneNode(true);
                    resultsContainer.appendChild(clonTarjeta);
                    resultadosEncontrados++;
                }
            });

            if (resultadosEncontrados > 0) {
                dialog.showModal();
            } else {
                alert('No se encontraron resultados para su búsqueda.');
            }
        }

        function btn_cerrar() {
            const dialog = document.getElementById('main-dialog-busqueda');
            dialog.close();
        }