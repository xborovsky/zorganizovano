export const getImgServerUrl = (img, widthPct = 100) => {
    const screenWidth = window.innerWidth || document.body.clientWidth;
    const dpr = window.devicePixelRatio;
    widthPct = widthPct > 100 || widthPct <= 0 ? 100 : widthPct;

    let url = `http://localhost:8082/img-api/img/${img}/${screenWidth}`;
    if (widthPct !== 100) {
        url += `;widthPct=${widthPct}`;
    }
    if (dpr !== 1) {
        url += `;dpr=${dpr}`;
    }

    return url;
};