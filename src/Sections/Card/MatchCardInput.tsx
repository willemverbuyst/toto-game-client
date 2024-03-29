import { Grid } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'

import CardButton from '../../Components/Button/CardButton'
import NumberField from '../../Components/Form/NumberField'
import { IPrediction } from '../../models/predictions.model'
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models'
import {
  changePrediction,
  postNewPrediction,
} from '../../store/predictions/action-creators'

interface IProps {
  fixtureWithPrediction: IFixtureWithScoreAndPredictions
  hideInput: () => void
}

const MatchCardInput: React.FC<IProps> = ({
  fixtureWithPrediction,
  hideInput,
}: IProps): ReactElement => {
  const {
    id,
    predictions: { pGoalsAwayTeam, pGoalsHomeTeam },
  } = fixtureWithPrediction
  const pGoalsHome: number =
    typeof pGoalsHomeTeam === 'number' ? pGoalsHomeTeam : 0
  const pGoalsAway: number =
    typeof pGoalsAwayTeam === 'number' ? pGoalsAwayTeam : 0

  const dispatch = useDispatch()
  const [pGoalsHT, setpGoalsHT] = useState<number>(pGoalsHome)
  const [pGoalsAT, setpGoalsAT] = useState<number>(pGoalsAway)

  const handleSubmit = () => {
    const prediction: IPrediction = {
      pGoalsHomeTeam: pGoalsHT,
      pGoalsAwayTeam: pGoalsAT,
      fixtureId: id,
    }

    if (Number.isInteger(pGoalsAwayTeam) || Number.isInteger(pGoalsHomeTeam)) {
      dispatch(changePrediction(prediction))
    } else {
      dispatch(postNewPrediction(prediction))
    }

    hideInput()
  }

  const handleGoalsHomeTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsHT(Number(e.target.value))
  }

  const handleGoalsAwayTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpGoalsAT(Number(e.target.value))
  }

  return (
    <Grid item xs={12} container justifyContent="center">
      <CardButton caption="Cancel" color="secondary" handleClick={hideInput} />

      <Grid item xs={8} container justifyContent="center">
        <NumberField defaultValue={pGoalsHome} onChange={handleGoalsHomeTeam} />
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <NumberField defaultValue={pGoalsAway} onChange={handleGoalsAwayTeam} />
      </Grid>

      <CardButton caption="Submit" color="primary" handleClick={handleSubmit} />
    </Grid>
  )
}

export default MatchCardInput
