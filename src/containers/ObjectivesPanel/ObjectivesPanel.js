import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./Objectives.css"
import _ from "lodash";
import { completedMilestone } from "../../redux/actions/game";

const ObjectivePanel = () => {
  const { scores, game } = useSelector((state) => state);
  const [score, setScore] = useState({ percent: 0, batch: 0 });

  const dispatch = useDispatch();

  useEffect(() => {
    // If there are no scores return...
    if (!hasScores()) {
      return;
    }
    var percentage = calculateScore(scores);
    
    var batchNumber = score.batch + 1;
    //Update UI with local state
    setScore(
      {
        percent: percentage,
        batch: batchNumber,
      }
    )
  }, [scores])

  useEffect(() => {
    // When the score updates, check to see if they completed the game...
    if (game.completed) {
      return;
    }
    if (score.percent == 0) {
      return;
    }
    var winState = checkFinishStateByDifficulty(game.game_settings.difficulty);
    if (winState) {
      dispatch(completedMilestone(game));
    }
  }, [score])

  // Returns true if passed. False if not.
  const checkFinishStateByDifficulty = (level) => {
    switch (level) {
      default:
      case "level1":
      case "level2":
      case "level3":
        return playedAtleastTenBatches(scores) && scoreHigherThanPercent(90, scores);
    }
  }
  const playedAtleastTenBatches = (scores) => {
    return (scores.length >= 10);
  }
  const scoreHigherThanPercent = (percentage, scores) => {
    return (percentage <= Math.round(
      _.sum(last10Scores(scores)) / last10Scores(scores).length)
    );
  }

  const hasScores = () => {
    return scores.length > 0 ? true : false;
  }
  const calculateScore = (scores) => {
    return Math.round(
      _.sum(last10Scores(scores)) / last10Scores(scores).length
    );
  }
  const last10Scores = (scores) => {
    return _.takeRight(scores, 10);
  };

  const isCompletedStateClass = () => {
    return game.completed ? " green" : "";
  }

  const getScoreColor = () => {
    if (playedAtleastTenBatches(scores)) {
      if (checkFinishStateByDifficulty(game.game_settings.difficulty)) {
        return " background-green";
      } else {
        return " background-orange";
      }
    } else {
      return " background-whitesmoke";
    }
  }
  return (
    <div className={"objectives-panel panel--round"}>
      <div className={"objective-header panel--round__header"}>
        <b>Objective</b>
      </div>

      <div className={"objective-body panel--round__body flex-row-container" + isCompletedStateClass()}>

        <div className={"percent-box" + getScoreColor()}>
          <span className={"percent-number"}>{score.percent}%</span>
        </div>

        <div className="flex-column-container info-box">
          <div className="goal-text">
            Achieve <b>{90}%</b> correct over <b>10</b> consecutive batches.
          </div>

          <div className="batch-text">
            <b>Batch #{score.batch}</b>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export { ObjectivePanel }