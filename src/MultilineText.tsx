import * as React from 'react';

type MultilineTextProps = {
  text: string;
  textProps: React.SVGAttributes<SVGTextElement>;
  lineHeight: number;
};

export const MultilineText: React.SFC<MultilineTextProps> = ({ text, textProps, lineHeight }) => {
  const textSpans = text
    .split('\n')
    .map((t) => t.trim() + ' ') // add whitespace for better experience when copying the text
    .map((t, i) => (
      <tspan x="97" dy={i * lineHeight} key={i}>
        {t}
      </tspan>
    ));

  return (
    <text
      {...textProps}
      fontFamily="Montserrat"
      fontWeight="400"
      y="280"
      fill="#78909c"
      fontSize="16px"
    >
      {textSpans}
    </text>
  );
};
