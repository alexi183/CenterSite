import React, { Component } from "react";
import "./Particle.scss";

import Particles from "react-particles-js";

class ParticlesComponent extends Component {
  slideActive = () => {
    switch (this.props.slideIndex + 1) {
      case 1:
        return "#6FBBDB";
      case 2:
        return "#65A2DB";
      case 3:
        return "#6581DB";
      case 4:
        return "#65B8DB";
      case 5:
        return "#659DDB";
      default:
        break;
    }
  };

  slideActiveCBackgroundColor = () => {
    switch (this.props.slideIndex + 1) {
      case 1:
        return "gradient-1-particle";
      case 2:
        return "gradient-2-particle";
      case 3:
        return "gradient-3-particle";
      case 4:
        return "gradient-4-particle";
      case 5:
        return "gradient-5-particle";
      default:
        break;
    }
  };

  render() {
    // const {index} = this.props;

    return (
      <React.Fragment>
          <div className={`particles ${this.slideActiveCBackgroundColor()}`}>
            <Particles
              params={{
                particles: {
                  number: {
                    value: 140,
                    density: {
                        enable: false
                    }
                  },
                  size: {
                    value: 3
                  },
                  color: {
                    value: this.slideActive()
                  },
                  line_linked: {
                    color: this.slideActive()
                    // shadow: {
                    //   enable: true,
                    //   color: "#fff",
                    //   blur: 3
                    // }
                  }
                },
                interactivity: {
                  events: {
                    onhover: {
                      enable: false,
                      mode: "repulse"
                    }
                  }
                },
                retina_detect: true
              }}
            />
          </div>
      </React.Fragment>
    );
  }
}

export default ParticlesComponent;
