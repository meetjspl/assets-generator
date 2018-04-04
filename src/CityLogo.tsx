// tslint:disable:semicolon
import * as React from 'react';
import { diacriticsToASCII } from './diacriticsService';

type CityLogoProps = {
  city: string;
  svgProps: React.SVGProps<SVGForeignObjectElement>;
};
type CityLogoState = {
  isLoading: boolean;
  svg?: string;
  logoIncludesCity?: boolean;
};
export class CityLogo extends React.PureComponent<CityLogoProps, CityLogoState> {
  cityNameRef!: SVGTextElement | null;
  state: CityLogoState = {
    isLoading: true,
  };

  componentDidMount() {
    this.fetchSvg(this.props.city);
  }

  componentWillReceiveProps(newProps: CityLogoProps) {
    if (newProps.city !== this.props.city) {
      this.fetchSvg(newProps.city);
    }
  }

  componentDidUpdate() {
    this.maybeRepositionCityName();
  }

  render() {
    if (this.state.isLoading || !this.state.svg) {
      return null;
    } else {
      const wrapperProps = Object.assign({}, this.props.svgProps);
      const logoProps = Object.assign(
        {},
        {
          dangerouslySetInnerHTML: { __html: this.state.svg },
        }
      );
      return (
        <foreignObject {...wrapperProps}>
          <svg>
            <foreignObject width={wrapperProps.width} {...logoProps} />
            {!this.state.logoIncludesCity && (
              <text
                fontFamily="choplinmedium-demo"
                fontWeight="900"
                fill="#249fab"
                fontSize="21px"
                letterSpacing="0.5px"
                width="100px"
                textAnchor="end"
                x="135px"
                y="68px"
                ref={(el) => (this.cityNameRef = el)}
              >
                {this.getSanitizedCity(this.props.city)}
              </text>
            )}
          </svg>
        </foreignObject>
      );
    }
  }

  /**
   * hack to make the city name fit
   */
  private maybeRepositionCityName() {
    if (!this.cityNameRef) {
      return;
    }
    const MAX_WIDTH = 105; // experimental value
    const { width } = this.cityNameRef.getBBox();
    if (width > MAX_WIDTH) {
      this.cityNameRef.setAttribute('dx', String(width - MAX_WIDTH));
    }
  }

  private getSanitizedCity(city: string) {
    return diacriticsToASCII(city.toLowerCase());
  }

  private getFilePathForCity(city: string) {
    if (city) {
      const sanitizedCity = this.getSanitizedCity(city);
      return `${process.env.PUBLIC_URL}/logos/meetjs-logo-white-${sanitizedCity}.svg`;
    } else {
      return `${process.env.PUBLIC_URL}/logos/meetjs-logo-white.svg`;
    }
  }

  private async fetchSvg(city: string) {
    this.setState({
      isLoading: true,
    });
    const res = await fetch(this.getFilePathForCity(city));
    const svg = await res.text();
    const isValidSvg = svg.startsWith('<svg ');
    if (isValidSvg) {
      this.setState({
        isLoading: false,
        svg,
        logoIncludesCity: Boolean(city),
      });
    } else if (city) {
      this.fetchSvg('');
    } else {
      window.alert('No city logo or default logo found!');
    }
  }
}
