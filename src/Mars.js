import { useState } from "react";
import "./App.css";
import pick from "./rocket.png";
import rock from "./mars-rock.png";
import astronaut from "./astronaut.png";
import { GiLaserBlast } from "react-icons/gi";
import ReactPlayer from "react-player";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "./fonts/PrehistoricCaveman-PRJ7.ttf";
import { getCookie } from "./functions";
import { useLocation } from "wouter";
function Mars() {
  if (!Number(getCookie("addCoins"))) {
    document.cookie = `addCoins=${Number(getCookie("addCoins")) + 1}`;
  }
  const [coin, setCoin] = useState(getCookie("points"));
  const [addCoins, setAddCoins] = useState(Number(getCookie("addCoins")));

  const [open, setOpen] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [location, setLocation] = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const goBack = () => {
    setLocation("/main");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const kill = () => {
    document.cookie = "points=0;addCoins=1;oof=0";
    document.location.reload();
  };

  const killBoss = () => {
    setLaunch(false);
    window.location.href = "/boss-battle";
  };

  document.cookie = `points=${coin};addCoins=${addCoins};oof=0;`;
  return (
    <div className={"mars-container"}>
      <div className={"header"}>
        <div className="coin-wrapper">
          <p className={"coin"}>|{coin}</p>
        </div>
      </div>
      <div className="body">
        <div className={"mine"}>
          <div className="coin-wrapper dph">
            <div>sph (skulls per hit) = {addCoins}</div>
          </div>
          <img src={pick} width={50} onClick={goBack}></img>
          <div className="mars-miner">
            <img
              src={astronaut}
              className="astronaut"
              onClick={() => {
                // alert("Ouch! Why you hit your helper?");
                // setAddCoins(1);
              }}
            ></img>
            <img
              src={pick}
              className="rocket"
              onClick={() => setCoin(`${Number(coin) + Number(addCoins)}`)}
            ></img>
            <div className="rock-wrapper">
              <img
                src={rock}
                className="Rock animate__animated animate__bounce"
                onClick={() => setAddCoins(addCoins + 1)}
              ></img>
              <img
                src={rock}
                className="Rock animate__animated animate__bounce"
                onClick={() => setAddCoins(addCoins + 1)}
              ></img>
            </div>
          </div>
        </div>
        <div className={"buy mars-buy"}>
          <List
            component="nav"
            aria-label="secondary mailbox folders"
            className="list"
          >
            <ListItem
              button
              onClick={() => {
                if (coin < 100000) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 100000);
                setAddCoins(addCoins + 1000);
              }}
            >
              🤖 |100,000 Mars Rover
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 500000) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 500000);
                setAddCoins(addCoins + 5000);
              }}
            >
              🏠 |500,000 Mars Base
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 1000000) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 1000000);
                setAddCoins(addCoins + 10000);
              }}
            >
              👽 |1,000,000 Mars helper
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 1000) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 1000);
                setAddCoins(addCoins + 100);
              }}
            >
              <GiLaserBlast color="red"></GiLaserBlast>&nbsp; |1000 laser
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 10000) {
                  handleClickOpen();
                  return;
                }
                document.cookie = "hasRocket=true;";
                setCoin(coin - 10000);
                setLaunch(true);
              }}
            >
              🚀 |10,000 Rocket
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleClickOpen();
              }}
            >
              GIVE ALL COINS TO CHARITY
            </ListItem>
          </List>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ya really wanna get bankrupt?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you get bankrupt, your whole economy will be destroyed and NO
            REDOING.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Nah
          </Button>
          <Button onClick={kill} color="primary" autoFocus>
            Yeah
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={launch}
        onClose={killBoss}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ReactPlayer
          url="https://youtu.be/SHJUoiS9VsI"
          playing={true}
          width={"100%"}
        ></ReactPlayer>
      </Dialog>
    </div>
  );
}

export default Mars;
