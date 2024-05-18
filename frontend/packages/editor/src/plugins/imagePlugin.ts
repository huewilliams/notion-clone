import {imagePlugin as _imagePlugin, defaultSettings, imageAlign} from "prosemirror-image-plugin";

export const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.className = "imagePluginOverlay";
    const alignLeft = document.createElement("button");
    alignLeft.className = "alignLeftButton";
    const alignRight = document.createElement("button");
    alignRight.className = "alignRightButton";
    const alignCenter = document.createElement("button");
    alignCenter.className = "alignCenterButton";
    const alignFullWidth = document.createElement("button");
    alignFullWidth.className = "alignFullWidthButton";

    alignLeft.textContent = imageAlign.left;
    alignLeft.setAttribute("imagealign", imageAlign.left);
    alignRight.textContent = imageAlign.right;
    alignRight.setAttribute("imagealign", imageAlign.right);
    alignCenter.textContent = imageAlign.center;
    alignCenter.setAttribute("imagealign", imageAlign.center);
    alignFullWidth.textContent = imageAlign.fullWidth;
    alignFullWidth.setAttribute("imagealign", imageAlign.fullWidth);

    overlay.appendChild(alignLeft);
    overlay.appendChild(alignCenter);
    overlay.appendChild(alignRight);
    overlay.appendChild(alignFullWidth);

    return overlay;
};

export function imagePlugin() {
    return _imagePlugin({
        ...defaultSettings,
        createOverlay,
        hasTitle: false,
    });
}
