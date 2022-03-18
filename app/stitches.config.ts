import { createStitches } from '@stitches/react';

const { getCssText, globalCss, styled } = createStitches();

export const globalStyles = globalCss({
  body: {
    margin: 0,
  },
});

export { styled, getCssText, globalCss };
