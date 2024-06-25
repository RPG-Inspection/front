import Tesseract from 'tesseract.js';

function preprocessImage(canvas, startX, startY, width, height) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = width;
    tempCanvas.height = height;

    tempCtx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

    const imageData = tempCtx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }

    tempCtx.putImageData(imageData, 0, 0);

    tempCtx.filter = 'contrast(200%)';
    tempCtx.drawImage(tempCanvas, 0, 0);

    return tempCanvas;
}

export async function runOCR(canvasRef, outputRef) {
    const canvas = canvasRef.current;
    const outputText = outputRef.current;
    outputText.innerHTML = '텍스트를 인식하는 중입니다...';
    let results = [];

    const coordinates = [
        { startX: 1280, startY: 390, endX: 1525, endY: 415 },
        { startX: 1280, startY: 475, endX: 1525, endY: 500 },
        { startX: 1280, startY: 560, endX: 1525, endY: 585 },
        { startX: 1280, startY: 645, endX: 1525, endY: 670 }
    ];

    for (const { startX, startY, endX, endY } of coordinates) {
        try {
            const width = endX - startX;
            const height = endY - startY;

            const preprocessedCanvas = preprocessImage(canvas, startX, startY, width, height);

            const { data: { text } } = await Tesseract.recognize(preprocessedCanvas, 'kor+eng', {
                tessedit_char_whitelist: '가-힣a-zA-Z0-9'
            });

            results.push(text);
        } catch (error) {
            console.error('텍스트 인식 중 오류 발생:', error);
            results.push('텍스트 인식 중 오류가 발생했습니다.');
        }
    }

    outputText.innerHTML = '';
    return results;
}

export function drawRectangles(ctx) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(1230, 330, 470, 350);

    ctx.strokeStyle = 'orange';
    ctx.strokeRect(1280, 390, 245, 25);
    ctx.strokeRect(1280, 475, 245, 25);
    ctx.strokeRect(1280, 560, 245, 25);
    ctx.strokeRect(1280, 645, 245, 25);
}