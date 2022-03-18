import { createStitches } from '@stitches/react';

const { getCssText, globalCss, styled } = createStitches();

export const globalStyles = globalCss({
  '*': {
    fontFamily: 'monospace',
  },
  body: {
    margin: 0,
  },
});

export { styled, getCssText, globalCss };
