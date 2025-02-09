import { createGlobalStyle } from 'styled-components';
import NanumGothicRegular from '../assets/fonts/NanumGothic-Regular.ttf';

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family: 'NanumGothic';
        src: url(${NanumGothicRegular}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`; 