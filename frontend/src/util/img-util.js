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

export const getImgServerPreviewUrl = (img) => {
    const urlPrefix = process.env.NODE_ENV === "production" ? 
        "https://zorganizovano.cz:8082" : "http://localhost:8082";
    
    return `${urlPrefix}/img-api/img/preview/${img}/`;
};

export const getCloudinaryImageName = path => {
    let res = path.substring(0, path.lastIndexOf('.'))
        .replace(/[_, ()]+/g, '_');

    if (res[res.length - 1] === '_') {
        return res.substring(0, res.length - 1);
    }

    return res;
};