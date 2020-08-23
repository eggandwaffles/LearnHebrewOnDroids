import React from 'react';
export function ImageFetch (id: string) {
    switch (id) {
        case "aleph":
            return require("../assets/images/alephSmall.png");
        default:
            return require('../assets/images/nullImage.png');
    }
}