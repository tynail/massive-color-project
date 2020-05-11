import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// This component is the pop-up component that open when we click the save button from the create palette Navbar
class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
      stage: "born",
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
  }

  render() {
    const { newPaletteName } = this.state;
    const { hideForm, handleSubmit } = this.props;
    return (
      <div>
        <Dialog open={this.state.stage === "emoji"} onClose={hideForm}>
          <DialogTitle id="form-dialog-title">
            Choose a Palette Emoji!
          </DialogTitle>
          <Picker onSelect={this.savePalette} title="Pick a palette Emoji" />
        </Dialog>
        <Dialog
          open={this.state.stage === "born"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your beautiful palette. Make sur it's
                unique!
              </DialogContentText>

              <TextValidator
                name="newPaletteName"
                label="Palette Name"
                fullWidth
                margin="normal"
                onChange={this.handleChange}
                value={newPaletteName}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter palette name", "Name already use"]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
