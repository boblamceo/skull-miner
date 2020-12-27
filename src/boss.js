import React, { useState } from "react";
import bossTrue from "./boss-true.png";
import bossFalse from "./boss-false.png";
import youTrue from "./you-true.png";
import youFalse from "./you-false.png";
import useSound from "use-sound";
import lightsaber from "./lightsaber.mp3";
import laser from "./laser.mp3";
import { Dialog, DialogTitle } from "@material-ui/core";
import Zoom from "react-reveal/Zoom";
import win from "./success.mp3";
import trophyimg from "./trophy.png";
import { useLocation } from "wouter";
import { getCookie } from "./functions";
import ReactPlayer from "react-player";

const Boss = () => {
  const [playYou] = useSound(lightsaber);
  const [playBoss] = useSound(laser);
  const [playWin] = useSound(win);
  const [bossShooting, setBossShooting] = useState(false);
  const [youShooting, setYouShooting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [bossLives, setBossLives] = useState(20);
  const [yourLives, setYourLives] = useState(10);
  const [youWin, setYouWin] = useState(false);
  const [youLose, setYouLose] = useState(false);
  const [trophy, setTrophy] = useState(false);
  const [location, setLocation] = useLocation();
  const [ad, setAd] = useState(false);

  const bossStates = {
    btrue: bossTrue,
    bfalse: bossFalse,
  };

  const youStates = {
    ytrue: youTrue,
    yfalse: youFalse,
  };

  let bossString = "";

  for (let i = 0; i <= bossLives; i++) {
    bossString += "❤️ ";
  }

  let youString = "";

  for (let i = 0; i <= yourLives; i++) {
    youString += "❤️ ";
  }

  if (!getCookie("hasRocket")) {
    setLocation("/main");
  }

  return (
    <div className="boss-wrapper">
      <div className="peeps-wrapper">
        <div className="person">
          <img src={bossStates[`b${bossShooting}`]} alt="ITS NOT WORKING"></img>
          {bossString}
        </div>
        <br />
        <div className="person">
          <img src={youStates[`y${youShooting}`]} alt="ITS NOT WORKING"></img>
          {youString}
        </div>
      </div>
      <button
        className="attack"
        onClick={() => {
          const num = Math.ceil(Math.random() * 10);
          console.log("num", num);
          if (!Number.isInteger(num / 2) || num === 2) {
            if (yourLives === 1) {
              setYouLose(true);
            }
            playBoss();
            setBossShooting(true);
            setYouShooting(false);
            setYourLives(yourLives - 1);
          } else {
            if (bossLives === 1) {
              setYouWin(true);
            }
            playYou();
            setBossShooting(false);
            setYouShooting(true);
            setBossLives(bossLives - 1);
          }
        }}
      >
        {" "}
        ATTACK
      </button>

      <button
        className="attack"
        onClick={() => {
          setAd(true);
        }}
      >
        {" "}
        GAIN EXTRA LIVES
      </button>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1>KILL THE BOSS</h1>
          instructions:
          <ul>
            <li>press the button to shoot the boss with samurai goo</li>
            <li>there is a random chance the boss will shoot you so BEWARE</li>
          </ul>
        </DialogTitle>
      </Dialog>
      <Dialog
        open={youWin}
        onClose={() => {
          setYouWin(false);
          setTrophy(true);
          playWin();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1>YOU WIN !</h1>
        </DialogTitle>
      </Dialog>
      <Dialog
        open={trophy}
        onClose={() => {
          setYouWin(false);
          setLocation("/mars");
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ fontSize: 100 }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        className="trophy"
      >
        <Zoom id="alert-dialog-title">
          <img src={trophyimg}></img>
        </Zoom>
      </Dialog>
      <Dialog
        open={youLose}
        onClose={() => {
          setLocation("/main");
          setTimeout(() => {
            document.cookie = "points=0;addCoins=1;hasRocket=false;oof=0";
            window.location.reload();
          }, 500);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1>YOU LOSE</h1>
        </DialogTitle>
      </Dialog>

      <Dialog
        open={ad}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ReactPlayer
          url="https://youtu.be/SHJUoiS9VsI"
          playing={true}
          width={"100%"}
          onEnded={() => {
            setYourLives(yourLives + 5);
            setAd(false);
          }}
        ></ReactPlayer>
      </Dialog>
    </div>
  );
};

export default Boss;
