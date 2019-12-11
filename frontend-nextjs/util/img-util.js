//export const screenWidth = window.innerWidth || document.body.clientWidth;
//export const dpr = window.devicePixelRatio;

export const getImgServerUrl = (img, widthPct = 100) => {
    widthPct = widthPct > 100 || widthPct <= 0 ? 100 : widthPct;

    //let url = `${urlPrefix}/img-api/img/${img}/${screenWidth}`;
    let url = `${process.env.IMAGE_API_URL}/img/${img}/1920`;
    if (widthPct !== 100) {
        url += `;widthPct=${widthPct}`;
    }
    /*if (dpr !== 1) {
        url += `;dpr=${dpr}`;
    }*/

    console.log(url);

    return url;
};