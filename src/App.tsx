// tslint:disable:semicolon
import * as React from 'react';

type AppState = {
  hasSponsors: boolean;
};
class App extends React.Component<{}, AppState> {
  state = {
    hasSponsors: false,
  };
  render() {
    return (
      <div className="app-container">
        {this.renderCheckbox()}
        <div className="template-container">{this.renderTemplate()}</div>
      </div>
    );
  }

  private renderCheckbox() {
    return (
      <label>
        Sponsorzy? <input type="checkbox" onChange={this.handleSponsorsChange} />
      </label>
    );
  }

  private renderTemplate() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 861 450" width="861">
        <path fill="#2b1c34" fill-rule="evenodd" d="M0 0h668v450H0z" />
        <path fill="#eceff1" fill-rule="evenodd" d="M668 0h193v450H668z" />
        <path
          fill="#bddb59"
          fill-rule="evenodd"
          d="M0 292h64v52H0zm612-189h23v34h-23zm211 0h7v241h-7zm-98 189h6v106h-6z"
        />
        <path
          fill="#249fab"
          fill-rule="evenodd"
          d="M579 192h152v52H579zm152-65h64v10h-64zm63 313h36v10h-36z"
        />
        <path fill="none" stroke="#3a3349" stroke-width="2" d="M-1 243h580" />
        {this.state.hasSponsors && (
          <path fill="#ffffff" fill-rule="evenodd" d="M658 0h203v450H658z" />
        )}
      </svg>
    );
  }

  private handleSponsorsChange = () => {
    this.setState((state) => ({ hasSponsors: !state.hasSponsors }));
  };
}

export default App;
