document.addEventListener('DOMContentLoaded', () => {
  // 1. Añadir barra de búsqueda interactiva de forma dinámica
  const container = document.querySelector('.container');
  const subtitulo = document.querySelector('.subtitulo');

  // Crear contenedor para la barra de búsqueda
  const searchWrapper = document.createElement('div');
  searchWrapper.style.cssText = `
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
  `;

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Buscar un tema de matemáticas discretas...';
  searchInput.style.cssText = `
    width: 100%;
    max-width: 500px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    background-color: #1e293b;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #f8fafc;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  `;

  // Efectos de foco para la barra de búsqueda
  searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = '#60a5fa';
    searchInput.style.boxShadow = '0 0 10px rgba(96, 165, 250, 0.2)';
  });

  searchInput.addEventListener('blur', () => {
    searchInput.style.borderColor = '#334155';
    searchInput.style.boxShadow = 'none';
  });

  searchWrapper.appendChild(searchInput);
  
  // Insertar la barra de búsqueda justo antes del subtítulo
  container.insertBefore(searchWrapper, subtitulo);

  // 2. Lógica de filtrado de tarjetas
  const cards = document.querySelectorAll('.card');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const parentColumn = card.closest('.columna');

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Ocultar columnas completas si todas sus tarjetas están ocultas (opcional para limpieza visual)
    const columnas = document.querySelectorAll('.columna');
    columnas.forEach(columna => {
      const visibleCards = columna.querySelectorAll('.card[style*="display: flex"], .card:not([style*="display: none"])');
      if (visibleCards.length === 0 && searchTerm !== '') {
        columna.style.display = 'none';
      } else {
        columna.style.display = 'flex';
      }
    });
  });

  // 3. Actualizar dinámicamente el año en el footer
  const footerParagraph = document.querySelector('.footer p');
  if (footerParagraph) {
    const currentYear = new Date().getFullYear();
    footerParagraph.textContent = `© ${currentYear} Plataforma de Matemáticas Discretas`;
  }
});
