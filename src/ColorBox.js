import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import styles from "./styles/ColorBoxStyles";

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

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.colorBox}>
          <div
            style={{ background }}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
          />

          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied,
            })}
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
