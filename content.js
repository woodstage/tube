import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "image-viewer": {
        "position": "fixed",
        "width": "100%",
        "height": "100%",
        "top": 0,
        "left": 0,
        "backgroundColor": "gray",
        "color": "black",
        "zIndex": 99999999
    },
    "image-viewer images": {
        "width": 600,
        "minHeight": 800,
        "position": "absolute",
        "left": 0,
        "top": 100,
        "right": 0,
        "bottom": 0,
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto",
        "paddingTop": 0,
        "paddingRight": 20,
        "paddingBottom": 0,
        "paddingLeft": 20,
        "backgroundColor": "#ffffff",
        "overflowY": "auto"
    },
    "image-viewer iconhide": {
        "cursor": "pointer"
    },
    "image-view iconshow": {
        "cursor": "pointer"
    },
    "images img": {
        "maxWidth": "80%",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "display": "inline-block",
        "fontSize": 0
    }
});