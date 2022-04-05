export const screenWidth = window.innerWidth || document.body.clientWidth;
export const dpr = window.devicePixelRatio;

export const getImgServerUrl = (img, widthPct = 100) => {
    widthPct = widthPct > 100 || widthPct <= 0 ? 100 : widthPct;

    const urlPrefix = process.env.NODE_ENV === "production" ? 
        "https://zorganizovano.cz:8082" : "http://localhost:8082";

    let url = `${urlPrefix}/img-api/img/${img}/${screenWidth}`;
    if (widthPct !== 100) {
        url += `;widthPct=${widthPct}`;
    }
    if (dpr !== 1) {
        url += `;dpr=${dpr}`;
    }

    return url;
};
