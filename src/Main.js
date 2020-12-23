import { useState } from "react";
import "./App.css";
import pick from "./pick.png";
import rock from "./rock.png";
import { GiSpade, GiLaserBlast } from "react-icons/gi";
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
import rocket from "./rocket.png";

function Main() {
  if (!Number(getCookie("addCoins"))) {
    document.cookie = `addCoins=${Number(getCookie("addCoins")) + 1}`;
  }

  const [coin, setCoin] = useState(getCookie("points"));
  const [addCoins, setAddCoins] = useState(Number(getCookie("addCoins")));

  const [open, setOpen] = useState(false);
  const [launch, setLaunch] = useState(false);
  const [hasRocket, setHasRocket] = useState(
    JSON.parse(getCookie("hasRocket")),
  );
  const [location, setLocation] = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const goBack = () => {
    setLocation("/mars");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const kill = () => {
    document.cookie = "points=0;addCoins=1;hasRocket=false;oof=0";
    document.location.reload();
  };

  const killBoss = () => {
    setLaunch(false);
    window.location.href = "/boss-battle";
  };

  console.log(getCookie("addCoins"));

  document.cookie = `addCoins=${addCoins};points=${coin};hasRocket=${hasRocket}oof=0;`;
  return (
    <div className={"container"}>
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
          <div className="miner">
            <img
              src={pick}
              className="Pick"
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
          {getCookie("hasRocket") ? (
            <img src={rocket} width={50} onClick={goBack}></img>
          ) : null}
        </div>
        <div className={"buy"}>
          <List
            component="nav"
            aria-label="secondary mailbox folders"
            className="list"
          >
            <ListItem
              button
              onClick={() => {
                if (coin < 20) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 20);
                setAddCoins(addCoins + 1);
              }}
            >
              <GiSpade></GiSpade> &nbsp; |20 shovel
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 40) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 40);
                setAddCoins(addCoins + 2);
              }}
            >
              👷‍♂️ |40 miner helper
            </ListItem>
            <ListItem
              button
              onClick={() => {
                if (coin < 100) {
                  handleClickOpen();
                  return;
                }
                setCoin(coin - 100);
                setAddCoins(addCoins + 10);
              }}
            >
              🚜 |100 digger
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

export default Main;
