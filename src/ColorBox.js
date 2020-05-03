import React, { Component } from "react";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";
import styles from './styles/ColorBoxStyles';


class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const {
      name,
      background,
      paletteId,
      id,
      showingFullPalette,
      classes,
    } = this.props;
    const { copied } = this.state;
    // const isDarkColor = chroma(background).luminance() <= 0.08;
    // const isLightColor = chroma(background).luminance() <= 0.8;
    const contrastClass =
      chroma.contrast(background, "white") < 4.5 ? "dark-text" : "light-text";
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.colorBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${
              copied && classes.showOverlay
              }`}
          />
          <div
            className={`${classes.copyMsg} ${copied && classes.showMessage}`}
          >
            <h1>copied!</h1>
            <p className={classes.contrastText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.contrastText}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
            {showingFullPalette && (
              <Link
                to={`/palette/${paletteId}/${id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className={classes.seeMore}>More</span>
              </Link>
            )}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
