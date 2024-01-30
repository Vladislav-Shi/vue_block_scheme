/**
 * Файл содержит функции для создания svg по параметрам
 */
function generateSvg(width, height, shapes) {
    // Создаем начало SVG
    let svgString = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
    // Обходим массив фигур и добавляем их к SVG
    shapes.forEach(shape => {
      switch (shape.type) {
        case 'rect':
          svgString += `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" fill="${shape.fill}" />`;
          break;
        case 'circle':
          svgString += `<circle cx="${shape.cx}" cy="${shape.cy}" r="${shape.r}" fill="${shape.fill}" />`;
          break;
        // Добавьте дополнительные типы фигур по необходимости
      }
    });
  
    // Закрываем SVG
    svgString += '</svg>';
  
    return svgString;
  }