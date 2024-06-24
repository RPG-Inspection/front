import Tesseract from 'tesseract.js';

export async function runOCR(canvasRef, outputRef) {
    const canvas = canvasRef.current;
    const outputText = outputRef.current;
    outputText.innerHTML = '텍스트를 인식하는 중입니다....';
    let results = [];

    const coordinates = [
        { startX: 1280, startY: 390, endX: 1525, endY: 415 },
        { startX: 1280, startY: 475, endX: 1525, endY: 500 },
        { startX: 1280, startY: 560, endX: 1525, endY: 585 },
        { startX: 1280, startY: 645, endX: 1525, endY: 670 }
    ];

    for (const { startX, startY, endX, endY } of coordinates) {
        try {
            const croppedCanvas = document.createElement('canvas');
            const ctx = croppedCanvas.getContext('2d');
            const width = endX - startX;
            const height = endY - startY;

            croppedCanvas.width = width;
            croppedCanvas.height = height;

            ctx.drawImage(canvas, startX, startY, width, height, 0, 0, width, height);

            const { data: { text } } = await Tesseract.recognize(croppedCanvas, 'kor+eng', {
                logger: m => console.log(m),
                tessedit_char_whitelist: '가-힣a-zA-Z0-9'
            });

            results.push(text);
        } catch (error) {
            console.error('텍스트 인식 중 오류 발생:', error);
            results.push('텍스트 인식 중 오류가 발생했습니다.');
        }
    }

    outputText.innerHTML = ''; // 텍스트 인식 완료 후 메시지 지움
    return results;
}
